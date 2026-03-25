import React from 'react';
import { motion } from 'motion/react';
import { Activity, Zap, Shield, Cpu, BarChart3, Globe } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

export const MetricsHUD = () => {
  const metrics = [
    { 
      label: "LATENCIA_RESPUESTA", 
      value: "< 0.4s", 
      icon: <Zap className="w-4 h-4" />, 
      color: "text-brand",
      desc: "Calificación instantánea de leads vía IA.",
      size: "md:col-span-2"
    },
    { 
      label: "EFICIENCIA_AGENTE", 
      value: "98.2%", 
      icon: <Activity className="w-4 h-4" />, 
      color: "text-green-500",
      desc: "Precisión en la detección de intención de compra.",
      size: "md:col-span-1"
    },
    { 
      label: "SEGURIDAD_DATOS", 
      value: "AES-256", 
      icon: <Shield className="w-4 h-4" />, 
      color: "text-blue-500",
      desc: "Encriptación de grado militar en cada conversación.",
      size: "md:col-span-1"
    },
    { 
      label: "CAPACIDAD_PROCESO", 
      value: "∞ LEADS", 
      icon: <Cpu className="w-4 h-4" />, 
      color: "text-purple-500",
      desc: "Escalabilidad ilimitada sin contratar personal.",
      size: "md:col-span-2"
    }
  ];

  return (
    <section className="py-24 px-6 bg-zinc-950 relative overflow-hidden">
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
              SISTEMA_METRICS
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight"
            >
              RENDIMIENTO<br />
              <span className="text-zinc-500">EN TIEMPO REAL.</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-zinc-400 max-w-sm font-sans leading-relaxed"
          >
            Nuestra infraestructura técnica garantiza que ninguna oportunidad se pierda por falta de atención.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metrics.map((metric, i) => (
            <SpotlightCard key={i} delay={i * 0.1} className={`p-8 ${metric.size}`}>
              <div className="flex flex-col h-full justify-between">
                <div className="flex items-center justify-between mb-8">
                  <div className={`w-10 h-10 rounded-sm bg-zinc-900 border border-white/10 flex items-center justify-center ${metric.color}`}>
                    {metric.icon}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
                    {metric.label}
                  </div>
                </div>
                
                <div>
                  <div className={`text-4xl md:text-5xl font-display font-bold mb-2 tracking-tighter ${metric.color}`}>
                    {metric.value}
                  </div>
                  <p className="text-sm text-zinc-400 font-sans leading-relaxed max-w-xs">
                    {metric.desc}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};
