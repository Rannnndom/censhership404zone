import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Upload, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function Share() {
  const [username, setUsername] = useState("");
  const [platform, setPlatform] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  // 控制自定义下拉框的开启状态
  const [platformOpen, setPlatformOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const handleBack = () => {
    window.history.back();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Experience shared successfully! We will contact you via email after verification.");
    window.history.back();
  };

  const Required = () => <span className="text-[#FF4747] ml-1">*</span>;

  // 自定义 Select 组件（内部使用以确保风格统一）
  const CustomSelect = ({ 
    label, 
    value, 
    options, 
    isOpen, 
    setIsOpen, 
    onSelect, 
    placeholder,
    isRequired = false
  }: any) => (
    <div className="space-y-3 relative">
      <label className="block text-sm font-bold uppercase tracking-widest opacity-60">
        {label}{isRequired && <Required />}
      </label>
      <div 
        className="w-full border-b-2 border-black py-3 text-xl font-bold font-mono cursor-pointer flex justify-between items-center transition-colors hover:border-[#FF4747]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-black" : "opacity-30"}>
          {value || placeholder}
        </span>
        <ChevronDown size={24} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#F4F4F4] border-2 border-black z-50 mt-1 animate-in fade-in slide-in-from-top-1 duration-150">
          {options.map((opt: string) => (
            <div 
              key={opt}
              className="p-4 border-b border-black/10 last:border-0 hover:bg-black hover:text-white cursor-pointer transition-colors uppercase font-bold"
              onClick={() => {
                onSelect(opt);
                setIsOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-mono text-black selection:bg-black selection:text-white flex flex-col relative pb-20">
      <header className="w-full px-8 py-6 flex items-center shrink-0 relative z-10 font-mono">
        <button onClick={handleBack} className="flex items-center gap-2 hover:opacity-50 transition-opacity">
          <ArrowLeft size={24} />
          <span className="font-bold tracking-tight uppercase">BACK</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center p-8 z-10 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl"
        >
          <h1 className="text-3xl md:text-[3.5vw] font-black uppercase mb-6 tracking-tighter text-center leading-none whitespace-nowrap">
            Share Your Experience
          </h1>

          <div className="mb-16 text-center space-y-4 font-normal">
            <p className="text-sm md:text-base leading-relaxed opacity-70 text-center">
              In addition to using <span className="font-bold text-black">#404zone</span> when posting women’s health content on major platforms, you can manually log your censored posts here. 
            </p>
            <p className="text-sm md:text-base leading-relaxed opacity-70 text-center">
              Once verified, your experience will be archived in our database, and a voucher for women’s products will be sent to your email address as a token of our support.
            </p>
          </div>

          <motion.form 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit} 
            className="space-y-10 flex flex-col"
          >

            {/* 1. Platform 置于前面，使用自定义风格 */}
            <CustomSelect 
              label="Platform"
              value={platform}
              options={["Instagram", "TikTok", "Facebook", "X", "YouTube", "Other"]}
              isOpen={platformOpen}
              setIsOpen={setPlatformOpen}
              onSelect={setPlatform}
              placeholder="SELECT PLATFORM..."
              isRequired={true}
            />

            {/* 2. Username 置于其后 */}
            <div className="space-y-3">
              <label className="block text-sm font-bold uppercase tracking-widest opacity-60">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border-b-2 border-black py-3 text-xl font-bold font-mono outline-none placeholder:opacity-30 focus:border-[#FF4747] transition-colors bg-transparent"
                placeholder="@YOURHANDLE"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-bold uppercase tracking-widest opacity-60">Subject<Required /></label>
              <input 
                type="text" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full border-b-2 border-black py-3 text-xl font-bold font-mono outline-none placeholder:opacity-30 focus:border-[#FF4747] transition-colors bg-transparent"
                placeholder="E.G. BREASTFEEDING, ANATOMY..."
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-bold uppercase tracking-widest opacity-60">Email Address (For Vouchers)<Required /></label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border-b-2 border-black py-3 text-xl font-bold font-mono outline-none placeholder:opacity-30 focus:border-[#FF4747] transition-colors bg-transparent"
                placeholder="YOUR@EMAIL.COM"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-bold uppercase tracking-widest opacity-60">Original Post Link<Required /></label>
              <input 
                type="url" 
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
                className="w-full border-b-2 border-black py-3 text-xl font-bold font-mono outline-none placeholder:opacity-30 focus:border-[#FF4747] transition-colors bg-transparent"
                placeholder="HTTPS://"
              />
            </div>

            {/* Status 使用自定义风格 */}
            <CustomSelect 
              label="Current Status"
              value={status}
              options={["REMOVED", "SUPPRESSED", "REJECTED", "ACCOUNT AT RISK", "OTHER"]}
              isOpen={statusOpen}
              setIsOpen={setStatusOpen}
              onSelect={setStatus}
              placeholder="SELECT STATUS..."
              isRequired={true}
            />

            <div className="space-y-3">
              <label className="block text-sm font-bold uppercase tracking-widest opacity-60">Detailed Description<Required /></label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="w-full border-2 border-black p-4 text-lg font-mono outline-none placeholder:opacity-30 focus:border-[#FF4747] transition-colors bg-transparent resize-none mt-2 font-bold"
                placeholder="DESCRIBE WHAT HAPPENED..."
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-bold uppercase tracking-widest opacity-60">Image / Video Evidence<Required /></label>
              <div className="w-full border-2 border-dashed border-black p-12 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors mt-2 relative group">
                <Upload size={32} className="group-hover:-translate-y-1 transition-transform" />
                <span className="text-sm font-bold uppercase tracking-widest text-center">Click to upload or drag & drop</span>
                <input type="file" accept="image/*,video/*" className="hidden" id="file-upload" required />
                <label htmlFor="file-upload" className="absolute inset-0 cursor-pointer"></label>
              </div>
            </div>

            <div className="flex items-start gap-4 pt-4 group cursor-pointer" onClick={() => setIsPrivate(!isPrivate)}>
              <div className={`
                w-6 h-6 border-2 border-black shrink-0 transition-colors flex items-center justify-center
                ${isPrivate ? 'bg-black' : 'bg-transparent group-hover:border-[#FF4747]'}
              `}>
                {isPrivate && <div className="w-3 h-3 bg-[#FF4747]" />} 
              </div>
              <label className="text-sm font-bold uppercase tracking-tight cursor-pointer select-none leading-tight opacity-80 group-hover:opacity-100">
                I do not wish to make this post information public
              </label>
            </div>

            <button type="submit" className="w-full bg-black text-white p-6 text-2xl font-bold uppercase tracking-widest hover:bg-[#FF4747] transition-colors mt-8">
              SUBMIT REPORT
            </button>
          </motion.form>
        </motion.div>
      </main>
    </div>
  );
}