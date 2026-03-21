import React, { useState, useEffect, useRef, useMemo } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLocation } from "wouter";
import logoImg from "@assets/Group_1_1772194218007.png";
import silentImg from "@assets/image_1773257673219.png";
import joinImg from "@assets/image_1773258671771.png";
import { motion, AnimatePresence } from "framer-motion";

interface HomeProps {
  onNavigate: () => void;
}

// --- 动效组件 1：浅色背景下的黑红闪烁 ---
const Pulse404 = () => (
  <motion.span
    animate={{
      color: ["#000000", "#FF3B30", "#000000"],
      scale: [1, 1.05, 1],
    }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    className="font-bold inline-block"
  >
    #404zone
  </motion.span>
);

// --- 动效组件 2：深色背景下的白红闪烁 ---
const Pulse404White = () => (
  <motion.span
    animate={{
      color: ["#FFFFFF", "#FF3B30", "#FFFFFF"],
      scale: [1, 1.05, 1],
    }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    className="font-bold inline-block"
  >
    #404zone
  </motion.span>
);

const silhouetteArt = String.raw`
                         =--:.......:                           
                       --==--==.....:..:                         
                     -:--:::.::::........:                        
                 :==+***=++=+-.-............:                    
                =-==-=-+==---.-::.............:                 
                -+*#****#**+-=-::...--..........:                
               ==+=*++=*-+*--=-.-.................               
               ++*###*+%#*+-+====:--.:............               
              -=+*****+#*=#=*+=+=:-===-:..:-..:...-              
             =***####%#%#**=+=:==.==:.:.........:.:              
              *###%*%%%%%#*#%*#+==++=++-=:--=-..:.-              
              =*#%##%%#%#%#=*+=**+*+-=*+=--==-=---               
               %%##*###%@%@%#**#*****===::-:::..::               
               #%##%%%##%%#*%@*###**#*#**++++=+=:                
                %@%%%%##%%%#%###******++=:::=-:--                
                #@@@@@@%%@%%%%%#%***+**+=---=---                 
              *#%@@%@@@@@@@@@@%#%******#+===-::                  
          +**+**+*##%#%@%@@@%%@@@#*+**-==-::....::-              
        +*#+*+====+*+#+******++===---:...............:-          
       **+**#+#*++++++*++*++===----:::.................:-         
      ***==%%%##*++=====+=::+%+-::--:::..................:       
     +##*+=*%##**+==+++==----:....=----:-:::..............-       
     *####*#%##*++===-=---::.....+++++==-.:.:-:......:-....:      
     ###%*#%@#=====--:-=+-::-:...++**+=--:.:...............:      
     #####%#+==--+*+=::--=::::...+=*+=+-----:..............:-     
     ###**+++**+===--::--=--=:..:*+**+++==-.::..............-     
     @*****+====+=-:-:=:::.::==--=###**+==-:::.:............:     
     #**#*=+==+=+==--::--:..:---:-+###%*+=----:.............:     
    ****++++*+++=---:::::.:::--..*#####*+=----:.............     
     +*+*+*+*#**+====-=-:-:.=-=-::-#%%%##*+--==:.............-    
     **+****#*##++=+=-=---:-:-===:.:#%%%##**=-=-::.....:.....:=   
    +%*+******#%#++====+=========-..:#%%%%%**+===--::-::......:-  
   *#%#+*####**##*+++++=+**+=+===:...:=@%%%%***+++===-:-::....::- 
  *#%%@%*###*#######**#**#*+**+=:==...:-#@%%%%##+**+==--:::..:.::-
 *#%@%@@%*######%###%#*##*+#**===-:.....:*@@%%%%%**++=-::::......-
 *%%%@%%@@#*###**#####%#+#*+*+==--:......::+%#***###*++=-:::.....:
 #%%@%%%@@@%########%#*%%*++#+=--=-:.......::+###*##**++::..::...:
 #%%@%%%@%@@@@%%%%%%%%%##***+++===--.......::::-+=+=::...:..:::..-
 ##%%%####@####%%%%#*#%#+##*+++++==+=:...:::::::::::-:::.:-..-:::-
 #%#######%%#######**%##***+*==*@#%%*=:-:.--.:-:..:-:....-=--=-:-=
  #########%########%####**+====:*##+-::--=-==----:--.:-:=====-:- 
   ########%%#####%%%##%#**#*+++=+++=+++==--==+--*++++++=++===--  
    ##*#######*####%#%%###+*++++++===-==+==++====+=*=++++====--=  
     %%%%%@@@@%####%%##%%##*+*+++++*++=+++*+*++****#+*#***++==   
      *#@%%%%@@@@@@%%#%%%###*********###**#****#*=:=:::::::-=     
       ########*%@@@@@@%%%%%###*####*#****+----==-.....::..-     
       ######%#*#***##%@@%%@##*+++++**+=====----:......:-.-      
        #%######*#*+****#@@@@#*##***+==++=-:---=:..:..::::=       
        #%###%##******++*+*@%@%##**=*++===:=-=--..:.::-::-       
        ####%####*#***+++=-==*#**+*#*+=+=-----=..:----=:-=       
         *#####%###%*+*+++===-=**###*+*+==-==::-:--===-:=         
          *#####*#*###*++++-.:=+%*##*+++===-=-:==-=++===          
           #**#######**+++=---=#@###*+++*====--==+++====          
             ****#%##*#**+=+-:-+*%##+*+*+======-===+====          
              ****#%%####*=+---=*%#*+++=++++=++===+=+=             
               **##%####***====+%###+==-----=*++--==             
                ***#%%#*++**+=+*@%@@%#++++==-+===--               
                #*****####*#*+*#@%%#@%#*++===++=-:-               
                ########**##**#@@@%%%%####**==---=               
                #####*+***+**+*#@@%%%###***+=--=-=                
                ######*+**+++***@@%%%%##**+==:-=-                 
                ######**+++++*+*#@@@%%#*#*+=-====                 
                *####***+==++**+*++#%%%#**++=====                 
                 ##%####*+*##+++=  =%%###***+===                 
                  ######*#***++      =*#%#**+++                   
                    *####*#*++          ++++                     
`;

const ASCII_CHARS = " .:-=+*#%@";

const ZONES = {
  chest: { 
    id: "chest", 
    variants: ["B**b", "B00b", "Br**st", "N*pple", "N1pple"], 
    normals: ["Breast", "Boob", "Nipple", "Milk", "Lactation", "Colostrum", "Areola", "Mastitis"], 
    metric: "Sexualization of Health and Survival", 
    audit: "Algorithms systematically misclassify medical education as sexual content.", 
    desc: [
      "The Pornography Bias: Educational breastfeeding and postpartum health content is frequently flagged as 'Adult Services' due to the algorithm’s inability to understand medical context.",
      "Criminalizing Recovery: Mastectomy survivors are blocked from seeing nipple restoration content — treating post-cancer identity as a \"policy violation.\"",
      "The Fruit Meta: To survive deletion, medical educators must use fruit emojis, effectively sexualizing anatomy by refusing to name it."
    ]
  },
  abdomen: { 
    id: "abdomen", 
    variants: ["W*mb", "P*riod", "Bl**d", "C*cle", "M*nopause"], 
    normals: ["Womb", "Period", "Cycle", "Uterus", "cervix", "Menopause", "Lochia"], 
    metric: "Erasing the Lifecycle", 
    audit: "From menstruation to menopause, the internal biological reality of women is treated as a commercial risk.", 
    desc: [
      "Market Erasure: Throttling health innovation for menstruation and menopause products hinders a potential $1 trillion boost to the global economy.", 
      "Cyclical Silence: Premenstrual Syndrome receives 5x less research focus than erectile dysfunction — a biological hierarchy enforced by ad reach.", 
      "The Menopause Tax: Discussing symptoms like vaginal dryness triggers a 300% cost increase, pricing women out of their own health."
    ]
  },
  pubic: { 
    id: "pubic", 
    variants: ["V*gina", "V*lva", "V-word", "S3x", "Down there", "Cl1t", "Cl*t", "STD", "D*ryness"], 
    normals: ["Vagina", "Vulva", "Clit", "Clitoris", "Sex", "Discharge", "Pelvic Floor"], 
    metric: "Anatomy as \"Digital Contraband\"", 
    audit: "When correct anatomical names are treated as violations, access to care is severed.", 
    desc: [
      "Naming as a Crime: Using clinical terms like \"vagina\" or \"vulva\" results in immediate algorithmic penalties, as if anatomy were a slur.",
      "Banning the Cure: Essential tags like #VaginalCancer are restricted, severing the link between patients and preventative care.",
      "Linguistic Exile: Fertility startups are forced to replace \"vagina\" with \"birth canal\" to bypass filters, erasing scientific literacy."
    ]
  }
};

const STATIC_WORDS = [
  { text: "The V-word", top: "40%", left: "5%" },
  { text: "🍒 Les Nichons", top: "44%", left: "45%" },
  { text: "🍑", top: "50%", left: "8%" },
  { text: "🥚", top: "53%", left: "25%" },
  { text: "アソコ", top: "56%", left: "35%" },
  { text: "妹妹", top: "50%", left: "62%" },
  { text: "Lolas", top: "60%", left: "78%" },
  { text: "Pussycat", top: "66%", left: "12%" },
  { text: "大姨妈", top: "66%", left: "55%" },
  { text: "🩸", top: "60%", left: "90%" },
  { text: "الخالة", top: "43%", left: "68%" },
  { text: "النهد", top: "60%", left: "42%" },
  { text: "Ubhar", top: "73%", left: "28%" },
  { text: "슴가", top: "70%", left: "72%" },
  { text: "Garten", top: "76%", left: "5%" },
  { text: "Tới tháng", top: "76%", left: "48%" },
  { text: "จิมિ", top: "73%", left: "85%" },
];

export default function Home({ onNavigate }: HomeProps) {
  const [, setLocation] = useLocation();
  const [activeZone, setActiveZone] = useState(ZONES.chest);
  const [isDetailView, setIsDetailView] = useState(false);
  const [censorIdx, setCensorIdx] = useState(0);
  const [stableIdx, setStableIdx] = useState(0);
  const [dynamicArt, setDynamicArt] = useState(silhouetteArt);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const [wordsAnimating, setWordsAnimating] = useState(false);
  const [imageOffset, setImageOffset] = useState(0);
  const [imageOffset2, setImageOffset2] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const carouselImages = [
    "/assets/Group_47_1773410375699.png",
    "/assets/IMG_5877_1_1773410375715.png",
    "/assets/Group_46_1773410375715.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const scrambled = silhouetteArt.split('\n').map(line => line.split('').map(char => {
        if (char === ' ') return ' ';
        if (Math.random() > 0.96) {
          const idx = ASCII_CHARS.indexOf(char);
          if (idx === -1) return char;
          const newIdx = Math.min(ASCII_CHARS.length - 1, idx + 1);
          return ASCII_CHARS[newIdx];
        }
        return char;
      }).join('')).join('\n');
      setDynamicArt(scrambled);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cInterval = setInterval(() => setCensorIdx((prev) => (prev + 1) % activeZone.variants.length), 400);
    const sInterval = setInterval(() => setStableIdx((prev) => (prev + 1) % activeZone.normals.length), 2000);
    return () => { clearInterval(cInterval); clearInterval(sInterval); };
  }, [activeZone]);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % carouselImages.length);
    }, 2000);
    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const threshold = window.innerHeight * 0.25;

      if (isScrollingRef.current === false && scrollTop > 0 && scrollTop < window.innerHeight && scrollTop > threshold) {
        isScrollingRef.current = true;
        container.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        setTimeout(() => { isScrollingRef.current = false; }, 800);
      }

      const secondPageStart = window.innerHeight;
      const secondPageEnd = window.innerHeight * 2;
      const triggerPoint = secondPageStart + (secondPageEnd - secondPageStart) * 0.2;

      if (scrollTop > triggerPoint && !wordsAnimating) {
        setWordsAnimating(true);
      }

      if (scrollTop < secondPageStart || scrollTop > secondPageEnd) {
        if (wordsAnimating) {
          setWordsAnimating(false);
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [wordsAnimating]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleImageScroll = () => {
      const scrollTop = container.scrollTop;
      const section3Start = window.innerHeight * 2;
      setImageOffset(Math.max(0, scrollTop - section3Start));
      const section4Start = window.innerHeight * 2 + (window.innerHeight + 150); 
      setImageOffset2(Math.max(0, scrollTop - section4Start));
    };

    container.addEventListener('scroll', handleImageScroll);
    return () => container.removeEventListener('scroll', handleImageScroll);
  }, []);

  const handleZoneClick = (zone: typeof ZONES.chest) => {
    if (isDetailView && activeZone.id === zone.id) {
      setIsDetailView(false);
    } else {
      setActiveZone(zone);
      setIsDetailView(true);
    }
  };

  const wordAnimationParams = useMemo(() => {
    return STATIC_WORDS.map((_, i) => ({
      randomDelay: Math.random() * 0.3,
      randomOffsetX: (Math.random() - 0.5) * 350,
      randomRotation: (Math.random() - 0.5) * 75,
      randomDuration: 0.3 + Math.random() * 0.15,
      randomLandY: window.innerHeight - 150 + (Math.random() - 0.5) * 120
    }));
  }, []);

  return (
    <div ref={scrollRef} className="h-screen overflow-y-auto bg-white text-black font-mono selection:bg-black selection:text-white">

      {/* SECTION 1 */}
      <section className="h-screen w-full flex flex-col shrink-0 relative overflow-hidden">
        <header className="w-full px-8 py-4 flex items-center border-b border-black/10 shrink-0 font-mono text-[20px] font-bold">
          <div className="flex-1 flex justify-start">
            <img src={logoImg} alt="CensHership" className="h-8 md:h-10 object-contain" />
          </div>
          <nav className="flex items-center gap-10">
            <button onClick={() => setIsDetailView(false)} className="border-b-2 border-black pb-1 tracking-tight">Home</button>
            <button onClick={() => setLocation("/archive")} className="opacity-40 hover:opacity-100 transition-opacity tracking-tight">Archive</button>
            <button onClick={() => setLocation("/about")} className="opacity-40 hover:opacity-100 transition-opacity tracking-tight">About</button>
          </nav>
          <div className="flex-1 hidden md:block"></div>
        </header>

        <main className="flex-1 w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] items-start py-8">
          <div className="relative flex items-center justify-center p-4 lg:sticky lg:top-24">
            <div className="relative inline-block text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] leading-[1] font-mono text-black select-none">
              <pre className="m-0 whitespace-pre font-bold">{dynamicArt}</pre>
              <button onClick={() => handleZoneClick(ZONES.chest)} className={`absolute top-[41%] left-[10%] w-[80%] h-9 z-20 flex items-center justify-between px-8 border-0 transition-colors ${isDetailView && activeZone.id === 'chest' ? 'bg-[#FF3B30]' : 'bg-black hover:bg-[#FF3B30]'} text-white`}>
                <span className="text-xl font-bold">*</span><span className="text-xl font-bold">*</span>
              </button>
              <button onClick={() => handleZoneClick(ZONES.abdomen)} className={`absolute top-[54%] left-[12%] w-[76%] h-9 z-20 flex items-center justify-around px-4 border-0 transition-colors ${isDetailView && activeZone.id === 'abdomen' ? 'bg-[#FF3B30]' : 'bg-black hover:bg-[#FF3B30]'} text-white`}>
                <span className="text-xl font-bold">*</span><span className="text-xl font-bold">*</span><span className="text-xl font-bold">*</span><span className="text-xl font-bold">*</span>
              </button>
              <button onClick={() => handleZoneClick(ZONES.pubic)} className={`absolute top-[67%] left-[18%] w-[64%] h-9 z-20 flex items-center justify-center border-0 transition-colors ${isDetailView && activeZone.id === 'pubic' ? 'bg-[#FF3B30]' : 'bg-black hover:bg-[#FF3B30]'} text-white`}>
                <span className="text-xl font-bold">*</span>
              </button>
            </div>
          </div>

          <div className="px-12 lg:px-20 py-4 flex flex-col items-start text-left relative h-full">
            <div className="min-h-[580px] w-full">
              <AnimatePresence mode="wait">
                {!isDetailView ? (
                  <motion.div 
                    key="manifesto"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full font-mono"
                  >
                    <div className="flex mb-8 h-20 shrink-0 items-end pb-2">
                       <h1 className="text-[54px] font-display font-normal leading-none uppercase tracking-tighter text-balance">Making the Invisible Visible</h1>
                    </div>

                    <div className="space-y-6 text-[16px] leading-relaxed text-neutral-600 font-normal max-w-2xl text-pretty">
                      <p>
                        Biased algorithms are erasing <strong className="text-black font-bold">vital medical literacy</strong> from our digital world. 
                        In fact, 84% of women’s health content creators say they have experienced content suppression (<a href="https://static1.squarespace.com/static/66eab2d398417b6acf847064/t/685e69b37db55d3271edef59/1751017917906/Censorship+Revealed+White+Paper+FINAL+June+2025.pdf/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 italic text-black hover:text-[#FF3B30] transition-colors">CensHERship Report</a>).
                      </p>
                      <p>We are launching the <Pulse404 /> — a collective campaign to dismantle this digital erasure. We invite everyday users, content creators, and women-led brands to co-build a forensic database that breaks the silence.</p>
                      <p>Participation is a tag away. Use <Pulse404 /> on any platform to ensure your health content is indexed, archived, and heard. Your data is the evidence.</p>
                      <p className="bg-neutral-100 p-4 border-l-4 border-black text-black italic text-[14px]">
                        Click the <span className="bg-black text-white px-2 py-0 not-italic inline-flex items-center justify-center font-bold h-[1.2em] align-middle mx-1">**</span> to explore the scale of suppression.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key={activeZone.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full flex flex-col items-start font-mono"
                  >
                    <div className="flex gap-x-1 mb-8 h-20 shrink-0 whitespace-nowrap overflow-x-hidden items-end pb-2">
                      <div className="shrink-0">
                        <AnimatePresence mode="wait">
                          <motion.span key={stableIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="text-[54px] font-display font-normal text-black uppercase block leading-none">
                            {activeZone.normals[stableIdx]}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                      <span className="shrink-0 text-[54px] font-display font-normal text-neutral-300 line-through decoration-black decoration-8 uppercase tracking-tighter leading-none">{activeZone.variants[censorIdx]}</span>
                    </div>

                    <div className="space-y-6 text-[16px] leading-relaxed font-mono max-w-2xl text-pretty">
                      <h2 className="text-black font-display font-normal text-2xl uppercase tracking-widest border-b border-black pb-2 w-fit mb-2">
                        {activeZone.metric}
                      </h2>
                      <p className="text-lg text-black font-bold leading-tight mb-10">{activeZone.audit}</p>

                      <div className="space-y-8">
                        {activeZone.desc.map((item, idx) => {
                          const [title, detail] = item.split(': ');
                          return (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="text-black mt-1 font-bold">■</span>
                              <p className="leading-snug text-[16px]">
                                <span className="text-black font-bold uppercase tracking-tight">{title}: </span>
                                <span className="text-neutral-600 font-normal">{detail}</span>
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-12 w-full flex flex-col items-end max-w-2xl">
              <motion.button 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                onClick={() => setLocation("/share")} 
                className="group flex items-center justify-between w-full sm:w-auto min-w-[320px] border-2 border-black p-5 text-[22px] font-bold font-mono transition-all duration-300 bg-black text-white hover:bg-[#FF3B30] hover:border-[#FF3B30]"
              >
                <span>SHARE YOUR EXPERIENCE</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </div>
          </div>
        </main>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
        >
            <span className="text-[14px] uppercase tracking-widest font-bold">Scroll Down</span>
            <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* SECTION 2-4 保持一致 */}
      <section className="h-screen w-full relative bg-white border-t-2 border-dashed border-gray-300 overflow-visible flex flex-col items-center">
        <div className="z-10 text-center mt-8 px-4 w-full select-none">
          <h2 className="text-[12vw] font-black leading-[0.8] uppercase tracking-tighter text-balance">
            Not proper words,<br />but you understand
          </h2>
        </div>
        <div className="absolute inset-0 z-0">
          {STATIC_WORDS.map((item, i) => {
            const params = wordAnimationParams[i];
            return (
              <motion.div 
                key={i}
                initial={{ top: item.top, left: item.left, opacity: 1, rotate: 0 }}
                animate={wordsAnimating ? {
                  top: params.randomLandY,
                  left: `calc(${item.left} + ${params.randomOffsetX}px)`,
                  opacity: 0.85,
                  rotate: params.randomRotation
                } : { top: item.top, left: item.left, opacity: 1, rotate: 0 }}
                transition={wordsAnimating ? { duration: params.randomDuration, delay: params.randomDelay, type: "tween", ease: "linear" } : { duration: 0 }}
                style={{ position: "absolute" }}
                className="text-3xl lg:text-5xl font-black uppercase tracking-tighter text-gray-400 font-mono select-none z-20"
              >
                {item.text}
              </motion.div>
            );
          })}
        </div>
        <div className="absolute bottom-10 text-[11px] font-mono opacity-20 uppercase tracking-[0.5em] z-20">// Algorithmic_Distortion_Audit_v2.0</div>
      </section>

      <section className="relative w-full bg-white border-t-2 border-dashed border-gray-300" style={{ height: 'calc(100vh + 150px)' }}>
        <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-start bg-white pt-24">
          <motion.h2 className="text-[12vw] font-black leading-[0.8] uppercase tracking-tighter text-black text-center shrink-0 text-balance">
            SEARCHABLE FOR HIM,<br />404 FOR HER
          </motion.h2>
          <div className="w-full flex-1 flex flex-col items-center relative z-20 bg-white pt-32" style={{ transform: `translateY(-${Math.min(imageOffset, 300)}px)`, transition: 'transform 0.1s ease-out' }}>
            <div className="relative w-[70%] md:w-[45%] max-w-3xl aspect-[16/9] flex justify-center bg-white shadow-2xl">
              {carouselImages.map((src, idx) => (
                <motion.img 
                  key={src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: currentSlideIndex === idx ? 1 : 0 }}
                  transition={{ duration: 0.8 }}
                  src={src} 
                  className="absolute top-0 left-0 w-full h-full object-contain z-10" 
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-white border-t-2 border-dashed border-gray-300 z-30" style={{ height: 'calc(100vh + 800px)' }}>
        <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-start bg-white pt-24">
          <motion.h2 className="text-[12vw] font-black leading-[0.8] uppercase tracking-tighter text-black text-center shrink-0 text-balance">
            Most algorithmic<br />censorship is silent<br />and isolated
          </motion.h2>
          <div className="w-full flex-1 flex flex-col items-center relative z-20 bg-white pt-32 pb-64" style={{ transform: `translateY(-${Math.min(imageOffset2, 400)}px)`, transition: 'transform 0.1s ease-out' }}>
            <img src={silentImg} alt="Silent censorship" className="w-1/2 h-auto object-contain relative z-10" />
          </div>
        </div>
      </section>

      {/* SECTION 5 */}
      <section className="relative w-full bg-white border-t-2 border-dashed border-gray-300 z-40 pb-10">
        <div className="sticky top-0 w-full pt-24 z-10 pb-12 bg-white">
          <motion.h2 className="text-[12vw] font-black leading-[0.8] uppercase tracking-tighter text-black text-center text-balance">
            Join us by simply<br />using the hashtag<br /><span className="text-[#FF3B30]">#404Zone</span>
          </motion.h2>
        </div>
        <div className="relative w-full flex flex-col items-center z-20 bg-white">
          <motion.img 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            src={joinImg} alt="Join #404Zone" className="w-[80%] md:w-[45%] max-w-[1400px] h-auto object-contain relative z-10 px-4" 
          />
        </div>
      </section>

      {/* SECTION 6 */}
      <section className="relative z-50 min-h-screen w-full flex flex-col items-center justify-center bg-black text-white p-8 md:p-20 text-center mt-0 overflow-hidden">
          <motion.h3 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[7vw] md:text-[8vw] font-black mb-12 leading-none tracking-tighter text-balance"
          >
            If it gets <span className="text-[#FF3B30]">censored,</span><br />it becomes <span className="text-[#FF3B30]">evidence</span>
          </motion.h3>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="max-w-4xl space-y-8 font-mono text-sm md:text-lg leading-relaxed text-neutral-400 font-normal text-center text-pretty"
          >
            <p>
              We launched <Pulse404White /> — a collective campaign exposing the silent censorship of women’s health online.
            </p>
            <p>
              Everyday users, creators, and women-led brands can participate by posting about women’s health and tagging <Pulse404White />.
            </p>
            <p>
              Posts tagged <Pulse404White /> are tracked and recorded in the archive.
            </p>
            <p>
              If they are restricted or removed,<br />they become evidence.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-20 flex flex-col md:flex-row gap-6 items-center"
          >
            <button 
              onClick={() => setLocation("/archive")} 
              className="border-2 border-white px-10 py-5 text-xl font-bold font-mono hover:bg-[#FF3B30] hover:border-[#FF3B30] transition-all"
            >
              VIEW ARCHIVE
            </button>
            <button 
              onClick={() => setLocation("/share")} 
              className="group flex items-center justify-between min-w-[320px] border-2 border-white p-5 text-xl font-bold font-mono bg-white text-black hover:bg-[#FF3B30] hover:border-[#FF3B30] hover:text-white transition-all"
            >
              <span>SHARE YOUR EXPERIENCE</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>
      </section>
    </div>
  );
}