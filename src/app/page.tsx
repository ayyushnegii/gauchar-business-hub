'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { BusinessCategory, CATEGORY_LABELS, SENTIMENT_LABELS } from '../types';

const FEATURED = [
  { id: 'mock_7', name: 'Himalayan Café', category: 'restaurants' as BusinessCategory, address: 'Badrinath Road, Gauchar', rating: 4.7, votes: { perfection: 30, go_for_it: 12, timepass: 2, skip: 0 } },
  { id: 'mock_1', name: 'Hotel Snow View', category: 'hotels' as BusinessCategory, address: 'Main Market, Gauchar', rating: 4.5, votes: { perfection: 15, go_for_it: 8, timepass: 3, skip: 1 } },
  { id: 'mock_8', name: 'Dr. Sharma Clinic', category: 'medical' as BusinessCategory, address: 'Hospital Road, Gauchar', rating: 4.6, votes: { perfection: 22, go_for_it: 10, timepass: 1, skip: 0 } },
];

const CATEGORY_COLORS: Record<BusinessCategory, { bg: string; text: string; border: string }> = {
  hotels:      { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' },
  restaurants: { bg: '#FFF7ED', text: '#C2410C', border: '#FED7AA' },
  repair:      { bg: '#F5F3FF', text: '#7C3AED', border: '#DDD6FE' },
  grocery:     { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0' },
  medical:     { bg: '#FFF1F2', text: '#BE123C', border: '#FECDD3' },
  transport:   { bg: '#FFFBEB', text: '#B45309', border: '#FDE68A' },
};

function SentimentMini({ votes }: { votes: Record<string, number> }) {
  const total = Object.values(votes).reduce((a, b) => a + b, 0);
  if (total === 0) return null;
  const order = ['perfection', 'go_for_it', 'timepass', 'skip'] as const;
  const colors = { perfection: '#F59E0B', go_for_it: '#22C55E', timepass: '#94A3B8', skip: '#EF4444' };
  return (
    <div className="flex h-2 w-full rounded-full overflow-hidden gap-px mt-3">
      {order.map(s => {
        const pct = (votes[s] / total) * 100;
        return pct > 0 ? <div key={s} style={{ width: `${pct}%`, background: colors[s] }} title={`${s}: ${Math.round(pct)}%`} /> : null;
      })}
    </div>
  );
}

export default function HomePage() {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');
  const hi = language === 'hi';
  const categories = Object.keys(CATEGORY_LABELS) as BusinessCategory[];

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden hero-pattern" style={{ background: 'linear-gradient(135deg, var(--brand-slate) 0%, var(--brand-slate-mid) 100%)' }}>
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10" style={{ background: 'var(--brand-saffron)' }} />
        <div className="absolute bottom-0 left-10 w-48 h-48 rounded-full opacity-5" style={{ background: 'var(--brand-green-mid)' }} />

        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-28 text-center">
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
            style={{ background: 'rgba(232,82,10,0.18)', color: '#FFA07A', border: '1px solid rgba(232,82,10,0.3)' }}>
            🏔️ {hi ? 'गौचर, उत्तराखंड' : 'Gauchar, Uttarakhand'}
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight tracking-tight"
            style={{ fontFamily: hi ? 'var(--font-hindi)' : 'var(--font-sans)' }}>
            {hi ? <>गौचर का<br /><span style={{ color: 'var(--brand-saffron)' }}>अपना बिज़नेस हब</span></> 
                 : <>Gauchar's<br /><span style={{ color: '#FFA07A' }}>Business Hub</span></>}
          </h1>
          <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: hi ? 'var(--font-hindi)' : undefined }}>
            {hi ? 'असली अनुभवों के आधार पर सर्वश्रेष्ठ स्थान खोजें — सिर्फ रेटिंग नहीं'
                : 'Find the best local spots based on real community experiences, not just stars.'}
          </p>

          {/* Search box */}
          <form className="max-w-lg mx-auto flex gap-2" onSubmit={e => { e.preventDefault(); window.location.href = `/businesses?q=${encodeURIComponent(query)}`; }}>
            <div className="flex-1 flex items-center bg-white rounded-xl px-4 gap-2 shadow-lg">
              <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input value={query} onChange={e => setQuery(e.target.value)}
                placeholder={hi ? 'व्यवसाय खोजें...' : 'Search hotels, restaurants, repair...'}
                className="flex-1 py-3.5 text-sm text-slate-700 outline-none bg-transparent placeholder-slate-400" />
            </div>
            <button type="submit" className="btn-primary px-5 py-3 text-sm flex-shrink-0">
              {hi ? 'खोजें' : 'Search'}
            </button>
          </form>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.slice(0, 4).map(cat => (
              <Link key={cat} href={`/businesses?category=${cat}`}
                className="text-xs px-3 py-1.5 rounded-full font-medium transition-colors"
                style={{ background: 'rgba(255,255,255,0.1)', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.15)' }}>
                {CATEGORY_LABELS[cat].emoji} {hi ? CATEGORY_LABELS[cat].hi : CATEGORY_LABELS[cat].en}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--brand-slate)', fontFamily: hi ? 'var(--font-hindi)' : undefined }}>
              {hi ? 'श्रेणियाँ' : 'Browse by Category'}
            </h2>
            <p className="text-slate-500 text-sm mt-1">{hi ? 'अपनी ज़रूरत के हिसाब से चुनें' : 'Find exactly what you need'}</p>
          </div>
          <Link href="/businesses" className="text-sm font-semibold hidden sm:flex items-center gap-1" style={{ color: 'var(--brand-saffron)' }}>
            {hi ? 'सब देखें' : 'View all'} →
          </Link>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map(cat => {
            const c = CATEGORY_COLORS[cat];
            const info = CATEGORY_LABELS[cat];
            return (
              <Link key={cat} href={`/businesses?category=${cat}`}
                className="group flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-200 hover:-translate-y-1"
                style={{ background: c.bg, borderColor: c.border }}>
                <span className="text-3xl">{info.emoji}</span>
                <span className="text-xs font-semibold text-center leading-tight"
                  style={{ color: c.text, fontFamily: hi ? 'var(--font-hindi)' : undefined }}>
                  {hi ? info.hi : info.en}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-14 px-4" style={{ background: 'var(--brand-warm)' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: 'var(--brand-slate)', fontFamily: hi ? 'var(--font-hindi)' : undefined }}>
            {hi ? 'यह कैसे काम करता है?' : 'How It Works'}
          </h2>
          <p className="text-center text-slate-500 text-sm mb-10">{hi ? 'तीन आसान चरण' : 'Three simple steps'}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: '01', icon: '🔍', title: hi ? 'खोजें' : 'Search', desc: hi ? 'होटल, रेस्टोरेंट, मेडिकल — जो चाहिए खोजें' : 'Find hotels, restaurants, repair shops & more near Gauchar.' },
              { n: '02', icon: '🏆', title: hi ? 'भावना दें' : 'Rate', desc: hi ? 'स्टार नहीं — असली भावना: परफेक्शन, ज़रूर जाएं, टाइमपास, बचें' : 'Share sentiment — Perfection, Go for it, Timepass, or Skip.' },
              { n: '03', icon: '✨', title: hi ? 'सर्वश्रेष्ठ खोजें' : 'Discover', desc: hi ? 'समुदाय की राय से सबसे अच्छे स्थान खोजें' : 'Community picks the best spots — no ads, no sponsorships.' },
            ].map((step, i) => (
              <div key={i} className="card p-6 relative overflow-hidden">
                <span className="absolute top-4 right-4 text-5xl font-black opacity-5 select-none" style={{ color: 'var(--brand-saffron)' }}>{step.n}</span>
                <span className="text-3xl mb-4 block">{step.icon}</span>
                <h3 className="font-bold text-base mb-2" style={{ color: 'var(--brand-slate)', fontFamily: hi ? 'var(--font-hindi)' : undefined }}>{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed" style={{ fontFamily: hi ? 'var(--font-hindi)' : undefined }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ── */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--brand-slate)', fontFamily: hi ? 'var(--font-hindi)' : undefined }}>
              {hi ? 'चुनिंदा व्यवसाय' : 'Featured Businesses'}
            </h2>
            <p className="text-slate-500 text-sm mt-1">{hi ? 'समुदाय की पसंद' : 'Community favourites in Gauchar'}</p>
          </div>
          <Link href="/businesses" className="text-sm font-semibold hidden sm:flex items-center gap-1" style={{ color: 'var(--brand-saffron)' }}>
            {hi ? 'सब देखें' : 'See all'} →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURED.map(b => {
            const total = Object.values(b.votes).reduce((a, c) => a + c, 0);
            const topSentiment = Object.entries(b.votes).sort((a, c) => c[1] - a[1])[0][0] as keyof typeof SENTIMENT_LABELS;
            const cat = CATEGORY_LABELS[b.category];
            const cc = CATEGORY_COLORS[b.category];
            return (
              <Link key={b.id} href={`/businesses/${b.id}`} className="card group block p-5">
                {/* Top row */}
                <div className="flex items-start justify-between mb-3">
                  <span className="tag" style={{ background: cc.bg, color: cc.text, border: `1px solid ${cc.border}` }}>
                    {cat.emoji} {hi ? cat.hi : cat.en}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 tag">
                    ⭐ {b.rating.toFixed(1)}
                  </span>
                </div>
                {/* Name */}
                <h3 className="font-bold text-[16px] mb-1 group-hover:text-[var(--brand-saffron)] transition-colors" style={{ color: 'var(--brand-slate)' }}>
                  {b.name}
                </h3>
                <p className="text-xs text-slate-500 mb-3 flex items-center gap-1">
                  <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                  {b.address}
                </p>
                {/* Sentiment pill */}
                <span className={`tag pill-${topSentiment} mb-2`}>
                  {SENTIMENT_LABELS[topSentiment].emoji} {hi ? SENTIMENT_LABELS[topSentiment].hi : SENTIMENT_LABELS[topSentiment].en}
                </span>
                {/* Sentiment bar */}
                <SentimentMini votes={b.votes} />
                <p className="text-[11px] text-slate-400 mt-2">{total} {hi ? 'वोट' : 'votes'}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, var(--brand-slate) 0%, var(--brand-slate-mid) 100%)' }}>
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10" style={{ background: 'var(--brand-saffron)', transform: 'translate(30%, -30%)' }} />
          <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: hi ? 'var(--font-hindi)' : undefined }}>
            {hi ? 'आज ही शुरू करें' : 'Is your business listed?'}
          </h2>
          <p className="text-slate-300 mb-8 text-sm" style={{ fontFamily: hi ? 'var(--font-hindi)' : undefined }}>
            {hi ? 'गौचर के सर्वश्रेष्ठ व्यवसाय खोजें और अपनी समीक्षा साझा करें'
                : 'Help your community discover great local businesses. No cost, no ads — just honest reviews.'}
          </p>
          <Link href="/businesses" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-base">
            {hi ? 'अभी खोजें →' : 'Explore Businesses →'}
          </Link>
        </div>
      </section>
    </div>
  );
}
