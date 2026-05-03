'use client';

import { Sentiment, SENTIMENT_LABELS } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';

interface SentimentButtonProps {
  sentiment: Sentiment;
  count?: number;
  isSelected?: boolean;
  onClick?: () => void;
  showCount?: boolean;
}

export default function SentimentButton({
  sentiment,
  count,
  isSelected = false,
  onClick,
  showCount = false,
}: SentimentButtonProps) {
  const { language } = useLanguage();
  const labels = SENTIMENT_LABELS[sentiment];
  const label = language === 'hi' ? labels.hi : labels.en;
  const emoji = labels.emoji;

  const colorClasses = {
    perfection: isSelected 
      ? 'bg-yellow-500 border-yellow-600 text-white' 
      : 'bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100',
    go_for_it: isSelected 
      ? 'bg-green-500 border-green-600 text-white' 
      : 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100',
    timepass: isSelected 
      ? 'bg-gray-500 border-gray-600 text-white' 
      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100',
    skip: isSelected 
      ? 'bg-red-500 border-red-600 text-white' 
      : 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100',
  };

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all
        ${colorClasses[sentiment]}
        ${onClick ? 'cursor-pointer' : 'cursor-default'}
      `}
    >
      <span className="text-xl">{emoji}</span>
      <span className="font-medium">{label}</span>
      {showCount && count !== undefined && (
        <span className="ml-2 px-2 py-1 rounded-full bg-black/10 text-sm">
          {count}
        </span>
      )}
    </button>
  );
}
