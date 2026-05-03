'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import SentimentButton from '../../../components/review/SentimentButton';
import SentimentBar from '../../../components/review/SentimentBar';
import GoogleMapComponent from '../../../components/maps/GoogleMapComponent';
import { BusinessCategory, CATEGORY_LABELS, Sentiment, SENTIMENT_LABELS } from '../../../types';
import { useLanguage } from '../../../hooks/useLanguage';
import { calculateSentimentPercentages, getDominantSentiment, googleRatingToSentiment } from '../../../lib/constants';
import { searchBusinessesInGauchar, getPhotoUrl, GooglePlace } from '../../../lib/googlePlaces';

export default function BusinessDetailPage() {
  const params = useParams();
  const { language, t } = useLanguage();
  const [selectedSentiment, setSelectedSentiment] = useState<Sentiment | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [business, setBusiness] = useState<GooglePlace | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBusiness() {
      setLoading(true);
      const placeId = params?.id as string;
      
      if (!placeId) {
        setLoading(false);
        return;
      }
      
      // Search for this specific business
      const results = await searchBusinessesInGauchar();
      const found = results.find(b => b.place_id === placeId);
      
      if (found) {
        setBusiness(found);
      }
      setLoading(false);
    }
    fetchBusiness();
  }, [params?.id]);

  const handleSubmitReview = () => {
    if (!selectedSentiment) return;
    alert('Review submitted! (Demo - will connect to backend)');
    setSelectedSentiment(null);
    setReviewText('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Business not found</p>
      </div>
    );
  }

  const sentimentCounts = {
    perfection: 0,
    go_for_it: 0,
    timepass: 0,
    skip: 0
  };
  
  // If Google rating exists, add it to the appropriate sentiment
  if (business.rating) {
    const sentiment = googleRatingToSentiment(business.rating);
    sentimentCounts[sentiment] = business.user_ratings_total || 1;
  }

  const dominantSentiment = getDominantSentiment(sentimentCounts);
  const percentages = calculateSentimentPercentages(sentimentCounts);

  // Map Google types to our category
  const mapGoogleTypeToCategory = (types: string[] = []): BusinessCategory => {
    if (types.includes('lodging') || types.includes('hotel')) return 'hotels';
    if (types.includes('restaurant') || types.includes('food') || types.includes('cafe')) return 'restaurants';
    if (types.includes('store') || types.includes('grocery_store')) return 'grocery';
    if (types.includes('hospital') || types.includes('pharmacy') || types.includes('doctor')) return 'medical';
    if (types.includes('car_repair') || types.includes('electronics_repair')) return 'repair';
    if (types.includes('travel_agency') || types.includes('transit_station')) return 'transport';
    return 'restaurants';
  };

  const category = mapGoogleTypeToCategory(business.types);
  const categoryInfo = CATEGORY_LABELS[category];
  const categoryLabel = language === 'hi' ? categoryInfo.hi : categoryInfo.en;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{categoryInfo.emoji}</span>
            <span className="text-blue-200">{categoryLabel}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{business.name}</h1>
          <p className="text-blue-100 flex items-center gap-2">
            📍 {business.formatted_address}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">📍 Location</h2>
              <GoogleMapComponent 
                businesses={[{
                  id: business.place_id,
                  name: business.name,
                  lat: business.geometry.location.lat,
                  lng: business.geometry.location.lng,
                  category: category
                }]}
                center={business.geometry.location}
                zoom={15}
              />
            </div>

            {/* Info Cards */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {business.formatted_phone_number && (
                  <a href={`tel:${business.formatted_phone_number}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <span className="text-2xl">📞</span>
                    <div>
                      <p className="text-sm text-gray-500">{t('contact')}</p>
                      <p className="font-medium">{business.formatted_phone_number}</p>
                    </div>
                  </a>
                )}
                
                <a href={`https://wa.me/${business.formatted_phone_number?.replace(/\D/g, '')}`} target="_blank" className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100">
                  <span className="text-2xl">💬</span>
                  <div>
                    <p className="text-sm text-gray-500">{t('whatsapp')}</p>
                    <p className="font-medium text-green-700">Chat on WhatsApp</p>
                  </div>
                </a>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">🕐</span>
                  <div>
                    <p className="text-sm text-gray-500">{t('openingHours')}</p>
                    <p className="font-medium">
                      {business.opening_hours?.open_now ? 'Open Now' : 'Closed'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="text-sm text-gray-500">{t('address')}</p>
                    <p className="font-medium">{business.formatted_address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Insights */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                ⭐ {t('googleRating')} <span className="text-sm font-normal text-gray-500">({t('externalData')})</span>
              </h2>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-600">{business.rating || 'N/A'}</div>
                  <div className="text-sm text-gray-500">/ 5.0</div>
                </div>
                <div>
                  <p className="text-gray-600">{business.user_ratings_total || 0} {t('googleReviews')}</p>
                  <div className="flex text-yellow-400 text-xl">
                    {'★'.repeat(Math.floor(business.rating || 0))}{'☆'.repeat(5 - Math.floor(business.rating || 0))}
                  </div>
                </div>
              </div>
            </div>

            {/* Community Sentiment */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">💬 {t('communitySentiment')}</h2>
              <SentimentBar sentimentCounts={sentimentCounts} dominantSentiment={dominantSentiment} />
              
              <div className="mt-6 space-y-3">
                {(['perfection', 'go_for_it', 'timepass', 'skip'] as Sentiment[]).map((sentiment) => (
                  <div key={sentiment} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{SENTIMENT_LABELS[sentiment].emoji}</span>
                      <span>{language === 'hi' ? SENTIMENT_LABELS[sentiment].hi : SENTIMENT_LABELS[sentiment].en}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${percentages[sentiment]}%` }} />
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">{sentimentCounts[sentiment]}</span>
                    </div>
                  </div>
                ))}
                <p className="text-sm text-gray-500 text-center mt-4">
                  {Object.values(sentimentCounts).reduce((a, b) => a + b, 0)} {t('totalVotes')}
                </p>
              </div>
            </div>

            {/* Write Review */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">{t('writeReview')}</h2>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">{t('selectSentiment')}</p>
                <div className="flex flex-wrap gap-3">
                  {(['perfection', 'go_for_it', 'timepass', 'skip'] as Sentiment[]).map((sentiment) => (
                    <SentimentButton
                      key={sentiment}
                      sentiment={sentiment}
                      isSelected={selectedSentiment === sentiment}
                      onClick={() => setSelectedSentiment(sentiment)}
                    />
                  ))}
                </div>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder={t('addComment')}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
                <button
                  onClick={handleSubmitReview}
                  disabled={!selectedSentiment}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {t('submitReview')}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Photos */}
            {business.photos && business.photos.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold mb-4">📷 Photos</h3>
                <div className="grid grid-cols-2 gap-2">
                  {business.photos.slice(0, 4).map((photo, index) => (
                    <img
                      key={index}
                      src={getPhotoUrl(photo.photo_reference)}
                      alt={`${business.name} photo ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
