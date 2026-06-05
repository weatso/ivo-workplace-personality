"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import { T } from "@/data/translations";

let hasShownPromo = false;

export default function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const t = T.id.promo;

  // Auto-appear after 1.5 seconds (only once per full page load / refresh)
  useEffect(() => {
    if (hasShownPromo) return;
    const timer = setTimeout(() => {
      setIsOpen(true);
      hasShownPromo = true;
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setIsOpen(false);


  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark backdrop */}
          <motion.div
            key="promo-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal Card */}
          <motion.div
            key="promo-modal"
            initial={{ opacity: 0, scale: 0.7, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 80 }}
            transition={{
              type: "spring",
              stiffness: 360,
              damping: 20,
              mass: 0.9,
            }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none px-5"
          >
            <div className="pointer-events-auto relative w-full max-w-sm overflow-hidden bg-[#f2e1b3] border-4 border-[#000650] rounded-[2rem] shadow-[8px_8px_0px_#000650]">

              {/* Bold retro top stripe */}
              <div className="w-full h-3 bg-[#ff7b17]" />

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 w-9 h-9 bg-white border-2 border-[#000650] shadow-[2px_2px_0px_#000650] text-[#000650] hover:bg-[#f1b32a] rounded-full flex items-center justify-center transition-all z-10 cursor-pointer"
              >
                <X size={16} strokeWidth={2.5} />
              </button>

              {/* Content */}
              <div className="px-8 pt-7 pb-9 flex flex-col items-center text-center">

                {/* Floating mascot — keep the fun emoji but restyled */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="text-5xl mb-4 drop-shadow-md"
                >
                  ✨
                </motion.div>

                {/* Badge — yellow gold retro pill */}
                <div className="mb-4 px-4 py-1.5 rounded-full bg-[#f1b32a] text-[#000650] font-poppins font-black text-[10px] uppercase tracking-widest border-2 border-[#000650] shadow-[2px_2px_0px_#000650]">
                  {t.badge}
                </div>

                {/* Main Title */}
                <h2 className="text-3xl font-poppins font-black leading-tight tracking-tight text-[#000650]">
                  {t.title1}
                  <br />
                  <span className="text-[#ff7b17]">{t.title2}</span>
                </h2>

                {/* Subtext */}
                <p className="mt-2 text-sm font-lexend font-semibold text-[#424ac7] uppercase tracking-widest">
                  {t.sub}
                </p>

                {/* Divider — retro style */}
                <div className="my-5 flex items-center gap-3 w-full">
                  <div className="flex-1 h-[2px] bg-[#000650]/20" />
                  <span className="text-lg">🎉</span>
                  <div className="flex-1 h-[2px] bg-[#000650]/20" />
                </div>

                {/* CTA Button — native anchor, cannot be blocked by popup blocker */}
                <motion.a
                  href="https://bit.ly/PreOrderFirstJobGuide"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClose}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="block w-full py-4 rounded-full bg-[#ff7b17] hover:bg-[#e66a12] text-white font-poppins font-black text-sm uppercase tracking-wider text-center border-2 border-[#000650] shadow-[4px_4px_0px_#000650] hover:shadow-[2px_2px_0px_#000650] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
                >
                  {t.cta}
                </motion.a>

                {/* Dismiss */}
                <button
                  onClick={handleClose}
                  className="mt-4 text-xs font-lexend font-semibold text-[#424ac7] hover:text-[#000650] transition-colors underline underline-offset-2 cursor-pointer"
                >
                  {t.dismiss}
                </button>
              </div>

              {/* Bold retro bottom stripe */}
              <div className="w-full h-2 bg-[#f1b32a]" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
