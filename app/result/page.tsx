"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useQuizStore } from "@/store/useQuizStore";
import { getResult } from "@/data/questions";
import { T } from "@/data/translations";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Download, RotateCcw, Target } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useUISound } from "@/hooks/useUISound";

// ── TiltCard Component ──
function TiltCard({ children, className, initial, animate }: { children: React.ReactNode; className?: string; initial?: any; animate?: any }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["-50%", "50%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["-50%", "50%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={initial}
      animate={animate}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
    >
      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden rounded-inherit">
        <motion.div
          className="absolute inset-0 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 60%)",
            x: glareX,
            y: glareY,
            scale: 2,
          }}
        />
      </div>
      {children}
    </motion.div>
  );
}

export default function ResultPage() {
  const { answers, resetQuiz } = useQuizStore();
  const t = T.id.result;
  const { playVictory, playPop } = useUISound();

  const [mounted, setMounted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setShowConfetti(true);
      playVictory();
    }, 300);
    
    const hideTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!mounted) return null;

  // Use the answers array to determine the personality type
  const result = getResult(answers);

  const handleDownloadPDF = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      const element = document.getElementById("result-pdf-container");
      if (!element) {
        throw new Error("Result PDF container element not found");
      }

      const html2pdfModule = await import("html2pdf.js");
      const html2pdf = html2pdfModule.default || html2pdfModule;

      const opt = {
        margin: 10,
        filename: `Web_Ivos_Personality_Result.pdf`,
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true, 
          logging: false, 
          windowWidth: 800,
          onclone: (clonedDoc: Document) => {
            const bigEmoji = clonedDoc.querySelector('.drop-shadow-2xl');
            if (bigEmoji) {
              (bigEmoji as HTMLElement).style.filter = 'none';
            }
          }
        },
        jsPDF: { unit: "mm" as const, format: "a4" as const, orientation: "portrait" as const },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Maaf, terjadi kesalahan saat menyimpan PDF. Silakan coba lagi.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleRetake = () => {
    playPop();
    resetQuiz();
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-start py-8 px-4 gap-5 pb-32 relative min-h-screen bg-[#4544ac] overflow-x-hidden">

      {/* ── CELEBRATION CONFETTI PARTICLES ── */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[100]">
          <Confetti 
            width={width} 
            height={height} 
            recycle={false} 
            numberOfPieces={400} 
            gravity={0.2}
            colors={['#f2e1b3', '#ff7b17', '#424ac7', '#000650', '#ffffff', '#f1b32a']} 
          />
        </div>
      )}

      {/* Container to isolate PDF capturing layout */}
      <div id="result-pdf-container" className="w-full max-w-md md:max-w-2xl flex flex-col gap-5 bg-[#f2e1b3] p-4 md:p-6 rounded-[2rem] border-4 border-[#000650] shadow-[8px_8px_0px_#000650]">

        {/* 1. Header Card */}
        <TiltCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${result.color} bento-card !p-6 relative overflow-hidden group border-4 border-[#000650] shadow-[4px_4px_0px_#000650]`}
        >
          <div className="z-10 flex flex-col gap-2 relative pr-16">
            <span className="text-[#000650] text-xs font-poppins font-black uppercase tracking-widest bg-white w-max px-3 py-1 rounded-full border-2 border-[#000650]">
              TIPE KEPRIBADIANMU
            </span>
            <h1 className="text-3xl md:text-5xl font-poppins font-black text-[#000650] leading-tight mb-2 mt-3 break-words">{result.title}</h1>
          </div>
          <div className="absolute right-[-8px] bottom-[-12px] text-[80px] md:text-[120px] opacity-90 filter drop-shadow-2xl">
            {result.emoji}
          </div>
        </TiltCard>

        {/* 2. Work Persona Description */}
        <TiltCard className="bento-card !p-5 md:!p-8 bg-white border-[#000650] border-4 shadow-[4px_4px_0px_#000650] group mt-2">
          <h3 className="text-sm font-poppins font-black uppercase tracking-widest text-[#424ac7] mb-4 flex items-center gap-2">
            <Target size={18} /> DETAIL KARAKTER
          </h3>
          <p className="text-[#000650] text-base md:text-lg leading-relaxed font-lexend font-bold opacity-90">
            {result.description}
          </p>
        </TiltCard>

      </div>

      {/* 3. Navigation Actions (Fixed at bottom — excluded from PDF) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md md:max-w-2xl flex gap-3 z-[100]">

        <motion.button
          onClick={() => {
            playPop();
            handleDownloadPDF();
          }}
          disabled={isDownloading}
          whileHover={isDownloading ? {} : { scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 10 } }}
          whileTap={isDownloading ? {} : { scale: 0.95 }}
          className={`flex-grow bg-[#ff7b17] hover:bg-[#e66a12] text-white py-4 rounded-full font-poppins font-black text-sm uppercase tracking-widest border-2 border-[#000650] shadow-[4px_4px_0px_#000650] hover:shadow-[2px_2px_0px_#000650] hover:translate-x-[2px] hover:translate-y-[2px] flex items-center justify-center gap-2 transition-all ${
            isDownloading ? "opacity-75 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {isDownloading ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              <span>{t.saving}</span>
            </>
          ) : (
            <>
              <Download size={18} />
              <span>{t.saveResult}</span>
            </>
          )}
        </motion.button>

        <motion.button
          disabled={isDownloading}
          whileHover={isDownloading ? {} : { scale: 1.1, transition: { type: "spring", stiffness: 400, damping: 10 } }}
          whileTap={isDownloading ? {} : { scale: 0.95 }}
          onClick={handleRetake}
          className={`bg-white text-[#000650] p-4 rounded-full border-2 border-[#000650] shadow-[4px_4px_0px_#000650] hover:shadow-[2px_2px_0px_#000650] hover:translate-x-[2px] hover:translate-y-[2px] transition-all ${
            isDownloading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          aria-label={t.retake}
        >
          <RotateCcw size={20} />
        </motion.button>
      </div>

    </div>
  );
}
