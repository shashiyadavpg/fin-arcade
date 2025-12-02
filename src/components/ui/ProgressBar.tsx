'use client';

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  label?: string;
  showValue?: boolean;
  color?: 'emerald' | 'cyan' | 'sky' | 'fuchsia';
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  color = 'emerald',
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  const colorClasses = {
    emerald: 'bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400',
    cyan: 'bg-gradient-to-r from-cyan-400 to-sky-400',
    sky: 'bg-gradient-to-r from-sky-400 to-blue-400',
    fuchsia: 'bg-gradient-to-r from-fuchsia-400 to-pink-400',
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-xs text-slate-300">
          {label && <span>{label}</span>}
          {showValue && <span>{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

