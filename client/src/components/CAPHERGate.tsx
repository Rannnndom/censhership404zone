import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- 背景乱码关键词配置 ---
const KEYWORDS = ["CensHership", "404", "Anatomical", "Mastectomy", "Algorithm", "Health", "Systemic", "Hormonal", "Unfiltered", "Bias"];

// --- 验证码图片库 ---
const CAPTCHA_POOL = [
  { img: "/m_hymen.png", value: "HYMEN" },
  { img: "/m_labia.png", value: "LABIA" },
  { img: "/m_vulva.png", value: "VULVA" },
  { img: "/m_clitoris.png", value: "CLITORIS" },
  { img: "/m_pubic.png", value: "PUBIC" },
  { img: "/m_cervix.png", value: "CERVIX" },
  { img: "/m_vagina.png", value: "VAGINA" }
];

// --- 动画变体：颤抖特效 ---
const shakeVariants = {
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 },
  },
};

const AsciiBackground = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    const gen = () => {
      let n = "";
      for (let i = 0; i < 4000; i++) {
        if (Math.random() < 0.015) n += ` ${KEYWORDS[Math.floor(Math.random() * KEYWORDS.length)]} `;
        else n += Math.random() > 0.6 ? " " : ". ' ` , ^ "[Math.floor(Math.random() * 8)];
      }
      setContent(n);
    };
    gen();
    const inv = setInterval(gen, 250);
    return () => clearInterval(inv);
  }, []);
  return <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none opacity-[0.1] break-all text-[16px] leading-[1.3] text-black tracking-widest bg-white font-mono">{content}</div>;
};

const SkipButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 z-40 px-6 py-3 text-[14px] font-mono font-medium uppercase tracking-wider border-2 border-neutral-300 text-neutral-400 hover:border-black hover:text-black transition-all duration-200"
    >
      Skip
    </button>
  );
};

export default function CAPTHERGate({ onVerified }: { onVerified: () => void }) {
  const [step, setStep] = useState(1);
  const [sliderValue, setSliderValue] = useState(0);
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [countdown, setCountdown] = useState(8); 
  const [isJumping, setIsJumping] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [shakeCaptchaKey, setShakeCaptchaKey] = useState(0);
  const [shakeGridKey, setShakeGridKey] = useState(0);

  const currentCaptcha = useMemo(() => {
    return CAPTCHA_POOL[Math.floor(Math.random() * CAPTCHA_POOL.length)];
  }, [refreshKey, step === 3]);

  const WELCOME_IMG = "/welcome_title.png"; 
  const LOGO_IMG = "/recapher_logo.png";
  const PUZZLE_BASE = "/puzzle_base.jpg";
  const PUZZLE_PIECE = "/puzzle_piece.png";

  const handleCaptchaSubmit = () => {
    if (inputValue.trim().toUpperCase() === currentCaptcha.value) {
      setStep(4);
    } else {
      setInputValue("");
      setShakeCaptchaKey(prev => prev + 1);
    }
  };

  const handleGridSubmit = () => {
    if (selectedImages.length === 5) {
      setStep(5);
    } else {
      setShakeGridKey(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (step === 5 && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (step === 5 && countdown === 0) {
      onVerified();
    }
  }, [step, countdown, onVerified]);

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center pt-24 overflow-y-auto overflow-x-hidden font-mono text-black">
      <SkipButton onClick={onVerified} />

      <style>{`
        .cta-button:hover { background-color: #FF4747 !important; }
      `}</style>

      <AsciiBackground />

      <div className="relative z-10 w-full max-w-[860px] px-8 flex flex-col items-start mb-20">
        <img src={WELCOME_IMG} alt="Welcome" className="h-10 mb-8 object-contain block" />

        <div className="w-full border-[1.5px] border-black bg-white p-14 min-h-[580px] relative shadow-none">
          <AnimatePresence mode="wait">

            {/* STEP 1: CHECKBOX */}
            {step === 1 && (
              <motion.div key="s1" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex flex-col items-start w-full">
                <h2 className="text-4xl font-display font-normal mb-10 text-black leading-none uppercase">Verify your Humanity (1/4)</h2>
                <p className="text-[17px] mb-12 max-w-[620px] text-neutral-800 leading-relaxed text-left font-mono font-normal">
                  Social media algorithms are cutting off access to vital women's health knowledge. To enter, we require your "Human Consensus" to assist in an ongoing algorithmic stress test.
                </p>
                <div className="w-full border-[1px] border-[#EEEEEE] p-10 flex items-center justify-between bg-[#FAFAFA] mt-4 mb-8">
                  <div className="flex items-center gap-6">
                    <input type="checkbox" onChange={() => setTimeout(() => setStep(2), 500)} className="w-8 h-8 border-[2px] border-black rounded-none cursor-pointer accent-black" />
                    <span className="text-black text-[19px] font-mono font-normal">I'm allowed to speak about my body</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <img src={LOGO_IMG} alt="reCAPTHER" className="h-14 object-contain opacity-80" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: PUZZLE */}
            {step === 2 && (
              <motion.div key="s2" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex flex-col items-start w-full">
                <h2 className="text-4xl font-display font-normal mb-10 text-black leading-none uppercase">Verify your Humanity (2/4)</h2>
                <div className="text-[17px] mb-8 font-normal font-mono leading-relaxed">
                  <p>Put the image back together.</p>
                  <p>Often normal moments can be mistaken for explicit content.</p>
                </div>
                <div className="relative w-full max-w-[540px] aspect-[16/7] border-[1.5px] border-black overflow-hidden mb-12 bg-neutral-50">
                   <img src={PUZZLE_BASE} className="w-full h-full object-cover grayscale opacity-30" alt="Base" />
                   <motion.div 
                    style={{ left: `${sliderValue * 0.75}%`, transform: 'scale(0.85) translateY(-30px) translateX(-18px)' }} 
                    className="absolute top-0 h-full aspect-square flex items-center justify-center pointer-events-none"
                   >
                     <img src={PUZZLE_PIECE} className="h-[80%] w-auto object-contain drop-shadow-xl" alt="Piece" />
                   </motion.div>
                </div>
                <div className="w-full max-w-[540px] h-12 bg-[#F0F0F0] border-black border-[1px] relative flex items-center group">
                  <input type="range" min="0" max="100" value={sliderValue} 
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setSliderValue(val);
                      if (val > 55 && !isJumping) {
                        setIsJumping(true);
                        setTimeout(() => setStep(3), 600);
                      }
                    }}
                    className="w-full h-full opacity-0 absolute z-20 cursor-pointer" />
                  <div style={{ left: `${sliderValue}%`, backgroundColor: sliderValue > 15 ? '#FF4747' : 'black' }} className="absolute h-full w-12 flex items-center justify-center text-white pointer-events-none transition-all">
                    <span className="text-3xl font-bold font-mono">→</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: CAPTCHA */}
            {step === 3 && (
              <motion.div key="s3" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex flex-col items-start w-full text-left">
                <h2 className="text-4xl font-display font-normal mb-10 text-black leading-none uppercase">Verify your Humanity (3/4)</h2>
                <div className="font-mono text-[17px] font-normal mb-12 text-black leading-relaxed text-left">Some words trigger the algorithm. Type the one it tries to hide.</div>

                <motion.div 
                  key={shakeCaptchaKey}
                  animate={shakeCaptchaKey ? "shake" : ""}
                  variants={shakeVariants}
                  className="w-full"
                >
                  <div className="flex flex-row items-center gap-6 mb-16 w-full">
                    <div className="flex items-center justify-center h-40 w-auto self-start">
                      <img 
                        src={currentCaptcha.img} 
                        className="h-full w-auto object-contain select-none contrast-125" 
                        alt="captcha" 
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={() => setRefreshKey(k => k + 1)}
                        className="bg-black text-white p-2 cta-button transition-all font-mono font-bold text-lg flex items-center justify-center w-12 h-12"
                      >
                        <svg t="1773578415649" className="w-5 h-5" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5769"><path d="M512 192a298.24 298.24 0 0 0-245.162667 128 42.666667 42.666667 0 1 1-69.973333-48.810667 384.042667 384.042667 0 0 1 697.173333 180.48l36.608-34.645333a42.666667 42.666667 0 0 1 58.709334 61.952l-112.64 106.666667a42.666667 42.666667 0 0 1-71.253334-38.912A298.666667 298.666667 0 0 0 512 192z m0.170667 640a298.24 298.24 0 0 0 245.162666-128 42.666667 42.666667 0 1 1 69.973334 48.810667 384.042667 384.042667 0 0 1-697.173334-180.48l-36.650666 34.645333a42.666667 42.666667 0 0 1-58.666667-61.952l112.64-106.666667a42.666667 42.666667 0 0 1 71.253333 38.912 298.666667 298.666667 0 0 0 293.418667 354.730667z" fill="white" p-id="5770"></path></svg>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full max-w-[540px] mb-8">
                    <input 
                      type="text" 
                      value={inputValue} 
                      onChange={(e) => setInputValue(e.target.value.toUpperCase())} 
                      onKeyDown={(e) => e.key === 'Enter' && handleCaptchaSubmit()}
                      className="font-mono font-bold text-[20px] border-b-[2px] border-black px-2 py-3 flex-grow outline-none uppercase bg-transparent placeholder:opacity-40 focus:border-[#FF4747] transition-colors" 
                      placeholder="INPUT:" 
                    />
                    <button onClick={handleCaptchaSubmit} className="font-mono font-bold text-[18px] bg-black text-white px-12 py-3 cta-button transition-all uppercase">ENTER</button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* STEP 4: GRID */}
            {step === 4 && (
              <motion.div key="s4" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex flex-col items-start w-full text-left">
                <h2 className="text-4xl font-display font-normal mb-14 text-black uppercase">Verify your Humanity (4/4)</h2>
                <div className="mb-14">
                  <div className="font-mono font-normal text-[18px] mb-2">Select all images that</div>
                  {/* 修改：字号调小至 28px，ml 调小至 ml-1 */}
                  <div className="text-[28px] font-bold leading-[1.1] font-mono uppercase tracking-tighter">
                    SHOULD NOT BE REMOVED <span className="text-[18px] font-normal normal-case text-black ml-1 font-mono">on social media</span>
                  </div>
                </div>

                <motion.div
                  key={shakeGridKey}
                  animate={shakeGridKey ? "shake" : ""}
                  variants={shakeVariants}
                  className="w-full flex flex-col"
                >
                  <div className="flex flex-row items-center gap-2 mb-16 w-full">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} onClick={() => setSelectedImages(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i])} 
                        className={`flex-1 aspect-square border-[3px] cursor-pointer transition-all duration-300 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 ${selectedImages.includes(i) ? 'border-black !grayscale-0 !opacity-100' : 'border-transparent'}`}>
                        <img src={`/verify_image_${i}.jpg`} className="w-full h-full object-cover" alt="sample" />
                      </div>
                    ))}
                  </div>
                  <div className="w-full flex justify-end gap-x-4 items-center">
                    {shakeGridKey > 0 && selectedImages.length < 5 && (
                        <div className="font-mono text-[12px] text-[#FF4747] font-bold uppercase tracking-wider">
                            // ERROR: You must select ALL clinical truth (5/5).
                        </div>
                    )}
                    <button onClick={handleGridSubmit} className="font-mono font-bold text-[16px] bg-black text-white px-10 py-3 cta-button transition-all min-w-[160px] uppercase">Verify</button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* STEP 5: FINAL */}
            {step === 5 && (
              <motion.div key="s5" initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col items-center w-full text-center py-6">
                <h2 className="text-4xl font-display font-normal mb-6 text-black uppercase text-center">HUMANITY VERIFIED</h2>
                  <div className="w-16 h-[2px] bg-black mb-10"></div>
                <div className="text-[17px] mb-12 max-w-[650px] space-y-4 leading-relaxed tracking-normal font-mono font-normal text-center">
                  <p className="font-normal text-[19px]">You just saw what the algorithm was programmed to ignore.</p>
                  <p>You checked the boxes they try to uncheck. You reassembled the clinical truth and decoded the language they try to censor.</p>
                  <p>welcome to the 4♀️4 Zone.</p>
                </div>
                <button onClick={onVerified} className="font-mono text-[20px] font-bold bg-black text-white px-16 py-5 uppercase tracking-widest cta-button transition-all shadow-2xl min-w-[360px]">
                  Enter 404 Zone in {countdown}
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
