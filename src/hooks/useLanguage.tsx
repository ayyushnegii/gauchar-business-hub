'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, DEFAULT_LANGUAGE } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    const saved = localStorage.getItem('gauchar-language') as Language;
    if (saved && (saved === 'en' || saved === 'hi')) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('gauchar-language', lang);
  };

  const t = (key: string): string => {
    const translations = {
      en: {
        home: 'Home',
        search: 'Search',
        categories: 'Categories',
        favorites: 'Favorites',
        perfection: 'Perfection',
        go_for_it: 'Go for it',
        timepass: 'Timepass',
        skip: 'Skip',
        hotels: 'Hotels & Stays',
        restaurants: 'Restaurants & Food',
        repair: 'Phone & Laptop Repair',
        grocery: 'Grocery & General Stores',
        medical: 'Medical & Pharmacy',
        transport: 'Transport & Travel',
        searchPlaceholder: 'Search businesses...',
        writeReview: 'Write a Review',
        submitReview: 'Submit Review',
        signIn: 'Sign In',
        signOut: 'Sign Out',
      },
      hi: {
        home: 'होम',
        search: 'खोजें',
        categories: 'श्रेणियां',
        favorites: 'पसंदीदा',
        perfection: 'बेहतरीन',
        go_for_it: 'जरूर जाएं',
        timepass: 'टाइमपास',
        skip: 'बचें',
        hotels: 'होटल और ठहरने की जगह',
        restaurants: 'रेस्टोरेंट और खाना',
        repair: 'फोन और लैपटॉप रिपेयर',
        grocery: 'किराना और जनरल स्टोर',
        medical: 'मेडिकल और फार्मेसी',
        transport: 'परिवहन और यात्रा',
        searchPlaceholder: 'व्यवसाय खोजें...',
        writeReview: 'समीक्षा लिखें',
        submitReview: 'समीक्षा भेजें',
        signIn: 'साइन इन करें',
        signOut: 'साइन आउट करें',
      },
    };
    
    return (translations[language] as any)?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
