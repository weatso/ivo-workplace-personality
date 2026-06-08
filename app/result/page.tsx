"use client";

import { motion } from "framer-motion";
import { useQuizStore } from "@/store/useQuizStore";
import { getResult } from "@/data/questions";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Download, ArrowRight } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useUISound } from "@/hooks/useUISound";

export default function ResultPage() {
  const { answers, resetQuiz } = useQuizStore();
  const { playVictory, playPop } = useUISound();

  const [mounted, setMounted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setShowConfetti(true);
      playVictory();
    }, 300);
    const hideTimer = setTimeout(() => setShowConfetti(false), 5000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!mounted) return null;

  const result = getResult(answers);

  const handleDownloadImage = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const element = document.getElementById("result-pdf-container");
      if (!element) throw new Error("Element not found");
      
      const html2canvasModule = await import("html2canvas");
      const html2canvas = html2canvasModule.default;
      
      const canvas = await html2canvas(element, { 
        scale: 2, 
        useCORS: true, 
        logging: false,
        backgroundColor: "#f2e1b3" 
      });
      
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `WorkPersona_Result.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating Image:", error);
      alert("Maaf, terjadi kesalahan saat menyimpan gambar.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleNext = () => {
    playPop();
    router.push("/offer");
  };

  return (
    /* Full page wrapper - dark blue bg */
    <div className="min-h-[100dvh] bg-[#3d3db5] flex flex-col items-center pb-0 overflow-x-hidden">

      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[100]">
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={400}
            gravity={0.2}
            colors={["#f2e1b3", "#ff7b17", "#424ac7", "#000650", "#ffffff", "#f1b32a"]}
          />
        </div>
      )}

      {/* ── SCROLLABLE CONTENT AREA ── */}
      <div className="flex-1 w-full flex flex-col items-center px-4 pt-8 pb-10">

        {/* ─────────────── POSTER CARD ─────────────── */}
        <motion.div
          id="result-pdf-container"
          ref={cardRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[380px] rounded-[24px] border-4 border-[#000650] shadow-[6px_6px_0px_#000000] overflow-hidden bg-[#3d3db5]"
        >

          {/* ── A) HEADER: Kamu adalah + Judul + Hashtag + Karakter ── */}
          <div className="px-5 pt-5 pb-3 bg-[#3d3db5] relative">

            {/* Badge */}
            <div className="inline-block bg-[#f2e1b3] text-[#000650] font-poppins font-bold text-[11px] px-4 py-1 rounded-full border-2 border-[#000650] mb-4">
              Kamu adalah...
            </div>

            {/* Title + Character row */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h1
                  className="font-poppins font-black text-white leading-[1.2] mb-6"
                  style={{
                    fontSize: "clamp(1.5rem, 7.2vw, 2.15rem)",
                    WebkitTextStroke: "1.5px #000000",
                    paintOrder: "stroke fill",
                    textShadow: "2px 2px 0px #000000",
                  }}
                >
                  {result.title}
                </h1>
                {/* Hashtags */}
                <div className="flex flex-wrap gap-1.5">
                  {result.hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#ff7b17] text-white font-poppins font-black text-[10px] px-2.5 py-1 rounded-full border-[1.5px] border-[#000650]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Character circle */}
              <div className="flex-shrink-0 w-[86px] h-[86px] -mt-4 rounded-full border-4 border-[#000650] bg-[#f2e1b3] overflow-hidden shadow-[3px_3px_0px_#000000]">
                <img
                  src={result.image}
                  alt={result.title}
                  className="w-full h-full object-cover object-top scale-110"
                />
              </div>
            </div>
          </div>

          {/* ── B) NOTEBOOK AREA ── */}
          <div className="relative flex flex-col">

            {/* NOTES.webp — single image, natural width, do NOT repeat */}
            <div className="w-full relative z-20" style={{ height: "56px" }}>
              <img
                src="/NOTES.webp"
                alt="Notebook binding"
                className="w-full h-full object-cover object-top scale-[1.15]"
                style={{ objectFit: "cover", objectPosition: "top" }}
              />
              {/* TANGAN.webp — overlapping right side */}
              <img
                src="/TANGAN.webp"
                alt="Hand with pen"
                className="absolute right-[-10px] top-[15px] w-28 object-contain pointer-events-none z-50 drop-shadow-xl"
              />
            </div>

            {/* Notebook content */}
            {/* The paper background starts slightly underneath the spiral */}
            <div className="bg-[#fee5b1] px-4 pt-6 pb-5 flex flex-col gap-3 relative z-10 -mt-2">

              {/* WARNING box */}
              <div className="bg-[#3d3db5] rounded-2xl p-3 border-2 border-[#000650]">
                <div className="flex justify-center mb-2">
                  <span className="bg-[#fee5b1] text-[#000650] font-poppins font-black text-xs px-6 py-1 rounded-full border-2 border-[#000650]">
                    WARNING!
                  </span>
                </div>
                <p className="text-white font-poppins font-black text-[11px] mb-1 leading-snug">
                  {result.warning}
                </p>
                <p className="text-white font-lexend text-[10px] leading-relaxed whitespace-pre-line">
                  {result.warningDetail}
                </p>
              </div>

              {/* KEKURANGAN + KELEBIHAN */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1.5">
                  <div className="bg-[#ff7b17] text-white font-poppins font-black text-center text-[10px] px-2 py-1.5 rounded-full border-2 border-[#000650]">
                    KEKURANGAN
                  </div>
                  <div className="bg-[#fee5b1] border-2 border-[#000650] rounded-xl p-3 text-[#000650] font-lexend font-semibold text-[10px] leading-snug flex-1 text-center flex items-center justify-center">
                    {result.kekurangan}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="bg-[#ff7b17] text-white font-poppins font-black text-center text-[10px] px-2 py-1.5 rounded-full border-2 border-[#000650]">
                    KELEBIHAN
                  </div>
                  <div className="bg-[#fee5b1] border-2 border-[#000650] rounded-xl p-3 text-[#000650] font-lexend font-semibold text-[10px] leading-snug flex-1 text-center flex items-center justify-center">
                    {result.kelebihan}
                  </div>
                </div>
              </div>

              {/* SEFRUIT TIPS */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-center">
                  <span className="bg-[#3d3db5] text-white font-poppins font-black text-xs px-6 py-1 rounded-full border-2 border-[#000650]">
                    SEFRUIT TIPS
                  </span>
                </div>
                <div className="bg-[#fee5b1] border-2 border-[#000650] rounded-xl p-3 text-[#000650] text-center">
                  <p className="font-poppins font-black text-[11px] mb-1.5 leading-snug">
                    {result.tipTitle}
                  </p>
                  <p className="font-lexend font-medium text-[10px] leading-relaxed whitespace-pre-line">
                    {result.tipDetail}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* ── C) BOTTOM BAR inside card (for Image export only) ── */}
          <div className="bg-[#000650] px-5 py-3 flex items-center justify-between">
            <div>
              <p className="text-white font-poppins font-black text-xs leading-tight">WHICH COMMUNICATOR</p>
              <p className="text-white font-poppins font-black text-xs">ARE YOU?</p>
            </div>
            <div className="text-right">
              <p className="text-[#f2e1b3] font-lexend text-[10px]">Mau tes juga?</p>
              <p className="text-[#f2e1b3] font-poppins font-black text-[10px]">IG @firstjob_guide</p>
            </div>
          </div>

        </motion.div>
        {/* ─────────────── END POSTER CARD ─────────────── */}

      </div>

      {/* ── STICKY BOTTOM BAR (full device width) ── */}
      <div className="w-full bg-[#000650] px-4 sm:px-6 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sticky bottom-0 z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.3)] border-t-4 border-[#000000] rounded-t-[20px]">
        <div className="max-w-[420px] mx-auto w-full flex flex-col gap-4">
          {/* ── ACTION BUTTONS (inside sticky bottom bar) ── */}
          <div className="w-full flex gap-3">
            <motion.button
              onClick={() => { playPop(); handleDownloadImage(); }}
              disabled={isDownloading}
              whileHover={isDownloading ? {} : { scale: 1.03 }}
              whileTap={isDownloading ? {} : { scale: 0.97 }}
              className={`flex-grow bg-[#ff7b17] hover:bg-[#e66a12] text-white py-4 rounded-full font-poppins font-black text-sm uppercase tracking-widest border-2 border-[#000650] shadow-[4px_4px_0px_#000000] flex items-center justify-center gap-2 transition-all ${isDownloading ? "opacity-75 cursor-not-allowed" : "cursor-pointer"}`}
            >
              {isDownloading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Download size={18} />
                  <span>Save Hasil</span>
                </>
              )}
            </motion.button>

            <motion.button
              disabled={isDownloading}
              whileHover={isDownloading ? {} : { scale: 1.1 }}
              whileTap={isDownloading ? {} : { scale: 0.95 }}
              onClick={handleNext}
              className={`bg-white text-[#000650] p-4 rounded-full border-2 border-[#000650] shadow-[4px_4px_0px_#000000] transition-all ${isDownloading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              aria-label="Lanjut"
            >
              <ArrowRight size={20} strokeWidth={3} />
            </motion.button>
          </div>
        </div>
      </div>

    </div>
  );
}
