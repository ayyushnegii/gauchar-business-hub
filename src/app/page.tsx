'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    window.location.href = `/businesses?q=${encodeURIComponent(query)}`;
  };

  const categories = Object.keys(CATEGORY_LABELS) as BusinessCategory[];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 px-4 overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              {language === 'hi' ? 'गौचर का अपना बिजनेस हब' : 'Gauchar Business Hub'}
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8 text-blue-100"
          >
            {language === 'hi' 
              ? 'असली अनुभवों के आधार पर सर्वश्रेष्ठ स्थान खोजें'
              : 'Find the best places based on real experiences, not just ratings'
            }
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <SearchBar onSearch={handleSearch} />
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
            {language === 'hi' ? 'श्रेणियां' : 'Explore Categories'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/businesses?category=${category}`}>
                  <CategoryCard category={category} />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Featured Businesses */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
            {language === 'hi' ? 'चुनिंदा व्यवसाय' : 'Featured Businesses'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_BUSINESSES.map((business, index) => (
              <motion.div
                key={business.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
              >
                <Link href={`/businesses/${business.id}`}>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group">
                    <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-8xl overflow-hidden">
                      {CATEGORY_LABELS[business.category].emoji}
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">{CATEGORY_LABELS[business.category].emoji}</span>
                        <span className="text-sm text-blue-600 font-medium">
                          {language === 'hi' ? CATEGORY_LABELS[business.category].hi : CATEGORY_LABELS[business.category].en}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {business.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 flex items-start gap-1">
                        <span>📍</span>
                        <span className="line-clamp-2">{business.address}</span>
                      </p>
                      {business.googleRating && (
                        <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                          <span className="text-yellow-400">⭐</span>
                          <span className="font-bold">{business.googleRating.toFixed(1)}</span>
                        </div>
                      )}
                      <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-yellow-400 to-orange-400"
                          initial={{ width: 0 }}
                          whileInView={{ width: '60%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2 text-center font-medium">
                        {language === 'hi' ? 'समुदाय भावना' : 'Community Sentiment'}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center mb-10 text-gray-900"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {language === 'hi' ? 'यह कैसे काम करता है?' : 'How It Works'}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { emoji: '🔍', title: language === 'hi' ? '1. खोजें' : '1. Search', desc: language === 'hi' ? 'अपनी आवश्यकतानुसार व्यवसाय खोजें' : 'Find businesses based on your needs' },
              { emoji: '💬', title: language === 'hi' ? '2. समीक्षा करें' : '2. Review', desc: language === 'hi' ? 'अपना अनुभव साझा करें' : 'Share your experience with others' },
              { emoji: '🏆', title: language === 'hi' ? '3. खोजें सर्वश्रेष्ठ' : '3. Discover Best', desc: language === 'hi' ? 'सर्वश्रेष्ठ व्यवसायों का पता लगाएं' : 'Find the best-rated places' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group cursor-default"
                whileHover={{ y: -10 }}
              >
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  {item.emoji}
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <motion.div
          className="max-w-2xl mx-auto text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white shadow-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 className="text-3xl font-bold mb-4">
            {language === 'hi' ? 'आज ही शुरू करें' : 'Get Started Today'}
          </h2>
          <p className="text-blue-100 mb-8">
            {language === 'hi' ? 'गौचर के सर्वश्रेष्ठ व्यवसायों की खोज करें' : 'Discover the best businesses in Gauchar'}
          </p>
          <Link href="/businesses">
            <motion.button
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {language === 'hi' ? 'अभी खोजें →' : 'Explore Now →'}
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
