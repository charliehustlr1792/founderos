import clsx from 'clsx'
import { cn } from '@/lib/utils'

// Re-export shadcn primitives so the rest of the app can import from one place
export { Button } from '@/components/ui/button'
export { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
export { Input } from '@/components/ui/input'
export { Textarea } from '@/components/ui/textarea'
export { Separator } from '@/components/ui/separator'
export { Badge } from '@/components/ui/badge'
export { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

// ─── Custom primitives ────────────────────────────────────────────────────────

export function Spinner({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="animate-spin">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.2" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export function Divider({ className }: { className?: string }) {
  return <div className={cn('h-px bg-border', className)} />
}

export function ScoreRing({ score, size = 56 }: { score: number; size?: number }) {
  const r = (size - 6) / 2
  const circumference = 2 * Math.PI * r
  const fill = (score / 10) * circumference
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--border)" strokeWidth="3" />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--foreground)" strokeWidth="3" strokeLinecap="round" strokeDasharray={`${fill} ${circumference}`} transform={`rotate(-90 ${size/2} ${size/2})`} />
      <text x={size/2} y={size/2} textAnchor="middle" dominantBaseline="central" fill="var(--foreground)" fontSize={size * 0.24} fontWeight="500">{score}</text>
    </svg>
  )
}