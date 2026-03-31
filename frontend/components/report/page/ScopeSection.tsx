import type { ReportB } from '@/types'
import { GateOverlay } from './shared'
import { AIToolLogo, type AIToolName } from './tool-logos'

type ScopeSectionProps = {
  reportB: ReportB | null
  gateUnlocked: boolean
  onContinuePlan: () => void
  onBackValidate: () => void
}

const CHIP_BASE = 'inline-flex items-center rounded-[6px] px-2.5 py-1 text-[11px] font-medium'

export function ScopeSection({ reportB, gateUnlocked, onContinuePlan }: ScopeSectionProps) {
  const userChannels: Array<{ platform: string; title: string; body: string; badge?: string; color: string }> = [
    {
      platform: 'Reddit',
      title: 'r/beauty · r/Nails · r/malegrooming',
      body: 'People actively asking where to find good nail techs. Reply with help, not promo links.',
      badge: 'Start here',
      color: '#ff4500',
    },
    {
      platform: 'Instagram',
      title: 'Instagram - nail tech hashtags',
      body: 'Your supply side is already here. DM artists directly and recruit founding members.',
      color: '#d62976',
    },
    {
      platform: 'Facebook',
      title: 'Local Facebook groups + Nextdoor',
      body: 'Hyperlocal and high-trust channels where recommendations happen daily.',
      color: '#1877f2',
    },
    {
      platform: 'TikTok',
      title: 'TikTok - nail art search',
      body: 'Show the pain and your workflow fix in short problem-solution clips.',
      color: '#111111',
    },
    {
      platform: 'Indie Hackers',
      title: 'Product Hunt + Indie Hackers',
      body: 'Create an upcoming page and document your build to build early interest.',
      color: '#0e7f6e',
    },
  ]

  return (
    <div className="relative">
      <div className={`${!gateUnlocked ? 'pointer-events-none select-none' : ''}`}>
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="rounded-[5px] bg-[#f0ede6] px-2.5 py-1 text-[11px] text-[#5a574f]">Marketplace</span>
          <span className="rounded-[5px] bg-[#f0ede6] px-2.5 py-1 text-[11px] text-[#5a574f]">Consumer · B2C</span>
          <span className="rounded-[5px] border border-[#b5d6bf] bg-[#eaf3ec] px-2.5 py-1 text-[11px] text-[#1e5c38]">Low-Medium complexity</span>
          <span className="rounded-[5px] bg-[#f0ede6] px-2.5 py-1 text-[11px] text-[#5a574f]">6-8 weeks to build</span>
        </div>

        <p className="mb-2 text-[10px] uppercase tracking-widest text-[#9e9b93]">Your core loop</p>
        <div className="mb-8 rounded-xl bg-[#1c1b18] px-6 py-6 text-white">
          <p className="mb-3 text-[14px] text-white/70">This is the single thing a user does in your product that delivers value.</p>
          <p className="text-[24px] leading-[1.35]" style={{ fontFamily: 'Georgia, serif' }}>
            User searches by location -&gt; views nail artist portfolio -&gt; sends a booking request.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {['Search by location', 'View portfolio', 'Send booking request'].map((step, idx) => (
              <div key={step} className="inline-flex items-center gap-2">
                <span className="rounded-md border border-white/20 bg-white/10 px-3 py-2 text-[12px]">{step}</span>
                {idx < 2 && <span className="text-white/35">-&gt;</span>}
              </div>
            ))}
          </div>
          <p className="mt-4 text-[12px] italic text-white/45">If a feature does not support one of these three steps, it does not belong in v1.</p>
        </div>

        <div className="mb-8 h-px bg-[#e4e0d8]" />

        <div className="mb-3">
          <p className="mb-1 text-[10px] uppercase tracking-widest text-[#9e9b93]">Feature priority matrix</p>
          <p className="text-[13px] text-[#5a574f]">Every feature plotted by user need vs build difficulty, plus where your idea sits in the market.</p>
        </div>

        <div className="mb-8 grid gap-3 md:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-[#d9d3c8] bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.03)]">
            <div className="border-b border-[#e4e0d8] bg-[#fbfaf7] px-4 py-3">
              <div className="mb-1 flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-[0.08em] text-[#9e9b93]">User need x Build complexity</p>
                <p className="text-[10px] uppercase tracking-[0.08em] text-[#9e9b93]">Easy ↔ Hard</p>
              </div>
              <div className="h-px bg-[#ece7de]" />
            </div>
            <div className="grid grid-cols-2 gap-2 p-3">
              <div className="rounded-lg border border-[#b5d6bf] bg-[linear-gradient(180deg,#eef8f1_0%,#e7f2ea_100%)] p-3">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#1e5c38]">Build now</p>
                <div className="space-y-1.5">
                  <span className={`${CHIP_BASE} bg-white/75 text-[#1e5c38]`}>Location search</span>
                  <span className={`${CHIP_BASE} bg-white/75 text-[#1e5c38]`}>Artist profile</span>
                  <span className={`${CHIP_BASE} bg-white/75 text-[#1e5c38]`}>Portfolio gallery</span>
                  <span className={`${CHIP_BASE} bg-white/75 text-[#1e5c38]`}>Booking form</span>
                </div>
              </div>
              <div className="rounded-lg border border-[#fde68a] bg-[linear-gradient(180deg,#fffdf1_0%,#fdf8df_100%)] p-3">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#78350f]">Simplify</p>
                <div className="space-y-1.5">
                  <span className={`${CHIP_BASE} bg-white/75 text-[#78350f]`}>In-app payments</span>
                  <span className={`${CHIP_BASE} bg-white/75 text-[#78350f]`}>Availability cal.</span>
                  <span className={`${CHIP_BASE} bg-white/75 text-[#78350f]`}>Verified reviews</span>
                </div>
              </div>
              <div className="rounded-lg border border-[#bfdbfe] bg-[linear-gradient(180deg,#f4f9ff_0%,#eaf3ff_100%)] p-3">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#1e3a5f]">Defer</p>
                <div className="space-y-1.5">
                  <span className={`${CHIP_BASE} bg-white/75 text-[#1e3a5f]`}>Onboarding flow</span>
                  <span className={`${CHIP_BASE} bg-white/75 text-[#1e3a5f]`}>Saved favourites</span>
                  <span className={`${CHIP_BASE} bg-white/75 text-[#1e3a5f]`}>Push notifs</span>
                </div>
              </div>
              <div className="rounded-lg border border-[#fecaca] bg-[linear-gradient(180deg,#fff7f7_0%,#fdecec_100%)] p-3">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#7f1d1d]">Skip</p>
                <div className="space-y-1.5">
                  <span className={`${CHIP_BASE} bg-white/75 text-[#7f1d1d] line-through`}>AI matching</span>
                  <span className={`${CHIP_BASE} bg-white/75 text-[#7f1d1d] line-through`}>Subscription tiers</span>
                  <span className={`${CHIP_BASE} bg-white/75 text-[#7f1d1d] line-through`}>Social feed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="overflow-hidden rounded-xl border border-[#e4e0d8] bg-white">
              <div className="border-b border-[#e4e0d8] px-4 py-3">
                <p className="text-[13px] font-medium text-[#1c1b18]">Where your idea sits in the market</p>
                <p className="text-[11px] text-[#9e9b93]">Based on market uniqueness x value delivered</p>
              </div>
              <div className="grid grid-cols-2">
                <div className="border-b border-r border-[#e4e0d8] px-3 py-3 opacity-50">
                  <p className="text-[12px] font-semibold">Tech Novelty</p>
                  <p className="text-[11px] text-[#9e9b93]">High uniqueness · Low value</p>
                </div>
                <div className="border-b border-[#b5d6bf] bg-[#eaf3ec] px-3 py-3">
                  <p className="mb-1 inline-block rounded bg-[#1e5c38] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.06em] text-white">Your idea</p>
                  <p className="text-[12px] font-semibold text-[#1e5c38]">Category King</p>
                  <p className="text-[11px] text-[#1e5c38]/80">High uniqueness · High value</p>
                </div>
                <div className="border-r border-[#e4e0d8] px-3 py-3 opacity-50">
                  <p className="text-[12px] font-semibold">Low Impact</p>
                  <p className="text-[11px] text-[#9e9b93]">Low uniqueness · Low value</p>
                </div>
                <div className="px-3 py-3 opacity-50">
                  <p className="text-[12px] font-semibold">Commodity Play</p>
                  <p className="text-[11px] text-[#9e9b93]">Low uniqueness · High value</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#e4e0d8] bg-white p-4">
              <p className="mb-1 text-[13px] font-medium text-[#1c1b18]">A.C.P. Framework score</p>
              <p className="mb-3 text-[11px] text-[#9e9b93]">Audience · Community · Product</p>

              {[
                ['Audience', '8/10', '80%', '#1e5c38'],
                ['Community', '6/10', '60%', '#d97706'],
                ['Product', '8/10', '80%', '#1e5c38'],
              ].map(([label, score, width, color]) => (
                <div key={label} className="mb-3 last:mb-0">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[13px] text-[#1c1b18]">{label}</span>
                    <span className="text-[13px] font-medium" style={{ color, fontFamily: 'var(--font-geist-mono)' }}>{score}</span>
                  </div>
                  <div className="h-1.25 overflow-hidden rounded bg-[#e4e0d8]">
                    <div className="h-full rounded" style={{ width, background: color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-8 h-px bg-[#e4e0d8]" />

        <div className="mb-3">
          <p className="mb-1 text-[10px] uppercase tracking-widest text-[#9e9b93]">Technical complexity</p>
          <p className="text-[13px] text-[#5a574f]">An honest read of build difficulty, stack choice, and mistakes to avoid.</p>
        </div>

        <div className="mb-3 overflow-hidden rounded-xl border border-[#e4e0d8] bg-white">
          <div className="border-b border-[#e4e0d8] px-5 py-4">
            <div className="flex flex-wrap items-start gap-4">
              <div>
                <p className="mb-2 text-[10px] uppercase tracking-[0.08em] text-[#9e9b93]">Complexity level</p>
                <span className="inline-flex items-center gap-2 rounded-[7px] border border-[#b5d6bf] bg-[#eaf3ec] px-3 py-1.5 text-[14px] font-semibold text-[#1e5c38]">
                  <span className="h-2 w-2 rounded-full bg-[#1e5c38]" />
                  Low-Medium
                </span>
              </div>
              <p className="flex-1 text-[13px] leading-7 text-[#5a574f]">
                Marketplaces are technically moderate complexity. Core listing and search are straightforward, but two-sided workflows add auth and data modelling overhead.
              </p>
            </div>
          </div>

          <div className="bg-[#1c1b18] px-5 py-4">
            <p className="mb-2 text-[10px] uppercase tracking-[0.08em] text-white/40">Suggested approach</p>
            <p className="mb-3 text-[12px] leading-6 text-white/80" style={{ fontFamily: 'var(--font-geist-mono)' }}>
              Next.js for frontend + Supabase for database, auth, and storage. Google Maps API for location. Cal.com embedded for booking. Vercel for hosting.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Next.js', 'Supabase', 'Google Maps API', 'Vercel', 'Tailwind CSS', 'Stripe'].map((tool) => (
                <span key={tool} className="rounded-[5px] border border-white/25 bg-white/10 px-2.5 py-1 text-[11px] text-white/85" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-3 rounded-xl border border-[#e4e0d8] bg-white p-4">
          <p className="mb-3 text-[10px] uppercase tracking-[0.08em] text-[#9e9b93]">AI tools to build faster</p>
          <div className="mb-3 flex flex-wrap gap-2">
            {[
              ['L', 'Lovable', 'Frontend-first, great for UI-heavy apps'],
              ['C', 'Cursor', 'AI code editor for full-stack builds'],
              ['V0', 'v0 by Vercel', 'Generate UI components instantly'],
              ['B', 'Bolt', 'Instant full-stack prototypes'],
            ].map(([, name, use]) => (
              <a key={name} href="#" className="inline-flex items-center gap-2 rounded-lg border border-[#e4e0d8] bg-[#f8f6f1] px-3 py-2 text-[12px] text-[#1c1b18] no-underline">
                <AIToolLogo tool={name as AIToolName} />
                <span className="font-medium">{name}</span>
                <span className="text-[#9e9b93]">{use}</span>
              </a>
            ))}
          </div>
          <a href="#" className="text-[12px] text-[#5a574f] no-underline">The perfect vibe coding stack for building your MVP in 2026 -&gt;</a>
        </div>

        <div className="mb-8">
          <p className="mb-2 text-[10px] uppercase tracking-[0.08em] text-[#9e9b93]">Common mistakes to avoid</p>
          <div className="space-y-2">
            {[
              'Building for both sides at once. Solve supply first and manually onboard your first 20 artists in one city.',
              'Building payments before proving the core loop. Validate booking behavior first.',
              'Launching nationally too early. Local density wins for marketplace products.',
            ].map((mistake) => (
              <div key={mistake} className="flex items-start gap-3 rounded-lg border border-[#fde68a] bg-[#fffbeb] px-4 py-3">
                <span className="mt-px text-[13px]">⚠</span>
                <p className="text-[13px] leading-6 text-[#78350f]">{mistake}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8 h-px bg-[#e4e0d8]" />

        <div className="mb-3">
          <p className="mb-1 text-[10px] uppercase tracking-widest text-[#9e9b93]">Get your first 100 users</p>
          <p className="text-[13px] text-[#5a574f]">Your users are already talking about this problem in these exact places.</p>
        </div>

        <div className="mb-5">
          <p className="mb-2 text-[10px] uppercase tracking-[0.08em] text-[#9e9b93]">Where your users already are</p>
          <div className="space-y-2.5 rounded-xl border border-[#e8e6e0] bg-white px-5 py-4">
            {userChannels.map(({ platform, title, body, badge, color }) => (
              <article key={title} className="border-b border-[#e8e6e0] pb-3 last:border-b-0 last:pb-0">
                <div className="mb-1 flex items-center gap-2 text-[11px]">
                  <span className="font-semibold" style={{ color }}>{platform}</span>
                  <span className="text-[#a8a59f]">·</span>
                  <span className="text-[#6b6860]">{title}</span>
                </div>
                <p className="text-[13px] leading-6 text-[#1c1b18]">{body}</p>
                {badge && <span className="mt-2 inline-flex rounded-[5px] border border-[#b5d6bf] bg-[#eaf3ec] px-2 py-0.5 text-[10px] font-semibold text-[#1e5c38]">{badge}</span>}
              </article>
            ))}
          </div>
        </div>

        <div className="mb-8 rounded-xl border border-[#e4e0d8] bg-white p-5">
          <p className="mb-1 text-[13px] font-medium text-[#1c1b18]">How to use AI to find the exact communities where your users already are</p>
          <p className="mb-3 text-[13px] leading-6 text-[#5a574f]">We send one practical guide per week to founders building their first product.</p>
          <div className="flex flex-wrap gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="h-10 min-w-50 flex-1 rounded-lg border border-[#e4e0d8] bg-[#f8f6f1] px-3 text-[13px] outline-none"
            />
            <button className="h-10 rounded-lg bg-[#1c1b18] px-4 text-[13px] font-medium text-white">Send me the guide -&gt;</button>
          </div>
          <p className="mt-2 text-[11px] text-[#9e9b93]">One email per week · No spam · Unsubscribe any time</p>
        </div>

        <div className="mb-8 h-px bg-[#e4e0d8]" />

        <button
          type="button"
          onClick={onContinuePlan}
          className="flex w-full items-center justify-between rounded-xl border border-[#e4e0d8] bg-white px-5 py-4 text-left transition-colors hover:border-[#cbc7bc]"
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.08em] text-[#9e9b93]">Next step</p>
            <p className="text-[14px] font-medium text-[#1c1b18]">How to start - your 30-day launch plan</p>
          </div>
          <span className="text-[18px] text-[#9e9b93]">→</span>
        </button>
      </div>

      {!gateUnlocked && <GateOverlay />}
    </div>
  )
}
