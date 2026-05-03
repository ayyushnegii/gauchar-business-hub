'use client';

import { useState } from 'react';
import Link from 'next/link';
import BusinessCard from '../../components/business/BusinessCard';
import SearchBar from '../../components/search/SearchBar';
import { BusinessCategory, CATEGORY_LABELS, Sentiment, SENTIMENT_LABELS } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';

// Dummy data
const ALL_BUSINESSES = [
  { id: '1', name: 'Hotel Snow View', category: 'hotels' as BusinessCategory, address: 'Main Market, Gauchar', googleRating: 4.5, sentimentCounts: { perfection: 15, go_for_it: 8, timepass: 3, skip: 1 }, dominantSentiment: 'perfection' },
  { id: '2', name: 'Sharma Dhaba', category: 'restaurants' as BusinessCategory, address: 'Badrinath Road, Gauchar', googleRating: 4.2, sentimentCounts: { perfection: 10, go_for_it: 12, timepass: 5, skip: 2 }, dominantSentiment: 'go_for_it' },
  { id: '3', name: 'Gupta Phone Repair', category: 'repair' as BusinessCategory, address: 'Near Bus Stand, Gauchar', googleRating: 3.8, sentimentCounts: { perfection: 5, go_for_it: 8, timepass: 10, skip: 3 }, dominantSentiment: 'timepass' },
  { id: '4', name: 'Gauchar Medical Store', category: 'medical' as BusinessCategory, address: 'Hospital Road, Gauchar', googleRating: 4.0, sentimentCounts: { perfection: 8, go_for_it: 15, timepass: 4, skip: 1 }, dominantSentiment: 'go_for_it' },
  { id: '5', name: 'Kumar Grocery', category: 'grocery' as BusinessCategory, address: 'Main Bazaar, Gauchar', googleRating: 4.3, sentimentCounts: { perfection: 12, go_for_it: 10, timepass: 3, skip: 0 }, dominantSentiment: 'perfection' },
  { id: '6', name: 'Sagar Transport', category: 'transport' as BusinessCategory, address: 'Bus Stand, Gauchar', googleRating: 3.5, sentimentCounts: { perfection: 3, go_for_it: 7, timepass: 12, skip: 5 }, dominantSentiment: 'timepass' },
];

interface BusinessesPageProps {
  searchParams: { category?: string; q?: string };
}

export default function BusinessesPage({ searchParams }: BusinessesPageProps) {
  const { language, t } = useLanguage();
  
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory | ''>(
    (searchParams.category as BusinessCategory) || ''
  );
  const [selectedSentiment, setSelectedSentiment] = useState<Sentiment | ''>('');
  const [sortBy, setSortBy] = useState<'perfection' | 'reviews' | 'recent'>('perfection');

  const handleSearch = (query: string) => {
    window.location.href = `/businesses?q=${encodeURIComponent(query)}`;
  };

  // Filter businesses
  let filtered = ALL_BUSINESSES;

  if (selectedCategory) {
    filtered = filtered.filter(b => b.category === selectedCategory);
  }

  if (selectedSentiment) {
    filtered = filtered.filter(b => b.dominantSentiment === selectedSentiment);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Section */}
      <section className="bg-blue-600 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">{t('filterByCategory')}</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                      !selectedCategory ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    {language === 'hi' ? 'सभी' : 'All'}
                  </button>
                  {Object.entries(CATEGORY_LABELS).map(([key, labels]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key as BusinessCategory)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                        selectedCategory === key ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                      }`}
                    >
                      {labels.emoji} {language === 'hi' ? labels.hi : labels.en}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">{t('filterBySentiment')}</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedSentiment('')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                      !selectedSentiment ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    {language === 'hi' ? 'सभी' : 'All'}
                  </button>
                  {Object.entries(SENTIMENT_LABELS).map(([key, labels]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedSentiment(key as Sentiment)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                        selectedSentiment === key ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                      }`}
                    >
                      {labels.emoji} {language === 'hi' ? labels.hi : labels.en}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {filtered.length} {filtered.length === 1 ? 'Business' : 'Businesses'} Found
              </h1>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="perfection">{t('sortByPerfection')}</option>
                <option value="reviews">{t('sortByReviews')}</option>
                <option value="recent">{t('sortByRecent')}</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((business) => (
                <Link key={business.id} href={`/businesses/${business.id}`}>
                  <BusinessCard
                    id={business.id}
                    name={business.name}
                    category={business.category}
                    address={business.address}
                    googleRating={business.googleRating}
                    sentimentCounts={business.sentimentCounts}
                    dominantSentiment={business.dominantSentiment}
                  />
                </Link>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p>{language === 'hi' ? 'कोई व्यवसाय नहीं मिला' : 'No businesses found'}</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
