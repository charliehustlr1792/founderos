import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Image from 'next/image'
import './globals.css'
import { PostHogProvider } from '@/components/providers/PostHogProvider'
import { cn } from "@/lib/utils";

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'Founder OS — Build the right thing',
  description: 'A free tool that tells you what to build first, what to skip, and whether your idea has legs — in 5 minutes.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(geistSans.variable, geistMono.variable)}>
      <body className="antialiased bg-white text-[#0a0a0a]">
        <PostHogProvider>
          {/* Thin top accent line */}
          <div className="h-[2px] bg-[#0a0a0a] sticky top-0 z-50" />

          <nav className="sticky top-[2px] z-50 border-b border-[#e5e5e5] bg-white/95 backdrop-blur-md">
            <div className="max-w-[1400px] mx-auto px-8 h-[68px] flex items-center justify-between gap-4">

              {/* Left: logo + divider + product name */}
              <div className="flex items-center gap-4 min-w-0">
                <a
                  href="https://www.creworklabs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 shrink-0 opacity-90 hover:opacity-100 transition-opacity"
                  title="Crework Labs"
                >
                  <Image src="/logo.svg" alt="Crework Labs" width={28} height={28} priority />
                </a>

                {/* Vertical divider */}
                <span className="w-[1px] h-5 bg-[#e5e5e5] shrink-0" />

                {/* Product name */}
                <a href="/" className="flex items-baseline gap-2.5 group">
                  <span
                    className="text-[19px] font-semibold text-[#0a0a0a] tracking-tight leading-none"
                    style={{ fontFamily: 'var(--font-geist-sans)' }}
                  >
                    Founder OS
                  </span>
                  <span
                    className="hidden sm:inline-block text-[11px] tracking-[0.12em] text-[#a3a3a3] leading-none"
                    style={{ fontFamily: 'var(--font-geist-mono)' }}
                  >
                    by CREWORK LABS
                  </span>
                </a>
              </div>

              {/* Right: nav links + CTA */}
              <div className="flex items-center gap-1.5">
                <a
                  href="https://shikshita.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center h-9 px-4 text-[13px] text-[#525252] hover:text-[#0a0a0a] transition-colors rounded-[4px] hover:bg-[#f5f5f5]"
                  style={{ fontFamily: 'var(--font-geist-sans)' }}
                >
                  Blog
                </a>
                <a
                  href="https://www.creworklabs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center h-9 px-4 text-[13px] text-[#525252] hover:text-[#0a0a0a] transition-colors rounded-[4px] hover:bg-[#f5f5f5]"
                  style={{ fontFamily: 'var(--font-geist-sans)' }}
                >
                  About
                </a>
                <div className="w-[1px] h-5 bg-[#e5e5e5] mx-1 hidden sm:block" />
                <a
                  href="https://calendly.com/creworklabs/30mins"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center h-[40px] px-5 text-[13px] font-medium text-white bg-[#0a0a0a] rounded-[6px] hover:bg-[#262626] transition-colors whitespace-nowrap gap-1.5"
                  style={{ fontFamily: 'var(--font-geist-sans)' }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  Book a call
                </a>
              </div>

            </div>
          </nav>
          {children}
        </PostHogProvider>
      </body>
    </html>
  )
}