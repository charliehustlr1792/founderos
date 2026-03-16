'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useFounderStore } from '@/store/useFounderStore'
import { api } from '@/lib/api'
import { analytics } from '@/lib/analytics'
import { TabBar } from './TabBar'
import { PartialPreview } from './PartialPreview'
import { EmailGate } from './EmailGate'
import { RouteAReport } from './RouteA'
import { RouteBReport } from './RouteB'
import { RouteCReport } from './RouteC'
import type { RouteKey } from '@/types'

const ARCHETYPE_LABELS: Record<string, string> = {
  marketplace:    'Marketplace',
  saas_tool:      'SaaS Tool',
  consumer_app:   'Consumer App',
  ai_wrapper:     'AI Product',
  b2b_platform:   'B2B Platform',
  community:      'Community',
  ecommerce:      'E-Commerce',
  developer_tool: 'Dev Tool',
}

// ─── Terminal Loading ─────────────────────────────────────────────────────────

function TerminalLoading({ archetype }: { archetype: string | null }) {
  const [lines, setLines] = useState<string[]>([])
  const [visible, setVisible] = useState(true)

  const TERMINAL_LINES = [
    'Classifying idea...',
    `Archetype detected: ${ARCHETYPE_LABELS[archetype ?? ''] ?? archetype ?? 'unknown'}`,
    'Scanning demand signals...',
    'Mapping relevant communities...',
    'Identifying competitors...',
    'Building your MVP scope...',
    'Generating build roadmap...',
    'Report ready.',
  ]

  useEffect(() => {
    let cancelled = false
    let lineIdx = 0
    let charIdx = 0
    let current = ''

    function tick() {
      if (cancelled) return
      if (lineIdx >= TERMINAL_LINES.length) return
      const line = TERMINAL_LINES[lineIdx]
      if (charIdx < line.length) {
        current += line[charIdx]
        charIdx++
        setLines(prev => {
          const next = [...prev]
          next[lineIdx] = current
          return next
        })
        setTimeout(tick, 30)
      } else {
        lineIdx++
        charIdx = 0
        current = ''
        if (lineIdx < TERMINAL_LINES.length) {
          setTimeout(tick, 200)
        }
      }
    }

    setTimeout(tick, 200)
    return () => { cancelled = true }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!visible) return null

  return (
    <div
      className="rounded-[8px] p-6 mb-8"
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%), #0a0a0a',
        boxShadow: '0 1px 0 0 rgba(255,255,255,0.14) inset, 0 4px 0 0 rgba(0,0,0,0.85), 0 6px 20px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.07)',
      }}
    >
      <div className="space-y-1">
        {lines.map((line, i) => (
          <p key={i} className="text-[13px] text-white" style={{ fontFamily: 'var(--font-geist-mono)' }}>
            {line}
            {i === lines.length - 1 && <span className="animate-pulse ml-0.5">_</span>}
          </p>
        ))}
      </div>
    </div>
  )
}

// ─── Sticky CTA Bar ───────────────────────────────────────────────────────────

function StickyCTABar() {
  const { email, budget, leadTag, reports, sessionId } = useFounderStore()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!email) return
    function onScroll() {
      const scrolled = window.scrollY
      const total = document.body.scrollHeight - window.innerHeight
      if (total > 0 && scrolled / total > 0.6) setShow(true)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [email])

  const complexityLevel = (reports.B as any)?.complexityLevel ?? null

  const cta = (() => {
    if (budget === '15k_50k' || budget === '50k_plus') {
      return { label: 'Book a free scope call →', href: 'https://cal.com/creworklabs' }
    }
    if (budget === '5k_15k') {
      return { label: 'Book a free scope call →', href: 'https://cal.com/creworklabs' }
    }
    return { label: 'Read our founder guides →', href: 'https://shikshita.substack.com' }
  })()

  if (!email) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 h-[56px] bg-white border-t border-[#e5e5e5] flex items-center px-6 gap-4 justify-between"
      style={{
        transform: show ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 300ms ease-out',
      }}
    >
      <p className="text-[13px] text-[#525252] hidden sm:block truncate" style={{ fontFamily: 'var(--font-geist-sans)' }}>
        {complexityLevel
          ? `Based on your report, your biggest risk is ${complexityLevel.toLowerCase()} execution.`
          : 'Your report is ready — take action now.'}
      </p>
      <a
        href={cta.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => analytics.ctaClicked(sessionId, 'C', leadTag, budget)}
        className="h-[36px] px-4 rounded-[6px] bg-[#171717] text-white text-[13px] font-medium whitespace-nowrap flex items-center hover:opacity-90 transition-opacity shrink-0"
        style={{ fontFamily: 'var(--font-geist-sans)' }}
      >
        {cta.label}
      </a>
    </div>
  )
}

// ─── Share Card ───────────────────────────────────────────────────────────────

function ShareButton() {
  const { archetype, reports } = useFounderStore()
  const reportA = reports.A as any
  const reportB = reports.B as any

  function generateShareCard() {
    const canvas = document.createElement('canvas')
    canvas.width = 800
    canvas.height = 420
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // White background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, 800, 420)

    // Subtle noise-like border at top
    ctx.fillStyle = '#0a0a0a'
    ctx.fillRect(0, 0, 800, 3)

    // Archetype label
    ctx.font = '12px monospace'
    ctx.fillStyle = '#a3a3a3'
    ctx.fillText('ARCHETYPE', 48, 72)

    ctx.font = 'bold 28px sans-serif'
    ctx.fillStyle = '#0a0a0a'
    ctx.fillText(ARCHETYPE_LABELS[archetype ?? ''] ?? (archetype ?? 'Unknown'), 48, 108)

    // Scores
    if (reportA?.validationScore) {
      const scores = [
        { label: 'VALIDATION', value: reportA.validationScore.overall },
        { label: 'SEARCH DEMAND', value: reportA.validationScore.searchDemand },
        { label: 'COMMUNITY', value: reportA.validationScore.communityDensity },
        { label: 'COMPETITION', value: reportA.validationScore.competitionIntensity },
      ]
      scores.forEach((s, i) => {
        const x = 48 + i * 180
        ctx.font = '11px monospace'
        ctx.fillStyle = '#a3a3a3'
        ctx.fillText(s.label, x, 180)
        ctx.font = 'bold 48px monospace'
        ctx.fillStyle = '#0a0a0a'
        ctx.fillText(String(s.value), x, 240)
        ctx.font = '20px monospace'
        ctx.fillStyle = '#a3a3a3'
        ctx.fillText('/10', x + 46, 240)
      })
    }

    // Complexity
    if (reportB?.complexityLevel) {
      ctx.font = '11px monospace'
      ctx.fillStyle = '#a3a3a3'
      ctx.fillText('COMPLEXITY', 48, 300)
      ctx.font = 'bold 28px sans-serif'
      ctx.fillStyle = '#0a0a0a'
      ctx.fillText(reportB.complexityLevel, 48, 332)
    }

    // Border
    ctx.strokeStyle = '#e5e5e5'
    ctx.lineWidth = 1
    ctx.strokeRect(0.5, 0.5, 799, 419)

    // Footer
    ctx.font = '11px monospace'
    ctx.fillStyle = '#a3a3a3'
    ctx.fillText('Built with Founder OS · creworklabs.com', 48, 390)

    // Download
    const link = document.createElement('a')
    link.download = 'founder-os-report.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <button
      onClick={generateShareCard}
      className="mt-8 w-full h-[44px] rounded-[6px] bg-white border border-[#171717] text-[#0a0a0a] text-[14px] font-medium hover:bg-[#f5f5f5] transition-colors"
      style={{ fontFamily: 'var(--font-geist-sans)' }}
    >
      Share your results ↓
    </button>
  )
}

// ─── Left Nav ─────────────────────────────────────────────────────────────────

function LeftNav({ activeTab, routesGenerated, budgetAnswered, onTabChange, archetype }: {
  activeTab: RouteKey
  routesGenerated: RouteKey[]
  budgetAnswered: boolean
  onTabChange: (tab: RouteKey) => void
  archetype: string | null
}) {
  const reports = useFounderStore((s) => s.reports)
  const quiz = useFounderStore((s) => s.quiz)
  const validationScore = (reports.A as any)?.validationScore ?? null
  const weekOneChecklist = (reports.B as any)?.marketingPlan?.weekOneChecklist ?? null

  const TABS = [
    { key: 'A' as RouteKey, label: 'Validate',  sub: 'Idea validator' },
    { key: 'B' as RouteKey, label: 'Scope',      sub: 'MVP scope builder' },
    { key: 'C' as RouteKey, label: 'Plan',        sub: 'Build readiness' },
  ]

  const SCORE_BARS = validationScore ? [
    { label: 'DEMAND',      value: validationScore.searchDemand,       color: validationScore.searchDemand >= 7 ? '#16a34a' : validationScore.searchDemand >= 4 ? '#d97706' : '#dc2626' },
    { label: 'COMMUNITY',   value: validationScore.communityDensity,    color: validationScore.communityDensity >= 7 ? '#16a34a' : validationScore.communityDensity >= 4 ? '#d97706' : '#dc2626' },
    { label: 'COMPETITION', value: validationScore.competitionIntensity, color: validationScore.competitionIntensity >= 7 ? '#16a34a' : validationScore.competitionIntensity >= 4 ? '#d97706' : '#dc2626' },
  ] : null

  return (
    <div
      className="rounded-[12px] p-5 space-y-6"
      style={{
        background: 'linear-gradient(150deg, rgba(255,255,255,0.92) 0%, rgba(248,248,248,0.85) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(229,229,229,0.7)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.05), 0 1px 0 rgba(255,255,255,0.9) inset',
      }}
    >
      {/* Archetype badge */}
      <div className="space-y-1">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#a3a3a3]"
           style={{ fontFamily: 'var(--font-geist-mono)' }}>
          ARCHETYPE
        </p>
        <p className="text-[16px] font-semibold text-[#0a0a0a]" style={{ fontFamily: 'var(--font-geist-sans)' }}>
          {ARCHETYPE_LABELS[archetype ?? ''] ?? archetype ?? '—'}
        </p>
      </div>

      {/* Route tabs */}
      <div className="space-y-1">
        {TABS.map((tab) => {
          const isDone   = routesGenerated.includes(tab.key)
          const isLocked = tab.key === 'C' && !budgetAnswered
          const isActive = tab.key === activeTab
          return (
            <button
              key={tab.key}
              disabled={isLocked}
              onClick={() => !isLocked && onTabChange(tab.key)}
              className="w-full text-left px-3 py-[10px] rounded-[6px] flex items-center justify-between transition-all duration-150"
              style={{
                background: isActive ? 'rgba(0,0,0,0.06)' : 'transparent',
                borderLeft: isActive ? '2px solid #171717' : '2px solid transparent',
                opacity: isLocked ? 0.4 : 1,
              }}
            >
              <div>
                <p className={`text-[13px] ${isActive ? 'font-semibold text-[#0a0a0a]' : 'text-[#525252]'}`}>
                  {isLocked && <span style={{ fontFamily: 'var(--font-geist-mono)', marginRight: '4px' }}>⌐</span>}
                  {tab.label}
                </p>
                <p className="text-[11px] text-[#a3a3a3] mt-0.5" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                  {isLocked ? 'Budget required' : tab.sub}
                </p>
              </div>
              {isDone && tab.key !== activeTab && (
                <span className="flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[#16a34a]">
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1.5 4.5l2 2 4-4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Score breakdown — fills whitespace below tabs */}
      {SCORE_BARS && (
        <div className="pt-1 space-y-4">
          <div className="border-t border-[rgba(0,0,0,0.07)]" />
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#a3a3a3]"
             style={{ fontFamily: 'var(--font-geist-mono)' }}>
            VALIDATION SCORES
          </p>
          {/* Overall hero score */}
          <div className="flex items-end gap-1">
            <span
              className="text-[44px] font-semibold leading-none text-[#0a0a0a]"
              style={{ fontFamily: 'var(--font-geist-mono)' }}
            >
              {validationScore.overall}
            </span>
            <span
              className="text-[15px] text-[#a3a3a3] mb-1"
              style={{ fontFamily: 'var(--font-geist-mono)' }}
            >
              /10
            </span>
          </div>
          {/* Sub-score bars */}
          <div className="space-y-3">
            {SCORE_BARS.map((s) => (
              <div key={s.label} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span
                    className="text-[9px] uppercase tracking-[0.1em] text-[#a3a3a3]"
                    style={{ fontFamily: 'var(--font-geist-mono)' }}
                  >
                    {s.label}
                  </span>
                  <span
                    className="text-[10px]"
                    style={{ fontFamily: 'var(--font-geist-mono)', color: s.color }}
                  >
                    {s.value}/10
                  </span>
                </div>
                <div className="h-[4px] w-full bg-[rgba(0,0,0,0.07)] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${(s.value / 10) * 100}%`, background: s.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Week 1 checklist — appears after Route B is generated */}
      {weekOneChecklist && weekOneChecklist.length > 0 && (
        <div className="pt-1 space-y-3">
          <div className="border-t border-[rgba(0,0,0,0.07)]" />
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#a3a3a3]"
             style={{ fontFamily: 'var(--font-geist-mono)' }}>
            WEEK 1 CHECKLIST
          </p>
          <div className="space-y-2.5">
            {weekOneChecklist.map((item: string, i: number) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="mt-[3px] flex items-center justify-center w-[14px] h-[14px] rounded-full bg-[#16a34a] shrink-0">
                  <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                    <path d="M1 3.5l1.5 1.5 3.5-3.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <p className="text-[11px] text-[#525252] leading-snug">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Session context */}
      <div className="space-y-3 pt-1">
        <div className="border-t border-[rgba(0,0,0,0.07)]" />
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#a3a3a3]"
           style={{ fontFamily: 'var(--font-geist-mono)' }}>
          SESSION
        </p>
        {quiz.q1 && (
          <div className="space-y-0.5">
            <p className="text-[9px] uppercase tracking-[0.08em] text-[#a3a3a3]" style={{ fontFamily: 'var(--font-geist-mono)' }}>STAGE</p>
            <p className="text-[12px] text-[#525252]">{quiz.q1}</p>
          </div>
        )}
        {quiz.q3 && (
          <div className="space-y-0.5">
            <p className="text-[9px] uppercase tracking-[0.08em] text-[#a3a3a3]" style={{ fontFamily: 'var(--font-geist-mono)' }}>TARGET</p>
            <p className="text-[12px] text-[#525252]">{quiz.q3}</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Full report switcher ─────────────────────────────────────────────────────

function FullReport({ route, onNavigate }: { route: RouteKey; onNavigate: (tab: RouteKey) => void }) {
  const reports = useFounderStore((s) => s.reports)
  const routesGenerated = useFounderStore((s) => s.routesGenerated)
  const allDone = routesGenerated.length === 3

  if (route === 'A' && reports.A) {
    return <><RouteAReport report={reports.A} onNext={() => onNavigate('B')} />{allDone && <ShareButton />}</>
  }
  if (route === 'B' && reports.B) {
    return <><RouteBReport report={reports.B} onNext={() => onNavigate('C')} />{allDone && <ShareButton />}</>
  }
  if (route === 'C' && reports.C) {
    return <><RouteCReport report={reports.C} /><ShareButton /></>
  }
  return null
}

// ─── Main Shell ───────────────────────────────────────────────────────────────

export function ReportShell() {
  const router = useRouter()

  const {
    sessionId, quiz, archetype, email,
    activeTab, reports, routesGenerated,
    setReport, setActiveTab, markRouteGenerated,
    persistToStorage,
  } = useFounderStore()

  const [generating, setGenerating] = useState(false)
  const [showTerminal, setShowTerminal] = useState(false)
  const [tabVisible, setTabVisible] = useState(true)

  useEffect(() => {
    if (!quiz.q1 || !quiz.q2 || !archetype) {
      router.replace('/')
    }
  }, [quiz, archetype, router])

  useEffect(() => {
    if (!archetype) return
    if (routesGenerated.includes(activeTab)) return
    generateReport(activeTab)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, archetype])

  useEffect(() => {
    if (routesGenerated.length === 3 && email) {
      const start = sessionStorage.getItem('reportStartTime')
      const mins = start ? Math.round((Date.now() - parseInt(start)) / 60000) : 0
      analytics.allRoutesViewed(sessionId, mins)
    }
  }, [routesGenerated, email, sessionId])

  // Tab content fade
  useEffect(() => {
    setTabVisible(false)
    const t = setTimeout(() => setTabVisible(true), 50)
    return () => clearTimeout(t)
  }, [activeTab])

  async function generateReport(route: RouteKey) {
    if (!archetype) return
    setGenerating(true)
    setShowTerminal(true)
    try {
      const body = { quiz, archetype }
      let data
      if (route === 'A') data = await api.reportA(body)
      else if (route === 'B') data = await api.reportB(body)
      else data = await api.reportC(body)
      setReport(route, data)
      markRouteGenerated(route)
      persistToStorage()
      analytics.previewShown(sessionId, route)
      setTimeout(() => setShowTerminal(false), 600)
    } catch (err) {
      console.error('Failed to generate report:', err)
      setShowTerminal(false)
    } finally {
      setGenerating(false)
    }
  }

  function handleTabChange(tab: RouteKey) {
    if (tab === 'C' && !useFounderStore.getState().budget) return
    setActiveTab(tab)
    if (tab === 'B') analytics.routeBClicked(sessionId, activeTab)
    if (tab === 'C') analytics.routeCClicked(sessionId, activeTab)
    if (!sessionStorage.getItem('reportStartTime')) {
      sessionStorage.setItem('reportStartTime', Date.now().toString())
    }
  }

  const activeReport = reports[activeTab]
  const isUnlocked   = !!email
  const budgetAnswered = !!useFounderStore.getState().budget

  if (!quiz.q1 || !archetype) return null

  return (
    <>
      <div className="max-w-[1280px] mx-auto px-6 pt-10 pb-24">

        {/* Idea hero banner — elegant full-width quote */}
        {quiz.q2 && (
          <div
            className="mb-10 rounded-[10px] overflow-hidden relative"
            style={{
              background: 'linear-gradient(135deg, #f8f8f8 0%, #f0f0f0 60%, #ebebeb 100%)',
              border: '1px solid #e0e0e0',
              boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
            }}
          >
            {/* Decorative large quotation mark */}
            <span
              className="absolute select-none pointer-events-none"
              style={{
                top: '-8px',
                left: '16px',
                fontSize: '96px',
                fontFamily: 'Georgia, serif',
                color: '#d8d8d8',
                lineHeight: 1,
                zIndex: 0,
              }}
            >
              "
            </span>
            <div className="relative z-10 px-8 py-7 pl-10">
              <p
                className="text-[18px] leading-[1.65] text-[#171717]"
                style={{ fontFamily: 'var(--font-geist-sans)', fontStyle: 'italic', fontWeight: 400 }}
              >
                {quiz.q2}
              </p>
              <div className="flex items-center gap-2.5 mt-4">
                <span className="w-[28px] h-[1px] bg-[#c8c8c8]" />
                <span
                  className="text-[10px] uppercase tracking-[0.14em] text-[#a3a3a3]"
                  style={{ fontFamily: 'var(--font-geist-mono)' }}
                >
                  {ARCHETYPE_LABELS[archetype ?? ''] ?? archetype ?? 'Analysing'}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-12">

          {/* Left sticky nav — desktop only */}
          <div className="hidden md:block w-[280px] shrink-0">
            <div className="sticky top-24">
              <LeftNav
                activeTab={activeTab}
                routesGenerated={routesGenerated}
                budgetAnswered={budgetAnswered}
                onTabChange={handleTabChange}
                archetype={archetype}
              />
            </div>
          </div>

          {/* Right content */}
          <div className="flex-1 min-w-0">

            {/* Mobile tab bar */}
            <div className="md:hidden mb-6">
              <TabBar
                activeTab={activeTab}
                routesGenerated={routesGenerated}
                budgetAnswered={budgetAnswered}
                onTabChange={handleTabChange}
              />
            </div>

            {/* Terminal loading */}
            {showTerminal && <TerminalLoading archetype={archetype} />}

            {/* Content */}
            <div style={{ opacity: tabVisible ? 1 : 0, transition: 'opacity 200ms ease' }}>
              {generating && !activeReport ? (
                null
              ) : !activeReport ? (
                null
              ) : !isUnlocked ? (
                <>
                  <PartialPreview route={activeTab} report={activeReport} />
                  <EmailGate />
                </>
              ) : (
                <FullReport route={activeTab} onNavigate={handleTabChange} />
              )}
            </div>

          </div>
        </div>
      </div>
      <StickyCTABar />
    </>
  )
}