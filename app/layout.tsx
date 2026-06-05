import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import GlobalNoiseShader from "@/components/GlobalNoiseShader";
import BrushTransition from "@/components/BrushTransition";

// ── Lexend Deca: untuk teks panjang / body text ─────────────────────────────
const lexendDeca = localFont({
  src: "../public/LexendDeca-VariableFont_wght.ttf",
  variable: "--font-lexend",
  display: "swap",
});

// ── Hoppin: font custom untuk heading ───────────────────────────────────────
const hoppin = localFont({
  src: "../public/Hoppin.ttf",
  variable: "--font-hoppin",
  weight: "400",
  declarations: [
    { prop: 'size-adjust', value: '130%' }
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Web Ivo's | What Personality Are You?",
  description: "Temukan tipe kepribadian profesionalmu dengan kuis seru di Web Ivo's. Gratis!",
  openGraph: {
    title: "Web Ivo's | What Personality Are You?",
    description: "Temukan tipe kepribadian profesionalmu dengan kuis seru di Web Ivo's. Gratis!",
    url: "https://ivo-workplace-personality.vercel.app/",
    siteName: "Web Ivo's",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Ivo's | What Personality Are You?",
    description: "Temukan tipe kepribadian profesionalmu dengan kuis seru di Web Ivo's. Gratis!",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${hoppin.variable} ${lexendDeca.variable} antialiased selection:bg-[#f1b32a] selection:text-[#000650] overflow-x-hidden bg-[#f2e1b3] text-[#000650]`}
      >
        {/* WebGL film-grain overlay — GPU only, pointer-events-none */}
        <GlobalNoiseShader />
        {/* GSAP brush-stroke page transition overlay */}
        <BrushTransition />

        {/* Hidden SVG for Line Boiling / Squigglevision Effect */}
        <svg xmlns="http://www.w3.org/2000/svg" className="hidden">
          <filter id="squiggle-0">
            <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise" seed="0"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
          <filter id="squiggle-1">
            <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise" seed="1"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
          <filter id="squiggle-2">
            <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise" seed="2"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
          <filter id="squiggle-3">
            <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise" seed="3"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
          <filter id="squiggle-4">
            <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise" seed="4"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </svg>

        <Navbar />
        {children}
      </body>
    </html>
  );
}

