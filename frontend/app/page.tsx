import { QuizShell } from '@/components/quiz/QuizShell'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-[680px] mx-auto px-6 pt-16 pb-24">
        {/* Header */}
        <div className="mb-14 space-y-4">
          <p
            className="text-[10px] tracking-[0.15em] text-[#a3a3a3] uppercase"
            style={{ fontFamily: 'var(--font-geist-mono)' }}
          >
            CREWORK LABS — FOUNDER OS
          </p>
          <h1
            className="text-[42px] font-semibold leading-tight tracking-tight text-[#0a0a0a]"
            style={{ fontFamily: 'var(--font-geist-sans)' }}
          >
            What are you building?
          </h1>
          <p className="text-[15px] text-[#525252] leading-relaxed">
            Answer 4 questions. Get a personalised report in 5 minutes.
          </p>
        </div>
        <QuizShell />
      </div>
    </main>
  )
}