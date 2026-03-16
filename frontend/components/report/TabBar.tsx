'use client'
import { cn } from '@/lib/utils'
import type { RouteKey } from '@/types'

const TABS = [
  { key: 'A' as RouteKey, label: 'Validate',    sub: 'Idea validator' },
  { key: 'B' as RouteKey, label: 'Scope',        sub: 'MVP scope builder' },
  { key: 'C' as RouteKey, label: 'Plan',         sub: 'Build readiness' },
]

export function TabBar({ activeTab, routesGenerated, budgetAnswered, onTabChange }: {
  activeTab: RouteKey
  routesGenerated: RouteKey[]
  budgetAnswered: boolean
  onTabChange: (tab: RouteKey) => void
}) {
  return (
    <div className="flex gap-0 border-b border-[#e5e5e5]">
      {TABS.map((tab) => {
        const isDone   = routesGenerated.includes(tab.key)
        const isLocked = tab.key === 'C' && !budgetAnswered
        const isActive = tab.key === activeTab
        return (
          <button
            key={tab.key}
            disabled={isLocked}
            onClick={() => !isLocked && onTabChange(tab.key)}
            className={cn(
              'flex items-center gap-1.5 px-4 py-[10px] text-[13px] border-b-2 transition-all duration-200',
              isActive
                ? 'border-[#171717] text-[#0a0a0a] font-medium'
                : 'border-transparent text-[#a3a3a3] hover:text-[#525252]',
              isLocked && 'opacity-50 cursor-not-allowed'
            )}
          >
            {isLocked && (
              <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px' }}>⌐</span>
            )}
            <span>{tab.label}</span>
            {isDone && tab.key !== activeTab && (
              <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: '#a3a3a3' }}>✓</span>
            )}
          </button>
        )
      })}
    </div>
  )
}