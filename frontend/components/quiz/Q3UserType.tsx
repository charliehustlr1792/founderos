'use client'
import { cn } from '@/lib/utils'
import type { Q3Answer } from '@/types'

const OPTIONS: { value: Q3Answer; label: string; mono: string }[] = [
  { value: 'consumer',   label: 'Individual consumers',          mono: 'B2C' },
  { value: 'smb',        label: 'Small businesses / freelancers', mono: 'SMB' },
  { value: 'enterprise', label: 'Enterprises / large teams',      mono: 'B2B' },
  { value: 'developer',  label: 'Developers / technical users',   mono: 'DEV' },
]

export function Q3UserType({ value, onChange }: { value: Q3Answer | null; onChange: (val: Q3Answer) => void }) {
  return (
    <div className="space-y-3">
      <p className="text-[10px] uppercase tracking-[0.12em] text-[#a3a3a3]"
         style={{ fontFamily: 'var(--font-geist-mono)' }}>
        03 / TARGET USER
      </p>
      <div className="grid grid-cols-2 gap-2">
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
                'text-left px-4 py-3 rounded-[4px] border active:scale-[0.99]',
                selected
                  ? 'border-[#171717] bg-[#fafafa]'
                  : 'border-[#e5e5e5] bg-white hover:border-[#525252]'
              )}
            >
              <p className="text-[14px] font-medium text-[#0a0a0a] leading-snug">{opt.label}</p>
              <p className="text-[11px] text-[#a3a3a3] mt-0.5" style={{ fontFamily: 'var(--font-geist-mono)' }}>{opt.mono}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}