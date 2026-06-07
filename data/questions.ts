import { StaticImageData } from "next/image";

import P1Img from "../public/pertanyaan1.webp";
import P2Img from "../public/pertanyaan2.webp";
import P3Img from "../public/pertanyaan3.webp";
import P4Img from "../public/pertanyaan4.webp";
import P5Img from "../public/pertanyaan5.webp";
import P6Img from "../public/pertanyaan6.webp";
import P7Img from "../public/pertanyaan7.webp";
import P8Img from "../public/pertanyaan8.webp";
import P9Img from "../public/pertanyaan9.webp";

export type PersonalityType = 'A' | 'B' | 'C' | 'D';

export interface Option {
  text: string;
  type: PersonalityType;
}

export interface Question {
  id: number;
  text: string;
  image: StaticImageData;
  options: Option[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: "Pas lagi ada masalah atau beda pendapat sama temen di circle pergaulan, behavior apa yang paling sering kamu lakuin secara refleks?",
    image: P1Img,
    options: [
      { text: "Diam aja dan nggak ngungkapin apa yang sebenernya kamu mau atau rasain.", type: "A" },
      { text: "Maksain pendapat kamu harus diterima, dan nganggap ide orang lain itu salah.", type: "B" },
      { text: "Nggak langsung ngomong intinya, malah ghosting, nunda-nunda kerjaan, atau denial.", type: "C" },
      { text: "Jujur dan direct nyampein poin kamu, tapi tetap respect sama orang lain.", type: "D" },
    ],
  },
  {
    id: 2,
    text: "Kalau lagi ada di situasi kepanitiaan atau tugas kelompok dadakan yang under pressure dan banyak gesekan, emosi apa yang biasanya mendominasi diri kamu setelahnya?",
    image: P2Img,
    options: [
      { text: "Takut ditolak, merasa frustrasi sendiri, dan ngerasa self-respect lagi rendah.", type: "A" },
      { text: "Gampang marah dan merasa berkuasa saat itu, tapi habis itu ngerasa guilty .", type: "B" },
      { text: "Takut banget sama konfrontasi langsung, tapi ujung-ujungnya ngerasa kesal/dendam sama orang lain.", type: "C" },
      { text: "Tetap positive about yourself dan sadar betul gimana cara yang benar buat ngetreat orang lain (how you treat others).", type: "D" },
    ],
  },
  {
    id: 3,
    text: "Pas lagi ngobrol serius face-to-face sama dosen, kakak tingkat, atau orang yang lebih tua, postur tubuh kamu secara nggak sadar tuh kayak gimana?",
    image: P3Img,
    options: [
      { text: "Duduk nunduk dan ngebungkuk.", type: "A" },
      { text: "Nyender kejauhan ke belakang sambil angkat dagu.", type: "B" },
      { text: "Duduk tegak tapi nyilangin tangan sambil narik badan menjauh.", type: "C" },
      { text: "Punggung tegak, bahu rileks, dan fokus lurus ke lawan bicara.", type: "D" },
    ],
  },
  {
    id: 4,
    text: "Lagi jelasin ide atau ngejawab pertanyaan susah pas presentasi kelas, body language kamu biasanya gimana?",
    image: P4Img,
    options: [
      { text: "Gerakan heboh karena overthinking, kayak ngibas tangan atau pegang-pegang baju.", type: "A" },
      { text: "Sering nunjuk muka lawan bicara dan majuin badan.", type: "B" },
      { text: "Ngetuk-ngetuk jari atau pulpen konstan dengan muka datar.", type: "C" },
      { text: "Pake gesture tangan secukupnya biar keliatan natural dan open.", type: "D" },
    ],
  },
  {
    id: 5,
    text: "Pas lagi dengerin orang ngomong di situasi yang lumayan intense (kayak lagi diomelin atau debat argumen), cara kamu maintain eye contact tuh...",
    image: P5Img,
    options: [
      { text: "Sering nunduk, nggak berani natap mata, atau cuma ngelirik dikit.", type: "A" },
      { text: "Natap tajem tanpa kedip seolah lagi nantangin mereka.", type: "B" },
      { text: "Rolling eyes tipis-tipis atau sengaja ngeliatin aksesoris mereka.", type: "C" },
      { text: "Tetep tenang, confident eye contact, dan sesekali mengalihkan pandangan biar natural.", type: "D" },
    ],
  },
  {
    id: 6,
    text: "Di tengah kerja kelompok yang berpotensi jadi debat panjang, ekspresi muka kamu tuh dominan kayak gimana?",
    image: P6Img,
    options: [
      { text: "Keliatan anxious, dahi berkerut, atau ketawa awkward nutupin panik.", type: "A" },
      { text: "Rahang tegang, mata melotot tajem tanpa ekspresi apa-apa.", type: "B" },
      { text: "Senyum sinis atau pelan-pelan naikin sebelah alis pas dengerin.", type: "C" },
      { text: "Senyum tipis yang warm dan rileks biar suasananya tetep chill.", type: "D" },
    ],
  },
  {
    id: 7,
    text: "Giliran kamu buat speak up dan nyampein argumen pas lagi kumpul bareng temen-temen, nada bicara kamu biasanya...",
    image: P7Img,
    options: [
      { text: "Kekecilan banget, ragu-ragu, dan terbata-bata sampe susah kedengeran.", type: "A" },
      { text: "Suara keras, mendominasi, dan cepet banget nyerocos tanpa jeda.", type: "B" },
      { text: "Narik napas panjang terus jawab pake nada sok manis.", type: "C" },
      { text: "Ngomong jelas, tempo pas, intonasi variatif, dan minim bilang 'eeeh' atau 'kayak'.", type: "D" },
    ],
  },
  {
    id: 8,
    text: "Soal prioritas kebutuhan di kehidupan sehari-hari atau pergaulan, mindset atau belief mana yang diam-diam paling kamu pegang teguh?",
    image: P8Img,
    options: [
      { text: "Kebutuhan orang lain itu jatuhnya lebih penting daripada kebutuhan diri sendiri.", type: "A" },
      { text: "Kebutuhan kamu jelas lebih penting daripada kebutuhan orang lain.", type: "B" },
      { text: "Kamu merasa berhak buat menang, tapi sebisa mungkin nggak mau disuruh tanggung jawab.", type: "C" },
      { text: "Kebutuhan kamu dan kebutuhan orang lain itu sama-sama penting dan berharga.", type: "D" },
    ],
  },
  {
    id: 9,
    text: "Di tengah perdebatan panjang atau beda pendapat sama circle kamu, sebenernya apa sih goal utama yang pengen banget kamu capai?",
    image: P9Img,
    options: [
      { text: "Sebisa mungkin hindari konflik, mending kasih kontrol atau keputusan akhir ke orang lain aja.", type: "A" },
      { text: "Harus bisa menang dengan cara apa pun.", type: "B" },
      { text: "Pengen menang, tapi main aman tanpa harus kelihatan salah di mata orang.", type: "C" },
      { text: "Both sides keep their self-respect, diselesaiin bareng tanpa ada yang saling ngontrol satu sama lain.", type: "D" },
    ],
  },
];

export interface ResultData {
  title: string;
  subtitle: string;
  description: string;
  emoji: string;
  color: string;
  hashtags: string[];
  warning: string;
  warningDetail: string;
  kekurangan: string;
  kelebihan: string;
  tipTitle: string;
  tipDetail: string;
  image: string;
}

export const getResult = (answers: PersonalityType[]): ResultData => {
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach((ans) => {
    if (counts[ans] !== undefined) counts[ans]++;
  });

  let maxType: PersonalityType = 'A';
  let maxCount = -1;
  for (const [type, count] of Object.entries(counts)) {
    if (count > maxCount) {
      maxCount = count;
      maxType = type as PersonalityType;
    }
  }

  const resultsData: Record<PersonalityType, ResultData> = {
    A: {
      title: "THE PASSIVE",
      subtitle: "The People Pleaser",
      description: "Jujurly, kamu terlalu sering nahan diri dan fomo sama opini orang lain. Kamu emang pendengar yang baik, tapi plis deh, suara kamu juga berhak didenger. Jangan takut bilang 'nggak' ya!",
      emoji: "😔",
      color: "bg-[#81D4FA]",
      hashtags: ["#TimNggakEnakan", "#TerserahKalianAja", "#SorrySyndrome"],
      warning: "Kamu tuh angel banget di tongkrongan atau kantor!",
      warningDetail: "Super empatik, pendengar yang baik, dan selalu pengen suasana tetap damai tanpa ribut-ribut. Tapi hati-hati, saking takutnya bikin konflik atau ngecewain orang lain, kamu rela menekan perasaan sendiri dan ujung-ujungnya malah burnout karena selalu ngomong \"Iya\" untuk semua hal!",
      kekurangan: "Susah Bilang \"Nggak\", Rawan Dimanfaatin, Sering Mendem Perasaan.",
      kelebihan: "Pendengar Setia, Super Empatik, Bikin Suasana Tenang.",
      tipTitle: "Mulai latihan bilang \"Nggak\" dari hal-hal kecil!",
      tipDetail: "Kalau ditawarin extra kerjaan pas kamu lagi overload, coba ganti kata \"Maaf\" jadi \"Terima kasih udah percaya, tapi jadwalku lagi full nih.\"",
      image: "/PASIF.webp",
    },
    B: {
      title: "THE AGGRESSIVE",
      subtitle: "The Bossy",
      description: "Vibes kamu tuh dominan banget dan super goal-oriented. Kamu berani banget take charge, tapi lowkey sering ngabaikan perasaan rekan kerja. Hati-hati jangan sampe dicap red flag, bestie!",
      emoji: "😤",
      color: "bg-[#FFAB76]",
      hashtags: ["#GasTerus", "#PantangMundur", "#SIPalingBener"],
      warning: "Kamu tuh punya confidence yang to the moon!",
      warningDetail: "Pede selangit, tahu persis apa yang kamu mau, dan paling anti sama yang namanya plin-plan. Tapi awas, saking semangatnya pengen kelihatan stand out dan pintar di depan HRD, kamu kadang tanpa sadar suka memaksakan opini, ngegas, atau bahkan motong omongan orang. Niatnya sih biar kelihatan asertif, tapi jatuhnya malah terkesan bossy dan mengintimidasi!",
      kekurangan: "Kelihatan Bossy, Sering Motong Omongan, Susah Terima Kritik.",
      kelebihan: "Pede Maksimal, Berani Speak Up, Action-Oriented.",
      tipTitle: "Coba biasain dengerin omongan orang sampai titik sebelum kamu reply.",
      tipDetail: "Ganti mindset dari \"Aku harus menang/kelihatan paling pintar\" jadi \"Gimana caranya kita nemu solusi bareng\". Ingat, interview itu ruang diskusi, bukan medan debat capres!",
      image: "/AGRESIF.webp",
    },
    C: {
      title: "THE PASSIVE-AGGRESSIVE",
      subtitle: "The Sarcastic",
      description: "Kamu literally jagonya ngehindarin konflik langsung, tapi ngelampiasinnya lewat sindiran atau body language yang malesin. Keliatannya setuju, tapi di dalem nolak keras. Ayo belajar lebih direct!",
      emoji: "🙂",
      color: "bg-[#FFD54F]",
      hashtags: ["#BilangnyaGapapa", "#SenyumTapiBatin", "#SarkasTipisTipis"],
      warning: "Di luar kelihatan senyum, di dalam lagi nge-roasting orang!",
      warningDetail: "Kamu tuh paling anti sama konflik langsung, tapi juga nggak mau ngalah gitu aja. Jadinya? Kamu milih \"jalur ninja\" lewat sindiran halus, silent treatment, atau ngomong \"Gapapa kok, terserah aja\" padahal aslinya bad mood parah!\nKalau ada yang nggak sreg pas interview atau pas dapet tugas dari bos, kamu jarang protes langsung, tapi body language dan tone suaramu teriak ngasih side-eye yang bikin orang di sekitarmu ketar-kitir nebak salah mereka apa.",
      kekurangan: "Bikin Orang Lain Bingung, Kelihatan Judes, Suka Ngedumel di Belakang.",
      kelebihan: "Super Observan, Pemikir Kritis.",
      tipTitle: "HRD dan rekan kerja itu bukan cenayang yang bisa baca pikiranmu!",
      tipDetail: "Kalau ada sistem yang nggak masuk akal atau gaji yang nggak sesuai, langsung sampaikan secara asertif.\nKurang-kurangin pakai bahasa bersayap atau sindiran, karena di dunia profesional, clarity is key!",
      image: "/PASIF_AGRESIF.webp",
    },
    D: {
      title: "THE ASSERTIVE",
      subtitle: "The Slay One",
      description: "Slayyy! Kamu tuh green flag banget di dunia kerja. Kamu bisa nyampein boundary dan pendapat kamu dengan tegas tapi tetep super humble and respectful. Pertahanin vibes ini ya!",
      emoji: "✨",
      color: "bg-[#69C98B]",
      hashtags: ["#TegasTapiChill", "#HRDsFavorite", "#BoundariesOnPoint"],
      warning: "You dropped your crown!",
      warningDetail: "Kamu adalah wujud nyata dari goals para job seeker. Kamu tahu persis value dirimu dan jago banget menyampaikannya tanpa harus merendahkan orang lain. Kamu nggak takut bilang \"Nggak\" untuk hal yang ngelewatin batas, tapi penyampaiannya tetap sopan dan bikin orang lain respect. You are born to be a leader!",
      kekurangan: "Bisa Terlalu Idealis, Kadang Kurang Fleksibel.",
      kelebihan: "Elegan, Jago Nego Gaji, Punya Boundaries yang Jelas.",
      tipTitle: "Pertahankan assertive energy ini!",
      tipDetail: "Tantangan terbesarmu sekarang adalah konsistensi saat masuk ke dunia kerja yang sesungguhnya. Tetap asah empatimu supaya kamu tetap luwes dan siap ngadepin berbagai macam karakter rekan kerja, bahkan bos yang toxic sekalipun!",
      image: "/ASERTIF.webp",
    },
  };

  return resultsData[maxType];
};
