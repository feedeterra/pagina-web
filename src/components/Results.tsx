import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Users, MessageSquare, Calendar } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

const clientResults = [
  {
    name: "DR. JAVIER GOMEZ",
    industry: "ESTÉTICA AVANZADA",
    metric: "450+",
    label: "LEADS CALIFICADOS/MES",
    growth: "+210%",
    icon: <Users className="w-5 h-5" />,
    color: "from-brand/20 to-transparent"
  },
  {
    name: "SOLUCIONES TECH",
    industry: "SOFTWARE B2B",
    metric: "120",
    label: "REUNIONES AGENDADAS",
    growth: "+85%",
    icon: <Calendar className="w-5 h-5" />,
    color: "from-blue-500/10 to-transparent"
  },
  {
    name: "IMMOBILIARIA ELITE",
    industry: "BIENES RAÍCES",
    metric: "12",
    label: "CIERRES AUTOMATIZADOS",
    growth: "+45%",
    icon: <TrendingUp className="w-5 h-5" />,
    color: "from-emerald-500/10 to-transparent"
  }
];

export const Results = () => {
  return (
    <section className="py-24 px-6 bg-zinc-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-brand font-mono text-xs tracking-widest mb-4 flex items-center gap-2"
            >
              <div className="w-8 h-[1px] bg-brand" />
              RESULTADOS_SISTEMA
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight"
            >
              NUESTROS CLIENTES<br />
              <span className="text-zinc-500">NO ESPERAN, CIERRAN.</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-zinc-400 max-w-sm font-sans leading-relaxed"
          >
            Sistemas instalados que generan flujo constante de oportunidades calificadas sin intervención manual.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {clientResults.map((result, i) => (
            <SpotlightCard key={i} delay={i * 0.1} className="p-8 group">
              <div className={`absolute inset-0 bg-gradient-to-br ${result.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-10 h-10 rounded-sm bg-zinc-900 border border-white/10 flex items-center justify-center text-brand group-hover:border-brand/50 transition-colors">
                    {result.icon}
                  </div>
                  <div className="text-[10px] font-mono text-green-500 bg-green-500/10 px-2 py-1 rounded-sm border border-green-500/20">
                    {result.growth}
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="text-4xl font-display font-bold text-white mb-1 tracking-tighter">
                    {result.metric}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
                    {result.label}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <div className="text-sm font-bold text-zinc-200 tracking-tight">
                    {result.name}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase mt-1">
                    {result.industry}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};
