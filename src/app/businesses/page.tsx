'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import BusinessCard from '../../components/business/BusinessCard';
import SearchBar from '../../components/search/SearchBar';
import GoogleMapComponent from '../../components/maps/GoogleMapComponent';
import SkeletonCard from '../../components/ui/SkeletonCard';
import { BusinessCategory, CATEGORY_LABELS, Sentiment, SENTIMENT_LABELS } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';
import { searchBusinessesInGauchar, GooglePlace } from '../../lib/googlePlaces';

interface BusinessesPageProps {
  searchParams: { category?: string; q?: string };
}

export default function BusinessesPage({ searchParams }: BusinessesPageProps) {
  const { language, t } = useLanguage();
  
  const [businesses, setBusinesses] = useState<GooglePlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory | ''>(
    (searchParams.category as BusinessCategory) || ''
  );
  const [selectedSentiment, setSelectedSentiment] = useState<Sentiment | ''>('');
  const [sortBy, setSortBy] = useState<'perfection' | 'reviews' | 'recent'>('perfection');

  useEffect(() => {
    async function fetchBusinesses() {
      setLoading(true);
      const results = await searchBusinessesInGauchar(
        selectedCategory || undefined,
        searchParams.q || undefined
      );
      setBusinesses(results);
      setLoading(false);
    }
    fetchBusinesses();
  }, [selectedCategory, searchParams.q]);

  const handleSearch = (query: string) => {
    window.location.href = `/businesses?q=${encodeURIComponent(query)}`;
  };

  // Map Google category types to our BusinessCategory
  const mapGoogleTypeToCategory = (types: string[] = []): BusinessCategory => {
    if (types.includes('lodging') || types.includes('hotel')) return 'hotels';
    if (types.includes('restaurant') || types.includes('food')) return 'restaurants';
    if (types.includes('store') || types.includes('grocery')) return 'grocery';
    if (types.includes('hospital') || types.includes('pharmacy')) return 'medical';
    if (types.includes('car_repair') || types.includes('electronics_repair')) return 'repair';
    if (types.includes('travel_agency') || types.includes('transit_station')) return 'transport';
    return 'restaurants'; // default
  };

  // Convert Google rating to our sentiment
  const getSentimentFromRating = (rating?: number): Sentiment => {
    if (!rating) return 'timepass';
    if (rating >= 4.6) return 'perfection';
    if (rating >= 4.0) return 'go_for_it';
    if (rating >= 3.0) return 'timepass';
    return 'skip';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Map Section */}
        {businesses.length > 0 && (
          <div className="mb-8">
            <GoogleMapComponent 
              businesses={businesses.map(b => ({
                id: b.place_id,
                name: b.name,
                lat: b.geometry.location.lat,
                lng: b.geometry.location.lng,
                category: mapGoogleTypeToCategory(b.types)
              }))}
            />
          </div>
        )}

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
                {loading ? 'Loading...' : `${businesses.length} ${businesses.length === 1 ? 'Business' : 'Businesses'} Found`}
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

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3].map(i => <SkeletonCard key={i} />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {businesses.map((business) => (
                  <Link key={business.place_id} href={`/businesses/${business.place_id}`}>
                    <BusinessCard 
                      id={business.place_id}
                      name={business.name}
                      category={mapGoogleTypeToCategory(business.types)}
                      address={business.formatted_address}
                      googleRating={business.rating}
                      sentimentCounts={{
                        perfection: 0,
                        go_for_it: 0,
                        timepass: 0,
                        skip: 0
                      }}
                      dominantSentiment={getSentimentFromRating(business.rating)}
                    />
                  </Link>
                ))}
              </div>
            )}

            {!loading && businesses.length === 0 && (
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
