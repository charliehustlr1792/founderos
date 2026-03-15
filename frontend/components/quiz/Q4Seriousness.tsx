'use client'
import { cn } from '@/lib/utils'
import type { Q4Answer } from '@/types'

const OPTIONS: { value: Q4Answer; label: string; sub: string }[] = [
  { value: 'exploring', label: 'Not yet — still exploring', sub: "I haven't spoken to potential users yet" },
  { value: 'few_convos', label: 'Yes, a few conversations', sub: "I've spoken to some people who confirmed the problem" },
  { value: 'waitlist', label: 'Yes — I have real interest or a waitlist', sub: 'People have signed up or actively asked for this' },
]

export function Q4Seriousness({ value, onChange }: { value: Q4Answer | null; onChange: (val: Q4Answer) => void }) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">04 / 04</p>
        <h2 className="text-base font-medium leading-snug">Have you spoken to anyone who might use this?</h2>
      </div>
      <div className="space-y-2">
        {OPTIONS.map((opt) => (
          <button key={opt.value} onClick={() => onChange(opt.value)}
            className={cn(
              'w-full text-left px-4 py-3.5 rounded-lg border transition-all duration-150',
              value === opt.value
                ? 'border-primary bg-muted'
                : 'border-border bg-background hover:border-input hover:bg-muted/50'
            )}>
            <p className={cn('text-sm font-medium', value === opt.value ? 'text-foreground' : 'text-muted-foreground')}>{opt.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{opt.sub}</p>
          </button>
        ))}
      </div>
    </div>
  )
}