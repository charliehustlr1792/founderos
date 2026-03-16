'use client'
import { cn } from '@/lib/utils'
import { useFounderStore } from '@/store/useFounderStore'
import { analytics } from '@/lib/analytics'

const OPTIONS = [
  { value: 'exploring', label: "I'm still exploring — no budget set yet" },
  { value: 'under_5k',  label: 'Under $5,000' },
  { value: '5k_15k',    label: '$5,000 – $15,000' },
  { value: '15k_50k',   label: '$15,000 – $50,000' },
  { value: '50k_plus',  label: '$50,000+' },
]

function deriveLeadTag(budget: string) {
  if (budget === '15k_50k' || budget === '50k_plus') return 'HOT' as const
  if (budget === '5k_15k') return 'WARM' as const
  return 'NURTURE' as const
}

export function BudgetGate({ onAnswered }: { onAnswered: () => void }) {
  const { sessionId, budget, setBudget, setLeadTag, persistToStorage } = useFounderStore()

  function handleSelect(value: string) {
    const tag = deriveLeadTag(value)
    setBudget(value)
    setLeadTag(tag)
    persistToStorage()
    analytics.budgetAnswered(sessionId, value, tag)
    analytics.routeCClicked(sessionId, 'B')
    setTimeout(onAnswered, 300)
  }

  return (
    <div className="border border-[#171717] rounded-[4px] p-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      <div className="space-y-1 mb-5">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#a3a3a3] mb-3"
           style={{ fontFamily: 'var(--font-geist-mono)' }}>
          ONE QUICK QUESTION
        </p>
        <p className="text-[16px] font-medium text-[#0a0a0a]" style={{ fontFamily: 'var(--font-geist-sans)' }}>
          Do you have a budget in mind for development?
        </p>
        <p className="text-[13px] text-[#525252]">Helps us tailor the recommendations.</p>
      </div>
      <div className="space-y-2">
        {OPTIONS.map((opt) => {
          const selected = budget === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={cn(
                'w-full text-left px-4 py-3 rounded-[4px] border flex items-center gap-3 transition-all duration-150',
                selected
                  ? 'border-[#171717] bg-[#f5f5f5]'
                  : 'border-[#e5e5e5] bg-white hover:border-[#525252]'
              )}
              style={{ borderLeft: selected ? '2px solid #171717' : undefined }}
            >
              <span className={cn(
                'w-3.5 h-3.5 rounded-full border shrink-0 flex items-center justify-center',
                selected ? 'border-[#171717] bg-[#171717]' : 'border-[#a3a3a3]'
              )}>
                {selected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
              </span>
              <span className="text-[14px] text-[#0a0a0a]">{opt.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}