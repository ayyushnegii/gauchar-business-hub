'use client';
import { Sentiment, SENTIMENT_LABELS } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';

const STYLES: Record<Sentiment, { idle: string; active: string; ring: string }> = {
  perfection: {
    idle:   'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100 hover:border-amber-400',
    active: 'bg-amber-500 border-amber-600 text-white shadow-md shadow-amber-200',
    ring:   '#F59E0B',
  },
  go_for_it: {
    idle:   'bg-green-50 border-green-200 text-green-800 hover:bg-green-100 hover:border-green-400',
    active: 'bg-green-500 border-green-600 text-white shadow-md shadow-green-200',
    ring:   '#22C55E',
  },
  timepass: {
    idle:   'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-400',
    active: 'bg-slate-500 border-slate-600 text-white shadow-md shadow-slate-200',
    ring:   '#94A3B8',
  },
  skip: {
    idle:   'bg-red-50 border-red-200 text-red-800 hover:bg-red-100 hover:border-red-400',
    active: 'bg-red-500 border-red-600 text-white shadow-md shadow-red-200',
    ring:   '#EF4444',
  },
};

export default function SentimentButton({ sentiment, count, isSelected = false, onClick, showCount = false }: {
  sentiment: Sentiment; count?: number; isSelected?: boolean; onClick?: () => void; showCount?: boolean;
}) {
  const { language } = useLanguage();
  const hi = language === 'hi';
  const s = STYLES[sentiment];
  const lbl = SENTIMENT_LABELS[sentiment];

  return (
    <button onClick={onClick}
      className={`flex flex-col items-center gap-1.5 px-4 py-3.5 rounded-xl border-2 transition-all duration-150 font-medium w-full ${isSelected ? s.active : s.idle} ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
      style={isSelected ? { outline: `2px solid ${s.ring}`, outlineOffset: '2px' } : {}}>
      <span className="text-2xl leading-none select-none">{lbl.emoji}</span>
      <span className="text-xs font-semibold leading-tight text-center"
        style={{ fontFamily: hi ? 'var(--font-hindi)' : undefined }}>
        {hi ? lbl.hi : lbl.en}
      </span>
      {showCount && count !== undefined && (
        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,0,0,0.12)' }}>{count}</span>
      )}
    </button>
  );
}
