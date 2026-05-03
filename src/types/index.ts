// Sentiment categories for reviews
export type Sentiment = 'perfection' | 'go_for_it' | 'timepass' | 'skip';

export const SENTIMENT_LABELS = {
  perfection: { en: 'Perfection', hi: 'बेहतरीन', emoji: '🏆' },
  go_for_it: { en: 'Go for it', hi: 'जरूर जाएं', emoji: '👍' },
  timepass: { en: 'Timepass', hi: 'टाइमपास', emoji: '😐' },
  skip: { en: 'Skip', hi: 'बचें', emoji: '👎' },
} as const;

// Business categories
export type BusinessCategory = 
  | 'hotels'
  | 'restaurants'
  | 'repair'
  | 'grocery'
  | 'medical'
  | 'transport';

export const CATEGORY_LABELS = {
  hotels: { en: 'Hotels & Stays', hi: 'होटल और ठहरने की जगह', emoji: '🏨' },
  restaurants: { en: 'Restaurants & Food', hi: 'रेस्टोरेंट और खाना', emoji: '🍽️' },
  repair: { en: 'Phone & Laptop Repair', hi: 'फोन और लैपटॉप रिपेयर', emoji: '🔧' },
  grocery: { en: 'Grocery & General Stores', hi: 'किराना और जनरल स्टोर', emoji: '🛒' },
  medical: { en: 'Medical & Pharmacy', hi: 'मेडिकल और फार्मेसी', emoji: '💊' },
  transport: { en: 'Transport & Travel', hi: 'परिवहन और यात्रा', emoji: '🚗' },
} as const;

// User type
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  savedPlaces?: string[]; // business IDs
}

// Business type
export interface Business {
  id: string;
  name: string;
  category: BusinessCategory;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  contactNumber?: string;
  whatsappLink?: string;
  openingHours?: string;
  // Google data (external)
  googleRating?: number;
  googleReviewCount?: number;
  googlePhotos?: string[]; // URLs only, not stored
  // Platform data
  sentimentCounts: Record<Sentiment, number>;
  reviews: Review[];
  userMedia: Media[];
  createdAt: Date;
  updatedAt: Date;
}

// Review type
export interface Review {
  id: string;
  businessId: string;
  userId: string;
  userName: string;
  sentiment: Sentiment;
  text?: string;
  createdAt: Date;
}

// Media type (user uploads)
export interface Media {
  id: string;
  businessId: string;
  userId: string;
  type: 'photo' | 'video';
  url: string;
  createdAt: Date;
}

// Language type
export type Language = 'en' | 'hi';

export const DEFAULT_LANGUAGE: Language = 'en';
