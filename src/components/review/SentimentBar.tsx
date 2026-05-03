'use client';

import { Sentiment, SENTIMENT_LABELS } from '../../types';
import { calculateSentimentPercentages } from '../../lib/constants';
import { useLanguage } from '../../hooks/useLanguage';

interface SentimentBarProps {
  sentimentCounts: Record<Sentiment, number>;
  dominantSentiment?: Sentiment | null;
}

export default function SentimentBar({ sentimentCounts, dominantSentiment }: SentimentBarProps) {
  const { language } = useLanguage();
  const percentages = calculateSentimentPercentages(sentimentCounts);
  const total = Object.values(sentimentCounts).reduce((a, b) => a + b, 0);

  if (total === 0) return null;

  const order: Sentiment[] = ['perfection', 'go_for_it', 'timepass', 'skip'];
  const colors = {
    perfection: 'bg-yellow-500',
    go_for_it: 'bg-green-500',
    timepass: 'bg-gray-500',
    skip: 'bg-red-500',
  };

  return (
    <div className="w-full">
      {dominantSentiment && (
        <div className="mb-2 text-sm font-medium text-gray-700">
          {SENTIMENT_LABELS[dominantSentiment].emoji}{' '}
          {language === 'hi' 
            ? SENTIMENT_LABELS[dominantSentiment].hi 
            : SENTIMENT_LABELS[dominantSentiment].en}{' '}
          dominates
        </div>
      )}
      
      {/* Stacked bar */}
      <div className="flex h-6 w-full rounded-full overflow-hidden bg-gray-100">
        {order.map((sentiment) => (
          percentages[sentiment] > 0 && (
            <div
              key={sentiment}
              className={`${colors[sentiment]} transition-all duration-300`}
              style={{ width: `${percentages[sentiment]}%` }}
              title={`${sentiment}: ${percentages[sentiment]}%`}
            />
          )
        ))}
      </div>
      
      {/* Labels */}
      <div className="flex justify-between mt-2 text-xs text-gray-600">
        {order.map((sentiment) => (
          percentages[sentiment] > 0 && (
            <div key={sentiment} className="flex items-center gap-1">
              <span>{SENTIMENT_LABELS[sentiment].emoji}</span>
              <span>{percentages[sentiment]}%</span>
            </div>
          )
        ))}
      </div>
      
      <div className="mt-1 text-xs text-gray-500 text-center">
        {total} total votes
      </div>
    </div>
  );
}
