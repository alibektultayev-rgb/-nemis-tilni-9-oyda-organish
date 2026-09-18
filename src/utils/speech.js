// Brauzer Web Speech API uchun yuqori sifatli va barqaror audio moduli
let cachedVoices = [];

// Ovozlar ro'yxatini yuklash va xotiraga olish
export const initVoices = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  
  cachedVoices = window.speechSynthesis.getVoices();
  return cachedVoices;
};

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  initVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    initVoices();
  };
}

// Global massiv: Chrome'da audio yarim yo'lda to'xtab qolmasligi (Garbage Collection xatosi) uchun
if (typeof window !== 'undefined') {
  window._activeUtterances = window._activeUtterances || [];
}

// Nemis tilidagi harflarni aniq va tiniq talaffuz qilish uchun fonetik moslashuv
export const PHONETIC_LETTER_MAP = {
  'A': 'Ah, der Apfel',
  'B': 'Beh, das Buch',
  'C': 'Tseh, das Café',
  'D': 'Deh, Deutschland',
  'E': 'Eh, der Elefant',
  'F': 'Eff, die Familie',
  'G': 'Geh, Guten Tag',
  'H': 'Hah, das Haus',
  'I': 'Ih, die Idee',
  'J': 'Jott, das Jahr',
  'K': 'Kah, der Kaffee',
  'L': 'Ell, das Leben',
  'M': 'Emm, die Mutter',
  'N': 'Enn, die Nacht',
  'O': 'Oh, die Orange',
  'P': 'Peh, die Pause',
  'Q': 'Kuh, die Quelle',
  'R': 'Err, das Radio',
  'S': 'Ess, die Sonne',
  'T': 'Teh, der Tee',
  'U': 'Uh, die Uhr',
  'V': 'Fau, der Vater',
  'W': 'Weh, das Wasser',
  'X': 'Iks, das Xylofon',
  'Y': 'Ypsilon, das Yoga',
  'Z': 'Tsett, die Zeit',
  'Ä': 'Äh, die Äpfel',
  'Ö': 'Öh, das Öl',
  'Ü': 'Üh, die Übung',
  'ß': 'Ess-Zett, groß'
};

// Eng yaxshi nemischa ovozni topish
export const getBestGermanVoice = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

  let voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // 1. Birinchi o'rinda de-DE (Germaniya) ovozlarini qidirish
  const deDeVoice = voices.find(v => v.lang === 'de-DE' || v.lang === 'de_DE');
  if (deDeVoice) return deDeVoice;

  // 2. Istalgan nemischa ovoz (Avstriya, Shveysariya)
  const anyDeVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith('de'));
  if (anyDeVoice) return anyDeVoice;

  // 3. Google nemischa ovozi
  const googleVoice = voices.find(v => v.name && v.name.toLowerCase().includes('german'));
  if (googleVoice) return googleVoice;

  return null;
};

// Asosiy gapirish funksiyasi
export const speakGerman = (text, onEndCallback = null) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn("SpeechSynthesis qo'llab-quvvatlanmaydi.");
    return;
  }

  try {
    // Agar muzlab qolgan bo'lsa jonlantirish
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    window.speechSynthesis.cancel();

    // Utterance yaratish
    const cleanText = text.trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'de-DE';
    utterance.rate = 0.85; // Yangi o'rganuvchiga aniq eshitilishi uchun
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const germanVoice = getBestGermanVoice();
    if (germanVoice) {
      utterance.voice = germanVoice;
    }

    // Garbage Collection xatosidan himoyalash
    window._activeUtterances.push(utterance);

    utterance.onend = () => {
      window._activeUtterances = window._activeUtterances.filter(u => u !== utterance);
      if (onEndCallback) onEndCallback();
    };

    utterance.onerror = (err) => {
      console.warn("Audio xatolik:", err);
      window._activeUtterances = window._activeUtterances.filter(u => u !== utterance);
      if (onEndCallback) onEndCallback();
    };

    // Kichik kechikish bilan chaqirish (brauzer audio queue tozalanishi uchun)
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 50);

  } catch (err) {
    console.error("Talaffuz ijrosida xato:", err);
  }
};

// Harfni alohida va so'zi bilan o'qish
export const speakLetter = (letterChar, onEndCallback = null) => {
  const upper = letterChar.trim().toUpperCase()[0];
  const phrase = PHONETIC_LETTER_MAP[upper] || letterChar;
  speakGerman(phrase, onEndCallback);
};
