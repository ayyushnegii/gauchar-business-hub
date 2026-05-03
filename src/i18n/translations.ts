import { Language } from '../types';

const translations = {
  en: {
    // Navigation
    home: 'Home',
    search: 'Search',
    categories: 'Categories',
    favorites: 'Favorites',
    
    // Sentiments
    perfection: 'Perfection',
    go_for_it: 'Go for it',
    timepass: 'Timepass',
    skip: 'Skip',
    
    // Categories
    hotels: 'Hotels & Stays',
    restaurants: 'Restaurants & Food',
    repair: 'Phone & Laptop Repair',
    grocery: 'Grocery & General Stores',
    medical: 'Medical & Pharmacy',
    transport: 'Transport & Travel',
    
    // Search
    searchPlaceholder: 'Search businesses...',
    searchNearMe: 'Near me',
    
    // Business
    contact: 'Contact',
    whatsapp: 'WhatsApp',
    openingHours: 'Opening Hours',
    address: 'Address',
    directions: 'Get Directions',
    
    // Reviews
    writeReview: 'Write a Review',
    selectSentiment: 'Select your sentiment',
    addComment: 'Add a comment (optional)',
    submitReview: 'Submit Review',
    reviews: 'Reviews',
    noReviews: 'No reviews yet',
    
    // Google
    googleRating: 'Google Rating',
    googleReviews: 'Google Reviews',
    externalData: 'External Data',
    
    // Community
    communitySentiment: 'Community Sentiment',
    totalVotes: 'Total Votes',
    
    // Filters
    filterByCategory: 'Filter by Category',
    filterBySentiment: 'Filter by Sentiment',
    openNow: 'Open Now',
    sortBy: 'Sort By',
    sortByPerfection: 'Most Perfection',
    sortByReviews: 'Most Reviews',
    sortByRecent: 'Recently Reviewed',
    
    // Language
    language: 'Language',
    english: 'English',
    hindi: 'हिंदी',
    
    // Auth
    signIn: 'Sign In',
    signOut: 'Sign Out',
    signInToReview: 'Sign in to write a review',
  },
  
  hi: {
    // Navigation
    home: 'होम',
    search: 'खोजें',
    categories: 'श्रेणियां',
    favorites: 'पसंदीदा',
    
    // Sentiments
    perfection: 'बेहतरीन',
    go_for_it: 'जरूर जाएं',
    timepass: 'टाइमपास',
    skip: 'बचें',
    
    // Categories
    hotels: 'होटल और ठहरने की जगह',
    restaurants: 'रेस्टोरेंट और खाना',
    repair: 'फोन और लैपटॉप रिपेयर',
    grocery: 'किराना और जनरल स्टोर',
    medical: 'मेडिकल और फार्मेसी',
    transport: 'परिवहन और यात्रा',
    
    // Search
    searchPlaceholder: 'व्यवसाय खोजें...',
    searchNearMe: 'मेरे पास',
    
    // Business
    contact: 'संपर्क',
    whatsapp: 'व्हाट्सएप्प',
    openingHours: 'खुलने का समय',
    address: 'पता',
    directions: 'दिशा निर्देश',
    
    // Reviews
    writeReview: 'समीक्षा लिखें',
    selectSentiment: 'अपनी राय चुनें',
    addComment: 'टिप्पणी जोड़ें (वैकल्पिक)',
    submitReview: 'समीक्षा भेजें',
    reviews: 'समीक्षाएं',
    noReviews: 'अभी तक कोई समीक्षा नहीं',
    
    // Google
    googleRating: 'Google रेटिंग',
    googleReviews: 'Google समीक्षाएं',
    externalData: 'बाहरी डेटा',
    
    // Community
    communitySentiment: 'सामुदायिक भावना',
    totalVotes: 'कुल वोट',
    
    // Filters
    filterByCategory: 'श्रेणी के अनुसार फ़िल्टर करें',
    filterBySentiment: 'भावना के अनुसार फ़िल्टर करें',
    openNow: 'अभी खुला है',
    sortBy: 'इससे क्रमबद्ध करें',
    sortByPerfection: 'सबसे बेहतरीन',
    sortByReviews: 'सबसे अधिक समीक्षाएं',
    sortByRecent: 'हाल ही में समीक्षा की गई',
    
    // Language
    language: 'भाषा',
    english: 'English',
    hindi: 'हिंदी',
    
    // Auth
    signIn: 'साइन इन करें',
    signOut: 'साइन आउट करें',
    signInToReview: 'समीक्षा लिखने के लिए साइन इन करें',
  },
};

export function getTranslation(lang: Language) {
  return translations[lang] || translations.en;
}

export type TranslationKey = keyof typeof translations.en;
