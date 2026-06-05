import { StaticImageData } from "next/image";

import LandingImg from "../public/Landing.PNG";
import P3Img from "../public/pertanyaan3.PNG";
import P4Img from "../public/pertanyaan4.PNG";
import P5Img from "../public/pertanyaan5.PNG";
import P6Img from "../public/pertanyaan6.PNG";
import P7Img from "../public/pertanyaan7.PNG";

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
    text: "Pas lagi ada masalah atau beda pendapat sama rekan kerja, behavior (perilaku) apa yang paling sering lo lakuin secara refleks?",
    image: LandingImg,
    options: [
      { text: "Diam aja dan nggak ngungkapin apa yang sebenernya lo mau atau rasain.", type: "A" },
      { text: "Maksain pendapat lo harus diterima, dan nganggap ide orang lain itu salah atau bodoh.", type: "B" },
      { text: "Nggak langsung ngomong intinya, malah ghosting, nunda-nunda kerjaan, atau denial.", type: "C" },
      { text: "Jujur dan direct nyampein poin lo, tapi tetap respect sama orang lain.", type: "D" },
    ],
  },
  {
    id: 2,
    text: "Kalau lagi ada di situasi kerja yang under pressure atau banyak gesekan, emosi apa yang biasanya mendominasi diri lo setelahnya?",
    image: LandingImg,
    options: [
      { text: "Takut ditolak, merasa frustrasi sendiri, dan ngerasa self-respect lagi rendah.", type: "A" },
      { text: "Gampang marah dan merasa berkuasa saat itu, tapi habis itu ngerasa guilty (bersalah).", type: "B" },
      { text: "Takut banget sama konfrontasi langsung, tapi ujung-ujungnya ngerasa resent (kesal/dendam) sama orang lain.", type: "C" },
      { text: "Tetap positive about yourself dan sadar betul gimana cara yang benar buat ngetreat orang lain (how you treat others).", type: "D" },
    ],
  },
  {
    id: 3,
    text: "Pas lagi meeting penting face-to-face sama klien atau bos, postur tubuh lo secara nggak sadar tuh kayak gimana?",
    image: P3Img,
    options: [
      { text: "Duduk nunduk dan ngebungkuk, vibes-nya ciut banget.", type: "A" },
      { text: "Nyender kejauhan ke belakang sambil angkat dagu, ala-ala bossy.", type: "B" },
      { text: "Duduk tegak tapi nyilangin tangan kenceng sambil narik badan menjauh.", type: "C" },
      { text: "Punggung tegak, bahu rileks, dan fokus lurus ke lawan bicara. Slay!", type: "D" },
    ],
  },
  {
    id: 4,
    text: "Lagi jelasin ide atau ngejawab pertanyaan susah dari atasan, body language lo biasanya gimana?",
    image: P4Img,
    options: [
      { text: "Gerakan heboh karena overthinking, kayak ngibas tangan atau pegang-pegang baju.", type: "A" },
      { text: "Sering nunjuk muka lawan bicara (pointing fingers) dan majuin badan agak ngancem.", type: "B" },
      { text: "Ngetuk-ngetuk jari atau pulpen konstan dengan muka datar (vibes-nya malesin).", type: "C" },
      { text: "Pake gesture tangan secukupnya biar keliatan natural dan open.", type: "D" },
    ],
  },
  {
    id: 5,
    text: "Pas lagi dengerin arahan di situasi formal yang lumayan intense, cara lo maintain eye contact tuh...",
    image: P5Img,
    options: [
      { text: "Sering nunduk, nggak berani natap mata, atau cuma ngelirik dikit.", type: "A" },
      { text: "Natap tajem tanpa kedip seolah lagi nantangin mereka. Red flag!", type: "B" },
      { text: "Rolling eyes tipis-tipis atau sengaja ngeliatin jam tangan mereka.", type: "C" },
      { text: "Tetep tenang, confident eye contact, dan sesekali buang pandangan biar natural.", type: "D" },
    ],
  },
  {
    id: 6,
    text: "Di tengah diskusi profesional yang panas atau berpotensi debat, ekspresi muka lo tuh dominan kayak gimana?",
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
    text: "Giliran lo buat speak up dan nyampein argumen di dalem ruangan, nada bicara lo biasanya...",
    image: P7Img,
    options: [
      { text: "Kekecilan banget, ragu-ragu, dan terbata-bata sampe susah kedengeran.", type: "A" },
      { text: "Suara keras, mendominasi, dan cepet banget nyerocos tanpa jeda.", type: "B" },
      { text: "Narik napas panjang (heavy sigh) terus jawab pake nada sok manis yang fake.", type: "C" },
      { text: "Ngomong jelas, tempo pas, intonasi variatif, dan minim bilang 'eeeh' atau 'kayak'.", type: "D" },
    ],
  },
  {
    id: 8,
    text: "Soal prioritas kebutuhan di tempat kerja, mindset atau belief mana yang diam-diam paling lo pegang teguh?",
    image: LandingImg,
    options: [
      { text: "Kebutuhan orang lain itu jatuhnya lebih penting daripada kebutuhan diri sendiri.", type: "A" },
      { text: "Kebutuhan lo jelas lebih penting daripada kebutuhan orang lain.", type: "B" },
      { text: "Lo merasa berhak buat menang, tapi sebisa mungkin nggak mau disuruh tanggung jawab.", type: "C" },
      { text: "Kebutuhan lo dan kebutuhan orang lain itu equally matter (sama-sama penting dan berharga).", type: "D" },
    ],
  },
  {
    id: 9,
    text: "Di tengah perdebatan panjang atau konflik tim, sebenernya apa sih goal utama yang pengen banget lo capai?",
    image: LandingImg,
    options: [
      { text: "Sebisa mungkin hindari konflik, mending kasih kontrol atau keputusan akhir ke orang lain aja.", type: "A" },
      { text: "Harus bisa menang dengan cara apa pun.", type: "B" },
      { text: "Pengen menang, tapi main aman tanpa harus kelihatan salah di mata orang.", type: "C" },
      { text: "Both sides keep their self-respect, diselesaiin bareng tanpa ada yang saling ngontrol satu sama lain.", type: "D" },
    ],
  },
];

export const getResult = (answers: PersonalityType[]) => {
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach((ans) => {
    if (counts[ans] !== undefined) counts[ans]++;
  });

  // Find the type with the max count
  let maxType: PersonalityType = 'A';
  let maxCount = -1;
  
  for (const [type, count] of Object.entries(counts)) {
    if (count > maxCount) {
      maxCount = count;
      maxType = type as PersonalityType;
    }
  }

  const resultsData: Record<PersonalityType, { title: string; description: string; emoji: string; color: string }> = {
    A: {
      title: "Pasif (The People Pleaser)",
      description: "Jujurly, lo terlalu sering nahan diri dan fomo sama opini orang lain. Lo emang pendengar yang baik, tapi plis deh, suara lo juga berhak didenger. Jangan takut bilang 'nggak' ya!",
      emoji: "😶",
      color: "bg-[#81D4FA]"
    },
    B: {
      title: "Agresif (The Bossy)",
      description: "Vibes lo tuh dominan banget dan super goal-oriented. Lo berani banget take charge, tapi lowkey sering ngabaikan perasaan rekan kerja. Hati-hati jangan sampe dicap red flag, bestie!",
      emoji: "😡",
      color: "bg-[#FFAB76]"
    },
    C: {
      title: "Pasif-Agresif (The Sarcastic)",
      description: "Lo literally jagonya ngehindarin konflik langsung, tapi ngelampiasinnya lewat sindiran atau body language yang malesin. Keliatannya setuju, tapi di dalem nolak keras. Ayo belajar lebih direct!",
      emoji: "🙄",
      color: "bg-[#FFD54F]"
    },
    D: {
      title: "Asertif (The Slay One)",
      description: "Slayyy! ✨ Lo tuh green flag banget di dunia kerja. Lo bisa nyampein boundary dan pendapat lo dengan tegas tapi tetep super humble and respectful. Pertahanin vibes ini ya!",
      emoji: "🤝",
      color: "bg-[#69C98B]"
    }
  };

  return resultsData[maxType];
};
