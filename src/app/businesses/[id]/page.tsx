'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import SentimentButton from '../../../components/review/SentimentButton';
import SentimentBar from '../../../components/review/SentimentBar';
import { BusinessCategory, CATEGORY_LABELS, Sentiment, SENTIMENT_LABELS } from '../../../types';
import { useLanguage } from '../../../hooks/useLanguage';
import { calculateSentimentPercentages, getDominantSentiment } from '../../../lib/constants';

// Dummy data
const BUSINESS_DATA = {
  id: '1',
  name: 'Hotel Snow View',
  category: 'hotels' as BusinessCategory,
  address: 'Main Market, Gauchar, Uttarakhand - 246401',
  coordinates: { lat: 30.5012, lng: 79.2234 },
  contactNumber: '+91 1234567890',
  whatsappLink: 'https://wa.me/911234567890',
  openingHours: '24/7',
  googleRating: 4.5,
  googleReviewCount: 128,
  googlePhotos: ['https://via.placeholder.com/400x300'],
  sentimentCounts: { perfection: 15, go_for_it: 8, timepass: 3, skip: 1 } as Record<Sentiment, number>,
  reviews: [
    { id: '1', userId: 'u1', userName: 'Rahul S.', sentiment: 'perfection' as Sentiment, text: 'Amazing view of the Himalayas! Highly recommended.', createdAt: new Date() },
    { id: '2', userId: 'u2', userName: 'Priya M.', sentiment: 'go_for_it' as Sentiment, text: 'Good stay, food could be better.', createdAt: new Date() },
  ],
};

export default function BusinessDetailPage() {
  const params = useParams();
  const { language, t } = useLanguage();
  const [selectedSentiment, setSelectedSentiment] = useState<Sentiment | null>(null);
  const [reviewText, setReviewText] = useState('');

  const business = BUSINESS_DATA; // In real app, fetch by params.id
  const dominantSentiment = getDominantSentiment(business.sentimentCounts);
  const percentages = calculateSentimentPercentages(business.sentimentCounts);

  const categoryInfo = CATEGORY_LABELS[business.category];
  const categoryLabel = language === 'hi' ? categoryInfo.hi : categoryInfo.en;

  const handleSubmitReview = () => {
    if (!selectedSentiment) return;
    alert('Review submitted! (Demo - will connect to backend)');
    setSelectedSentiment(null);
    setReviewText('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{categoryInfo.emoji}</span>
            <span className="text-blue-200">{categoryLabel}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{business.name}</h1>
          <p className="text-blue-100 flex items-center gap-2">
            📍 {business.address}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Info Cards */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {business.contactNumber && (
                  <a href={`tel:${business.contactNumber}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <span className="text-2xl">📞</span>
                    <div>
                      <p className="text-sm text-gray-500">{t('contact')}</p>
                      <p className="font-medium">{business.contactNumber}</p>
                    </div>
                  </a>
                )}
                {business.whatsappLink && (
                  <a href={business.whatsappLink} target="_blank" className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100">
                    <span className="text-2xl">💬</span>
                    <div>
                      <p className="text-sm text-gray-500">{t('whatsapp')}</p>
                      <p className="font-medium text-green-700">Chat on WhatsApp</p>
                    </div>
                  </a>
                )}
                {business.openingHours && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl">🕐</span>
                    <div>
                      <p className="text-sm text-gray-500">{t('openingHours')}</p>
                      <p className="font-medium">{business.openingHours}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="text-sm text-gray-500">{t('address')}</p>
                    <p className="font-medium">{business.address}</p>
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
                  <div className="text-4xl font-bold text-yellow-600">{business.googleRating}</div>
                  <div className="text-sm text-gray-500">/ 5.0</div>
                </div>
                <div>
                  <p className="text-gray-600">{business.googleReviewCount} {t('googleReviews')}</p>
                  <div className="flex text-yellow-400 text-xl">
                    {'★'.repeat(Math.floor(business.googleRating))}{'☆'.repeat(5 - Math.floor(business.googleRating))}
                  </div>
                </div>
              </div>
            </div>

            {/* Community Sentiment */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">💬 {t('communitySentiment')}</h2>
              <SentimentBar sentimentCounts={business.sentimentCounts} dominantSentiment={dominantSentiment} />
              
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
                      <span className="text-sm text-gray-600 w-12 text-right">{business.sentimentCounts[sentiment]}</span>
                    </div>
                  </div>
                ))}
                <p className="text-sm text-gray-500 text-center mt-4">
                  {Object.values(business.sentimentCounts).reduce((a, b) => a + b, 0)} {t('totalVotes')}
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

            {/* Reviews List */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">{t('reviews')}</h2>
              {business.reviews.length === 0 ? (
                <p className="text-gray-500 text-center py-4">{t('noReviews')}</p>
              ) : (
                <div className="space-y-4">
                  {business.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700">
                          {review.userName[0]}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{review.userName}</p>
                          <p className="text-xs text-gray-500">
                            {SENTIMENT_LABELS[review.sentiment].emoji}{' '}
                            {language === 'hi' ? SENTIMENT_LABELS[review.sentiment].hi : SENTIMENT_LABELS[review.sentiment].en}
                          </p>
                        </div>
                      </div>
                      {review.text && <p className="text-gray-700 text-sm">{review.text}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Map */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold mb-4">📍 {t('directions')}</h3>
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <p className="text-gray-500">Map View (Google Maps integration pending)</p>
              </div>
              <a
                href={`https://www.google.com/maps?q=${business.coordinates.lat},${business.coordinates.lng}`}
                target="_blank"
                className="mt-4 block text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
