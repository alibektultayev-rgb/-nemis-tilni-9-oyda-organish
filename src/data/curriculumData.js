export const MONTHS_ROADMAP = [
  {
    id: 1,
    level: 'A1.1',
    title: '1-Oy: Nemis Tili Asoslari & Boshlang\'ich Nutq',
    description: 'Tovushlar, Alifbo, Sein/Haben, Shaxs olmoshlari, W-Fragen, Artikllar va Akkusativ asoslari.',
    weeks: [
      {
        weekNum: 1,
        title: '1-Hafta: Alifbo, Tovushlar & Salomlashish',
        lessons: [
          {
            id: 'm1-w1-l1',
            title: '1-Dars: Tovushlar, Salomlashish va O\'zini Tanishtirish',
            level: 'A1.1',
            duration: '35 daqiqa',
            steps: {
              isinish: {
                title: '1. Isinish (Aufwärmen)',
                question: 'Nemis tili bilan birinchi tanishuvingiz: Dunyoda nemis tilida 130 milliondan ortiq inson gaplashadi (Germaniya, Avstriya, Shveysariya).',
                prompt: 'Quyidagi savol haqida o\'ylab ko\'ring: Nima uchun aynan nemis tilini 9 oyda B2 darajasiga olib chiqmoqchisiz?',
                tip: 'Maqsad aniq bo\'lsa (masalan, Germaniyada IT/Tibbiyot yoki Universitet), o\'rganish 2 barobar tezlashadi!'
              },
              yangi_mavzu: {
                title: '2. Yangi Mavzu (Neues Thema)',
                summary: 'Nemis tilida harflar va tovush birikmalari juda qat\'iy qoidalarga bo\'ysunadi. Quyidagi eng muhim tovushlarni yod oling:',
                rules: [
                  { combo: 'ei', sound: '[ay]', example: 'mein (mening), heißen (nomlanmoq)', note: 'Doim [ay] deb o\'qiladi, [ey] emas!' },
                  { combo: 'ie', sound: '[i:] (cho\'ziq i)', example: 'sie (u/ular), wie (qanday)', note: 'Doim cho\'ziq [i] deb o\'qiladi!' },
                  { combo: 'w', sound: '[v]', example: 'wo (qayerda), was (nima)', note: 'Inglizcha emas, o\'zbekcha [v] kabi talaffuz qilinadi.' },
                  { combo: 's', sound: '[z] (unlidan oldin)', example: 'sein (bo\'lmoq), Sie (Siz)', note: 'Unli harfdan oldin kelsa [z], so\'z oxirida esa [s].' },
                  { combo: 'sch', sound: '[sh]', example: 'Schule (maktab), schreiben (yozmoq)', note: 'Uchta harf bitta yumshoq [sh] tovushini beradi.' },
                  { combo: 'sp / st', sound: '[shp / sht]', example: 'sprechen (gapirmoq), Stadt (shahar)', note: 'So\'z boshida [shp] va [sht] deb o\'qiladi.' }
                ],
                phrases: [
                  { de: 'Hallo!', uz: 'Salom!' },
                  { de: 'Guten Tag!', uz: 'Xayrli kun!' },
                  { de: 'Ich heiße...', uz: 'Mening ismim...' },
                  { de: 'Ich komme aus Usbekistan.', uz: 'Men O\'zbekistondanman.' },
                  { de: 'Ich wohne in Taschkent.', uz: 'Men Toshkentda yashayman.' },
                  { de: 'Ich lerne Deutsch.', uz: 'Men nemis tilini o\'rganyapman.' },
                  { de: 'Auf Wiedersehen!', uz: 'Ko\'rishguncha xayr!' }
                ]
              },
              mashqlar: {
                title: '3. Mashqlar (Übungen)',
                quiz: [
                  {
                    id: 1,
                    question: 'Nemis tilidagi "mein" (mening) so\'zi qanday talaffuz qilinadi?',
                    options: ['meyn', 'mayn', 'miyn', 'men'],
                    correct: 1,
                    explanation: 'Qoida: "ei" harf birikmasi nemis tilida qat\'iy [ay] deb talaffuz qilinadi (m-ay-n).'
                  },
                  {
                    id: 2,
                    question: '"Ich wohne in Taschkent" gapining to\'g\'ri ma\'nosi qaysi?',
                    options: ['Men Toshkentga boryapman', 'Men Toshkentda ishlayman', 'Men Toshkentda yashayman', 'Men Toshkentdanman'],
                    correct: 2,
                    explanation: '"wohnen" fe\'li yashamoq, istiqomat qilmoq ma\'nosini anglatadi.'
                  },
                  {
                    id: 3,
                    question: '"Ich komme aus ..." gapida "O\'zbekistondan" qanday yoziladi?',
                    options: ['in Usbekistan', 'von Usbekistan', 'aus Usbekistan', 'zu Usbekistan'],
                    correct: 2,
                    explanation: 'Mamlakat yoki shahardan kelib chiqishni ifodalashda "aus" (ichidan/dan) predlogi ishlatiladi.'
                  }
                ]
              },
              amaliy_dialog: {
                title: '4. Amaliy Dialog (Praktischer Dialog)',
                situation: 'Tanishuv dialogi (Aeroport yoki tilda kursda):',
                lines: [
                  { speaker: 'Anna', de: 'Hallo! Guten Tag!', uz: 'Salom! Xayrli kun!' },
                  { speaker: 'Ali', de: 'Guten Tag! Ich heiße Ali. Und wie heißen Sie?', uz: 'Xayrli kun! Mening ismim Ali. Sizning ismingiz nima?' },
                  { speaker: 'Anna', de: 'Ich heiße Anna. Woher kommen Sie, Ali?', uz: 'Mening ismim Anna. Qayerdansiz, Ali?' },
                  { speaker: 'Ali', de: 'Ich komme aus Usbekistan. Und Sie?', uz: 'Men O\'zbekistondanman. Siz-chi?' },
                  { speaker: 'Anna', de: 'Ich komme aus Deutschland. Freut mich!', uz: 'Men Germaniyadanman. Tanishganimdan xursandman!' }
                ]
              },
              uy_vazifasi: {
                title: '5. Uy Vazifasi (Hausaufgabe)',
                tasks: [
                  '1. 5 ta tanishuv gapini ovoz chiqarib 3 marta takrorlang va yodlang.',
                  '2. O\'z do\'stingiz yoki o\'zingiz haqingizda mini-matn yozing (Ism, davlat, shahar, til).',
                  '3. "ei", "ie", "sp", "st" qoidasiga doir lug\'atdagi kamida 6 ta so\'zni topib o\'qing.'
                ]
              },
              xulosa: {
                title: '6. Xulosa (Zusammenfassung)',
                points: [
                  '"ei" = [ay], "ie" = [i:], "w" = [v], "sch" = [sh].',
                  'O\'zini tanishtirishning 3 asosiy ustuni: heißen (ism), kommen aus (kelib chiqish), wohnen in (yashash joyi).',
                  '1-dars yakunlandi! Ushbu darsni yakunlangan deb belgilang va keyingi darsga o\'ting.'
                ]
              }
            }
          },
          {
            id: 'm1-w1-l2',
            title: '2-Dars: Nemis Alifbosi (A-Z, Ä, Ö, Ü, ß) & Raqamlar (0-20)',
            level: 'A1.1',
            duration: '40 daqiqa',
            steps: {
              isinish: {
                title: '1. Isinish (Aufwärmen)',
                question: 'O\'tgan darsni eslaymiz: "Ich heiße..." qanday tarjima qilinadi?',
                prompt: 'Bugun nemis tilining sirli 4 ta maxsus harfi (Umlaute: Ä, Ö, Ü va Eszett: ß) bilan tanishamiz!',
                tip: 'Umlaute nemis tilining haqiqiy ohangini beradi!'
              },
              yangi_mavzu: {
                title: '2. Yangi Mavzu (Neues Thema)',
                summary: 'Nemis alifbosida 26 ta asosiy harf va 4 ta maxsus belgi mavjud:',
                rules: [
                  { combo: 'Ä ä', sound: '[e] kabi ochilib talaffuz qilinadi', example: 'Äpfel (olmalaar), Mädchen (qiz bola)', note: 'A harfining ustiga 2 nuqta qo\'yiladi' },
                  { combo: 'Ö ö', sound: '[o\'] kabi lablarni oldinga cho\'zib aytiladi', example: 'Öl (moy), schön (go\'zal)', note: 'O\'zbek tilidagi "o\'" ga yaqin' },
                  { combo: 'Ü ü', sound: '[yu / u] kabi qattiq lab cho\'zish bilan', example: 'über (ustida), Übung (mashq)', note: 'Fransuzcha [u] yoki ingichka [yu]' },
                  { combo: 'ß', sound: 'Eszett [ss]', example: 'groß (katta), weiß (oq)', note: 'Doim ikkita [s] kabi o\'qiladi, [b] emas!' }
                ],
                phrases: [
                  { de: 'null, eins, zwei, drei, vier, fünf', uz: '0, 1, 2, 3, 4, 5' },
                  { de: 'sechs, sieben, acht, neun, zehn', uz: '6, 7, 8, 9, 10' },
                  { de: 'elf, zwölf, dreizehn, vierzehn, fünfzehn', uz: '11, 12, 13, 14, 15' },
                  { de: 'sechzehn, siebzehn, achtzehn, neunzehn, zwanzig', uz: '16, 17, 18, 19, 20' },
                  { de: 'Wie ist deine Telefonnummer?', uz: 'Telefon raqaming nima?' }
                ]
              },
              mashqlar: {
                title: '3. Mashqlar (Übungen)',
                quiz: [
                  {
                    id: 1,
                    question: 'Nemis tilidagi "ß" (Eszett) harfi qanday tovush beradi?',
                    options: ['[b]', '[ss]', '[ts]', '[z]'],
                    correct: 1,
                    explanation: 'ß belgisi "s-zet" deb ataladi va doimiy ravishda qattiq [ss] deb o\'qiladi.'
                  },
                  {
                    id: 2,
                    question: '12 soni nemis tilida nima deyiladi?',
                    options: ['elf', 'zwölf', 'zehn', 'zwanzig'],
                    correct: 1,
                    explanation: '11 = elf, 12 = zwölf, 20 = zwanzig.'
                  }
                ]
              },
              amaliy_dialog: {
                title: '4. Amaliy Dialog (Praktischer Dialog)',
                situation: 'Telefon raqam almashish:',
                lines: [
                  { speaker: 'Markus', de: 'Wie ist deine Handynummer?', uz: 'Telefon raqaming qanaqa?' },
                  { speaker: 'Jasur', de: 'Meine Nummer ist 0176 45 89 20.', uz: 'Mening raqamim 0176 45 89 20.' },
                  { speaker: 'Markus', de: 'Danke! Ich rufe dich an.', uz: 'Rahmat! Senga qo\'ng\'iroq qilaman.' }
                ]
              },
              uy_vazifasi: {
                title: '5. Uy Vazifasi (Hausaufgabe)',
                tasks: [
                  '1. 0 dan 20 gacha bo\'lgan sonlarni yoddan ayting.',
                  '2. O\'z telefon raqamingizni nemischa talaffuz qilib yozing.'
                ]
              },
              xulosa: {
                title: '6. Xulosa (Zusammenfassung)',
                points: [
                  'Ä, Ö, Ü va ß nemis tilining o\'ziga xos tovushlaridir.',
                  '0 dan 20 gacha sonlar asosiy hisob-kitob poydevori.'
                ]
              }
            }
          }
        ]
      },
      {
        weekNum: 2,
        title: '2-Hafta: Fe\'llar Tuslanishi & Sein/Haben',
        lessons: [
          {
            id: 'm1-w2-l1',
            title: '3-Dars: Sein (Bo\'lmoq) va Haben (Ega bo\'lmoq) fe\'llari',
            level: 'A1.1',
            duration: '40 daqiqa',
            steps: {
              isinish: {
                title: '1. Isinish (Aufwärmen)',
                question: 'Nemis tilida eng ko\'p ishlatiladigan 2 ta asosiy fe\'l: sein va haben.',
                prompt: 'Bu fe\'llar ingliz tilidagi "to be" va "to have" kabi eng muhim asos hisoblanadi!',
                tip: 'Ularning tuslanishini to\'xtamasdan aytib berish darajasida yodlash shart!'
              },
              yangi_mavzu: {
                title: '2. Yangi Mavzu: sein va haben',
                summary: 'Tuslanish jadvalini yod oling:',
                rules: [
                  { combo: 'ich bin / habe', sound: 'Men ...man / menda bor', example: 'Ich bin Student. Ich habe Zeit.', note: '1-shaxs birlik' },
                  { combo: 'du bist / hast', sound: 'Sen ...san / senda bor', example: 'Du bist klug. Du hast ein Buch.', note: '2-shaxs birlik (norasmiy)' },
                  { combo: 'er/sie/es ist / hat', sound: 'U ... / unda bor', example: 'Er ist Arzt. Sie hat eine Katze.', note: '3-shaxs birlik' },
                  { combo: 'wir sind / haben', sound: 'Biz ...miz / bizda bor', example: 'Wir sind hier. Wir haben Glück.', note: '1-shaxs ko\'plik' },
                  { combo: 'ihr seid / habt', sound: 'Sizlar ...sizlar / sizlarda bor', example: 'Ihr seid müde. Ihr habt Pause.', note: '2-shaxs ko\'plik (do\'stlar)' },
                  { combo: 'Sie sind / haben', sound: 'Siz ...siz / Sizda bor', example: 'Sie sind sehr freundlich.', note: 'Hurmat ma\'nosida' }
                ],
                phrases: [
                  { de: 'Ich bin glücklich.', uz: 'Men baxtliman.' },
                  { de: 'Hast du Zeit?', uz: 'Vaqting bormi?' },
                  { de: 'Wir haben Deutschunterricht.', uz: 'Bizda nemis tili darsi bor.' },
                  { de: 'Er ist sehr nett.', uz: 'U juda samimiy.' }
                ]
              },
              mashqlar: {
                title: '3. Mashqlar (Übungen)',
                quiz: [
                  {
                    id: 1,
                    question: '"Du ... sehr fleißig." (Sen juda tirishqoqsan) — Bo\'sh joyga qaysi shakl mos keladi?',
                    options: ['bin', 'bist', 'ist', 'sind'],
                    correct: 1,
                    explanation: '"du" olmoshi bilan "sein" fe\'li doim "bist" bo\'ladi.'
                  },
                  {
                    id: 2,
                    question: '"Wir ... keine Zeit." (Bizda vaqt yo\'q) — Qaysi fe\'l to\'g\'ri?',
                    options: ['habt', 'hat', 'haben', 'bist'],
                    correct: 2,
                    explanation: '"wir" (biz) olmoshida "haben" shakli o\'zgarmaydi.'
                  }
                ]
              },
              amaliy_dialog: {
                title: '4. Amaliy Dialog',
                situation: 'Hol-ahvol so\'rash:',
                lines: [
                  { speaker: 'Lukas', de: 'Hallo! Wie geht es dir?', uz: 'Salom! Qalaysan?' },
                  { speaker: 'Timur', de: 'Danke, gut! Und dir?', uz: 'Rahmat, yaxshi! O\'zingdachi?' },
                  { speaker: 'Lukas', de: 'Auch gut. Hast du heute Zeit für Kaffee?', uz: 'Menda ham yaxshi. Bugun kofe ichishga vaqting bormi?' },
                  { speaker: 'Timur', de: 'Ja, gerne! Ich habe um 16 Uhr frei.', uz: 'Ha, mamnuniyat bilan! Soat 16:00 da bo\'shman.' }
                ]
              },
              uy_vazifasi: {
                title: '5. Uy Vazifasi',
                tasks: [
                  '1. Sein va haben fe\'llarining 6 ta shaxs bo\'yicha tuslanishini daftarga yozib yodlang.',
                  '2. Har bir shaxs uchun "sein" va "haben" bilan 2 tadan jami 12 ta gap tuzing.'
                ]
              },
              xulosa: {
                title: '6. Xulosa',
                points: [
                  'sein: bin, bist, ist, sind, seid, sind',
                  'haben: habe, hast, hat, haben, habt, haben'
                ]
              }
            }
          }
        ]
      }
    ]
  },
  {
    id: 2,
    level: 'A1.2',
    title: '2-Oy: Modal Fe\'llar & A1 Yakuniy Mock Imtihon',
    description: 'können, müssen, wollen, dürfen; Trennbare Verben, Negation (nicht/kein), Egalik olmoshlari.',
    weeks: [
      { weekNum: 1, title: 'Modal fe\'llar (können, müssen, wollen)', lessons: [] },
      { weekNum: 2, title: 'Ajraluvchi fe\'llar (aufstehen, einkaufen)', lessons: [] },
      { weekNum: 3, title: 'Inkor: nicht vs kein farqi', lessons: [] },
      { weekNum: 4, title: 'A1 Darajasi to\'liq Mock-Imtihoni (4 ko\'nikma)', lessons: [] }
    ]
  },
  {
    id: 3,
    level: 'A2.1',
    title: '3-Oy: Perfekt (O\'tgan Zamon) & Dativ Kelishigi',
    description: 'O\'tgan zamonda erkin so\'zlashish, haben/sein yordamchi fe\'llari, Dativ predloglari (mit, nach, aus, zu, bei).',
    weeks: [
      { weekNum: 1, title: 'Perfekt zamoni: Partizip II (muntazam fe\'llar)', lessons: [] },
      { weekNum: 2, title: 'Perfekt zamoni: Noto\'g\'ri fe\'llar va sein bilan tuslanish', lessons: [] },
      { weekNum: 3, title: 'Dativ kelishigi: dem, der, dem, den + n', lessons: [] },
      { weekNum: 4, title: 'Dativ predloglari (aus, bei, mit, nach, seit, von, zu)', lessons: [] }
    ]
  },
  {
    id: 4,
    level: 'A2.2',
    title: '4-Oy: Wechselpräpositionen & Ergash Gaplar',
    description: 'Akkusativ/Dativ almashinuvchi predloglar (in, an, auf...), weil/dass/wenn, Sifat darajalari.',
    weeks: [
      { weekNum: 1, title: 'Wechselpräpositionen: Wohin? (Akk) vs Wo? (Dat)', lessons: [] },
      { weekNum: 2, title: 'Ergash gaplar: weil (chunki), dass (deb/ki)', lessons: [] },
      { weekNum: 3, title: 'Sifat darajalari (Komparativ & Superlativ)', lessons: [] },
      { weekNum: 4, title: 'A2 Rasmiy Mock Imtihoni', lessons: [] }
    ]
  },
  {
    id: 5,
    level: 'B1.1',
    title: '5-Oy: B1 Bosqichiga Sakrash: Passiv & Konjunktiv II',
    description: 'Majhul nisbat (Passiv Präsens), Muloyim iltimos va orzular (Konjunktiv II: würde, hätte, wäre), Murakkab bog\'lovchilar.',
    weeks: [
      { weekNum: 1, title: 'Konjunktiv II: Höfliche Bitte & Wünsche', lessons: [] },
      { weekNum: 2, title: 'Passiv Präsens (werden + Partizip II)', lessons: [] },
      { weekNum: 3, title: 'Infinitivkonstruktionen (um...zu, ohne...zu, statt...zu)', lessons: [] },
      { weekNum: 4, title: 'Ergash gaplar: obwohl (garchi), damit (uchun)', lessons: [] }
    ]
  },
  {
    id: 6,
    level: 'B1.2',
    title: '6-Oy: Nisbiy Gaplar & B1 Sertifikatiga Tayyorgarlik',
    description: 'Relativsätze (der, die, das, dem, den...), Genitiv kelishigi, B1 Goethe/telc to\'liq mock-imtihon.',
    weeks: [
      { weekNum: 1, title: 'Nisbiy gaplar (Relativsätze in Nominativ & Akkusativ)', lessons: [] },
      { weekNum: 2, title: 'Nisbiy gaplar Dativ va Predloglar bilan', lessons: [] },
      { weekNum: 3, title: 'Genitiv kelishigi va uning predloglari (wegen, während, trotz)', lessons: [] },
      { weekNum: 4, title: 'B1 To\'liq Mock Imtihoni (Goethe-Zertifikat B1 formati)', lessons: [] }
    ]
  },
  {
    id: 7,
    level: 'B2.1',
    title: '7-Oy: B2 Rasmiy Daraja: Nomen-Verb-Verbindungen & Partizipial',
    description: 'Nutqni boyitish: Nomen-Verb iboralari (zur Verfügung stehen), Partizip I va II sifat sifatida, Zweiteilige Konnektoren.',
    weeks: [
      { weekNum: 1, title: 'Nomen-Verb-Verbindungen (Masalan: eine Rolle spielen)', lessons: [] },
      { weekNum: 2, title: 'Zweiteilige Konnektoren (sowohl...als auch, weder...noch)', lessons: [] },
      { weekNum: 3, title: 'Partizip I va Partizip II sifat sifatida qo\'llanishi', lessons: [] },
      { weekNum: 4, title: 'Goethe B2: Schreiben - Shikoyat xati (Beschwerdebrief) yozish texnikasi', lessons: [] }
    ]
  },
  {
    id: 8,
    level: 'B2.2',
    title: '8-Oy: Passiv Muqobillari, Konjunktiv I & Redemittel',
    description: 'Passiversatzformen (sein + zu + Infinitiv, -bar, -lich), Konjunktiv I (ko\'chirma gap), B2 bahs-munozara iboralari.',
    weeks: [
      { weekNum: 1, title: 'Passiv alternativlari: sein + zu + Infinitiv, sich lassen', lessons: [] },
      { weekNum: 2, title: 'Konjunktiv I: OAV va gazeta uslubida ko\'chirma gaplar', lessons: [] },
      { weekNum: 3, title: 'B2 Redemittel: Taqdimot (Vortrag) va Bahs-munozara (Diskussion)', lessons: [] },
      { weekNum: 4, title: 'B2 Yozma va Og\'zaki sinov mock-testi', lessons: [] }
    ]
  },
  {
    id: 9,
    level: 'B2 Final',
    title: '9-Oy: Goethe / telc B2 Mock Imtihonlari & Sertifikat Sinovi',
    description: 'Haqiqiy imtihon simulyatsiyasi: Lesen (Modul 1-4), Hören (Modul 1-4), Schreiben (2 ta matn), Sprechen (2 qism).',
    weeks: [
      { weekNum: 1, title: 'Goethe B2 Mock 1: Leseverstehen & Sprachbausteine chuqur tahlil', lessons: [] },
      { weekNum: 2, title: 'Goethe B2 Mock 2: Hörverstehen barcha qismlari', lessons: [] },
      { weekNum: 3, title: 'Goethe B2 Mock 3: Schreiben (Forumsbeitrag va Shikoyat xati)', lessons: [] },
      { weekNum: 4, title: 'Goethe/telc B2 Yakuniy Sinov & B2 Tayyorgarlik Sertifikati', lessons: [] }
    ]
  }
];
