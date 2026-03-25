import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { QuizShell } from '@/components/quiz/QuizShell'

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f1] px-5 py-10 sm:px-8">
      <div className="mx-auto w-full max-w-[860px]">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md border border-[#d6d2ca] bg-white px-4 py-2 text-[13px] text-[#1c1b18] transition hover:bg-[#f2efe8]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to intro
          </Link>
          <p className="text-[12px] uppercase tracking-[0.08em] text-[#6f6b63]">Founder Readiness Quiz</p>
        </div>

        <section className="rounded-2xl border border-[#e4e0d8] bg-white p-5 shadow-[0_12px_36px_-24px_rgba(0,0,0,0.35)] sm:p-8">
          <header className="mb-8">
            <h1 className="text-[30px] font-semibold leading-tight text-[#1c1b18] sm:text-[36px]">
              Build your personalized blueprint
            </h1>
            <p className="mt-3 max-w-[62ch] text-[15px] leading-6 text-[#5a574f]">
              Answer 4 focused questions and we will map your best next move, recommended path, and report route.
            </p>
          </header>

          <QuizShell />
        </section>
      </div>
    </main>
  )
}
