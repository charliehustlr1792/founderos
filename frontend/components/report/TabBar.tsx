'use client'
import { cn } from '@/lib/utils'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { RouteKey } from '@/types'

const TABS = [
  { key: 'A' as RouteKey, label: 'Validate', sub: 'Idea validator' },
  { key: 'B' as RouteKey, label: 'Scope', sub: 'MVP scope builder' },
  { key: 'C' as RouteKey, label: 'Plan', sub: 'Build readiness' },
]

export function TabBar({ activeTab, routesGenerated, budgetAnswered, onTabChange }: {
  activeTab: RouteKey; routesGenerated: RouteKey[]; budgetAnswered: boolean; onTabChange: (tab: RouteKey) => void
}) {
  return (
    <Tabs value={activeTab} className="w-full">
      <TabsList className="w-full h-auto p-1">
        {TABS.map((tab) => {
          const isDone = routesGenerated.includes(tab.key)
          const isLocked = tab.key === 'C' && !budgetAnswered
          return (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              disabled={isLocked}
              onClick={() => !isLocked && onTabChange(tab.key)}
              className={cn(
                'flex-1 flex flex-col items-start gap-0.5 px-3 py-2 h-auto rounded-md min-w-0',
                isLocked && 'opacity-40 cursor-not-allowed'
              )}
            >
              <div className="flex items-center gap-1.5 w-full">
                <span className="text-xs font-mono shrink-0">{tab.key}</span>
                <span className="text-sm font-medium truncate">{tab.label}</span>
                {isDone && tab.key !== activeTab && <span className="ml-auto shrink-0 opacity-50"><DoneIcon /></span>}
                {isLocked && <span className="ml-auto shrink-0 opacity-40"><LockIcon /></span>}
              </div>
              <span className="hidden sm:block text-xs text-muted-foreground truncate w-full text-left">
                {isLocked ? 'Answer budget question first' : tab.sub}
              </span>
            </TabsTrigger>
          )
        })}
      </TabsList>
    </Tabs>
  )
}

function DoneIcon() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1"/><path d="M3.5 6l1.8 1.8L8.5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function LockIcon() {
  return <svg width="11" height="12" viewBox="0 0 11 12" fill="none"><rect x="1" y="5" width="9" height="7" rx="1.5" stroke="currentColor" strokeWidth="1"/><path d="M3 5V3.5a2.5 2.5 0 0 1 5 0V5" stroke="currentColor" strokeWidth="1"/></svg>
}