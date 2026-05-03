'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import BusinessCard from '../../components/business/BusinessCard';
import SearchBar from '../../components/search/SearchBar';
import SkeletonCard from '../../components/ui/SkeletonCard';
import { BusinessCategory, CATEGORY_LABELS, Sentiment, SENTIMENT_LABELS } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';
import { searchBusinessesInGauchar, GooglePlace } from '../../lib/googlePlaces';

const MOCK_SENTIMENTS: Record<string, Record<Sentiment, number>> = {
  mock_1: { perfection: 15, go_for_it: 8,  timepass: 3,  skip: 1 },
  mock_2: { perfection: 10, go_for_it: 12, timepass: 5,  skip: 2 },
  mock_3: { perfection: 5,  go_for_it: 8,  timepass: 10, skip: 3 },
  mock_4: { perfection: 12, go_for_it: 9,  timepass: 4,  skip: 1 },
  mock_5: { perfection: 18, go_for_it: 14, timepass: 3,  skip: 0 },
  mock_6: { perfection: 4,  go_for_it: 7,  timepass: 8,  skip: 5 },
  mock_7: { perfection: 30, go_for_it: 12, timepass: 2,  skip: 0 },
  mock_8: { perfection: 22, go_for_it: 10, timepass: 1,  skip: 0 },
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

function dominantSentiment(counts: Record<Sentiment, number>): Sentiment {
  return (Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]) as Sentiment;
}

function BusinessesInner() {
  const { language } = useLanguage();
  const hi = language === 'hi';
  const sp = useSearchParams();
  const categoryParam = sp.get('category') as BusinessCategory | null;
  const qParam = sp.get('q') || '';

  const [businesses, setBusinesses] = useState<GooglePlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [selCat, setSelCat] = useState<BusinessCategory | ''>(categoryParam || '');
  const [selSentiment, setSelSentiment] = useState<Sentiment | ''>('');
  const [sortBy, setSortBy] = useState<'rating' | 'reviews'>('rating');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    searchBusinessesInGauchar(selCat || undefined, qParam || undefined).then(r => {
      setBusinesses(r); setLoading(false);
    });
  }, [selCat, qParam]);

  const handleSearch = (q: string) => { window.location.href = `/businesses?q=${encodeURIComponent(q)}`; };

  const filtered = selSentiment
    ? businesses.filter(b => {
        const s = MOCK_SENTIMENTS[b.place_id] ?? { perfection:0,go_for_it:0,timepass:0,skip:0 };
        return dominantSentiment(s) === selSentiment;
      })
    : businesses;

  const sorted = [...filtered].sort((a, b) =>
    sortBy === 'reviews' ? (b.user_ratings_total ?? 0) - (a.user_ratings_total ?? 0)
                         : (b.rating ?? 0) - (a.rating ?? 0)
  );

  const categories = Object.keys(CATEGORY_LABELS) as BusinessCategory[];
  const sentiments: Sentiment[] = ['perfection','go_for_it','timepass','skip'];

  /* Sidebar filters panel (shared between desktop sidebar + mobile drawer) */
  const FiltersPanel = () => (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
          {hi ? 'श्रेणी' : 'Category'}
        </p>
        <div className="space-y-0.5">
          {(['', ...categories] as (BusinessCategory | '')[]).map(cat => {
            const active = selCat === cat;
            const info = cat ? CATEGORY_LABELS[cat] : null;
            return (
              <button key={cat || 'all'} onClick={() => { setSelCat(cat); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left ${active ? 'font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}
                style={active ? { background: 'var(--brand-saffron-light)', color: 'var(--brand-saffron)' } : {}}>
                {info ? <span>{info.emoji}</span> : <span>🗂️</span>}
                <span style={{ fontFamily: hi ? 'var(--font-hindi)' : undefined }}>
                  {cat ? (hi ? info!.hi : info!.en) : (hi ? 'सभी' : 'All categories')}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
          {hi ? 'भावना' : 'Sentiment'}
        </p>
        <div className="space-y-0.5">
          {(['', ...sentiments] as (Sentiment | '')[]).map(s => {
            const active = selSentiment === s;
            const info = s ? SENTIMENT_LABELS[s] : null;
            return (
              <button key={s || 'all'} onClick={() => { setSelSentiment(s); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left ${active ? 'font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}
                style={active ? { background: 'var(--brand-saffron-light)', color: 'var(--brand-saffron)' } : {}}>
                <span>{info ? info.emoji : '✨'}</span>
                <span style={{ fontFamily: hi ? 'var(--font-hindi)' : undefined }}>
                  {s ? (hi ? info!.hi : info!.en) : (hi ? 'सभी' : 'All sentiments')}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: 'var(--brand-cream)' }}>
      {/* Top search bar */}
      <div className="border-b border-[#EDE8DF] py-4 px-4" style={{ background: '#fff' }}>
        <div className="max-w-3xl mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-7">

        {/* Desktop sidebar */}
        <aside className="hidden md:block w-52 flex-shrink-0">
          <div className="card p-4 sticky top-20">
            <FiltersPanel />
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              {/* Mobile filter button */}
              <button onClick={() => setSidebarOpen(true)}
                className="md:hidden btn-ghost text-sm px-3 py-2 flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"/>
                </svg>
                {hi ? 'फ़िल्टर' : 'Filters'}
              </button>
              <h1 className="text-base font-bold" style={{ color: 'var(--brand-slate)' }}>
                {loading ? '…' : `${sorted.length} ${hi ? 'व्यवसाय' : sorted.length === 1 ? 'business' : 'businesses'}`}
                {qParam && <span className="text-slate-400 font-normal ml-1">for "{qParam}"</span>}
              </h1>
            </div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="text-sm border border-[#D1CAC0] rounded-lg px-3 py-2 bg-white text-slate-600 outline-none cursor-pointer hover:border-[var(--brand-saffron)] transition-colors">
              <option value="rating">{hi ? 'सर्वोच्च रेटिंग' : 'Top Rated'}</option>
              <option value="reviews">{hi ? 'सर्वाधिक समीक्षाएं' : 'Most Reviewed'}</option>
            </select>
          </div>

          {/* Active filters chips */}
          {(selCat || selSentiment) && (
            <div className="flex flex-wrap gap-2 mb-5">
              {selCat && (
                <span className="tag text-xs" style={{ background: 'var(--brand-saffron-light)', color: 'var(--brand-saffron)', border: '1px solid rgba(232,82,10,0.2)' }}>
                  {CATEGORY_LABELS[selCat].emoji} {hi ? CATEGORY_LABELS[selCat].hi : CATEGORY_LABELS[selCat].en}
                  <button onClick={() => setSelCat('')} className="ml-1.5 hover:opacity-70">×</button>
                </span>
              )}
              {selSentiment && (
                <span className="tag text-xs" style={{ background: 'var(--brand-saffron-light)', color: 'var(--brand-saffron)', border: '1px solid rgba(232,82,10,0.2)' }}>
                  {SENTIMENT_LABELS[selSentiment].emoji} {hi ? SENTIMENT_LABELS[selSentiment].hi : SENTIMENT_LABELS[selSentiment].en}
                  <button onClick={() => setSelSentiment('')} className="ml-1.5 hover:opacity-70">×</button>
                </span>
              )}
            </div>
          )}

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : sorted.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🔍</p>
              <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--brand-slate)', fontFamily: hi ? 'var(--font-hindi)' : undefined }}>
                {hi ? 'कोई व्यवसाय नहीं मिला' : 'No businesses found'}
              </h2>
              <p className="text-sm text-slate-500">{hi ? 'फ़िल्टर बदलें या दोबारा खोजें' : 'Try adjusting your filters or search.'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sorted.map(b => {
                const sc = MOCK_SENTIMENTS[b.place_id] ?? { perfection:0,go_for_it:0,timepass:0,skip:0 };
                const ds = Object.values(sc).some(v => v > 0) ? dominantSentiment(sc) : null;
                return (
                  <Link key={b.place_id} href={`/businesses/${b.place_id}`} className="block h-full">
                    <BusinessCard id={b.place_id} name={b.name} category={mapType(b.types)}
                      address={b.formatted_address} googleRating={b.rating}
                      sentimentCounts={sc} dominantSentiment={ds} />
                  </Link>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Mobile filter drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-base" style={{ color: 'var(--brand-slate)' }}>{hi ? 'फ़िल्टर' : 'Filters'}</h2>
              <button onClick={() => setSidebarOpen(false)} className="text-slate-400 text-xl">×</button>
            </div>
            <FiltersPanel />
          </div>
        </div>
      )}
    </div>
  );
}

export default function BusinessesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-[var(--brand-saffron)] border-t-transparent animate-spin" />
      </div>
    }>
      <BusinessesInner />
    </Suspense>
  );
}
