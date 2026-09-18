import React, { useState } from 'react';
import { speakGerman } from '../utils/speech';
import { 
  Volume2, 
  ArrowLeft, 
  CheckCircle, 
  HelpCircle, 
  Sparkles, 
  BookOpen, 
  MessageSquare, 
  FileText, 
  Award, 
  AlertCircle,
  Check,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

export default function LessonViewer({ lesson, onBack, onComplete, isCompleted }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [selectedExplanations, setSelectedExplanations] = useState({});

  const stepsList = [
    { key: 'isinish', title: 'Isinish', icon: Sparkles },
    { key: 'yangi_mavzu', title: 'Yangi Mavzu', icon: BookOpen },
    { key: 'mashqlar', title: 'Mashqlar', icon: HelpCircle },
    { key: 'amaliy_dialog', title: 'Amaliy Dialog', icon: MessageSquare },
    { key: 'uy_vazifasi', title: 'Uy Vazifasi', icon: FileText },
    { key: 'xulosa', title: 'Xulosa', icon: Award }
  ];

  const currentStep = stepsList[currentStepIndex];
  const stepData = lesson.steps[currentStep.key];

  const handleSelectQuizOption = (qId, optionIndex, correctIndex, explanation) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: optionIndex }));
    setSelectedExplanations(prev => ({
      ...prev,
      [qId]: {
        isCorrect: optionIndex === correctIndex,
        text: explanation
      }
    }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Darslar ro'yxatiga qaytish</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-semibold">
            {lesson.level}
          </span>
          {isCompleted && (
            <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              <Check className="w-3.5 h-3.5" /> Bajarilgan
            </span>
          )}
        </div>
      </div>

      {/* Lesson Title Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6 shadow-xl">
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">{lesson.title}</h1>
        <p className="text-slate-400 text-sm">
          Bosqichma-bosqich tizim: har bir bo'limni diqqat bilan o'rganing va talaffuzni ovoz chiqarib takrorlang.
        </p>

        {/* 6 Step Navigation Bar */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-6">
          {stepsList.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === currentStepIndex;
            const isPassed = idx < currentStepIndex;
            return (
              <button
                key={step.key}
                onClick={() => setCurrentStepIndex(idx)}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-semibold transition ${
                  isActive
                    ? 'bg-sky-600 border-sky-500 text-white shadow-lg shadow-sky-600/30'
                    : isPassed
                    ? 'bg-slate-950 border-emerald-500/30 text-emerald-400 hover:bg-slate-800'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 mb-1" />
                <span className="truncate">{step.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Box */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl min-h-[420px] flex flex-col justify-between">
        <div>
          {/* STEP 1: ISINISH */}
          {currentStep.key === 'isinish' && stepData && (
            <div className="space-y-6 animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" /> 1. Isinish Bosqichi (Aufwärmen)
              </div>
              <h2 className="text-xl font-bold text-white">{stepData.title}</h2>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 leading-relaxed">
                {stepData.question}
              </div>
              <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/40 text-sky-200 leading-relaxed">
                <span className="font-semibold block mb-1">Dars maqsadi:</span>
                {stepData.prompt}
              </div>
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/30 text-emerald-300 text-sm">
                💡 <span className="font-semibold">Maslahat:</span> {stepData.tip}
              </div>
            </div>
          )}

          {/* STEP 2: YANGI MAVZU */}
          {currentStep.key === 'yangi_mavzu' && stepData && (
            <div className="space-y-6 animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold">
                <BookOpen className="w-3.5 h-3.5" /> 2. Yangi Mavzu & Talaffuz (Neues Thema)
              </div>
              <h2 className="text-xl font-bold text-white">{stepData.title}</h2>
              <p className="text-slate-300 text-sm">{stepData.summary}</p>

              {/* Grammar Rules Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stepData.rules?.map((rule, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-extrabold text-amber-400">{rule.combo}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-sky-900/60 text-sky-300 font-mono font-bold">
                          {rule.sound}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-200 mb-1">{rule.example}</p>
                      <p className="text-xs text-slate-400">{rule.note}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Useful Phrases with Audio */}
              <div className="mt-6">
                <h3 className="text-sm font-bold text-slate-300 mb-3 uppercase tracking-wider">
                  🔊 Ovozli amaliy iboralar (Eshitish uchun bosing):
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {stepData.phrases?.map((phrase, i) => (
                    <div
                      key={i}
                      onClick={() => speakGerman(phrase.de)}
                      className="group flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500 cursor-pointer transition"
                    >
                      <div>
                        <div className="font-semibold text-white group-hover:text-sky-300 transition flex items-center gap-2">
                          <span>{phrase.de}</span>
                          <Volume2 className="w-4 h-4 text-amber-400 opacity-80 group-hover:scale-110 transition" />
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">{phrase.uz}</div>
                      </div>
                      <span className="text-[10px] text-slate-500 bg-slate-900 px-2 py-1 rounded">DE</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: MASHQLAR */}
          {currentStep.key === 'mashqlar' && stepData && (
            <div className="space-y-6 animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold">
                <HelpCircle className="w-3.5 h-3.5" /> 3. Interaktiv Mashqlar (Übungen)
              </div>
              <h2 className="text-xl font-bold text-white">Xatolarni darhol tahlil qilish tizimi</h2>
              <p className="text-slate-400 text-sm">
                Variantni tanlang. To'g'ri yoki xatoligi darhol tushuntirish bilan ko'rsatiladi:
              </p>

              <div className="space-y-6">
                {stepData.quiz?.map((q, idx) => {
                  const userAnswer = quizAnswers[q.id];
                  const explanationData = selectedExplanations[q.id];

                  return (
                    <div key={q.id} className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="font-semibold text-white mb-3 text-base">
                        <span className="text-sky-400 mr-2">{idx + 1}.</span> {q.question}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = userAnswer === optIdx;
                          const isCorrectOption = optIdx === q.correct;
                          let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800';

                          if (userAnswer !== undefined) {
                            if (isSelected) {
                              btnStyle = isCorrectOption
                                ? 'bg-emerald-900/40 border-emerald-500 text-emerald-200'
                                : 'bg-rose-900/40 border-rose-500 text-rose-200';
                            } else if (isCorrectOption) {
                              btnStyle = 'bg-emerald-950/20 border-emerald-500/50 text-emerald-300';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectQuizOption(q.id, optIdx, q.correct, q.explanation)}
                              className={`p-3 rounded-lg border text-left text-sm font-medium transition ${btnStyle}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {/* Immediate Explanation Banner */}
                      {explanationData && (
                        <div
                          className={`mt-4 p-3 rounded-lg border text-xs leading-relaxed flex items-start gap-2.5 animate-fadeIn ${
                            explanationData.isCorrect
                              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                              : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                          }`}
                        >
                          {explanationData.isCorrect ? (
                            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <span className="font-bold block mb-0.5">
                              {explanationData.isCorrect ? '✅ Barakalla, to\'g\'ri!' : '❌ Xato javob! Repetitor tushuntirishi:'}
                            </span>
                            {explanationData.text}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: AMALIY DIALOG */}
          {currentStep.key === 'amaliy_dialog' && stepData && (
            <div className="space-y-6 animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                <MessageSquare className="w-3.5 h-3.5" /> 4. Jonli Nemischa Dialog (Dialog)
              </div>
              <h2 className="text-xl font-bold text-white">{stepData.situation}</h2>
              <p className="text-slate-400 text-sm">
                Har bir qatorni ovozli tinglang va orqasidan ovoz chiqarib takrorlang:
              </p>

              <div className="space-y-3">
                {stepData.lines?.map((line, i) => (
                  <div
                    key={i}
                    onClick={() => speakGerman(line.de)}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                        {line.speaker}:
                      </span>
                      <div className="text-base font-semibold text-white flex items-center gap-2">
                        <span>{line.de}</span>
                        <Volume2 className="w-4 h-4 text-amber-400 hover:scale-125 transition" />
                      </div>
                      <div className="text-xs text-slate-400 mt-1">{line.uz}</div>
                    </div>
                    <span className="text-xs text-slate-500">🔊 Tinglash</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: UY VAZIFASI */}
          {currentStep.key === 'uy_vazifasi' && stepData && (
            <div className="space-y-6 animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold">
                <FileText className="w-3.5 h-3.5" /> 5. Uy Vazifasi (Hausaufgabe)
              </div>
              <h2 className="text-xl font-bold text-white">Shaxsiy Repetitor Topshirig'i</h2>
              <p className="text-slate-400 text-sm">
                9 oyda B2 darajasiga yetishning siri har kungi uy vazifalarini vaqtida bajarishda:
              </p>

              <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                {stepData.tasks?.map((task, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{task}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: XULOSA */}
          {currentStep.key === 'xulosa' && stepData && (
            <div className="space-y-6 animate-fadeIn text-center max-w-xl mx-auto py-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-2">
                <Award className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-white">Dars Yakunlandi! Herzlichen Glückwunsch!</h2>
              <p className="text-slate-400 text-sm">
                Ushbu darsning barcha 6 bosqichini muvaffaqiyatli ko'rib chiqdingiz.
              </p>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left space-y-2">
                <span className="text-xs font-bold text-sky-400 uppercase">Asosiy xulosalar:</span>
                {stepData.points?.map((pt, i) => (
                  <div key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    onComplete(lesson.id);
                    onBack();
                  }}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold shadow-lg shadow-emerald-600/30 transition transform active:scale-95"
                >
                  ✓ Darsni Bajarildi Deb Saqlash (+50 XP)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Step Navigation Controls (Prev / Next) */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
            disabled={currentStepIndex === 0}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition ${
              currentStepIndex === 0
                ? 'opacity-40 cursor-not-allowed border-slate-800 text-slate-500'
                : 'border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Oldingi bosqich</span>
          </button>

          <span className="text-xs font-semibold text-slate-400">
            {currentStepIndex + 1} / {stepsList.length}
          </span>

          {currentStepIndex < stepsList.length - 1 ? (
            <button
              onClick={() => setCurrentStepIndex(prev => Math.min(stepsList.length - 1, prev + 1))}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-600/30 transition"
            >
              <span>Keyingi bosqich</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                onComplete(lesson.id);
                onBack();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 transition"
            >
              <Check className="w-4 h-4" />
              <span>Yakunlash</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
