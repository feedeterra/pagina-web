import React from 'react';
import { Header } from './Header';
import { Hero } from './Hero';
import { Results } from './Results';
import { MetricsHUD } from './MetricsHUD';
import { ServiceProtocols } from './ServiceProtocols';

export const DesktopLanding = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-brand selection:text-white">
      <Header />
      <main>
        <Hero isMobile={false} />
        <Results />
        <MetricsHUD />
        <ServiceProtocols />
        
        {/* Desktop Specific Section: Trust Logos or something else */}
        <section className="py-24 px-6 bg-zinc-950 border-t border-white/5">
          <div className="max-w-7xl mx-auto text-center">
            <h3 className="text-zinc-600 font-mono text-[10px] tracking-[0.3em] uppercase mb-12">
              SISTEMAS_INTEGRADOS_CON
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
              <span className="text-2xl font-display font-bold text-white tracking-tighter">META_ADS</span>
              <span className="text-2xl font-display font-bold text-white tracking-tighter">WHATSAPP_API</span>
              <span className="text-2xl font-display font-bold text-white tracking-tighter">KOMMO_CRM</span>
              <span className="text-2xl font-display font-bold text-white tracking-tighter">STRIPE_PAY</span>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-12 px-6 border-t border-white/5 bg-zinc-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-zinc-600 font-mono text-[10px] tracking-widest">
            © 2024 CACHE_AGENCY // TODOS LOS DERECHOS RESERVADOS
          </div>
          <div className="flex gap-8 text-zinc-500 font-mono text-[10px] tracking-widest uppercase">
            <a href="#" className="hover:text-brand transition-colors">PRIVACY_POLICY</a>
            <a href="#" className="hover:text-brand transition-colors">TERMS_OF_SERVICE</a>
            <a href="#" className="hover:text-brand transition-colors">SYSTEM_STATUS</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
