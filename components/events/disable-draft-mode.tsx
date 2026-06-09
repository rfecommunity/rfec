'use client'

import { useTransition } from 'react'

import { useRouter } from 'next/navigation'

/**
 * Floating control shown only while draft mode is active. Disables preview and
 * refreshes the route so the published content reappears.
 */
export function DisableDraftMode() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function disable() {
    startTransition(async () => {
      await fetch('/api/draft-mode/disable')
      router.refresh()
    })
  }

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
      <button
        type="button"
        onClick={disable}
        disabled={isPending}
        className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white shadow-lg transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? 'Saindo…' : 'Modo rascunho ativo — sair'}
      </button>
    </div>
  )
}
