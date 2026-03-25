import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Activity, ArrowRight } from 'lucide-react';
import { NeuralDashboard } from './NeuralDashboard';

export const Hero = ({ isMobile = false }) => {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 800], [0, 150]);
  const opacityText = useTransform(scrollY, [0, 600], [1, 0]);
  const yDashboard = useTransform(scrollY, [0, 800], [0, 250]);

  const phrases = [
    { line1: "DESCARTAMOS", line2: "A LOS CURIOSOS." },
    { line1: "ATRAEMOS", line2: "COMPRADORES." },
    { line1: "BLINDAMOS A", line2: "TU EQUIPO." },
    { line1: "AUTOMATIZAMOS", line2: "EL PROCESO." }
  ];
  const [rotorIndex, setRotorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotorIndex((prev) => (prev + 1) % phrases.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[100vh] flex flex-col justify-center px-6 overflow-hidden bg-zinc-950">
      {/* Background Animation / Video Placeholder */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Atmospheric Particles / Glows */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -40, 0],
            y: [0, 60, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand/5 rounded-full blur-[100px]" 
        />
        
        {/* Moving Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        
        {/* Scanline Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30 z-10" />
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left: Text Content */}
          <motion.div style={{ y: yText, opacity: opacityText }} className="text-left relative z-20 flex flex-col items-start">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-brand/10 border border-brand/20 text-brand text-[10px] font-mono mb-8 backdrop-blur-sm tracking-widest"
            >
              <Activity className="w-3 h-3" />
              SISTEMA DE CRECIMIENTO ACTIVO
            </motion.div>
            
            <div className="h-[120px] sm:h-[160px] md:h-[110px] lg:h-[140px] relative mb-4 sm:mb-6 perspective-[1000px] w-full">
              <AnimatePresence mode="popLayout">
                <motion.h1
                  key={rotorIndex}
                  initial={{ opacity: 0, y: 40, rotateX: -45 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -40, rotateX: 45 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="text-[2.25rem] sm:text-5xl lg:text-7xl font-display font-bold tracking-tighter leading-[0.9] text-white absolute w-full left-0"
                >
                  {phrases[rotorIndex].line1}<br />
                  <span className="text-zinc-500">{phrases[rotorIndex].line2}</span>
                </motion.h1>
              </AnimatePresence>
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-sm sm:text-base md:text-xl text-zinc-400 mb-8 sm:mb-10 max-w-md md:max-w-xl font-sans leading-relaxed tracking-tight"
            >
              Captación y calificación 24/7. Instalamos el sistema técnico para que tu equipo solo se enfoque en cerrar tratos.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-start gap-6 w-full sm:w-auto"
            >
              <a href="#calendario" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-brand text-zinc-950 px-8 py-4 rounded-sm font-bold text-base hover:bg-brand-soft transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:-translate-y-1">
                AGENDAR AUDITORÍA
                <ArrowRight className="w-4 h-4" />
              </a>
              <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-zinc-500">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                SISTEMAS OPERATIVOS
              </div>
            </motion.div>
          </motion.div>

          {/* Right: 3D Floating Composition */}
          <motion.div 
            style={{ y: yDashboard, opacity: opacityText }} 
            className="relative w-full h-[300px] sm:h-[400px] lg:h-[600px] flex items-center justify-center [perspective:2000px] mt-12 lg:mt-0"
          >
            <motion.div
              animate={{ 
                y: [-10, 10, -10],
                rotateY: [-15, -10, -15],
                rotateX: [5, 8, 5]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full flex items-center justify-center scale-75 sm:scale-90 lg:scale-100"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                initial={{ opacity: 0, rotateY: -25, rotateX: 15, z: -100 }}
                animate={{ opacity: 1, rotateY: -15, rotateX: 5, z: 0 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                className="absolute w-[120%] sm:w-full max-w-2xl z-10 shadow-2xl shadow-brand/20"
              >
                <div className="absolute -inset-1 bg-gradient-to-tr from-brand/20 to-transparent rounded-sm blur-xl opacity-50" />
                <NeuralDashboard />
              </motion.div>
              
              {/* Decorative Elements for 3D depth */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-[140%] h-[140%] border border-brand/5 rounded-full pointer-events-none"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute w-[120%] h-[120%] border border-white/5 rounded-full pointer-events-none"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-mono text-zinc-600 tracking-[0.2em] uppercase">SCROLL_DOWN</span>
          <motion.div 
            animate={{ height: [20, 60, 20] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] bg-gradient-to-b from-brand to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
};
