'use client'
import clsx from 'clsx'
import type { Q1Answer } from '@/types'

const OPTIONS: { value: Q1Answer; label: string; sub: string }[] = [
  { value: 'idea', label: 'Still figuring out if anyone wants this', sub: 'I have an idea but need to validate demand first' },
  { value: 'validation', label: 'I know people want it — now I need to figure out what to build', sub: 'Validated the problem, need help scoping the solution' },
  { value: 'build', label: 'I know what to build — I need a plan to execute', sub: 'Clear on the product, need a roadmap and the right team' },
]

export function Q1Stage({ value, onChange }: { value: Q1Answer | null; onChange: (val: Q1Answer) => void }) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <p className="text-xs text-[#999999] uppercase tracking-widest font-medium">01 / 04</p>
        <h2 className="text-base font-medium text-[#0a0a0a] leading-snug">Where are you right now with your idea?</h2>
      </div>
      <div className="space-y-2">
        {OPTIONS.map((opt) => (
          <button key={opt.value} onClick={() => onChange(opt.value)}
            className={clsx(
              'w-full text-left px-4 py-3.5 rounded-lg border transition-all duration-150',
              value === opt.value
                ? 'border-black bg-[#f5f5f5]'
                : 'border-[#e5e5e5] bg-white hover:border-[#cccccc]'
            )}>
            <p className={clsx('text-sm font-medium leading-snug', value === opt.value ? 'text-[#0a0a0a]' : 'text-[#555555]')}>{opt.label}</p>
            <p className="text-xs text-[#999999] mt-0.5 leading-relaxed">{opt.sub}</p>
          </button>
        ))}
      </div>
    </div>
  )
}