'use client';

import Link from 'next/link';
import { useLanguage } from '../../hooks/useLanguage';
import { BusinessCategory, CATEGORY_LABELS } from '../../types';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏔️</span>
            <span className="font-bold text-xl text-gray-900">Gauchar Hub</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              {t('home')}
            </Link>
            <Link href="/businesses" className="text-gray-700 hover:text-blue-600 transition-colors">
              {t('search')}
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'hi')}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm bg-white cursor-pointer"
            >
              <option value="en">{t('english')}</option>
              <option value="hi">{t('hindi')}</option>
            </select>

            {/* Sign In Button */}
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              {t('signIn')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
