import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const fullLogs = [
  "[SYSTEM] Iniciando escaneo de audiencias...",
  "[API] Analizando Meta Ads API...",
  "[AI] Ajustando presupuesto en tiempo real...",
  "[WHATSAPP] Nuevo lead detectado (+54 9 11 45XX-XXXX)",
  "[AGENT] Lead calificado por Agente WhatsApp (<0.4s)",
  "[CRM] Sincronizando con Kommo CRM... OK",
  "[STATUS] CPA Real optimizado en -14%"
];

export const NeuralDashboard = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < fullLogs.length) {
        setLogs(prev => [...prev, fullLogs[currentIndex]]);
        currentIndex++;
      } else {
        setLogs([]);
        currentIndex = 0;
      }
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-zinc-950 border border-white/10 rounded-sm overflow-hidden shadow-2xl relative w-full h-full flex flex-col">
      {/* Terminal Header */}
      <div className="bg-zinc-900 border-b border-white/10 px-4 py-3 flex items-center gap-2 shrink-0">
        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
        <span className="ml-2 text-xs font-mono text-zinc-500">cache_core.exe</span>
      </div>
      
      {/* Terminal Body */}
      <div className="p-6 font-mono text-sm flex-1 overflow-y-auto relative bg-[#0a0c10] min-h-[300px]">
        {/* Scanline Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20 z-10" />
        
        <AnimatePresence>
          {logs.map((log, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`mb-3 relative z-20 ${
                log?.includes('[API]') || log?.includes('[CRM]') ? 'text-brand-soft' : 
                log?.includes('[STATUS]') ? 'text-green-400' : 
                'text-zinc-400'
              }`}
            >
              <span className="text-zinc-600 mr-3">{new Date().toISOString().split('T')[1].slice(0,8)}</span> 
              {log}
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="mt-2 text-brand animate-pulse relative z-20">_</div>
      </div>
    </div>
  );
};
