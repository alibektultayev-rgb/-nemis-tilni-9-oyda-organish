import React from 'react';
import { BookOpen, BookA, Award, Bot, Bookmark, BarChart3, Volume2 } from 'lucide-react';
import { speakGerman } from '../utils/speech';

export default function Navbar({ activeTab, setActiveTab, progress }) {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('curriculum')}>
            <span className="text-2xl">🇩🇪</span>
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-amber-400 via-rose-400 to-sky-400 bg-clip-text text-transparent">
                Deutsch 9 Oyda B2
              </span>
              <span className="hidden sm:block text-xs text-slate-400 font-medium">Shaxsiy AI Repetitor Platformasi</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
                activeTab === 'curriculum' || activeTab === 'lesson'
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Darslar</span>
            </button>

            <button
              onClick={() => setActiveTab('alphabet')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
                activeTab === 'alphabet'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <BookA className="w-4 h-4 text-amber-400" />
              <span>Alifbo</span>
            </button>

            <button
              onClick={() => setActiveTab('tests')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
                activeTab === 'tests'
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Testlar</span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
                activeTab === 'chat'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Bot className="w-4 h-4 text-purple-300" />
              <span>Ovozli AI</span>
            </button>

            <button
              onClick={() => setActiveTab('vocab')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
                activeTab === 'vocab'
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Lug'at</span>
            </button>

            <button
              onClick={() => setActiveTab('progress')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
                activeTab === 'progress'
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Progress</span>
            </button>
          </nav>

          {/* User Status / Audio Test */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => speakGerman('Guten Tag! Willkommen beim Deutschkurs!')}
              title="Ovozni sinab ko'rish"
              className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1.5 rounded-md border border-slate-700 transition"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Ovoz (DE)</span>
            </button>

            <div className="text-right">
              <div className="text-xs font-semibold text-amber-400">1-Oy: {progress.level}</div>
              <div className="text-[10px] text-slate-400">Maqsad: B2 Goethe</div>
            </div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center font-bold text-xs text-white shadow">
              DE
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
