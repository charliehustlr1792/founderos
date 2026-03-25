import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
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
          {children}
        </PostHogProvider>
      </body>
    </html>
  )
}