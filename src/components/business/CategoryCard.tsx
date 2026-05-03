'use client';

import { BusinessCategory, CATEGORY_LABELS } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';

interface CategoryCardProps {
  category: BusinessCategory;
  count?: number;
  onClick?: () => void;
}

export default function CategoryCard({ category, count, onClick }: CategoryCardProps) {
  const { language } = useLanguage();
  const info = CATEGORY_LABELS[category];
  const label = language === 'hi' ? info.hi : info.en;
  
  const bgColors = {
    hotels: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
    restaurants: 'bg-orange-50 hover:bg-orange-100 border-orange-200',
    repair: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
    grocery: 'bg-green-50 hover:bg-green-100 border-green-200',
    medical: 'bg-red-50 hover:bg-red-100 border-red-200',
    transport: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200',
  };

  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center p-6 rounded-xl border-2
        transition-all hover:shadow-md ${bgColors[category]}
        ${onClick ? 'cursor-pointer' : 'cursor-default'}
      `}
    >
      <span className="text-4xl mb-3">{info.emoji}</span>
      <span className="font-medium text-gray-800 text-center">{label}</span>
      {count !== undefined && (
        <span className="text-sm text-gray-500 mt-1">{count} places</span>
      )}
    </button>
  );
}
