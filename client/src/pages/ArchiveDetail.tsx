import React, { useRef } from 'react';
import { useLocation, useRoute } from "wouter";
import { ArrowLeft, Share2 } from "lucide-react";
import logoImg from "@assets/Group_1_1772194218007.png";
import { motion } from "framer-motion";

// Import screenshots
import img1 from "@assets/Screenshot_2026-03-12_at_17.52.20_1773338031276.png";
import img2 from "@assets/Screenshot_2026-03-12_at_17.52.30_1773338031280.png";
import img3 from "@assets/Screenshot_2026-03-12_at_17.52.41_1773338031280.png";
import img4 from "@assets/Screenshot_2026-03-12_at_17.52.55_1773338031281.png";
import img5 from "@assets/Screenshot_2026-03-12_at_17.53.06_1773338031281.png";

const MOCK_DATA = {
  id: "00002",
  title: "DOCUMENTING THE REALITY OF THE BIRTHING PROCESS",
  username: "birth_ed",
  platform: "Instagram / Facebook",
  status: "REMOVED",
  dot: "bg-red-500",
  images: [img1, img2, img3, img4, img5],
  timeline: [
    { action: "CONTENT POSTED", date: "8 YEARS AGO" },
    { action: "GUIDELINES WARNING", date: "JAN 20" },
    { action: "ACCOUNT RESTRICTED", date: "FEB 04" },
    { action: "ACCOUNT DELETED", date: "2020" }
  ],
  content: [
    "Megan, aka @Birth_ed on Instagram has used social media as a way of providing free birth education for the last eight years. This previously used real imagery of birth and postpartum, as a way to empower and inspire women, as well as giving them a realistic picture of what they might expect from birth.",
    "In 2020 Meta deleted Megan's Facebook account because they believed it to be 'sexually explicit'.",
    "As Megan says:",
    "\"In the years since then I've consistently had posts removed and my account restricted in several ways, with the threats of account removal being so frequent that I eventually stopped posting real birth images altogether.\"",
    "\"I rely on Instagram as my main marketing platform, and could lose my livelihood without it. So in the end, meta censorship became self censorship, and getting candid, honest information to women about birth has become ever harder!\""
  ]
};

const ArchiveDetail: React.FC = () => {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/archive/:id");
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // For the prototype, we display the MOCK_DATA for any ID.
  // In a real app, we would fetch data based on params?.id.
  const id = params?.id || "00002";
  
  return (
    <div className="min-h-screen bg-white font-mono text-black selection:bg-black selection:text-white flex flex-col">
      {/* Header */}
      <header className="w-full px-8 py-4 flex items-center border-b border-black/10 shrink-0 relative z-10 font-mono">
        <div className="flex-1 flex justify-start">
          <img src={logoImg} alt="CensHership" className="h-8 md:h-10 object-contain cursor-pointer" onClick={() => setLocation("/")} />
        </div>
        <nav className="flex items-center gap-10 text-[20px] font-bold font-mono">
          <button onClick={() => setLocation("/")} className="opacity-40 hover:opacity-100 transition-opacity tracking-tight">Home</button>
          <button onClick={() => setLocation("/archive")} className="border-b-2 border-black pb-1 font-bold tracking-tight">Archive</button>
          <button onClick={() => setLocation("/about")} className="opacity-40 hover:opacity-100 transition-opacity tracking-tight">About</button>
        </nav>
        <div className="flex-1 hidden md:block"></div>
      </header>

      {/* Action Bar */}
      <div className="border-b border-black flex justify-between items-center px-8 py-4 bg-white sticky top-0 z-40">
        <button onClick={() => setLocation("/archive")} className="flex items-center gap-2 font-bold hover:text-[#FF4747] transition-colors tracking-tight uppercase">
          <ArrowLeft size={18} /> BACK TO ARCHIVE
        </button>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 font-bold hover:text-[#FF4747] transition-colors tracking-tight uppercase border border-black px-4 py-2 hover:border-[#FF4747]">
            <Share2 size={16} /> SHARE CASE
          </button>
        </div>
      </div>

      <main className="flex-1 flex flex-col md:flex-row">
        {/* Left Column: Details */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 p-8 md:p-16 border-r border-black flex flex-col"
        >
          {/* Status & ID */}
          <div className="flex items-center gap-4 mb-8">
            <div className="text-4xl font-bold tracking-tighter">CASE_{id}</div>
            <div className="flex items-center gap-2 text-[#868686] text-sm font-bold leading-none uppercase tracking-tight ml-auto border border-black/20 px-3 py-1.5">
              <div className={`w-3 h-3 ${MOCK_DATA.dot}`}></div>
              <span>{MOCK_DATA.status}</span>
            </div>
          </div>
          
          {/* Title */}
          <h1 className="text-[32px] md:text-[48px] leading-[1.1] font-black uppercase tracking-tighter mb-6">
            {MOCK_DATA.title}
          </h1>

          {/* Author/Platform */}
          <div className="flex flex-col gap-1 mb-16 border-l-4 border-black pl-4">
            <span className="text-sm opacity-50 uppercase tracking-widest font-bold">TARGET ENTITY</span>
            <span className="text-xl font-bold uppercase">@{MOCK_DATA.username}</span>
            <span className="text-sm font-bold uppercase opacity-70">PLATFORM: {MOCK_DATA.platform}</span>
          </div>

          {/* Timeline */}
          <div className="mb-16">
            <h2 className="text-xl font-display uppercase tracking-widest mb-12 border-b border-black pb-2">TIMELINE_OF_SUPPRESSION</h2>
            <div className="flex justify-between relative">
              {/* Timeline Line */}
              <div className="absolute top-3 left-0 w-full h-0.5 bg-black/20 z-0"></div>
              
              {MOCK_DATA.timeline.map((step, i) => (
                <div key={i} className="flex flex-col items-center relative z-10 bg-white px-2 group">
                  <div className="w-6 h-6 bg-white border-2 border-black rounded-full mb-4 group-hover:bg-[#FF4747] group-hover:border-[#FF4747] transition-colors"></div>
                  <div className="text-center">
                    <div className="text-xs font-bold uppercase tracking-tighter mb-1 max-w-[100px] leading-tight">
                      {step.action}
                    </div>
                    <div className="text-[10px] opacity-50 font-bold tracking-widest mt-2">
                      {step.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none font-mono mt-8 font-normal">
            <h2 className="text-xl font-display font-normal uppercase tracking-widest mb-8 border-b border-black pb-2">CASE_DETAILS</h2>
            <div className="space-y-6 text-lg leading-relaxed">
              {MOCK_DATA.content.map((paragraph, i) => (
                <p key={i} className={paragraph.startsWith('"') ? "border-l-4 border-[#FF4747] pl-6 italic font-medium text-black" : "text-black/80 font-normal"}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Evidence Image Carousel */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full md:w-[45%] bg-[#F5F5F5] flex flex-col h-[calc(100vh-140px)] sticky top-[140px]"
        >
          <div className="px-6 py-4 border-b border-black flex justify-between items-center bg-white font-bold text-xs tracking-widest uppercase">
            <span>DIGITAL_EVIDENCE</span>
            <span>[{MOCK_DATA.images.length} FILES]</span>
          </div>
          
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {MOCK_DATA.images.map((img, i) => (
              <div key={i} className="bg-white border border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(255,71,71,1)] hover:border-[#FF4747] transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b border-black/10 pb-2">
                  <span className="text-[10px] font-bold opacity-50">EVIDENCE_{String(i+1).padStart(2, '0')}</span>
                  <span className="text-[10px] font-bold opacity-50">SYS_CAP</span>
                </div>
                <img src={img} alt={`Evidence ${i+1}`} className="w-full h-auto object-contain border border-black/10" />
              </div>
            ))}
          </div>
          
          <div className="bg-white border-t border-black p-4 text-center text-xs font-bold uppercase tracking-widest opacity-50">
            SCROLL TO VIEW ALL EVIDENCE ↓
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ArchiveDetail;