import { DM_Mono, Instrument_Serif, Inter, Manrope, Space_Grotesk } from 'next/font/google'
import { LandingHeader } from './sections/LandingHeader'
import { HeroSection } from './sections/HeroSection'
import { ProblemSection } from './sections/ProblemSection'
import { SocialProofSection } from './sections/SocialProofSection'
import { FinalCtaSection } from './sections/FinalCtaSection'
import { LandingFooter } from './sections/LandingFooter'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
})
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })
const dmMono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-dm-mono' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export function LandingPage() {
  const headingFontClass = 'font-[family-name:var(--font-space-grotesk)]'
  const serifFontClass = 'font-[family-name:var(--font-instrument-serif)]'
  const bodyFontClass = 'font-[family-name:var(--font-manrope)]'
  const monoFontClass = 'font-[family-name:var(--font-dm-mono)]'
  const uiFontClass = 'font-[family-name:var(--font-inter)]'

  return (
    <main
      className={`${spaceGrotesk.variable} ${instrumentSerif.variable} ${manrope.variable} ${dmMono.variable} ${inter.variable} bg-[#FEF9ED] text-[#1D1C15]`}
    >
      <LandingHeader fontClass={headingFontClass} />

      <HeroSection
        headingFontClass={headingFontClass}
        serifFontClass={serifFontClass}
        bodyFontClass={bodyFontClass}
        monoFontClass={monoFontClass}
        uiFontClass={uiFontClass}
      />

      <ProblemSection headingFontClass={headingFontClass} bodyFontClass={bodyFontClass} />

      <SocialProofSection
        headingFontClass={headingFontClass}
        serifFontClass={serifFontClass}
        monoFontClass={monoFontClass}
        bodyFontClass={bodyFontClass}
        uiFontClass={uiFontClass}
      />

      <FinalCtaSection
        headingFontClass={headingFontClass}
        serifFontClass={serifFontClass}
        bodyFontClass={bodyFontClass}
      />

      <LandingFooter headingFontClass={headingFontClass} bodyFontClass={bodyFontClass} />
    </main>
  )
}
