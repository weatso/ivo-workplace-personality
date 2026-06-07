"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function BookCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Set target to June 12 (assuming 2026 based on current year) at 06:00 AM
    // You can adjust the year if needed.
    const targetDate = new Date("2026-06-12T06:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="w-full bg-[#ff7b17] py-24 border-b-4 border-[#000650] relative overflow-hidden flex flex-col items-center justify-center">
      {/* Festive Background Gimmicks */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="absolute top-10 left-10 opacity-30 text-7xl select-none"
      >

      </motion.div>
      <motion.div
        animate={{ rotate: -360, scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        className="absolute bottom-10 right-10 opacity-30 text-8xl select-none"
      >

      </motion.div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
        <div className="bg-white px-6 py-2 rounded-full border-2 border-[#000650] shadow-[4px_4px_0px_#000650] mb-6">
          <span className="font-poppins font-black text-[#000650] text-sm uppercase tracking-widest">
            COUNTDOWN PRESENTASI BUKU
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-poppins font-black text-white drop-shadow-md mb-4 leading-tight">
          Jangan Sampai Ketinggalan!
        </h2>
        <p className="text-lg font-lexend font-bold text-white/90 mb-12 max-w-2xl">
          Buku eksklusif ini bakal dipresentasiin langsung pada tanggal 12 Juni jam 06.00 pagi. Siapin diri kamu buat dapet insight paling daging seputar dunia kerja!
        </p>

        {/* Timer Blocks */}
        <div className="flex flex-col items-center gap-6 sm:gap-10">
          {/* Row 1: HARI & JAM */}
          <div className="flex items-center gap-6 sm:gap-10">
            {[
              { label: "HARI", value: timeLeft.days },
              { label: "JAM", value: timeLeft.hours },
            ].map((unit) => (
              <div key={unit.label} className="flex flex-col items-center">
                <motion.div
                  key={unit.value}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="w-24 h-28 sm:w-32 sm:h-36 bg-[#f2e1b3] rounded-2xl border-4 border-[#000650] shadow-[6px_6px_0px_#000650] flex items-center justify-center overflow-hidden relative"
                >
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30" />
                  <span className="text-5xl sm:text-7xl font-poppins font-black text-[#000650] relative z-10">
                    {unit.value.toString().padStart(2, "0")}
                  </span>
                </motion.div>
                <span className="mt-4 font-poppins font-black text-white text-base tracking-widest uppercase">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {/* Row 2: MENIT & DETIK */}
          <div className="flex items-center gap-6 sm:gap-10">
            {[
              { label: "MENIT", value: timeLeft.minutes },
              { label: "DETIK", value: timeLeft.seconds },
            ].map((unit) => (
              <div key={unit.label} className="flex flex-col items-center">
                <motion.div
                  key={unit.value}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="w-24 h-28 sm:w-32 sm:h-36 bg-[#f2e1b3] rounded-2xl border-4 border-[#000650] shadow-[6px_6px_0px_#000650] flex items-center justify-center overflow-hidden relative"
                >
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30" />
                  <span className="text-5xl sm:text-7xl font-poppins font-black text-[#000650] relative z-10">
                    {unit.value.toString().padStart(2, "0")}
                  </span>
                </motion.div>
                <span className="mt-4 font-poppins font-black text-white text-base tracking-widest uppercase">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
