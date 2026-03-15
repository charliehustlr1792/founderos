'use client'

import { useFounderStore } from '@/store/useFounderStore'
import { analytics } from '@/lib/analytics'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
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
            <Card key={i}>
              <CardContent className="p-4 flex items-start gap-3">
                <StatusDot status={item.status} />
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm">{item.label}</p>
                    <StatusLabel status={item.status} />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.note}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex items-center gap-4 pt-1">
          <LegendItem status="defined"       label="Defined" />
          <LegendItem status="needs_clarity" label="Needs clarity" />
          <LegendItem status="missing"       label="Missing" />
        </div>
      </Section>

      {/* Team fit */}
      <Section title="What kind of team you need">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground leading-relaxed">{report.teamFit}</p>
          </CardContent>
        </Card>
      </Section>

      {/* 3-week roadmap */}
      <Section title="3-week POC roadmap">
        <div className="space-y-3">
          {report.roadmap.map((week) => (
            <Card key={week.week}>
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="font-mono text-xs">Week {week.week}</Badge>
                  <p className="text-sm font-medium">{week.title}</p>
                </div>
                <div className="space-y-2">
                  {week.deliverables.map((d, i) => (
                    <CheckItem key={i} text={d} />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Questions to ask any agency */}
      <Section title="Questions to ask any dev agency before you hire them">
        <Card>
          <CardContent className="p-5 space-y-4">
            {report.questionsToAskAgency.map((q, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-xs font-mono text-muted-foreground shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed">{q}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </Section>

      {/* Blog links */}
      {report.blogLinks?.map((link, i) => (
        <BlogLink key={i} label={link.label} url={link.url} context={link.context} />
      ))}

      {/* Budget-aware CTA */}
      <div className="pt-2" onClick={handleCTAClick}>
        <CTABlock headline={cta.headline} sub={cta.sub} buttonLabel={cta.buttonLabel} href={cta.href} />
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
  const variants: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline' }> = {
    defined:       { label: 'Defined',       variant: 'secondary' },
    needs_clarity: { label: 'Needs clarity', variant: 'outline' },
    missing:       { label: 'Missing',       variant: 'outline' },
  }
  const c = variants[status] ?? variants.missing
  return <Badge variant={c.variant} className="text-xs">{c.label}</Badge>
}

function LegendItem({ status, label }: { status: 'defined' | 'needs_clarity' | 'missing'; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <StatusDot status={status} />
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}