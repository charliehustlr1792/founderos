'use client'
import { cn } from '@/lib/utils'
import type { Q1Answer } from '@/types'

const OPTIONS: { value: Q1Answer; label: string; sub: string; num: string }[] = [
  { value: 'idea',       num: '01', label: 'Still figuring out if anyone wants this',                  sub: 'Validate demand first' },
  { value: 'validation', num: '02', label: "I know people want it — need to scope what to build",      sub: 'Scope the solution' },
  { value: 'build',      num: '03', label: 'I know what to build — I need a plan to execute',          sub: 'Get a roadmap' },
]

export function Q1Stage({ value, onChange }: { value: Q1Answer | null; onChange: (val: Q1Answer) => void }) {
  return (
    <div className="space-y-3">
      <p className="text-[10px] uppercase tracking-[0.12em] text-[#a3a3a3]"
         style={{ fontFamily: 'var(--font-geist-mono)' }}>
        01 / STAGE
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
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
                'flex-1 text-left px-5 py-4 rounded-[4px] border',
                'active:scale-[0.99]',
                selected
                  ? 'border-[#171717] bg-[#fafafa]'
                  : 'border-[#e5e5e5] bg-white hover:border-[#525252]'
              )}
            >
              <span
                className="block text-[24px] leading-none mb-2"
                style={{
                  fontFamily: 'var(--font-geist-mono)',
                  color: selected ? '#171717' : '#e5e5e5',
                  transition: 'color 150ms ease',
                }}
              >
                {opt.num}
              </span>
              <p className="text-[13px] font-medium text-[#0a0a0a] leading-snug">{opt.label}</p>
              <p className="text-[11px] text-[#a3a3a3] mt-1" style={{ fontFamily: 'var(--font-geist-mono)' }}>{opt.sub}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}