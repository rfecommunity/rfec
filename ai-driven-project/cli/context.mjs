#!/usr/bin/env node
/**
 * ai-driven-project context manager
 * ---------------------------------
 * Zero-dependency CLI (Node >= 18, ESM) for managing the context knowledge base.
 *
 * Commands:
 *   node cli/context.mjs index            Regenerate the registry + JSON index in master-context.md
 *   node cli/context.mjs validate         Validate every context file's format (exit 1 on error)
 *   node cli/context.mjs check            Integrity: duplicate IDs, broken deps, orphans, desc length
 *   node cli/context.mjs search <term>    Search contexts by ID, name, tag, or body text
 *   node cli/context.mjs list             Print a compact table of all contexts
 *   node cli/context.mjs help             Show this help
 *
 * Cross-platform: pure Node fs/path, no shell assumptions.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..') // ai-driven-project/
const MASTER = path.join(ROOT, 'master-context.md')
const CATEGORY_DIRS = ['core', 'features', 'infrastructure', 'utilities']
const REQUIRED_SECTIONS = [
  'Summary',
  'Key Information',
  'Code References',
  'Related Contexts',
  'Change Log'
]
const HEADER_FIELDS = ['ID', 'Category', 'Last Updated', 'Dependencies', 'Description']
const MAX_DESC = 100
const REGISTRY_BEGIN = '<!-- AUTO-INDEX:BEGIN -->'
const REGISTRY_END = '<!-- AUTO-INDEX:END -->'
const JSON_BEGIN = '<!-- AUTO-INDEX-JSON:BEGIN -->'
const JSON_END = '<!-- AUTO-INDEX-JSON:END -->'

// ---------- ansi ----------
const c = {
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`
}

// ---------- parsing ----------
function listContextFiles() {
  const files = []
  for (const dir of CATEGORY_DIRS) {
    const abs = path.join(ROOT, dir)
    if (!fs.existsSync(abs)) continue
    for (const name of fs.readdirSync(abs)) {
      if (name.endsWith('.md')) files.push(path.join(abs, name))
    }
  }
  return files.sort()
}

function parseHeaderField(content, field) {
  const re = new RegExp(`^\\*\\*${field}\\*\\*:\\s*(.+)$`, 'm')
  const m = content.match(re)
  return m ? m[1].trim() : null
}

function parseAiMeta(content) {
  const m = content.match(/```json\s+ai-meta\s*\n([\s\S]*?)\n```/)
  if (!m) return { meta: null, error: 'missing ```json ai-meta``` block' }
  try {
    return { meta: JSON.parse(m[1]), error: null }
  } catch (e) {
    return { meta: null, error: `invalid JSON in ai-meta: ${e.message}` }
  }
}

function parseContext(file) {
  const content = fs.readFileSync(file, 'utf8')
  const rel = path.relative(ROOT, file).split(path.sep).join('/')
  const titleM = content.match(/^#\s+Context:\s*(.+)$/m)
  const { meta, error: metaError } = parseAiMeta(content)
  const depsRaw = parseHeaderField(content, 'Dependencies') || ''
  const deps = depsRaw
    .split(',')
    .map((d) => d.trim())
    .filter((d) => d && d.toLowerCase() !== 'none')
  const sections = [...content.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim())

  return {
    file,
    rel,
    content,
    title: titleM ? titleM[1].trim() : null,
    id: parseHeaderField(content, 'ID'),
    category: parseHeaderField(content, 'Category'),
    lastUpdated: parseHeaderField(content, 'Last Updated'),
    description: parseHeaderField(content, 'Description'),
    deps,
    sections,
    meta,
    metaError
  }
}

function loadAll() {
  return listContextFiles().map(parseContext)
}

// ---------- validate ----------
function validateOne(ctx) {
  const errs = []
  const warns = []
  if (!ctx.title) errs.push('missing `# Context: <name>` title')
  for (const f of HEADER_FIELDS) {
    const v = parseHeaderField(ctx.content, f)
    if (!v) errs.push(`missing header field **${f}**`)
  }
  for (const s of REQUIRED_SECTIONS) {
    if (!ctx.sections.includes(s)) errs.push(`missing section "## ${s}"`)
  }
  if (ctx.metaError) errs.push(ctx.metaError)
  if (ctx.id && !/^(CORE|FEAT|INFRA|UTIL)-\d{3}$/.test(ctx.id)) {
    errs.push(`ID "${ctx.id}" must match CORE|FEAT|INFRA|UTIL-NNN`)
  }
  // category should match the directory
  const dir = ctx.rel.split('/')[0]
  if (ctx.category && ctx.category !== dir) {
    errs.push(`category "${ctx.category}" != directory "${dir}"`)
  }
  // json meta consistency
  if (ctx.meta) {
    if (ctx.meta.id && ctx.meta.id !== ctx.id) {
      errs.push(`ai-meta.id "${ctx.meta.id}" != header ID "${ctx.id}"`)
    }
    if (ctx.meta.category && ctx.meta.category !== ctx.category) {
      errs.push(`ai-meta.category "${ctx.meta.category}" != header "${ctx.category}"`)
    }
  }
  if (ctx.description && ctx.description.length > MAX_DESC) {
    warns.push(`description ${ctx.description.length} chars (max ${MAX_DESC})`)
  }
  if (ctx.lastUpdated && isNaN(Date.parse(ctx.lastUpdated))) {
    warns.push(`Last Updated "${ctx.lastUpdated}" is not an ISO-8601 timestamp`)
  }
  return { errs, warns }
}

function cmdValidate(all) {
  let bad = 0
  for (const ctx of all) {
    const { errs, warns } = validateOne(ctx)
    if (!errs.length && !warns.length) {
      console.log(`${c.green('✓')} ${ctx.rel} ${c.dim(`(${ctx.id})`)}`)
    } else {
      if (errs.length) bad++
      console.log(`${errs.length ? c.red('✗') : c.yellow('!')} ${ctx.rel} ${c.dim(`(${ctx.id || '?'})`)}`)
      errs.forEach((e) => console.log(`    ${c.red('error:')} ${e}`))
      warns.forEach((w) => console.log(`    ${c.yellow('warn:')}  ${w}`))
    }
  }
  console.log(c.bold(`\n${all.length} contexts, ${bad} with errors`))
  return bad === 0
}

// ---------- check (integrity) ----------
function cmdCheck(all) {
  let problems = 0
  const byId = new Map()
  // duplicates
  for (const ctx of all) {
    if (!ctx.id) continue
    if (byId.has(ctx.id)) {
      console.log(`${c.red('DUPLICATE ID')} ${ctx.id}: ${byId.get(ctx.id).rel} & ${ctx.rel}`)
      problems++
    } else {
      byId.set(ctx.id, ctx)
    }
  }
  // broken dependency references
  for (const ctx of all) {
    for (const d of ctx.deps) {
      if (!byId.has(d)) {
        console.log(`${c.red('BROKEN DEP')} ${ctx.id} → ${d} (no such context)`)
        problems++
      }
    }
  }
  // orphans: not referenced as a dependency by anyone else
  const referenced = new Set(all.flatMap((ctx) => ctx.deps))
  for (const ctx of all) {
    if (ctx.id && !referenced.has(ctx.id)) {
      console.log(`${c.yellow('ORPHAN')} ${ctx.id} (${ctx.rel}) is not a dependency of any context`)
    }
  }
  // relative links in "Related Contexts" resolve
  for (const ctx of all) {
    const links = [...ctx.content.matchAll(/\]\((\.\.\/[^)]+\.md)\)/g)].map((m) => m[1])
    for (const link of links) {
      const target = path.resolve(path.dirname(ctx.file), link)
      if (!fs.existsSync(target)) {
        console.log(`${c.red('DEAD LINK')} ${ctx.id} → ${link}`)
        problems++
      }
    }
  }
  console.log(c.bold(`\nintegrity: ${problems} problem(s) (orphans are warnings)`))
  return problems === 0
}

// ---------- index (regenerate master) ----------
function buildRegistryTable(all) {
  const rows = all
    .slice()
    .sort((a, b) => (a.id || '').localeCompare(b.id || ''))
    .map((ctx) => {
      const deps = ctx.deps.length ? ctx.deps.join(', ') : '—'
      const date = (ctx.lastUpdated || '').slice(0, 10) || '—'
      return `| ${ctx.id || '?'} | ${ctx.title || '?'} | \`${ctx.rel}\` | ${ctx.category || '?'} | ${date} | ${ctx.description || ''} | ${deps} |`
    })
  return [
    '| ID | Name | Path | Category | Last Modified | Description | Dependencies |',
    '| --- | --- | --- | --- | --- | --- | --- |',
    ...rows
  ].join('\n')
}

function buildJsonIndex(all) {
  const data = {
    generated: '<stamped-by-commit>',
    count: all.length,
    contexts: all
      .slice()
      .sort((a, b) => (a.id || '').localeCompare(b.id || ''))
      .map((ctx) => ({
        id: ctx.id,
        name: ctx.title,
        path: ctx.rel,
        category: ctx.category,
        lastUpdated: ctx.lastUpdated,
        description: ctx.description,
        dependencies: ctx.deps,
        tags: (ctx.meta && ctx.meta.tags) || [],
        lang: (ctx.meta && ctx.meta.lang) || []
      }))
  }
  return '```json\n' + JSON.stringify(data, null, 2) + '\n```'
}

function replaceBetween(content, begin, end, replacement) {
  const re = new RegExp(`${begin}[\\s\\S]*?${end}`)
  if (!re.test(content)) {
    throw new Error(`markers ${begin} ... ${end} not found in master-context.md`)
  }
  return content.replace(re, `${begin}\n${replacement}\n${end}`)
}

function cmdIndex(all) {
  if (!fs.existsSync(MASTER)) {
    console.log(c.red(`master-context.md not found at ${MASTER}`))
    return false
  }
  let content = fs.readFileSync(MASTER, 'utf8')
  content = replaceBetween(content, REGISTRY_BEGIN, REGISTRY_END, buildRegistryTable(all))
  content = replaceBetween(content, JSON_BEGIN, JSON_END, buildJsonIndex(all))
  // bump "Last Updated" header in master (date only, deterministic)
  content = content.replace(
    /(\*\*Last Indexed\*\*:\s*)(.*)/,
    `$1${new Date().toISOString().slice(0, 10)}`
  )
  fs.writeFileSync(MASTER, content)
  console.log(`${c.green('✓')} reindexed ${all.length} contexts into ${path.relative(ROOT, MASTER)}`)
  return true
}

// ---------- search ----------
function cmdSearch(all, term) {
  if (!term) {
    console.log(c.red('usage: context.mjs search <term>'))
    return false
  }
  const q = term.toLowerCase()
  let hits = 0
  for (const ctx of all) {
    const tags = ((ctx.meta && ctx.meta.tags) || []).join(' ')
    const haystackMeta = `${ctx.id} ${ctx.title} ${ctx.description} ${tags}`.toLowerCase()
    const inMeta = haystackMeta.includes(q)
    const bodyLines = ctx.content
      .split('\n')
      .filter((l) => l.toLowerCase().includes(q))
    if (inMeta || bodyLines.length) {
      hits++
      console.log(`${c.cyan(ctx.id)} ${c.bold(ctx.title)} ${c.dim(ctx.rel)}`)
      if (inMeta) console.log(`    ${c.dim('matched: id/name/description/tags')}`)
      bodyLines.slice(0, 3).forEach((l) => console.log(`    ${l.trim()}`))
      if (bodyLines.length > 3) console.log(c.dim(`    … +${bodyLines.length - 3} more lines`))
    }
  }
  console.log(c.bold(`\n${hits} context(s) matched "${term}"`))
  return true
}

// ---------- list ----------
function cmdList(all) {
  const sorted = all.slice().sort((a, b) => (a.id || '').localeCompare(b.id || ''))
  for (const ctx of sorted) {
    console.log(`${c.cyan((ctx.id || '?').padEnd(9))} ${c.bold((ctx.title || '?').padEnd(34))} ${c.dim(ctx.rel)}`)
  }
  console.log(c.bold(`\n${all.length} contexts`))
  return true
}

function help() {
  console.log(`${c.bold('ai-driven-project context manager')}

  node cli/context.mjs ${c.cyan('index')}            regenerate registry + JSON index in master-context.md
  node cli/context.mjs ${c.cyan('validate')}         validate every context file (exit 1 on error)
  node cli/context.mjs ${c.cyan('check')}            integrity: dup IDs, broken deps, orphans, dead links
  node cli/context.mjs ${c.cyan('search')} <term>    search by ID, name, tag, or body text
  node cli/context.mjs ${c.cyan('list')}             compact table of all contexts
  node cli/context.mjs ${c.cyan('help')}             this message
`)
}

// ---------- main ----------
const [, , cmd, ...rest] = process.argv
const all = loadAll()
let ok = true
switch (cmd) {
  case 'index':
    ok = cmdIndex(all)
    break
  case 'validate':
    ok = cmdValidate(all)
    break
  case 'check':
    ok = cmdCheck(all)
    break
  case 'search':
    ok = cmdSearch(all, rest.join(' '))
    break
  case 'list':
    ok = cmdList(all)
    break
  case 'help':
  case undefined:
    help()
    break
  default:
    console.log(c.red(`unknown command: ${cmd}\n`))
    help()
    ok = false
}
process.exit(ok ? 0 : 1)
