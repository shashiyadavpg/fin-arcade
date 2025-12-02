'use client';

import { useState, useRef } from 'react';
import { motion, useDragControls, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { useSound } from '@/context/SoundContext';
import { Confetti } from '@/components/ui/Confetti';

// Game Data
const RATIOS = [
  { id: 'current', name: 'Current Ratio', num: 'Current Assets', den: 'Current Liabilities', target: '> 1.5' },
  { id: 'roe', name: 'Return on Equity', num: 'Net Income', den: 'Total Equity', target: '> 15%' },
  { id: 'debt-equity', name: 'Debt-to-Equity', num: 'Total Debt', den: 'Total Equity', target: '< 1.0' },
  { id: 'margin', name: 'Net Profit Margin', num: 'Net Income', den: 'Revenue', target: '> 10%' },
];

const BLOCKS = [
  { id: 'ca', label: 'Current Assets', type: 'asset' },
  { id: 'cl', label: 'Current Liabilities', type: 'liability' },
  { id: 'ni', label: 'Net Income', type: 'income' },
  { id: 'eq', label: 'Total Equity', type: 'equity' },
  { id: 'rev', label: 'Revenue', type: 'income' },
  { id: 'debt', label: 'Total Debt', type: 'liability' },
];

export function RatioBuilder() {
  const [activeRatioIndex, setActiveRatioIndex] = useState(0);
  const [numerator, setNumerator] = useState<string | null>(null);
  const [denominator, setDenominator] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shake, setShake] = useState(0);
  const { playSound } = useSound();

  const currentRatio = RATIOS[activeRatioIndex];

  const handleDrop = (zone: 'numerator' | 'denominator', label: string) => {
    playSound('click');
    if (zone === 'numerator') setNumerator(label);
    else setDenominator(label);
  };

  const checkAnswer = () => {
    if (numerator === currentRatio.num && denominator === currentRatio.den) {
      setIsCorrect(true);
      playSound('success');
    } else {
      setShake(prev => prev + 1);
      playSound('error'); // Assuming 'error' sound exists, otherwise fallback to click
    }
  };

  const nextLevel = () => {
    if (activeRatioIndex < RATIOS.length - 1) {
      setActiveRatioIndex(prev => prev + 1);
      setNumerator(null);
      setDenominator(null);
      setIsCorrect(false);
    }
  };

  return (
    <Card className="relative min-h-[600px] overflow-hidden border-[var(--electric-blue)]/20 bg-slate-900/80 p-6 backdrop-blur-xl">
      {isCorrect && <Confetti trigger={true} />}

      <div className="mb-8 text-center">
        <h3 className="text-2xl font-bold text-white">Ratio Builder Workshop 🔧</h3>
        <p className="text-slate-400">Build the formula for: <span className="font-bold text-[var(--electric-blue)]">{currentRatio.name}</span></p>
        <div className="mt-2 flex justify-center gap-1">
          {RATIOS.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-8 rounded-full transition-colors ${i === activeRatioIndex ? 'bg-[var(--electric-blue)]' :
                i < activeRatioIndex ? 'bg-emerald-500' : 'bg-slate-800'
                }`}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Draggable Blocks Area */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">Available Blocks</h4>
          <div className="flex flex-wrap gap-4">
            {BLOCKS.map((block) => (
              <DraggableBlock
                key={block.id}
                label={block.label}
                type={block.type}
                onClick={() => {
                  // Auto-fill logic: Fill numerator first, then denominator
                  if (!numerator) handleDrop('numerator', block.label);
                  else if (!denominator) handleDrop('denominator', block.label);
                  else {
                    // If both full, maybe replace the last one or just shake?
                    // Let's replace denominator for quick iteration
                    handleDrop('denominator', block.label);
                  }
                }}
              />
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-8">
            💡 Drag or Click blocks to fill the formula slots.
          </p>
        </div>

        {/* Drop Zones (Formula Builder) */}
        <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-950/50 p-8 border border-slate-800">
          <motion.div
            animate={{ x: shake % 2 === 0 ? [-5, 5, -5, 5, 0] : [5, -5, 5, -5, 0] }}
            transition={{ duration: 0.4 }}
            key={shake} // Re-trigger animation on shake change
            className="flex flex-col items-center gap-2"
          >
            {/* Numerator Zone */}
            <DropZone
              label={numerator || "Numerator"}
              isFilled={!!numerator}
              onDrop={(l) => handleDrop('numerator', l)}
            />

            {/* Divider Line */}
            <div className="h-1 w-48 rounded-full bg-white/20"></div>

            {/* Denominator Zone */}
            <DropZone
              label={denominator || "Denominator"}
              isFilled={!!denominator}
              onDrop={(l) => handleDrop('denominator', l)}
            />
          </motion.div>

          <div className="mt-8 h-12">
            {!isCorrect ? (
              <button
                onClick={checkAnswer}
                disabled={!numerator || !denominator}
                className="rounded-full bg-[var(--electric-blue)] px-8 py-2 font-bold text-slate-950 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              >
                Check Formula
              </button>
            ) : (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={nextLevel}
                className="rounded-full bg-emerald-500 px-8 py-2 font-bold text-white shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:bg-emerald-400"
              >
                {activeRatioIndex < RATIOS.length - 1 ? 'Next Ratio →' : 'Mastery Achieved! 🏆'}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

// Helper Components

function DraggableBlock({ label, type, onClick }: { label: string, type: string, onClick?: () => void }) {
  const controls = useDragControls();

  const getColor = (t: string) => {
    switch (t) {
      case 'asset': return 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300';
      case 'liability': return 'bg-rose-500/20 border-rose-500/50 text-rose-300';
      case 'equity': return 'bg-purple-500/20 border-purple-500/50 text-purple-300';
      default: return 'bg-blue-500/20 border-blue-500/50 text-blue-300';
    }
  };

  return (
    <motion.div
      drag
      dragControls={controls}
      dragSnapToOrigin
      whileDrag={{ scale: 1.1, zIndex: 50, cursor: 'grabbing' }}
      whileHover={{ scale: 1.05, cursor: 'grab' }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`cursor-grab rounded-lg border px-4 py-2 font-mono text-sm font-bold backdrop-blur-sm ${getColor(type)}`}
    >
      {label}
    </motion.div>
  );
}

function DropZone({ label, isFilled, onDrop }: { label: string, isFilled: boolean, onDrop: (l: string) => void }) {
  return (
    <motion.div
      className={`flex h-16 w-48 items-center justify-center rounded-xl border-2 border-dashed transition-colors ${isFilled
        ? 'border-[var(--electric-blue)] bg-[var(--electric-blue)]/10 text-white'
        : 'border-slate-700 bg-slate-900/30 text-slate-500'
        }`}
    >
      <span className="font-mono font-bold">{label}</span>
      {isFilled && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDrop(''); // Clear on click if filled
          }}
          className="ml-2 text-xs text-slate-500 hover:text-white"
        >
          ✕
        </button>
      )}
    </motion.div>
  );
}


