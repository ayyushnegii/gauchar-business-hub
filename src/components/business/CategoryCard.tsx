'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BusinessCategory, CATEGORY_LABELS } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';

interface CategoryCardProps {
  category: BusinessCategory;
  count?: number;
  onClick?: () => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function CategoryCard({ category, count, onClick }: CategoryCardProps) {
  const { language } = useLanguage();
  const info = CATEGORY_LABELS[category];
  const label = language === 'hi' ? info.hi : info.en;
  
  const bgColors = {
    hotels: 'bg-blue-50 hover:bg-blue-100 border-blue-200 group-hover:border-blue-400',
    restaurants: 'bg-orange-50 hover:bg-orange-100 border-orange-200 group-hover:border-orange-400',
    repair: 'bg-purple-50 hover:bg-purple-100 border-purple-200 group-hover:border-purple-400',
    grocery: 'bg-green-50 hover:bg-green-100 border-green-200 group-hover:border-green-400',
    medical: 'bg-red-50 hover:bg-red-100 border-red-200 group-hover:border-red-400',
    transport: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200 group-hover:border-yellow-400',
  };

  const iconBgColors = {
    hotels: 'bg-blue-100 group-hover:bg-blue-200',
    restaurants: 'bg-orange-100 group-hover:bg-orange-200',
    repair: 'bg-purple-100 group-hover:bg-purple-200',
    grocery: 'bg-green-100 group-hover:bg-green-200',
    medical: 'bg-red-100 group-hover:bg-red-200',
    transport: 'bg-yellow-100 group-hover:bg-yellow-200',
  };

  return (
    <motion.button
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        group flex flex-col items-center justify-center p-6 rounded-2xl border-2
        transition-all duration-300 shadow-sm hover:shadow-xl
        ${bgColors[category]}
        ${onClick ? 'cursor-pointer' : 'cursor-default'}
      `}
    >
      <motion.div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${iconBgColors[category]}`}
        whileHover={{ rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <span className="text-4xl">{info.emoji}</span>
      </motion.div>
      <span className="font-semibold text-gray-800 text-center mb-1">{label}</span>
      {count !== undefined && (
        <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
          {count} {language === 'hi' ? 'स्थान' : 'places'}
        </span>
      )}
    </motion.button>
  );
}
