'use client';

interface BadgeProps {
  name: string;
  icon?: string;
  color?: 'emerald' | 'cyan' | 'sky' | 'fuchsia';
  earned?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Badge({ name, icon, color = 'emerald', earned = false, size = 'md' }: BadgeProps) {
  const sizeClasses = {
    sm: 'w-12 h-12 text-xs',
    md: 'w-16 h-16 text-sm',
    lg: 'w-24 h-24 text-base',
  };

  const colorClasses = {
    emerald: earned ? 'bg-emerald-500/20 border-emerald-400' : 'bg-slate-800 border-slate-700',
    cyan: earned ? 'bg-cyan-500/20 border-cyan-400' : 'bg-slate-800 border-slate-700',
    sky: earned ? 'bg-sky-500/20 border-sky-400' : 'bg-slate-800 border-slate-700',
    fuchsia: earned ? 'bg-fuchsia-500/20 border-fuchsia-400' : 'bg-slate-800 border-slate-700',
  };

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border-2 p-3 transition-all ${earned ? 'opacity-100 scale-100' : 'opacity-50 scale-95'
        } ${sizeClasses[size]} ${colorClasses[color]}`}
      title={name}
    >
      {icon && <span className="text-2xl mb-1">{icon}</span>}
      <span className={`text-center font-medium ${earned ? 'text-slate-50' : 'text-slate-400'}`}>
        {name}
      </span>
    </div>
  );
}

