'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '../../hooks/useLanguage';
import { BusinessCategory, CATEGORY_LABELS } from '../../types';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <motion.header
      className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center gap-2 group">
              <motion.span
                className="text-3xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
              >
                🏔️
              </motion.span>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Gauchar Hub
              </span>
            </Link>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { href: '/', label: t('home') },
              { href: '/businesses', label: t('search') },
            ].map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group"
                >
                  {link.label}
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"
                    whileHover={{ width: "100%" }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'hi')}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white cursor-pointer hover:border-blue-400 transition-colors font-medium"
              >
                <option value="en">🇺🇸 EN</option>
                <option value="hi">🇮🇳 हिंदी</option>
              </select>
            </motion.div>

            {/* Sign In Button */}
            <motion.button
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {t('signIn')}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
