import { NextRequest, NextResponse } from 'next/server'
import { sendReportEmail } from '@/lib/resend'
import type { CaptureEmailRequest, LeadTag, Q4Answer } from '@/types'

// ─── Lead tag logic ───────────────────────────────────────────────────────────

function deriveLeadTag(q4: Q4Answer | null): LeadTag {
  switch (q4) {
    case 'waitlist':    return 'HOT'
    case 'few_convos':  return 'WARM'
    default:            return 'NURTURE'
  }
}

// ─── In-memory lead store (replace with DB later) ─────────────────────────────
// For V0 this holds leads in memory — they reset on server restart.
// Swap this array for a real DB insert when ready.

type LeadRecord = {
  sessionId: string
  email: string
  archetype: string | null
  q1: string | null
  q2: string
  q3: string | null
  q4: string | null
  leadTag: LeadTag
  capturedAt: string
}

const leads: LeadRecord[] = []

export async function POST(req: NextRequest) {
  try {
    const body: CaptureEmailRequest = await req.json()

    if (!body.email || !body.email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    if (!body.sessionId) {
      return NextResponse.json(
        { error: 'sessionId is required' },
        { status: 400 }
      )
    }

    // Derive lead tag from Q4 seriousness answer
    const leadTag = deriveLeadTag(body.q4)

    // Persist lead record
    const record: LeadRecord = {
      sessionId: body.sessionId,
      email: body.email,
      archetype: body.archetype,
      q1: body.quiz.q1,
      q2: body.quiz.q2,
      q3: body.quiz.q3,
      q4: body.quiz.q4,
      leadTag,
      capturedAt: new Date().toISOString(),
    }

    // Avoid duplicate entries for the same session
    const exists = leads.findIndex((l) => l.sessionId === body.sessionId)
    if (exists >= 0) {
      leads[exists] = record
    } else {
      leads.push(record)
    }

    // Build the report URL — frontend handles showing the full report
    const reportUrl = `${process.env.FRONTEND_URL ?? 'http://localhost:3000'}/report`

    // Send email via Resend (non-blocking — don't fail the request if email fails)
    try {
      await sendReportEmail({
        to: body.email,
        ideaSummary: body.quiz.q2 || 'your startup idea',
        archetype: body.archetype ?? 'saas_tool',
        reportUrl,
      })
    } catch (emailError) {
      // Log but don't block — user still gets their report
      console.error('[capture-email] Resend failed:', emailError)
    }

    return NextResponse.json({
      success: true,
      leadTag,
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to capture email' },
      { status: 500 }
    )
  }
}

// ─── Dev-only GET to inspect leads ───────────────────────────────────────────
// Remove this before going to production

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json({ count: leads.length, leads })
}