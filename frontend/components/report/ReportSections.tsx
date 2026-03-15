'use client'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export function Section({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('space-y-3', className)}>
      <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">{title}</p>
      {children}
    </div>
  )
}

export function BlogLink({ label, url, context }: { label: string; url: string; context: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      className="flex items-start gap-3 p-4 bg-muted/50 border border-border rounded-lg hover:border-input hover:bg-muted transition-colors group">
      <span className="mt-0.5 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors"><ArrowIcon /></span>
      <div className="space-y-1 min-w-0">
        <p className="text-sm font-medium leading-snug">{label}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{context}</p>
      </div>
    </a>
  )
}

export function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1 shrink-0 text-muted-foreground"><CheckIcon /></span>
      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
    </div>
  )
}

export function Tag({ children }: { children: React.ReactNode }) {
  return <Badge variant="secondary" className="shrink-0">{children}</Badge>
}

export function VolumeBar({ level }: { level: 'low' | 'moderate' | 'high' }) {
  const count = { low: 1, moderate: 2, high: 3 }[level]
  return (
    <div className="flex items-end gap-0.5">
      {[1, 2, 3].map((i) => (
        <span key={i} className={cn('w-1 rounded-sm', i <= count ? 'bg-foreground' : 'bg-border', i === 1 ? 'h-2' : i === 2 ? 'h-3' : 'h-4')} />
      ))}
    </div>
  )
}

export function StatusDot({ status }: { status: 'defined' | 'needs_clarity' | 'missing' }) {
  return (
    <span className={cn('mt-1.5 w-2 h-2 rounded-full shrink-0',
      status === 'defined' && 'bg-foreground',
      status === 'needs_clarity' && 'bg-foreground/40',
      status === 'missing' && 'bg-transparent border border-border'
    )} />
  )
}

export function ComplexityBadge({ level }: { level: string }) {
  return <Badge variant="outline" className="text-sm px-3 py-1">{level} complexity</Badge>
}

export function NextButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <Button onClick={onClick} variant="outline" className="w-full justify-between px-5 py-4 h-auto group">
      <span className="text-sm font-medium">{label}</span>
      <span className="text-muted-foreground group-hover:text-foreground transition-colors"><ChevronIcon /></span>
    </Button>
  )
}

export function CTABlock({ headline, sub, buttonLabel, href, onClick }: {
  headline: string; sub: string; buttonLabel: string; href?: string; onClick?: () => void
}) {
  const inner = (
    <Card className="p-0">
      <CardContent className="p-6 space-y-4">
        <div className="space-y-1.5">
          <p className="text-base font-semibold leading-snug">{headline}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{sub}</p>
        </div>
        <Button className="inline-flex gap-2">
          {buttonLabel} <ChevronIcon />
        </Button>
      </CardContent>
    </Card>
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