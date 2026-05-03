'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { BusinessCategory, CATEGORY_LABELS, Sentiment, SENTIMENT_LABELS } from '../../../types';
import { useLanguage } from '../../../hooks/useLanguage';
import { searchBusinessesInGauchar, GooglePlace } from '../../../lib/googlePlaces';
import { calculateSentimentPercentages } from '../../../lib/constants';
import SentimentButton from '../../../components/review/SentimentButton';
import SentimentBar from '../../../components/review/SentimentBar';

const MOCK_SENTIMENT: Record<string, Record<Sentiment, number>> = {
  mock_1: { perfection: 15, go_for_it: 8, timepass: 3, skip: 1 },
  mock_2: { perfection: 10, go_for_it: 12, timepass: 5, skip: 2 },
  mock_3: { perfection: 5,  go_for_it: 8,  timepass: 10, skip: 3 },
  mock_4: { perfection: 12, go_for_it: 9,  timepass: 4,  skip: 1 },
  mock_5: { perfection: 18, go_for_it: 14, timepass: 3,  skip: 0 },
  mock_6: { perfection: 4,  go_for_it: 7,  timepass: 8,  skip: 5 },
  mock_7: { perfection: 30, go_for_it: 12, timepass: 2,  skip: 0 },
  mock_8: { perfection: 22, go_for_it: 10, timepass: 1,  skip: 0 },
};

const MOCK_REVIEWS: Record<string, { user: string; text: string; sentiment: Sentiment; date: string }[]> = {
  mock_1: [
    { user: 'Rahul S.', text: 'Great mountain views, very clean rooms!', sentiment: 'perfection', date: '2 days ago' },
    { user: 'Priya M.', text: 'Good stay, helpful staff.', sentiment: 'go_for_it', date: '1 week ago' },
  ],
  mock_7: [
    { user: 'Amit K.', text: 'Best chai in Gauchar, no question!', sentiment: 'perfection', date: '3 days ago' },
    { user: 'Sneha R.', text: 'Love the Maggi here, very cozy place.', sentiment: 'perfection', date: '5 days ago' },
  ],
};

function mapType(types: string[] = []): BusinessCategory {
  if (types.some(t => ['lodging','hotel'].includes(t))) return 'hotels';
  if (types.some(t => ['restaurant','cafe','food'].includes(t))) return 'restaurants';
  if (types.some(t => ['grocery_store','store'].includes(t))) return 'grocery';
  if (types.some(t => ['pharmacy','health','doctor'].includes(t))) return 'medical';
  if (types.some(t => ['electronics_repair','car_repair'].includes(t))) return 'repair';
  if (types.some(t => ['travel_agency','transit_station'].includes(t))) return 'transport';
  return 'restaurants';
}

export default function BusinessDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const id = params?.id as string;

  const [business, setBusiness] = useState<GooglePlace | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSentiment, setSelectedSentiment] = useState<Sentiment | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sentimentCounts, setSentimentCounts] = useState<Record<Sentiment, number>>(
    MOCK_SENTIMENT[id] ?? { perfection: 0, go_for_it: 0, timepass: 0, skip: 0 }
  );
  const [reviews, setReviews] = useState(MOCK_REVIEWS[id] ?? []);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const all = await searchBusinessesInGauchar();
      const found = all.find(b => b.place_id === id);
      setBusiness(found ?? null);
      setSentimentCounts(MOCK_SENTIMENT[id] ?? { perfection: 0, go_for_it: 0, timepass: 0, skip: 0 });
      setReviews(MOCK_REVIEWS[id] ?? []);
      setLoading(false);
    }
    load();
  }, [id]);

  const handleSubmitReview = () => {
    if (!selectedSentiment) return;
    setSentimentCounts(prev => ({ ...prev, [selectedSentiment]: prev[selectedSentiment] + 1 }));
    setReviews(prev => [
      { user: 'You', text: reviewText || '', sentiment: selectedSentiment, date: 'just now' },
      ...prev,
    ]);
    setSubmitted(true);
    setSelectedSentiment(null);
    setReviewText('');
  };

  const category = business ? mapType(business.types) : 'restaurants';
  const categoryInfo = CATEGORY_LABELS[category];
  const total = Object.values(sentimentCounts).reduce((a, b) => a + b, 0);

  const sentimentColors: Record<Sentiment, string> = {
    perfection: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    go_for_it: 'bg-green-100 text-green-800 border-green-300',
    timepass: 'bg-gray-100 text-gray-700 border-gray-300',
    skip: 'bg-red-100 text-red-800 border-red-300',
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">{language === 'hi' ? 'लोड हो रहा है...' : 'Loading...'}</p>
      </div>
    </div>
  );

  if (!business) return (
    <div className="min-h-screen flex items-center justify-center text-center px-4">
      <div>
        <p className="text-6xl mb-4">😕</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {language === 'hi' ? 'व्यवसाय नहीं मिला' : 'Business not found'}
        </h2>
        <Link href="/businesses" className="text-blue-600 hover:underline">
          {language === 'hi' ? '← वापस जाएं' : '← Back to listings'}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/businesses" className="text-blue-200 hover:text-white text-sm mb-4 inline-flex items-center gap-1">
            ← {language === 'hi' ? 'वापस' : 'Back to listings'}
          </Link>
          <div className="flex items-start gap-4 mt-2">
            <span className="text-6xl">{categoryInfo.emoji}</span>
            <div>
              <p className="text-blue-200 text-sm font-medium mb-1">
                {language === 'hi' ? categoryInfo.hi : categoryInfo.en}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{business.name}</h1>
              <p className="text-blue-100 flex items-center gap-1">
                <span>📍</span>{business.formatted_address}
              </p>
              {business.formatted_phone_number && (
                <p className="text-blue-100 mt-1 flex items-center gap-1">
                  <span>📞</span>{business.formatted_phone_number}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* Google Rating + Open Status */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-wrap gap-4 items-center">
          {business.rating && (
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-2xl">⭐</span>
              <div>
                <p className="text-2xl font-bold text-gray-900">{business.rating.toFixed(1)}</p>
                <p className="text-xs text-gray-500">Google · {business.user_ratings_total ?? 0} reviews</p>
              </div>
            </div>
          )}
          {business.opening_hours && (
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              business.opening_hours.open_now
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {business.opening_hours.open_now
                ? (language === 'hi' ? '✓ अभी खुला है' : '✓ Open Now')
                : (language === 'hi' ? '✕ बंद है' : '✕ Closed')}
            </span>
          )}
        </div>

        {/* Community Sentiment */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {language === 'hi' ? '🗳️ सामुदायिक भावना' : '🗳️ Community Sentiment'}
          </h2>
          {total > 0 ? (
            <SentimentBar sentimentCounts={sentimentCounts} />
          ) : (
            <p className="text-gray-400 text-sm">{language === 'hi' ? 'अभी कोई वोट नहीं' : 'No votes yet — be the first!'}</p>
          )}
        </div>

        {/* Write a Review */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {language === 'hi' ? '✍️ समीक्षा लिखें' : '✍️ Write a Review'}
          </h2>
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 p-3 bg-green-50 text-green-700 rounded-xl text-sm font-medium border border-green-200"
              >
                {language === 'hi' ? '✅ समीक्षा सबमिट हो गई! धन्यवाद।' : '✅ Review submitted! Thank you.'}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {(Object.keys(SENTIMENT_LABELS) as Sentiment[]).map(s => (
              <SentimentButton
                key={s}
                sentiment={s}
                isSelected={selectedSentiment === s}
                onClick={() => { setSelectedSentiment(s); setSubmitted(false); }}
              />
            ))}
          </div>
          <textarea
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
            placeholder={language === 'hi' ? 'टिप्पणी जोड़ें (वैकल्पिक)' : 'Add a comment (optional)'}
            className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSubmitReview}
            disabled={!selectedSentiment}
            className={`mt-3 w-full py-3 rounded-xl font-semibold text-white transition-all ${
              selectedSentiment
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {language === 'hi' ? 'समीक्षा भेजें' : 'Submit Review'}
          </button>
        </div>

        {/* Reviews list */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {language === 'hi' ? '💬 समीक्षाएं' : '💬 Reviews'} ({reviews.length})
          </h2>
          {reviews.length === 0 ? (
            <p className="text-gray-400 text-sm">{language === 'hi' ? 'अभी तक कोई समीक्षा नहीं' : 'No reviews yet'}</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border border-gray-100 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
                        {r.user[0]}
                      </span>
                      <span className="font-semibold text-gray-800 text-sm">{r.user}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full border font-medium ${sentimentColors[r.sentiment]}`}>
                      {SENTIMENT_LABELS[r.sentiment].emoji} {language === 'hi' ? SENTIMENT_LABELS[r.sentiment].hi : SENTIMENT_LABELS[r.sentiment].en}
                    </span>
                  </div>
                  {r.text && <p className="text-gray-600 text-sm">{r.text}</p>}
                  <p className="text-xs text-gray-400 mt-2">{r.date}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Directions */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {language === 'hi' ? '🗺️ दिशा निर्देश' : '🗺️ Get Directions'}
          </h2>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.name + ' ' + business.formatted_address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            🧭 {language === 'hi' ? 'Google Maps में खोलें' : 'Open in Google Maps'}
          </a>
        </div>
      </div>
    </div>
  );
}
