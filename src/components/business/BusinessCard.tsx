'use client';

import { BusinessCategory, CATEGORY_LABELS } from '../../types';
import SentimentBar from '../review/SentimentBar';
import { useLanguage } from '../../hooks/useLanguage';

interface BusinessCardProps {
  id: string;
  name: string;
  category: BusinessCategory;
  address: string;
  googleRating?: number;
  sentimentCounts: Record<string, number>;
  dominantSentiment?: string | null;
  imageUrl?: string;
  onClick?: () => void;
}

export default function BusinessCard({
  name,
  category,
  address,
  googleRating,
  sentimentCounts,
  dominantSentiment,
  imageUrl,
  onClick,
}: BusinessCardProps) {
  const { language, t } = useLanguage();
  const categoryInfo = CATEGORY_LABELS[category];
  const categoryLabel = language === 'hi' ? categoryInfo.hi : categoryInfo.en;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 cursor-pointer border border-gray-100"
    >
      {/* Image placeholder */}
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="w-full h-48 object-cover rounded-lg mb-3" />
      ) : (
        <div className="w-full h-48 bg-gray-100 rounded-lg mb-3 flex items-center justify-center text-4xl">
          {categoryInfo.emoji}
        </div>
      )}
      
      {/* Category badge */}
      <div className="inline-block px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs mb-2">
        {categoryInfo.emoji} {categoryLabel}
      </div>
      
      {/* Name */}
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
      
      {/* Address */}
      <p className="text-sm text-gray-600 mb-3">{address}</p>
      
      {/* Google Rating */}
      {googleRating !== undefined && (
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
          <span>⭐</span>
          <span className="font-medium">{googleRating.toFixed(1)}</span>
          <span className="text-xs text-gray-400">({t('googleRating')})</span>
        </div>
      )}
      
      {/* Sentiment Bar */}
      <SentimentBar 
        sentimentCounts={sentimentCounts as any} 
        dominantSentiment={dominantSentiment as any} 
      />
    </div>
  );
}
