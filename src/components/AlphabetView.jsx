import React, { useState, useRef, useEffect } from 'react';
import { GERMAN_ALPHABET, UMLAUTS_AND_SPECIAL, SOUND_COMBOS } from '../data/alphabetData';
import { speakGerman, speakLetter, getBestGermanVoice } from '../utils/speech';
import { Volume2, Play, Square, Sparkles, BookA, Info, CheckCircle2, Sliders } from 'lucide-react';

export default function AlphabetView() {
  const [activeLetter, setActiveLetter] = useState(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [playMode, setPlayMode] = useState('full'); // 'full' (Harf + Misol) yoki 'letterOnly' (Faqat harf)
  const isPlayingRef = useRef(false);

  useEffect(() => {
    return () => {
      // Sahifadan chiqilganda audioni to'xtatish
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      isPlayingRef.current = false;
    };
  }, []);

  const handlePlayLetter = (item) => {
    setActiveLetter(item.letter);
    if (playMode === 'letterOnly') {
      const phoneticName = item.name.replace(/[\[\]]/g, '');
      speakGerman(phoneticName, () => setActiveLetter(null));
    } else {
      speakLetter(item.letter, () => setActiveLetter(null));
    }
  };

  const handlePlayCombo = (item) => {
    setActiveLetter(item.combo);
    speakGerman(`${item.combo}: ${item.speakText}`, () => setActiveLetter(null));
  };

  const handlePlayAll = () => {
    if (isPlayingAll) {
      isPlayingRef.current = false;
      setIsPlayingAll(false);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setActiveLetter(null);
      return;
    }

    setIsPlayingAll(true);
    isPlayingRef.current = true;

    let index = 0;
    const playNext = () => {
      if (!isPlayingRef.current || index >= GERMAN_ALPHABET.length) {
        setIsPlayingAll(false);
        isPlayingRef.current = false;
        setActiveLetter(null);
        return;
      }

      const currentItem = GERMAN_ALPHABET[index];
      setActiveLetter(currentItem.letter);

      const phrase = playMode === 'letterOnly'
        ? currentItem.name.replace(/[\[\]]/g, '')
        : `${currentItem.letter}, ${currentItem.example}`;

      speakGerman(phrase, () => {
        index++;
        if (isPlayingRef.current) {
          setTimeout(playNext, 400); // Harflar oralig'idagi tabiiy pauza
        }
      });
    };

    playNext();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 mb-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <BookA className="w-4 h-4" /> Nemis Tili Alifbosi (Das Alphabet)
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Nemis Alifbosi & Tovush Qoidalari
            </h1>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl">
              Istalgan harf ustiga bosing — nemischa toza va tiniq talaffuzini eshiting!
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Play Mode Toggle */}
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1 text-xs">
              <button
                onClick={() => setPlayMode('full')}
                className={`px-3 py-1.5 rounded-lg transition font-medium ${
                  playMode === 'full'
                    ? 'bg-sky-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Harf + Misol
              </button>
              <button
                onClick={() => setPlayMode('letterOnly')}
                className={`px-3 py-1.5 rounded-lg transition font-medium ${
                  playMode === 'letterOnly'
                    ? 'bg-sky-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Faqat Harf
              </button>
            </div>

            {/* Play All Button */}
            <button
              onClick={handlePlayAll}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg transition transform active:scale-95 ${
                isPlayingAll
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
                  : 'bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white shadow-amber-500/30'
              }`}
            >
              {isPlayingAll ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlayingAll ? 'To\'xtatish' : 'Alifboni Ketma-ket Eshitish'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 26 Standard Letters Grid */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>26 Asosiy Harf (A dan Z gacha)</span>
          </h2>
          <span className="text-xs text-slate-400">Harfni bosib talaffuzini tinglang</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {GERMAN_ALPHABET.map((item) => {
            const isActive = activeLetter === item.letter;
            return (
              <div
                key={item.letter}
                onClick={() => handlePlayLetter(item)}
                className={`group p-4 rounded-2xl border cursor-pointer transition shadow-sm text-center flex flex-col justify-between select-none ${
                  isActive
                    ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/60 scale-105 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900 border-slate-800 hover:border-sky-500 hover:bg-slate-850 hover:scale-102'
                }`}
              >
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white group-hover:text-amber-400 transition">
                    {item.letter}
                  </div>
                  <div className="text-xs font-mono font-bold text-sky-400 mt-1">
                    {item.name}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80">
                  <div className="text-xs font-semibold text-slate-200 truncate">
                    {item.example}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">
                    {item.translation}
                  </div>
                </div>

                <div className="mt-2 flex justify-center text-slate-500 group-hover:text-amber-400 transition">
                  <Volume2 className={`w-4 h-4 ${isActive ? 'text-amber-400 animate-bounce' : ''}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Umlaute & Special Characters */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-rose-400" />
          <span>Maxsus Harflar: Umlaute (Ä, Ö, Ü) va Eszett (ß)</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {UMLAUTS_AND_SPECIAL.map((item) => {
            const isActive = activeLetter === item.letter;
            return (
              <div
                key={item.letter}
                onClick={() => handlePlayLetter(item)}
                className={`group p-5 rounded-2xl border cursor-pointer transition shadow-md select-none ${
                  isActive
                    ? 'bg-rose-500/20 border-rose-400 ring-2 ring-rose-400/60 scale-105'
                    : 'bg-slate-900 border-slate-800 hover:border-rose-500 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl font-extrabold text-rose-400 group-hover:scale-110 transition">
                    {item.letter}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded bg-rose-950/60 text-rose-300 font-mono font-bold border border-rose-800/40">
                    {item.name}
                  </span>
                </div>
                <div className="text-sm font-semibold text-white mb-1">
                  Misol: {item.example}
                </div>
                <div className="text-xs text-slate-400 mb-2">
                  Ma'nosi: {item.translation}
                </div>
                <div className="text-xs text-slate-300 p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                  💡 {item.note}
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-400 group-hover:text-rose-400">
                  <span>Talaffuzni tinglash</span>
                  <Volume2 className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Crucial Sound Combinations */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Nemis Tilidagi Eng Muhim Tovush Birikmalari</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SOUND_COMBOS.map((item, i) => (
            <div
              key={i}
              onClick={() => handlePlayCombo(item)}
              className="group p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/60 cursor-pointer transition shadow-sm flex flex-col justify-between select-none"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-black text-amber-400">{item.combo}</span>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 font-bold">
                    {item.sound}
                  </span>
                </div>
                <div className="text-sm font-semibold text-white mb-1">
                  Misollar: <span className="text-sky-300 font-mono">{item.example}</span>
                </div>
                <div className="text-xs text-slate-400">
                  {item.desc}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-emerald-400">
                <span>Misollarni eshitish</span>
                <Volume2 className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
