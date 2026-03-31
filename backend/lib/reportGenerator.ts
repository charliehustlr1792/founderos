import type { Archetype, RouteKey, ReportA, ReportB, ReportC } from '@/types'
import path from 'path'
import fs from 'fs'

type MockFile = {
  A: ReportA
  B: ReportB
  C: ReportC
}

// ─── Loader ───────────────────────────────────────────────────────────────────

function loadMock(archetype: Archetype): MockFile {
  const filePath = path.join(
    process.cwd(),
    'data',
    'mock',
    `${archetype}.json`
  )

  // If a specific archetype file doesn't exist yet, fall back to saas_tool
  // This lets us ship V0 with just one mock file and add the rest incrementally
  const safePath = fs.existsSync(filePath)
    ? filePath
    : path.join(process.cwd(), 'data', 'mock', 'saas_tool.json')

  const raw = fs.readFileSync(safePath, 'utf-8')
  return JSON.parse(raw) as MockFile
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function getReportA(archetype: Archetype): ReportA {
  const mock = loadMock(archetype)
  // Stamp the actual archetype so the frontend knows what was detected
  return { ...mock.A, archetype }
}

export function getReportB(archetype: Archetype): ReportB {
  const mock = loadMock(archetype)
  return { ...mock.B, archetype }
}

export function getReportC(archetype: Archetype): ReportC {
  const mock = loadMock(archetype)
  return {
    ...mock.C,
    archetype,
    whatToBuildPlan: mock.C.whatToBuildPlan ?? {
      buildDecisions: [
        {
          group: 'build_first',
          title: 'Artist profile + portfolio',
          body: 'Name, location, style tags, and past work gallery. This is why people open the app, so it must be fast and visually strong.',
        },
        {
          group: 'build_first',
          title: 'Location-based search',
          body: 'Simple city or neighborhood filter with list-first discovery. This is the core unlock for independent artists.',
        },
        {
          group: 'build_v2',
          title: 'In-app booking + payments',
          body: 'Important but complex. Start with booking requests via DM or WhatsApp until the loop is proven.',
        },
        {
          group: 'build_v2',
          title: 'Reviews and ratings',
          body: 'Needed long-term, but not for first traction. Add after you have repeat transactions and enough usage data.',
        },
        {
          group: 'skip_for_now',
          title: 'AI style matching',
          body: 'A nice-to-have at this stage. Nail the discovery and conversion fundamentals before adding smart matching.',
        },
        {
          group: 'skip_for_now',
          title: 'Subscription tiers for artists',
          body: 'Monetize through commission first. Tiered plans add early friction before core value is validated.',
        },
      ],
      northStarMetric: {
        metric: 'Bookings completed per artist per month',
        explanation:
          'If each artist gets 5+ bookings per month through your product, your MVP is working and worth scaling. If not, improve discovery and trust before adding more features.',
        target: 'Target: 5+ bookings/artist/month',
        trackingNote: 'Track from day 1',
      },
      unitEconomics: {
        title: 'How many bookings you need at different commission rates',
        description:
          'Based on average appointment value of 50. At 10% commission, 200 bookings equals 1k MRR.',
        points: [
          { commissionLabel: '5% commission', bookingsToTarget: 400, artistsNeeded: 40 },
          { commissionLabel: '10% commission', bookingsToTarget: 200, artistsNeeded: 20 },
          { commissionLabel: '15% commission', bookingsToTarget: 133, artistsNeeded: 14 },
          { commissionLabel: '20% commission', bookingsToTarget: 100, artistsNeeded: 10 },
        ],
      },
      riskCallout: {
        title: "Your biggest risk isn't building the wrong product.",
        body: 'It is the two-sided cold start problem. Manually onboard supply in one city before scaling demand.',
      },
    },
  }
}

export function getReport(route: RouteKey, archetype: Archetype): ReportA | ReportB | ReportC {
  switch (route) {
    case 'A': return getReportA(archetype)
    case 'B': return getReportB(archetype)
    case 'C': return getReportC(archetype)
  }
}