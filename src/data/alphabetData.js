export const GERMAN_ALPHABET = [
  { letter: 'A a', name: '[ah]', example: 'der Apfel', translation: 'olma', speakText: 'A, der Apfel' },
  { letter: 'B b', name: '[be]', example: 'das Buch', translation: 'kitob', speakText: 'B, das Buch' },
  { letter: 'C c', name: '[tse]', example: 'das Cafe', translation: 'qahvaxona', speakText: 'C, das Cafe' },
  { letter: 'D d', name: '[de]', example: 'Deutschland', translation: 'Germaniya', speakText: 'D, Deutschland' },
  { letter: 'E e', name: '[e]', example: 'der Elefant', translation: 'fil', speakText: 'E, der Elefant' },
  { letter: 'F f', name: '[ef]', example: 'die Familie', translation: 'oila', speakText: 'F, die Familie' },
  { letter: 'G g', name: '[ge]', example: 'Guten Tag', translation: 'Xayrli kun', speakText: 'G, Guten Tag' },
  { letter: 'H h', name: '[ha]', example: 'das Haus', translation: 'uy', speakText: 'H, das Haus' },
  { letter: 'I i', name: '[i]', example: 'die Idee', translation: 'g\'oya / fikr', speakText: 'I, die Idee' },
  { letter: 'J j', name: '[yot]', example: 'das Jahr', translation: 'yil', speakText: 'J, das Jahr' },
  { letter: 'K k', name: '[ka]', example: 'der Kaffee', translation: 'kofe', speakText: 'K, der Kaffee' },
  { letter: 'L l', name: '[el]', example: 'das Leben', translation: 'hayot', speakText: 'L, das Leben' },
  { letter: 'M m', name: '[em]', example: 'die Mutter', translation: 'ona', speakText: 'M, die Mutter' },
  { letter: 'N n', name: '[en]', example: 'die Nacht', translation: 'tun', speakText: 'N, die Nacht' },
  { letter: 'O o', name: '[o]', example: 'die Orange', translation: 'apelsin', speakText: 'O, die Orange' },
  { letter: 'P p', name: '[pe]', example: 'die Pause', translation: 'tanaffus', speakText: 'P, die Pause' },
  { letter: 'Q q', name: '[ku]', example: 'die Quelle', translation: 'buloq / manba', speakText: 'Q, die Quelle' },
  { letter: 'R r', name: '[er]', example: 'das Radio', translation: 'radio', speakText: 'R, das Radio' },
  { letter: 'S s', name: '[es]', example: 'die Sonne', translation: 'quyosh', speakText: 'S, die Sonne' },
  { letter: 'T t', name: '[te]', example: 'der Tee', translation: 'choy', speakText: 'T, der Tee' },
  { letter: 'U u', name: '[u]', example: 'die Uhr', translation: 'soat', speakText: 'U, die Uhr' },
  { letter: 'V v', name: '[fau]', example: 'der Vater', translation: 'ota ([f] deb o\'qiladi)', speakText: 'V, der Vater' },
  { letter: 'W w', name: '[ve]', example: 'das Wasser', translation: 'suv ([v] deb o\'qiladi)', speakText: 'W, das Wasser' },
  { letter: 'X x', name: '[iks]', example: 'das Xylofon', translation: 'ksilofon', speakText: 'X, das Xylofon' },
  { letter: 'Y y', name: '[ypsilon]', example: 'das Yoga', translation: 'yoga', speakText: 'Y, das Yoga' },
  { letter: 'Z z', name: '[tset]', example: 'die Zeit', translation: 'vaqt ([ts] deb o\'qiladi)', speakText: 'Z, die Zeit' },
];

export const UMLAUTS_AND_SPECIAL = [
  { letter: 'Ä ä', name: '[a-Umlaut: e]', example: 'die Äpfel', translation: 'olmalar', speakText: 'Ä, die Äpfel', note: 'A harfi ustiga 2 nuqta, [e] kabi talaffuz qilinadi' },
  { letter: 'Ö ö', name: '[o-Umlaut: o\']', example: 'das Öl / schön', translation: 'moy / chiroyli', speakText: 'Ö, das Öl, schön', note: 'Lablar oldinga cho\'zilib [o\'] aytiladi' },
  { letter: 'Ü ü', name: '[u-Umlaut: yu]', example: 'die Übung / über', translation: 'mashq / ustida', speakText: 'Ü, die Übung', note: 'Ingichka lab bilan [yu / u] aytiladi' },
  { letter: 'ß', name: '[Eszett: qattiq ss]', example: 'groß / die Straße', translation: 'katta / ko\'cha', speakText: 'Eszett, groß, die Straße', note: 'Doim ikkita [ss] tovushini beradi, [b] emas!' },
];

export const SOUND_COMBOS = [
  { combo: 'ei', sound: '[ay]', example: 'mein, nein, heißen', speakText: 'mein, nein, heißen', desc: 'Doim [ay] deb o\'qiladi' },
  { combo: 'ie', sound: '[i:] (cho\'ziq i)', example: 'Sie, wie, hier', speakText: 'Sie, wie, hier', desc: 'Doim cho\'ziq [i] deb o\'qiladi' },
  { combo: 'eu / äu', sound: '[oy]', example: 'Euro, heute, Häuser', speakText: 'Euro, heute, Häuser', desc: 'Doim [oy] deb o\'qiladi' },
  { combo: 'sch', sound: '[sh]', example: 'Schule, schreiben', speakText: 'Schule, schreiben', desc: 'Uchta harf bitta [sh] tovushini beradi' },
  { combo: 'sp / st', sound: '[shp / sht]', example: 'Sport, sprechen, Stadt', speakText: 'Sport, sprechen, Stadt', desc: 'So\'z boshida [shp] va [sht] deb o\'qiladi' },
  { combo: 'ch', sound: '[x] yoki [ç]', example: 'Buch [x], ich [ç]', speakText: 'Buch, ich', desc: 'a, o, u dan keyin [x], boshqa hollarda yumshoq [ç]' },
];

