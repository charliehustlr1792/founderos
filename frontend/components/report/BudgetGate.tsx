'use client'
import { cn } from '@/lib/utils'
import { useFounderStore } from '@/store/useFounderStore'
import { analytics } from '@/lib/analytics'
import { Card, CardContent } from '@/components/ui/card'

const OPTIONS = [
  { value: 'exploring', label: "I'm still exploring — no budget set yet" },
  { value: 'under_5k', label: 'Under $5,000' },
  { value: '5k_15k', label: '$5,000 – $15,000' },
  { value: '15k_50k', label: '$15,000 – $50,000' },
  { value: '50k_plus', label: '$50,000+' },
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
    <Card className="p-0">
      <CardContent className="p-5 space-y-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">One quick question before your build roadmap</p>
          <p className="text-xs text-muted-foreground">This helps us tailor the recommendations to your situation.</p>
        </div>
        <p className="text-sm text-muted-foreground">Do you have a budget in mind for development?</p>
        <div className="space-y-2">
          {OPTIONS.map((opt) => (
            <button key={opt.value} onClick={() => handleSelect(opt.value)}
              className={cn(
                'w-full text-left px-4 py-3 rounded-lg border text-sm transition-all duration-150',
                budget === opt.value
                  ? 'border-primary bg-muted text-foreground font-medium'
                  : 'border-border text-muted-foreground hover:border-input hover:bg-muted/50'
              )}>
              {opt.label}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}