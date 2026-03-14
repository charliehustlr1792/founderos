'use client'
import clsx from 'clsx'
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
    <div className="flex gap-1 p-1 bg-[#f5f5f5] border border-[#e5e5e5] rounded-lg">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key
        const isDone = routesGenerated.includes(tab.key)
        const isLocked = tab.key === 'C' && !budgetAnswered
        return (
          <button key={tab.key} onClick={() => !isLocked && onTabChange(tab.key)} disabled={isLocked}
            className={clsx(
              'flex-1 flex flex-col items-start px-3 py-2.5 rounded-md transition-all duration-150 min-w-0',
              isActive ? 'bg-white shadow-sm' : 'hover:bg-[#eeeeee]',
              isLocked && 'opacity-40 cursor-not-allowed'
            )}>
            <div className="flex items-center gap-1.5 w-full">
              <span className={clsx('text-xs font-mono shrink-0', isActive ? 'text-[#0a0a0a]' : 'text-[#999999]')}>{tab.key}</span>
              <span className={clsx('text-sm font-medium truncate', isActive ? 'text-[#0a0a0a]' : 'text-[#555555]')}>{tab.label}</span>
              {isDone && !isActive && <span className="ml-auto shrink-0 text-[#999999]"><DoneIcon /></span>}
              {isLocked && <span className="ml-auto shrink-0 text-[#999999]"><LockIcon /></span>}
            </div>
            <span className="hidden sm:block text-xs text-[#999999] mt-0.5 truncate w-full">
              {isLocked ? 'Answer budget question first' : tab.sub}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function DoneIcon() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1"/><path d="M3.5 6l1.8 1.8L8.5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function LockIcon() {
  return <svg width="11" height="12" viewBox="0 0 11 12" fill="none"><rect x="1" y="5" width="9" height="7" rx="1.5" stroke="currentColor" strokeWidth="1"/><path d="M3 5V3.5a2.5 2.5 0 0 1 5 0V5" stroke="currentColor" strokeWidth="1"/></svg>
}