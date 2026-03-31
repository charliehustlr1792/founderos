import type { ReportB } from '@/types'
import { GateOverlay } from './shared'

type ScopeSectionProps = {
  reportB: ReportB | null
  gateUnlocked: boolean
  onContinuePlan: () => void
  onBackValidate: () => void
}

export function ScopeSection({ reportB, gateUnlocked, onContinuePlan, onBackValidate }: ScopeSectionProps) {
  const scopeCoreFeatures = reportB?.coreFeatures ?? []
  const scopeSkipFeatures = reportB?.skipFeatures ?? []

  return (
    <div className="relative">
      <div className={`${!gateUnlocked ? 'pointer-events-none select-none' : ''}`}>
        <div className="mb-8 rounded-xl bg-[#1c1b18] px-6 py-6 text-white">
          <p className="mb-2 text-[10px] uppercase tracking-widest text-white/40">Your core loop</p>
          <p className="text-[26px] leading-[1.35]" style={{ fontFamily: 'Georgia, serif' }}>
            User searches by location -&gt; views profile -&gt; sends booking request.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {['Search by location', 'View portfolio', 'Send booking request'].map((step, idx) => (
              <div key={step} className="inline-flex items-center gap-2">
                <span className="rounded-md border border-white/20 bg-white/10 px-3 py-2 text-[12px]">{step}</span>
                {idx < 2 && <span className="text-white/35">-&gt;</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-[#e8e6e0] bg-white p-5">
            <p className="mb-2 text-[10px] uppercase tracking-widest text-[#a8a59f]">Build now</p>
            <div className="space-y-2.5">
              {scopeCoreFeatures.map((feature, idx) => (
                <div key={idx} className="rounded-md bg-[#eff6ff] px-3 py-2">
                  <p className="text-[13px] font-medium text-[#1a1917]">{feature.name}</p>
                  <p className="text-[12px] leading-5 text-[#5a574f]">{feature.why}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[#e8e6e0] bg-white p-5">
            <p className="mb-2 text-[10px] uppercase tracking-widest text-[#a8a59f]">Skip in v1</p>
            <div className="space-y-2.5">
              {scopeSkipFeatures.map((feature, idx) => (
                <div key={idx} className="rounded-md bg-[#fef2f2] px-3 py-2">
                  <p className="text-[13px] font-medium text-[#1a1917] line-through decoration-[#c8c5be]">{feature.name}</p>
                  <p className="text-[12px] leading-5 text-[#5a574f]">{feature.why}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-xl border border-[#e8e6e0] bg-white p-5">
          <p className="mb-2 text-[10px] uppercase tracking-widest text-[#a8a59f]">Complexity + approach</p>
          <h2 className="mb-2 text-[18px] font-semibold">{reportB?.complexityLevel || 'Medium'} complexity</h2>
          <p className="mb-3 text-[13px] leading-6 text-[#5a574f]">{reportB?.complexityExplanation}</p>
          <div className="rounded-md bg-[#f7f6f3] px-3 py-2.5">
            <p className="text-[12px] leading-6 text-[#5a574f]">{reportB?.techApproach}</p>
          </div>
        </div>

        <div className="mb-8 rounded-xl bg-[#1a1917] p-6 text-white">
          <p className="text-[14px] leading-7">
            <strong>Your biggest risk is sequencing, not shipping speed.</strong> Lock the smallest usable loop and postpone any feature that does not increase core activation.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onContinuePlan}
            className="flex-1 rounded-lg bg-[#1a1917] px-5 py-3 text-[14px] font-semibold text-white transition hover:bg-[#333]"
          >
            Continue to plan -&gt;
          </button>
          <button
            type="button"
            onClick={onBackValidate}
            className="flex-1 rounded-lg border border-[#d1cec7] bg-transparent px-5 py-3 text-[14px] text-[#1a1917] transition hover:bg-[#f0ede8]"
          >
            Back to validate
          </button>
        </div>
      </div>
      {!gateUnlocked && <GateOverlay />}
    </div>
  )
}
