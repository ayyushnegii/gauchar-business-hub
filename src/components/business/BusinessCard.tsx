'use client';
import { BusinessCategory, CATEGORY_LABELS, Sentiment, SENTIMENT_LABELS } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';

const CAT_COLORS: Record<BusinessCategory, { bg: string; text: string; border: string }> = {
  hotels:      { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' },
  restaurants: { bg: '#FFF7ED', text: '#C2410C', border: '#FED7AA' },
  repair:      { bg: '#F5F3FF', text: '#7C3AED', border: '#DDD6FE' },
  grocery:     { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0' },
  medical:     { bg: '#FFF1F2', text: '#BE123C', border: '#FECDD3' },
  transport:   { bg: '#FFFBEB', text: '#B45309', border: '#FDE68A' },
};

const SENT_COLORS: Record<Sentiment, string> = {
  perfection: '#F59E0B', go_for_it: '#22C55E', timepass: '#94A3B8', skip: '#EF4444',
};

interface BusinessCardProps {
  id: string; name: string; category: BusinessCategory; address: string;
  googleRating?: number; sentimentCounts: Record<string, number>;
  dominantSentiment?: string | null; imageUrl?: string; onClick?: () => void;
}

export default function BusinessCard({ name, category, address, googleRating, sentimentCounts, dominantSentiment }: BusinessCardProps) {
  const { language } = useLanguage();
  const hi = language === 'hi';
  const cat = CATEGORY_LABELS[category];
  const cc = CAT_COLORS[category];
  const total = Object.values(sentimentCounts).reduce((a, b) => a + b, 0);
  const order: Sentiment[] = ['perfection', 'go_for_it', 'timepass', 'skip'];
  const topS = dominantSentiment as Sentiment | null;

  return (
    <div className="card group h-full flex flex-col">
      {/* Colour header strip */}
      <div className="h-2 w-full rounded-t-2xl" style={{ background: cc.text }} />

      <div className="p-5 flex flex-col flex-1">
        {/* Tags row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className="tag text-xs" style={{ background: cc.bg, color: cc.text, border: `1px solid ${cc.border}` }}>
            {cat.emoji} {hi ? cat.hi : cat.en}
          </span>
          {googleRating !== undefined && (
            <span className="tag text-xs font-bold flex-shrink-0" style={{ background: '#FFFBEB', color: '#B45309', border: '1px solid #FDE68A' }}>
              ⭐ {googleRating.toFixed(1)}
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="font-bold text-[15px] leading-snug mb-1.5 group-hover:text-[var(--brand-saffron)] transition-colors"
          style={{ color: 'var(--brand-slate)' }}>
          {name}
        </h3>

        {/* Address */}
        <p className="text-xs text-slate-500 flex items-start gap-1 mb-4 line-clamp-2">
          <svg className="w-3 h-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
          </svg>
          {address}
        </p>

        {/* Sentiment */}
        {total > 0 ? (
          <div className="mt-auto">
            {topS && SENTIMENT_LABELS[topS] && (
              <span className={`tag pill-${topS} text-xs mb-2`}>
                {SENTIMENT_LABELS[topS].emoji} {hi ? SENTIMENT_LABELS[topS].hi : SENTIMENT_LABELS[topS].en}
              </span>
            )}
            {/* Bar */}
            <div className="flex h-1.5 w-full rounded-full overflow-hidden gap-px mt-2">
              {order.map(s => {
                const pct = ((sentimentCounts[s] ?? 0) / total) * 100;
                return pct > 0 ? <div key={s} style={{ width: `${pct}%`, background: SENT_COLORS[s] }} /> : null;
              })}
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">{total} {hi ? 'वोट' : 'votes'}</p>
          </div>
        ) : (
          <div className="mt-auto">
            <p className="text-xs text-slate-400 italic">{hi ? 'अभी कोई वोट नहीं' : 'No votes yet'}</p>
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 mt-3 border-t border-[#EDE8DF] flex items-center justify-between">
          <span className="text-xs font-semibold" style={{ color: 'var(--brand-saffron)' }}>
            {hi ? 'विवरण देखें →' : 'View Details →'}
          </span>
        </div>
      </div>
    </div>
  );
}
