"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useQuizStore } from "@/store/useQuizStore";
import { questions } from "@/data/questions";
import { T } from "@/data/translations";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useUISound } from "@/hooks/useUISound";

export default function DynamicQuizPage() {
  const params = useParams();
  const router = useRouter();
  const { addAnswer, saveAnswerHistory, resetQuiz } = useQuizStore();
  const t = T.id.quiz;
  const { playPop } = useUISound();

  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);

  // Parallax Pointer Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const id = parseInt(params.id as string, 10);
  const currentIdx = id - 1;

  const questionSet = questions;
  const currentQuestion = questionSet[currentIdx];
  const totalSteps = questionSet.length;
  const progress = (id / totalSteps) * 100;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Safeguard: Redirect to Home if the ID is out of bounds or invalid
  useEffect(() => {
    if (mounted) {
      if (isNaN(id) || id < 1 || id > totalSteps) {
        router.replace("/");
      }
    }
  }, [id, mounted, router, totalSteps]);

  // Track mouse coordinates for parallax
  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mounted, mouseX, mouseY]);

  const bgX = useTransform(mouseX, [-0.5, 0.5], [15, -15]);
  const bgY = useTransform(mouseY, [-0.5, 0.5], [15, -15]);

  if (!mounted || !currentQuestion) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#4544ac]">
        <div className="w-12 h-12 rounded-full border-4 border-[#ff7b17] border-t-transparent animate-spin" />
      </div>
    );
  }

  const handleAnswer = (option: { text: string; type: any }, idx: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSelectedOptionIdx(idx);
    playPop();

    addAnswer(option.type);
    saveAnswerHistory({
      questionId: currentQuestion.id,
      questionText: currentQuestion.text,
      answerText: option.text,
      typeSelected: option.type,
    });

    setTimeout(() => {
      setIsTransitioning(false);
      setSelectedOptionIdx(null);
      if (id < totalSteps) {
        router.push(`/quiz/${id + 1}`);
      } else {
        router.push("/finish");
      }
    }, 600); // 600ms to allow stamp animation to play out
  };

  const handleBack = () => {
    playPop();

    if (id > 1) {
      router.back();
    } else {
      resetQuiz();
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between relative overflow-hidden bg-[#4544ac] select-none">

      {/* ── RETRO GRID OVERLAY ── */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 2px, transparent 2px)",
          backgroundSize: "24px 24px"
        }}
      />
      
      {/* Translucent colorful background blurs for retro modern glow */}
      <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-[#ff7b17]/20 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-[#f1b32a]/15 blur-[120px] pointer-events-none z-0" />

      {/* ── HEADER ── */}
      <header className="w-full max-w-md md:max-w-2xl px-4 pt-8 pb-2 z-10 flex items-center gap-4">
        <motion.button
          whileHover={{
            scale: 1.1,
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBack}
          className="p-2 rounded-full bg-white border-2 border-[#000650] shadow-[2px_2px_0px_#000650] hover:bg-[#f1b32a] transition-colors cursor-pointer"
          aria-label={t.backLabel}
        >
          <ChevronLeft className="text-[#000650]" size={20} />
        </motion.button>

        {/* Progress Container with Walking Character */}
        <div className="flex-grow relative mt-5">
          {/* Walking Character Sprite/Emoji */}
          <motion.div
            initial={{ left: 0 }}
            animate={{ left: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute -top-7 -translate-x-1/2 text-2xl drop-shadow-md z-10"
          >
            🏃‍♀️
          </motion.div>
          {/* Thick Brutalist Progress Bar */}
          <div className="w-full h-4 bg-white rounded-full relative border-2 border-[#000650] shadow-[2px_2px_0px_#000650] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-0 left-0 h-full bg-[#ff7b17] border-r-2 border-[#000650]"
            />
          </div>
        </div>

        {/* Cute Step Pill Badge */}
        <div className="text-[11px] font-poppins font-black text-white bg-[#ff7b17] border-2 border-[#000650] px-3 py-1 rounded-full shadow-[2px_2px_0px_#000650] min-w-[54px] text-center">
          {id}/{totalSteps}
        </div>
      </header>

      {/* ── QUESTION AREA ── */}
      <main className="flex-grow w-full max-w-md md:max-w-2xl flex flex-col items-center justify-center px-4 relative z-10 py-4 min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={id}
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -28 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full text-center flex flex-col items-center justify-center gap-6"
          >
            {/* Retro macOS Window Styled Image Frame */}
            {currentQuestion.image && (
              <div className="relative w-full max-w-sm rounded-[1.5rem] border-4 border-[#000650] shadow-[6px_6px_0px_#000650] overflow-hidden bg-[#f2e1b3] flex items-center justify-center">
                <Image
                  src={currentQuestion.image}
                  alt={`Question ${id}`}
                  className="w-full h-auto object-contain select-none pointer-events-none"
                />
              </div>
            )}

            {/* Question Text */}
            <h2 className="text-base md:text-2xl font-poppins font-black text-white leading-snug tracking-wide text-center max-w-sm md:max-w-xl mt-4 px-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
              {currentQuestion.text}
            </h2>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── ANSWER CARDS ── */}
      <footer className="w-full max-w-md px-6 pb-12 space-y-3 z-10 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="space-y-2.5 w-full"
          >
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(option, index)}
                className="w-full relative bg-white/10 backdrop-blur-sm border border-white/15 shadow-[0_4px_30px_rgba(0,0,0,0.03)] sm:bg-transparent sm:backdrop-blur-none sm:border-transparent sm:shadow-none text-white py-3.5 px-4 rounded-[1.25rem] font-lexend font-bold text-center transition-all flex items-center justify-center min-h-[52px] cursor-pointer group overflow-hidden"
              >
                {/* ── DOODLE STAMP EFFECT ── */}
                <AnimatePresence>
                  {selectedOptionIdx === index && (
                    <motion.div
                      initial={{ scale: 3, opacity: 0, rotate: -20 }}
                      animate={{ scale: 1, opacity: 1, rotate: Math.random() * 20 - 10 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
                    >
                      <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#ff7b17] opacity-80 mix-blend-screen drop-shadow-md" fill="currentColor">
                        <path d="M50 5 L63 35 L95 40 L70 60 L78 95 L50 75 L22 95 L30 60 L5 40 L37 35 Z" stroke="white" strokeWidth="3" strokeLinejoin="round" />
                      </svg>
                      {/* Simple dust particles */}
                      <motion.div 
                        initial={{ opacity: 1, scale: 0.5 }} 
                        animate={{ opacity: 0, scale: 2 }} 
                        transition={{ duration: 0.4 }} 
                        className="absolute w-20 h-20 rounded-full border-4 border-[#ff7b17] border-dashed"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <span className="relative text-sm md:text-base leading-snug font-semibold select-none z-10">
                  {option.text}
                  {/* Underline Animation (Desktop only) */}
                  <span className="absolute left-0 bottom-[-4px] w-full h-[2.5px] bg-[#f1b32a] scale-x-0 sm:group-hover:scale-x-100 transition-transform origin-center duration-300 hidden sm:block" />
                </span>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>
      </footer>
    </div>
  );
}
