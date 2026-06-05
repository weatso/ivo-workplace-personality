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
  { label: "Shop",  href: "/event" },
  { label: "Quiz",  href: "/intro" },
  { label: "Event", href: "/event" },
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
    pathname.startsWith("/finish");

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
      <nav className="w-full bg-[#f2e1b3] border-b-2 border-[#000650] py-2 px-6 sm:px-8 flex items-center justify-between shadow-[0_4px_0px_rgba(0,6,80,0.05)]">
        
        {/* LOGO */}
        <Link href="/" onClick={(e) => handleNavigation(e, "/")} className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl font-hoppin text-[#000650] tracking-wide hover:scale-105 transition-transform origin-left">
            Web Ivo&apos;s
          </span>
        </Link>

        {/* DESKTOP LINKS — hidden on mobile */}
        <div className="hidden sm:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavigation(e, link.href)}
              className="font-lexend font-bold text-[#000650] hover:text-[#ff7b17] hover:-translate-y-0.5 transition-all text-xs uppercase tracking-wider"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* HAMBURGER BUTTON — only visible on mobile */}
        <button
          className="sm:hidden p-2 rounded-lg border-2 border-[#000650] bg-[#f2e1b3] hover:bg-[#f1b32a] transition-colors shadow-[2px_2px_0px_#000650] cursor-pointer"
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
              <X size={20} className="text-[#000650]" strokeWidth={2.5} />
            ) : (
              <Menu size={20} className="text-[#000650]" strokeWidth={2.5} />
            )}
          </motion.div>
        </button>
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
            className="sm:hidden w-full bg-[#f2e1b3] border-b-2 border-[#000650] overflow-hidden shadow-[0_4px_0px_rgba(0,6,80,0.08)]"
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
                    className="flex items-center gap-3 px-6 py-3 font-lexend font-black text-sm uppercase tracking-widest text-[#000650] hover:bg-[#f1b32a] hover:text-[#000650] transition-colors border-b border-[#000650]/10 last:border-b-0"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff7b17] shrink-0" />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MARQUEE ── */}
      <div className="w-full bg-[#ff7b17] border-b-2 border-[#000650] py-1.5 overflow-hidden flex items-center relative">
        <div className="animate-marquee flex items-center whitespace-nowrap text-white font-lexend font-bold text-[10px] sm:text-xs uppercase tracking-widest gap-8">
          <span>⚡ EVENT: POLLUX MALL PARAGON • 5–6 APRIL 2025 • 10.30 AM TILL DROP ⚡</span>
          <span>EVENT: POLLUX MALL PARAGON • 5–6 APRIL 2025 • 10.30 AM TILL DROP ⚡</span>
          <span>EVENT: POLLUX MALL PARAGON • 5–6 APRIL 2025 • 10.30 AM TILL DROP ⚡</span>
          <span>EVENT: POLLUX MALL PARAGON • 5–6 APRIL 2025 • 10.30 AM TILL DROP ⚡</span>
          <span>EVENT: POLLUX MALL PARAGON • 5–6 APRIL 2025 • 10.30 AM TILL DROP ⚡</span>
          <span>EVENT: POLLUX MALL PARAGON • 5–6 APRIL 2025 • 10.30 AM TILL DROP ⚡</span>
        </div>
      </div>
    </div>
  );
}
