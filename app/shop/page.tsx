import { Calendar, ShoppingBag } from "lucide-react";

export default function Shop() {
  return (
    <div className="min-h-[100dvh] bg-[#f2e1b3] text-[#000650] flex flex-col font-poppins py-16 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full flex-grow flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center w-full">

          {/* Left Column: Book */}
          <div className="flex flex-col items-center lg:items-start w-full relative">
            <div className="bg-[#ff8a29] text-white font-black uppercase px-6 py-2 rounded-xl mb-4 shadow-[3px_3px_0px_#000650] border-2 border-[#000650] rotate-[-3deg] absolute -top-8 left-0 lg:left-8 z-10">
              SPECIAL PRE-LAUCH!
            </div>
            <img src="/BUKU.webp" alt="Your First Job Survival Guide Book" className="w-full max-w-[300px] lg:max-w-md object-contain relative z-0 hover:scale-105 transition-transform duration-300" />
          </div>

          {/* Middle Column: Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full">
            <h1 className="text-2xl lg:text-3xl xl:text-4xl leading-tight font-black uppercase mb-2">
              OPEN PRE-ORDER
            </h1>
            <h2 className="text-base lg:text-lg font-bold mb-8">
              "Your First Job Survival Guide Book"
            </h2>

            <div className="flex items-center gap-3 border-2 border-[#000650] bg-[#4348c8] px-4 py-2 rounded-lg font-bold text-[#fee5b1] mb-8 shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">
              <Calendar size={20} className="text-[#fee5b1]" />
              <span className="tracking-wide">s/d 20 Juli 2026</span>
            </div>

            <div className="text-2xl lg:text-3xl font-black mb-6">
              ONLY 125.000
            </div>

            <a href="https://bit.ly/PreOrderFirstJobGuide" target="_blank" rel="noopener noreferrer" className="bg-[#ffbe29] text-[#000650] font-black text-lg px-8 py-4 rounded-full border-2 border-[#000650] shadow-[4px_4px_0px_#000650] active:shadow-[2px_2px_0px_#000650] active:translate-x-[2px] active:translate-y-[2px] hover:bg-[#ffce54] transition-all flex items-center gap-3 w-fit mb-12 mx-auto lg:mx-0 cursor-pointer">
              <ShoppingBag size={24} strokeWidth={2.5} />
              Check Out Sekarang &rarr;
            </a>

            <img src="/ICON_BUKU.webp" alt="Features: 40 Full Color Pages, Psychologist Approved, Include Video Demo, Beginner Friendly" className="w-full max-w-[380px] object-contain" />
          </div>

          {/* Right Column: Merchandise */}
          <div className="flex flex-col items-center justify-center w-full relative scale-[1.95] md:scale-100 lg:scale-[1.95] origin-right md:origin-center lg:origin-right translate-x-[80%] md:translate-x-0 lg:translate-x-[80%] -translate-y-[60%] md:translate-y-0 lg:-translate-y-[60%] mt-0 md:mt-12 lg:mt-0">
            <div className="absolute inset-0 w-full h-full pointer-events-none z-10 flex items-end justify-start pl-[8%] md:pl-[27%] lg:pl-[10%] translate-y-[12%] md:-translate-y-[2%] lg:translate-y-[12%]">
              <svg viewBox="0 0 200 200" className="w-[58%] md:w-[40%] lg:w-[55%] h-auto -rotate-[30deg]">
                <circle cx="100" cy="100" r="75" fill="#ffbe29" />
                <path id="curve-top" d="M 20, 100 a 80,80 0 0,1 160,0" fill="transparent" />
                <path id="curve-bottom" d="M 180, 100 a 80,80 0 0,1 -160,0" fill="transparent" />
                <text fill="#000650" className="font-poppins font-black text-[14px] tracking-[0.1em] uppercase">
                  <textPath href="#curve-top" startOffset="50%" textAnchor="middle">FREE GET</textPath>
                </text>
                <text fill="#000650" className="font-poppins font-black text-[14px] tracking-[0.1em] uppercase">
                  <textPath href="#curve-bottom" startOffset="50%" textAnchor="middle">MERCHANDISE</textPath>
                </text>
              </svg>
            </div>
            <img src="/MERCH.webp" alt="Free Get Merchandise" className="w-full max-w-[420px] md:max-w-[500px] lg:max-w-[580px] object-contain relative z-20" />
          </div>

        </div>
      </div>
    </div>
  );
}
