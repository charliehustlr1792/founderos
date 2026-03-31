import { useEffect, useState } from 'react'
import { VolumeBar } from '@/components/report/ReportSections'
import type { ReportA } from '@/types'
import { EmailGateCard, GateOverlay } from './shared'
import { FeedPost, moodColor } from './types'

type PlatformFilter = 'all' | FeedPost['platform']

type ValidateSectionProps = {
  reportA: ReportA | null
  weekOneChecklist?: string[]
  validationMetrics: {
    searchDemand: number
    communityDensity: number
    competitionIntensity: number
    overall: number
  }
  filteredPosts: FeedPost[]
  platform: PlatformFilter
  setPlatform: (value: PlatformFilter) => void
  gateUnlocked: boolean
  gateEmail: string
  setGateEmail: (value: string) => void
  gateError: string
  gateLoading: boolean
  submitEmailGate: () => void
  onContinueScope: () => void
  keywordCanvasRef: (node: HTMLCanvasElement | null) => void
  platformCanvasRef: (node: HTMLCanvasElement | null) => void
  sentimentCanvasRef: (node: HTMLCanvasElement | null) => void
}

export function ValidateSection({
  reportA,
  weekOneChecklist,
  validationMetrics,
  filteredPosts,
  platform,
  setPlatform,
  gateUnlocked,
  gateEmail,
  setGateEmail,
  gateError,
  gateLoading,
  submitEmailGate,
  onContinueScope,
  keywordCanvasRef,
  platformCanvasRef,
  sentimentCanvasRef,
}: ValidateSectionProps) {
  const checklist = weekOneChecklist?.length
    ? weekOneChecklist.slice(0, 4)
    : [
      'Talk to 10 target users and capture exact pain statements.',
      'Launch a one-page waitlist and test your core positioning.',
      'Post in 2 relevant communities and validate response quality.',
      'Define one primary demand metric to track weekly.',
    ]

  const [doneItems, setDoneItems] = useState<boolean[]>([])

  useEffect(() => {
    setDoneItems(Array.from({ length: checklist.length }, (_, index) => index === 0))
  }, [checklist.length])

  function toggleItem(index: number) {
    setDoneItems((prev) => prev.map((value, i) => (i === index ? !value : value)))
  }

  return (
    <div>
      <div className="mb-10 grid gap-3 md:grid-cols-4">
        {[
          ['Keyword demand', `${validationMetrics.searchDemand}`, 'High search volume'],
          ['Community buzz', `${validationMetrics.communityDensity}`, 'Active discussions'],
          ['Competitor gap', `${validationMetrics.competitionIntensity}`, 'No clear winner'],
          ['Market timing', `${validationMetrics.overall}`, 'Growing steadily'],
        ].map(([label, value, meta], idx) => (
          <div key={label} className="rounded-xl border border-[#e8e6e0] bg-white px-4 py-3.5">
            <p className="mb-1 text-[10px] uppercase tracking-[0.08em] text-[#a8a59f]">{label}</p>
            <p className={`mb-1 text-[30px] font-semibold leading-none ${idx < 3 ? 'text-[#2d6a4f]' : 'text-[#92400e]'}`}>{value}</p>
            <p className="text-[11px] text-[#6b6860]">{meta}</p>
          </div>
        ))}
      </div>

      <div className="mb-10">
        <p className="mb-2 text-[10px] uppercase tracking-widest text-[#a8a59f]">Search interest over time</p>
        <div className="rounded-xl border border-[#e8e6e0] bg-white p-5">
          <h2 className="mb-1 text-[14px] font-semibold">How often people are searching for what you are building</h2>
          <p className="mb-5 text-[12px] text-[#6b6860]">Monthly search volume across related keywords.</p>
          <div className="mb-3 flex flex-wrap gap-3 text-[11px] text-[#6b6860]">
            {(reportA?.demandSignals?.slice(0, 3) ?? []).map((signal, idx) => (
              <span key={idx} className="inline-flex items-center gap-1"><span className={`size-2 rounded-sm ${idx === 0 ? 'bg-[#1a1917]' : idx === 1 ? 'bg-[#9ca3af]' : 'bg-[#d1cec7]'}`} />{signal.theme}</span>
            ))}
          </div>
          <div className="h-55">
            <canvas ref={keywordCanvasRef} />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <p className="mb-2 text-[10px] uppercase tracking-widest text-[#a8a59f]">Where people are talking about this</p>
        <div className="overflow-hidden rounded-xl border border-[#e8e6e0] bg-white">
          <div className="border-b border-[#e8e6e0] px-5 py-4">
            <h2 className="text-[14px] font-semibold">Live conversations happening right now</h2>
            <p className="text-[12px] text-[#6b6860]">Real posts from Reddit, Twitter, Indie Hackers, and LinkedIn.</p>
          </div>
          <div className="flex flex-wrap gap-2 border-b border-[#e8e6e0] px-5 py-3">
            {[
              ['all', 'All platforms'],
              ['reddit', 'Reddit'],
              ['twitter', 'Twitter / X'],
              ['ih', 'Indie Hackers'],
              ['linkedin', 'LinkedIn'],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setPlatform(id as PlatformFilter)}
                className={`rounded-md px-3 py-1.5 text-[12px] ${platform === id ? 'border border-[#e8e6e0] bg-[#f0ede8] text-[#1a1917]' : 'text-[#6b6860] hover:bg-[#f7f6f3]'}`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="space-y-3 px-5 py-4">
            {filteredPosts.map((post) => (
              <article key={`${post.platform}-${post.user}-${post.time}`} className="border-b border-[#e8e6e0] pb-3 last:border-b-0 last:pb-0">
                <div className="mb-1 flex items-center gap-2 text-[11px] text-[#a8a59f]">
                  <span
                    className={`font-semibold ${post.platform === 'reddit' ? 'text-[#ff4500]' : post.platform === 'twitter' ? 'text-[#1d9bf0]' : post.platform === 'ih' ? 'text-[#0e7f6e]' : 'text-[#0077b5]'}`}
                  >
                    {post.source}
                  </span>
                  <span>·</span>
                  <span>{post.user}</span>
                  <span className="ml-auto">{post.time}</span>
                </div>
                <p className="mb-2 text-[13px] leading-6">{post.text}</p>
                <div className="flex items-center gap-3 text-[11px] text-[#a8a59f]">
                  <span>{post.stats}</span>
                  <span className="inline-flex items-center gap-1">
                    <span className={`size-2 rounded-full ${moodColor[post.mood]}`} />
                    {post.mood}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-10 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-[#e8e6e0] bg-white p-5">
          <h2 className="mb-1 text-[14px] font-semibold">Discussion volume by platform</h2>
          <p className="mb-4 text-[12px] text-[#6b6860]">How many posts mention this problem across communities.</p>
          <div className="h-50"><canvas ref={platformCanvasRef} /></div>
        </div>
        <div className="rounded-xl border border-[#e8e6e0] bg-white p-5">
          <h2 className="mb-1 text-[14px] font-semibold">Sentiment breakdown</h2>
          <p className="mb-3 text-[12px] text-[#6b6860]">What emotion drives most of the conversation.</p>
          <div className="mb-2 flex flex-wrap gap-3 text-[11px] text-[#6b6860]">
            <span className="inline-flex items-center gap-1"><span className="size-2 rounded-full bg-[#f87171]" />Pain / frustration</span>
            <span className="inline-flex items-center gap-1"><span className="size-2 rounded-full bg-[#34d399]" />Wants a solution</span>
            <span className="inline-flex items-center gap-1"><span className="size-2 rounded-full bg-[#60a5fa]" />Building one</span>
          </div>
          <div className="h-46.5"><canvas ref={sentimentCanvasRef} /></div>
        </div>
      </div>

      {!gateUnlocked && (
        <EmailGateCard
          gateEmail={gateEmail}
          setGateEmail={setGateEmail}
          gateError={gateError}
          gateLoading={gateLoading}
          submitEmailGate={submitEmailGate}
        />
      )}

      <div className="relative mb-10">
        <div className={`${!gateUnlocked ? 'pointer-events-none select-none' : ''}`}>
          <div className="mb-8 rounded-xl border border-[#e8e6e0] bg-white p-5">
            <p className="mb-2 text-[10px] uppercase tracking-[0.08em] text-[#a8a59f]">What people are searching and paying for right now</p>
            <div className="space-y-3">
              {(reportA?.demandSignals ?? []).map((signal, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg border border-[#f0ede8] px-3 py-2.5">
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-[#1a1917]">{signal.theme}</p>
                    <p className="text-[12px] text-[#6b6860]">{signal.intent}</p>
                  </div>
                  <div className="ml-4 flex items-center gap-2">
                    <VolumeBar level={signal.estimatedVolume} />
                    <span className="text-[10px] uppercase text-[#9e9b93]">{signal.estimatedVolume}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <p className="mb-2 text-[10px] uppercase tracking-widest text-[#a8a59f]">Who's already in this space</p>
            <div className="grid gap-3 md:grid-cols-3">
              {(reportA?.competitors ?? []).slice(0, 3).map((competitor, idx) => (
                <article key={idx} className="overflow-hidden rounded-xl border border-[#e8e6e0] bg-white">
                  <div className="border-b border-[#e8e6e0] px-4 py-3">
                    <p className="text-[14px] font-semibold text-[#1a1917]">{competitor.name}</p>
                    <p className="mt-1 text-[12px] text-[#6b6860]">{competitor.whatTheyDo}</p>
                  </div>
                  <div className="px-4 py-3">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.08em] text-[#a8a59f]">Gap they leave open</p>
                    <p className="text-[12px] leading-5 text-[#1a1917]">{competitor.gap}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mb-8 rounded-xl bg-[#1a1917] p-6 text-white">
            <p className="text-[14px] leading-7">
              <strong>The real opportunity:</strong> {reportA?.keywordNote || 'Users are already solving this pain manually. Your product wins by removing friction from discovery to action.'}
            </p>
          </div>

          <div className="mb-8">
            <p className="mb-2 text-[10px] uppercase tracking-widest text-[#a8a59f]">Your next 7 days</p>
            <p className="mb-3 text-[13px] text-[#4b4b4b]">These steps will confirm whether this is worth building. Do them in order.</p>
            <div className="space-y-2.5">
              {checklist.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleItem(idx)}
                  className={`w-full rounded-lg border border-[#e8e6e0] bg-white px-4 py-3 text-left transition-colors ${doneItems[idx] ? 'opacity-65' : 'hover:bg-[#faf9f7]'}`}
                >
                  <div className="flex items-start gap-3">
                    <p className="mt-[2px] min-w-[22px] text-[11px] font-semibold text-[#9e9b93]">{String(idx + 1).padStart(2, '0')}</p>
                    <span className={`mt-[2px] inline-flex h-[18px] w-[18px] items-center justify-center rounded-[4px] border ${doneItems[idx] ? 'border-[#808080] bg-[#808080] text-white' : 'border-[#cbc7bc] bg-white'}`}>
                      {doneItems[idx] ? '✓' : ''}
                    </span>
                    <p className={`text-[13px] leading-6 text-[#1a1917] ${doneItems[idx] ? 'line-through text-[#8f8b84]' : ''}`}>{item}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        {!gateUnlocked && <GateOverlay />}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onContinueScope}
          className="flex-1 rounded-lg bg-[#1a1917] px-5 py-3 text-[14px] font-semibold text-white transition hover:bg-[#333]"
        >
          Now decide what to build -&gt;
        </button>
        <a
          href="https://cal.com/creworklabs"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-lg border border-[#d1cec7] bg-transparent px-5 py-3 text-center text-[14px] text-[#1a1917] transition hover:bg-[#f0ede8]"
        >
          Book a call
        </a>
      </div>
    </div>
  )
}
