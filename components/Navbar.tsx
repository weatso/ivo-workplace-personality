"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUISound } from "@/hooks/useUISound";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTransitionStore } from "@/store/useTransitionStore";

const NAV_LINKS = [
  { label: "Home",  href: "/" },
  { label: "About", href: "/about" },
  { label: "Event", href: "/event" },
  { label: "Shop",  href: "/shop" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { playPop } = useUISound();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { triggerTransition } = useTransitionStore();

  // Hide navbar entirely on immersive full-screen pages
  const isImmersiveRoute =
    pathname.startsWith("/quiz") ||
    pathname.startsWith("/intro") ||
    pathname.startsWith("/result") ||
    pathname.startsWith("/finish") ||
    pathname.startsWith("/offer");

  if (isImmersiveRoute) return null;

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playPop();
    setMobileOpen(false);

    if (pathname === href) return;

    triggerTransition(() => {
      router.push(href);
    });
  };

  return (
    <div className="w-full flex flex-col z-[100] sticky top-0">
      {/* ── NAVBAR ── */}
      <nav className="w-full relative bg-[#4348c8] border-b-2 border-[#000650] py-2 px-6 sm:px-8 flex items-center justify-between shadow-[0_4px_0px_rgba(0,6,80,0.15)]">
        
        {/* LOGO (LEFT) */}
        <Link href="/" onClick={(e) => handleNavigation(e, "/")} className="flex items-center gap-2 z-10">
          <img src="/Logo.webp" alt="Logo" className="h-10 sm:h-12 w-auto hover:scale-105 transition-transform origin-left object-contain" />
        </Link>

        {/* DESKTOP LINKS (CENTER) */}
        <div className="hidden sm:flex items-center justify-center gap-6 lg:gap-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[50%] z-0">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavigation(e, link.href)}
              className="font-lexend font-bold text-[#fee5b1] hover:text-white hover:-translate-y-0.5 transition-transform text-xs lg:text-sm uppercase tracking-wider whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* RIGHT CONTROLS */}
        <div className="flex items-center gap-4 z-10">
          {/* QUIZ CTA Button (Desktop) */}
          <Link
            href="/intro"
            onClick={(e) => handleNavigation(e, "/intro")}
            className="hidden sm:flex items-center justify-center gap-3 px-6 py-2 rounded-full bg-[#ebb840] text-[#fee5b1] font-lexend font-bold text-sm uppercase tracking-wider hover:bg-[#d8a530] hover:scale-105 transition-all shadow-sm"
          >
            QUIZ <span className="font-light text-lg leading-none">→</span>
          </Link>

          {/* HAMBURGER BUTTON — only visible on mobile */}
          <button
            className="sm:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border-2 border-[#fee5b1] bg-transparent hover:bg-[#fee5b1]/20 transition-colors cursor-pointer"
            onClick={() => {
              playPop();
              setMobileOpen((prev) => !prev);
            }}
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
          >
            <motion.div
              animate={{ rotate: mobileOpen ? 90 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {mobileOpen ? (
                <X size={20} className="text-[#fee5b1]" strokeWidth={2.5} />
              ) : (
                <Menu size={20} className="text-[#fee5b1]" strokeWidth={2.5} />
              )}
            </motion.div>
          </button>
        </div>
      </nav>

      {/* ── MOBILE DROPDOWN MENU ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="sm:hidden w-full bg-[#4348c8] border-b-2 border-[#000650] overflow-hidden shadow-[0_4px_0px_rgba(0,6,80,0.15)]"
          >
            <div className="flex flex-col py-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.2, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavigation(e, link.href)}
                    className="flex items-center gap-3 px-6 py-3 font-lexend font-black text-sm uppercase tracking-widest text-[#fee5b1] hover:bg-[#fee5b1]/10 transition-colors border-b border-[#fee5b1]/20 last:border-b-0"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#fee5b1] shrink-0" />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              {/* Quiz CTA in mobile menu */}
              <div className="px-6 py-3">
                <Link
                  href="/intro"
                  onClick={(e) => handleNavigation(e, "/intro")}
                  className="flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-full bg-[#ebb840] text-[#fee5b1] font-lexend font-black text-xs uppercase tracking-wider border-2 border-[#000650] shadow-[3px_3px_0px_#000650]"
                >
                  QUIZ →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MARQUEE ── */}
      <div className="w-full bg-[#fa8a20] border-b-2 border-[#000650] py-1.5 overflow-hidden flex items-center relative">
        <div className="animate-marquee flex items-center whitespace-nowrap font-lexend font-bold text-[10px] sm:text-xs uppercase tracking-widest gap-8">
          <span className="text-[#fee5b1]">TRY OUR COMMUNICATION QUIZ!</span>
          <span className="text-[#fee5b1]">•</span>
          <span className="text-[#fee5b1]">JOIN WEBINAR EXCLUSIVE : SEMARANG, 21 AGUSTUS 2026</span>
          <span className="text-[#fee5b1]">•</span>
          <span className="text-[#fee5b1]">TRY OUR COMMUNICATION QUIZ!</span>
          <span className="text-[#fee5b1]">•</span>
          <span className="text-[#fee5b1]">JOIN WEBINAR EXCLUSIVE : SEMARANG, 21 AGUSTUS 2026</span>
          <span className="text-[#fee5b1]">•</span>
          <span className="text-[#fee5b1]">TRY OUR COMMUNICATION QUIZ!</span>
          <span className="text-[#fee5b1]">•</span>
          <span className="text-[#fee5b1]">JOIN WEBINAR EXCLUSIVE : SEMARANG, 21 AGUSTUS 2026</span>
          <span className="text-[#fee5b1]">•</span>
        </div>
      </div>
    </div>
  );
}
