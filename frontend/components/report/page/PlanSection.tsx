import type { ReportC } from '@/types'
import { useEffect, useMemo, useRef, useState } from 'react'
import { GateOverlay } from './shared'

type PlanSectionProps = {
  reportC: ReportC | null
  gateUnlocked: boolean
}

type RoadmapItem = { id: string; label: string; body: string }

export function PlanSection({ reportC, gateUnlocked }: PlanSectionProps) {
  const [completedRoadmap, setCompletedRoadmap] = useState<string[]>([])
  const economicsCanvasRef = useRef<HTMLCanvasElement | null>(null)

  const plan = reportC?.whatToBuildPlan

  const buildDecisions = plan?.buildDecisions?.length
    ? plan.buildDecisions
    : [
        {
          group: 'build_first' as const,
          title: 'Artist profile + portfolio',
          body: 'Name, location, style tags, photo gallery of past work. This is why people open the app - it needs to be beautiful and fast.',
        },
        {
          group: 'build_first' as const,
          title: 'Location-based search',
          body: 'Simple map or list filtered by city or neighbourhood. This is the core unlock - no existing competitor does this well for independents.',
        },
        {
          group: 'build_v2' as const,
          title: 'In-app booking + payments',
          body: 'Powerful, but complex. Start by sending a WhatsApp or DM booking request. Automate payments once you have 50+ active artists.',
        },
        {
          group: 'build_v2' as const,
          title: 'Reviews and ratings',
          body: 'Critical for trust long-term, but not needed to get your first 20 artists onboarded. Focus on supply first.',
        },
        {
          group: 'skip_for_now' as const,
          title: 'AI style matching',
          body: 'A nice-to-have but not a need-to-have at this stage. Nail the basics first.',
        },
        {
          group: 'skip_for_now' as const,
          title: 'Subscription tiers for artists',
          body: 'Monetise through commission per booking first. Pricing tiers add friction before you have proven core value.',
        },
      ]

  const northStar = plan?.northStarMetric ?? {
    metric: 'Bookings completed per artist per month',
    explanation:
      'If each artist gets 5+ bookings per month through your app, you have a product worth building. Below that, improve discovery and trust before adding more features.',
    target: 'Target: 5+ bookings/artist/month',
    trackingNote: 'Track from day 1',
  }

  const unitEconomics = plan?.unitEconomics ?? {
    title: 'How many bookings you need at different commission rates',
    description: 'At 10% commission, 200 bookings = 1k MRR.',
    points: [
      { commissionLabel: '5% commission', bookingsToTarget: 400, artistsNeeded: 40 },
      { commissionLabel: '10% commission', bookingsToTarget: 200, artistsNeeded: 20 },
      { commissionLabel: '15% commission', bookingsToTarget: 133, artistsNeeded: 14 },
      { commissionLabel: '20% commission', bookingsToTarget: 100, artistsNeeded: 10 },
    ],
  }

  const riskCallout = plan?.riskCallout ?? {
    title: "Your biggest risk isn't building the wrong product.",
    body: 'The two-sided marketplace cold start is the core challenge. Onboard supply first in one city before scaling demand.',
  }

  const roadmap: RoadmapItem[] = useMemo(() => {
    if (reportC?.roadmap?.length) {
      return reportC.roadmap.slice(0, 4).map((week) => ({
        id: `W${week.week}`,
        label: `W${week.week}`,
        body: `${week.title}. ${week.deliverables.slice(0, 2).join(' ')}`,
      }))
    }

    return [
      { id: 'W1', label: 'W1', body: 'Talk to 10 suppliers and 10 customers. Confirm willingness and what they value before building.' },
      { id: 'W2', label: 'W2', body: 'Build a no-code prototype with profile and search. Watch 5 users use it and note friction points.' },
      { id: 'W3', label: 'W3', body: 'Manually onboard 5 suppliers and route first customer intros. Close the loop by hand.' },
      { id: 'W4', label: 'W4', body: 'Measure your north star. If signal is weak, return to interviews before adding features.' },
    ]
  }, [reportC?.roadmap])

  useEffect(() => {
    if (!economicsCanvasRef.current) return

    let chart: { destroy: () => void } | null = null
    let destroyed = false

    const buildChart = async () => {
      const chartModule = await import('chart.js/auto')
      const Chart = chartModule.default

      if (destroyed || !economicsCanvasRef.current) return

      chart = new Chart(economicsCanvasRef.current, {
        type: 'bar',
        data: {
          labels: unitEconomics.points.map((point) => point.commissionLabel),
          datasets: [
            {
              label: 'Bookings to reach 1k MRR',
              data: unitEconomics.points.map((point) => point.bookingsToTarget),
              backgroundColor: '#1a1917',
              borderRadius: 6,
              borderSkipped: false,
            },
            {
              label: 'Artists needed (10 bookings each)',
              data: unitEconomics.points.map((point) => point.artistsNeeded),
              backgroundColor: '#d1cec7',
              borderRadius: 6,
              borderSkipped: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                boxWidth: 10,
                boxHeight: 10,
                color: '#6b6860',
                font: { size: 11 },
                padding: 16,
              },
            },
          },
          scales: {
            x: {
              ticks: { color: '#a8a59f', font: { size: 11 } },
              grid: { display: false },
              border: { display: false },
            },
            y: {
              ticks: { color: '#a8a59f', font: { size: 11 } },
              grid: { color: '#e8e6e0', lineWidth: 0.5 },
              border: { display: false },
            },
          },
        },
      })
    }

    buildChart()

    return () => {
      destroyed = true
      if (chart) chart.destroy()
    }
  }, [unitEconomics.points])

  const toggleRoadmapItem = (id: string) => {
    setCompletedRoadmap((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id]
    )
  }

  const sectionClass = 'mb-9'

  return (
    <div className="relative">
      <div className={`${!gateUnlocked ? 'pointer-events-none select-none' : ''}`}>
        <div className={sectionClass}>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-[#a8a59f]">What to build vs what to skip in version 1</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {buildDecisions.map((item, idx) => {
              const isBuildFirst = item.group === 'build_first'
              const isSkip = item.group === 'skip_for_now'
              const label = isBuildFirst ? 'Build this first' : item.group === 'build_v2' ? 'Build in v2' : 'Skip for now'

              return (
                <div
                  key={`${item.title}-${idx}`}
                  className={`rounded-xl border bg-white p-4 ${isBuildFirst ? 'border-[#1a1917]' : 'border-[#e8e6e0]'} ${isSkip ? 'opacity-65' : ''}`}
                >
                  <p className={`mb-2 text-[10px] font-semibold uppercase tracking-[0.08em] ${isBuildFirst ? 'text-[#1a1917]' : 'text-[#a8a59f]'}`}>{label}</p>
                  <h3 className="mb-1 text-[14px] font-semibold text-[#1a1917]">{item.title}</h3>
                  <p className="text-[12px] leading-6 text-[#6b6860]">{item.body}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className={sectionClass}>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-[#a8a59f]">The one number that tells you it is working</p>
          <div className="rounded-xl border border-[#e8e6e0] bg-white p-5">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#a8a59f]">Your north star metric</p>
            <h3 className="mb-1 text-[20px] font-semibold text-[#1a1917]">{northStar.metric}</h3>
            <p className="text-[13px] leading-6 text-[#6b6860]">{northStar.explanation}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-md bg-[#e8f5ee] px-3 py-2 text-[12px] font-medium text-[#2d6a4f]">{northStar.target}</span>
              <span className="rounded-md bg-[#f0ede8] px-3 py-2 text-[12px] font-medium text-[#6b6860]">{northStar.trackingNote}</span>
            </div>
          </div>
        </div>

        <div className={sectionClass}>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-[#a8a59f]">Your path to 1k MRR</p>
          <div className="rounded-xl border border-[#e8e6e0] bg-white p-5">
            <h3 className="mb-1 text-[14px] font-semibold text-[#1a1917]">{unitEconomics.title}</h3>
            <p className="mb-4 text-[12px] text-[#6b6860]">{unitEconomics.description}</p>
            <div className="h-70">
              <canvas ref={economicsCanvasRef} />
            </div>
          </div>
        </div>

        <div className={`${sectionClass} rounded-xl bg-[#1a1917] p-6 text-white`}>
          <p className="text-[14px] leading-7 text-white/90">
            <strong className="font-semibold">{riskCallout.title}</strong> {riskCallout.body}
          </p>
        </div>

        <div className={sectionClass}>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-[#a8a59f]">30-day build plan</p>
          <div className="space-y-2.5">
            {roadmap.map((item) => {
              const done = completedRoadmap.includes(item.id)

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleRoadmapItem(item.id)}
                  className={`flex w-full items-start gap-3 rounded-xl border border-[#e8e6e0] bg-white px-4 py-3 text-left transition ${done ? 'opacity-60' : ''}`}
                >
                  <span className="mt-0.5 w-6 shrink-0 text-[11px] font-semibold text-[#1a1917]">{item.label}</span>
                  <span className={`mt-0.5 h-4 w-4 shrink-0 rounded-[4px] border-[1.5px] ${done ? 'border-[#1a1917] bg-[#1a1917]' : 'border-[#d1cec7] bg-white'}`}>
                    {done ? <span className="block text-center text-[11px] leading-4 text-white">✓</span> : null}
                  </span>
                  <span className={`text-[13px] leading-6 text-[#1a1917] ${done ? 'line-through text-[#a8a59f]' : ''}`}>{item.body}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <a
            href="#"
            className="rounded-lg bg-[#1a1917] px-5 py-3 text-center text-[14px] font-semibold text-white transition hover:bg-[#333]"
          >
            Get your full execution plan
          </a>
          <a
            href="https://cal.com/creworklabs"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-[#d1cec7] bg-transparent px-5 py-3 text-center text-[14px] text-[#1a1917] transition hover:bg-[#f0ede8]"
          >
            Book a call with Crework
          </a>
        </div>
      </div>
      {!gateUnlocked && <GateOverlay />}
    </div>
  )
}
