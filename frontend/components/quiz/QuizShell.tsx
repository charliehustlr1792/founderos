'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useFounderStore } from '@/store/useFounderStore'
import { api } from '@/lib/api'
import { analytics } from '@/lib/analytics'
import { Spinner } from '@/components/ui'
import { Q1Stage } from './Q1Stage'
import { Q2Idea } from './Q2Idea'
import { Q3UserType } from './Q3UserType'
import { Q4Seriousness } from './Q4Seriousness'
import type { RouteKey } from '@/types'

const ROUTE_MAP: Record<string, RouteKey> = { idea: 'A', validation: 'B', build: 'C' }

export function QuizShell() {
  const router = useRouter()
  const startTimeRef = useRef<number>(Date.now())
  const { sessionId, quiz, setQ1, setQ2, setQ3, setQ4, setArchetype, setActiveTab, persistToStorage } = useFounderStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (started) return
    const handler = () => { analytics.quizStarted(sessionId); setStarted(true) }
    window.addEventListener('click', handler, { once: true })
    return () => window.removeEventListener('click', handler)
  }, [sessionId, started])

  useEffect(() => { analytics.pageViewed(sessionId) }, [sessionId])

  const isComplete = quiz.q1 !== null && quiz.q2.trim().length >= 20 && quiz.q3 !== null && quiz.q4 !== null

  async function handleSubmit() {
    if (!isComplete) return
    setLoading(true)
    setError(null)
    try {
      const { archetype } = await api.classify(quiz.q2)
      setArchetype(archetype)
      const assignedRoute = ROUTE_MAP[quiz.q1!] ?? 'A'
      setActiveTab(assignedRoute)
      persistToStorage()
      const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000)
      analytics.quizQ2Submitted(sessionId, quiz.q2.length, archetype)
      analytics.quizCompleted(sessionId, assignedRoute, elapsed)
      router.push('/report')
    } catch (err) {
      setError('Something went wrong. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Q1Stage value={quiz.q1} onChange={(val) => { setQ1(val); analytics.quizQ1Answered(sessionId, val) }} />
      <div className="h-px bg-[#e5e5e5] my-8" />
      <Q2Idea value={quiz.q2} onChange={setQ2} />
      <div className="h-px bg-[#e5e5e5] my-8" />
      <Q3UserType value={quiz.q3} onChange={(val) => { setQ3(val); analytics.quizQ3Answered(sessionId, val) }} />
      <div className="h-px bg-[#e5e5e5] my-8" />
      <Q4Seriousness value={quiz.q4} onChange={(val) => { setQ4(val); analytics.quizQ4Answered(sessionId, val) }} />

      <div className="mt-10 space-y-3">
        {error && <p className="text-sm text-[#aaaaaa]">{error}</p>}
        <button
          onClick={handleSubmit}
          disabled={!isComplete || loading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-medium transition-all duration-150 bg-black text-white hover:bg-black/85 active:bg-black/75 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {loading ? <><Spinner size={14} /> Generating your report...</> : 'Generate my report →'}
        </button>
        <p className="text-xs text-[#555555] text-center">Takes about 5 minutes to read. No credit card. No spam.</p>
      </div>
    </div>
  )
}