// ─── Master Translations Object ─────────────────────────────────────────────
// Updated with Gen Z Jaksel Tone (Slay & Vibes)

export const T = {
  id: {
    // ── Landing Page ────────────────────────────────────────────────────────
    landing: {
      hero: {
        title: "Web Ivo's",
        subtitle: "Spill Work Vibes & Kepribadian Kamu di Sini!",
        cta: "Let's Go! 🚀",
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
          { name: "Pasif (The People Pleaser)", desc: "Lowkey diem aja, FOMO konflik, dan sering nahan opini demi nyenengin orang lain. Relate?", emoji: "😶", color: "bg-[#81D4FA]" },
          { name: "Agresif (The Bossy)", desc: "Vibes-nya mendominasi abis. Nggak ragu maksa kehendak dan kadang red flag karena ngabaikan perasaan yang lain.", emoji: "😡", color: "bg-[#FFAB76]" },
          { name: "Pasif-Agresif (The Sarcastic)", desc: "Keliatan setuju tapi di belakang lowkey nolak sambil nyindir halus. Vibes-nya abu-abu banget.", emoji: "🙄", color: "bg-[#FFD54F]" },
          { name: "Asertif (The Slay One)", desc: "Literally the greenest flag! Tegas nyampein pendapat tapi tetep humble dan ngehargain orang lain.", emoji: "🤝", color: "bg-[#69C98B]" }
        ]
      },
      quizCTA: {
        heading: "Ready Buat Spill Work Vibes Kamu?",
        body: "Cuma butuh 3 menit kok. Yuk take kuisnya dan cari tau cara paling make sense buat survive di kantor kamu.",
        cta: "Mulai Kuisnya, Yuk!"
      },
      buyBanner: {
        badge: "📚 EXCLUSIVE GUIDE BOOK",
        title: "Level Up Jadi Si",
        highlight: "Asertif",
        suffix: "di Kantor!",
        sub: "Jujurly kamu wajib punya buku ini. Bakal ngubah cara kamu survive di kerjaan selamanya.",
        cta: "Check Out Sekarang →",
      },
      ticket: {
        badge: "🎟 EVENT TICKET",
        title: "A DIFFERENT WONDERFUL X JEROME",
        location: "Pollux Mall Paragon",
        date: "5–6 April 2025 · 10.30 AM till drop",
        downloadBtn: "UNDUH\nKUPON",
      },
      footer: {
        developedBy: "Developed by",
        copyright: "© 2026 Web Ivo's Professional. Hak cipta dilindungi.",
        tagline: "Workplace Personality Pro — Slay Your Day.",
      },
    },

    // ── Promo Modal ──────────────────────────────────────────────────────────
    promo: {
      badge: "🎀 Pengumuman Spesial",
      title1: "NEXT STOP:",
      title2: "SEMARANG!",
      sub: "Udah siap belum nih?",
      cta: "Spill Info Event →",
      dismiss: "Skip dulu deh",
    },

    // ── Event Page ───────────────────────────────────────────────────────────
    event: {
      back: "Back",
      badge: "🎀 Are You Ready?",
      title1: "NEXT STOP:",
      title2: "SEMARANG",
      location: "Pollux Mall Paragon · 5–6 April 2025",
      countdown: {
        label: "⏳ HARI LAGI",
        days: "Hari",
        hours: "Jam",
        mins: "Menit",
        emailPlaceholder: "email@kamu.com",
        remindBtn: "Ingetin Gue",
        remindedMsg: "✅ Bakal gue ingetin kok!",
      },
      promo: {
        badge: "🎁 Special Promo",
        text1: "Win ",
        highlight: "FREE GIFTS & ACCOMMODATIONS",
        text2: " for the next event by swapping!",
        cta: "Swap Sekarang →",
      },
      ticket: {
        badge: "🎟 Kupon · VIP Access",
        label: "A DIFFERENT WONDERFUL X JEROME",
        locationLabel: "📍 Lokasi",
        locationName: "Pollux Mall Paragon",
        locationDate: "5–6 April 2025 · 10.30 AM till drop",
        downloadBtn: "UNDUH\nKUPON",
      },
      backHome: "🏠 Balik ke Home",
    },

    // ── Intro Page ───────────────────────────────────────────────────────────
    intro: {
      title: "Welcome to The Sweet Pastels World! 🎨",
      body: "Di sini kamu bisa cari tau peran paling make sense buat kamu di kantor dan nemuin jati diri kamu yang sebenarnya. Udah ready buat mulai petualangan manis ini?",
      cta: "Let's Go!",
    },

    // ── Quiz Page ────────────────────────────────────────────────────────────
    quiz: {
      backLabel: "Back",
    },

    // ── Finish Page ──────────────────────────────────────────────────────────
    finish: {
      title: "Slayyy! ✨",
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
