import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { GLOSSARY_ENTRIES } from '../../data/conceptMapAndGlossary';
import { MathText } from '../MathText';

export const KamusFisikaView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('Semua');

  const categories = [
    'Semua',
    'Besaran Vektor',
    'Besaran Skalar',
    'Hukum & Prinsip',
    'Matematika Fisika',
  ];

  const filtered = GLOSSARY_ENTRIES.filter((entry) => {
    const matchCat = category === 'Semua' || entry.category === category;
    const q = query.trim().toLowerCase();
    const matchText =
      !q ||
      entry.term.toLowerCase().includes(q) ||
      entry.definition.toLowerCase().includes(q) ||
      entry.symbol.toLowerCase().includes(q);
    return matchCat && matchText;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-slate-900">
          Kamus Fisika – Istilah, Simbol, Satuan & Dimensi
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Referensi cepat seluruh besaran dan prinsip Fisika yang digunakan pada Soal Nomor 10 beserta 15 soal pengembangannya.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <label htmlFor="glossary-search" className="sr-only">
            Cari istilah fisika
          </label>
          <input
            id="glossary-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari istilah, simbol, atau definisi..."
            className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="flex flex-wrap gap-1 p-1 bg-slate-100 rounded-xl">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                category === cat
                  ? 'bg-white text-teal-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Glossary Cards */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          Tidak ditemukan istilah yang cocok dengan pencarian Anda.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((entry) => (
            <div key={entry.id} className="rounded-xl border border-slate-200 bg-white p-5 space-y-2.5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold text-teal-700">{entry.category}</div>
                  <h3 className="text-base font-display font-bold text-slate-900 mt-0.5">
                    {entry.term}
                  </h3>
                </div>
                <div className="rounded-lg border border-teal-200 bg-teal-50 px-3 py-1.5 text-sm font-semibold text-teal-900 shrink-0">
                  <MathText text={`$${entry.symbol}$`} />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-xs text-slate-600 font-mono-tabular">
                <span>Satuan: <strong className="text-slate-900">{entry.unit}</strong></span>
                <span aria-hidden="true">·</span>
                <span>Dimensi: <strong className="text-slate-900">{entry.dimension}</strong></span>
              </div>

              <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                {entry.definition}
              </p>

              <div className="pt-2 border-t border-slate-100 text-xs text-emerald-900">
                <span className="font-semibold">Konteks Soal #10: </span>
                {entry.exampleInSoal10}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
