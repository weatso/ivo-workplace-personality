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

// ─── Book data ────────────────────────────────────────────────────────────────
const BOOKS = [
  {
    id: "cheesecake",
    emoji: "📚",
    bg: "bg-[#f1b32a]",
    border: "border-[#000650]",
    titleId: "Panduan Karir Eksklusif: The Pro Guide",
    titleEn: "Exclusive Career Guide: The Pro Guide",
    descId: "Panduan lengkap untuk menemukan kekuatan tersembunyi di tempat kerjamu. Wajib punya buat yang pengen level up karir secara instan!",
    descEn: "A complete guide to uncovering your hidden strengths in the workplace. A must-have for those who want to level up their career instantly!",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop"
  }
];

// ─── Book Catalog Component ───────────────────────────────────────────────────
function BookCatalog() {
  const isEn = false;


  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 240, damping: 22, delay: 0.1 }}
      className="mt-12"
    >
      {/* Section heading — retro divider */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-[2px] bg-[#000650]/20" />
        <h2 className="text-[11px] font-poppins font-black uppercase tracking-[0.25em] text-[#ff7b17] whitespace-nowrap">
          {isEn ? "📚 Exclusive Book Catalog" : "📚 Katalog Buku Eksklusif"}
        </h2>
        <div className="flex-1 h-[2px] bg-[#000650]/20" />
      </div>

      {/* Single book showcase */}
      <div className="max-w-md mx-auto">
        {BOOKS.map((book, i) => {
          const title = isEn ? book.titleEn : book.titleId;
          const desc  = isEn ? book.descEn  : book.descId;
          const isLight = book.id === "cheesecake" || book.id === "marshmallow";
          return (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 260, damping: 22 }}
              className={`${book.bg} border-4 ${book.border} rounded-3xl overflow-hidden shadow-[6px_6px_0px_#000650] flex flex-col`}
            >
              {/* Book cover image */}
              <div className="relative w-full h-48 border-b-4 border-[#000650] overflow-hidden bg-black/5">
                <img src={book.image} alt={title} className="w-full h-full object-cover pointer-events-none" />
                <div className="absolute top-0 left-0 w-3 h-full bg-black/20 mix-blend-multiply" />
              </div>

              {/* Book info */}
              <div className={`px-5 pt-4 pb-5 flex flex-col flex-1 gap-3 ${isLight ? "bg-white/30" : "bg-black/10"}`}>
                <div>
                  <h3 className={`font-poppins font-black text-sm leading-snug ${isLight ? "text-[#000650]" : "text-white"}`}>
                    {title}
                  </h3>
                  <p className={`mt-1.5 text-[11px] font-lexend font-medium leading-relaxed line-clamp-3 ${isLight ? "text-[#424ac7]" : "text-white/80"}`}>
                    {desc}
                  </p>
                </div>

                {/* Buy button — native anchor, cannot be blocked by popup blocker */}
                <motion.a
                  href="https://bit.ly/PreOrderFirstJobGuide"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-auto w-full flex items-center justify-center gap-2 bg-white text-[#000650] hover:bg-[#f1b32a] font-poppins font-black text-[11px] uppercase tracking-widest py-3 rounded-full border-2 border-[#000650] shadow-[3px_3px_0px_#000650] hover:shadow-[1px_1px_0px_#000650] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
                >
                  <MessageCircle size={13} strokeWidth={2.5} />
                  {isEn ? "Pre-Order Now" : "Pre-Order Sekarang"}
                </motion.a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function EventPage() {
  const router = useRouter();
  const t = T.id.event;

  // Retro floating shapes instead of pastel petals
  const shapes = ["★", "◆", "●", "▲", "✦", "◉"];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f2e1b3]">

      {/* ── RETRO FLOATING SHAPES ──────────────────────────────────────────── */}
      <FloatingShape style={{ top: "8%",  left: "5%"  }} emoji={shapes[0]} />
      <FloatingShape style={{ top: "15%", right: "8%" }} emoji={shapes[1]} />
      <FloatingShape style={{ top: "40%", left: "3%"  }} emoji={shapes[2]} />
      <FloatingShape style={{ bottom: "30%", right: "5%"  }} emoji={shapes[3]} />
      <FloatingShape style={{ bottom: "15%", left: "8%"  }} emoji={shapes[4]} />
      <FloatingShape style={{ top: "65%", right: "10%" }} emoji={shapes[5]} />

      {/* ── BACK BUTTON ───────────────────────────────────────────────────── */}
      <motion.button
        onClick={() => router.back()}
        whileHover={{ x: -4 }}
        className="absolute top-5 left-5 z-20 flex items-center gap-1.5 font-poppins font-bold text-[#000650]/60 hover:text-[#000650] text-sm transition-colors cursor-pointer"
      >
        <ArrowLeft size={16} strokeWidth={2.5} /> {t.back}
      </motion.button>

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
            <span className="text-xl text-[#ff7b17] font-black">★</span>
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
          {/* Ticket card — retro style with navy border + bold shadow */}
          <div className="rounded-[2rem] overflow-hidden border-4 border-[#000650] shadow-[8px_8px_0px_#000650]">

            {/* Ticket top — navy + lavender */}
            <div className="px-7 pt-5 pb-8 bg-[#000650] relative">

              {/* Download button — small compact pill, top-right corner */}
              <motion.button
                whileHover={{ scale: 1.08, rotate: 3 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 450, damping: 12 }}
                className="absolute top-4 right-4 flex flex-col items-center justify-center gap-0.5 bg-[#ff7b17] text-white font-poppins font-black text-[6px] uppercase tracking-tight leading-tight text-center cursor-pointer z-10 border-2 border-[#000650] shadow-[2px_2px_0px_rgba(0,0,0,0.3)] px-2 py-1.5 rounded-xl"
              >
                <Download size={10} strokeWidth={2.5} />
                {t.ticket.downloadBtn.split("\n").map((line, i) => (
                  <span key={i}>{line}</span>
                ))}
              </motion.button>

              {/* All text content — padded right so button never overlaps */}
              <div className="pr-14">
                <p className="text-[10px] font-poppins font-black uppercase tracking-[0.3em] mb-3 text-[#f1b32a]">
                  {t.ticket.badge}
                </p>
                <p className="text-white/60 text-xs font-lexend font-bold uppercase tracking-widest mb-1">
                  {t.ticket.label}
                </p>

                {/* Giant retro number */}
                <div
                  className="font-black leading-none my-2 text-[#ff7b17]"
                  style={{
                    fontSize: "clamp(3.5rem, 20vw, 7rem)",
                    fontFamily: "var(--font-poppins)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  196
                </div>
              </div>
            </div>

            {/* Perforated divider — retro ticket style */}
            <div className="relative flex items-center bg-[#f2e1b3]">
              <div className="absolute -left-4 w-8 h-8 rounded-full bg-[#f2e1b3] border-4 border-[#000650]" />
              <div className="w-full border-t-2 border-dashed border-[#000650]/30 mx-6" />
              <div className="absolute -right-4 w-8 h-8 rounded-full bg-[#f2e1b3] border-4 border-[#000650]" />
            </div>

            {/* Ticket bottom — cream */}
            <div className="bg-[#f2e1b3] px-7 py-6 flex items-end justify-between">
              <div>
                <p className="text-[10px] text-[#000650]/40 font-poppins font-bold uppercase tracking-widest mb-1">
                  {t.ticket.locationLabel}
                </p>
                <p className="text-[#000650] font-poppins font-black text-sm leading-snug">
                  {t.ticket.locationName}
                </p>
                <p className="text-[#424ac7] text-xs font-lexend font-semibold mt-0.5">
                  {t.ticket.locationDate}
                </p>
              </div>

              {/* QR placeholder — retro style */}
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl bg-white border-2 border-dashed border-[#000650]">
                📷
              </div>
            </div>
          </div>

          {/* Floating DOWNLOAD button — REMOVED: now lives inside the card above */}
        </motion.div>

        {/* ══ SECTION E — BOOK CATALOG ══════════════════════════════════════ */}
        <BookCatalog />

        {/* ── BOTTOM CTA ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <motion.button
            onClick={() => router.push("/")}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
            className="inline-flex items-center gap-2 font-poppins font-black text-sm px-8 py-4 rounded-full bg-white text-[#000650] border-2 border-[#000650] shadow-[4px_4px_0px_#000650] hover:shadow-[2px_2px_0px_#000650] hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#f1b32a] transition-all cursor-pointer"
          >
            {t.backHome}
          </motion.button>
        </motion.div>

      </div>
    </div>
  );
}
