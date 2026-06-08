"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="w-full overflow-x-hidden bg-[#4040c0] font-lexend min-h-[100dvh]">

      {/* ── MAIN SECTION ─────────────────────────────────────────────────────── */}
      <section className="relative w-full flex flex-col items-center pt-20 sm:pt-24 pb-16 px-4 sm:px-6">

        {/* ── 1. BADGE BANNER ROW (z-20 — di depan Gembok) ──────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-5xl mx-auto mb-6 z-20"
        >
          {/* Outer pill — #f2e3b1 background, full-width banner */}
          <div className="bg-[#f2e1b3] rounded-[2rem] sm:rounded-full flex flex-col sm:flex-row items-center overflow-hidden w-full sm:w-[95%] lg:w-[120%] ml-0 sm:ml-[2.5%] lg:ml-[-10%] border-2 border-[#000650] p-2 sm:p-0">
            {/* Left: dark navy pill label */}
            <span className="bg-[#000650] text-[#f2e1b3] font-poppins font-black text-lg sm:text-2xl lg:text-[28px] px-6 sm:px-8 py-3 sm:py-4 rounded-full whitespace-nowrap flex-shrink-0 tracking-[2px] lg:tracking-[4px] w-full sm:w-auto text-center">
              Masa transisi
            </span>
            {/* Right: tagline text */}
            <p className="text-[#000650] font-poppins font-bold text-base sm:text-2xl lg:text-[28px] pt-3 sm:pt-0 pl-4 sm:pl-6 pr-4 sm:pr-8 pb-3 sm:pb-0 leading-snug tracking-[1px] sm:tracking-[2px] lg:tracking-[2px] lg:whitespace-nowrap text-center sm:text-left w-full">
              dari kampus ke dunia kerja emang sering bikin bingung...
            </p>
          </div>
        </motion.div>

        {/* ── GEMBOK — z-10: di belakang badge, di atas card ─────────────── */}
        <motion.img
          src="/Gembok.webp"
          alt="Gembok"
          animate={{ y: [-8, 8, -8], rotate: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute -top-[8px] -right-[40px] sm:-top-[8px] sm:-right-[45px] lg:-top-[4px] lg:-right-[94px] w-[152px] sm:w-[250px] lg:w-[438px] object-contain z-30 sm:z-10 pointer-events-none drop-shadow-xl"
        />

        {/* ── ORANG_KACA — absolute, left side of card, standalone like Gembok ── */}
        <motion.img
          src="/ORANG_KACA.webp"
          alt="Orang di kaca"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative sm:absolute mt-8 sm:mt-0 mb-4 sm:mb-0 -top-[80px] sm:top-[50px] lg:-top-[60px] -left-[5px] sm:-left-[125px] lg:-left-[15px] w-[350px] max-w-none sm:max-w-full sm:w-[450px] lg:w-[607px] mx-auto sm:mx-0 object-contain z-10 pointer-events-none drop-shadow-2xl block"
        />

        {/* ── 2. MAIN CARDS ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative w-full max-w-5xl mx-auto z-0 mt-6 sm:mt-8 lg:mt-12 flex flex-col gap-6 -top-[480px] sm:top-0"
        >
          {/* Upper Card - Dark Blue */}
          <div className="bg-[#030954] rounded-[1.5rem] border-2 border-[#f2e1b3]/40 overflow-hidden relative z-10">
            <div className="flex flex-col px-6 sm:pl-[180px] lg:pl-[180px] pr-6 sm:pr-16 pt-[180px] sm:pt-10 pb-8 sm:pb-10">
              <div className="flex flex-col justify-center gap-6 text-[#f2e1b3] text-center sm:text-left">
                <p className="font-lexend font-medium text-base sm:text-lg lg:text-[22px] leading-relaxed">
                  Lowongan kerja tuh sebenarnya banyak banget, tapi kok rasanya susah dapat yang pas?
                </p>

                <p className="font-lexend font-medium text-base sm:text-lg lg:text-[22px] leading-relaxed">
                  Nah, ini sering terjadi karena adanya{" "}
                  <span className="font-black underline decoration-2">Skill Mismatch.</span>
                  {" "}Terkadang, IPK kita udah mentereng, tapi perusahaan lagi nyari
                  soft skill, terutama cara kita berkomunikasi, yang mungkin
                  belum banyak diajarkan di bangku kuliah.
                </p>
              </div>
            </div>
          </div>

          {/* Lower Card - Cream */}
          <div className="bg-[#f2e1b3] rounded-[3rem] w-[108%] ml-[-4%] sm:w-[120%] sm:ml-[-10%] overflow-hidden px-6 sm:px-12 pt-24 pb-8 sm:pt-32 sm:pb-10 -mt-20 sm:-mt-32 z-0 relative">
            <p className="text-[#000650] font-lexend font-medium text-sm sm:text-base lg:text-lg leading-relaxed text-center max-w-4xl mx-auto">
              Karena belum nemu cara komunikasi yang pas, nggak jarang banyak fresh grad yang akhirnya &quot;pasrah&quot;
              nerima pekerjaan yang job desc atau benefit-nya kurang sesuai sama impian mereka.
            </p>
          </div>
        </motion.div>

        {/* ── 3. QUOTE — "But hey..." ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-5xl mx-auto -mt-[380px] sm:mt-32 lg:mt-40 text-center px-2 relative z-10"
        >
          <h2
            className="font-hoppin text-2xl sm:text-3xl lg:text-[40px] text-[#fee5b1] italic"
            style={{
              WebkitTextStroke: "3px #000000",
              paintOrder: "stroke fill",
            }}
          >
            <span className="block mb-3 sm:mb-5 lg:mb-8">But hey, you have so much potential and you</span>
            <span className="block">deserve a job that matches your worth!</span>
          </h2>
        </motion.div>

        {/* ── 4. SOLUTION CARD ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full max-w-5xl mx-auto mt-24 sm:mt-32 lg:mt-40 relative z-10"
        >
          <div className="bg-[#000650] rounded-[1.5rem] border-2 border-[#f2e1b3]/50 p-7 sm:p-9 text-center">
            <h3 className="text-[#fee5b1] font-poppins font-black text-sm sm:text-lg lg:text-xl mb-4 leading-snug">
              Lewat Your First Job Survival Guide, kami hadir membawa solusi nyata buat kamu!
            </h3>
            <p className="text-[#fee5b1] font-lexend font-medium text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
              Di sini kita nggak cuma ngasih teori, tapi juga mindset hacks, trik wawancara, dan framework
              komunikasi asertif yang super gampang dipraktekin.
            </p>
          </div>
        </motion.div>

      </section>
    </div>
  );
}
