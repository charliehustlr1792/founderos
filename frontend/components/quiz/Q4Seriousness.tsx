'use client'
import { cn } from '@/lib/utils'
import type { Q4Answer } from '@/types'

const OPTIONS: { value: Q4Answer; label: string; sub: string; circle: 'empty' | 'half' | 'full' }[] = [
  { value: 'exploring',  label: 'Not yet exploring',             sub: "Haven't spoken to potential users yet", circle: 'empty' },
  { value: 'few_convos', label: 'Few conversations',             sub: 'Spoken to some people who confirmed the problem',  circle: 'half' },
  { value: 'waitlist',   label: 'Real interest / waitlist',      sub: 'People have signed up or actively asked for this', circle: 'full' },
]

function CircleIndicator({ type }: { type: 'empty' | 'half' | 'full' }) {
  if (type === 'full') {
    return <span className="w-3 h-3 rounded-full bg-[#171717] shrink-0 inline-block" />
  }
  if (type === 'half') {
    return (
      <span className="w-3 h-3 rounded-full shrink-0 inline-block overflow-hidden border border-[#171717] relative">
        <span className="absolute left-0 top-0 w-1/2 h-full bg-[#171717]" />
      </span>
    )
  }
  return <span className="w-3 h-3 rounded-full shrink-0 inline-block border border-[#525252]" />
}

export function Q4Seriousness({ value, onChange }: { value: Q4Answer | null; onChange: (val: Q4Answer) => void }) {
  return (
    <div className="space-y-3">
      <p className="text-[10px] uppercase tracking-[0.12em] text-[#a3a3a3]"
         style={{ fontFamily: 'var(--font-geist-mono)' }}>
        04 / VALIDATION
      </p>
      <div className="space-y-2">
        {OPTIONS.map((opt) => {
          const selected = value === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              style={{
                borderLeft: selected ? '3px solid #171717' : '1px solid transparent',
                transition: 'all 150ms ease',
              }}
              className={cn(
                'w-full text-left px-5 py-4 rounded-[4px] border flex items-center justify-between gap-4 active:scale-[0.99]',
                selected
                  ? 'border-[#171717] bg-[#fafafa]'
                  : 'border-[#e5e5e5] bg-white hover:border-[#525252]'
              )}
            >
              <div>
                <p className="text-[14px] font-medium text-[#0a0a0a] leading-snug">{opt.label}</p>
                <p className="text-[12px] text-[#525252] mt-0.5">{opt.sub}</p>
              </div>
              <CircleIndicator type={opt.circle} />
            </button>
          )
        })}
      </div>
    </div>
  )
}