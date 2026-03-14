import clsx from 'clsx'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export function Button({ variant = 'primary', size = 'md', loading = false, className, children, disabled, ...props }: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        'inline-flex items-center justify-center font-medium transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed',
        variant === 'primary' && 'bg-black text-white hover:bg-black/85',
        variant === 'secondary' && 'bg-transparent text-[#0a0a0a] border border-[#e5e5e5] hover:border-[#cccccc]',
        variant === 'ghost' && 'bg-transparent text-[#555555] hover:text-[#0a0a0a]',
        size === 'sm' && 'text-xs px-3 py-1.5 rounded-md',
        size === 'md' && 'text-sm px-5 py-2.5 rounded-md',
        size === 'lg' && 'text-sm px-6 py-3.5 rounded-md',
        className
      )}
      {...props}
    >
      {loading ? <span className="flex items-center gap-2"><Spinner size={14} />{children}</span> : children}
    </button>
  )
}

export function Spinner({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="animate-spin">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.2" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export function Divider({ className }: { className?: string }) {
  return <div className={clsx('h-px bg-[#e5e5e5]', className)} />
}

export function Card({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div onClick={onClick} className={clsx('bg-white border border-[#e5e5e5] rounded-lg', onClick && 'cursor-pointer hover:border-[#cccccc] transition-colors', className)}>
      {children}
    </div>
  )
}

export function ScoreRing({ score, size = 56 }: { score: number; size?: number }) {
  const r = (size - 6) / 2
  const circumference = 2 * Math.PI * r
  const fill = (score / 10) * circumference
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e5e5e5" strokeWidth="3" />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round" strokeDasharray={`${fill} ${circumference}`} transform={`rotate(-90 ${size/2} ${size/2})`} />
      <text x={size/2} y={size/2} textAnchor="middle" dominantBaseline="central" fill="#0a0a0a" fontSize={size * 0.24} fontWeight="500">{score}</text>
    </svg>
  )
}