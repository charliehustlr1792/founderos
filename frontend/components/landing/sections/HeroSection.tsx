'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CardStack } from '@/components/ui/card-stack'
import { roadmapSteps } from '../landing-data'

type HeroSectionProps = {
  headingFontClass: string
  serifFontClass: string
  bodyFontClass: string
  monoFontClass: string
  uiFontClass: string
}

export function HeroSection({
  headingFontClass,
  serifFontClass,
  bodyFontClass,
  monoFontClass,
  uiFontClass,
}: HeroSectionProps) {
  const stackCards = [
    {
      id: 1,
      name: 'Demand Signal',
      designation: 'Validation',
      content: (
        <div>
          <p className={`text-[10px] uppercase tracking-[0.12em] text-[#D4D4D8] ${monoFontClass}`}>Demand signal</p>
          <div className="mt-2 rounded-lg border border-white/15 bg-white/8 p-3">
            <p className={`text-[22px] leading-none text-white ${headingFontClass}`}>9.4/10</p>
            <p className={`mt-1 text-[11px] text-[#F3F4F6] ${uiFontClass}`}>High validation confidence</p>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      name: 'MVP Scope',
      designation: 'Build Focus',
      content: (
        <div>
          <p className={`text-[10px] uppercase tracking-[0.12em] text-[#D4D4D8] ${monoFontClass}`}>What to build first</p>
          <ul className={`mt-2 space-y-1.5 text-[12px] leading-5 text-[#F3F4F6] ${bodyFontClass}`}>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#059669]" />Portfolio profile</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#059669]" />Local discovery search</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#9CA3AF]" />Booking flow v2</li>
          </ul>
        </div>
      ),
    },
    {
      id: 3,
      name: 'Execution',
      designation: 'Next 30 Days',
      content: (
        <div>
          <p className={`text-[10px] uppercase tracking-[0.12em] text-[#D4D4D8] ${monoFontClass}`}>Execution path</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#111827] text-[10px] text-white">1</span>
            <p className={`text-[11px] text-[#F3F4F6] ${uiFontClass}`}>Validate interviews</p>
          </div>
          <div className="mt-1.5 flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#E5E7EB] text-[10px] text-[#374151]">2</span>
            <p className={`text-[11px] text-[#F3F4F6] ${uiFontClass}`}>Scope and prototype</p>
          </div>
          <p className={`mt-3 text-[12px] italic leading-5 text-[#E5E7EB] ${serifFontClass}`}>
            "Clarity beats complexity every time."
          </p>
        </div>
      ),
    },
  ]

  return (
    <section id="blueprint" className="mx-auto w-full max-w-300 px-5 pb-6 pt-5 sm:px-8 lg:pb-9 lg:pt-6">
      <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,520px)_minmax(0,390px)] lg:justify-between">
        <div>
          <h1 className="max-w-130 text-[32px] font-bold leading-[1.07] tracking-[-0.02em] text-[#020617] sm:text-[38px] lg:text-[42px]">
            <span className={headingFontClass}>From idea to launched product - </span>
            <span className={`font-normal italic text-[#494740] ${serifFontClass}`}>without the guesswork.</span>
          </h1>

          <p className={`mt-3.5 max-w-99.5 text-[15px] leading-[1.55] text-[#494740] ${bodyFontClass}`}>
            Our structured operating system bridges the gap between vision and execution for ambitious founders.
          </p>

          <div className="mt-6">
            <p className={`text-[10px] uppercase tracking-[0.18em] text-[#7A776F] ${monoFontClass}`}>The Roadmap</p>

            <ol className="mt-3.5 space-y-0.5">
              {roadmapSteps.map((step, index) => {
                const isActive = index === 0
                const isLast = index === roadmapSteps.length - 1

                return (
                  <li key={step.title} className="relative flex gap-4 pb-4.5 last:pb-0">
                    {!isLast ? <span className="absolute left-2.75 top-8 h-[calc(100%-10px)] w-px bg-[#CBC6BD]/70" /> : null}

                    <span
                      className={`z-10 mt-px inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-black text-white' : 'bg-[#E7E2D7] text-black'
                      } ${monoFontClass}`}
                    >
                      {index + 1}
                    </span>

                    <span className="block">
                      <span className={`block text-[15px] font-bold leading-6 ${headingFontClass}`}>{step.title}</span>
                      <span className={`mt-0.5 block text-[12px] leading-5 text-[#494740]/85 ${bodyFontClass}`}>
                        {step.description}
                      </span>
                    </span>
                  </li>
                )
              })}
            </ol>
          </div>

          <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="/quiz"
              className={`inline-flex items-center justify-center gap-2 rounded-md bg-[#020617] px-6.5 py-3 text-[14px] font-bold text-white transition hover:translate-x-px hover:bg-[#111827] ${headingFontClass}`}
            >
              Start Your Blueprint
              <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[
                  'https://i.pravatar.cc/96?img=11',
                  'https://i.pravatar.cc/96?img=47',
                  'https://i.pravatar.cc/96?img=32',
                ].map((avatarSrc, index) => (
                  <img
                    key={avatarSrc}
                    src={avatarSrc}
                    alt={`Founder ${index + 1}`}
                    className="h-8 w-8 rounded-lg border-2 border-[#FEF9ED] object-cover"
                    loading="lazy"
                  />
                ))}
              </div>

              <p className={`text-[11px] text-[#6b7280] ${uiFontClass}`}>Joined by 2,400+ Founders</p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto mt-2 w-full max-w-95 lg:mt-0 lg:self-center lg:justify-self-end">
          {/* <div className="pointer-events-none absolute -left-2 top-2 h-68 w-full rounded-2xl bg-[#EDE5D7]" /> */}
          <div className="relative">
            <CardStack items={stackCards} offset={13} scaleFactor={0.07} />
          </div>
        </div>
      </div>
    </section>
  )
}
