import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Volume2, 
  Mic, 
  MicOff, 
  Sparkles, 
  AlertCircle, 
  CheckCircle, 
  VolumeX, 
  PhoneCall, 
  PhoneOff, 
  RefreshCw, 
  RotateCcw, 
  FileCheck2, 
  Layers, 
  MessageSquare, 
  Coffee, 
  Plane, 
  Briefcase, 
  Home, 
  HeartHandshake
} from 'lucide-react';
import { speakGerman } from '../utils/speech';

// Real hayotiy mavzular
const TOPICS = [
  { id: 'kennenlernen', title: 'Tanishuv & Hol-ahvol', icon: HeartHandshake, deTitle: 'Kennenlernen & Begrüßung' },
  { id: 'cafe', title: 'Kafeda buyurtma', icon: Coffee, deTitle: 'Im Café bestellen' },
  { id: 'reisen', title: 'Sayohat & Aeroport', icon: Plane, deTitle: 'Reisen & Flughafen' },
  { id: 'arbeit', title: 'Ish va Kasb', icon: Briefcase, deTitle: 'Arbeit & Beruf' },
  { id: 'familie', title: 'Oila & Bo\'sh vaqt', icon: Home, deTitle: 'Familie & Hobbys' }
];

// Mavzular bo'yicha boshlang'ich savollar (darajaga mos)
const INITIAL_PROMPTS = {
  kennenlernen: {
    A1: {
      text: "Hallo! Qalaysiz? Keling, do'stona tanishamiz! Wie heißt du und wie geht es dir heute?",
      dePhrase: "Hallo! Wie heißt du und wie geht es dir?",
      expectedType: 'name_and_mood'
    },
    B1: {
      text: "Hallo! Schön dich kennenzulernen. Erzähl mal ein bisschen über dich: Woher kommst du und wie lange lernst du schon Deutsch?",
      dePhrase: "Hallo! Woher kommst du und wie lange lernst du Deutsch?",
      expectedType: 'intro_b1'
    }
  },
  cafe: {
    A1: {
      text: "Guten Tag! Kafega xush kelibsiz. Ich bin der Kellner. Was möchten Sie trinken? (Kofe, choy yoki suv?)",
      dePhrase: "Guten Tag! Was möchten Sie trinken?",
      expectedType: 'order'
    },
    B1: {
      text: "Herzlich willkommen in unserem Café! Haben Sie schon gewählt oder soll ich Ihnen eine Empfehlung geben?",
      dePhrase: "Herzlich willkommen! Was darf ich Ihnen bringen?",
      expectedType: 'order'
    }
  },
  reisen: {
    A1: {
      text: "Guten Tag! Aeroportdamiz. Wohin fliegen Sie? (Qayerga uchmoqchisiz?) Masalan: «Ich fliege nach Berlin».",
      dePhrase: "Guten Tag! Wohin fliegen Sie?",
      expectedType: 'destination'
    }
  },
  arbeit: {
    A1: {
      text: "Hallo! Ish haqida gaplashamiz: Was bist du von Beruf? (Kasbingiz nima?)",
      dePhrase: "Was bist du von Beruf?",
      expectedType: 'profession'
    }
  },
  familie: {
    A1: {
      text: "Hallo! Oila haqida: Hast du Geschwister? (Aka-uka yoki opa-singling bormi?)",
      dePhrase: "Hast du Geschwister?",
      expectedType: 'family'
    }
  }
};

export default function ChatTutor() {
  const [level, setLevel] = useState('A1'); // A1, A2, B1, B2
  const [selectedTopic, setSelectedTopic] = useState('kennenlernen');
  const [viewMode, setViewMode] = useState('call'); // 'call' (Jonli qo'ng'iroq) yoki 'chat' (Yozishma)
  const [autoSpeak, setAutoSpeak] = useState(true);

  // Suhbat holatlari
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [micStatus, setMicStatus] = useState(''); // 'listening', 'no-speech', 'error'

  // Xatoni tuzatish tizimi (3 va 4-qoidalar)
  const [correctionState, setCorrectionState] = useState(null); 
  // { mustRepeat: true, correctDe: '...', wrongText: '...', explanationUz: '...' }

  // Statistikalar va Xatolar hisoboti (6-qoida)
  const [sessionMistakes, setSessionMistakes] = useState([]);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Dastlabki xabarni yuklash
  useEffect(() => {
    startNewTopic(selectedTopic, level);
  }, [selectedTopic, level]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startNewTopic = (topicId, currentLevel) => {
    const topicData = INITIAL_PROMPTS[topicId]?.[currentLevel] || INITIAL_PROMPTS[topicId]?.['A1'] || INITIAL_PROMPTS['kennenlernen']['A1'];
    const initialMsg = {
      id: Date.now(),
      sender: 'tutor',
      text: topicData.text,
      dePhrase: topicData.dePhrase,
      isInitial: true
    };
    setMessages([initialMsg]);
    setCorrectionState(null);
    if (autoSpeak && topicData.dePhrase) {
      setTimeout(() => speakGerman(topicData.dePhrase), 400);
    }
  };

  // Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = level === 'B2' ? 'de-DE' : 'de-DE';

        recognition.onstart = () => {
          setIsListening(true);
          setMicStatus('listening');
        };

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsListening(false);
          setMicStatus('');
          handleUserResponse(transcript);
        };

        recognition.onerror = (event) => {
          console.warn('Ovoz yozish xatosi:', event.error);
          setIsListening(false);
          setMicStatus(event.error === 'no-speech' ? 'no-speech' : 'error');
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } catch (e) {
        console.error("SpeechRecognition error:", e);
      }
    }
  }, [level]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Brauzeringiz mikrofoni qo'llab-quvvatlanmaydi. Iltimos, Chrome yoki Edge brauzeridan foydalaning.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setMicStatus('');
    } else {
      setMicStatus('listening');
      try {
        recognitionRef.current.lang = 'de-DE';
        recognitionRef.current.start();
      } catch (err) {
        try {
          recognitionRef.current.stop();
          setTimeout(() => recognitionRef.current?.start(), 150);
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  // Xatoni aniqlash va tuzatish algoritmi (3-qoida)
  const analyzeErrors = (userText) => {
    const lower = userText.toLowerCase().trim();

    // 1. Agar foydalanuvchi hozir xatoni takrorlab to'g'rilayotgan bo'lsa
    if (correctionState && correctionState.mustRepeat) {
      const target = correctionState.correctDe.toLowerCase().replace(/[^a-zäöüß\s]/g, '');
      const spoken = lower.replace(/[^a-zäöüß\s]/g, '');

      // Qisman yoki to'liq mos kelishini tekshirish
      if (spoken.includes(target) || target.includes(spoken) || spoken.length > 5) {
        return { isRepeatSuccess: true };
      } else {
        return { isRepeatFail: true };
      }
    }

    // 2. Oddiy suhbatdagi keng tarqalgan xatolar:
    // Xato: "Ich wohnen" yoki "Ich kommen" (fe'l noo'rin noaniq shaklda)
    if (lower.includes('ich wohnen')) {
      return {
        hasError: true,
        category: "Fe'l tuslanishi (-e qo'shimchasi)",
        wrongPart: "ich wohnen",
        correctDe: "Ich wohne in Taschkent.",
        explanationUz: "Nemis tilida 'ich' (men) shaxsida fe'lga '-en' emas, '-e' qo'shiladi: 'Ich wohne'."
      };
    }
    if (lower.includes('ich kommen')) {
      return {
        hasError: true,
        category: "Fe'l tuslanishi (-e qo'shimchasi)",
        wrongPart: "ich kommen",
        correctDe: "Ich komme aus Usbekistan.",
        explanationUz: "'ich' bilan fe'l doim '-e' oladi: 'Ich komme', 'kommen' emas."
      };
    }
    // Xato: "in Usbekistan" (kelib chiqish uchun)
    if (lower.includes('komme in') || lower.includes('bin in usbekistan') && !lower.includes('aus')) {
      if (lower.includes('komme in')) {
        return {
          hasError: true,
          category: "Predlog xatosi (aus vs in)",
          wrongPart: "komme in",
          correctDe: "Ich komme aus Usbekistan.",
          explanationUz: "Mamlakatdan kelib chiqishni ifodalashda 'in' emas, 'aus' (ichidan/dan) predlogi ishlatiladi."
        };
      }
    }
    // Xato: "Ich heiße Ali" o'rniga "Ich bin heiße"
    if (lower.includes('bin heiße') || lower.includes('bin heisse')) {
      return {
        hasError: true,
        category: "Ortiqcha fe'l (sein + heißen)",
        wrongPart: "bin heiße",
        correctDe: "Ich heiße Ali.",
        explanationUz: "Yo 'Ich heiße...' yoki 'Ich bin...' deb aytiladi. Ikkalasini birdan qo'shib bo'lmaydi."
      };
    }
    // Xato: "wie geht" o'rniga "wie bist du"
    if (lower.includes('wie bist du')) {
      return {
        hasError: true,
        category: "Hol-ahvol so'rash iborasi",
        wrongPart: "wie bist du",
        correctDe: "Wie geht es dir?",
        explanationUz: "Nemis tilida 'Qalaysan?' so'zi 'Wie geht es dir?' deb so'raladi, 'Wie bist du' deyilmaydi."
      };
    }

    return { hasError: false };
  };

  // Foydalanuvchi javobini qayta ishlash
  const handleUserResponse = (textToSend) => {
    const userText = (textToSend || input).trim();
    if (!userText) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: userText
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const errorResult = analyzeErrors(userText);

    setTimeout(() => {
      // 1-HOLAT: Xato takrorlanayotgan bo'lsa va to'g'ri aytilgan bo'lsa
      if (errorResult.isRepeatSuccess) {
        setCorrectionState(null);
        let nextQuestion = "";
        let dePhrase = "";

        if (selectedTopic === 'kennenlernen') {
          nextQuestion = "Barakalla! Endi to'g'ri bo'ldi. Suhbatimizni davom ettiramiz: Was machst du beruflich? (Nima ish qilasiz yoki o'qiysizmi?)";
          dePhrase = "Sehr gut! Was machst du beruflich?";
        } else if (selectedTopic === 'cafe') {
          nextQuestion = "Ajoyib, to'g'ri aytdingiz! Möchten Sie auch etwas essen? (Biron narsa yeysizmi? Masalan: Kuchen / tort).";
          dePhrase = "Perfekt! Möchten Sie auch einen Kuchen?";
        } else {
          nextQuestion = "Barakalla! Gap to'g'ri tuzildi. Davom etamiz: Wie gefällt dir das Wetter heute? (Bugungi ob-havo qalay?)";
          dePhrase = "Sehr gut! Wie ist das Wetter heute?";
        }

        const replyMsg = {
          id: Date.now() + 1,
          sender: 'tutor',
          text: `✅ ${nextQuestion}`,
          dePhrase: dePhrase,
          isPraise: true
        };

        setMessages(prev => [...prev, replyMsg]);
        setIsTyping(false);
        if (autoSpeak && dePhrase) speakGerman(dePhrase);
        return;
      }

      // 2-HOLAT: Xato aniqlandi — 3-QOIDA ISHGA TUSHADI:
      // a) Suhbat to'xtatiladi
      // b) 1-2 gapda o'zbekcha tushuntirilib, to'g'ri nemischa varianti beriladi
      // c) Foydalanuvchidan to'g'ri aytish so'raladi
      if (errorResult.hasError) {
        // Xatolar hisobotiga saqlash
        setSessionMistakes(prev => [
          ...prev, 
          { 
            category: errorResult.category, 
            wrong: errorResult.wrongPart, 
            correct: errorResult.correctDe, 
            time: new Date().toLocaleTimeString() 
          }
        ]);

        setCorrectionState({
          mustRepeat: true,
          correctDe: errorResult.correctDe,
          explanationUz: errorResult.explanationUz
        });

        const correctionMsg = {
          id: Date.now() + 1,
          sender: 'tutor',
          text: `⚠️ To'xtang, bu yerda kichik bir xato bor:\n\n${errorResult.explanationUz}\n\nTo'g'ri aytilishi: «${errorResult.correctDe}»\n\nQani, do'stim, endi shu gapni to'g'rilab ovoz chiqarib ayting-chi!`,
          dePhrase: errorResult.correctDe,
          isCorrection: true
        };

        setMessages(prev => [...prev, correctionMsg]);
        setIsTyping(false);
        if (autoSpeak && errorResult.correctDe) {
          speakGerman(`Achtung. ${errorResult.correctDe}`);
        }
        return;
      }

      // 3-HOLAT: Xato yo'q, tabiiy do'stona suhbat davom etadi! (1-qoida)
      let replyText = "";
      let deAudio = "";
      const lower = userText.toLowerCase();

      if (lower.includes('heiße') || lower.includes('ich bin')) {
        replyText = "Sehr schön! Tanishganimdan juda xursandman. Qayerdansiz va qaysi shaharda yashaysiz? (Woher kommst du und wo wohnst du?)";
        deAudio = "Sehr schön, freut mich! Woher kommst du?";
      } else if (lower.includes('gut') || lower.includes('danke')) {
        replyText = "Super! Kuningiz yaxshi o'tayotganidan xursandman. Bugun nimalar qilyapsiz? (Was machst du heute?)";
        deAudio = "Super! Was machst du heute Schönes?";
      } else if (lower.includes('kaffee') || lower.includes('wasser') || lower.includes('tee')) {
        replyText = "Sehr gerne! Bir daqiqada tayyorlayman. Ist das alles oder möchten Sie noch etwas? (Yana biror narsa buyurasizmi?)";
        deAudio = "Sehr gerne! Möchten Sie noch etwas dazu?";
      } else {
        replyText = "Juda yaxshi! Siz bilan suhbatlashish maroqli. Siz nemis tilini nima maqsadda o'rganyapsiz — Germaniyada ishlashmi yoki o'qishmi? (Warum lernst du Deutsch?)";
        deAudio = "Interessant! Warum lernst du eigentlich Deutsch?";
      }

      const normalMsg = {
        id: Date.now() + 1,
        sender: 'tutor',
        text: replyText,
        dePhrase: deAudio
      };

      setMessages(prev => [...prev, normalMsg]);
      setIsTyping(false);
      if (autoSpeak && deAudio) speakGerman(deAudio);

    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-[calc(100vh-7.5rem)] flex flex-col">
      {/* Top Header: Topic & Level Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-4 shadow-xl flex flex-wrap items-center justify-between gap-3">
        {/* Left: Avatar & Mode */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-600/30">
              <Bot className="w-6 h-6" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-white">Shaxsiy Ovozli Repetitor</h2>
              <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Jonli Ovozda
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Do'stona jonli suhbat • Xatoni darhol to'xtatib to'g'rilash tizimi
            </p>
          </div>
        </div>

        {/* Center: Real-life Topic Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {TOPICS.map(t => {
            const Icon = t.icon;
            const isSelected = selectedTopic === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTopic(t.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.title}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Level & View Controls */}
        <div className="flex items-center gap-2">
          {/* Level Switcher */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            {['A1', 'A2', 'B1', 'B2'].map(lvl => (
              <button
                key={lvl}
                onClick={() => setLevel(lvl)}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  level === lvl ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Mode Switcher: Call vs Chat */}
          <button
            onClick={() => setViewMode(prev => prev === 'call' ? 'chat' : 'call')}
            className={`p-2 rounded-xl border transition ${
              viewMode === 'call'
                ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400'
                : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
            title={viewMode === 'call' ? "Matnli rejimga o'tish" : "Jonli qo'ng'iroq rejimiga o'tish"}
          >
            {viewMode === 'call' ? <PhoneCall className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
          </button>

          {/* End Call & Report Button */}
          <button
            onClick={() => setShowSummaryModal(true)}
            className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-amber-400 px-3 py-1.5 rounded-xl border border-slate-700 transition font-semibold"
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Hisobot</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: JONLI QO'NG'IROQ (LIVE CALL UI) */}
      {viewMode === 'call' ? (
        <div className="flex-1 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col justify-between items-center relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Topic Badge */}
          <div className="flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 shadow">
            <span>Suhbat mavzusi:</span>
            <span className="text-purple-400 font-bold">
              {TOPICS.find(t => t.id === selectedTopic)?.deTitle}
            </span>
          </div>

          {/* Main Visualizer & Voice Bubble */}
          <div className="flex flex-col items-center text-center max-w-xl my-auto w-full">
            {/* Animated Call Avatar */}
            <div className="relative mb-6">
              <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${
                isListening
                  ? 'bg-rose-500/20 ring-8 ring-rose-500/30 scale-105'
                  : isTyping
                  ? 'bg-purple-500/20 ring-8 ring-purple-500/30 animate-pulse'
                  : 'bg-gradient-to-tr from-purple-600 to-sky-600 shadow-purple-600/40'
              }`}>
                {isListening ? (
                  <Mic className="w-12 h-12 text-rose-400 animate-bounce" />
                ) : (
                  <Bot className="w-12 h-12 text-white" />
                )}
              </div>

              {/* Real-time speech status tag */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-bold px-3 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-200 shadow">
                {isListening ? "🎙️ Siz gapiryapsiz..." : isTyping ? "Repetitor o'ylamoqda..." : "Eshitishga tayyor"}
              </div>
            </div>

            {/* Last Tutor Prompt / Message */}
            <div className="w-full bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur">
              <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed whitespace-pre-line">
                {messages[messages.length - 1]?.text}
              </p>

              {messages[messages.length - 1]?.dePhrase && (
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-center gap-3">
                  <span className="text-sm font-mono text-amber-400 font-semibold">
                    🇩🇪 "{messages[messages.length - 1]?.dePhrase}"
                  </span>
                  <button
                    onClick={() => speakGerman(messages[messages.length - 1]?.dePhrase)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 transition"
                    title="Qayta tinglash"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* ERROR REPETITION ALERT CARD (3-Qoida: To'xtatish va qaytadan ayttirish) */}
            {correctionState && correctionState.mustRepeat && (
              <div className="mt-4 w-full p-4 rounded-2xl bg-amber-500/15 border-2 border-amber-500/40 text-left animate-fadeIn">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-amber-300 uppercase block mb-1">
                      ⚠️ 3-Qoida: Suhbat to'xtatildi. Gapni to'g'ri ayting:
                    </span>
                    <p className="text-sm font-bold text-white mb-2">
                      «{correctionState.correctDe}»
                    </p>
                    <p className="text-xs text-slate-300 mb-3">
                      {correctionState.explanationUz}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => speakGerman(correctionState.correctDe)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs shadow hover:bg-amber-400 transition"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Talaffuzni eshitish</span>
                      </button>
                      <span className="text-[11px] text-amber-200">
                        Pastdagi mikrofonni bosib, shuni ayting!
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action Controls */}
          <div className="w-full max-w-md flex flex-col items-center gap-3">
            {/* Big Push-To-Talk Voice Button */}
            <button
              onClick={toggleListening}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl transform active:scale-95 ${
                isListening
                  ? 'bg-rose-600 hover:bg-rose-500 text-white ring-8 ring-rose-600/30 scale-110'
                  : 'bg-gradient-to-tr from-sky-500 to-purple-600 hover:from-sky-400 hover:to-purple-500 text-white shadow-purple-600/40 hover:scale-105'
              }`}
            >
              {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </button>
            <span className="text-xs font-semibold text-slate-400">
              {isListening ? "Tinglamoqdaman... Gapirib bo'lgach to'xtating" : "Mikrofonni bosing va gapiring"}
            </span>

            {/* Text backup input */}
            <div className="w-full flex items-center gap-2 mt-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUserResponse()}
                placeholder="Yoki yozma javob bering..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
              <button
                onClick={() => handleUserResponse()}
                className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* VIEW MODE 2: CHAT LOG (MATNLI SUHBAT TARIXI) */
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between overflow-hidden shadow-xl">
          <div className="flex-1 overflow-y-auto space-y-4 p-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'tutor' && (
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white shrink-0 mt-1 shadow">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[80%] rounded-2xl p-4 text-sm ${
                  msg.sender === 'user'
                    ? 'bg-sky-600 text-white rounded-tr-none'
                    : msg.isCorrection
                    ? 'bg-amber-950/40 border border-amber-500/40 text-amber-100 rounded-tl-none'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                }`}>
                  <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>

                  {msg.dePhrase && (
                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <span className="text-xs text-amber-400 font-mono italic">
                        🇩🇪 "{msg.dePhrase}"
                      </span>
                      <button
                        onClick={() => speakGerman(msg.dePhrase)}
                        className="p-1 hover:bg-slate-800 rounded text-amber-400 transition"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-sky-600 flex items-center justify-center text-white shrink-0 mt-1 shadow">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleUserResponse(); }} className="flex items-center gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={toggleListening}
              className={`p-3 rounded-xl transition ${isListening ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-950 text-amber-400 border border-slate-800'}`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Yozing yoki mikrofon orqali gapiring..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
            <button type="submit" className="p-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* SUMMARY / MISTAKES REPORT MODAL (6-Qoida) */}
      {showSummaryModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-6 h-6 text-emerald-400" />
                <h3 className="text-xl font-bold text-white">Suhbat Yakuni & Xatolar Hisoboti</h3>
              </div>
              <button
                onClick={() => setShowSummaryModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm mb-6">
              Bugungi jonli muloqot davomida tahlil qilingan asosiy xatolar va repetitor tavsiyalari:
            </p>

            {sessionMistakes.length > 0 ? (
              <div className="space-y-3 max-h-60 overflow-y-auto mb-6 pr-1">
                {sessionMistakes.map((m, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                    <div className="font-semibold text-amber-400 mb-1">
                      {idx + 1}. Qoida: {m.category}
                    </div>
                    <div className="text-slate-400">
                      Noto'g'ri: <span className="text-rose-400 line-through mr-2">{m.wrong}</span>
                      To'g'ri: <span className="text-emerald-400 font-bold">{m.correct}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-center text-sm font-semibold mb-6">
                🎉 Ajoyib! Bugungi suhbatda birorta ham jiddiy xato qilmadingiz!
              </div>
            )}

            <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-800/40 text-xs text-sky-200 mb-6">
              💡 <span className="font-bold">Repetitor tavsiyasi:</span> Xatolardan qo'rqmang. Har kuni 10 daqiqa jonli gaplashish kitob o'qishdan 5 barobar samaraliroq!
            </div>

            <button
              onClick={() => {
                setShowSummaryModal(false);
                setSessionMistakes([]);
              }}
              className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm transition shadow-lg shadow-sky-600/30"
            >
              Tushundim, Yangi Suhbatni Boshlash
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
