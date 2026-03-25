import React from 'react';
import { Terminal } from 'lucide-react';

export const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="font-display font-bold text-xl tracking-tight flex items-center gap-2 text-white">
        <Terminal className="w-5 h-5 text-brand" />
        CACHE_AGENCY <span className="text-zinc-500 font-mono text-sm font-normal ml-2 hidden md:inline">// SISTEMAS DE VENTAS CONVERSACIONALES</span>
      </div>
      <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 bg-zinc-900/50 px-3 py-1.5 rounded-full border border-white/5">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="hidden sm:inline">ESTADO DEL SISTEMA: </span>ÓPTIMO
      </div>
    </div>
  </header>
);
