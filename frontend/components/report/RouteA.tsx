'use client'

import { Card } from '@/components/ui'
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
            <Card key={i} className="p-4 flex items-start justify-between gap-4">
              <div className="space-y-1 min-w-0">
                <p className="text-sm text-[#0a0a0a] leading-snug">{s.theme}</p>
                <p className="text-xs text-text-muted">{s.intent}</p>
              </div>
              <div className="shrink-0 flex flex-col items-end gap-1">
                <VolumeBar level={s.estimatedVolume} />
                <span className="text-xs text-text-muted capitalize">{s.estimatedVolume}</span>
              </div>
            </Card>
          ))}
        </div>
        <p className="text-xs text-text-secondary leading-relaxed pt-1">
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
              className="flex items-start gap-3 p-4 bg-surface border border-border rounded-lg hover:border-border-high transition-colors group"
            >
              <Tag>{c.platform}</Tag>
              <div className="space-y-0.5 min-w-0">
                <p className="text-sm font-medium text-[#0a0a0a] group-hover:text-[#0a0a0a]/80">
                  {c.name}
                </p>
                <p className="text-xs text-text-muted leading-relaxed">
                  {c.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Blog link */}
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
            <Card key={i} className="p-4 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-[#0a0a0a]">{c.name}</p>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                {c.whatTheyDo}
              </p>
              <div className="pt-1 border-t border-border">
                <p className="text-xs text-text-muted mb-0.5">Gap they leave open</p>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {c.gap}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Validation scores */}
      <Section title="Validation strength score">
        <Card className="p-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ScoreItem label="Overall"     value={report.validationScore.overall} large />
            <ScoreItem label="Search"      value={report.validationScore.searchDemand} />
            <ScoreItem label="Community"   value={report.validationScore.communityDensity} />
            <ScoreItem label="Competition" value={report.validationScore.competitionIntensity} />
          </div>
        </Card>
      </Section>

      {/* CTA to Route B */}
      <div className="space-y-3 pt-2">
        <p className="text-xs text-text-muted">
          Your idea shows real demand signals. The next step is figuring out
          exactly what to build.
        </p>
        <NextButton
          onClick={onNext}
          label="Now scope your MVP →"
        />
      </div>

    </div>
  )
}

function ScoreItem({ label, value, large }: { label: string; value: number; large?: boolean }) {
  return (
    <div className={large ? 'col-span-2 sm:col-span-1' : ''}>
      <p className={`font-semibold text-[#0a0a0a] ${large ? 'text-3xl' : 'text-2xl'}`}>
        {value}
        <span className="text-text-muted text-base font-normal">/10</span>
      </p>
      <p className="text-xs text-text-muted mt-0.5">{label}</p>
    </div>
  )
}