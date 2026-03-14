import { QuizShell } from '@/components/quiz/QuizShell'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-xl mx-auto px-5 pt-12 pb-24">

        {/* Hero */}
        <div className="mb-12 space-y-3">
          <h1 className="text-[2rem] font-semibold text-text-primary leading-tight tracking-tight">
            Build the right thing.<br />
            <span className="text-text-muted">Not just anything.</span>
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
            Answer 4 questions. Get a personalised report covering
            your idea&apos;s demand, what to build first, and a 3-week
            roadmap — in 5 minutes.
          </p>
        </div>

        {/* Quiz */}
        <QuizShell />

      </div>
    </main>
  )
}