'use client'
import clsx from 'clsx'

export function Section({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('space-y-3', className)}>
      <p className="text-xs text-[#999999] uppercase tracking-widest">{title}</p>
      {children}
    </div>
  )
}

export function BlogLink({ label, url, context }: { label: string; url: string; context: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      className="flex items-start gap-3 p-4 bg-[#f5f5f5] border border-[#e5e5e5] rounded-lg hover:border-[#cccccc] transition-colors group">
      <span className="mt-0.5 shrink-0 text-[#999999] group-hover:text-[#0a0a0a] transition-colors"><ArrowIcon /></span>
      <div className="space-y-1 min-w-0">
        <p className="text-sm font-medium text-[#0a0a0a] leading-snug">{label}</p>
        <p className="text-xs text-[#999999] leading-relaxed">{context}</p>
      </div>
    </a>
  )
}

export function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1 shrink-0 text-[#999999]"><CheckIcon /></span>
      <p className="text-sm text-[#555555] leading-relaxed">{text}</p>
    </div>
  )
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-sm bg-[#f5f5f5] border border-[#e5e5e5] text-[#555555]">
      {children}
    </span>
  )
}

export function VolumeBar({ level }: { level: 'low' | 'moderate' | 'high' }) {
  const count = { low: 1, moderate: 2, high: 3 }[level]
  return (
    <div className="flex items-end gap-0.5">
      {[1, 2, 3].map((i) => (
        <span key={i} className={clsx('w-1 rounded-sm', i <= count ? 'bg-[#0a0a0a]' : 'bg-[#e5e5e5]', i === 1 ? 'h-2' : i === 2 ? 'h-3' : 'h-4')} />
      ))}
    </div>
  )
}

export function StatusDot({ status }: { status: 'defined' | 'needs_clarity' | 'missing' }) {
  return (
    <span className={clsx('mt-1.5 w-2 h-2 rounded-full shrink-0',
      status === 'defined' && 'bg-[#0a0a0a]',
      status === 'needs_clarity' && 'bg-[#0a0a0a]/40',
      status === 'missing' && 'bg-transparent border border-[#cccccc]'
    )} />
  )
}

export function ComplexityBadge({ level }: { level: string }) {
  return (
    <span className="px-3 py-1 rounded-md text-sm font-medium bg-[#f5f5f5] border border-[#e5e5e5] text-[#0a0a0a]">
      {level} complexity
    </span>
  )
}

export function NextButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button onClick={onClick}
      className="w-full flex items-center justify-between px-5 py-4 bg-white border border-[#e5e5e5] rounded-lg hover:border-[#cccccc] transition-colors group">
      <span className="text-sm font-medium text-[#0a0a0a]">{label}</span>
      <span className="text-[#999999] group-hover:text-[#0a0a0a] transition-colors"><ChevronIcon /></span>
    </button>
  )
}

export function CTABlock({ headline, sub, buttonLabel, href, onClick }: {
  headline: string; sub: string; buttonLabel: string; href?: string; onClick?: () => void
}) {
  const inner = (
    <div className="p-6 bg-[#f5f5f5] border border-[#e5e5e5] rounded-lg space-y-4">
      <div className="space-y-1.5">
        <p className="text-base font-semibold text-[#0a0a0a] leading-snug">{headline}</p>
        <p className="text-sm text-[#555555] leading-relaxed">{sub}</p>
      </div>
      <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-black rounded-md text-sm font-medium text-white hover:bg-black/85 transition-colors cursor-pointer">
        {buttonLabel} <ChevronIcon />
      </div>
    </div>
  )
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
  return <div onClick={onClick}>{inner}</div>
}

function ArrowIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7h9M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function CheckIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7.5l3 3 6-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function ChevronIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
}