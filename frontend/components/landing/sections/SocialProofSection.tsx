import { stats, testimonials } from '../landing-data'

type SocialProofSectionProps = {
  headingFontClass: string
  serifFontClass: string
  monoFontClass: string
  bodyFontClass: string
  uiFontClass: string
}

export function SocialProofSection({
  headingFontClass,
  serifFontClass,
  monoFontClass,
  bodyFontClass,
  uiFontClass,
}: SocialProofSectionProps) {
  return (
    <section id="success-stories" className="relative mt-8 overflow-hidden bg-black px-5 py-14 sm:px-8 lg:py-20">
      <div className="absolute right-[-8%] top-0 h-full w-[34%] -skew-x-12 bg-[#006C4B]/15" />

      <div className="relative mx-auto grid w-full max-w-300 gap-6 lg:grid-cols-[minmax(0,300px)_1fr]">
        <div>
          <h2 className={`text-[36px] font-bold leading-[0.96] text-white sm:text-[40px] ${headingFontClass}`}>Why Founder OS?</h2>

          <div className="mt-7 space-y-8">
            {stats.map((item) => (
              <div key={item.label}>
                <p className={`text-[36px] leading-none text-white ${monoFontClass}`}>{item.value}</p>
                <p className={`mt-1.5 text-[11px] uppercase tracking-widest text-[#9A9EA6] ${uiFontClass}`}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {testimonials.map((item, idx) => (
            <article key={item.name} className={`flex min-h-85 flex-col rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-[2px] ${idx === 1 ? 'md:mt-2' : ''}`}>
              <div className="flex gap-1 text-[#006C4B]">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span key={`${item.name}-${idx}`}>★</span>
                ))}
              </div>

              <p className={`mt-4 text-[21px] leading-[1.34] text-white ${serifFontClass}`}>"{item.quote}"</p>

              <div className="mt-auto flex items-center gap-3 pt-5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-11 w-11 rounded-xl border border-white/15 bg-[#ECE8DC] object-cover"
                  loading="lazy"
                />
                <div>
                  <p className={`text-[14px] font-bold text-white ${bodyFontClass}`}>{item.name}</p>
                  <p className={`text-[10px] uppercase tracking-widest text-[#9A9EA6] ${monoFontClass}`}>{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
