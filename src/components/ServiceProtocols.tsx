import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Zap, Shield, TrendingUp, ArrowRight, Check } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

const protocols = [
  {
    title: "PROTOCOLO_CAPTACIÓN",
    desc: "Sistemas de anuncios de alta conversión que atraen solo a tu cliente ideal.",
    icon: <TrendingUp className="w-5 h-5" />,
    features: ["Audiencias de Intención", "Creativos de Alto Impacto", "Optimización Diaria"],
    highlight: false
  },
  {
    title: "PROTOCOLO_CALIFICACIÓN",
    desc: "Agentes de IA que filtran leads en segundos, descartando curiosos.",
    icon: <Zap className="w-5 h-5" />,
    features: ["Respuesta < 1s", "Calificación Técnica", "Sincronización CRM"],
    highlight: true
  },
  {
    title: "PROTOCOLO_CIERRE",
    desc: "Automatización de agendamiento y seguimiento para maximizar conversiones.",
    icon: <Shield className="w-5 h-5" />,
    features: ["Agendamiento Directo", "Recordatorios SMS/WA", "Reportes de Cierre"],
    highlight: false
  }
];

export const ServiceProtocols = () => {
  return (
    <section className="py-24 px-6 bg-zinc-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-brand font-mono text-xs tracking-widest mb-4 flex items-center gap-2"
            >
              <div className="w-8 h-[1px] bg-brand" />
              SISTEMA_PROTOCOLS
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight"
            >
              SISTEMAS<br />
              <span className="text-zinc-500">DE ALTO IMPACTO.</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-zinc-400 max-w-sm font-sans leading-relaxed"
          >
            Nuestros protocolos están diseñados para ser instalados y escalar sin límites operativos.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {protocols.map((protocol, i) => (
            <SpotlightCard 
              key={i} 
              delay={i * 0.1} 
              className={`p-10 flex flex-col h-full ${protocol.highlight ? 'border-brand/30 bg-brand/5' : ''}`}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-12 h-12 rounded-sm flex items-center justify-center border ${protocol.highlight ? 'bg-brand text-zinc-950 border-brand' : 'bg-zinc-900 text-brand border-white/10'}`}>
                  {protocol.icon}
                </div>
                <div className="text-xs font-mono text-zinc-500 tracking-widest uppercase">
                  {protocol.title}
                </div>
              </div>
              
              <p className="text-lg text-white font-display font-medium mb-8 leading-snug">
                {protocol.desc}
              </p>

              <ul className="space-y-4 mb-10 flex-1">
                {protocol.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-zinc-400 font-sans">
                    <Check className={`w-4 h-4 ${protocol.highlight ? 'text-brand' : 'text-zinc-600'}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-sm font-bold text-sm transition-all flex items-center justify-center gap-2 ${protocol.highlight ? 'bg-brand text-zinc-950 hover:bg-brand-soft' : 'bg-zinc-900 text-white border border-white/10 hover:border-brand/50'}`}>
                SABER MÁS
                <ArrowRight className="w-4 h-4" />
              </button>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};
