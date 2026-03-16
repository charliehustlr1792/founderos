'use client'

import { useState, useEffect } from 'react'
import { useFounderStore } from '@/store/useFounderStore'
import { analytics } from '@/lib/analytics'
import {
  Section, BlogLink, CheckItem, ComplexityBadge, NextButton, GlassCard
} from './ReportSections'
import { BudgetGate } from './BudgetGate'
import type { ReportB, CommunityThread } from '@/types'
import { RedditIcon, XIcon, LinkedInIcon, DiscordIcon, IndieHackersIcon, SlackIcon } from './PlatformIcons'

type Props = { report: ReportB; onNext: () => void }

function StrikeThroughFeature({ name, why, index }: { name: string; why: string; index: number }) {
  const [struck, setStruck] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStruck(true), index * 150)
    return () => clearTimeout(t)
  }, [index])

  return (
    <div className="py-3 border-b border-[#f5f5f5]">
      <div className="relative inline-block">
        <span
          className="text-[14px] transition-colors duration-200"
          style={{ color: struck ? '#a3a3a3' : '#0a0a0a' }}
        >
          {name}
        </span>
        {struck && (
          <span
            className="absolute left-0 bg-[#171717] strike-line"
            style={{ height: '1px', top: '50%', transform: 'translateY(-50%)' }}
          />
        )}
      </div>
      <p
        className="text-[12px] text-[#525252] mt-1 leading-relaxed transition-opacity duration-300"
        style={{ opacity: struck ? 1 : 0, transitionDelay: struck ? '350ms' : '0ms' }}
      >
        {why}
      </p>
    </div>
  )
}

// ─── AI Tool icon grid ────────────────────────────────────────────────────────

const TOOL_DOMAINS: Record<string, string> = {
  'Lovable':        'lovable.dev',
  'Cursor':         'cursor.com',
  'Bolt':           'bolt.new',
  'v0':             'v0.dev',
  'Replit':         'replit.com',
  'Windsurf':       'codeium.com',
  'Supabase':       'supabase.com',
  'Vercel':         'vercel.com',
  'Railway':        'railway.app',
  'PlanetScale':    'planetscale.com',
  'Claude':         'anthropic.com',
  'ChatGPT':        'chatgpt.com',
  'Midjourney':     'midjourney.com',
  'Framer':         'framer.com',
  'Figma':          'figma.com',
  'Linear':         'linear.app',
  'Notion':         'notion.so',
  'Stripe':         'stripe.com',
  'Lemon Squeezy':  'lemonsqueezy.com',
  'Resend':         'resend.com',
  'Crisp':          'crisp.chat',
  'Posthog':        'posthog.com',
  'Mixpanel':       'mixpanel.com',
  'Amplitude':      'amplitude.com',
  'Airtable':       'airtable.com',
  'Make':           'make.com',
  'Zapier':         'zapier.com',
  'Bubble':         'bubble.io',
  'Webflow':        'webflow.com',
  'Glide':          'glideapps.com',
}

function faviconUrl(toolName: string): string {
  const domain = TOOL_DOMAINS[toolName] ?? `${toolName.toLowerCase().replace(/\s/g, '')}.com`
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
}

function ToolIcon({ tool, url }: { tool: string; url: string }) {
  const [imgFailed, setImgFailed] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex flex-col items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={tool}
    >
      {/* Tooltip */}
      {hovered && (
        <span
          className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded-[4px] bg-[#0a0a0a] text-white text-[10px] pointer-events-none z-10"
          style={{ fontFamily: 'var(--font-geist-mono)' }}
        >
          {tool}
        </span>
      )}
      <div
        className="w-[48px] h-[48px] rounded-[8px] border border-[#e5e5e5] bg-white flex items-center justify-center overflow-hidden transition-all duration-150"
        style={{
          boxShadow: hovered ? '0 2px 8px rgba(0,0,0,0.10)' : '0 1px 3px rgba(0,0,0,0.06)',
          transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
          borderColor: hovered ? '#171717' : '#e5e5e5',
        }}
      >
        {!imgFailed ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={faviconUrl(tool)}
            alt={tool}
            width={28}
            height={28}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span
            className="text-[14px] font-bold text-[#0a0a0a]"
            style={{ fontFamily: 'var(--font-geist-mono)' }}
          >
            {tool.charAt(0)}
          </span>
        )}
      </div>
    </a>
  )
}

function AIToolGrid({ tools }: { tools: ReportB['aiTools'] }) {
  return (
    <div>
      <div className="flex flex-wrap gap-4 py-2">
        {tools.map((t, i) => (
          <ToolIcon key={i} tool={t.tool} url={t.url} />
        ))}
      </div>
      <p className="text-[11px] text-[#a3a3a3] mt-3" style={{ fontFamily: 'var(--font-geist-mono)' }}>
        Hover for tool name · click to open
      </p>
    </div>
  )
}

// ─── Where to Engage — iMessage-style bubbles ─────────────────────────────────

type Platform = 'Reddit' | 'X' | 'LinkedIn' | 'Discord' | 'IndieHackers' | 'Slack' | 'Generic'

function detectPlatform(community: string): Platform {
  const c = community.toLowerCase()
  if (c.startsWith('r/') || c.includes('reddit')) return 'Reddit'
  if (c.startsWith('@') || c.includes('twitter') || c.includes(' x ') || c === 'x') return 'X'
  if (c.includes('linkedin')) return 'LinkedIn'
  if (c.startsWith('#') || c.includes('discord')) return 'Discord'
  if (c.includes('indiehacker') || c.includes('indie hacker') || c.includes('ih')) return 'IndieHackers'
  if (c.includes('slack')) return 'Slack'
  return 'Generic'
}

const PLATFORM_ICON_MAP: Record<Platform, React.ReactNode> = {
  Reddit:       <RedditIcon size={28} />,
  X:            <XIcon size={28} />,
  LinkedIn:     <LinkedInIcon size={28} />,
  Discord:      <DiscordIcon size={28} />,
  IndieHackers: <IndieHackersIcon size={28} />,
  Slack:        <SlackIcon size={28} />,
  Generic: (
    <div className="w-[28px] h-[28px] rounded-full bg-[#f5f5f5] flex items-center justify-center">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#525252">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z"/>
      </svg>
    </div>
  ),
}

function ChatBubble({ thread, index }: { thread: CommunityThread; index: number }) {
  const isSent = index % 2 === 1
  const platform = detectPlatform(thread.community)
  const icon = PLATFORM_ICON_MAP[platform]

  return (
    <div className={`flex items-end gap-2.5 ${isSent ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div
        className="w-[32px] h-[32px] rounded-full overflow-hidden flex items-center justify-center shrink-0"
      >
        {icon}
      </div>

      <div className={`max-w-[75%] space-y-1 ${isSent ? 'items-end' : 'items-start'} flex flex-col`}>
        {/* Community + topic header */}
        <div className={`flex items-center gap-1.5 ${isSent ? 'flex-row-reverse' : 'flex-row'}`}>
          <span
            className="text-[10px] font-medium text-[#0a0a0a]"
            style={{ fontFamily: 'var(--font-geist-mono)' }}
          >
            {thread.community}
          </span>
          <span className="text-[#d4d4d4] text-[10px]">·</span>
          <span
            className="text-[10px] text-[#a3a3a3]"
            style={{ fontFamily: 'var(--font-geist-mono)' }}
          >
            {thread.topic}
          </span>
        </div>

        {/* Bubble */}
        <div
          className="rounded-[14px] px-3.5 py-2.5 text-[13px] leading-relaxed"
          style={{
            background: isSent ? '#171717' : '#f5f5f5',
            color: isSent ? '#ffffff' : '#0a0a0a',
            borderBottomRightRadius: isSent ? '4px' : '14px',
            borderBottomLeftRadius: isSent ? '14px' : '4px',
          }}
        >
          {thread.suggestedComment}
        </div>

        {/* Copy hint */}
        <span
          className="text-[9px] text-[#a3a3a3]"
          style={{ fontFamily: 'var(--font-geist-mono)' }}
        >
          copy & post
        </span>
      </div>
    </div>
  )
}

function EngageFeed({ threads }: { threads: CommunityThread[] }) {
  return (
    <div
      className="rounded-[4px] border border-[#e5e5e5] bg-white p-5 space-y-5"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
    >
      {threads.map((t, i) => (
        <ChatBubble key={i} thread={t} index={i} />
      ))}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function RouteBReport({ report, onNext }: Props) {
  const { budget } = useFounderStore()

  return (
    <div className="space-y-10">

      {/* Core features — black 3D cards */}
      <Section title="BUILD THESE — AND ONLY THESE">
        <div className="space-y-3">
          {report.coreFeatures.map((f, i) => (
            <GlassCard key={i} className="flex gap-4 items-start p-5">
              <span
                className="text-[28px] leading-none shrink-0"
                style={{ fontFamily: 'var(--font-geist-mono)', color: 'rgba(255,255,255,0.2)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="text-[15px] font-medium text-white">{f.name}</p>
                <p className="text-[13px] mt-1 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{f.why}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Skip features */}
      <Section title="DON'T BUILD THESE IN V1">
        <div>
          {report.skipFeatures.map((f, i) => (
            <StrikeThroughFeature key={i} name={f.name} why={f.why} index={i} />
          ))}
        </div>
      </Section>

      {/* Complexity */}
      <Section title="TECHNICAL COMPLEXITY">
        <div className="space-y-4">
          <ComplexityBadge level={report.complexityLevel} />
          <p className="text-[14px] text-[#525252] leading-relaxed">{report.complexityExplanation}</p>
          <div className="rounded-[4px] border border-[#e5e5e5] bg-[#fafafa] px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.1em] text-[#a3a3a3] mb-1" style={{ fontFamily: 'var(--font-geist-mono)' }}>
              SUGGESTED APPROACH
            </p>
            <p className="text-[13px] text-[#525252] leading-relaxed">{report.techApproach}</p>
          </div>
        </div>
      </Section>

      {/* Common mistakes */}
      <Section title="COMMON MISTAKES TO AVOID">
        <div className="space-y-3">
          {report.commonMistakes.map((m, i) => (
            <CheckItem key={i} text={m} variant="error" />
          ))}
        </div>
      </Section>

      {/* AI tools — icon grid */}
      <Section title="AI TOOLS TO BUILD FASTER">
        <AIToolGrid tools={report.aiTools} />
        {report.blogLinks?.[0] && (
          <BlogLink label={report.blogLinks[0].label} url={report.blogLinks[0].url} context={report.blogLinks[0].context} />
        )}
      </Section>

      {/* Marketing plan */}
      <Section title="HOW TO GET YOUR FIRST USERS">
        <div className="rounded-[4px] border border-[#e5e5e5] bg-white p-5 space-y-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          {/* Waitlist advice */}
          <div className="space-y-1.5">
            <p className="text-[10px] uppercase tracking-[0.1em] text-[#a3a3a3]" style={{ fontFamily: 'var(--font-geist-mono)' }}>WAITLIST STRATEGY</p>
            <p className="text-[13px] text-[#525252] leading-relaxed">{report.marketingPlan.waitlistAdvice}</p>
          </div>
          <hr className="border-[#f5f5f5]" />

          {/* Communities */}
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.1em] text-[#a3a3a3]" style={{ fontFamily: 'var(--font-geist-mono)' }}>5 COMMUNITIES TO JOIN</p>
            {report.marketingPlan.communities.map((c, i) => (
              <CheckItem key={i} text={c} variant="green" />
            ))}
          </div>
          <hr className="border-[#f5f5f5]" />

          {/* Where to engage — iMessage bubbles */}
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.1em] text-[#a3a3a3]" style={{ fontFamily: 'var(--font-geist-mono)' }}>WHERE TO ENGAGE</p>
            <EngageFeed threads={report.marketingPlan.activeThreads} />
          </div>
        </div>
      </Section>

      {/* Budget gate + Route C */}
      <div className="space-y-4 pt-2">
        {!budget ? (
          <BudgetGate onAnswered={onNext} />
        ) : (
          <NextButton onClick={onNext} label="See your build roadmap →" />
        )}
      </div>

    </div>
  )
}