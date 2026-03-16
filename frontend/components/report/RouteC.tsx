'use client'

import { useFounderStore } from '@/store/useFounderStore'
import { analytics } from '@/lib/analytics'
import {
  Section, BlogLink, StatusDot, CTABlock, GlassCard, BLACK_GLASS_STYLE
} from './ReportSections'
import type { ReportC } from '@/types'

type Props = { report: ReportC }

function getCTA(budget: string | null) {
  if (budget === '15k_50k' || budget === '50k_plus') {
    return {
      headline: "Your idea is build-ready.",
      sub:      "Here's what a first sprint with Crework looks like. Let's review your plan live in 20 minutes.",
      buttonLabel: "Book a free scope call →",
      href:     "https://cal.com/creworklabs",
    }
  }
  if (budget === '5k_15k') {
    return {
      headline: "Your plan is solid.",
      sub:      "Let's talk about the right build approach for your budget.",
      buttonLabel: "Book a free scope call →",
      href:     "https://cal.com/creworklabs",
    }
  }
  return {
    headline: "Great foundation.",
    sub:      "When you're ready to build, our blog has everything you need to move forward.",
    buttonLabel: "Read our founder guides →",
    href:     "https://shikshita.substack.com",
  }
}

const STATUS_BADGE: Record<string, { label: string; bg: string; color: string }> = {
  defined:       { label: 'DEFINED',       bg: '#dcfce7', color: '#15803d' },
  needs_clarity: { label: 'NEEDS CLARITY', bg: '#fef9c3', color: '#a16207' },
  missing:       { label: 'MISSING',       bg: '#fee2e2', color: '#b91c1c' },
}

const WEEK_COLORS = ['#171717', '#262626', '#404040']

export function RouteCReport({ report }: Props) {
  const { sessionId, budget, leadTag } = useFounderStore()

  function handleCTAClick() {
    analytics.ctaClicked(sessionId, 'C', leadTag, budget)
  }

  const cta = getCTA(budget)
  const defined = report.specItems.filter(i => i.status === 'defined').length
  const needsClarity = report.specItems.filter(i => i.status === 'needs_clarity').length
  const missing = report.specItems.filter(i => i.status === 'missing').length
  const total = report.specItems.length
  const pct = Math.round((defined / total) * 100)

  return (
    <div className="space-y-10">

      {/* Spec completeness */}
      <Section title="SPEC COMPLETENESS CHECK">
        {/* Progress bar + stat row */}
        <div className="rounded-[4px] border border-[#e5e5e5] bg-white p-4 space-y-3" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[13px] font-medium text-[#0a0a0a]">{pct}% complete</span>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-[#15803d]" style={{ fontFamily: 'var(--font-geist-mono)' }}>✓ {defined} defined</span>
              <span className="text-[11px] text-[#a16207]" style={{ fontFamily: 'var(--font-geist-mono)' }}>~ {needsClarity} unclear</span>
              <span className="text-[11px] text-[#b91c1c]" style={{ fontFamily: 'var(--font-geist-mono)' }}>✗ {missing} missing</span>
            </div>
          </div>
          {/* Segmented progress bar */}
          <div className="h-[6px] w-full rounded-full overflow-hidden flex gap-[2px]">
            <div className="h-full rounded-full bg-[#16a34a] transition-all duration-700" style={{ width: `${(defined / total) * 100}%` }} />
            <div className="h-full rounded-full bg-[#d97706] transition-all duration-700" style={{ width: `${(needsClarity / total) * 100}%` }} />
            <div className="h-full rounded-full bg-[#dc2626] transition-all duration-700" style={{ width: `${(missing / total) * 100}%` }} />
          </div>
        </div>

        <div>
          {report.specItems.map((item, i) => {
            const badge = STATUS_BADGE[item.status]
            return (
              <div key={i} className="flex items-start gap-3 py-3 border-b border-[#f5f5f5]">
                <StatusDot status={item.status} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-[14px] text-[#0a0a0a]">{item.label}</p>
                    {badge && (
                      <span
                        className="text-[9px] rounded-[3px] px-[6px] py-[2px] font-semibold"
                        style={{ fontFamily: 'var(--font-geist-mono)', background: badge.bg, color: badge.color }}
                      >
                        {badge.label}
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-[#525252] mt-0.5 leading-relaxed">{item.note}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Section>

      {/* Team fit */}
      <Section title="WHAT KIND OF TEAM YOU NEED">
        <GlassCard className="px-5 py-4">
          <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>{report.teamFit}</p>
        </GlassCard>
      </Section>

      {/* 3-week roadmap — vertical timeline, glass 3D cards */}
      <Section title="3-WEEK POC ROADMAP">
        <div className="space-y-0">
          {report.roadmap.map((week, idx) => (
            <div key={week.week} className="flex gap-5">
              {/* Timeline spine */}
              <div className="flex flex-col items-center shrink-0 w-[32px]">
                <div
                  className="w-[32px] h-[32px] rounded-full flex items-center justify-center shrink-0 z-10"
                  style={{
                    background: 'linear-gradient(145deg, #2a2a2a, #0a0a0a)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)',
                  }}
                >
                  <span
                    className="text-[11px] font-bold text-white"
                    style={{ fontFamily: 'var(--font-geist-mono)' }}
                  >
                    W{week.week}
                  </span>
                </div>
                {idx < report.roadmap.length - 1 && (
                  <div className="w-[2px] flex-1 my-2" style={{ background: 'linear-gradient(to bottom, #171717, #e5e5e5)' }} />
                )}
              </div>

              {/* Card */}
              <div
                className="flex-1 rounded-[8px] p-5 mb-5"
                style={{
                  ...BLACK_GLASS_STYLE,
                  // progressively lighter tint per week via opacity overlay
                  background: `linear-gradient(180deg, rgba(255,255,255,${0.06 + idx * 0.04}) 0%, rgba(255,255,255,${0.01 + idx * 0.02}) 100%), ${WEEK_COLORS[idx] ?? '#171717'}`,
                }}
              >
                <p
                  className="text-[11px] mb-1"
                  style={{ fontFamily: 'var(--font-geist-mono)', color: 'rgba(255,255,255,0.4)' }}
                >
                  WEEK {week.week}
                </p>
                <p className="text-[16px] font-semibold text-white mb-3">{week.title}</p>
                <div className="space-y-2">
                  {week.deliverables.map((d, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-[5px] shrink-0 w-[5px] h-[5px] rounded-full" style={{ background: 'rgba(255,255,255,0.3)' }} />
                      <p className="text-[13px] leading-snug" style={{ color: 'rgba(255,255,255,0.7)' }}>{d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Questions to ask agency */}
      <Section title="QUESTIONS TO ASK ANY DEV AGENCY">
        <div>
          {report.questionsToAskAgency.map((q, i) => (
            <div key={i} className="flex items-start gap-4 py-4 border-b border-[#f5f5f5]">
              <span
                className="text-[24px] text-[#e5e5e5] leading-none shrink-0"
                style={{ fontFamily: 'var(--font-geist-mono)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-[14px] text-[#0a0a0a] leading-relaxed">{q}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Blog links */}
      {report.blogLinks?.map((link, i) => (
        <BlogLink key={i} label={link.label} url={link.url} context={link.context} />
      ))}

      {/* CTA */}
      <div className="pt-2" onClick={handleCTAClick}>
        <CTABlock headline={cta.headline} sub={cta.sub} buttonLabel={cta.buttonLabel} href={cta.href} />
      </div>

    </div>
  )
}