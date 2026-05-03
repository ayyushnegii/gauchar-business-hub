'use client';
import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

export default function SearchBar({ onSearch, placeholder }: { onSearch: (q: string) => void; placeholder?: string }) {
  const [query, setQuery] = useState('');
  const { language } = useLanguage();
  const hi = language === 'hi';

  return (
    <form onSubmit={e => { e.preventDefault(); onSearch(query); }}
      className="w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-2 p-1.5 bg-white rounded-xl shadow-sm border border-[#EDE8DF]">
        <div className="flex items-center gap-2 flex-1 px-3">
          <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input type="text" value={query} onChange={e => setQuery(e.target.value)}
            placeholder={placeholder || (hi ? 'व्यवसाय खोजें...' : 'Search businesses...')}
            className="flex-1 py-2.5 text-sm outline-none bg-transparent text-slate-700 placeholder-slate-400"
            style={{ fontFamily: hi ? 'var(--font-hindi)' : undefined }} />
          {query && (
            <button type="button" onClick={() => setQuery('')}
              className="text-slate-300 hover:text-slate-500 transition-colors text-lg leading-none">
              ×
            </button>
          )}
        </div>
        <button type="submit" className="btn-primary px-5 py-2.5 text-sm flex-shrink-0">
          {hi ? 'खोजें' : 'Search'}
        </button>
      </div>
    </form>
  );
}
