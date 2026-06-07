// ─── Master Translations Object ─────────────────────────────────────────────
// Updated with Gen Z Jaksel Tone (Slay & Vibes)

export const T = {
  id: {
    // ── Landing Page ────────────────────────────────────────────────────────
    landing: {
      hero: {
        title: "Web Ivo's",
        subtitle: "Spill Work Vibes & Kepribadian Kamu di Sini!",
        cta: "Let's Go! ",
        buyBook: "Check Out Bukunya",
      },
      intro: {
        heading: "Ngapain Sih Bikin Web Ini?",
        body: "Literally web ini dibuat biar kamu paham work vibes kamu kayak gimana. Apakah kamu tipe yang lowkey nahan diri, gampang meledak, suka nyindir halus, atau malah slay banget nyampein pendapat? Paham ginian tuh penting banget biar karir dan circle profesional kamu makin healthy and toxic-free!",
      },
      showcase: {
        heading: "4 Work Personas Kamu",
        sub: "Cek kamu masuk circle yang mana dan gimana cara keep up sama bestie sekantor!",
        types: [
          { name: "Pasif (The People Pleaser)", desc: "Lowkey diem aja, FOMO konflik, dan sering nahan opini demi nyenengin orang lain. Relate?", emoji: "", color: "bg-[#81D4FA]" },
          { name: "Agresif (The Bossy)", desc: "Vibes-nya mendominasi abis. Nggak ragu maksa kehendak dan kadang red flag karena ngabaikan perasaan yang lain.", emoji: "", color: "bg-[#FFAB76]" },
          { name: "Pasif-Agresif (The Sarcastic)", desc: "Keliatan setuju tapi di belakang lowkey nolak sambil nyindir halus. Vibes-nya abu-abu banget.", emoji: "", color: "bg-[#FFD54F]" },
          { name: "Asertif (The Slay One)", desc: "Literally the greenest flag! Tegas nyampein pendapat tapi tetep humble dan ngehargain orang lain.", emoji: "", color: "bg-[#69C98B]" }
        ]
      },
      quizCTA: {
        heading: "Ready Buat Spill Work Vibes Kamu?",
        body: "CV bagus aja nggak cukup kalau komunikasinya kurang klik. Yuk, cari tahu seberapa siap kamu hadapi dunia kerja lewat kuis gaya komunikasi ini dalam 2 menit!",
        cta: "Mulai Kuisnya, Yuk!"
      },
      buyBanner: {
        badge: " EXCLUSIVE GUIDE BOOK",
        title: "Time to",
        highlight: "level up",
        suffix: "your game!",
        sub: "Practical workbook yang didesain khusus buat fresh grad! Temukan cara elegan buat speak up, negosiasi, dan tampil confident di dunia kerja secara step-by-step.",
        cta: "Check Out Sekarang →",
      },
      ticket: {
        badge: " EVENT TICKET",
        title: "A DIFFERENT WONDERFUL X JEROME",
        location: "Pollux Mall Paragon",
        date: "5–6 April 2025 · 10.30 AM till drop",
        downloadBtn: "UNDUH\nKUPON",
      },
      footer: {
        developedBy: "Developed by",
        copyright: "© 2026 First Job Survival Guide. Hak cipta dilindungi.",
        tagline: "",
      },
    },

    // ── Promo Modal ──────────────────────────────────────────────────────────
    promo: {
      badge: " DON'T MISS IT",
      title1: "Yuk, bongkar cheet code tembus wawancara di webinar ekslusif",
      title2: "BECOME THE CANDIDATE",
      title3: "THAT HR CAN'T IGNORE",
      sub: "Kuota Terbatas!",
      cta: "Register to Webinar →",
    },

    // ── Event Page ───────────────────────────────────────────────────────────
    event: {
      back: "Back",
      badge: " Are You Ready?",
      title1: "NEXT STOP:",
      title2: "SEMARANG",
      location: "Pollux Mall: 1 Agustus 2026",
      countdown: {
        label: " HARI LAGI",
        days: "Hari",
        hours: "Jam",
        mins: "Menit",
        emailPlaceholder: "email@kamu.com",
        remindBtn: "Ingetin Gue",
        remindedMsg: " Bakal gue ingetin kok!",
      },
      promo: {
        badge: " Special Promo",
        text1: "Win ",
        highlight: "FREE GIFTS & ACCOMMODATIONS",
        text2: " for the next event by swapping!",
        cta: "Swap Sekarang →",
      },
      ticket: {
        badge: " Kupon · VIP Access",
        label: "A DIFFERENT WONDERFUL X JEROME",
        locationLabel: " Lokasi",
        locationName: "Pollux Mall Paragon",
        locationDate: "5–6 April 2025 · 10.30 AM till drop",
        downloadBtn: "UNDUH\nKUPON",
      },
      backHome: " Balik ke Home",
    },

    // ── Intro Page ───────────────────────────────────────────────────────────
    intro: {
      title: "Siap melihat potensimu?",
      body: "Kuis ini akan mengukur kesiapanmu masuk dunia kerja lewat cara ngobrol dan memecahkan masalah.",
      cta: "Pilih jawaban yang paling menggambarkan dirimu sehari-hari!",
    },

    // ── Quiz Page ────────────────────────────────────────────────────────────
    quiz: {
      backLabel: "Back",
    },

    // ── Finish Page ──────────────────────────────────────────────────────────
    finish: {
      title: "Keren Banget! ",
      body: "Kamu udah kelarin semua pertanyaannya. Vibes kepribadian kamu udah mau mateng nih!",
      cta: "Cek Vibes Kamu Sekarang",
      loadingTitle: "Wait a sec...",
      loadingBody: "Lagi nge-mix adonan kepribadian kamu",
    },

    // ── Result Page ──────────────────────────────────────────────────────────
    result: {
      youAre: "Jujurly, kamu itu...",
      tags: ["#Slay", "#WorkBestie", "#Professional"],
      strengths: "Superpower Kamu",
      perfectionism: "Tingkat Overthinking",
      persona: "Work Persona",
      workBesties: "Bestie Sekantor",
      colleagues: "Strictly Colleagues (Red Flag)",
      saveResult: "Save Hasil",
      saving: "Wait...",
      retake: "Take Ulang Quiz",
    },
  },
} as const;

export type Lang = keyof typeof T;
