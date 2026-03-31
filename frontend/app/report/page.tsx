'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useFounderStore } from '@/store/useFounderStore'
import { api } from '@/lib/api'
import { analytics } from '@/lib/analytics'
import type { Archetype } from '@/types'
import { PlanSection } from '@/components/report/page/PlanSection'
import { ScopeSection } from '@/components/report/page/ScopeSection'
import { ValidateSection } from '@/components/report/page/ValidateSection'
import { ReportHeader, ReportLoading, ReportMobileNav, ReportSidebar } from '@/components/report/page/shared'
import { fallbackPosts, toFeedPost, type FeedPost, type ReportSection } from '@/components/report/page/types'

const FALLBACK_ARCHETYPE: Archetype = 'marketplace'

export default function ReportPage() {
  const [section, setSection] = useState<ReportSection>('validate')
  const [platform, setPlatform] = useState<'all' | FeedPost['platform']>('all')
  const [gateEmail, setGateEmail] = useState('')
  const [gateLoading, setGateLoading] = useState(false)
  const [gateError, setGateError] = useState('')
  const [loadingReports, setLoadingReports] = useState(false)

  const {
    sessionId,
    quiz,
    archetype,
    reports,
    email,
    setReport,
    setEmail,
    setLeadTag,
    persistToStorage,
  } = useFounderStore()

  const keywordCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const platformCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const sentimentCanvasRef = useRef<HTMLCanvasElement | null>(null)

  const activeArchetype = archetype ?? FALLBACK_ARCHETYPE
  const reportA = reports.A
  const reportB = reports.B
  const reportC = reports.C
  const gateUnlocked = Boolean(email)

  const generatedPosts = useMemo(() => {
    if (!reportB?.marketingPlan?.activeThreads?.length) return fallbackPosts
    return reportB.marketingPlan.activeThreads.slice(0, 8).map(toFeedPost)
  }, [reportB])

  const filteredPosts = useMemo(() => {
    if (platform === 'all') return generatedPosts
    return generatedPosts.filter((post) => post.platform === platform)
  }, [platform, generatedPosts])

  useEffect(() => {
    let cancelled = false

    async function loadReports() {
      if (reportA && reportB && reportC) return
      setLoadingReports(true)
      try {
        const body = { quiz, archetype: activeArchetype }
        const [a, b, c] = await Promise.all([
          reportA ? Promise.resolve(reportA) : api.reportA(body),
          reportB ? Promise.resolve(reportB) : api.reportB(body),
          reportC ? Promise.resolve(reportC) : api.reportC(body),
        ])

        if (cancelled) return
        if (!reportA) setReport('A', a)
        if (!reportB) setReport('B', b)
        if (!reportC) setReport('C', c)
      } catch (err) {
        console.error(err)
      } finally {
        if (!cancelled) setLoadingReports(false)
      }
    }

    loadReports()

    return () => {
      cancelled = true
    }
  }, [reportA, reportB, reportC, quiz, activeArchetype, setReport])

  const submitEmailGate = async () => {
    const normalized = gateEmail.trim().toLowerCase()
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)

    if (!validEmail) {
      setGateError('Please add a valid email to unlock the full report.')
      return
    }

    setGateError('')
    setGateLoading(true)
    try {
      const { leadTag } = await api.captureEmail({
        email: normalized,
        sessionId,
        quiz,
        archetype,
        q4: quiz.q4,
      })
      setEmail(normalized)
      setLeadTag(leadTag)
      persistToStorage()
      analytics.emailSubmitted(sessionId, 'A')
      analytics.reportUnlocked(sessionId, 'A')
    } catch (err) {
      console.error(err)
      setGateError('Something went wrong. Please try again.')
    } finally {
      setGateLoading(false)
    }
  }

  useEffect(() => {
    if (!reportA || section !== 'validate') return

    let destroyed = false
    const charts: Array<{ destroy: () => void }> = []

    const buildCharts = async () => {
      const chartModule = await import('chart.js/auto')
      const Chart = chartModule.default

      if (destroyed) return

      const axisLabelColor = '#a8a59f'
      const gridColor = '#e8e6e0'

      if (keywordCanvasRef.current) {
        charts.push(
          new Chart(keywordCanvasRef.current, {
            type: 'line',
            data: {
              labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
              datasets: [
                {
                  label: 'nail artist near me',
                  data: [42, 45, 51, 58, 63, 61, 67, 59, 54, 70, 78, 85],
                  borderColor: '#1a1917',
                  borderWidth: 2,
                  pointRadius: 2.5,
                  pointBackgroundColor: '#1a1917',
                  tension: 0.35,
                },
                {
                  label: 'nail tech booking app',
                  data: [18, 20, 22, 25, 29, 28, 32, 27, 24, 35, 38, 42],
                  borderColor: '#9ca3af',
                  borderWidth: 1.5,
                  pointRadius: 2,
                  pointBackgroundColor: '#9ca3af',
                  tension: 0.35,
                },
                {
                  label: 'find nail artist',
                  data: [12, 14, 15, 17, 19, 18, 21, 16, 15, 22, 25, 27],
                  borderColor: '#d1cec7',
                  borderWidth: 1.5,
                  pointRadius: 2,
                  pointBackgroundColor: '#d1cec7',
                  tension: 0.35,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: { mode: 'index', intersect: false },
              },
              scales: {
                x: {
                  ticks: { color: axisLabelColor, font: { size: 11 } },
                  grid: { color: gridColor, lineWidth: 0.5 },
                  border: { display: false },
                },
                y: {
                  ticks: { color: axisLabelColor, font: { size: 11 } },
                  grid: { color: gridColor, lineWidth: 0.5 },
                  border: { display: false },
                  title: {
                    display: true,
                    text: 'Search interest (0-100)',
                    color: axisLabelColor,
                    font: { size: 11 },
                  },
                },
              },
            },
          })
        )
      }

      if (platformCanvasRef.current) {
        charts.push(
          new Chart(platformCanvasRef.current, {
            type: 'bar',
            data: {
              labels: ['Reddit', 'Twitter/X', 'Indie Hackers', 'LinkedIn', 'TikTok'],
              datasets: [
                {
                  label: 'Posts',
                  data: [187, 124, 68, 53, 50],
                  backgroundColor: ['#1a1917', '#444441', '#6b6860', '#a8a59f', '#d1cec7'],
                  borderRadius: 5,
                  borderSkipped: false,
                },
              ],
            },
            options: {
              indexAxis: 'y',
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: { callbacks: { label: (context) => ` ${context.raw} posts` } },
              },
              scales: {
                x: {
                  ticks: { color: axisLabelColor, font: { size: 11 } },
                  grid: { color: gridColor, lineWidth: 0.5 },
                  border: { display: false },
                },
                y: {
                  ticks: { color: axisLabelColor, font: { size: 11 } },
                  grid: { display: false },
                  border: { display: false },
                },
              },
            },
          })
        )
      }

      if (sentimentCanvasRef.current) {
        charts.push(
          new Chart(sentimentCanvasRef.current, {
            type: 'doughnut',
            data: {
              labels: ['Pain / frustration', 'Wants a solution', 'Building one'],
              datasets: [
                {
                  data: [54, 33, 13],
                  backgroundColor: ['#f87171', '#34d399', '#60a5fa'],
                  borderWidth: 0,
                  hoverOffset: 4,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              cutout: '68%',
              plugins: {
                legend: { display: false },
                tooltip: { callbacks: { label: (context) => ` ${context.raw}% of posts` } },
              },
            },
          })
        )
      }
    }

    buildCharts()

    return () => {
      destroyed = true
      charts.forEach((chart) => chart.destroy())
    }
  }, [reportA, section])

  const validationMetrics = reportA?.validationScore ?? {
    searchDemand: 10,
    communityDensity: 9,
    competitionIntensity: 8,
    overall: 9,
  }

  const roadmap = reportC?.roadmap ?? [
    { week: 1, title: 'Customer proof sprint', deliverables: ['Interview 10 users', 'Launch waitlist page', 'Collect first 25 signups'] },
    { week: 2, title: 'Foundation setup', deliverables: ['Set up auth + DB', 'Map core entities', 'Deploy a live preview'] },
    { week: 3, title: 'Core workflow release', deliverables: ['Ship top flow end-to-end', 'Run 5 usability tests', 'Launch to first users'] },
  ]

  return (
    <main className="min-h-screen bg-[#f7f6f3] text-[#1a1917]">
      <div className="min-h-screen w-full">
        <ReportSidebar
          section={section}
          setSection={setSection}
          ideaText={quiz.q2 || 'Marketplace to discover nail artists nearby'}
        />

        <section className="w-full px-4 py-6 sm:px-5 md:px-6 md:py-8 lg:ml-[220px] lg:px-8">
          <div className="mx-50 max-w-190">
            <ReportMobileNav section={section} setSection={setSection} />
            <ReportHeader section={section} />

            {loadingReports && <ReportLoading />}

            {section === 'validate' && (
              <ValidateSection
                reportA={reportA}
                weekOneChecklist={reportB?.marketingPlan?.weekOneChecklist}
                validationMetrics={validationMetrics}
                filteredPosts={filteredPosts}
                platform={platform}
                setPlatform={setPlatform}
                gateUnlocked={gateUnlocked}
                gateEmail={gateEmail}
                setGateEmail={(value) => {
                  setGateEmail(value)
                  if (gateError) setGateError('')
                }}
                gateError={gateError}
                gateLoading={gateLoading}
                submitEmailGate={submitEmailGate}
                onContinueScope={() => setSection('scope')}
                keywordCanvasRef={(node) => {
                  keywordCanvasRef.current = node
                }}
                platformCanvasRef={(node) => {
                  platformCanvasRef.current = node
                }}
                sentimentCanvasRef={(node) => {
                  sentimentCanvasRef.current = node
                }}
              />
            )}

            {section === 'scope' && (
              <ScopeSection
                reportB={reportB}
                gateUnlocked={gateUnlocked}
                onContinuePlan={() => setSection('plan')}
                onBackValidate={() => setSection('validate')}
              />
            )}

            {section === 'plan' && (
              <PlanSection
                reportC={reportC}
                gateUnlocked={gateUnlocked}
                roadmap={roadmap}
                onBackScope={() => setSection('scope')}
              />
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
