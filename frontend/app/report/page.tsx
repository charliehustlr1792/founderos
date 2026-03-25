'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type Section = 'validate' | 'plan'

type Post = {
  platform: 'reddit' | 'twitter' | 'ih' | 'linkedin'
  source: string
  user: string
  time: string
  text: string
  stats: string
  mood: 'Pain' | 'Wants solution' | 'Building'
}

const posts: Post[] = [
  {
    platform: 'reddit',
    source: 'r/beauty',
    user: 'u/nailtech_lover',
    time: '3h ago',
    text: 'Why is there still no good app to find nail artists in my city? Instagram is hard to search and Yelp mostly shows salons, not independents.',
    stats: '847 upvotes · 64 comments',
    mood: 'Pain',
  },
  {
    platform: 'twitter',
    source: 'Twitter / X',
    user: '@beautyfounder',
    time: '1d ago',
    text: 'Built a simple tool for booking independent nail techs over the weekend. 3 paying customers already. The demand is clearly there.',
    stats: '332 likes · 28 replies',
    mood: 'Building',
  },
  {
    platform: 'reddit',
    source: 'r/Entrepreneur',
    user: 'u/nail_mkt_idea',
    time: '2d ago',
    text: 'Existing marketplaces are designed for salons, not independent artists. There is a real discoverability gap.',
    stats: '1.2k upvotes · 93 comments',
    mood: 'Wants solution',
  },
  {
    platform: 'ih',
    source: 'Indie Hackers',
    user: 'bootstrapped_91',
    time: '3d ago',
    text: 'We tried existing local beauty discovery tools. None fit freelancers. Might build this ourselves.',
    stats: '562 likes · 31 comments',
    mood: 'Building',
  },
  {
    platform: 'linkedin',
    source: 'LinkedIn',
    user: '@beauty_ops',
    time: '5d ago',
    text: 'The independent beauty economy is growing fast, but tooling has not caught up for solo nail techs.',
    stats: '893 reactions · 47 comments',
    mood: 'Wants solution',
  },
]

const moodColor: Record<Post['mood'], string> = {
  Pain: 'bg-[#f87171]',
  'Wants solution': 'bg-[#34d399]',
  Building: 'bg-[#60a5fa]',
}

export default function ReportPage() {
  const [section, setSection] = useState<Section>('validate')
  const [platform, setPlatform] = useState<'all' | Post['platform']>('all')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [downloadReady, setDownloadReady] = useState(false)
  const keywordCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const platformCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const sentimentCanvasRef = useRef<HTMLCanvasElement | null>(null)

  const filteredPosts = useMemo(() => {
    if (platform === 'all') return posts
    return posts.filter((post) => post.platform === platform)
  }, [platform])

  const submitEmailGate = () => {
    const normalized = email.trim().toLowerCase()
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)

    if (!ok) {
      setEmailError('Please add a valid email to unlock download.')
      setDownloadReady(false)
      return
    }

    setEmailError('')
    setDownloadReady(true)
  }

  useEffect(() => {
    if (section !== 'validate') return

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
  }, [section])

  return (
    <main className="min-h-screen bg-[#f7f6f3] text-[#1a1917]">
      <div className="mx-auto flex min-h-screen max-w-[1400px]">
        <aside className="sticky top-0 hidden h-screen w-[220px] shrink-0 flex-col border-r border-[#e8e6e0] bg-white px-4 py-6 lg:flex">
          <div className="mb-5 px-1 text-[13px] font-semibold">Founder OS <span className="font-normal text-[#6b6860]">by Crework</span></div>

          <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#a8a59f]">Your report</p>
          <button
            onClick={() => setSection('validate')}
            className={`mb-1 rounded-md px-2 py-1.5 text-left text-[13px] ${section === 'validate' ? 'bg-[#f7f6f3] font-medium text-[#1a1917]' : 'text-[#6b6860] hover:bg-[#f7f6f3]'}`}
          >
            Is there demand?
          </button>
          <button
            onClick={() => setSection('plan')}
            className={`mb-2 rounded-md px-2 py-1.5 text-left text-[13px] ${section === 'plan' ? 'bg-[#f7f6f3] font-medium text-[#1a1917]' : 'text-[#6b6860] hover:bg-[#f7f6f3]'}`}
          >
            What to build (Route A)
          </button>

          <div className="my-3 h-px bg-[#e8e6e0]" />

          <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#a8a59f]">Your idea</p>
          <div className="rounded-md bg-[#f7f6f3] p-2 text-[12px] text-[#1a1917]">
            Marketplace to discover nail artists nearby
          </div>
        </aside>

        <section className="w-full px-5 py-8 md:px-8 lg:px-10">
          <div className="mx-auto max-w-[880px]">
            {section === 'validate' ? (
              <div>
                <header className="mb-8 border-b border-[#e8e6e0] pb-6">
                  <p className="mb-3 text-[12px] text-[#a8a59f]">Founder OS -&gt; <span className="text-[#1a1917]">Is there demand?</span></p>
                  <h1 className="mb-2 text-[30px] font-semibold leading-tight">Strong demand signals for your nail artist marketplace</h1>
                  <p className="text-[14px] text-[#6b6860]">We scanned keyword trends and community conversations to find real evidence that people want what you are building.</p>
                </header>

                <div className="mb-10 grid gap-3 md:grid-cols-4">
                  {[
                    ['Keyword demand', '10', 'High search volume'],
                    ['Community buzz', '10', 'Active discussions'],
                    ['Competitor gap', '10', 'No clear winner'],
                    ['Market timing', '9', 'Growing steadily'],
                  ].map(([label, value, meta]) => (
                    <div key={label} className="rounded-xl border border-[#e8e6e0] bg-white p-4">
                      <p className="mb-1 text-[10px] uppercase tracking-[0.06em] text-[#a8a59f]">{label}</p>
                      <p className="mb-1 text-[28px] font-semibold leading-none">{value}</p>
                      <p className="text-[11px] text-[#6b6860]">{meta}</p>
                    </div>
                  ))}
                </div>

                <div className="mb-10">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.1em] text-[#a8a59f]">Search interest over time</p>
                  <div className="rounded-xl border border-[#e8e6e0] bg-white p-5">
                    <h2 className="mb-1 text-[14px] font-semibold">How often people are searching for what you are building</h2>
                    <p className="mb-5 text-[12px] text-[#6b6860]">Monthly search volume across related keywords.</p>
                    <div className="mb-3 flex flex-wrap gap-3 text-[11px] text-[#6b6860]">
                      <span className="inline-flex items-center gap-1"><span className="size-2 rounded-sm bg-[#1a1917]" />nail artist near me</span>
                      <span className="inline-flex items-center gap-1"><span className="size-2 rounded-sm bg-[#9ca3af]" />nail tech booking app</span>
                      <span className="inline-flex items-center gap-1"><span className="size-2 rounded-sm bg-[#d1cec7]" />find nail artist</span>
                    </div>
                    <div className="h-[220px]">
                      <canvas ref={keywordCanvasRef} />
                    </div>
                  </div>
                </div>

                <div className="mb-10 grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-[#e8e6e0] bg-white p-5">
                    <h2 className="mb-1 text-[14px] font-semibold">Discussion volume by platform</h2>
                    <p className="mb-4 text-[12px] text-[#6b6860]">How many posts mention this problem across communities.</p>
                    <div className="h-[200px]">
                      <canvas ref={platformCanvasRef} />
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#e8e6e0] bg-white p-5">
                    <h2 className="mb-1 text-[14px] font-semibold">Sentiment breakdown</h2>
                    <p className="mb-3 text-[12px] text-[#6b6860]">What emotion drives most of the conversation.</p>
                    <div className="mb-2 flex flex-wrap gap-3 text-[11px] text-[#6b6860]">
                      <span className="inline-flex items-center gap-1"><span className="size-2 rounded-full bg-[#f87171]" />Pain / frustration</span>
                      <span className="inline-flex items-center gap-1"><span className="size-2 rounded-full bg-[#34d399]" />Wants a solution</span>
                      <span className="inline-flex items-center gap-1"><span className="size-2 rounded-full bg-[#60a5fa]" />Building one</span>
                    </div>
                    <div className="h-[186px]">
                      <canvas ref={sentimentCanvasRef} />
                    </div>
                  </div>
                </div>

                <div className="mb-10">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.1em] text-[#a8a59f]">What people are talking about this</p>
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
                          onClick={() => setPlatform(id as 'all' | Post['platform'])}
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
                            <span className="font-medium text-[#6b6860]">{post.source}</span>
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

                <div className="mb-10 rounded-xl border border-[#d1cec7] bg-[#fffbeb] p-5">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#92400e]">Download report</p>
                  <h3 className="mb-2 text-[18px] font-semibold">Get the full report PDF</h3>
                  <p className="mb-4 max-w-[640px] text-[13px] leading-6 text-[#6b6860]">
                    Add your email to unlock the full downloadable report, including route A scope, roadmap, and execution checklist.
                  </p>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value)
                        if (emailError) setEmailError('')
                      }}
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-[#d1cec7] bg-white px-4 py-3 text-[14px] outline-none focus:border-[#1a1917]"
                    />
                    <button
                      type="button"
                      onClick={submitEmailGate}
                      className="rounded-lg bg-[#1a1917] px-5 py-3 text-[14px] font-semibold text-white transition hover:bg-[#333]"
                    >
                      Download the report
                    </button>
                  </div>

                  {emailError ? <p className="mt-2 text-[12px] text-[#991b1b]">{emailError}</p> : null}
                  {downloadReady ? (
                    <p className="mt-2 text-[12px] text-[#2d6a4f]">Thanks. Your report is unlocked and ready to download.</p>
                  ) : null}
                </div>

                <div className="mb-10 rounded-xl bg-[#1a1917] p-6 text-white">
                  <p className="text-[15px] leading-7">
                    <strong>The real opportunity:</strong> independent nail artists are running their business through DMs and patchy tools.
                    You are not competing with salon-first products. You are building what they never prioritized for freelancers.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setSection('plan')}
                    className="flex-1 rounded-lg bg-[#1a1917] px-5 py-3 text-[14px] font-semibold text-white transition hover:bg-[#333]"
                  >
                    Now decide what to build first -&gt;
                  </button>
                  <button type="button" className="flex-1 rounded-lg border border-[#d1cec7] bg-transparent px-5 py-3 text-[14px] text-[#1a1917] transition hover:bg-[#f0ede8]">
                    Share this report
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <header className="mb-8 border-b border-[#e8e6e0] pb-6">
                  <p className="mb-3 text-[12px] text-[#a8a59f]">Founder OS -&gt; Is there demand? -&gt; <span className="text-[#1a1917]">What to build</span></p>
                  <h1 className="mb-2 text-[30px] font-semibold leading-tight">Here is what to build first - and what to skip</h1>
                  <p className="text-[14px] text-[#6b6860]">Route A gives you the smallest version of your product that can prove demand and start getting bookings.</p>
                </header>

                <div className="mb-8">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.1em] text-[#a8a59f]">What to build vs what to skip in version 1</p>
                  <div className="grid gap-3 md:grid-cols-2">
                    {[
                      ['Build first', 'Artist profile + portfolio', 'Name, location, style tags, photo gallery, and quick booking intent.'],
                      ['Build first', 'Location-based search', 'Simple map or list by city and neighbourhood.'],
                      ['Build in v2', 'In-app booking + payments', 'Start with manual booking requests first to reduce complexity.'],
                      ['Build in v2', 'Reviews and ratings', 'Useful later, not required for first traction.'],
                      ['Skip for now', 'AI style matching', 'A nice to have feature before core workflow is proven.'],
                      ['Skip for now', 'Subscription tiers for artists', 'Commission model first, pricing tiers later.'],
                    ].map(([group, title, body]) => (
                      <article
                        key={title}
                        className={`rounded-xl border bg-white p-4 ${
                          group === 'Build first'
                            ? 'border-[#1a1917]'
                            : group === 'Skip for now'
                              ? 'border-[#e8e6e0] opacity-65'
                              : 'border-[#e8e6e0]'
                        }`}
                      >
                        <p className="mb-1 text-[10px] uppercase tracking-[0.08em] text-[#a8a59f]">{group}</p>
                        <h3 className="mb-1 text-[15px] font-semibold">{title}</h3>
                        <p className="text-[12px] leading-6 text-[#6b6860]">{body}</p>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="mb-8 rounded-xl border border-[#e8e6e0] bg-white p-5">
                  <p className="mb-1 text-[10px] uppercase tracking-[0.08em] text-[#a8a59f]">Your north star metric</p>
                  <h2 className="mb-1 text-[20px] font-semibold">Bookings completed per artist per month</h2>
                  <p className="text-[13px] leading-6 text-[#6b6860]">If each artist gets more than 5 bookings per month through your product, your MVP is working.</p>
                </div>

                <div className="mb-8 rounded-xl border border-[#e8e6e0] bg-white p-5">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.08em] text-[#a8a59f]">Your path to 1,000 MRR</p>
                  <div className="h-[220px] rounded-lg border border-dashed border-[#d1cec7] bg-[#f7f6f3]" />
                </div>

                <div className="mb-8 rounded-xl bg-[#1a1917] p-6 text-white">
                  <p className="text-[15px] leading-7">
                    <strong>Your biggest risk is not building the wrong product.</strong> It is the two-sided marketplace cold start.
                    Onboard supply first: manually recruit 20 artists in one city before scaling the customer side.
                  </p>
                </div>

                <div className="mb-8">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.1em] text-[#a8a59f]">30-day build plan</p>
                  <div className="space-y-2">
                    {[
                      ['W1', 'Talk to 10 nail techs and 10 customers. Confirm they would use this and what they would pay.'],
                      ['W2', 'Build a no-code prototype with profile and city search, then run user tests.'],
                      ['W3', 'Manually onboard 5 nail techs in one city and close initial bookings by hand.'],
                      ['W4', 'Track if artists are getting real bookings. If not, revisit interviews and positioning.'],
                    ].map(([week, text]) => (
                      <div key={week} className="rounded-lg border border-[#e8e6e0] bg-white p-4">
                        <p className="mb-1 text-[11px] font-semibold text-[#1a1917]">{week}</p>
                        <p className="text-[13px] leading-6 text-[#1a1917]">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button type="button" className="flex-1 rounded-lg bg-[#1a1917] px-5 py-3 text-[14px] font-semibold text-white transition hover:bg-[#333]">
                    Get your full execution plan -&gt;
                  </button>
                  <a
                    href="https://calendly.com/creworklabs/30mins"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-lg border border-[#d1cec7] bg-transparent px-5 py-3 text-center text-[14px] text-[#1a1917] transition hover:bg-[#f0ede8]"
                  >
                    Book a call with Crework
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}