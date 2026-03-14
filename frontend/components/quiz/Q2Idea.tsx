'use client'
import clsx from 'clsx'

const MIN = 20
const MAX = 400

export function Q2Idea({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const remaining = MAX - value.length
  const isValid = value.trim().length >= MIN
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <p className="text-xs text-[#999999] uppercase tracking-widest font-medium">02 / 04</p>
        <h2 className="text-base font-medium text-[#0a0a0a] leading-snug">Describe your idea in 1–2 sentences.</h2>
        <p className="text-sm text-[#999999]">Don&apos;t overthink it. The rougher, the better.</p>
      </div>
      <div className="relative">
        <textarea
          value={value} onChange={(e) => onChange(e.target.value)}
          maxLength={MAX} rows={4}
          placeholder="e.g. A tool that helps freelance designers send professional invoices and track payments without needing an accountant."
          className={clsx(
            'w-full bg-white rounded-lg px-4 py-3 text-sm text-[#0a0a0a] placeholder:text-[#cccccc] resize-none leading-relaxed transition-colors duration-150',
            value.length > 0 && !isValid ? 'border border-[#cccccc]' : 'border border-[#e5e5e5] focus:border-[#cccccc]'
          )}
        />
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-[#555555]">{value.length > 0 && !isValid ? `${MIN - value.trim().length} more characters needed` : ''}</p>
          <p className="text-xs text-[#999999]">{remaining < 100 ? `${remaining} left` : ''}</p>
        </div>
      </div>
    </div>
  )
}