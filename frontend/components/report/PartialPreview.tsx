'use client'

import { useEffect } from 'react'
import { useFounderStore } from '@/store/useFounderStore'
import { analytics } from '@/lib/analytics'
import { ScoreRing } from '@/components/ui'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { StatusDot, ComplexityBadge } from './ReportSections'
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
      <ScoreBlock route={route} report={report} />
      <Separator />
      <div className="relative">
        <TeaserBlock route={route} report={report} />
        <div className="absolute inset-0 rounded-lg" style={{ background: 'linear-gradient(to bottom, transparent 0%, hsl(var(--background)) 60%)' }} />
      </div>
      <p className="text-xs text-muted-foreground text-center pb-2">
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
      <Card>
        <CardContent className="p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Validation Strength Score</p>
          <div className="flex items-center gap-6">
            <ScoreRing score={r.validationScore.overall} size={64} />
            <div className="flex gap-6">
              <ScorePill label="Search demand"   value={r.validationScore.searchDemand} />
              <ScorePill label="Community"       value={r.validationScore.communityDensity} />
              <ScorePill label="Competition"     value={r.validationScore.competitionIntensity} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4 leading-relaxed line-clamp-2">{r.keywordNote}</p>
        </CardContent>
      </Card>
    )
  }

  if (route === 'B') {
    const r = report as ReportB
    return (
      <Card>
        <CardContent className="p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Technical Complexity</p>
          <div className="flex items-center gap-4">
            <ComplexityBadge level={r.complexityLevel} />
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{r.complexityExplanation}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const r = report as ReportC
  const defined = r.specItems.filter((i) => i.status === 'defined').length
  const total   = r.specItems.length
  const pct     = Math.round((defined / total) * 100)

  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Spec Completeness</p>
        <div className="flex items-center gap-4">
          <ScoreRing score={Math.round(pct / 10)} size={64} />
          <div>
            <p className="font-medium">{pct}% defined</p>
            <p className="text-xs text-muted-foreground mt-0.5">{defined} of {total} spec areas are clearly scoped</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Teaser block — first section, faded out ──────────────────────────────────

function TeaserBlock({ route, report }: { route: RouteKey; report: ReportA | ReportB | ReportC }) {
  if (route === 'A') {
    const r = report as ReportA
    return (
      <div className="space-y-2 pointer-events-none select-none">
        <p className="text-xs text-muted-foreground uppercase tracking-widest">Demand signals</p>
        {r.demandSignals.slice(0, 2).map((s, i) => (
          <Card key={i}><CardContent className="p-4"><p className="text-sm text-muted-foreground">{s.theme}</p></CardContent></Card>
        ))}
        <Card className="opacity-50"><CardContent className="p-4"><p className="text-sm text-muted-foreground">{r.demandSignals[2]?.theme ?? '...'}</p></CardContent></Card>
      </div>
    )
  }

  if (route === 'B') {
    const r = report as ReportB
    return (
      <div className="space-y-2 pointer-events-none select-none">
        <p className="text-xs text-muted-foreground uppercase tracking-widest">Core features to build</p>
        {r.coreFeatures.slice(0, 1).map((f, i) => (
          <Card key={i}><CardContent className="p-4">
            <p className="text-sm font-medium">{f.name}</p>
            <p className="text-xs text-muted-foreground mt-1">{f.why}</p>
          </CardContent></Card>
        ))}
        <Card className="opacity-50"><CardContent className="p-4"><p className="text-sm text-muted-foreground">+ {r.coreFeatures.length - 1} more features...</p></CardContent></Card>
      </div>
    )
  }

  const r = report as ReportC
  return (
    <div className="space-y-2 pointer-events-none select-none">
      <p className="text-xs text-muted-foreground uppercase tracking-widest">Spec completeness check</p>
      {r.specItems.slice(0, 2).map((item, i) => (
        <Card key={i}><CardContent className="p-4 flex items-start gap-3">
          <StatusDot status={item.status} />
          <p className="text-sm text-muted-foreground">{item.label}</p>
        </CardContent></Card>
      ))}
      <Card className="opacity-50"><CardContent className="p-4"><p className="text-sm text-muted-foreground">+ {r.specItems.length - 2} more items...</p></CardContent></Card>
    </div>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ScorePill({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <p className="text-lg font-semibold">{value}<span className="text-muted-foreground text-sm">/10</span></p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </div>
  )
}