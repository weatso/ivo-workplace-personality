"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { T } from "@/data/translations";
import { useUISound } from "@/hooks/useUISound";

export default function IntroPage() {
  const router = useRouter();
  const { playPop } = useUISound();
  const t = T.id.intro;

  const handleStartAdventure = () => {
    playPop();
    // Fast snappy route without the heavy global brush wipe
    router.push("/quiz/1");
  };

  // Retro floating shapes
  const shapes = ["", "◆", "●", "▲", "✦", "◉"];

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center relative overflow-hidden bg-[#f2e1b3] select-none p-6">
      
      {/* Decorative Floating Elements (Retro shapes instead of pastel cake) */}
      <div className="absolute top-[15%] left-[5%] md:left-[10%] animate-[bounce_4s_ease-in-out_infinite] text-2xl md:text-4xl opacity-40 z-0 text-[#000650] font-black">
        {shapes[0]}
      </div>
      <div className="absolute bottom-[20%] right-[5%] md:right-[10%] animate-[bounce_3s_ease-in-out_infinite] text-2xl md:text-4xl opacity-40 z-0 text-[#ff7b17] font-black">
        {shapes[1]}
      </div>
      <div className="absolute top-[30%] right-[10%] md:right-[15%] animate-[bounce_5s_ease-in-out_infinite] text-xl md:text-3xl opacity-20 z-0 text-[#424ac7] font-black">
        {shapes[2]}
      </div>

      {/* Mobile-containment container */}
      <main className="w-full max-w-md md:max-w-2xl relative z-10 flex flex-col items-center justify-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 14,
            mass: 1.1
          }}
          className="bg-white border-4 border-[#000650] shadow-[8px_8px_0px_#000650] rounded-[2rem] p-8 text-center flex flex-col items-center justify-center gap-6 w-full relative overflow-hidden"
        >
          {/* Top decorative stripe */}
          <div className="absolute top-0 left-0 w-full h-3 bg-[#f1b32a] border-b-4 border-[#000650]" />

          {/* Animated Mascot Emoji (Retro styled) */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-5xl md:text-7xl filter drop-shadow-md mt-4"
          >
            ️
          </motion.div>

          <div className="space-y-4 relative z-10">
            <h1 className="text-2xl font-poppins font-black text-[#000650] leading-tight tracking-tight">
              {t.title}
            </h1>
            <p className="text-sm md:text-base font-lexend font-bold text-[#424ac7] leading-relaxed">
              {t.body}
            </p>
          </div>

          <div className="w-12 h-[4px] bg-[#000650]/20 rounded-full mt-2" />

          {/* Retro primary button */}
          <motion.button
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartAdventure}
            className="w-full bg-[#ff7b17] hover:bg-[#e66a12] text-white py-4 px-6 rounded-full font-poppins font-black border-2 border-[#000650] shadow-[4px_4px_0px_#000650] hover:shadow-[2px_2px_0px_#000650] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm uppercase tracking-wider mt-4"
          >
            <span>{t.cta}</span>
            <ChevronRight size={18} strokeWidth={3} />
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
}
