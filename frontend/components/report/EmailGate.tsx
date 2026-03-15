'use client'
import { useState } from 'react'
import { useFounderStore } from '@/store/useFounderStore'
import { api } from '@/lib/api'
import { analytics } from '@/lib/analytics'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

export function EmailGate() {
  const { sessionId, quiz, archetype, activeTab, setEmail, setLeadTag, persistToStorage } = useFounderStore()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)

  async function handleSubmit() {
    if (!isValid) return
    setLoading(true)
    setError(null)
    try {
      const { leadTag } = await api.captureEmail({ email: input, sessionId, quiz, archetype, q4: quiz.q4 })
      setEmail(input)
      setLeadTag(leadTag)
      persistToStorage()
      analytics.emailSubmitted(sessionId, activeTab)
      analytics.reportUnlocked(sessionId, activeTab)
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mt-6 p-0">
      <CardContent className="p-5 space-y-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">Your report is ready.</p>
          <p className="text-sm text-muted-foreground">Enter your email to unlock the full breakdown and download your PDF.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="email" value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="you@example.com"
            className="flex-1 h-9"
          />
          <Button onClick={handleSubmit} disabled={!isValid} className="shrink-0" size="sm">
            {loading ? 'Unlocking...' : 'Unlock full report'}
          </Button>
        </div>
        {error && <p className="text-xs text-muted-foreground">{error}</p>}
        <p className="text-xs text-muted-foreground">No spam. Unsubscribe anytime.</p>
      </CardContent>
    </Card>
  )
}