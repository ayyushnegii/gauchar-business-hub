'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../../hooks/useLanguage';

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const nav = [
    { href: '/', label: language === 'hi' ? 'होम' : 'Home' },
    { href: '/businesses', label: language === 'hi' ? 'खोजें' : 'Explore' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#EDE8DF]" style={{ boxShadow: '0 1px 0 #EDE8DF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between" style={{ height: '60px' }}>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
          <span className="text-2xl select-none">🏔️</span>
          <div className="leading-tight">
            <span className="font-bold text-[17px] tracking-tight" style={{ color: 'var(--brand-slate)' }}>
              Gauchar<span style={{ color: 'var(--brand-saffron)' }}>Hub</span>
            </span>
            <p className="text-[10px] text-slate-400 font-medium hidden sm:block" style={{ fontFamily: 'var(--font-hindi)' }}>गौचर का अपना बिज़नेस हब</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {nav.map(link => (
            <Link key={link.href} href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'bg-[var(--brand-saffron-light)] text-[var(--brand-saffron)]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-[var(--brand-slate)]'
              }`}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Lang toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="btn-ghost text-xs px-3 py-1.5 flex items-center gap-1.5"
            title="Switch language"
          >
            <span>{language === 'en' ? '🇮🇳' : '🇬🇧'}</span>
            <span className="font-semibold">{language === 'en' ? 'हिं' : 'EN'}</span>
          </button>

          {/* CTA */}
          <Link href="/businesses"
            className="btn-primary hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm">
            {language === 'hi' ? 'खोजें →' : 'Explore →'}
          </Link>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(o => !o)}
            className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
            aria-label="Menu">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#EDE8DF] bg-white px-4 py-3 space-y-1">
          {nav.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                pathname === link.href
                  ? 'bg-[var(--brand-saffron-light)] text-[var(--brand-saffron)]'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
