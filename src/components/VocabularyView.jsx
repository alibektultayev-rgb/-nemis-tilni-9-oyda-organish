import React, { useState } from 'react';
import { VOCABULARY_LIST } from '../data/vocabularyData';
import { speakGerman } from '../utils/speech';
import { Volume2, Search, Filter, Sparkles } from 'lucide-react';

export default function VocabularyView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredWords = VOCABULARY_LIST.filter(item => {
    const matchesSearch = 
      item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.uz.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'all') return matchesSearch;
    if (filterType === 'der') return matchesSearch && item.article === 'der';
    if (filterType === 'die') return matchesSearch && item.article === 'die';
    if (filterType === 'das') return matchesSearch && item.article === 'das';
    if (filterType === 'verb') return matchesSearch && item.gender === 'verb';
    return matchesSearch;
  });

  const getBadgeColor = (gender) => {
    switch (gender) {
      case 'masculine':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'feminine':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      case 'neuter':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title & Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> A1 - B2 Oltin Lug'at
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Nemis Tili Lug'at Banki</h1>
            <p className="text-slate-400 text-sm mt-1">
              Nemis tilida so'zlarni doim artikli bilan yodlash shart: <span className="text-blue-400 font-semibold">der (ko'k)</span>, <span className="text-rose-400 font-semibold">die (qizil)</span>, <span className="text-emerald-400 font-semibold">das (yashil)</span>!
            </p>
          </div>

          <button
            onClick={() => speakGerman("Das ist der deutsche Wortschatz.")}
            className="self-start md:self-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <Volume2 className="w-4 h-4 text-amber-400" />
            <span>Ovoz sinovi</span>
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="So'z yoki tarjimasini qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'Barchasi' },
              { id: 'der', label: 'der (Muskul)' },
              { id: 'die', label: 'die (Feminin)' },
              { id: 'das', label: 'das (Neutral)' },
              { id: 'verb', label: 'Fe\'llar' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                  filterType === f.id
                    ? 'bg-sky-600 border-sky-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Words Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWords.map((item) => (
          <div
            key={item.id}
            onClick={() => speakGerman(item.word)}
            className="group p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500/60 hover:bg-slate-850 cursor-pointer transition shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getBadgeColor(item.gender)}`}>
                  {item.article || item.gender}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speakGerman(item.word);
                  }}
                  className="p-1.5 rounded-lg bg-slate-950 text-slate-400 group-hover:text-amber-400 group-hover:bg-slate-800 transition"
                  title="Talaffuzni tinglash"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xl font-bold text-white group-hover:text-sky-300 transition flex items-center gap-2">
                <span>{item.word}</span>
              </div>
              <div className="text-sm font-medium text-slate-400 mt-1">
                {item.uz}
              </div>
            </div>

            {item.example && (
              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <div className="text-xs text-slate-300 italic flex items-center justify-between">
                  <span>"{item.example}"</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakGerman(item.example);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-white transition ml-2"
                  >
                    🔊
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
