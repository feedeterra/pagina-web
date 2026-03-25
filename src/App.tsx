import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'motion/react';
import { Terminal, Activity, Database, Zap, ArrowRight, Target, MessageCircle, BarChart3, ShieldCheck, Check, TrendingUp, Users, Calendar } from 'lucide-react';

// --- SPOTLIGHT CARD COMPONENT ---
interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = "", delay = 0 }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <motion.div
      ref={divRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden border border-white/10 bg-zinc-950 transition-colors hover:border-white/20 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(249,115,22,.1), transparent 40%)`,
        }}
      />
      {children}
    </motion.div>
  );
};

// --- ANIMATED COUNTER COMPONENT ---
const AnimatedCounter = ({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Extract number from string (e.g., "+$150.000 USD" -> 150000)
  const hasNumber = /\d/.test(value);
  const numericPart = value.match(/\d+(\.\d+)?/g)?.join('') || "0";
  const target = parseFloat(numericPart.replace(/\.(?=[^.]*\.)/g, '')); // Handle potential multiple dots if they were thousand separators
  
  // Actually, let's keep it simple for our known patterns
  const cleanNumericPart = value.replace(/[^0-9.]/g, '');
  const targetValue = parseFloat(cleanNumericPart);

  const count = useMotionValue(0);
  const springValue = useSpring(count, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });
  
  const displayValue = useTransform(springValue, (latest) => {
    if (!hasNumber) return value;
    
    if (value.endsWith('x')) {
      return `${latest.toFixed(1)}x`;
    }

    const rounded = Math.floor(latest);
    const formatted = rounded.toLocaleString('de-DE'); // Using German locale for dot as thousand separator
    
    // Reconstruct the string based on common patterns
    if (value.includes('$')) return `+$${formatted} USD`;
    if (value.startsWith('+') && value.endsWith('%')) return `+${formatted}%`;
    if (value.startsWith('+')) return `+${formatted}`;
    if (value.endsWith('+')) return `${formatted}+`;
    if (value.endsWith('%')) return `${rounded}%`;
    if (value.includes('Protocolos')) return `Protocolos ${rounded}`;
    
    return formatted;
  });

  useEffect(() => {
    if (isInView && hasNumber) {
      count.set(targetValue);
    }
  }, [isInView, hasNumber, targetValue, count]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};

// --- HEADER COMPONENT ---
const Header = () => (
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

// --- NEURAL DASHBOARD COMPONENT ---
const fullLogs = [
  "[SYSTEM] Iniciando escaneo de audiencias...",
  "[API] Analizando Meta Ads API...",
  "[AI] Ajustando presupuesto en tiempo real...",
  "[WHATSAPP] Nuevo lead detectado (+54 9 11 45XX-XXXX)",
  "[AGENT] Lead calificado por Agente WhatsApp (<0.4s)",
  "[CRM] Sincronizando con Kommo CRM... OK",
  "[STATUS] CPA Real optimizado en -14%"
];

const NeuralDashboard = () => {
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
    <div className="bg-zinc-950 border border-white/10 rounded-md overflow-hidden shadow-2xl relative w-full h-full flex flex-col">
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

// --- CLIENT RESULT CARD COMPONENT ---
const ClientResultCard = ({ client, result, metric, desc, category, icon: Icon, delay = 0 }: { client: string, result: string, metric: string, desc: string, category: string, icon: any, delay?: number }) => (
  <SpotlightCard delay={delay} className="p-8 flex flex-col group flex-1">
    <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 blur-2xl group-hover:bg-brand/10 transition-colors pointer-events-none" />
    <div className="flex items-start justify-between mb-8 relative z-10">
      <div className="w-10 h-10 rounded-sm border border-brand/20 flex items-center justify-center bg-brand/5 group-hover:border-brand/40 transition-colors">
        <Icon className="w-5 h-5 text-brand" />
      </div>
      <div className="text-[10px] font-mono text-green-500 bg-green-500/10 px-2 py-1 rounded-sm border border-green-500/20">
        <AnimatedCounter value={metric} />
      </div>
    </div>
    
    <div className="mb-6 relative z-10">
      <div className="text-4xl md:text-5xl font-display font-bold text-white mb-1 tracking-tighter">
        <AnimatedCounter value={result} />
      </div>
      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">{desc}</div>
    </div>

    <div className="h-px bg-white/10 w-full mb-6 relative z-10" />

    <div className="relative z-10">
      <div className="text-lg font-display font-bold text-white uppercase tracking-tight mb-1">{client}</div>
      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{category}</div>
    </div>
  </SpotlightCard>
);

// --- RESULTS SECTION COMPONENT ---
const ResultsSection = () => {
  return (
    <section className="pt-16 pb-8 px-6 relative overflow-hidden bg-zinc-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-[2px] bg-brand" />
              <span className="text-xs font-mono text-brand uppercase tracking-[0.3em]">RESULTADOS_SISTEMA</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tighter leading-none mb-2">
              NUESTROS CLIENTES
            </h2>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-zinc-600 uppercase tracking-tighter leading-none">
              NO ESPERAN, <span className="text-brand">CIERRAN.</span>
            </h2>
          </div>
          <p className="text-zinc-400 font-mono text-sm md:text-base max-w-md md:text-right leading-relaxed">
            Sistemas instalados que generan flujo constante de oportunidades calificadas sin intervención manual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ClientResultCard 
            icon={Users}
            client="DR. JAVIER GOMEZ" 
            category="ESTÉTICA AVANZADA"
            result="450+" 
            metric="+210%" 
            desc="LEADS CALIFICADOS/MES"
            delay={0.1}
          />
          <ClientResultCard 
            icon={Calendar}
            client="SOLUCIONES TECH" 
            category="SOFTWARE B2B"
            result="120" 
            metric="+85%" 
            desc="REUNIONES AGENDADAS"
            delay={0.2}
          />
          <ClientResultCard 
            icon={TrendingUp}
            client="IMMOBILIARIA ELITE" 
            category="BIENES RAÍCES"
            result="12" 
            metric="+45%" 
            desc="CIERRES AUTOMATIZADOS"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};

// --- HERO COMPONENT ---
const Hero = () => {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 100]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);
  const yDashboard = useTransform(scrollY, [0, 500], [0, 200]);

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
    <section className="pt-20 md:pt-32 pb-4 md:pb-8 px-6 relative min-h-[75vh] flex flex-col justify-center overflow-hidden">
      {/* Background Elements */}
      <motion.div style={{ y: yText, opacity: opacityText }} className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-brand/20 rounded-full blur-[150px] pointer-events-none animate-pulse-brand-soft" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none z-0" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center mb-16 lg:mb-24">
          
          {/* Left: Text Content */}
          <motion.div style={{ y: yText, opacity: opacityText }} className="text-left relative z-20 max-w-xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-mono mb-8 backdrop-blur-sm"
            >
              <Activity className="w-4 h-4" />
              <span className="tracking-widest font-bold">SISTEMA DE CRECIMIENTO ACTIVO</span>
            </motion.div>
            
            <div className="h-[80px] md:h-[100px] lg:h-[140px] relative mb-10 md:mb-12 perspective-[1000px]">
              <AnimatePresence mode="popLayout">
                <motion.h1
                  key={rotorIndex}
                  initial={{ opacity: 0, y: 40, rotateX: -45 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -40, rotateX: 45 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold tracking-tighter leading-[0.9] text-white absolute w-full uppercase"
                >
                  {phrases[rotorIndex].line1}<br />
                  {phrases[rotorIndex].line2}<span className="text-brand animate-pulse">_</span>
                </motion.h1>
              </AnimatePresence>
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg md:text-xl text-zinc-400 mb-12 max-w-xl font-mono leading-relaxed"
            >
              Automatiza tu captación y calificación de prospectos 24/7. Instalamos el sistema técnico que protege el tiempo de tu equipo comercial para que solo se enfoquen en cerrar tratos.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap items-center gap-6"
            >
              <a href="#calendario" className="inline-flex items-center justify-center gap-3 bg-brand text-zinc-950 px-8 py-4 rounded-sm font-bold text-lg hover:bg-brand-soft transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.5)] hover:-translate-y-1">
                AGENDAR AUDITORÍA
                <ArrowRight className="w-5 h-5" />
              </a>
              <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                SISTEMAS OPERATIVOS
              </div>
            </motion.div>
          </motion.div>

          {/* Right: 3D Floating Composition */}
          <motion.div style={{ y: yDashboard, opacity: opacityText }} className="relative w-full h-[300px] md:h-[500px] lg:h-[600px] flex items-center justify-center [perspective:2000px] mt-8 lg:mt-0">
            
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full flex items-center justify-center scale-90 md:scale-100"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Main Dashboard */}
              <motion.div
                initial={{ opacity: 0, rotateY: -20, rotateX: 10, z: -100 }}
                animate={{ opacity: 1, rotateY: -15, rotateX: 5, z: 0 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                className="absolute w-[110%] md:w-full max-w-2xl z-10 shadow-2xl shadow-brand/10"
              >
                <div className="absolute -inset-1 bg-gradient-to-tr from-brand/20 to-transparent rounded-lg blur-xl opacity-50" />
                <NeuralDashboard />
              </motion.div>
            </motion.div>

          </motion.div>
        </div>

        {/* Results row removed, now in ResultsSection */}
      </div>
    </section>
  );
};

// --- TRUST LOGOS COMPONENT ---
const TrustLogos = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const xBg = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const clients = [
    "HR EXPRESS (USA - 8 ESTADOS)",
    "VARU DISTRIBUIDORA (B2B)",
    "VITALE ORFEBRERÍA (HIGH TICKET)",
    "VEMPRA MENDOZA (TURISMO)",
    "NEXUS LOGISTICS (B2B)",
    "AURA REAL ESTATE (LUXURY)",
    "QUANTUM TECH (SAAS)",
    "LUMINA MEDICAL (CLÍNICA)",
    "ELEVATE FITNESS (FRANQUICIA)",
    "ZENITH CONSULTING (B2B)",
    "OMNI RETAIL (E-COMMERCE)",
    "VERTEX INDUSTRIAL (MANUFACTURA)"
  ];

  // Duplicamos la lista para que el scroll infinito sea fluido
  const duplicatedClients = [...clients, ...clients];

  return (
    <section ref={ref} className="py-4 md:py-8 bg-zinc-950/50 relative z-10 overflow-hidden">
      <motion.div style={{ x: xBg }} className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 mb-2 md:mb-4 text-center relative z-10">
        <span className="text-[8px] md:text-[10px] font-mono text-zinc-600 uppercase tracking-widest">SISTEMAS DESPLEGADOS EN:</span>
      </div>
      
      {/* Marquee Container with Gradient Mask */}
      <div 
        className="relative flex overflow-hidden"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
      >
        <div className="flex w-max animate-marquee items-center">
          {duplicatedClients.map((client, i) => (
            <div
              key={i}
              className="flex items-center justify-center px-6 md:px-10"
            >
              <span className="text-xs font-mono text-zinc-500 hover:text-brand transition-colors uppercase tracking-widest whitespace-nowrap cursor-default flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- THE JOURNEY COMPONENT ---
const JourneyTimeline = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const steps = [
    {
      id: "01",
      title: "[ATRAER]",
      desc: "Nos encargamos del contenido y lanzamos pauta multiplataforma (Meta/TikTok). Tráfico calificado inyectado directo a tus chats.",
      icon: Zap
    },
    {
      id: "02",
      title: "[FILTRAR]",
      desc: "Configuración de Agentes de IA en WhatsApp e IG. Conversan de forma natural, descartan curiosos y pre-califican 24/7. Protegemos la motivación de tus vendedores.",
      icon: MessageCircle
    },
    {
      id: "03",
      title: "[CERRAR]",
      desc: "El prospecto llega a Kommo CRM con la intención de compra y presupuesto validado. Tu equipo lo recibe listo para la transacción, sin desgaste operativo.",
      icon: Target
    },
    {
      id: "04",
      title: "[RETENER]",
      desc: "Generamos tu base de datos segmentada. Desplegamos campañas de recompra automáticas a quienes ya te compraron.",
      icon: Database
    }
  ];

  return (
    <section ref={ref} className="py-8 md:py-16 px-6 bg-zinc-900/20 relative overflow-hidden">
      <motion.div style={{ y: yBg }} className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white uppercase tracking-tighter">EL CICLO DE CONVERSIÓN</h2>
          <p className="text-zinc-500 font-mono text-[10px] md:text-sm uppercase tracking-widest">Secuencia de operaciones tácticas</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {steps.map((step, i) => (
            <SpotlightCard 
              key={i}
              delay={i * 0.2}
              className="p-6 md:p-8 group flex flex-col"
            >
              <div className="absolute top-0 right-0 p-4 text-zinc-800 font-mono text-3xl md:text-4xl font-bold group-hover:text-zinc-700 transition-colors">{step.id}</div>
              <step.icon className="w-6 h-6 md:w-8 md:h-8 text-brand mb-4 md:mb-6 relative z-10 shrink-0" />
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 font-mono text-zinc-200 relative z-10">{step.title}</h3>
              <p className="text-zinc-400 text-xs md:text-sm font-mono leading-relaxed relative z-10 flex-1">{step.desc}</p>
              
              {/* Hover Grid Effect */}
              <div className="absolute inset-0 bg-grid-pattern opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- METRICS HUD COMPONENT ---
const MetricsHUD = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const metrics = [
    {
      title: "CAPITAL GESTIONADO",
      value: "+$150.000 USD",
      desc: "Pauta publicitaria optimizada",
      icon: Activity
    },
    {
      title: "PROSPECTOS CALIFICADOS",
      value: "+45.000",
      desc: "Calificados vía chat",
      icon: Target
    },
    {
      title: "EFICIENCIA OPERATIVA",
      value: "95%",
      desc: "Automatización de primer contacto",
      icon: Zap
    },
    {
      title: "RETORNO PROMEDIO",
      value: "4.5x",
      desc: "ROAS en campañas B2B",
      icon: BarChart3
    }
  ];

  return (
    <section ref={ref} className="py-8 md:py-16 px-6 bg-zinc-900/20 relative overflow-hidden">
      <motion.div style={{ y: yBg }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white uppercase tracking-tighter">PANEL DE RENDIMIENTO</h2>
          <p className="text-zinc-500 font-mono text-[10px] md:text-sm uppercase tracking-widest">Autoridad y Volumen</p>
        </motion.div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {metrics.map((metric, i) => (
            <SpotlightCard key={i} delay={i * 0.1} className="p-4 md:p-8 flex flex-col justify-between group min-h-[160px] md:min-h-0">
              <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-brand/5 blur-2xl group-hover:bg-brand/10 transition-colors" />
              <div className="text-zinc-500 font-mono text-[10px] md:text-xs mb-4 md:mb-6 flex items-center gap-2 tracking-widest uppercase relative z-10">
                <metric.icon className="w-3 h-3 md:w-4 md:h-4 text-brand" /> {metric.title}
              </div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white mb-2 md:mb-4 relative z-10">
                <AnimatedCounter value={metric.value} />
              </div>
              <div className="text-[10px] md:text-xs font-mono text-zinc-400 flex items-center gap-1 md:gap-2 relative z-10">
                <span className="w-1 md:w-1.5 h-1 md:h-1.5 bg-brand rounded-full animate-pulse" /> {metric.desc}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- SERVICE PROTOCOLS COMPONENT ---
const ServiceProtocols = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const protocols = [
    {
      id: "SYS_01",
      name: "MOTOR DE TRÁFICO DIGITAL",
      desc: "Para Negocios con Tracción",
      copy: "Optimizamos tus campañas y bajamos tu Costo por Adquisición. Pauta pura, sin tocar tu proceso interno.",
      listTitle: "[ ESPECIFICACIONES DEL MOTOR ]",
      items: [
        "Gestión avanzada en Meta Ads",
        "Auditoría técnica (Pixel & API)",
        "Dirección de creativos publicitarios",
        "Telemetría en Looker Studio"
      ],
      highlight: false
    },
    {
      id: "SYS_02",
      name: "SISTEMA DE VENTAS 24/7",
      desc: "Para Ventas por Chat",
      copy: "El ecosistema técnico: Anuncios + Agentes de IA conversacionales + Kommo CRM. Filtramos a los curiosos para que tus vendedores solo atiendan a quienes tienen la tarjeta en la mano.",
      listTitle: "[ ARQUITECTURA DEL SISTEMA ]",
      items: [
        "Ecosistema Meta Ads B2B",
        "Implementación de Kommo CRM",
        "Bot calificador en WhatsApp",
        "Trazabilidad de ventas cerradas"
      ],
      highlight: true
    },
    {
      id: "SYS_03",
      name: "SOCIOS DE CRECIMIENTO",
      desc: "Delegación Total",
      copy: "Nos hacemos cargo de todo: Viajamos a tu negocio a crear contenido (o gestionamos creadores locales), configuramos la IA, la pauta y tu base de datos.",
      listTitle: "[ INFRAESTRUCTURA TOTAL ]",
      items: [
        "Integración absoluta de SYS_02",
        "Estrategia de Contenido B2B",
        "Guionado y Edición de Reels",
        "Soporte operativo prioritario"
      ],
      highlight: false
    }
  ];

  return (
    <section ref={ref} className="py-8 md:py-16 px-6 bg-zinc-900/20 relative z-10 overflow-hidden">
      <motion.div style={{ y: yBg }} className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white uppercase tracking-tighter">PROTOCOLOS DE IMPLEMENTACIÓN</h2>
          <p className="text-zinc-500 font-mono text-[10px] md:text-sm uppercase tracking-widest">Modelos de Integración</p>
        </motion.div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {protocols.map((proto, i) => (
            <SpotlightCard
              key={i}
              delay={i * 0.15}
              className={`flex flex-col justify-between p-8 group transition-all duration-300 ${
                proto.highlight 
                  ? 'bg-zinc-900/80 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)]' 
                  : 'bg-zinc-950 border-white/10 hover:border-white/20'
              }`}
            >
              {proto.highlight && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-2xl pointer-events-none" />
              )}
              
              <div className="flex-1 flex flex-col relative z-10">
                <div className={`text-xs font-mono mb-6 flex items-center gap-2 ${proto.highlight ? 'text-emerald-500' : 'text-zinc-500'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${proto.highlight ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-600'}`} />
                  {proto.id}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{proto.name}</h3>
                <p className="text-zinc-400 text-sm mb-6 font-mono">{proto.desc}</p>
                
                <p className="font-mono text-sm text-zinc-400 leading-relaxed min-h-[100px] mb-8">
                  {proto.copy}
                </p>
                
                <div className="mt-auto mb-8">
                  <div className="text-xs font-mono text-zinc-600 tracking-widest uppercase mb-4">
                    {proto.listTitle}
                  </div>
                  <ul className="space-y-3">
                    {proto.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${proto.highlight ? 'text-emerald-500' : 'text-zinc-500'}`} />
                        <span className="text-sm font-mono text-zinc-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <a 
                href="#calendario" 
                className={`inline-flex items-center justify-between w-full px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider transition-colors mt-auto relative z-10 ${
                  proto.highlight 
                    ? 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400' 
                    : 'bg-zinc-900 text-zinc-300 border border-white/10 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                AGENDAR AUDITORÍA
                <ArrowRight className="w-4 h-4" />
              </a>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- TESTIMONIALS COMPONENT ---
const Testimonials = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const testimonials = [
    {
      client: "HR Express",
      quote: "Escalamos a 8 estados en tiempo récord. El sistema de Cache Agency filtró miles de consultas y nos inyectó prospectos corporativos listos para operar."
    },
    {
      client: "Varu Distribuidora",
      quote: "Nuestros vendedores ya no pierden tiempo atendiendo curiosos. El Agente de IA atiende a los minoristas de madrugada y cuando el equipo llega, los pedidos ya están en Kommo CRM."
    },
    {
      client: "Vitale Orfebrería",
      quote: "Con su sistema sabemos exactamente qué anuncio generó la venta de cada pieza premium. Es control financiero absoluto sobre la publicidad."
    }
  ];

  return (
    <section ref={ref} className="py-8 md:py-16 px-6 bg-zinc-950 relative z-10 overflow-hidden">
      <motion.div style={{ y: yBg }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white uppercase tracking-tighter">RESULTADOS EN PRODUCCIÓN</h2>
          <p className="text-zinc-500 font-mono text-[10px] md:text-sm uppercase tracking-widest">Sistemas Validados en Producción</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((test, i) => (
            <SpotlightCard
              key={i}
              delay={i * 0.15}
              className="bg-zinc-900/50 p-6 md:p-8 group flex flex-col hover:border-brand/30 transition-colors"
            >
              <div className="text-brand mb-4 md:mb-6 relative z-10">
                <Terminal className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <p className="text-zinc-300 font-mono text-xs md:text-sm leading-relaxed mb-6 md:mb-8 flex-1 relative z-10">
                "{test.quote}"
              </p>
              <div className="text-[10px] md:text-xs font-mono text-zinc-500 flex items-center gap-2 border-t border-white/5 pt-4 relative z-10">
                <span className="w-1.5 h-1.5 bg-brand rounded-full" />
                {test.client}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- TECH STACK COMPONENT ---
const TechStack = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const xBg = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const tools = [
    "Meta Ads", "TikTok Ads", "WhatsApp API", "Manychat", 
    "Kommo CRM", "Tiendanube", "Looker Studio", "Claude Code", 
    "Google AI Studio", "Antigravity", "React + Vite", 
    "Supabase Edge Functions", "Vercel", "App de Medición CPA"
  ];

  // Duplicamos la lista para que el scroll infinito sea fluido
  const duplicatedTools = [...tools, ...tools];

  return (
    <section ref={ref} className="py-6 md:py-10 bg-zinc-950/50 relative z-10 overflow-hidden">
      <motion.div style={{ x: xBg }} className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 mb-4 md:mb-6 text-center relative z-10">
        <span className="text-[8px] md:text-[10px] font-mono text-zinc-600 uppercase tracking-widest">[ INFRAESTRUCTURA TECNOLÓGICA ]</span>
      </div>
      
      {/* Marquee Container with Gradient Mask */}
      <div 
        className="relative flex overflow-hidden"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
      >
        <div className="flex w-max animate-marquee items-center" style={{ animationDuration: '90s' }}>
          {duplicatedTools.map((tool, i) => (
            <div
              key={i}
              className="flex items-center justify-center px-6 md:px-10"
            >
              <span className="text-xs font-mono text-zinc-500 hover:text-brand transition-colors uppercase tracking-widest whitespace-nowrap cursor-default flex items-center gap-2">
                <span className="text-brand/50">{">_"}</span>
                {tool}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- BOOKING CALENDAR COMPONENT ---
const BookingCalendar = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <section id="calendario" ref={ref} className="py-8 md:py-16 px-6 relative overflow-hidden bg-gradient-to-b from-zinc-950 to-zinc-900">
      <motion.div style={{ y: yBg }} className="absolute inset-0 bg-brand/5 pointer-events-none" />
      <motion.div style={{ y: yBg }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[10px] md:text-xs font-mono text-brand uppercase tracking-widest mb-4">
            [ SISTEMA DE ASIGNACIÓN DE TURNOS ]
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-white uppercase tracking-tighter">
            Despliega tu Sistema de Ventas
          </h2>
          <p className="text-base md:text-xl text-zinc-400 mb-10 md:mb-12 font-mono leading-relaxed max-w-2xl mx-auto">
            Elige un horario en nuestro calendario. Analizaremos tu proceso actual y te mostraremos cómo filtrar curiosos para que tus vendedores solo se enfoquen en cerrar tratos.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl w-full mx-auto bg-white/5 border border-white/10 min-h-[700px] flex items-center justify-center rounded-sm"
        >
          <span className="text-zinc-600 font-mono text-sm tracking-widest">[ EMBED DE CALENDLY AQUÍ ]</span>
        </motion.div>
      </div>
    </section>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityGrid = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.4, 0.15]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-brand/30 overflow-x-hidden relative">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand origin-left z-[60]"
        style={{ scaleX: scrollYProgress }}
      />
      
      {/* Global Grid Background with Parallax */}
      <motion.div 
        className="fixed inset-0 bg-grid-pattern pointer-events-none z-0" 
        style={{ y: yBg, opacity: opacityGrid }}
      />
      
      {/* Central Energy Line */}
      <motion.div 
        className="fixed left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-brand/20 to-brand/5 -translate-x-1/2 pointer-events-none z-0 hidden md:block"
        style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
      />
      
      <Header />
      
      <main className="relative z-10">
        <Hero />
        <ResultsSection />
        <TrustLogos />
        <JourneyTimeline />
        <MetricsHUD />
        <Testimonials />
        <ServiceProtocols />
        <TechStack />
        <BookingCalendar />
      </main>
      
      <footer className="py-12 text-center text-xs font-mono text-zinc-600 relative z-10 bg-zinc-950">
        &copy; {new Date().getFullYear()} CACHE_AGENCY // SISTEMAS CONVERSACIONALES
      </footer>
    </div>
  );
}
