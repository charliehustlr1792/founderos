'use client'

import { useEffect, useRef, useState } from 'react'
import { useFounderStore } from '@/store/useFounderStore'
import { analytics } from '@/lib/analytics'
import { StatusDot, ComplexityBadge, VolumeBar, GlassCard, BLACK_GLASS_STYLE } from './ReportSections'
import type { RouteKey, ReportA, ReportB, ReportC } from '@/types'

type Props = { route: RouteKey; report: ReportA | ReportB | ReportC }

function useCountUp(target: number, duration = 1200, active = true) {
  const [value, setValue] = useState(0)
  const raf = useRef<number>(0)

  useEffect(() => {
    if (!active) return
    const start = performance.now()
    function easeOutQuart(t: number) { return 1 - Math.pow(1 - t, 4) }
    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      setValue(Math.round(easeOutQuart(progress) * target))
      if (progress < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [target, duration, active])

  return value
}

function ScoreHero({ report }: { report: ReportA }) {
  const score = useCountUp(report.validationScore.overall)
  return (
    <div className="mb-8">
      <GlassCard className="p-6 flex items-center gap-8">
        {/* Big score */}
        <div className="shrink-0">
          <div className="flex items-baseline gap-1">
            <span
              className="text-[72px] font-medium text-white leading-none"
              style={{ fontFamily: 'var(--font-geist-mono)' }}
            >
              {score}
            </span>
            <span
              className="text-[24px]"
              style={{ fontFamily: 'var(--font-geist-mono)', color: 'rgba(255,255,255,0.4)' }}
            >
              /10
            </span>
          </div>
          <p
            className="text-[10px] uppercase tracking-[0.12em] mt-1"
            style={{ fontFamily: 'var(--font-geist-mono)', color: 'rgba(255,255,255,0.4)' }}
          >
            VALIDATION SCORE
          </p>
        </div>
        {/* Divider */}
        <div className="w-[1px] self-stretch" style={{ background: 'rgba(255,255,255,0.1)' }} />
        {/* Sub-scores */}
        <div className="flex flex-col gap-3 flex-1">
          {[
            { label: 'SEARCH DEMAND',     value: report.validationScore.searchDemand },
            { label: 'COMMUNITY DENSITY', value: report.validationScore.communityDensity },
            { label: 'COMPETITION',       value: report.validationScore.competitionIntensity },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="flex-1 h-[3px] rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <div
                  className="h-full rounded-full bg-white transition-all duration-700"
                  style={{ width: `${(s.value / 10) * 100}%` }}
                />
              </div>
              <span
                className="text-[11px] shrink-0 w-[28px] text-right"
                style={{ fontFamily: 'var(--font-geist-mono)', color: 'rgba(255,255,255,0.6)' }}
              >
                {s.value}/10
              </span>
              <p
                className="text-[9px] uppercase tracking-[0.08em] shrink-0 w-[110px]"
                style={{ fontFamily: 'var(--font-geist-mono)', color: 'rgba(255,255,255,0.35)' }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}

function ComplexityHero({ report }: { report: ReportB }) {
  return (
    <div className="mb-8">
      <p className="text-[10px] uppercase tracking-[0.12em] text-[#a3a3a3] mb-3"
         style={{ fontFamily: 'var(--font-geist-mono)' }}>
        TECHNICAL COMPLEXITY
      </p>
      <ComplexityBadge level={report.complexityLevel} />
      <p className="text-[13px] text-[#525252] mt-3 leading-relaxed line-clamp-2">{report.complexityExplanation}</p>
    </div>
  )
}

function SpecHero({ report }: { report: ReportC }) {
  const defined = report.specItems.filter(i => i.status === 'defined').length
  const total = report.specItems.length
  const pct = Math.round((defined / total) * 100)
  const displayPct = useCountUp(pct)
  return (
    <div className="mb-8">
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-[72px] font-medium text-[#0a0a0a] leading-none" style={{ fontFamily: 'var(--font-geist-mono)' }}>
          {displayPct}
        </span>
        <span className="text-[24px] text-[#a3a3a3]" style={{ fontFamily: 'var(--font-geist-mono)' }}>%</span>
      </div>
      <p className="text-[10px] uppercase tracking-[0.12em] text-[#a3a3a3]" style={{ fontFamily: 'var(--font-geist-mono)' }}>
        SPEC COMPLETENESS — {defined} of {total} areas defined
      </p>
    </div>
  )
}

function TeaserContent({ route, report }: { route: RouteKey; report: ReportA | ReportB | ReportC }) {
  if (route === 'A') {
    const r = report as ReportA
    return (
      <div className="space-y-2 pointer-events-none select-none">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#a3a3a3] mb-3" style={{ fontFamily: 'var(--font-geist-mono)' }}>DEMAND SIGNALS</p>
        {r.demandSignals.slice(0, 2).map((s, i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-[#f5f5f5]">
            <p className="text-[14px] text-[#0a0a0a]">{s.theme}</p>
            <div className="flex items-center gap-2">
              <VolumeBar level={s.estimatedVolume} />
              <span className="text-[10px] text-[#a3a3a3] capitalize" style={{ fontFamily: 'var(--font-geist-mono)' }}>{s.estimatedVolume}</span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (route === 'B') {
    const r = report as ReportB
    const f = r.coreFeatures[0]
    return (
      <div className="pointer-events-none select-none">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#a3a3a3] mb-3" style={{ fontFamily: 'var(--font-geist-mono)' }}>CORE FEATURES</p>
        <div className="flex gap-4 items-start rounded-[4px] border-l-2 border-[#171717] pl-4 py-2 border border-[#e5e5e5]">
          <span className="text-[28px] text-[#e5e5e5] leading-none" style={{ fontFamily: 'var(--font-geist-mono)' }}>01</span>
          <div>
            <p className="text-[15px] font-medium text-[#0a0a0a]">{f?.name}</p>
            <p className="text-[13px] text-[#525252] mt-1">{f?.why}</p>
          </div>
        </div>
      </div>
    )
  }

  const r = report as ReportC
  return (
    <div className="space-y-2 pointer-events-none select-none">
      <p className="text-[10px] uppercase tracking-[0.12em] text-[#a3a3a3] mb-3" style={{ fontFamily: 'var(--font-geist-mono)' }}>SPEC COMPLETENESS</p>
      {r.specItems.slice(0, 2).map((item, i) => (
        <div key={i} className="flex items-start gap-3 py-2 border-b border-[#f5f5f5]">
          <StatusDot status={item.status} />
          <p className="text-[14px] text-[#0a0a0a]">{item.label}</p>
        </div>
      ))}
    </div>
  )
}

export function PartialPreview({ route, report }: Props) {
  const { sessionId } = useFounderStore()

  useEffect(() => {
    analytics.emailGateShown(sessionId)
  }, [sessionId])

  return (
    <div className="animate-fade-in">
      {/* Score hero */}
      {route === 'A' && <ScoreHero report={report as ReportA} />}
      {route === 'B' && <ComplexityHero report={report as ReportB} />}
      {route === 'C' && <SpecHero report={report as ReportC} />}

      {/* Teaser with blur */}
      <div className="relative">
        <TeaserContent route={route} report={report} />
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: 'blur(4px)',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.7) 30%, white 70%)',
          }}
        />
      </div>

      <p className="text-[11px] text-[#a3a3a3] text-center mt-4 mb-2" style={{ fontFamily: 'var(--font-geist-mono)' }}>
        ENTER EMAIL BELOW TO UNLOCK FULL REPORT
      </p>
    </div>
  )
}