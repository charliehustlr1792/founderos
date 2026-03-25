'use client'
import { cn } from '@/lib/utils'
import type { Q4Answer } from '@/types'

const OPTIONS: { value: Q4Answer; label: string; sub: string; circle: 'empty' | 'half' | 'full' }[] = [
  { value: 'exploring', label: 'Not yet - Just an initial spark', sub: '', circle: 'empty' },
  { value: 'few_convos', label: 'Few conversations - Talking to potential users', sub: '', circle: 'half' },
  { value: 'waitlist', label: 'Real interest - People are asking for it or waitlisted', sub: '', circle: 'full' },
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
    <section className="space-y-5">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-black text-[11px] font-bold text-white">04</span>
        <h3 className="text-[24px] font-semibold leading-7 tracking-[-0.02em] text-[#000000] sm:text-[26px]">
          What is your current validation status?
        </h3>
      </div>

      <div className="space-y-2.5">
        {OPTIONS.map((opt) => {
          const selected = value === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={cn(
                'flex w-full items-center gap-3 rounded-[4px] border px-4 py-4 text-left transition-all duration-150 active:scale-[0.99]',
                selected
                  ? 'border-[#171717] bg-[#FCF8EE]'
                  : 'border-[#EAE4D8] bg-[#F8F3E8] hover:border-[#D8D1C2]'
              )}
            >
              <CircleIndicator type={opt.circle} />
              <p className="text-[14px] font-semibold leading-6 text-black">{opt.label}</p>
            </button>
          )
        })}
      </div>
    </section>
  )
}