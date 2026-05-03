import { BusinessCategory, Sentiment } from '../types';

// Map Google rating to sentiment label
export function googleRatingToSentiment(rating: number): Sentiment {
  if (rating >= 4.6) return 'perfection';
  if (rating >= 4.0) return 'go_for_it';
  if (rating >= 3.0) return 'timepass';
  return 'skip';
}

// Calculate sentiment percentages
export function calculateSentimentPercentages(
  sentimentCounts: Record<Sentiment, number>
): Record<Sentiment, number> {
  const total = Object.values(sentimentCounts).reduce((a, b) => a + b, 0);
  if (total === 0) return { perfection: 0, go_for_it: 0, timepass: 0, skip: 0 };
  
  return {
    perfection: Math.round((sentimentCounts.perfection / total) * 100),
    go_for_it: Math.round((sentimentCounts.go_for_it / total) * 100),
    timepass: Math.round((sentimentCounts.timepass / total) * 100),
    skip: Math.round((sentimentCounts.skip / total) * 100),
  };
}

// Get dominant sentiment
export function getDominantSentiment(
  sentimentCounts: Record<Sentiment, number>
): Sentiment | null {
  const entries = Object.entries(sentimentCounts) as [Sentiment, number][];
  if (entries.every(([, count]) => count === 0)) return null;
  
  return entries.reduce((max, current) => 
    current[1] > max[1] ? current : max
  )[0];
}

// Search filters
export interface SearchFilters {
  category?: BusinessCategory;
  sentiment?: Sentiment;
  openNow?: boolean;
  sortBy?: 'perfection' | 'reviews' | 'recent';
}

// Location (for scaling)
export interface Location {
  id: string;
  name: string;
  type: 'city' | 'district' | 'state';
  parentId?: string;
}
