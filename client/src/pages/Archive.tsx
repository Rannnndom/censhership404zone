import React, { useState, useEffect } from 'react';
import { useLocation } from "wouter";
import { ArrowRight, X } from "lucide-react"; 
import logoImg from "@assets/Group_1_1772194218007.png";
import { motion, AnimatePresence } from "framer-motion";

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

interface ArchiveItem {
  id: string; status: string; dot: string; title: string; name: string; img: string;
}

const archiveData: ArchiveItem[] = [
  { id: "00001", status: 'SUPPRESSED', dot: "bg-yellow-400", title: "Teaching anatomy using physical vulva models.", name: "Dr Aziza Sesay", img: "image_1958df.jpg" },
  { id: "00002", status: 'REMOVED', dot: "bg-red-500", title: "Documenting the reality of the birthing process.", name: "birth_ed", img: "image_1958c5.jpg" },
  { id: "00003", status: 'SUPPRESSED', dot: "bg-yellow-400", title: "Discussing penalties for using anatomical terminology.", name: "Dr Philippa Kaye", img: "image_1958bf.jpg" },
  { id: "00004", status: 'SUPPRESSED', dot: "bg-yellow-400", title: "Supporting breastfeeding and lactation for new parents.", name: "LactApp", img: "image_1958a4.jpg" },
  { id: "00005", status: 'REJECTED', dot: "bg-red-500", title: "Promoting diagnostic tampons for gynaecological health.", name: "Daye", img: "image_19589f.jpg" },
  { id: "00006", status: 'SUPPRESSED', dot: "bg-yellow-400", title: "Providing specialist advice for sexual health concerns.", name: "HANX", img: "image_195885.jpg" },
  { id: "00007", status: 'REJECTED', dot: "bg-red-500", title: "Explaining at-home fertility treatment and diagnostic kits.", name: "Béa Fertility", img: "image_195880.png" },
  { id: "00008", status: 'REMOVED', dot: "bg-red-500", title: "Educating the public on the menstrual cycle.", name: "Bodyform", img: "image_195880.jpg" },
  { id: "00009", status: 'REMOVED', dot: "bg-red-500", title: "Showcasing body-positive clothing and merchandise.", name: "LactApp", img: "image_195860.jpg" },
  { id: "00010", status: 'ACCOUNT AT RISK', dot: "bg-red-600", title: "Supporting survivors with post-mastectomy areola tattoos.", name: "NIP Charity", img: "image_195847.png" },
];

const ArchivePage: React.FC = () => {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedUserTypes, setSelectedUserTypes] = useState<string[]>([]);

  const toggleStatus = (s: string) => {
    setSelectedStatuses(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const togglePlatform = (p: string) => {
    setSelectedPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  const toggleUserType = (u: string) => {
    setSelectedUserTypes(prev => prev.includes(u) ? prev.filter(x => x !== u) : [...prev, u]);
  };

  const filteredData = archiveData.filter(item => {
    const matchesSearch = item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(item.status);
    // As mock data doesn't have platform and userType yet, we just ignore them in the actual filter for now to show all results.
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-white font-mono text-black selection:bg-black selection:text-white flex flex-col relative">
      <AsciiFooterBackground />

      <header className="w-full px-8 py-4 flex items-center border-b border-black/10 shrink-0 relative z-10 font-mono">
        <div className="flex-1 flex justify-start">
          <img src={logoImg} alt="CensHership" className="h-8 md:h-10 object-contain" />
        </div>
        <nav className="flex items-center gap-10 text-[20px] font-bold font-mono">
          <button onClick={() => setLocation("/")} className="opacity-40 hover:opacity-100 transition-opacity tracking-tight">Home</button>
          <button className="border-b-2 border-black pb-1 font-bold tracking-tight">Archive</button>
          <button onClick={() => setLocation("/about")} className="opacity-40 hover:opacity-100 transition-opacity tracking-tight">About</button>
        </nav>
        <div className="flex-1 hidden md:block"></div>
      </header>

      <div className="px-8 pt-10 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keyword, name, or number" 
            className="w-full border border-black p-5 text-xs font-mono outline-none uppercase placeholder:opacity-30 focus:border-[#FF4747] transition-colors" 
          />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-between items-end mb-10 font-mono text-[10px] uppercase"
        >
          <div className="tracking-tight">
            DISPLAYING: {filteredData.length} / {archiveData.length} CASES <br /> 
            LAST_SYNC: 2026.03.07_15:43_GMT
          </div>

          {/* 修改后的 CTA 按钮区域 */}
          <div className="flex gap-4">
            {/* FILTER: 改为白底黑框黑字 */}
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="bg-white text-black border border-black px-8 py-3 font-bold tracking-tight hover:bg-[#FF4747] hover:text-white hover:border-[#FF4747] transition-all"
            >
              FILTER
            </button>

            {/* SHARE: 改为黑底白字带右箭头 */}
            <button 
              onClick={() => setLocation("/share")} 
              className="bg-black text-white px-8 py-3 font-bold tracking-tight flex items-center gap-2 hover:bg-[#FF4747] transition-all"
            >
              <span>SHARE YOUR EXPERIENCE</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 border-t border-l border-black mx-8 mb-24 relative z-10 font-normal"
      >
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
              onClick={() => setLocation(`/archive/${item.id}`)}
              className="border-r border-b border-black flex flex-col aspect-[1/2] group overflow-hidden bg-white cursor-pointer hover:bg-neutral-50 transition-colors"
            >
              <div className="p-6 flex-grow flex flex-col">
                <div className="mb-4">
                  <div className="text-[11px] font-mono font-bold tracking-tight">{item.id}</div>
                  <div className="w-full h-[1px] bg-black mt-1"></div>
                </div>
                <div className="space-y-4 text-left font-mono">
                  <div className="flex items-center gap-2 text-[#868686] text-[13.3px] font-bold leading-none uppercase tracking-tight">
                    <div className={`w-3 h-3 rounded-none ${item.dot}`}></div>
                    <span>{item.status}</span>
                  </div>
                  <div className="text-[21.3px] font-bold leading-tight text-black tracking-tight">
                    {item.title}
                  </div>
                  <div className="text-[16px] font-bold text-black mt-auto tracking-tight">
                    {item.name}
                  </div>
                </div>
              </div>
              <div className="h-2/3 w-full overflow-hidden flex items-end relative bg-white">
                <img 
                  src={`/assets/${item.img}`} 
                  alt={item.title} 
                  className="w-full h-auto max-h-full object-bottom grayscale brightness-95 group-hover:grayscale-0 transition-all duration-700 ease-in-out" 
                  onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
                />
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full border-r border-black p-20 text-center font-mono opacity-40">
            [ NO_MATCHING_EVIDENCE_FOUND ]
          </div>
        )}
      </motion.div>

      <footer className="px-8 py-10 border-t border-black flex justify-between items-center text-[10px] font-mono opacity-50 relative z-10 uppercase tracking-tight">
        <div>© 2026 CENSHERSHIP_404_ZONE / ALL_RIGHTS_RESERVED</div>
        <div>[ EVIDENCE_BASED_DESIGN_V2.9_STABLE ]</div>
      </footer>

      {/* FILTER SIDEBAR */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-[350px] bg-black text-white z-50 p-8 overflow-y-auto font-mono flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-2xl font-bold uppercase tracking-widest">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)} className="hover:text-[#FF4747] transition-colors">
                  <X size={28} />
                </button>
              </div>

              {/* Status */}
              <div className="mb-8">
                <h3 className="text-sm text-neutral-400 mb-4 uppercase tracking-widest border-b border-neutral-800 pb-2">Status</h3>
                <div className="flex flex-col gap-3">
                  {['REMOVED', 'SUPPRESSED', 'REJECTED', 'ACCOUNT AT RISK'].map(s => (
                    <label key={s} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={selectedStatuses.includes(s)}
                        onChange={() => toggleStatus(s)}
                        className="w-5 h-5 appearance-none border-2 border-white checked:bg-white checked:border-white relative flex items-center justify-center after:content-[''] checked:after:block after:hidden after:w-2 after:h-2 after:bg-black transition-colors"
                      />
                      <span className="text-sm uppercase group-hover:text-[#FF4747] transition-colors">{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Platform */}
              <div className="mb-8">
                <h3 className="text-sm text-neutral-400 mb-4 uppercase tracking-widest border-b border-neutral-800 pb-2">Platform</h3>
                <div className="flex flex-col gap-3">
                  {['Instagram', 'TikTok', 'Facebook', 'X'].map(p => (
                    <label key={p} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={selectedPlatforms.includes(p)}
                        onChange={() => togglePlatform(p)}
                        className="w-5 h-5 appearance-none border-2 border-white checked:bg-white checked:border-white relative flex items-center justify-center after:content-[''] checked:after:block after:hidden after:w-2 after:h-2 after:bg-black transition-colors"
                      />
                      <span className="text-sm uppercase group-hover:text-[#FF4747] transition-colors">{p}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* User Type */}
              <div className="mb-8">
                <h3 className="text-sm text-neutral-400 mb-4 uppercase tracking-widest border-b border-neutral-800 pb-2">User Type</h3>
                <div className="flex flex-col gap-3">
                  {['Individual User', 'Brand / Organization'].map(u => (
                    <label key={u} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={selectedUserTypes.includes(u)}
                        onChange={() => toggleUserType(u)}
                        className="w-5 h-5 appearance-none border-2 border-white checked:bg-white checked:border-white relative flex items-center justify-center after:content-[''] checked:after:block after:hidden after:w-2 after:h-2 after:bg-black transition-colors"
                      />
                      <span className="text-sm uppercase group-hover:text-[#FF4747] transition-colors">{u}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-8">
                <button 
                  onClick={() => {
                    setSelectedStatuses([]);
                    setSelectedPlatforms([]);
                    setSelectedUserTypes([]);
                  }}
                  className="w-full border-2 border-white py-3 text-sm font-bold uppercase hover:bg-white hover:text-black transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArchivePage;
