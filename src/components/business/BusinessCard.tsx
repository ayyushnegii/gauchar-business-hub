'use client';

import { motion } from 'framer-motion';
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden group"
    >
      {/* Image section with overlay */}
      <div className="relative overflow-hidden h-48">
        {imageUrl ? (
          <motion.img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-6xl group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-300">
            {categoryInfo.emoji}
          </div>
        )}
        
        {/* Category badge overlay */}
        <motion.div 
          className="absolute top-3 left-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 shadow-sm">
            {categoryInfo.emoji} {categoryLabel}
          </span>
        </motion.div>

        {/* Google rating badge */}
        {googleRating !== undefined && (
          <motion.div 
            className="absolute top-3 right-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-400/90 backdrop-blur-sm rounded-full text-xs font-bold text-yellow-900 shadow-sm">
              ⭐ {googleRating.toFixed(1)}
            </span>
          </motion.div>
        )}
      </div>
      
      {/* Content section */}
      <div className="p-5">
        <motion.h3 
          className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors"
        >
          {name}
        </motion.h3>
        
        <p className="text-sm text-gray-600 mb-4 flex items-start gap-1">
          <span>📍</span>
          <span className="line-clamp-2">{address}</span>
        </p>
        
        {/* Sentiment Bar */}
        <SentimentBar 
          sentimentCounts={sentimentCounts as any} 
          dominantSentiment={dominantSentiment as any} 
        />

        {/* View details link */}
        <motion.div 
          className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-sm text-blue-600 font-medium group-hover:text-blue-700">
            {language === 'hi' ? 'विवरण देखें →' : 'View Details →'}
          </span>
          {dominantSentiment && (
            <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
              {dominantSentiment}
            </span>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
