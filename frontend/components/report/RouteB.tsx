'use client'

import { useState } from 'react'
import { useFounderStore } from '@/store/useFounderStore'
import { analytics } from '@/lib/analytics'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Section, BlogLink, CheckItem, ComplexityBadge,
  NextButton, CTABlock
} from './ReportSections'
import { BudgetGate } from './BudgetGate'
import type { ReportB } from '@/types'

type Props = {
  report: ReportB
  onNext: () => void
}

export function RouteBReport({ report, onNext }: Props) {
  const { budget } = useFounderStore()

  return (
    <div className="space-y-10 animate-fade-in">

      {/* Core features */}
      <Section title="Build these — and only these">
        <div className="space-y-2">
          {report.coreFeatures.map((f, i) => (
            <Card key={i}>
              <CardContent className="p-4 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground">{i + 1}</span>
                  <p className="text-sm font-medium">{f.name}</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed pl-4">{f.why}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Skip features */}
      <Section title="Don't build these in V1">
        <div className="space-y-2">
          {report.skipFeatures.map((f, i) => (
            <Card key={i}>
              <CardContent className="p-4 flex items-start gap-3">
                <span className="mt-1 text-muted-foreground shrink-0"><CrossIcon /></span>
                <div className="space-y-0.5">
                  <p className="text-sm text-muted-foreground line-through">{f.name}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.why}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Complexity */}
      <Section title="Technical complexity">
        <Card>
          <CardContent className="p-5 space-y-3">
            <ComplexityBadge level={report.complexityLevel} />
            <p className="text-sm text-muted-foreground leading-relaxed">{report.complexityExplanation}</p>
            <Separator />
            <div>
              <p className="text-xs text-muted-foreground mb-2">Suggested approach</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{report.techApproach}</p>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Common mistakes */}
      <Section title="Common mistakes founders make with this type of product">
        <div className="space-y-3">
          {report.commonMistakes.map((m, i) => (
            <CheckItem key={i} text={m} />
          ))}
        </div>
      </Section>

      {/* AI tools */}
      <Section title="AI tools to build faster">
        <div className="space-y-2">
          {report.aiTools.map((t, i) => (
            <a key={i} href={t.url} target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 bg-muted/50 border border-border rounded-lg hover:border-input hover:bg-muted transition-colors group">
              <div className="space-y-0.5 min-w-0">
                <p className="text-sm font-medium">{t.tool}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{t.useCase}</p>
              </div>
            </a>
          ))}
        </div>
        {report.blogLinks?.[0] && (
          <BlogLink label={report.blogLinks[0].label} url={report.blogLinks[0].url} context={report.blogLinks[0].context} />
        )}
      </Section>

      {/* Marketing plan */}
      <Section title="How to get your first users">
        <Card>
          <CardContent className="p-5 space-y-5">
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Waitlist strategy</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{report.marketingPlan.waitlistAdvice}</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground uppercase tracking-widest">5 communities to join</p>
              {report.marketingPlan.communities.map((c, i) => (
                <CheckItem key={i} text={c} />
              ))}
            </div>
            <Separator />
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Where to engage — with comment templates</p>
              {report.marketingPlan.activeThreads.map((t, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{t.community}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">{t.topic}</span>
                  </div>
                  <div className="bg-muted border border-border rounded-md px-4 py-3">
                    <p className="text-xs text-muted-foreground leading-relaxed italic">&ldquo;{t.suggestedComment}&rdquo;</p>
                  </div>
                </div>
              ))}
            </div>
            <Separator />
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Week 1 checklist</p>
              {report.marketingPlan.weekOneChecklist.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-sm border border-border flex items-center justify-center text-xs text-muted-foreground font-mono">
                    {i + 1}
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Budget gate + Route C button */}
      <div className="space-y-4 pt-2">
        {!budget ? (
          <BudgetGate onAnswered={onNext} />
        ) : (
          <NextButton onClick={onNext} label="See your build roadmap →" />
        )}
      </div>

    </div>
  )
}

function CrossIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}