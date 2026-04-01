import React from 'react'

export type AIToolName = 'Lovable' | 'Cursor' | 'v0 by Vercel' | 'Bolt'

function InitialsLogo({ label }: { label: string }) {
  const initials = label.trim().slice(0, 2).toUpperCase() || 'AI'
  return (
    <span
      className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#e4e0d8] bg-white"
      aria-hidden="true"
    >
      <span className="text-[10px] font-semibold text-[#6b6860]">{initials}</span>
    </span>
  )
}

function LogoFrame({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex h-6 w-6 items-center justify-center overflow-hidden rounded-md border border-[#e4e0d8]"
      style={{ background: '#ffffff' }}
      aria-hidden="true"
    >
      {children}
    </span>
  )
}

function CompanyLogo({
  primary,
  fallback,
  alt,
}: {
  primary: string
  fallback: string
  alt: string
}) {
  return (
    <LogoFrame>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={primary}
        alt={alt}
        width={18}
        height={18}
        className="h-4.5 w-4.5 object-contain"
        onError={(event) => {
          const img = event.currentTarget
          if (!img.dataset.fallbackApplied) {
            img.dataset.fallbackApplied = 'true'
            img.src = fallback
          }
        }}
      />
    </LogoFrame>
  )
}

export function AIToolLogo({ tool }: { tool: string }) {
  if (tool === 'Lovable') {
    return (
      <CompanyLogo
        alt="Lovable"
        primary="https://logo.clearbit.com/lovable.dev"
        fallback="https://www.google.com/s2/favicons?domain=lovable.dev&sz=64"
      />
    )
  }

  if (tool === 'Cursor') {
    return (
      <CompanyLogo
        alt="Cursor"
        primary="https://logo.clearbit.com/cursor.com"
        fallback="https://www.google.com/s2/favicons?domain=cursor.com&sz=64"
      />
    )
  }

  if (tool === 'v0 by Vercel') {
    return (
      <CompanyLogo
        alt="v0 by Vercel"
        primary="https://logo.clearbit.com/vercel.com"
        fallback="https://www.google.com/s2/favicons?domain=vercel.com&sz=64"
      />
    )
  }

  if (tool === 'Bolt') {
    return (
      <CompanyLogo
        alt="Bolt"
        primary="https://logo.clearbit.com/bolt.new"
        fallback="https://www.google.com/s2/favicons?domain=bolt.new&sz=64"
      />
    )
  }

  return <InitialsLogo label={tool} />
}
