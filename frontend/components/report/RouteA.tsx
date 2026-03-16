'use client'

import React from 'react'
import { Section, BlogLink, VolumeBar, NextButton } from './ReportSections'
import type { ReportA, Community } from '@/types'
import {
  RedditIcon, XIcon, LinkedInIcon, DiscordIcon,
  IndieHackersIcon, SlackIcon, FacebookIcon
} from './PlatformIcons'

const PLATFORM_ICON: Record<Community['platform'], React.ReactNode> = {
  Reddit: <RedditIcon size={28} />,
  X: <XIcon size={28} />,
  LinkedIn: <LinkedInIcon size={28} />,
  Discord: <DiscordIcon size={28} />,
  IndieHackers: <IndieHackersIcon size={28} />,
  Slack: <SlackIcon size={28} />,
  Facebook: <FacebookIcon size={28} />,
}

// ─── Post generation ──────────────────────────────────────────────────────────
// Data shape is intentionally simple — swap `generateFeedPosts` for a real API call later

export type FeedPost = {
  platform: Community['platform']
  community: string
  username: string
  text: string
  upvotes: number
  comments: number
  timeAgo: string
  url?: string
}

const POST_TEMPLATES = [
  (topic: string) => `Anyone else dealing with ${topic}? Would love to know how others are handling this.`,
  (topic: string) => `We've been managing ${topic} manually but it's getting painful at scale. Any tools?`,
  (topic: string) => `Hot take: the current solutions for ${topic} are all over-engineered. There has to be a simpler way.`,
  (topic: string) => `Started building something for ${topic} — 6 people in my DMs after one tweet. Validating fast.`,
  (topic: string) => `Looking for a co-founder who's experienced with ${topic}. The problem is real, I've talked to 20+ people.`,
  (topic: string) => `Honest question — would you pay for a tool that handles ${topic} automatically?`,
  (topic: string) => `We tried every existing solution for ${topic}. Nothing fits our workflow. Might just build it ourselves.`,
  (topic: string) => `My biggest pain point this quarter: ${topic}. No good software exists yet.`,
  (topic: string) => `Show IH: built a tiny tool for ${topic} over the weekend. 3 paying customers already.`,
  (topic: string) => `The ${topic} space is weirdly fragmented. Why hasn't anyone built a unified solution yet?`,
]

const USER_PREFIXES: Record<Community['platform'], string> = {
  Reddit: 'u/',
  X: '@',
  LinkedIn: '',
  Discord: '',
  IndieHackers: '',
  Slack: '@',
  Facebook: '',
}

const USERNAMES = [
  'startupfounder_', 'dev_', 'maker_', 'indie_', 'builder_', 'founder_',
  'product_', 'hacker_', 'cto_', 'solo_', 'bootstrapped_', 'launch_',
]

function pickUsername(platform: Community['platform'], seed: number): string {
  const prefix = USER_PREFIXES[platform]
  const name = USERNAMES[seed % USERNAMES.length] + (Math.floor(seed * 7.3) % 99 + 1)
  return prefix + name
}

function topicFromCommunity(community: Community): string {
  // Use the community description words as the topic for realism
  const words = community.description.split(' ').filter(w => w.length > 4)
  if (words.length >= 3) return words.slice(0, 3).join(' ').toLowerCase().replace(/[.,]/g, '')
  return community.name.replace(/^(r\/|#)/, '')
}

export function generateFeedPosts(communities: Community[]): FeedPost[] {
  const posts: FeedPost[] = []
  communities.forEach((c, ci) => {
    const postsPerCommunity = 3
    for (let pi = 0; pi < postsPerCommunity; pi++) {
      const seed = ci * 13 + pi * 7
      const topic = topicFromCommunity(c)
      const templateIdx = (seed + ci + pi) % POST_TEMPLATES.length
      posts.push({
        platform: c.platform,
        community: c.name,
        username: pickUsername(c.platform, seed),
        text: POST_TEMPLATES[templateIdx](topic),
        upvotes: Math.floor(((seed * 37 + ci * 19 + pi * 11) % 950) + 12),
        comments: Math.floor(((seed * 13 + ci * 7) % 88) + 3),
        timeAgo: ['2h', '4h', '7h', '12h', '1d', '2d', '3d'][seed % 7] + ' ago',
        url: c.url,
      })
    }
  })
  return posts
}

// ─── Feed components ──────────────────────────────────────────────────────────

function PlatformBadge({ platform }: { platform: Community['platform'] }) {
  return (
    <span
      className="inline-flex items-center justify-center w-[28px] h-[28px] rounded-full shrink-0 overflow-hidden"
      title={platform}
    >
      {PLATFORM_ICON[platform]}
    </span>
  )
}

function FeedRow({ post }: { post: FeedPost }) {
  return (
    <a
      href={post.url ?? '#'}
      target={post.url ? '_blank' : '_self'}
      rel="noopener noreferrer"
      className="flex items-start gap-3 px-4 py-3 border-b border-[#f5f5f5] hover:bg-[#fafafa] transition-colors duration-100 no-underline block"
    >
      <PlatformBadge platform={post.platform} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-[11px] text-[#0a0a0a] font-medium"
            style={{ fontFamily: 'var(--font-geist-mono)' }}
          >
            {post.community}
          </span>
          <span className="text-[#e5e5e5]">·</span>
          <span
            className="text-[10px] text-[#a3a3a3]"
            style={{ fontFamily: 'var(--font-geist-mono)' }}
          >
            {post.username}
          </span>
          <span className="text-[#e5e5e5] ml-auto">·</span>
          <span
            className="text-[10px] text-[#a3a3a3]"
            style={{ fontFamily: 'var(--font-geist-mono)' }}
          >
            {post.timeAgo}
          </span>
        </div>
        <p className="text-[13px] text-[#525252] leading-snug line-clamp-2">{post.text}</p>
        <div className="flex items-center gap-3 mt-1.5">
          <span
            className="text-[10px] text-[#a3a3a3] flex items-center gap-1"
            style={{ fontFamily: 'var(--font-geist-mono)' }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
            {post.upvotes.toLocaleString()}
          </span>
          <span
            className="text-[10px] text-[#a3a3a3] flex items-center gap-1"
            style={{ fontFamily: 'var(--font-geist-mono)' }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
            {post.comments}
          </span>
        </div>
      </div>
    </a>
  )
}

function CommunitySignalFeed({ communities }: { communities: Community[] }) {
  const posts = generateFeedPosts(communities)

  return (
    <div>
      {/* Header bar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-[6px] h-[6px] rounded-full bg-[#0a0a0a] pulse-dot"
          />
          <span
            className="text-[10px] text-[#525252] uppercase tracking-[0.1em]"
            style={{ fontFamily: 'var(--font-geist-mono)' }}
          >
            LIVE SIGNAL FEED
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {Array.from(new Set(communities.map(c => c.platform))).map(p => (
            <span key={p} className="opacity-75 rounded-full overflow-hidden" title={p}>
              {React.cloneElement(PLATFORM_ICON[p as Community['platform']] as React.ReactElement, { size: 18 })}
            </span>
          ))}
        </div>
      </div>

      {/* Scrolling feed */}
      <div
        className="rounded-[4px] border border-[#e5e5e5] bg-white overflow-hidden"
        style={{
          height: 320,
          position: 'relative',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}
      >
        {/* Fade masks top + bottom */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, white 0%, transparent 8%, transparent 92%, white 100%)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />
        {/* Scrolling inner container — duplicate posts for seamless loop */}
        <div className="feed-scroll" style={{ willChange: 'transform' }}>
          {[...posts, ...posts].map((post, i) => (
            <FeedRow key={i} post={post} />
          ))}
        </div>
      </div>

      {/* Community links below feed */}
      <div className="mt-3 flex flex-wrap gap-2">
        {communities.map((c, i) => (
          <a
            key={i}
            href={c.url ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] border border-[#e5e5e5] bg-white text-[11px] text-[#525252] hover:border-[#171717] hover:text-[#0a0a0a] transition-colors duration-150 no-underline"
            style={{ fontFamily: 'var(--font-geist-mono)' }}
          >
            <span className="rounded-full overflow-hidden" style={{ width: 14, height: 14, display: 'inline-flex' }}>
              {React.cloneElement(PLATFORM_ICON[c.platform] as React.ReactElement, { size: 14 })}
            </span>
            {c.name}
          </a>
        ))}
      </div>
    </div>
  )
}

// ─── Platform icons old text map kept for fallback ────────────────────────────
// (no longer used in render but kept for reference)

type Props = { report: ReportA; onNext: () => void }

export function RouteAReport({ report, onNext }: Props) {
  return (
    <div className="space-y-10">

      {/* Demand signals */}
      <Section title="DEMAND SIGNALS">
        <div className="rounded-[4px] border border-[#e5e5e5] overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          {report.demandSignals.map((s, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: i < report.demandSignals.length - 1 ? '1px solid #f5f5f5' : 'none', background: i % 2 === 0 ? '#ffffff' : '#fafafa' }}
            >
              <div className="min-w-0 mr-4">
                <p className="text-[14px] font-medium text-[#0a0a0a] leading-snug">{s.theme}</p>
                <p className="text-[12px] text-[#525252] mt-0.5">{s.intent}</p>
              </div>
              <div className="shrink-0 flex items-center gap-3">
                <VolumeBar level={s.estimatedVolume} />
                <span
                  className="text-[10px] uppercase px-2 py-0.5 rounded-[3px]"
                  style={{
                    fontFamily: 'var(--font-geist-mono)',
                    background: s.estimatedVolume === 'high' ? '#dcfce7' : s.estimatedVolume === 'moderate' ? '#fef9c3' : '#f5f5f5',
                    color: s.estimatedVolume === 'high' ? '#15803d' : s.estimatedVolume === 'moderate' ? '#a16207' : '#a3a3a3',
                  }}
                >
                  {s.estimatedVolume}
                </span>
              </div>
            </div>
          ))}
        </div>
        {report.keywordNote && (
          <p className="text-[12px] text-[#525252] leading-relaxed pt-1">{report.keywordNote}</p>
        )}
      </Section>

      {/* Communities — signal feed */}
      <Section title="WHERE YOUR USERS ARE">
        <CommunitySignalFeed communities={report.communities} />
        {report.blogLinks?.[0] && (
          <BlogLink
            label={report.blogLinks[0].label}
            url={report.blogLinks[0].url}
            context={report.blogLinks[0].context}
          />
        )}
      </Section>

      {/* Competitors */}
      <Section title="WHO'S ALREADY IN THIS SPACE">
        <div className="space-y-3">
          {report.competitors.map((c, i) => {
            const domain = c.name.toLowerCase().replace(/\s+/g, '') + '.com'
            const faviconSrc = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
            return (
              <div key={i} className="rounded-[4px] border border-[#e5e5e5] bg-white overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                {/* Header */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-[#f5f5f5]">
                  <div className="w-[32px] h-[32px] rounded-[6px] border border-[#e5e5e5] bg-[#fafafa] flex items-center justify-center overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={faviconSrc}
                      alt={c.name}
                      width={20}
                      height={20}
                      onError={(e) => {
                        const el = e.currentTarget as HTMLImageElement
                        el.style.display = 'none'
                        if (el.parentElement) {
                          el.parentElement.innerHTML = `<span style="font-size:12px;font-weight:700;color:#0a0a0a">${c.name.charAt(0)}</span>`
                        }
                      }}
                    />
                  </div>
                  <p className="text-[14px] font-semibold text-[#0a0a0a]">{c.name}</p>
                </div>
                {/* What they do */}
                <div className="px-4 py-3">
                  <p className="text-[13px] text-[#525252] leading-relaxed">{c.whatTheyDo}</p>
                </div>
                {/* Gap — green highlight */}
                <div className="px-4 py-3" style={{ background: '#f0fdf4', borderTop: '1px solid #bbf7d0' }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <circle cx="5.5" cy="5.5" r="5" stroke="#16a34a" strokeWidth="1"/>
                      <path d="M3 5.5l1.5 1.5 3.5-3" stroke="#16a34a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-[9px] uppercase tracking-[0.1em] font-semibold" style={{ fontFamily: 'var(--font-geist-mono)', color: '#16a34a' }}>
                      YOUR OPPORTUNITY
                    </p>
                  </div>
                  <p className="text-[13px] leading-relaxed" style={{ color: '#15803d' }}>{c.gap}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Section>

      {/* CTA to Route B */}
      <div className="pt-2">
        <NextButton onClick={onNext} label="Now scope your MVP →" />
      </div>

    </div>
  )
}