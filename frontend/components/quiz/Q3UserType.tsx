'use client'
import { cn } from '@/lib/utils'
import type { Q3Answer } from '@/types'
import { Briefcase, Code2, Network, Users } from 'lucide-react'

const OPTIONS: { value: Q3Answer; label: string; mono: string }[] = [
  { value: 'consumer', label: 'EVERYDAY PEOPLE', mono: 'B2C' },
  { value: 'smb', label: 'SMBs', mono: 'SMB' },
  { value: 'enterprise', label: 'TEAMS', mono: 'B2B' },
  { value: 'developer', label: 'DEVS', mono: 'DEV' },
]

export function Q3UserType({ value, onChange }: { value: Q3Answer | null; onChange: (val: Q3Answer) => void }) {
  const iconMap = {
    consumer: Users,
    smb: Briefcase,
    enterprise: Network,
    developer: Code2,
  } as const

  return (
    <section className="space-y-5">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-black text-[11px] font-bold text-white">03</span>
        <h3 className="text-[24px] font-semibold leading-7 tracking-[-0.02em] text-[#000000] sm:text-[26px]">
          Who is your primary target audience?
        </h3>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {OPTIONS.map((opt) => {
          const selected = value === opt.value
          const Icon = iconMap[opt.value]
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={cn(
                'rounded-[4px] border px-4 py-3.5 text-center transition-all duration-150 active:scale-[0.99]',
                selected
                  ? 'border-[#171717] bg-[#FCF8EE]'
                  : 'border-[#EAE4D8] bg-[#F8F3E8] hover:border-[#D8D1C2]'
              )}
            >
              <Icon className="mx-auto h-4.5 w-4.5 text-[#191C1D]" strokeWidth={2} />
              <p className="mt-2 text-[11px] font-bold tracking-[0.08em] text-[#191c1d]">{opt.label}</p>
            </button>
          )
        })}
      </div>
    </section>
  )
}