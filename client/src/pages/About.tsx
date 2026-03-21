import React, { useState, useEffect } from 'react';
import { useLocation } from "wouter";
import logoImg from "@assets/Group_1_1772194218007.png";
import { motion } from "framer-motion";

const KEYWORDS = ["CensHership", "404", "ERROR_404", "Period", "Cycle", "Vulva", "Lactation"];

const AsciiFooterBackground = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    const generateNoise = () => {
      const lightChars = " . ' ` , ^ - + = * ";
      let noise = "";
      for (let i = 0; i < 2000; i++) {
        if (Math.random() < 0.02) { noise += `  ${KEYWORDS[Math.floor(Math.random() * KEYWORDS.length)]}  `; } 
        else { noise += Math.random() > 0.6 ? " " : lightChars[Math.floor(Math.random() * lightChars.length)]; }
      }
      setContent(noise);
    };
    const interval = setInterval(generateNoise, 300);
    return () => clearInterval(interval);
  }, []);
  return <div className="fixed bottom-0 left-0 right-0 z-0 overflow-hidden pointer-events-none select-none opacity-[0.06] break-all font-mono text-[10px] text-black h-[200px]">{content}</div>;
};

const AlliedBrands = [
  { name: "Daye", url: "https://yourdaye.com" },
  { name: "HANX", url: "https://hanxofficial.com" },
  { name: "Béa Fertility", url: "https://beafertility.com" },
  { name: "Bodyform", url: "https://bodyform.co.uk" },
  { name: "LactApp", url: "https://lactapp.es/en/" },
  { name: "NIP Charity", url: "https://nipcharity.org" }
];

export default function About() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white font-mono text-black selection:bg-black selection:text-white flex flex-col relative">
      <AsciiFooterBackground />

      <header className="w-full px-8 py-4 flex items-center border-b border-black/10 shrink-0 relative z-10 font-mono">
        <div className="flex-1 flex justify-start">
          <img src={logoImg} alt="CensHership" className="h-8 md:h-10 object-contain cursor-pointer" onClick={() => setLocation("/")} />
        </div>
        <nav className="flex items-center gap-10 text-[20px] font-bold font-mono">
          <button onClick={() => setLocation("/")} className="opacity-40 hover:opacity-100 transition-opacity tracking-tight">Home</button>
          <button onClick={() => setLocation("/archive")} className="opacity-40 hover:opacity-100 transition-opacity tracking-tight">Archive</button>
          <button className="border-b-2 border-black pb-1 font-bold tracking-tight">About</button>
        </nav>
        <div className="flex-1 hidden md:block"></div>
      </header>

      <main className="flex-1 flex flex-col items-center p-8 z-10 relative pb-32">
        <div className="w-full max-w-4xl space-y-24 mt-12">
          
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 border-t-4 border-black pt-8"
          >
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">The Entity</h2>
            <div className="text-lg md:text-xl leading-relaxed space-y-6 opacity-80 font-normal">
              <p>
                CensHership is an activist organization dedicated to exposing and dismantling algorithmic bias against women's health. We investigate the technological systems that govern modern communication, revealing how they disproportionately silence, shadow-ban, and penalize educational and clinical content related to the female body.
              </p>
              <a href="https://censhership.org" target="_blank" rel="noreferrer" className="inline-block border-2 border-black px-6 py-3 uppercase tracking-widest font-bold hover:bg-[#FF4747] hover:text-white hover:border-[#FF4747] transition-all">
                VISIT CENSHERSHIP.ORG
              </a>
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8 border-t-4 border-black pt-8"
          >
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">The Mission</h2>
            <div className="text-lg md:text-xl leading-relaxed space-y-6 opacity-80 font-normal">
              <p>
                404Zone exists to map the void. Our mission is to create a decentralized, immutable archive of digital censorship. By systematically tracking the erasure of women's health content, we transform isolated incidents into undeniable data. We empower creators, healthcare professionals, and organizations to prove what the platforms deny: that the truth is being systematically treated as sensitive content.
              </p>
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8 border-t-4 border-black pt-8"
          >
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">The Audit Logic</h2>
            <div className="text-lg md:text-xl leading-relaxed space-y-6 opacity-80 font-normal">
              <p>
                The #404Zone protocol operates as an automated cross-platform monitoring system. When a post is tagged with #404Zone on Instagram, TikTok, Facebook, or X, our system begins tracking its algorithmic status.
              </p>
              <ul className="list-disc pl-6 space-y-4">
                <li><span className="uppercase text-black">Visibility Tracking:</span> We monitor engagement metrics against historical averages to detect shadow-banning.</li>
                <li><span className="uppercase text-black">Status Logging:</span> We record instances of posts being flagged, age-restricted, or removed entirely.</li>
                <li><span className="uppercase text-black">Privacy First:</span> All data collection is strictly limited to public post metadata. We anonymize user identifiers where requested and never store personal user data beyond the explicit scope of the censorship evidence.</li>
              </ul>
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8 border-t-4 border-black pt-8"
          >
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Allied Brands</h2>
            <div className="text-lg md:text-xl leading-relaxed opacity-80 font-normal mb-6">
              <p>These organizations and brands are fighting on the front lines of women's health. We proudly support their work and document the algorithmic barriers they face.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {AlliedBrands.map((brand, idx) => (
                <motion.a 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  href={brand.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="border border-black p-6 group hover:bg-black hover:text-white transition-all flex justify-between items-center"
                >
                  <span className="text-2xl font-black tracking-tighter uppercase">{brand.name}</span>
                  <span className="text-xs uppercase tracking-widest opacity-50 group-hover:opacity-100">VISIT SITE ↗</span>
                </motion.a>
              ))}
            </div>
          </motion.section>

        </div>
      </main>

      <footer className="px-8 py-10 border-t border-black flex justify-between items-center text-[10px] font-mono opacity-50 relative z-10 uppercase tracking-tight bg-white">
        <div>© 2026 CENSHERSHIP_404_ZONE / ALL_RIGHTS_RESERVED</div>
        <div>[ EVIDENCE_BASED_DESIGN_V2.9_STABLE ]</div>
      </footer>
    </div>
  );
}