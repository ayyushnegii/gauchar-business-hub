'use client';
import { BusinessCategory, CATEGORY_LABELS } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';

const CAT_COLORS: Record<BusinessCategory, { bg: string; text: string; border: string; accent: string }> = {
  hotels:      { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE', accent: '#3B82F6' },
  restaurants: { bg: '#FFF7ED', text: '#C2410C', border: '#FED7AA', accent: '#F97316' },
  repair:      { bg: '#F5F3FF', text: '#7C3AED', border: '#DDD6FE', accent: '#8B5CF6' },
  grocery:     { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0', accent: '#22C55E' },
  medical:     { bg: '#FFF1F2', text: '#BE123C', border: '#FECDD3', accent: '#F43F5E' },
  transport:   { bg: '#FFFBEB', text: '#B45309', border: '#FDE68A', accent: '#EAB308' },
};

interface CategoryCardProps {
  category: BusinessCategory;
  count?: number;
  onClick?: () => void;
}

export default function CategoryCard({ category, count, onClick }: CategoryCardProps) {
  const { language } = useLanguage();
  const hi = language === 'hi';
  const info = CATEGORY_LABELS[category];
  const c = CAT_COLORS[category];

  return (
    <button onClick={onClick}
      className="group w-full flex flex-col items-center gap-2.5 p-5 rounded-2xl border-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
      style={{ background: c.bg, borderColor: c.border }}>
      {/* Icon ring */}
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-200 group-hover:scale-110"
        style={{ background: `${c.accent}18`, border: `1.5px solid ${c.border}` }}>
        {info.emoji}
      </div>
      <span className="text-xs font-semibold text-center leading-tight"
        style={{ color: c.text, fontFamily: hi ? 'var(--font-hindi)' : undefined }}>
        {hi ? info.hi : info.en}
      </span>
      {count !== undefined && (
        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ background: `${c.accent}20`, color: c.text }}>
          {count} {hi ? 'स्थान' : 'places'}
        </span>
      )}
    </button>
  );
}
