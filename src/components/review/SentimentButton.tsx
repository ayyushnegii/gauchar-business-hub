'use client';

import { motion, AnimatePresence } from 'framer-motion';
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
      ? 'bg-yellow-500 border-yellow-600 text-white shadow-lg' 
      : 'bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100',
    go_for_it: isSelected 
      ? 'bg-green-500 border-green-600 text-white shadow-lg' 
      : 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100',
    timepass: isSelected 
      ? 'bg-gray-500 border-gray-600 text-white shadow-lg' 
      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100',
    skip: isSelected 
      ? 'bg-red-500 border-red-600 text-white shadow-lg' 
      : 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100',
  };

  return (
    <motion.button
      initial={{ scale: 1 }}
      animate={{ 
        scale: isSelected ? 1.05 : 1,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        flex items-center gap-2 px-5 py-3 rounded-xl border-2 transition-all
        ${colorClasses[sentiment]}
        ${onClick ? 'cursor-pointer' : 'cursor-default'}
        font-medium
      `}
    >
      <motion.span 
        className="text-2xl"
        animate={{ rotate: isSelected ? [0, -10, 10, 0] : 0 }}
        transition={{ duration: 0.5 }}
      >
        {emoji}
      </motion.span>
      <span className="font-semibold">{label}</span>
      <AnimatePresence>
        {showCount && count !== undefined && (
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="ml-2 px-2.5 py-0.5 rounded-full bg-black/20 text-sm font-bold"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
