'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useFounderStore } from '@/store/useFounderStore'
import { api } from '@/lib/api'
import { analytics } from '@/lib/analytics'
import { TabBar } from './TabBar'
import { PartialPreview } from './PartialPreview'
import { EmailGate } from './EmailGate'
import { RouteAReport } from './RouteA'
import { RouteBReport } from './RouteB'
import { RouteCReport } from './RouteC'
import { Spinner } from '@/components/ui'
import type { RouteKey } from '@/types'

export function ReportShell() {
  const router = useRouter()

  const {
    sessionId, quiz, archetype, email,
    activeTab, reports, routesGenerated,
    setReport, setActiveTab, markRouteGenerated,
    persistToStorage,
  } = useFounderStore()

  const [generating, setGenerating] = useState(false)

  // Guard — if no quiz answers, send back to quiz
  useEffect(() => {
    if (!quiz.q1 || !quiz.q2 || !archetype) {
      router.replace('/')
    }
  }, [quiz, archetype, router])

  // Auto-generate the active tab's report if not yet done
  useEffect(() => {
    if (!archetype) return
    if (routesGenerated.includes(activeTab)) return
    generateReport(activeTab)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, archetype])

  // Track when all routes have been viewed
  useEffect(() => {
    if (routesGenerated.length === 3 && email) {
      const start = sessionStorage.getItem('reportStartTime')
      const mins = start
        ? Math.round((Date.now() - parseInt(start)) / 60000)
        : 0
      analytics.allRoutesViewed(sessionId, mins)
    }
  }, [routesGenerated, email, sessionId])

  async function generateReport(route: RouteKey) {
    if (!archetype) return
    setGenerating(true)
    try {
      const body = { quiz, archetype }
      let data

      if (route === 'A') data = await api.reportA(body)
      else if (route === 'B') data = await api.reportB(body)
      else data = await api.reportC(body)

      setReport(route, data)
      markRouteGenerated(route)
      persistToStorage()

      analytics.previewShown(sessionId, route)
    } catch (err) {
      console.error('Failed to generate report:', err)
    } finally {
      setGenerating(false)
    }
  }

  function handleTabChange(tab: RouteKey) {
    // Route C requires budget gate — handled inside RouteBReport
    if (tab === 'C' && !useFounderStore.getState().budget) return

    setActiveTab(tab)

    if (tab === 'B') analytics.routeBClicked(sessionId, activeTab)
    if (tab === 'C') analytics.routeCClicked(sessionId, activeTab)

    // Store start time for all-routes tracking
    if (!sessionStorage.getItem('reportStartTime')) {
      sessionStorage.setItem('reportStartTime', Date.now().toString())
    }
  }

  const activeReport = reports[activeTab]
  const isUnlocked   = !!email
  const isGenerating = generating && !activeReport

  if (!quiz.q1 || !archetype) return null

  return (
    <div className="max-w-xl mx-auto px-5 pt-10 pb-24">

      {/* Header */}
      <div className="mb-8 space-y-1.5">
        <h1 className="text-xl font-semibold text-[#0a0a0a] tracking-tight">
          Your founder report
        </h1>
        {quiz.q2 && (
          <p className="text-sm text-[#999999] leading-relaxed line-clamp-2">
            {quiz.q2}
          </p>
        )}
      </div>

      {/* Tab bar */}
      <TabBar
        activeTab={activeTab}
        routesGenerated={routesGenerated}
        budgetAnswered={!!useFounderStore.getState().budget}
        onTabChange={handleTabChange}
      />

      {/* Content */}
      <div className="mt-8">
        {isGenerating ? (
          <GeneratingState />
        ) : !activeReport ? (
          <GeneratingState />
        ) : !isUnlocked ? (
          <>
            <PartialPreview route={activeTab} report={activeReport} />
            <EmailGate />
          </>
        ) : (
          <FullReport
            route={activeTab}
            onNavigate={handleTabChange}
          />
        )}
      </div>

    </div>
  )
}

// ─── Generating skeleton ──────────────────────────────────────────────────────

function GeneratingState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 space-y-4">
      <Spinner size={20} />
      <p className="text-sm text-text-secondary">Generating your report...</p>
    </div>
  )
}

// ─── Full report switcher ─────────────────────────────────────────────────────

function FullReport({
  route,
  onNavigate,
}: {
  route: RouteKey
  onNavigate: (tab: RouteKey) => void
}) {
  const reports = useFounderStore((s) => s.reports)

  if (route === 'A' && reports.A) {
    return <RouteAReport report={reports.A} onNext={() => onNavigate('B')} />
  }
  if (route === 'B' && reports.B) {
    return <RouteBReport report={reports.B} onNext={() => onNavigate('C')} />
  }
  if (route === 'C' && reports.C) {
    return <RouteCReport report={reports.C} />
  }
  return null
}