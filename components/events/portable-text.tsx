import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock
} from '@portabletext/react'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-3 mt-8 text-xl font-semibold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-2 mt-6 text-lg font-semibold">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-2 border-border pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    )
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-1 pl-5">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-1 pl-5">{children}</ol>
    )
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium underline underline-offset-4"
      >
        {children}
      </a>
    )
  }
}

export function RichText({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) return null
  return (
    <div className="text-base text-foreground">
      <PortableText value={value} components={components} />
    </div>
  )
}
