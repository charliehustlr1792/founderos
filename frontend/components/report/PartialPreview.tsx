'use client'

import { useEffect } from 'react'
import { useFounderStore } from '@/store/useFounderStore'
import { analytics } from '@/lib/analytics'
import { ScoreRing, Card, Divider } from '@/components/ui'
import type { RouteKey, ReportA, ReportB, ReportC } from '@/types'

type Props = {
  route: RouteKey
  report: ReportA | ReportB | ReportC
}

export function PartialPreview({ route, report }: Props) {
  const { sessionId } = useFounderStore()

  useEffect(() => {
    analytics.emailGateShown(sessionId)
  }, [sessionId])

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Score block — always visible */}
      <ScoreBlock route={route} report={report} />

      <Divider />

      {/* Teaser — first block blurred */}
      <div className="relative">
        <TeaserBlock route={route} report={report} />

        {/* Blur overlay */}
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, #ffffff 60%)',
          }}
        />
      </div>

      <p className="text-xs text-text-muted text-center pb-2">
        Enter your email below to unlock the full report
      </p>

    </div>
  )
}

// ─── Score block ──────────────────────────────────────────────────────────────

function ScoreBlock({ route, report }: { route: RouteKey; report: ReportA | ReportB | ReportC }) {
  if (route === 'A') {
    const r = report as ReportA
    return (
      <Card className="p-5">
        <p className="text-xs text-text-muted uppercase tracking-widest mb-4">
          Validation Strength Score
        </p>
        <div className="flex items-center gap-6">
          <ScoreRing score={r.validationScore.overall} size={64} />
          <div className="flex gap-6">
            <ScorePill label="Search demand"    value={r.validationScore.searchDemand} />
            <ScorePill label="Community"        value={r.validationScore.communityDensity} />
            <ScorePill label="Competition"      value={r.validationScore.competitionIntensity} />
          </div>
        </div>
        <p className="text-xs text-text-secondary mt-4 leading-relaxed line-clamp-2">
          {r.keywordNote}
        </p>
      </Card>
    )
  }

  if (route === 'B') {
    const r = report as ReportB
    return (
      <Card className="p-5">
        <p className="text-xs text-text-muted uppercase tracking-widest mb-4">
          Technical Complexity
        </p>
        <div className="flex items-center gap-4">
          <ComplexityBadge level={r.complexityLevel} />
          <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
            {r.complexityExplanation}
          </p>
        </div>
      </Card>
    )
  }

  // Route C
  const r = report as ReportC
  const defined    = r.specItems.filter((i) => i.status === 'defined').length
  const total      = r.specItems.length
  const pct        = Math.round((defined / total) * 100)

  return (
    <Card className="p-5">
      <p className="text-xs text-text-muted uppercase tracking-widest mb-4">
        Spec Completeness
      </p>
      <div className="flex items-center gap-4">
        <ScoreRing score={Math.round(pct / 10)} size={64} />
        <div>
          <p className="text-white font-medium">{pct}% defined</p>
          <p className="text-xs text-text-secondary mt-0.5">
            {defined} of {total} spec areas are clearly scoped
          </p>
        </div>
      </div>
    </Card>
  )
}

// ─── Teaser block — first section, faded out ──────────────────────────────────

function TeaserBlock({ route, report }: { route: RouteKey; report: ReportA | ReportB | ReportC }) {
  if (route === 'A') {
    const r = report as ReportA
    return (
      <div className="space-y-2 pointer-events-none select-none">
        <p className="text-xs text-text-muted uppercase tracking-widest">Demand signals</p>
        {r.demandSignals.slice(0, 2).map((s, i) => (
          <Card key={i} className="p-4">
            <p className="text-sm text-text-secondary">{s.theme}</p>
          </Card>
        ))}
        <Card className="p-4 opacity-50">
          <p className="text-sm text-text-secondary">
            {r.demandSignals[2]?.theme ?? '...'}
          </p>
        </Card>
      </div>
    )
  }

  if (route === 'B') {
    const r = report as ReportB
    return (
      <div className="space-y-2 pointer-events-none select-none">
        <p className="text-xs text-text-muted uppercase tracking-widest">Core features to build</p>
        {r.coreFeatures.slice(0, 1).map((f, i) => (
          <Card key={i} className="p-4">
            <p className="text-sm font-medium text-white">{f.name}</p>
            <p className="text-xs text-text-secondary mt-1">{f.why}</p>
          </Card>
        ))}
        <Card className="p-4 opacity-50">
          <p className="text-sm text-text-secondary">+ {r.coreFeatures.length - 1} more features...</p>
        </Card>
      </div>
    )
  }

  const r = report as ReportC
  return (
    <div className="space-y-2 pointer-events-none select-none">
      <p className="text-xs text-text-muted uppercase tracking-widest">Spec completeness check</p>
      {r.specItems.slice(0, 2).map((item, i) => (
        <Card key={i} className="p-4 flex items-start gap-3">
          <StatusDot status={item.status} />
          <p className="text-sm text-text-secondary">{item.label}</p>
        </Card>
      ))}
      <Card className="p-4 opacity-50">
        <p className="text-sm text-text-secondary">+ {r.specItems.length - 2} more items...</p>
      </Card>
    </div>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ScorePill({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <p className="text-lg font-semibold text-white">{value}<span className="text-text-muted text-sm">/10</span></p>
      <p className="text-xs text-text-muted mt-0.5">{label}</p>
    </div>
  )
}

function ComplexityBadge({ level }: { level: string }) {
  const colours: Record<string, string> = {
    Low:    'text-[#0a0a0a] bg-[#f5f5f5]',
    Medium: 'text-[#0a0a0a] bg-[#eeeeee]',
    High:   'text-[#0a0a0a] bg-[#e5e5e5]',
  }
  return (
    <span className={`px-3 py-1.5 rounded-md text-sm font-medium shrink-0 ${colours[level] ?? colours.Medium}`}>
      {level}
    </span>
  )
}

function StatusDot({ status }: { status: string }) {
  const colours: Record<string, string> = {
    defined:       'bg-[#0a0a0a]',
    needs_clarity: 'bg-[#0a0a0a]/40',
    missing:       'bg-transparent border border-[#cccccc]',
  }
  return (
    <span className={`mt-1 w-2 h-2 rounded-full shrink-0 ${colours[status] ?? colours.missing}`} />
  )
}