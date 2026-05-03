'use client';
import { Sentiment, SENTIMENT_LABELS } from '../../types';
import { calculateSentimentPercentages } from '../../lib/constants';
import { useLanguage } from '../../hooks/useLanguage';

const COLORS: Record<Sentiment, { bar: string; bg: string; text: string; border: string }> = {
  perfection: { bar: '#F59E0B', bg: '#FEF9C3', text: '#92400E', border: '#FDE68A' },
  go_for_it:  { bar: '#22C55E', bg: '#DCFCE7', text: '#166534', border: '#BBF7D0' },
  timepass:   { bar: '#94A3B8', bg: '#F1F5F9', text: '#475569', border: '#E2E8F0' },
  skip:       { bar: '#EF4444', bg: '#FEE2E2', text: '#991B1B', border: '#FECACA' },
};

export default function SentimentBar({ sentimentCounts, dominantSentiment }: {
  sentimentCounts: Record<Sentiment, number>;
  dominantSentiment?: Sentiment | null;
}) {
  const { language } = useLanguage();
  const hi = language === 'hi';
  const pct = calculateSentimentPercentages(sentimentCounts);
  const total = Object.values(sentimentCounts).reduce((a, b) => a + b, 0);
  if (total === 0) return null;
  const order: Sentiment[] = ['perfection', 'go_for_it', 'timepass', 'skip'];

  return (
    <div className="w-full space-y-3">
      {/* Dominant pill */}
      {dominantSentiment && SENTIMENT_LABELS[dominantSentiment] && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">{hi ? 'मुख्य भावना:' : 'Top sentiment:'}</span>
          <span className="tag text-xs" style={{ background: COLORS[dominantSentiment].bg, color: COLORS[dominantSentiment].text, border: `1px solid ${COLORS[dominantSentiment].border}` }}>
            {SENTIMENT_LABELS[dominantSentiment].emoji} {hi ? SENTIMENT_LABELS[dominantSentiment].hi : SENTIMENT_LABELS[dominantSentiment].en}
          </span>
        </div>
      )}

      {/* Stacked bar */}
      <div className="flex h-3 w-full rounded-full overflow-hidden gap-px" style={{ background: '#F1F5F9' }}>
        {order.map(s => pct[s] > 0 ? (
          <div key={s} className="transition-all duration-500"
            style={{ width: `${pct[s]}%`, background: COLORS[s].bar }}
            title={`${s}: ${pct[s]}%`} />
        ) : null)}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {order.map(s => pct[s] > 0 ? (
          <div key={s} className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: COLORS[s].bar }} />
            <span>{SENTIMENT_LABELS[s].emoji} {pct[s]}%</span>
          </div>
        ) : null)}
      </div>

      <p className="text-[11px] text-slate-400">{total} {hi ? 'कुल वोट' : 'total votes'}</p>
    </div>
  );
}
