'use client'
import clsx from 'clsx'
import type { Q3Answer } from '@/types'

const OPTIONS: { value: Q3Answer; label: string }[] = [
  { value: 'consumer', label: 'Individual consumers' },
  { value: 'smb', label: 'Small businesses / freelancers' },
  { value: 'enterprise', label: 'Enterprises / large teams' },
  { value: 'developer', label: 'Developers / technical users' },
]

export function Q3UserType({ value, onChange }: { value: Q3Answer | null; onChange: (val: Q3Answer) => void }) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <p className="text-xs text-[#999999] uppercase tracking-widest font-medium">03 / 04</p>
        <h2 className="text-base font-medium text-[#0a0a0a] leading-snug">Who are you building this for?</h2>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {OPTIONS.map((opt) => (
          <button key={opt.value} onClick={() => onChange(opt.value)}
            className={clsx(
              'text-left px-4 py-3.5 rounded-lg border transition-all duration-150',
              value === opt.value
                ? 'border-black bg-[#f5f5f5] text-[#0a0a0a]'
                : 'border-[#e5e5e5] bg-white text-[#555555] hover:border-[#cccccc]'
            )}>
            <p className="text-sm font-medium">{opt.label}</p>
          </button>
        ))}
      </div>
    </div>
  )
}