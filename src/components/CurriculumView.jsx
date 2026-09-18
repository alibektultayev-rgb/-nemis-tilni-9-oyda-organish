import React, { useState } from 'react';
import { MONTHS_ROADMAP } from '../data/curriculumData';
import { CheckCircle2, PlayCircle, Lock, Calendar, BookOpen, Clock, ArrowRight } from 'lucide-react';

export default function CurriculumView({ onSelectLesson, completedLessons = [] }) {
  const [selectedMonthId, setSelectedMonthId] = useState(1);
  const selectedMonth = MONTHS_ROADMAP.find(m => m.id === selectedMonthId) || MONTHS_ROADMAP[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border border-slate-800 p-6 sm:p-8 mb-8 shadow-2xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4">
            🚀 9 Oylik Intensiv B2 Reja
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Nemis Tilini Noldan Rasmiy B2 Darajagacha O'rganing
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Har bir dars: Isinish → Yangi Mavzu → Interaktiv Mashqlar → Jonli Dialog → Uy Vazifasi tartibida olib boriladi.
            Xatolar darhol tushuntirish bilan to'g'rilanadi!
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                const firstLesson = MONTHS_ROADMAP[0]?.weeks[0]?.lessons[0];
                if (firstLesson) onSelectLesson(firstLesson);
              }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-sky-500/25 transition transform active:scale-95"
            >
              <PlayCircle className="w-5 h-5" />
              <span>1-Darsni Boshlash (A1.1)</span>
            </button>
            <span className="text-xs text-slate-400">
              ✓ Barcha darslar audio talaffuz bilan ta'minlangan
            </span>
          </div>
        </div>
      </div>

      {/* 9 Months Grid Selector */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-sky-400" />
          <span>9 Oylik Bosqichlar Ro'yxati</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2">
          {MONTHS_ROADMAP.map((month) => {
            const isSelected = month.id === selectedMonthId;
            const isUnlocked = month.id <= 2; // Month 1 & 2 unlocked by default
            return (
              <button
                key={month.id}
                onClick={() => setSelectedMonthId(month.id)}
                className={`p-3 rounded-xl text-left border transition relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-sky-600/20 border-sky-500 text-white shadow-md shadow-sky-500/20'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-sky-400">{month.id}-Oy</span>
                    {month.id === 1 ? (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    ) : null}
                  </div>
                  <div className="text-sm font-semibold text-slate-200 truncate">{month.level}</div>
                </div>
                <div className="mt-2 text-[10px] text-slate-400 truncate">
                  {month.id <= 2 ? 'A1' : month.id <= 4 ? 'A2' : month.id <= 6 ? 'B1' : 'B2'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Month Details */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-block text-xs font-semibold px-2.5 py-1 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-2">
              {selectedMonth.level} Darajasi
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">{selectedMonth.title}</h3>
            <p className="text-slate-400 text-sm mt-1">{selectedMonth.description}</p>
          </div>
        </div>

        {/* Weeks & Lessons inside selected month */}
        <div className="mt-6 space-y-6">
          {selectedMonth.weeks.map((week) => (
            <div key={week.weekNum} className="border border-slate-800/80 rounded-xl p-4 bg-slate-950/40">
              <h4 className="text-sm font-bold text-sky-300 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-400" />
                <span>{week.title}</span>
              </h4>

              {week.lessons && week.lessons.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {week.lessons.map((lesson) => {
                    const isCompleted = completedLessons.includes(lesson.id);
                    return (
                      <div
                        key={lesson.id}
                        onClick={() => onSelectLesson(lesson)}
                        className="group flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/60 hover:bg-slate-800/60 cursor-pointer transition shadow-sm"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 p-2 rounded-lg ${isCompleted ? 'bg-emerald-500/10 text-emerald-400' : 'bg-sky-500/10 text-sky-400 group-hover:bg-sky-500/20'}`}>
                            {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
                          </div>
                          <div>
                            <h5 className="text-sm font-semibold text-white group-hover:text-sky-300 transition">
                              {lesson.title}
                            </h5>
                            <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-slate-500" />
                                {lesson.duration}
                              </span>
                              <span>•</span>
                              <span className="text-amber-400 font-medium">{lesson.level}</span>
                            </div>
                          </div>
                        </div>

                        <button className="text-slate-400 group-hover:text-white p-2 rounded-lg group-hover:bg-sky-600 transition">
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/50 flex items-center justify-between text-slate-400 text-sm">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-slate-500" />
                    <span>Ushbu haftaning darslari oldingi darslar yakunlangach avtomatik ochiladi.</span>
                  </div>
                  <span className="text-xs text-slate-500 bg-slate-800 px-2.5 py-1 rounded">Rejada</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
