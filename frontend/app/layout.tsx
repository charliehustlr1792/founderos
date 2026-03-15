import type { Metadata } from 'next'
import { Inter, Geist } from 'next/font/google'
import './globals.css'
import { PostHogProvider } from '@/components/providers/PostHogProvider'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

export const metadata: Metadata = {
  title: 'Founder OS — Build the right thing',
  description: 'A free tool that tells you what to build first, what to skip, and whether your idea has legs — in 5 minutes.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="antialiased bg-background text-foreground">
        <PostHogProvider>
          <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
            <div className="max-w-xl mx-auto px-5 h-14 flex items-center justify-between">
              <a href="https://www.creworklabs.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
                <span className="text-sm font-semibold">Crework Labs</span>
                <span className="text-muted-foreground text-sm">·</span>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Founder OS</span>
              </a>
              <span className="text-xs text-muted-foreground px-2.5 py-1 rounded-md border border-border">
                Free tool
              </span>
            </div>
          </nav>
          {children}
        </PostHogProvider>
      </body>
    </html>
  )
}