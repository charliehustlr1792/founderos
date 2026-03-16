'use client'
import React from 'react'
import { cn } from '@/lib/utils'

// ─── Black Glass Card ──────────────────────────────────────────────────────────
// Mirrors the orange glass button pattern from Crework's design system,
// translated to black: white glass sheen on dark base + inset top-highlight + hard press shadow.

export const BLACK_GLASS_STYLE: React.CSSProperties = {
  background: 'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 100%), #0a0a0a',
  boxShadow: '0 1px 0 0 rgba(255,255,255,0.14) inset, 0 4px 0 0 rgba(0,0,0,0.85), 0 6px 20px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.07)',
  border: 'none',
  transform: 'translateY(-1px)',
}

export function GlassCard({ children, className, style }: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={cn('rounded-[8px]', className)}
      style={{ ...BLACK_GLASS_STYLE, ...style }}
    >
      {children}
    </div>
  )
}

export function Section({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('space-y-5 section-animate', className)}>
      <div className="flex items-center gap-3 mb-1">
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="w-[3px] h-[20px] rounded-full bg-[#0a0a0a] shrink-0" />
          <p
            className="text-[16px] font-semibold uppercase tracking-[0.08em] text-[#0a0a0a]"
            style={{ fontFamily: 'var(--font-geist-sans)' }}
          >
            {title}
          </p>
        </div>
        <hr className="flex-1 border-[#e5e5e5]" />
      </div>
      {children}
    </div>
  )
}

export function BlogLink({ label, url, context }: { label: string; url: string; context: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block mt-3 rounded-[4px] bg-[#fafafa] px-4 py-[14px] flex items-center justify-between gap-3 group transition-all duration-150"
      style={{ borderLeft: '3px solid #171717', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderLeftWidth = '4px'; (e.currentTarget as HTMLElement).style.background = '#f5f5f5' }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderLeftWidth = '3px'; (e.currentTarget as HTMLElement).style.background = '#fafafa' }}
    >
      <div className="space-y-0.5 min-w-0">
        <p className="text-[13px] font-medium text-[#0a0a0a] leading-snug">{label}</p>
        <p className="text-[12px] text-[#525252] leading-relaxed">{context}</p>
      </div>
      <span className="shrink-0 text-[#525252] group-hover:text-[#0a0a0a] transition-colors text-[16px]">→</span>
    </a>
  )
}

export function CheckItem({ text, variant = 'default' }: { text: string; variant?: 'default' | 'green' | 'warning' | 'error' }) {
  if (variant === 'error') {
    return (
      <div className="flex items-start gap-3">
        <span className="mt-[2px] shrink-0 flex items-center justify-center w-[16px] h-[16px] rounded-full bg-[#dc2626] shrink-0">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1.5 1.5l5 5M6.5 1.5l-5 5" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </span>
        <p className="text-[13px] leading-relaxed text-[#7f1d1d]">{text}</p>
      </div>
    )
  }
  const iconColor = variant === 'green' ? '#16a34a' : variant === 'warning' ? '#d97706' : '#a3a3a3'
  const textColor = variant === 'green' ? '#15803d' : '#525252'
  return (
    <div className="flex items-start gap-3">
      <span className="mt-[2px] shrink-0" style={{ color: iconColor }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="6.5" stroke="currentColor" strokeWidth="1"/>
          <path d="M4 7.2l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      <p className="text-[13px] leading-relaxed" style={{ color: textColor }}>{text}</p>
    </div>
  )
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="shrink-0 text-[11px] border border-[#e5e5e5] rounded-[3px] px-[6px] py-[2px] text-[#525252]"
      style={{ fontFamily: 'var(--font-geist-mono)' }}
    >
      {children}
    </span>
  )
}

export function VolumeBar({ level }: { level: 'low' | 'moderate' | 'high' }) {
  const count = { low: 1, moderate: 2, high: 3 }[level]
  return (
    <div className="flex items-end gap-[3px]">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className="w-[4px] rounded-[2px]"
          style={{
            height: i === 1 ? '8px' : i === 2 ? '12px' : '16px',
            background: i <= count ? '#171717' : '#e5e5e5',
          }}
        />
      ))}
    </div>
  )
}

export function StatusDot({ status }: { status: 'defined' | 'needs_clarity' | 'missing' }) {
  if (status === 'defined') {
    return (
      <span className="mt-[3px] shrink-0 flex items-center justify-center w-[16px] h-[16px] rounded-full bg-[#16a34a]">
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
          <path d="M1.5 4.5l2 2 4-4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    )
  }
  if (status === 'needs_clarity') {
    return (
      <span className="mt-[3px] shrink-0 flex items-center justify-center w-[16px] h-[16px] rounded-full bg-[#d97706]">
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
          <path d="M4.5 2.5v3M4.5 6.5v.5" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      </span>
    )
  }
  return (
    <span className="mt-[3px] shrink-0 flex items-center justify-center w-[16px] h-[16px] rounded-full bg-[#dc2626]">
      <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
        <path d="M2.5 2.5l4 4M6.5 2.5l-4 4" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    </span>
  )
}

export function ComplexityBadge({ level }: { level: string }) {
  const filled = level === 'Low' ? 1 : level === 'Medium' ? 3 : 5
  const color = level === 'Low' ? '#16a34a' : level === 'Medium' ? '#d97706' : '#dc2626'
  return (
    <GlassCard className="px-5 py-4 flex items-center gap-5">
      <p className="text-[36px] font-semibold text-white leading-none" style={{ fontFamily: 'var(--font-geist-sans)' }}>
        {level}
      </p>
      <div className="flex gap-1.5">
        {[1,2,3,4,5].map(i => (
          <span
            key={i}
            className="w-3 h-3 rounded-[2px]"
            style={{ background: i <= filled ? color : 'rgba(255,255,255,0.12)' }}
          />
        ))}
      </div>
    </GlassCard>
  )
}

export function NextButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-5 py-4 rounded-[6px] bg-white border border-[#e5e5e5] hover:border-[#171717] transition-colors duration-150"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
    >
      <span className="text-[14px] font-medium text-[#0a0a0a]">{label}</span>
      <span className="text-[#a3a3a3] text-[16px]">→</span>
    </button>
  )
}

export function CTABlock({ headline, sub, buttonLabel, href, onClick }: {
  headline: string; sub: string; buttonLabel: string; href?: string; onClick?: () => void
}) {
  const inner = (
    <GlassCard className="p-6 space-y-4">
      <div className="space-y-1.5">
        <p className="text-[16px] font-semibold text-white leading-snug">{headline}</p>
        <p className="text-[13px] text-[rgba(255,255,255,0.6)] leading-relaxed">{sub}</p>
      </div>
      <button
        className="h-[44px] px-5 rounded-[6px] text-[#0a0a0a] text-[14px] font-medium transition-colors"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(245,245,245,0.95) 100%)',
          boxShadow: '0 1px 0 0 rgba(255,255,255,1) inset, 0 2px 4px rgba(0,0,0,0.3)',
        }}
      >
        {buttonLabel}
      </button>
    </GlassCard>
  )
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
  return <div onClick={onClick}>{inner}</div>
}