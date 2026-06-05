"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRouter } from "next/navigation";
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
      <section className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center border-b-4 border-[#000650]">

        {/* Background photo */}
        <div className="absolute inset-0 bg-[url('/Landing.PNG')] bg-cover bg-center bg-no-repeat animate-squigglevision pointer-events-none z-0" />
        <div className="absolute inset-0 bg-white/25 backdrop-blur-[2px] pointer-events-none z-0" />

        {/* Matter.js physics playground — doodle shapes fall & respond to cursor */}
        <PhysicsBackground />

        {/* Parallax SVG doodles (Framer Motion layer) */}
        <motion.div className="absolute top-[12%] left-[8%] pointer-events-none select-none opacity-70 z-10" style={{ x: doodleX1, y: doodleY1 }}>
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" style={{ filter: "url(#squiggle-2)" }}>
            <circle cx="30" cy="30" r="24" stroke="#ff7b17" strokeWidth="3.5" strokeDasharray="6 5" />
            <circle cx="30" cy="30" r="12" stroke="#ff7b17" strokeWidth="2" opacity="0.4" />
          </svg>
        </motion.div>
        <motion.div className="absolute bottom-[15%] right-[7%] pointer-events-none select-none opacity-60 z-10" style={{ x: doodleX2, y: doodleY2 }}>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ filter: "url(#squiggle-1)" }}>
            <rect x="10" y="10" width="60" height="60" rx="8" stroke="#000650" strokeWidth="3" strokeDasharray="8 5" />
            <rect x="22" y="22" width="36" height="36" rx="4" stroke="#424ac7" strokeWidth="2" opacity="0.5" />
          </svg>
        </motion.div>
        <motion.div className="absolute top-[55%] left-[5%] pointer-events-none select-none opacity-50 z-10" style={{ x: doodleX3, y: doodleY3 }} animate={{ rotate: [0, 20, -10, 0] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}>
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" style={{ filter: "url(#squiggle-3)" }}>
            <polygon points="25,5 47,42 3,42" stroke="#f1b32a" strokeWidth="3" strokeLinejoin="round" fill="none" />
          </svg>
        </motion.div>
        <motion.div className="absolute top-[20%] right-[10%] pointer-events-none select-none opacity-50 z-10" style={{ x: doodleX2, y: doodleY3 }} animate={{ rotate: [0, -15, 10, 0] }} transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}>
          <svg width="55" height="55" viewBox="0 0 55 55" fill="none" style={{ filter: "url(#squiggle-0)" }}>
            <path d="M27.5 5 L50 48 L5 48 Z" stroke="#424ac7" strokeWidth="3" strokeLinejoin="round" fill="none" />
          </svg>
        </motion.div>

        {/* Hero text — GSAP elastic char-by-char entrance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.01, delay: 0.4 }}
          className="relative z-20 flex flex-col items-center text-center px-4 max-w-4xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-poppins font-black text-[#000650] tracking-tight drop-shadow-md">
            <GsapSplitTitle text={t.hero.title} delay={0.55} charMode={false} />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-6 text-base sm:text-lg text-[#000650] font-lexend font-bold px-8 py-3 bg-[#f2e1b3] rounded-full border-2 border-[#000650] shadow-[4px_4px_0px_#000650]"
          >
            {t.hero.subtitle}
          </motion.p>
        </motion.div>
      </section>

      {/* ── INTRO / MENGAPA WEB INI DIBUAT ───────────────────────────────────── */}
      <section className="w-full bg-[#f1b32a] min-h-screen flex flex-col items-center justify-center py-20 border-b-4 border-[#000650] relative overflow-hidden">
        
        {/* Floating background gimmicks */}
        <motion.div animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute top-10 left-4 md:top-20 md:left-20 opacity-40 text-5xl md:text-7xl select-none">✨</motion.div>
        <motion.div animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="absolute bottom-20 right-4 md:bottom-32 md:right-20 opacity-40 text-6xl md:text-8xl select-none">💡</motion.div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-5xl font-poppins font-black text-[#000650] mb-6">
              {t.intro.heading}
            </h2>
            <p className="text-lg sm:text-xl font-lexend font-semibold text-[#000650]/90 leading-relaxed max-w-3xl mx-auto">
              {t.intro.body}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 4 TIPE KEPRIBADIAN ──────────────────────────────────────────────── */}
      <section className="w-full bg-[#f2e1b3] min-h-screen flex flex-col items-center justify-center py-24 border-b-4 border-[#000650] relative overflow-hidden">
        
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
            {t.showcase.types.map((type, i) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className={`${type.color} rounded-[2rem] p-8 border-4 border-[#000650] shadow-[8px_8px_0px_#000650] flex flex-col items-start gap-4 transition-transform cursor-default`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-6xl animate-squigglevision inline-block bg-white p-3 rounded-full border-2 border-[#000650]">{type.emoji}</span>
                  <h3 className="text-3xl font-poppins font-black text-[#000650]">{type.name}</h3>
                </div>
                <p className="font-lexend font-semibold text-[#000650] text-lg leading-snug">
                  {type.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KUIS CTA ────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#424ac7] min-h-screen flex flex-col items-center justify-center py-28 border-b-4 border-[#000650] text-white relative overflow-hidden">
        
        {/* Floating Stars */}
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="absolute top-1/4 left-1/4 opacity-20 text-9xl select-none">⭐</motion.div>
        <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 25, ease: "linear" }} className="absolute bottom-1/4 right-1/4 opacity-20 text-9xl select-none">🔥</motion.div>

        <div className="max-w-3xl mx-auto px-6 text-center flex flex-col items-center relative z-10">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-4xl sm:text-6xl font-poppins font-black mb-6 leading-tight">
              {t.quizCTA.heading}
            </h2>
            <p className="text-xl font-lexend text-white/90 mb-12 max-w-2xl mx-auto">
              {t.quizCTA.body}
            </p>
            {/* Magnetic CTA button */}
            <motion.button
              ref={ctaRef}
              style={ctaStyle}
              onMouseMove={ctaMouseMove}
              onMouseLeave={ctaMouseLeave}
              onClick={handleStartQuiz}
              className="group inline-flex items-center gap-4 bg-[#ff7b17] hover:bg-[#e66a12] text-white text-xl sm:text-2xl font-poppins font-black px-12 py-5 rounded-full border-4 border-[#000650] shadow-[6px_6px_0px_#000650] hover:shadow-[3px_3px_0px_#000650] transition-shadow cursor-none"
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

      {/* ── POSTER BUKU & TICKET EVENT ──────────────────────────────────────── */}
      <section className="w-full bg-white min-h-screen flex flex-col items-center justify-center py-24 border-b-4 border-[#000650]">
        <div className="max-w-6xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* BUY BOOK */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col items-start text-left">
            <span className="inline-block bg-[#ff7b17] text-white font-poppins font-black text-sm px-4 py-1.5 rounded-full border-2 border-[#000650] mb-6 uppercase tracking-wider">
              {t.buyBanner.badge}
            </span>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-8">
              <div className="w-48 h-64 bg-[#f2e1b3] border-4 border-[#000650] shadow-[6px_6px_0px_#000650] rounded-lg overflow-hidden flex-shrink-0 relative -rotate-3 hover:rotate-0 transition-transform duration-300">
                <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop" alt="Buku Web Ivo's" className="w-full h-full object-cover" />
                <div className="absolute top-0 left-0 w-4 h-full bg-black/10" />
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
            <motion.a
              href="https://bit.ly/PreOrderFirstJobGuide"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 10 } }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-[#f1b32a] hover:bg-[#d9a022] text-[#000650] font-poppins font-black text-lg px-8 py-4 rounded-full border-4 border-[#000650] shadow-[4px_4px_0px_#000650] hover:shadow-[2px_2px_0px_#000650] transition-all hover:translate-x-[2px] hover:translate-y-[2px] cursor-pointer"
            >
              <ShoppingBag size={22} strokeWidth={2.5} />
              {t.buyBanner.cta}
            </motion.a>
          </motion.div>

          {/* TICKET EVENT COMPONENT */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative w-full max-w-md mx-auto lg:ml-auto">
            <div className="bg-[#000650] rounded-[2rem] border-4 border-[#000650] shadow-[8px_8px_0px_#ff7b17] flex flex-col relative overflow-hidden">
              
              {/* Floating Download Button */}
              <button 
                onClick={() => { playSwoosh(); alert("Kupon sedang diunduh..."); }}
                className="absolute top-6 right-6 w-16 h-16 bg-[#ff7b17] hover:bg-[#e66a12] text-white rounded-full border-2 border-[#000650] flex flex-col items-center justify-center z-10 transition-transform hover:scale-110"
              >
                <Download size={20} strokeWidth={3} />
                <span className="text-[8px] font-poppins font-black text-center mt-1 leading-tight whitespace-pre-wrap">{t.ticket.downloadBtn}</span>
              </button>

              {/* Top Section */}
              <div className="p-8 pb-10">
                <div className="flex items-center gap-2 text-[#f1b32a] mb-6">
                  <Ticket size={18} strokeWidth={3} />
                  <span className="font-poppins font-black text-xs uppercase tracking-[0.2em]">{t.ticket.badge}</span>
                </div>
                <p className="text-[#81D4FA] font-lexend font-bold text-sm tracking-widest mb-4">
                  {t.ticket.title}
                </p>
                <h4 className="text-8xl font-poppins font-black text-[#ff7b17] tracking-tighter">
                  196
                </h4>
              </div>

              {/* Dashed Line separator */}
              <div className="w-full relative flex items-center">
                <div className="w-5 h-5 bg-white border-r-4 border-y-4 border-[#000650] rounded-r-full absolute left-0 z-10 -translate-x-[4px]" />
                <div className="flex-1 h-0 border-t-4 border-dashed border-[#f2e1b3]/40 mx-4" />
                <div className="w-5 h-5 bg-white border-l-4 border-y-4 border-[#000650] rounded-l-full absolute right-0 z-10 translate-x-[4px]" />
              </div>

              {/* Bottom Section */}
              <div className="bg-[#f2e1b3] p-8 flex items-center justify-between border-t-4 border-[#000650]">
                <div>
                  <div className="flex items-center gap-2 text-[#000650]/60 mb-2">
                    <MapPin size={16} strokeWidth={3} className="text-[#ff7b17]" />
                    <span className="font-poppins font-bold text-xs tracking-wider">LOKASI</span>
                  </div>
                  <p className="font-poppins font-black text-xl text-[#000650]">
                    {t.ticket.location}
                  </p>
                  <p className="font-lexend font-bold text-[#424ac7] text-sm mt-1">
                    {t.ticket.date}
                  </p>
                </div>
                
                {/* QR Code / Camera Placeholder */}
                <div className="w-16 h-16 bg-white border-2 border-dashed border-[#000650] rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl animate-squigglevision">📸</span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* ── COUNTDOWN PRESENTASI BUKU ───────────────────────────────────────── */}
      <BookCountdown />

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="w-full bg-[#f2e1b3] py-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-8">
          <div className="flex items-center gap-6">
            <a href="mailto:contact@ivopermata.com" className="w-12 h-12 bg-white border-2 border-[#000650] shadow-[3px_3px_0px_#000650] active:shadow-[1px_1px_0px_#000650] active:translate-x-[2px] active:translate-y-[2px] rounded-full flex items-center justify-center text-[#424ac7] active:text-[#ff7b17] transition-all cursor-pointer">
              <Mail size={20} strokeWidth={2.5} />
            </a>
            <a href="https://www.instagram.com/teresaivo_/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white border-2 border-[#000650] shadow-[3px_3px_0px_#000650] active:shadow-[1px_1px_0px_#000650] active:translate-x-[2px] active:translate-y-[2px] rounded-full flex items-center justify-center text-[#424ac7] active:text-[#ff7b17] transition-all cursor-pointer">
              <Instagram size={20} strokeWidth={2.5} />
            </a>
            {/* Added TikTok placeholder link since requested */}
            <a href="#" className="w-12 h-12 bg-white border-2 border-[#000650] shadow-[3px_3px_0px_#000650] active:shadow-[1px_1px_0px_#000650] active:translate-x-[2px] active:translate-y-[2px] rounded-full flex items-center justify-center text-[#424ac7] active:text-[#ff7b17] transition-all cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
            </a>
            <a href="#" className="w-12 h-12 bg-white border-2 border-[#000650] shadow-[3px_3px_0px_#000650] active:shadow-[1px_1px_0px_#000650] active:translate-x-[2px] active:translate-y-[2px] rounded-full flex items-center justify-center text-[#424ac7] active:text-[#ff7b17] transition-all cursor-pointer">
              <Linkedin size={20} strokeWidth={2.5} />
            </a>
          </div>
          
          <div className="w-full max-w-md h-[2px] bg-[#000650]/10" />
          
          <div className="text-center flex flex-col items-center gap-2">
            <p className="text-[10px] font-poppins font-black uppercase tracking-[0.3em] text-[#ff7b17]">{t.footer.developedBy}</p>
            <h3 className="text-3xl font-poppins font-black tracking-tight text-[#000650]">Ivo Permata</h3>
          </div>
          
          <p className="text-xs text-[#000650]/60 text-center font-bold">
            {t.footer.copyright}<br />{t.footer.tagline}
          </p>
        </div>
      </footer>
    </div>
  );
}
