import { NextRequest, NextResponse } from 'next/server'
import { classifyIdea } from '@/lib/classifier'
import type { ClassifyRequest, ClassifyResponse } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const body: ClassifyRequest = await req.json()

    if (!body.idea || body.idea.trim().length < 10) {
      return NextResponse.json(
        { error: 'Idea must be at least 10 characters' },
        { status: 400 }
      )
    }

    const archetype = classifyIdea(body.idea)
    const response: ClassifyResponse = { archetype }

    return NextResponse.json(response)
  } catch {
    return NextResponse.json(
      { error: 'Classification failed' },
      { status: 500 }
    )
  }
}