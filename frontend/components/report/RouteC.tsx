'use client'

import { useFounderStore } from '@/store/useFounderStore'
import { analytics } from '@/lib/analytics'
import { Card } from '@/components/ui'
import {
  Section, BlogLink, StatusDot, CheckItem, CTABlock
} from './ReportSections'
import type { ReportC } from '@/types'

type Props = {
  report: ReportC
}

export function RouteCReport({ report }: Props) {
  const { sessionId, budget, leadTag } = useFounderStore()

  function handleCTAClick() {
    analytics.ctaClicked(sessionId, 'C', leadTag, budget)
  }

  // Budget-aware CTA config
  const cta = getCTA(budget)

  return (
    <div className="space-y-10 animate-fade-in">

      {/* Spec completeness */}
      <Section title="Spec completeness check">
        <div className="space-y-2">
          {report.specItems.map((item, i) => (
            <Card key={i} className="p-4 flex items-start gap-3">
              <StatusDot status={item.status} />
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm text-[#0a0a0a]">{item.label}</p>
                  <StatusLabel status={item.status} />
                </div>
                <p className="text-xs text-text-muted leading-relaxed">{item.note}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 pt-1">
          <LegendItem status="defined"       label="Defined" />
          <LegendItem status="needs_clarity" label="Needs clarity" />
          <LegendItem status="missing"       label="Missing" />
        </div>
      </Section>

      {/* Team fit */}
      <Section title="What kind of team you need">
        <Card className="p-5">
          <p className="text-sm text-text-secondary leading-relaxed">
            {report.teamFit}
          </p>
        </Card>
      </Section>

      {/* 3-week roadmap */}
      <Section title="3-week POC roadmap">
        <div className="space-y-3">
          {report.roadmap.map((week) => (
            <Card key={week.week} className="p-5 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#999999] bg-[#f5f5f5] border border-[#e5e5e5] px-2 py-0.5 rounded">
                  Week {week.week}
                </span>
                <p className="text-sm font-medium text-[#0a0a0a]">{week.title}</p>
              </div>
              <div className="space-y-2 pl-0">
                {week.deliverables.map((d, i) => (
                  <CheckItem key={i} text={d} />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Questions to ask any agency */}
      <Section title="Questions to ask any dev agency before you hire them">
        <Card className="p-5 space-y-4">
          {report.questionsToAskAgency.map((q, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-xs font-mono text-[#999999] shrink-0 mt-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-sm text-text-secondary leading-relaxed">{q}</p>
            </div>
          ))}
        </Card>
      </Section>

      {/* Blog links */}
      {report.blogLinks?.map((link, i) => (
        <BlogLink key={i} label={link.label} url={link.url} context={link.context} />
      ))}

      {/* Budget-aware CTA */}
      <div className="pt-2" onClick={handleCTAClick}>
        <CTABlock
          headline={cta.headline}
          sub={cta.sub}
          buttonLabel={cta.buttonLabel}
          href={cta.href}
        />
      </div>

    </div>
  )
}

// ─── Budget-aware CTA config ──────────────────────────────────────────────────

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
      sub:      "Let's talk about the right build approach for your budget. We'll help you get the most out of what you have.",
      buttonLabel: "Book a free scope call →",
      href:     "https://cal.com/creworklabs",
    }
  }
  // Exploring / under 5k / null
  return {
    headline: "Great foundation.",
    sub:      "When you're ready to build, here's how to prepare. In the meantime, our blog has everything you need to move forward.",
    buttonLabel: "Read our founder guides →",
    href:     "https://shikshita.substack.com",
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StatusLabel({ status }: { status: string }) {
  const config: Record<string, { label: string; className: string }> = {
    defined:       { label: 'Defined',       className: 'text-[#0a0a0a] bg-[#f0f0f0]' },
    needs_clarity: { label: 'Needs clarity', className: 'text-[#555555] bg-[#f5f5f5]' },
    missing:       { label: 'Missing',       className: 'text-[#999999] bg-transparent border border-[#e5e5e5]' },
  }
  const c = config[status] ?? config.missing
  return (
    <span className={`text-xs px-2 py-0.5 rounded-sm font-medium ${c.className}`}>
      {c.label}
    </span>
  )
}

function LegendItem({ status, label }: { status: 'defined' | 'needs_clarity' | 'missing'; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <StatusDot status={status} />
      <span className="text-xs text-text-muted">{label}</span>
    </div>
  )
}