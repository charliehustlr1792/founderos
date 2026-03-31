import { StatusDot } from '@/components/report/ReportSections'
import type { ReportC } from '@/types'
import { GateOverlay } from './shared'

type PlanSectionProps = {
  reportC: ReportC | null
  gateUnlocked: boolean
  roadmap: Array<{ week: number; title: string; deliverables: string[] }>
  onBackScope: () => void
}

export function PlanSection({ reportC, gateUnlocked, roadmap, onBackScope }: PlanSectionProps) {
  return (
    <div className="relative">
      <div className={`${!gateUnlocked ? 'pointer-events-none select-none' : ''}`}>
        <div className="mb-8 space-y-3">
          {roadmap.map((week, idx) => (
            <div
              key={week.week}
              className={`overflow-hidden rounded-xl border ${idx === 0 ? 'border-[#1a1917]' : 'border-[#e8e6e0]'} bg-white`}
            >
              <div className={`${idx === 0 ? 'bg-[#1a1917] text-white' : 'bg-[#f7f6f3] text-[#1a1917]'} flex items-center justify-between px-5 py-3`}>
                <p className="text-[13px] font-semibold">W{week.week} · {week.title}</p>
                <span className="text-[11px] opacity-70">{idx === 0 ? 'Start here' : 'Execution'}</span>
              </div>
              <div className="space-y-2 px-5 py-4">
                {week.deliverables.map((task, taskIndex) => (
                  <div key={taskIndex} className="flex items-start gap-2.5 rounded-md bg-[#f7f6f3] px-3 py-2.5">
                    <StatusDot status="defined" />
                    <p className="text-[13px] leading-6 text-[#1a1917]">{task}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-8 rounded-xl border border-[#e8e6e0] bg-white p-5">
          <p className="mb-1 text-[10px] uppercase tracking-widest text-[#a8a59f]">North star metric</p>
          <h2 className="mb-1 text-[21px]" style={{ fontFamily: 'Georgia, serif' }}>Bookings completed per artist per month</h2>
          <p className="text-[13px] leading-6 text-[#5a574f]">If each artist gets 5+ bookings per month through your product, your MVP is working and worth scaling.</p>
        </div>

        <div className="mb-8 rounded-xl bg-[#1a1917] p-6 text-white">
          <p className="mb-3 text-[10px] uppercase tracking-widest text-white/40">Questions to ask any dev agency</p>
          <ul className="space-y-2">
            {(reportC?.questionsToAskAgency ?? []).slice(0, 5).map((q, idx) => (
              <li key={idx} className="text-[13px] leading-6 text-white/85">{idx + 1}. {q}</li>
            ))}
          </ul>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={onBackScope}
            className="rounded-lg border border-[#d1cec7] bg-transparent px-5 py-3 text-[14px] text-[#1a1917] transition hover:bg-[#f0ede8]"
          >
            Back to scope
          </button>
          <a
            href="https://cal.com/creworklabs"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-[#1a1917] px-5 py-3 text-center text-[14px] font-semibold text-white transition hover:bg-[#333]"
          >
            Book a free scope call
          </a>
        </div>
      </div>
      {!gateUnlocked && <GateOverlay />}
    </div>
  )
}
