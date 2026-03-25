type LandingFooterProps = {
  headingFontClass: string
  bodyFontClass: string
}

export function LandingFooter({ headingFontClass, bodyFontClass }: LandingFooterProps) {
  return (
    <footer className="border-t border-[#E7E2D7] bg-[#F8F3E8] px-5 py-8 sm:px-8 lg:py-10">
      <div className="mx-auto flex w-full max-w-300 flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <p className={`text-[24px] font-bold ${headingFontClass}`}>Founder OS</p>

        <div className={`flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-widest text-[#919191] ${bodyFontClass}`}>
          <a href="#" className="transition hover:text-[#1D1C15]">
            Privacy Policy
          </a>
          <a href="#" className="transition hover:text-[#1D1C15]">
            Terms of Service
          </a>
          <a href="#" className="transition hover:text-[#1D1C15]">
            Contact
          </a>
          <a href="#" className="transition hover:text-[#1D1C15]">
            LinkedIn
          </a>
        </div>

        <p className={`text-[11px] uppercase tracking-widest text-[#919191] ${bodyFontClass}`}>
          © 2026 Founder OS. The Editorial Architect.
        </p>
      </div>
    </footer>
  )
}
