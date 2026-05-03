'use client';

import { useState } from 'react';
import Link from 'next/link';
import CategoryCard from '../components/business/CategoryCard';
import SearchBar from '../components/search/SearchBar';
import { BusinessCategory, CATEGORY_LABELS } from '../types';
import { useLanguage } from '../hooks/useLanguage';

// Dummy data for now
const FEATURED_BUSINESSES = [
  { id: '1', name: 'Hotel Snow View', category: 'hotels' as BusinessCategory, address: 'Main Market, Gauchar', googleRating: 4.5, sentimentCounts: { perfection: 15, go_for_it: 8, timepass: 3, skip: 1 }, dominantSentiment: 'perfection' },
  { id: '2', name: 'Sharma Dhaba', category: 'restaurants' as BusinessCategory, address: 'Badrinath Road, Gauchar', googleRating: 4.2, sentimentCounts: { perfection: 10, go_for_it: 12, timepass: 5, skip: 2 }, dominantSentiment: 'go_for_it' },
  { id: '3', name: 'Gupta Phone Repair', category: 'repair' as BusinessCategory, address: 'Near Bus Stand, Gauchar', googleRating: 3.8, sentimentCounts: { perfection: 5, go_for_it: 8, timepass: 10, skip: 3 }, dominantSentiment: 'timepass' },
];

export default function HomePage() {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Navigate to search results
    window.location.href = `/businesses?q=${encodeURIComponent(query)}`;
  };

  const categories = Object.keys(CATEGORY_LABELS) as BusinessCategory[];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {language === 'hi' ? 'गौचर का अपना बिजनेस हब' : 'Gauchar Business Hub'}
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            {language === 'hi' 
              ? 'असली अनुभवों के आधार पर सर्वश्रेष्ठ स्थान खोजें'
              : 'Find the best places based on real experiences, not just ratings'
            }
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
          {language === 'hi' ? 'श्रेणियां' : 'Categories'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category} href={`/businesses?category=${category}`}>
              <CategoryCard category={category} />
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
          {language === 'hi' ? 'चुनिंदा व्यवसाय' : 'Featured Businesses'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_BUSINESSES.map((business) => (
            <Link key={business.id} href={`/businesses/${business.id}`}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{CATEGORY_LABELS[business.category].emoji}</span>
                  <span className="text-sm text-blue-600 font-medium">
                    {language === 'hi' ? CATEGORY_LABELS[business.category].hi : CATEGORY_LABELS[business.category].en}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{business.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{business.address}</p>
                {business.googleRating && (
                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                    <span>⭐</span>
                    <span className="font-medium">{business.googleRating.toFixed(1)}</span>
                  </div>
                )}
                <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500" style={{ width: '60%' }} />
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  {language === 'hi' ? 'समुदाय भावना' : 'Community Sentiment'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-blue-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-900">
            {language === 'hi' ? 'यह कैसे काम करता है?' : 'How It Works'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">
                {language === 'hi' ? '1. खोजें' : '1. Search'}
              </h3>
              <p className="text-gray-600">
                {language === 'hi' ? 'अपनी आवश्यकतानुसार व्यवसाय खोजें' : 'Find businesses based on your needs'}
              </p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2">
                {language === 'hi' ? '2. समीक्षा करें' : '2. Review'}
              </h3>
              <p className="text-gray-600">
                {language === 'hi' ? 'अपना अनुभव साझा करें' : 'Share your experience with others'}
              </p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-2">
                {language === 'hi' ? '3. खोजें सर्वश्रेष्ठ' : '3. Discover Best'}
              </h3>
              <p className="text-gray-600">
                {language === 'hi' ? 'सर्वश्रेष्ठ व्यवसायों का पता लगाएं' : 'Find the best-rated places'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
