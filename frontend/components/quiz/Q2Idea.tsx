'use client'
import { useState, useEffect, useRef } from 'react'
import { classifyIdea } from '@/lib/classifierClient'

const MIN = 20
const MAX = 400

export function Q2Idea({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const [detected, setDetected] = useState<string | null>(null)
  const [detecting, setDetecting] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (value.trim().length < 15) {
      setDetected(null)
      setDetecting(false)
      return
    }
    setDetecting(true)
    setDetected(null)
    debounceRef.current = setTimeout(() => {
      const result = classifyIdea(value)
      setDetected(result.label)
      setDetecting(false)
    }, 800)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [value])

  return (
    <div className="space-y-3">
      <p className="text-[10px] uppercase tracking-[0.12em] text-[#a3a3a3]"
         style={{ fontFamily: 'var(--font-geist-mono)' }}>
        02 / IDEA
      </p>
      <div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={MAX}
          rows={5}
          placeholder="Describe your idea in 1–2 sentences. Don't overthink it."
          className="w-full rounded-[4px] border border-[#e5e5e5] bg-white px-4 py-4 text-[17px] text-[#0a0a0a] leading-relaxed resize-none outline-none transition-colors duration-150 placeholder:text-[#a3a3a3] focus:border-[#171717]"
          style={{ fontFamily: 'var(--font-geist-sans)', minHeight: '120px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
        />
        <div className="flex items-center justify-between mt-2 min-h-[22px]">
          <div>
            {detecting && (
              <span className="inline-flex items-center gap-1.5 text-[10px] text-[#a3a3a3] border border-[#e5e5e5] rounded-[4px] px-2 py-1"
                    style={{ fontFamily: 'var(--font-geist-mono)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#a3a3a3] pulse-dot inline-block" />
                DETECTING...
              </span>
            )}
            {!detecting && detected && (
              <span className="text-[10px] text-[#525252] border border-[#e5e5e5] rounded-[4px] px-2 py-1"
                    style={{ fontFamily: 'var(--font-geist-mono)' }}>
                ▸ DETECTED: {detected}
              </span>
            )}
            {!detecting && !detected && value.length > 0 && value.trim().length < MIN && (
              <span className="text-[10px] text-[#a3a3a3]" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                {MIN - value.trim().length} more chars needed
              </span>
            )}
          </div>
          {value.length > MAX - 100 && (
            <span className="text-[10px] text-[#a3a3a3]" style={{ fontFamily: 'var(--font-geist-mono)' }}>
              {MAX - value.length} left
            </span>
          )}
        </div>
      </div>
    </div>
  )
}