"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

import { T } from "@/data/translations";

export default function FinishPage() {
  const router = useRouter();
  const t = T.id.finish;

  const [mounted, setMounted] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleReveal = () => {
    // INTERNAL CODE LOGIC FOR TRIGGERING REVEAL POP/BELL SOUND EFFECT (COMMENTED OUT)
    /*
    try {
      const audio = new Audio('/sounds/bell.mp3');
      audio.play().catch(() => {});
    } catch (e) {}
    */

    setShowLoading(true);

    // Artificial 2.5s suspense delay to mimic intense analysis
    setTimeout(() => {
      router.push("/result");
    }, 2500);
  };

  // Retro floating shapes
  const shapes = ["", "◆", "●", "▲", "✦", "◉"];

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-between relative overflow-hidden bg-[#f2e1b3] select-none p-6">
      
      {/* Decorative Retro Background Elements */}
      <div className="absolute top-[15%] left-[10%] animate-[bounce_4s_ease-in-out_infinite] text-4xl opacity-40 z-0 text-[#000650] font-black">
        {shapes[0]}
      </div>
      <div className="absolute bottom-[20%] right-[10%] animate-[bounce_3s_ease-in-out_infinite] text-4xl opacity-40 z-0 text-[#ff7b17] font-black">
        {shapes[1]}
      </div>
      <div className="absolute top-[30%] right-[15%] animate-[bounce_5s_ease-in-out_infinite] text-3xl opacity-20 z-0 text-[#424ac7] font-black">
        {shapes[2]}
      </div>

      {/* Spacing Header */}
      <div className="h-4 z-10" />

      {/* Main Content Area */}
      <main className="w-full max-w-md flex-grow flex items-center justify-center z-10">
        <AnimatePresence mode="wait">
          {!showLoading ? (
            <motion.div
              key="success-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="bg-white border-4 border-[#000650] shadow-[8px_8px_0px_#000650] rounded-[2rem] p-8 max-w-sm w-full text-center flex flex-col items-center justify-center gap-6 relative overflow-hidden"
            >
              {/* Top retro stripe */}
              <div className="absolute top-0 left-0 w-full h-3 bg-[#f1b32a] border-b-4 border-[#000650]" />

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                className="w-20 h-20 bg-[#f1b32a] border-2 border-[#000650] shadow-[3px_3px_0px_#000650] rounded-full flex items-center justify-center text-[#000650] mt-2"
              >
                <CheckCircle2 size={44} className="stroke-[2.5]" />
              </motion.div>

              <div className="space-y-3 relative z-10">
                <h1 className="text-2xl font-poppins font-black text-[#000650] leading-tight">
                  {t.title}
                </h1>
                <p className="text-sm font-lexend font-bold text-[#424ac7] leading-relaxed px-2">
                  {t.body}
                </p>
              </div>

              {/* Retro bounce button */}
              <motion.button
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReveal}
                className="w-full bg-[#ff7b17] hover:bg-[#e66a12] text-white py-4 px-6 rounded-full font-poppins font-black border-2 border-[#000650] shadow-[4px_4px_0px_#000650] hover:shadow-[2px_2px_0px_#000650] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer text-sm uppercase tracking-wider mt-2"
              >
                {t.cta}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="loading-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center gap-6 text-center"
            >
              {/* Spinner Cake Animation -> Retro Spinner */}
              <div className="relative flex items-center justify-center">
                <div className="w-28 h-28 border-4 border-[#000650]/20 border-t-[#ff7b17] rounded-full animate-spin duration-1000" />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute text-5xl"
                >
                  
                </motion.div>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-poppins font-black text-[#000650]">
                  {t.loadingTitle}
                </h2>
                <p className="text-xs font-lexend font-bold text-[#ff7b17] uppercase tracking-widest animate-pulse">
                  {t.loadingBody}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer spacer */}
      <div className="h-16 z-10" />
    </div>
  );
}
