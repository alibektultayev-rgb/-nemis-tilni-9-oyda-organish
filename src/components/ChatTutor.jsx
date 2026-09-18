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
  FileCheck2, 
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
  { id: 'arbeit', title: 'Ish va Kasb', icon: Briefcase, deTitle: 'Arbeit & Beruf' },
  { id: 'cafe', title: 'Kafeda buyurtma', icon: Coffee, deTitle: 'Im Café bestellen' },
  { id: 'reisen', title: 'Sayohat & Aeroport', icon: Plane, deTitle: 'Reisen & Flughafen' },
  { id: 'familie', title: 'Oila & Bo\'sh vaqt', icon: Home, deTitle: 'Familie & Hobbys' }
];

// Mavzular bo'yicha boshlang'ich savollar
const INITIAL_PROMPTS = {
  kennenlernen: {
    A1: {
      text: "Hallo! Qalaysiz, do'stim? Keling, tanishamiz! Wie heißt du und wie geht es dir heute?",
      dePhrase: "Hallo! Wie heißt du und wie geht es dir?",
    },
    B1: {
      text: "Hallo! Schön dich kennenzulernen. Erzähl mal ein bisschen über dich: Woher kommst du?",
      dePhrase: "Hallo! Woher kommst du und wie lange lernst du Deutsch?",
    }
  },
  arbeit: {
    A1: {
      text: "Hallo! Ish va kasb haqida gaplashamiz: Was bist du von Beruf? (Kasbingiz nima? Masalan: dasturchi, talaba, shifokor...)",
      dePhrase: "Hallo! Was bist du von Beruf?",
    },
    B1: {
      text: "Guten Tag! Was machst du beruflich? Arbeitest du schon oder studierst du noch?",
      dePhrase: "Was machst du beruflich? Arbeitest du schon?",
    }
  },
  cafe: {
    A1: {
      text: "Guten Tag! Kafega xush kelibsiz. Ich bin der Kellner. Was möchten Sie trinken? (Kofe, choy yoki suv?)",
      dePhrase: "Guten Tag! Was möchten Sie trinken?",
    }
  },
  reisen: {
    A1: {
      text: "Guten Tag! Aeroportdamiz. Wohin fliegen Sie? (Qayerga uchmoqchisiz?) Masalan: «Ich fliege nach Berlin».",
      dePhrase: "Guten Tag! Wohin fliegen Sie?",
    }
  },
  familie: {
    A1: {
      text: "Hallo! Oila haqida: Hast du Geschwister? (Aka-uka yoki opa-singling bormi?)",
      dePhrase: "Hast du Geschwister?",
    }
  }
};

export default function ChatTutor() {
  const [level, setLevel] = useState('A1'); // A1, A2, B1, B2
  const [selectedTopic, setSelectedTopic] = useState('arbeit'); // default to user's screen
  const [viewMode, setViewMode] = useState('call'); // 'call' yoki 'chat'
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [continuousCall, setContinuousCall] = useState(true); // Doimiy muloqot: bot gapirib bo'lgach mikrofoni avtomatik ochadi!

  // Suhbat holatlari
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [micStatus, setMicStatus] = useState('');

  // Xatoni tuzatish (3 va 4-qoidalar)
  const [correctionState, setCorrectionState] = useState(null);

  // Xatolar hisoboti
  const [sessionMistakes, setSessionMistakes] = useState([]);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

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
      setTimeout(() => {
        speakGerman(topicData.dePhrase, () => {
          if (continuousCall) setTimeout(startListeningSafely, 500);
        });
      }, 500);
    }
  };

  // Speech Recognition sozlash (Nemis va O'zbekcha nutqni qabul qilish)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'de-DE'; // nemis tilidagi talaffuz uchun

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

  const startListeningSafely = () => {
    try {
      if (recognitionRef.current && !isListening) {
        recognitionRef.current.lang = 'de-DE';
        recognitionRef.current.start();
        setIsListening(true);
        setMicStatus('listening');
      }
    } catch (e) {
      console.warn("Mikrofonni qayta ochish:", e);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Brauzeringiz mikrofoni qo'llab-quvvatlanmaydi. Chrome yoki Edge brauzeridan foydalaning.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setMicStatus('');
    } else {
      startListeningSafely();
    }
  };

  // O'zbek va nemis tillaridagi xatolarni aniqlash
  const analyzeErrors = (userText) => {
    const lower = userText.toLowerCase().trim();

    // 1. Agar xatoni takrorlayotgan bo'lsa
    if (correctionState && correctionState.mustRepeat) {
      const target = correctionState.correctDe.toLowerCase().replace(/[^a-zäöüß\s]/g, '');
      const spoken = lower.replace(/[^a-zäöüß\s]/g, '');

      if (spoken.includes(target) || target.includes(spoken) || spoken.length > 4) {
        return { isRepeatSuccess: true };
      } else {
        return { isRepeatFail: true };
      }
    }

    // 2. Grammatik xatolar tahlili:
    if (lower.includes('ich wohnen')) {
      return {
        hasError: true,
        category: "Fe'l tuslanishi (-e qo'shimchasi)",
        wrongPart: "ich wohnen",
        correctDe: "Ich wohne in Taschkent.",
        explanationUz: "To'xtang: 'ich' bilan fe'lga '-en' emas, '-e' qo'shiladi: 'Ich wohne'."
      };
    }
    if (lower.includes('ich kommen')) {
      return {
        hasError: true,
        category: "Fe'l tuslanishi (-e qo'shimchasi)",
        wrongPart: "ich kommen",
        correctDe: "Ich komme aus Usbekistan.",
        explanationUz: "'ich' bilan fe'l doim '-e' oladi: 'Ich komme'."
      };
    }
    if (lower.includes('komme in') || (lower.includes('bin in') && lower.includes('usbekistan'))) {
      return {
        hasError: true,
        category: "Predlog xatosi (aus vs in)",
        wrongPart: "komme in",
        correctDe: "Ich komme aus Usbekistan.",
        explanationUz: "Mamlakatdan kelib chiqishda 'in' emas, 'aus' (dan) predlogi ishlatiladi."
      };
    }
    if (lower.includes('bin heiße') || lower.includes('bin heisse')) {
      return {
        hasError: true,
        category: "Ortiqcha fe'l (sein + heißen)",
        wrongPart: "bin heiße",
        correctDe: "Ich heiße...",
        explanationUz: "Yo 'Ich heiße...' yoki 'Ich bin...' deyiladi. Ikkalasini birga qo'shmang."
      };
    }

    return { hasError: false };
  };

  // Javobni tahlil qilish va tabiiy suhbatlashish (O'zbekcha + Nemischa aqlli tushunish)
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
      // 1. Agar xato takrorlanib to'g'rilangan bo'lsa:
      if (errorResult.isRepeatSuccess) {
        setCorrectionState(null);
        let nextQuestion = "Barakalla! Endi talaffuzingiz to'g'ri bo'ldi! Suhbatni davom ettiramiz: Wie lange lernst du schon Deutsch? (Qancha vaqtdan beri nemis tilini o'rganyapsiz?)";
        let dePhrase = "Sehr gut! Wie lange lernst du schon Deutsch?";

        const replyMsg = {
          id: Date.now() + 1,
          sender: 'tutor',
          text: `✅ ${nextQuestion}`,
          dePhrase: dePhrase,
          isPraise: true
        };

        setMessages(prev => [...prev, replyMsg]);
        setIsTyping(false);
        if (autoSpeak && dePhrase) {
          speakGerman(dePhrase, () => {
            if (continuousCall) setTimeout(startListeningSafely, 600);
          });
        }
        return;
      }

      // 2. Agar xato aniqlansa — 3-Qoida: Suhbat to'xtatiladi, tushuntiriladi va takrorlash so'raladi
      if (errorResult.hasError) {
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
          text: `⚠️ To'xtang, bu yerda kichik bir xato bor:\n\n${errorResult.explanationUz}\n\nTo'g'ri varianti: «${errorResult.correctDe}»\n\nQani, endi shuni to'g'rilab ovoz chiqarib ayting-chi!`,
          dePhrase: errorResult.correctDe,
          isCorrection: true
        };

        setMessages(prev => [...prev, correctionMsg]);
        setIsTyping(false);
        if (autoSpeak && errorResult.correctDe) {
          speakGerman(`Achtung. ${errorResult.correctDe}`, () => {
            if (continuousCall) setTimeout(startListeningSafely, 600);
          });
        }
        return;
      }

      // 3. Tabiiy suhbat: O'zbek va nemis tillarini tushunish
      let replyText = "";
      let deAudio = "";
      const lower = userText.toLowerCase();

      // MAVZU: ISH VA KASB (Arbeit & Beruf)
      if (selectedTopic === 'arbeit') {
        if (lower.includes('dasturchi') || lower.includes('programmist') || lower.includes('developer') || lower.includes('it') || lower.includes('programmierer')) {
          replyText = "Ajoyib kasb! Dasturchilik Germaniyada eng yuqori baholanadigan sohalardan biri. Nemis tilida: «Ich bin Programmierer». Ishingiz sizga yoqadimi? (Gefällt dir deine Arbeit?)";
          deAudio = "Toll! Ich bin Programmierer. Gefällt dir deine Arbeit?";
        } else if (lower.includes('talaba') || lower.includes('student') || lower.includes('o\'qiyman') || lower.includes('oqiman')) {
          replyText = "Student ekansiz, juda yaxshi! Qaysi yo'nalishda tahsil olasiz? Nemis tilida: «Ich bin Student / Studentin». Qaysi universitetda o'qiysiz?";
          deAudio = "Sehr schön! Ich bin Student. Was studierst du?";
        } else if (lower.includes('shifokor') || lower.includes('vrach') || lower.includes('doktor') || lower.includes('tibbiyot') || lower.includes('arzt')) {
          replyText = "Tibbiyot sohasi Germaniyada juda qadrlanadi! Nemis tilida: «Ich bin Arzt» (yoki Ärztin). Germaniyada ishlash niyatidamisiz?";
          deAudio = "Großartig! Ich bin Arzt. Möchtest du in Deutschland arbeiten?";
        } else if (lower.includes('ishlamayman') || lower.includes('ishsiz') || lower.includes('qidiryapman')) {
          replyText = "Tushunarli. Hozirda nemis tilini o'rganib, yangi imkoniyatlar ochayotganingiz juda to'g'ri yo'l! Nemis tilida: «Ich suche eine Arbeit».";
          deAudio = "Kein Problem! Ich suche eine Arbeit in Deutschland.";
        } else {
          replyText = `Tushundim! Kasbingiz haqida aytdingiz: "${userText}". Nemis tilida «Ich arbeite als...» yoki «Ich bin...» deyiladi. Ish vaqtingiz qanday, charchamaysizmi?`;
          deAudio = "Interessant! Wie gefällt dir deine Arbeit?";
        }
      }
      // MAVZU: TANISHUV (Kennenlernen)
      else if (selectedTopic === 'kennenlernen') {
        if (lower.includes('heiße') || lower.includes('ismim') || lower.includes('men') || lower.includes('bin')) {
          replyText = "Tanishganimdan judayam xursandman! Qayerdansiz va hozir qaysi shaharda yashaysiz? (Woher kommst du und wo wohnst du?)";
          deAudio = "Sehr schön! Freut mich! Woher kommst du?";
        } else if (lower.includes('yaxshi') || lower.includes('zo\'r') || lower.includes('gut') || lower.includes('danke')) {
          replyText = "Kayfiyatingiz a'lo darajada ekanidan xursandman! Bugun kuningiz qanday o'tmoqda? (Was machst du heute Schönes?)";
          deAudio = "Super! Was machst du heute Schönes?";
        } else {
          replyText = "Siz bilan jonli suhbatlashish juda maroqli! Nima uchun nemis tilini 9 oyda B2 darajasiga olib chiqmoqchisiz? Asosiy maqsadingiz nima?";
          deAudio = "Sehr interessant! Warum lernst du Deutsch?";
        }
      }
      // MAVZU: KAFE (Im Café)
      else if (selectedTopic === 'cafe') {
        if (lower.includes('kofe') || lower.includes('kaffee') || lower.includes('cappuccino')) {
          replyText = "Kofe buyurtmangiz qabul qilindi! Sut va shakar solaymi? (Mit Milch und Zucker?)";
          deAudio = "Gerne! Möchten Sie den Kaffee mit Milch und Zucker?";
        } else if (lower.includes('choy') || lower.includes('tee')) {
          replyText = "Ajoyib, ko'k choymi yoki qora choy? (Grüner Tee oder schwarzer Tee?)";
          deAudio = "Sehr gut! Möchten Sie grünen oder schwarzen Tee?";
        } else {
          replyText = "Buyurtmangiz tayyor bo'lmoqda. Yana biror shirinlik qo'shasizmi? (Möchten Sie auch einen Kuchen?)";
          deAudio = "Ausgezeichnet! Möchten Sie auch ein Stück Kuchen dazu?";
        }
      }
      // BOSHQA MAVZULAR
      else {
        replyText = `Sizni eshitdim: "${userText}". Gaplaringiz tushunarli. Nemis tilida fikringizni ifodalashni davom ettiramiz: Wie geht es deiner Familie? (Oilangizdagilar yaxshimi?)`;
        deAudio = "Verstehe! Wie geht es deiner Familie?";
      }

      const normalMsg = {
        id: Date.now() + 1,
        sender: 'tutor',
        text: replyText,
        dePhrase: deAudio
      };

      setMessages(prev => [...prev, normalMsg]);
      setIsTyping(false);

      // Bot javobini ovozda aytadi, tugagach avtomatik mikrofonni ochadi!
      if (autoSpeak && deAudio) {
        speakGerman(deAudio, () => {
          if (continuousCall) {
            setTimeout(startListeningSafely, 600);
          }
        });
      }

    }, 750);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-[calc(100vh-7.5rem)] flex flex-col">
      {/* Top Header: Topic & Level Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-4 shadow-xl flex flex-wrap items-center justify-between gap-3">
        {/* Left: Avatar & Status */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all ${
              isListening
                ? 'bg-rose-600 ring-4 ring-rose-500/40 animate-pulse'
                : 'bg-gradient-to-tr from-purple-600 to-indigo-500 shadow-purple-600/30'
            }`}>
              {isListening ? <Mic className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-white">Jonli Ovozli Repetitor</h2>
              <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {continuousCall ? "Doimiy Qo'ng'iroq" : "Ovozli"}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Siz gapirasiz, u ham gapiradi • O'zbek va nemis tillarida
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

        {/* Right: Controls */}
        <div className="flex items-center gap-2">
          {/* Hands-Free Toggle */}
          <button
            onClick={() => setContinuousCall(!continuousCall)}
            className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-xl border transition ${
              continuousCall
                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
            title="Bot gapirib bo'lgach avtomatik mikrofon ochilishi"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{continuousCall ? 'Doimiy muloqot: YOQIQ' : 'Doimiy: O\'chiq'}</span>
          </button>

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

      {/* JONLI QO'NG'IROQ EKRANI (LIVE CALL SCREEN) */}
      <div className="flex-1 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col justify-between items-center relative overflow-hidden">
        {/* Topic Badge */}
        <div className="flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 shadow">
          <span>Suhbat mavzusi:</span>
          <span className="text-purple-400 font-bold">
            {TOPICS.find(t => t.id === selectedTopic)?.deTitle}
          </span>
        </div>

        {/* Central Animated Call Avatar & Soundwaves */}
        <div className="flex flex-col items-center text-center max-w-xl my-auto w-full">
          <div className="relative mb-6">
            <div className={`w-28 h-28 sm:w-36 sm:h-36 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${
              isListening
                ? 'bg-rose-500/20 ring-8 ring-rose-500/40 scale-110'
                : isTyping
                ? 'bg-purple-500/20 ring-8 ring-purple-500/40 animate-pulse'
                : 'bg-gradient-to-tr from-purple-600 to-sky-600 shadow-purple-600/40'
            }`}>
              {isListening ? (
                <Mic className="w-14 h-14 text-rose-400 animate-bounce" />
              ) : (
                <Bot className="w-14 h-14 text-white" />
              )}
            </div>

            {/* Status tag */}
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-bold px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-200 shadow">
              {isListening ? "🎙️ Siz gapiryapsiz (Eshitmoqdaman...)" : isTyping ? "Repetitor o'ylamoqda..." : "Eshitishga tayyor"}
            </div>
          </div>

          {/* Last Tutor Speech Bubble */}
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
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 transition"
                  title="Qayta tinglash"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* ERROR CORRECTION INTERCEPTOR (3-Qoida) */}
          {correctionState && correctionState.mustRepeat && (
            <div className="mt-4 w-full p-4 rounded-2xl bg-amber-500/15 border-2 border-amber-500/40 text-left animate-fadeIn">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-amber-300 uppercase block mb-1">
                    ⚠️ 3-Qoida: Suhbat to'xtatildi. Gapni to'g'ri ayting:
                  </span>
                  <p className="text-sm font-bold text-white mb-1">
                    «{correctionState.correctDe}»
                  </p>
                  <p className="text-xs text-slate-300 mb-2">
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
                      Mikrofonni bosib shuni takrorlang!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Push-To-Talk Button & Text Backup */}
        <div className="w-full max-w-md flex flex-col items-center gap-3">
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
            {isListening ? "Tinglamoqdaman... Gapirib bo'lgach to'xtating" : "Mikrofonni bosing va gapiring (o'zbekcha yoki nemischa)"}
          </span>

          {/* Text Input backup */}
          <div className="w-full flex items-center gap-2 mt-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleUserResponse()}
              placeholder="Yoki yozma javob bering (masalan: Dasturchiman)..."
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

      {/* SUMMARY / MISTAKES REPORT MODAL */}
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
                🎉 Ajoyib! Bugungi suhbatda birorta ham xato qilmadingiz!
              </div>
            )}

            <button
              onClick={() => {
                setShowSummaryModal(false);
                setSessionMistakes([]);
              }}
              className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm transition shadow-lg shadow-sky-600/30"
            >
              Yangi Suhbatni Boshlash
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
