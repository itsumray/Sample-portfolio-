import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Github, Instagram, Twitter, ExternalLink, Zap, ChevronRight } from 'lucide-react';

// --- Easter Egg Logic ---
// 隠しコマンド「LN4」を入力するとサイトがオレンジ色に光る
const useEasterEgg = () => {
  const [input, setInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      const nextInput = (input + e.key).slice(-3);
      setInput(nextInput);
      if (nextInput.toLowerCase() === 'ln4') setUnlocked(true);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [input]);

  return unlocked;
};

export default function Portfolio() {
  const isUnlocked = useEasterEgg();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${isUnlocked ? 'bg-orange-600' : 'bg-black'} text-white selection:bg-orange-500`}>
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-orange-500 z-50 origin-left" style={{ scaleX }} />

      {/* Navigation */}
      <nav className="fixed w-full p-6 flex justify-between items-center z-40 mix-blend-difference">
        <motion.span 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-2xl font-black tracking-tighter"
        >
          {isUnlocked ? 'QUADRANT MODE' : 'USER_NAME'}
        </motion.span>
        <div className="space-x-8 text-sm font-bold tracking-widest uppercase hidden md:flex">
          {['Works', 'About', 'Contact'].map((item) => (
            <motion.a key={item} href={`#${item.toLowerCase()}`} whileHover={{ y: -2, color: '#f97316' }}>
              {item}
            </motion.a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center z-10"
        >
          <h1 className="text-[15vw] leading-none font-black italic tracking-tighter m-0 uppercase">
            Full <br /> <span className="text-orange-500 text-outline">Throttle</span>
          </h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-gray-400 font-mono tracking-widest uppercase"
          >
            Digital Creator / Keyboard Enthusiast / Speed Runner
          </motion.p>
        </motion.div>

        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500 rounded-full filter blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-[100px]" />
        </div>
      </section>

      {/* Works - Horizontal Scroll Simulation or Grid */}
      <section id="works" className="py-32 px-6 max-w-7xl mx-auto">
        <motion.h2 
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          className="text-6xl font-black italic mb-20 uppercase"
        >
          Selected Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[1, 2, 3, 4].map((i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 0.98 }}
              className="group relative aspect-video bg-neutral-900 overflow-hidden rounded-sm border border-neutral-800"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6">
                <p className="text-orange-500 font-mono text-sm mb-2">00{i} / PROJECT</p>
                <h3 className="text-3xl font-bold uppercase italic">Cyber Speed {i}</h3>
              </div>
              <motion.div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={24} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Footer */}
      <footer id="contact" className="py-20 border-t border-neutral-900 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="space-y-6">
            <h2 className="text-8xl font-black italic uppercase leading-none">Let's <br /> Race.</h2>
            <div className="flex gap-6">
              <Github className="cursor-pointer hover:text-orange-500 transition-colors" />
              <Instagram className="cursor-pointer hover:text-orange-500 transition-colors" />
              <Twitter className="cursor-pointer hover:text-orange-500 transition-colors" />
            </div>
          </div>
          
          <div className="text-right font-mono text-sm text-neutral-500 space-y-2">
            <p>© 2026 USER_NAME. NO LIMITS.</p>
            <p>DESIGNED FOR THE BOLD.</p>
            {isUnlocked && <p className="text-orange-500 animate-bounce">EASTER EGG ACTIVE: SPEED+100</p>}
          </div>
        </div>
      </footer>
    </div>
  );
}
