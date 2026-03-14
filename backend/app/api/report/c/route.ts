import { NextRequest, NextResponse } from 'next/server'
import { getReportC } from '@/lib/reportGenerator'
import type { ReportRequest } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const body: ReportRequest = await req.json()

    if (!body.archetype) {
      return NextResponse.json(
        { error: 'archetype is required' },
        { status: 400 }
      )
    }

    const report = getReportC(body.archetype)
    return NextResponse.json(report)
  } catch {
    return NextResponse.json(
      { error: 'Failed to generate Route C report' },
      { status: 500 }
    )
  }
}