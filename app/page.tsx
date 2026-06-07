"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Instagram, Linkedin, Ticket, MapPin, Download, ShoppingBag, ArrowRight } from "lucide-react";
import { useQuizStore } from "@/store/useQuizStore";
import { T } from "@/data/translations";
import { useState, useEffect } from "react";
import PromoModal from "@/components/PromoModal";
import CrayonLoadingScreen from "@/components/CrayonLoadingScreen";
import BookCountdown from "@/components/BookCountdown";
import GsapSplitTitle from "@/components/GsapSplitTitle";
import PhysicsBackground from "@/components/PhysicsBackground";
import { useMagneticButton } from "@/hooks/useMagneticButton";
import { useTransitionStore } from "@/store/useTransitionStore";
import { useUISound } from "@/hooks/useUISound";
import confetti from "canvas-confetti";

export default function Home() {
  const resetQuiz = useQuizStore((s) => s.resetQuiz);
  const router = useRouter();
  const { playPop, playSwoosh } = useUISound();
  const t = T.id.landing;

  const [showLoading, setShowLoading] = useState(true);
  const triggerTransition = useTransitionStore((s) => s.triggerTransition);

  // Mouse-move parallax tracking
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const springX = useSpring(rawMouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(rawMouseY, { stiffness: 60, damping: 20 });
  const doodleX1 = useTransform(springX, [-0.5, 0.5], [30, -30]);
  const doodleY1 = useTransform(springY, [-0.5, 0.5], [20, -20]);
  const doodleX2 = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const doodleY2 = useTransform(springY, [-0.5, 0.5], [-30, 30]);
  const doodleX3 = useTransform(springX, [-0.5, 0.5], [15, -15]);
  const doodleY3 = useTransform(springY, [-0.5, 0.5], [25, -25]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      rawMouseX.set((e.clientX / window.innerWidth) - 0.5);
      rawMouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [rawMouseX, rawMouseY]);

  // Magnetic CTA button
  const { ref: ctaRef, motionStyle: ctaStyle, onMouseMove: ctaMouseMove, onMouseLeave: ctaMouseLeave } =
    useMagneticButton<HTMLButtonElement>({ strength: 0.45, radius: 100 });


  const handleStartQuiz = () => {
    playPop();
    // GSAP brush-stroke wipe transition → then navigate
    triggerTransition(() => {
      resetQuiz();
      router.push("/intro");
    });
    // Confetti fires immediately (before wipe covers it)
    confetti({
      particleCount: 80,
      spread: 65,
      origin: { y: 0.55 },
      colors: ["#ff7b17", "#f1b32a", "#424ac7", "#f2e1b3"]
    });
  };


  return (
    <div className="w-full overflow-x-hidden bg-[#f2e1b3] font-lexend text-[#000650]">
      {showLoading && (
        <CrayonLoadingScreen onComplete={() => setShowLoading(false)} />
      )}
      <PromoModal />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[100dvh] flex items-center justify-center pt-20 pb-[100px] lg:pb-[140px] sm:pt-0 z-20">

        {/* Background Wrapper (Clips the orange circle so it doesn't bleed down) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#f2e1b3] pointer-events-none -z-10">
          <div className="absolute -bottom-[300px] sm:-bottom-[380px] right-[10px] sm:right-[6%] w-[581px] sm:w-[836px] h-[581px] sm:h-[836px] bg-[#fa8a20] rounded-full" />
          <div className="absolute bottom-0 left-0 w-full h-[100px] lg:h-[140px] bg-[#fa8a20]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12 relative z-10">

          {/* LEFT SIDE: Text & CTA */}
          <div className="flex flex-col items-start gap-4 lg:gap-6 lg:pl-10 relative z-20 md:mt-24 lg:mt-0">
            {/* Tag: Pssst... */}
            <div className="bg-[#000650] text-[#f2e1b3] font-poppins font-black text-3xl sm:text-4xl lg:text-5xl px-5 py-2 tracking-wide inline-block shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
              Pssst...
            </div>

            {/* Title */}
            <h1 className="text-[#000650] font-poppins font-black text-4xl sm:text-5xl lg:text-[4.5rem] leading-[1.1] tracking-tight flex flex-col gap-3 sm:gap-5">
              <span>Mau tau rahasia</span>
              <span>dilirik HRD?</span>
            </h1>

            {/* Subtitle */}
            <p className="font-lexend text-[#000650] font-medium text-sm sm:text-base max-w-[400px] leading-relaxed mt-2">
              Daripada life after graduate bingung mau ngapain, mending upgrade skill komunikasimu bareng kita!
            </p>

            {/* About Us CTA */}
            <Link
              href="/about"
              className="mt-4 inline-flex items-center gap-3 bg-[#4348c8] text-[#fee5b1] font-lexend font-bold text-sm sm:text-base px-8 py-3 rounded-full hover:scale-105 transition-transform"
            >
              About Us <span className="text-xl leading-none font-light">→</span>
            </Link>
          </div>

          {/* RIGHT SIDE: Graphics */}
          <div className="relative w-full h-[500px] lg:h-[700px] flex items-center justify-center mt-6 lg:mt-0">
            {/* Floating Element 3 (Left-most, pow shape) */}
            <motion.img
              src="/TERBANG3.webp"
              alt="Floating shape"
              className="absolute left-0 md:left-[12%] lg:-left-[5%] top-[33%] min-[375px]:top-[43%] lg:top-[50%] w-12 md:w-16 lg:w-20 object-contain z-10 pointer-events-none"
              animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />

            {/* Floating Element 1 (Top right, brain) */}
            <motion.img
              src="/TERBANG1.webp"
              alt="Floating brain"
              className="absolute right-[2%] md:right-[20%] lg:right-[8%] top-[25%] lg:top-[42%] w-16 md:w-20 lg:w-24 object-contain z-10 pointer-events-none"
              animate={{ y: [15, -15, 15], rotate: [5, -5, 5] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            />

            {/* Floating Element 2 (Bottom right, cloud) */}
            <motion.img
              src="/TERBANG2.webp"
              alt="Floating cloud"
              className="absolute right-[5%] md:right-[18%] lg:-right-[12%] bottom-[15%] lg:bottom-[25%] w-20 md:w-24 lg:w-28 object-contain z-10 pointer-events-none"
              animate={{ y: [-20, 20, -20], x: [10, -10, 10] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />

            {/* Main Character */}
            <img 
              src="/ORANG.webp" 
              alt="Main Character" 
              className="absolute bottom-[-100px] md:-bottom-[150px] lg:-bottom-[200px] left-[45%] md:left-[42%] lg:left-[40%] -translate-x-1/2 w-[147%] md:w-[120%] lg:w-[147%] max-w-[637px] lg:max-w-[943px] object-contain z-20 pointer-events-none"
            />
          </div>

        </div>
      </section>

      {/* ── KUIS CTA (Moved under Hero) ─────────────────────────────────────── */}
      <section className="relative w-full bg-[#4040c0] flex flex-col items-center justify-start pt-0 pb-40 lg:pb-[250px] border-b-4 border-[#000650] text-white overflow-hidden z-10">

        {/* Floating Stars */}
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="absolute top-1/4 left-1/4 opacity-20 text-9xl select-none"></motion.div>
        <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 25, ease: "linear" }} className="absolute bottom-1/4 right-1/4 opacity-20 text-9xl select-none"></motion.div>

        <div className="max-w-3xl mx-auto px-6 text-center flex flex-col items-center relative z-10">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} className="flex flex-col items-center w-full">
            <img
              src="/ITS YOUR TIME.webp"
              alt="It's your time to take a quick quiz!"
              className="w-[120%] sm:w-[110%] max-w-[1050px] object-contain mb-2 sm:mb-4 relative z-0"
            />
            <p className="text-xl sm:text-2xl font-lexend text-white mb-6 sm:mb-8 max-w-3xl mx-auto px-4 -mt-[120px] min-[400px]:-mt-[160px] sm:-mt-[240px] md:-mt-[320px] lg:-mt-[400px] relative z-10">
              {t.quizCTA.body}
            </p>
            {/* Magnetic CTA button */}
            <motion.button
              ref={ctaRef}
              style={ctaStyle}
              onMouseMove={ctaMouseMove}
              onMouseLeave={ctaMouseLeave}
              onClick={handleStartQuiz}
              className="group relative z-10 inline-flex items-center gap-4 bg-[#ff7f0f] hover:bg-[#e67300] text-white text-xl sm:text-2xl font-poppins font-black px-12 py-5 rounded-[40px] border-[4px] border-[#000650] shadow-[8px_8px_0px_#000650] hover:shadow-[4px_4px_0px_#000650] transition-shadow cursor-none"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.93 }}
              transition={{ type: "spring", stiffness: 380, damping: 18 }}
            >
              {t.quizCTA.cta}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={28} strokeWidth={3} />
            </motion.button>
          </motion.div>
        </div>
      </section>


      {/* ── 4 TIPE KEPRIBADIAN ──────────────────────────────────────────────── */}
      <section className="w-full bg-[#f2e1b3] min-h-[100dvh] flex flex-col items-center justify-center py-24 border-b-4 border-[#000650] relative overflow-hidden">

        {/* Gimmick shapes */}
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 6 }} className="absolute -top-10 -right-10 w-64 h-64 bg-[#ff7b17]/10 rounded-full blur-3xl pointer-events-none" />
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 8 }} className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#424ac7]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-poppins font-black text-[#000650]">
              {t.showcase.heading}
            </h2>
            <p className="text-lg font-lexend font-bold text-[#424ac7] mt-4">
              {t.showcase.sub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.showcase.types.map((type, i) => {
              const images = ["/PASIF.webp", "/AGRESIF.webp", "/PASIF_AGRESIF.webp", "/ASERTIF.webp"];
              const ringColors = ["#4040c0", "#000650", "#ff7b17", "#000650"];
              const dotColors = ["#ff7b17", "#ff7b17", "#4040c0", "#ff7b17"];
              return (
                <motion.div
                  key={type.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  className={`${type.color} rounded-[2rem] p-8 border-4 border-[#000650] shadow-[8px_8px_0px_#000650] flex flex-col items-center text-center gap-4 transition-transform cursor-default`}
                >
                  {/* Animated circular frame */}
                  <div className="relative flex items-center justify-center w-44 sm:w-56 h-44 sm:h-56 mb-2">
                    {/* Outer pulsing ring */}
                    <motion.div
                      animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-full border-4"
                      style={{ borderColor: ringColors[i], borderStyle: "solid" }}
                    />
                    {/* Rotating dashed ring */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                      className="absolute rounded-full border-4"
                      style={{
                        inset: "-10px",
                        borderColor: dotColors[i],
                        borderStyle: "dashed",
                        borderWidth: "3px",
                      }}
                    />
                    {/* Orbiting dot */}
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                      className="absolute w-full h-full"
                    >
                      <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-[#000650]"
                        style={{ backgroundColor: dotColors[i] }}
                      />
                    </motion.div>
                    {/* Inner solid circle with image */}
                    <div
                      className="w-36 sm:w-44 h-36 sm:h-44 rounded-full overflow-hidden border-4 border-[#000650] shadow-[4px_4px_0px_#000650] bg-[#f2e1b3] flex items-end justify-center relative z-10"
                    >
                      <img
                        src={images[i]}
                        alt={type.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-poppins font-black text-[#000650]">{type.name}</h3>
                  <p className="font-lexend font-semibold text-[#000650] text-base sm:text-lg leading-snug">
                    {type.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ── POSTER BUKU & TICKET EVENT ──────────────────────────────────────── */}
      <section className="w-full bg-[#fee5b1] min-h-[100dvh] flex flex-col items-center justify-center py-24 border-b-4 border-[#000650]">
        <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-center">

          {/* BUY BOOK */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col items-start text-left">
            <span className="inline-block bg-[#ff7b17] text-white font-poppins font-black text-sm px-4 py-1.5 rounded-full border-2 border-[#000650] mb-6 uppercase tracking-wider">
              {t.buyBanner.badge}
            </span>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-8">
              <div className="w-56 sm:w-64 flex-shrink-0 relative -rotate-3 hover:rotate-0 transition-transform duration-300 flex items-center justify-center">
                <img src="/BUKU.webp" alt="Buku Web Ivo's" className="w-full h-auto object-contain drop-shadow-xl" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-4xl sm:text-5xl font-poppins font-black text-[#000650] leading-tight mb-4">
                  {t.buyBanner.title} <span className="text-[#424ac7]">{t.buyBanner.highlight}</span> {t.buyBanner.suffix}
                </h3>
                <p className="text-[#424ac7] font-bold text-lg">
                  {t.buyBanner.sub}
                </p>
              </div>
            </div>
            <motion.button
              onClick={() => router.push("/shop")}
              whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 10 } }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-[#f1b32a] hover:bg-[#d9a022] text-[#000650] font-poppins font-black text-lg px-8 py-4 rounded-full border-4 border-[#000650] shadow-[4px_4px_0px_#000650] hover:shadow-[2px_2px_0px_#000650] transition-all hover:translate-x-[2px] hover:translate-y-[2px] cursor-pointer"
            >
              <ShoppingBag size={22} strokeWidth={2.5} />
              {t.buyBanner.cta}
            </motion.button>
          </motion.div>

          {/* TICKET EVENT COMPONENT */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative w-full max-w-[560px] mx-auto lg:ml-auto">
            {/* Absolute photobooth circle (Overlapping ticket) */}
            <div className="absolute right-2 sm:right-6 bottom-2 sm:bottom-4 z-20 flex flex-col items-center w-36 sm:w-40 pointer-events-none">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#ff7b17] flex flex-col items-center justify-center relative">
                
                {/* Photo strips mockup */}
                <div className="absolute top-2 left-4 w-6 h-14 bg-white border-[1.5px] border-[#000650] rotate-[-15deg] shadow-sm flex flex-col gap-[2px] p-[2px] z-0">
                   <div className="flex-1 bg-gray-300"></div>
                   <div className="flex-1 bg-gray-300"></div>
                   <div className="flex-1 bg-gray-300"></div>
                </div>
                <div className="absolute top-1 right-4 w-6 h-14 bg-white border-[1.5px] border-[#000650] rotate-[10deg] shadow-sm flex flex-col gap-[2px] p-[2px] z-0">
                   <div className="flex-1 bg-gray-300"></div>
                   <div className="flex-1 bg-gray-300"></div>
                   <div className="flex-1 bg-gray-300"></div>
                </div>

                <span className="font-hoppin text-white text-[15px] sm:text-[17px] leading-tight mt-5 z-10 text-center drop-shadow-sm">
                  Get Free
                </span>
                
                {/* Pill overlap */}
                <div className="absolute -bottom-3 bg-[#ff7b17] border-[2px] border-[#f2e1b3] text-white font-hoppin text-[10px] sm:text-xs px-3 py-1 rounded-xl shadow-[2px_2px_0px_rgba(0,0,0,0.15)] whitespace-nowrap z-20">
                  Photobooth Ticket
                </div>
              </div>
              
              {/* Text below the circle */}
              <span className="mt-4 font-hoppin text-[#ff7b17] text-[10px] sm:text-[11px] drop-shadow-[1px_1px_0px_white]">
                Untuk 5 Orang Beruntung
              </span>
            </div>

            {/* Ticket card — retro style with navy border + bold shadow */}
            <div className="rounded-[2rem] overflow-hidden border-4 border-[#000650] shadow-[8px_8px_0px_#ff7b17]">

              {/* Ticket top — navy */}
              <div className="px-5 sm:px-7 pt-10 pb-12 bg-[#000650] relative">
                <h2 className="text-center font-hoppin text-2xl sm:text-3xl lg:text-4xl text-[#f1b32a] uppercase mb-8" style={{ textShadow: "1.5px 1.5px 0px #000" }}>
                  OFFICIAL BOOK LAUNCH
                </h2>

                <div className="flex flex-col gap-3 relative z-10 sm:max-w-[85%] mx-auto w-fit">
                  <div className="flex flex-wrap justify-start gap-2">
                    {["Book Display", "Merchandise", "Mentorship Corner"].map((item, i) => (
                      <div key={i} className="bg-[#424ac7] text-[#f2e1b3] font-hoppin text-[11px] sm:text-sm px-3 py-1.5 shadow-[2px_2px_0px_#000650] border-[1.5px] border-[#000650] rounded-sm">
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap justify-start gap-2">
                    <div className="bg-[#424ac7] text-[#f2e1b3] font-hoppin text-[11px] sm:text-sm px-3 py-1.5 shadow-[2px_2px_0px_#000650] border-[1.5px] border-[#000650] rounded-sm">
                      Interactive Quiz
                    </div>
                  </div>
                </div>
              </div>

              {/* Perforated divider — retro ticket style */}
              <div className="relative flex items-center bg-[#f2e1b3]">
                <div className="absolute -left-4 w-8 h-8 rounded-full bg-[#f2e1b3] border-4 border-[#000650]" />
                <div className="w-full border-t-[3px] border-dashed border-[#000650]/40 mx-6" />
                <div className="absolute -right-4 w-8 h-8 rounded-full bg-[#f2e1b3] border-4 border-[#000650]" />
              </div>

              {/* Ticket bottom — cream */}
              <div className="bg-[#f2e1b3] px-5 sm:px-7 py-8 flex items-end justify-between pr-24 sm:pr-32">
                <div>
                  <p className="text-[11px] text-[#ff7b17] font-hoppin uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    Waktu dan Lokasi
                  </p>
                  <p className="text-[#000650] font-hoppin text-xl sm:text-2xl leading-snug tracking-tight">
                    Pollux Mall 10.00 - 22.00
                  </p>
                  <p className="text-[#000650] font-lexend text-sm sm:text-base font-bold mt-1 tracking-tight">
                    Sabtu, 1 Agustus 2026
                  </p>
                </div>

                {/* QR placeholder — removed to make space for photobooth graphic */}
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── COUNTDOWN PRESENTASI BUKU ───────────────────────────────────────── */}
      <BookCountdown />

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="w-full bg-[#f2e1b3] pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-16">
          {/* Top Section: Split Layout */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 w-full">
            
            {/* Left Side: Contact */}
            <div className="flex flex-col items-start gap-4 z-10 relative">
              <h3 className="text-[#000650] font-poppins font-black text-lg md:text-xl uppercase tracking-widest">
                CONNECT WITH US
              </h3>
              
              <div className="flex flex-col gap-3 mt-2">
                <a href="https://www.instagram.com/firstjob_guide/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 bg-white border-2 border-[#000650] shadow-[4px_4px_0px_#000650] hover:shadow-[2px_2px_0px_#000650] hover:translate-x-[2px] hover:translate-y-[2px] px-4 py-2 rounded-full transition-all cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-[#f2e1b3] flex items-center justify-center text-[#424ac7] group-hover:text-[#ff7b17] transition-colors border-2 border-[#000650]">
                    <Instagram size={16} strokeWidth={2.5} />
                  </div>
                  <span className="font-poppins font-black text-[#000650] text-sm group-hover:text-[#ff7b17] transition-colors">@firstjob_guide</span>
                </a>
                
                <a href="https://www.tiktok.com/@firstjob_guide" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 bg-white border-2 border-[#000650] shadow-[4px_4px_0px_#000650] hover:shadow-[2px_2px_0px_#000650] hover:translate-x-[2px] hover:translate-y-[2px] px-4 py-2 rounded-full transition-all cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-[#f2e1b3] flex items-center justify-center text-[#424ac7] group-hover:text-[#ff7b17] transition-colors border-2 border-[#000650]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
                  </div>
                  <span className="font-poppins font-black text-[#000650] text-sm group-hover:text-[#ff7b17] transition-colors">@firstjob_guide</span>
                </a>
              </div>
            </div>

            {/* Right Side: Collaboration */}
            <div className="flex flex-col items-center md:items-end w-full md:w-auto -mb-4 md:-mb-32 mt-12 md:mt-0">
              <h3 className="text-[#000650] font-poppins font-black text-lg md:text-xl uppercase mb-4 md:mb-2 text-center md:text-right tracking-widest relative z-10">
                IN COLLABORATION WITH
              </h3>
              <div className="flex flex-col items-center md:items-end w-full -mt-10 md:-mt-32 translate-x-0 md:translate-x-24 scale-[0.84] md:scale-100 origin-top md:origin-right">
                {/* Row 1 */}
                <div className="flex flex-nowrap items-center justify-center md:justify-end gap-2 md:gap-2">
                  <img src="/LOGO6.webp" alt="Logo Collaboration" className="h-12 md:h-24 object-contain" />
                  <img src="/LOGO2.webp" alt="Logo Collaboration" className="h-32 md:h-60 object-contain" />
                  <img src="/LOGO4.webp" alt="Logo Collaboration" className="h-[13rem] md:h-[25rem] object-contain translate-y-[5%]" />
                </div>
                {/* Row 2 */}
                <div className="flex flex-nowrap items-center justify-center md:justify-end gap-2 md:gap-2 -mt-32 md:-mt-64 translate-y-[3%]">
                  <img src="/LOGO1.webp" alt="Logo Collaboration" className="h-32 md:h-60 object-contain translate-y-[7%]" />
                  <img src="/LOGO3.webp" alt="Logo Collaboration" className="h-32 md:h-60 object-contain" />
                  <img src="/LOGO5.webp" alt="Logo Collaboration" className="h-9 md:h-16 object-contain" />
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Section Wrapper to compress vertical space */}
          <div className="flex flex-col gap-6 w-full">
            {/* Divider */}
            <div className="w-full border-t border-[#000650]/10" />

            {/* Developer & Copyright */}
            <div className="text-center flex flex-col items-center justify-center gap-2">
              <p className="text-[10px] font-poppins font-black uppercase tracking-[0.3em] text-[#ff7b17]">{t.footer.developedBy}</p>
              <img src="/LOGO5.webp" alt="Developed by" className="h-8 md:h-10 w-auto object-contain" />
              <p className="text-[11px] text-[#000650]/60 text-center font-bold mt-1">
                {t.footer.copyright}
                {t.footer.tagline && <><br />{t.footer.tagline}</>}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
