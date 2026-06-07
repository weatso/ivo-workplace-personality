"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Mail, BellRing, ArrowLeft, Download, MessageCircle } from "lucide-react";

import { T } from "@/data/translations";

// ─── Retro-Modern floating shape decoration ────────────────────────────────────
const FloatingShape = ({ style, emoji }: { style: React.CSSProperties; emoji: string }) => (
  <motion.div
    className="absolute text-2xl pointer-events-none select-none opacity-20"
    style={style}
    animate={{ y: [0, -20, 0], rotate: [0, 15, -10, 0] }}
    transition={{ repeat: Infinity, duration: 5 + Math.random() * 3, ease: "easeInOut" }}
  >
    {emoji}
  </motion.div>
);

// ─── WhatsApp number ─────────────────────────────────────────────────────────
const WA_NUMBER = "6281805877845";


export default function EventPage() {
  const router = useRouter();
  const t = T.id.event;

  // Retro floating shapes instead of pastel petals
  const shapes = ["", "◆", "●", "▲", "✦", "◉"];

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#f2e1b3]">

      {/* ── RETRO FLOATING SHAPES ──────────────────────────────────────────── */}
      <FloatingShape style={{ top: "8%",  left: "5%"  }} emoji={shapes[0]} />
      <FloatingShape style={{ top: "15%", right: "8%" }} emoji={shapes[1]} />
      <FloatingShape style={{ top: "40%", left: "3%"  }} emoji={shapes[2]} />
      <FloatingShape style={{ bottom: "30%", right: "5%"  }} emoji={shapes[3]} />
      <FloatingShape style={{ bottom: "15%", left: "8%"  }} emoji={shapes[4]} />
      <FloatingShape style={{ top: "65%", right: "10%" }} emoji={shapes[5]} />


      <div className="max-w-xl mx-auto px-5 pt-16 pb-28 relative z-10">

        {/* ══ SECTION A — HERO ═══════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          className="relative flex flex-col items-center text-center pt-4 pb-10"
        >
          {/* Badge — yellow gold retro pill */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 14, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-poppins font-black text-[#000650] text-xs uppercase tracking-widest mb-5 bg-[#f1b32a] border-2 border-[#000650] shadow-[3px_3px_0px_#000650]"
          >
            {t.badge}
          </motion.div>

          {/* Main Title — Poppins (heading, short text) */}
          <h1 className="text-4xl font-poppins font-black leading-tight text-[#000650] tracking-tight">
            {t.title1}
          </h1>
          <h1 className="text-5xl font-poppins font-black leading-tight text-[#ff7b17] tracking-tight drop-shadow-sm">
            {t.title2}
          </h1>

          {/* Location — Lexend Deca (body/secondary text) */}
          <p className="mt-3 text-[#424ac7] text-sm font-lexend font-semibold">
            {t.location}
          </p>

          {/* Divider — retro style */}
          <div className="mt-6 flex items-center gap-3 w-full max-w-xs">
            <div className="flex-1 h-[2px] bg-[#000650]/20" />
            <span className="text-xl text-[#ff7b17] font-black"></span>
            <div className="flex-1 h-[2px] bg-[#000650]/20" />
          </div>
        </motion.div>

        {/* ══ SECTION D — COUPON TICKET ═════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 240, damping: 22, delay: 0.15 }}
          className="relative"
        >
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
          <div className="rounded-[2rem] overflow-hidden border-4 border-[#000650] shadow-[8px_8px_0px_#000650]">

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

          {/* Floating DOWNLOAD button — REMOVED: now lives inside the card above */}
        </motion.div>


      </div>
    </div>
  );
}
