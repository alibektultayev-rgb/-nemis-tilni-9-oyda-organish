import React, { useState } from 'react';
import { WEEKLY_TESTS } from '../data/testsData';
import { Award, CheckCircle2, XCircle, RefreshCw, Clock, ArrowRight, HelpCircle, AlertCircle } from 'lucide-react';

export default function QuizView({ onFinishTest }) {
  const [activeTestIndex, setActiveTestIndex] = useState(0);
  const test = WEEKLY_TESTS[activeTestIndex] || WEEKLY_TESTS[0];

  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionId, optionIndex) => {
    if (submitted) return; // once submitted, don't change
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    test.questions.forEach(q => {
      if (userAnswers[q.id] === q.correct) {
        correctCount += 1;
      }
    });
    return correctCount;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const score = calculateScore();
    if (onFinishTest) {
      onFinishTest({
        testId: test.id,
        score,
        total: test.questions.length,
        percent: Math.round((score / test.questions.length) * 100)
      });
    }
  };

  const handleReset = () => {
    setUserAnswers({});
    setSubmitted(false);
  };

  const score = calculateScore();
  const percentage = Math.round((score / test.questions.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Test Title & Info Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
              <Clock className="w-3.5 h-3.5" /> Haftalik Sinov: 15 Savol
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">{test.title}</h1>
            <p className="text-slate-400 text-sm mt-1">
              Savollarga javob bering. Yakunlaganingizdan so'ng har bir xato tahlil qilinadi!
            </p>
          </div>

          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(userAnswers).length === 0}
              className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition shadow-lg ${
                Object.keys(userAnswers).length > 0
                  ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Testni Yakunlash ({Object.keys(userAnswers).length}/{test.questions.length})
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Qaytadan topshirish</span>
            </button>
          )}
        </div>

        {/* Results Banner if Submitted */}
        {submitted && (
          <div className="mt-6 p-6 rounded-xl bg-slate-950 border border-slate-800 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
                  Imtihon Natijasi:
                </span>
                <div className="text-3xl font-extrabold text-white mt-1 flex items-baseline gap-2">
                  <span className={percentage >= 70 ? 'text-emerald-400' : 'text-amber-400'}>
                    {score} / {test.questions.length}
                  </span>
                  <span className="text-sm font-normal text-slate-400">({percentage}%)</span>
                </div>
              </div>

              <div className="text-xs text-slate-300 max-w-sm">
                {percentage >= 70 ? (
                  <span className="text-emerald-400 font-semibold">
                    🎉 Ajoyib natija! Mavzuni juda yaxshi o'zlashtirdingiz. Keyingi darslarga ishonch bilan o'tishingiz mumkin.
                  </span>
                ) : (
                  <span className="text-amber-400 font-semibold">
                    ⚠️ Diqqat! 70% dan kam to'plandi. Pastdagi xatolar tahlilini yaxshilab o'rganib chiqing!
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Question List */}
      <div className="space-y-6">
        {test.questions.map((q, idx) => {
          const selectedOption = userAnswers[q.id];
          const isAnswered = selectedOption !== undefined;
          const isCorrect = selectedOption === q.correct;

          return (
            <div
              key={q.id}
              className={`p-6 rounded-2xl border transition shadow-sm ${
                submitted
                  ? isCorrect
                    ? 'bg-slate-900/90 border-emerald-500/40'
                    : 'bg-slate-900/90 border-rose-500/40'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="font-semibold text-white text-base">
                  <span className="text-sky-400 mr-2">{idx + 1}.</span>
                  {q.question}
                </div>

                {submitted && (
                  <div>
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-4 h-4" /> To'g'ri
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        <XCircle className="w-4 h-4" /> Xato
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = selectedOption === optIdx;
                  let optStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700';

                  if (isThisSelected) {
                    optStyle = 'bg-sky-900/40 border-sky-500 text-sky-200';
                  }

                  if (submitted) {
                    if (optIdx === q.correct) {
                      optStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                    } else if (isThisSelected && !isCorrect) {
                      optStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                    } else {
                      optStyle = 'bg-slate-950/50 border-slate-800/60 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={submitted}
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={`p-3.5 rounded-xl border text-left text-sm transition flex items-center justify-between ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {submitted && optIdx === q.correct && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Detailed Explanation for every question after submit */}
              {submitted && (
                <div
                  className={`mt-4 p-4 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 ${
                    isCorrect
                      ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-950/30 border-rose-500/30 text-rose-300'
                  }`}
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-1">
                      {isCorrect ? '✅ Tushuntirish:' : '❌ Qoidani eslab qoling:'}
                    </span>
                    {q.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
