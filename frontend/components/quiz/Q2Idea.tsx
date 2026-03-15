'use client'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'

const MIN = 20
const MAX = 400

export function Q2Idea({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const remaining = MAX - value.length
  const isValid = value.trim().length >= MIN
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">02 / 04</p>
        <h2 className="text-base font-medium leading-snug">Describe your idea in 1–2 sentences.</h2>
        <p className="text-sm text-muted-foreground">Don&apos;t overthink it. The rougher, the better.</p>
      </div>
      <div>
        <Textarea
          value={value} onChange={(e) => onChange(e.target.value)}
          maxLength={MAX} rows={4}
          placeholder="e.g. A tool that helps freelance designers send professional invoices and track payments without needing an accountant."
          className="resize-none text-sm leading-relaxed"
        />
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-muted-foreground">{value.length > 0 && !isValid ? `${MIN - value.trim().length} more characters needed` : ''}</p>
          <p className="text-xs text-muted-foreground">{remaining < 100 ? `${remaining} left` : ''}</p>
        </div>
      </div>
    </div>
  )
}