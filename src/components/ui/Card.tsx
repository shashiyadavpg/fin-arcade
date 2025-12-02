import { motion } from 'framer-motion';
import { useSound } from '@/context/SoundContext';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = false, glow = false, onClick }: CardProps) {
  const { playSound } = useSound();

  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      whileTap={hover ? { scale: 0.98 } : {}}
      onHoverStart={() => hover && playSound('hover')}
      onClick={onClick}
      className={`rounded-3xl border border-white/5 bg-slate-900/60 p-6 backdrop-blur-xl transition-colors ${hover ? 'cursor-pointer hover:border-[var(--electric-blue)] hover:bg-slate-900/80' : ''
        } ${glow ? 'shadow-[0_0_30px_-10px_rgba(0,194,255,0.3)]' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}

