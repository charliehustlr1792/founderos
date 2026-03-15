'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Section, BlogLink, Tag, VolumeBar, NextButton, CTABlock
} from './ReportSections'
import type { ReportA } from '@/types'

type Props = {
  report: ReportA
  onNext: () => void
}

export function RouteAReport({ report, onNext }: Props) {
  return (
    <div className="space-y-10 animate-fade-in">

      {/* Demand signals */}
      <Section title="Demand signals">
        <div className="space-y-2">
          {report.demandSignals.map((s, i) => (
            <Card key={i}>
              <CardContent className="p-4 flex items-start justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <p className="text-sm leading-snug">{s.theme}</p>
                  <p className="text-xs text-muted-foreground">{s.intent}</p>
                </div>
                <div className="shrink-0 flex flex-col items-end gap-1">
                  <VolumeBar level={s.estimatedVolume} />
                  <span className="text-xs text-muted-foreground capitalize">{s.estimatedVolume}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed pt-1">
          {report.keywordNote}
        </p>
      </Section>

      {/* Communities */}
      <Section title="Where your users are">
        <div className="space-y-2">
          {report.communities.map((c, i) => (
            <a
              key={i}
              href={c.url ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 bg-muted/50 border border-border rounded-lg hover:border-input hover:bg-muted transition-colors group"
            >
              <Tag>{c.platform}</Tag>
              <div className="space-y-0.5 min-w-0">
                <p className="text-sm font-medium group-hover:text-foreground/80">
                  {c.name}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {c.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        {report.blogLinks?.[0] && (
          <BlogLink
            label={report.blogLinks[0].label}
            url={report.blogLinks[0].url}
            context={report.blogLinks[0].context}
          />
        )}
      </Section>

      {/* Competitors */}
      <Section title="Who's already in this space">
        <div className="space-y-3">
          {report.competitors.map((c, i) => (
            <Card key={i}>
              <CardContent className="p-4 space-y-2">
                <p className="text-sm font-medium">{c.name}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {c.whatTheyDo}
                </p>
                <Separator />
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Gap they leave open</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {c.gap}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Validation scores */}
      <Section title="Validation strength score">
        <Card>
          <CardContent className="p-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <ScoreItem label="Overall"     value={report.validationScore.overall} large />
              <ScoreItem label="Search"      value={report.validationScore.searchDemand} />
              <ScoreItem label="Community"   value={report.validationScore.communityDensity} />
              <ScoreItem label="Competition" value={report.validationScore.competitionIntensity} />
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* CTA to Route B */}
      <div className="space-y-3 pt-2">
        <p className="text-xs text-muted-foreground">
          Your idea shows real demand signals. The next step is figuring out
          exactly what to build.
        </p>
        <NextButton onClick={onNext} label="Now scope your MVP →" />
      </div>

    </div>
  )
}

function ScoreItem({ label, value, large }: { label: string; value: number; large?: boolean }) {
  return (
    <div className={large ? 'col-span-2 sm:col-span-1' : ''}>
      <p className={`font-semibold ${large ? 'text-3xl' : 'text-2xl'}`}>
        {value}
        <span className="text-muted-foreground text-base font-normal">/10</span>
      </p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </div>
  )
}