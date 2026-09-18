import React from 'react';
import { 
  Trophy, 
  Flame, 
  Target, 
  BookCheck, 
  Calendar, 
  CheckCircle, 
  AlertTriangle,
  Zap
} from 'lucide-react';

export default function ProgressStats({ progress, completedLessons = [], testScores = [] }) {
  const totalRoadmapMonths = 9;
  const currentMonth = progress.month || 1;
  const progressPercent = Math.min(100, Math.round((completedLessons.length / 36) * 100) || 5);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
              <Zap className="w-3.5 h-3.5" /> Shaxsiy Profil & Monitor
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">9 Oylik Progress Nazorati</h1>
            <p className="text-slate-400 text-sm mt-1">
              B2 darajasiga erishish uchun har bir dars va test natijalari shu yerda tahlil qilinadi.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold text-sm">
              <Flame className="w-4 h-4" /> 1 Kunlik Streak
            </span>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
            <span>B2 Maqsad sari Umumiy Yo'l: {completedLessons.length} / 36 dars bajarildi</span>
            <span className="text-sky-400">{progressPercent}%</span>
          </div>
          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3">
            <Target className="w-5 h-5" />
          </div>
          <div className="text-xs text-slate-400 uppercase font-semibold">Joriy Daraja</div>
          <div className="text-2xl font-black text-white mt-1">{progress.level}</div>
          <div className="text-[11px] text-sky-400 mt-0.5">Maqsad: B2 Goethe</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
            <BookCheck className="w-5 h-5" />
          </div>
          <div className="text-xs text-slate-400 uppercase font-semibold">Bajarilgan Darslar</div>
          <div className="text-2xl font-black text-white mt-1">{completedLessons.length} ta</div>
          <div className="text-[11px] text-emerald-400 mt-0.5">Darslar 6 bosqichli</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
            <Trophy className="w-5 h-5" />
          </div>
          <div className="text-xs text-slate-400 uppercase font-semibold">Testlar Natijasi</div>
          <div className="text-2xl font-black text-white mt-1">
            {testScores.length > 0 ? `${testScores[testScores.length - 1].percent}%` : 'Boshlanmadi'}
          </div>
          <div className="text-[11px] text-purple-400 mt-0.5">
            {testScores.length} ta test topshirildi
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="text-xs text-slate-400 uppercase font-semibold">Qolgan Muddat</div>
          <div className="text-2xl font-black text-white mt-1">9 oy</div>
          <div className="text-[11px] text-amber-400 mt-0.5">Reja bo'yicha ketmoqda</div>
        </div>
      </div>

      {/* Strengths & Weaknesses Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
          <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Kuchli tomonlar & O'zlashtirilgan mavzular</span>
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Nemis tili o'qish qoidalari (ei, ie, sch, sp, st)</span>
            </li>
            <li className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>O'zini tanishtirish formulalari (heißen, kommen aus, wohnen in)</span>
            </li>
            <li className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Salomlashish va rasmiy murojaat usullari</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
          <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Diqqat talab qilinadigan nuqtalar (Zaif tomonlar)</span>
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Otlar artikllari: der, die, das ni doim rangi bilan yodlash tavsiya etiladi.</span>
            </li>
            <li className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Nemis tilida gap tuzilishida fe'lning 2-o'rinda kelishi ustida ko'proq mashq qiling.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
