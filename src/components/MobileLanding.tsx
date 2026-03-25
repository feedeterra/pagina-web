import React from 'react';
import { Header } from './Header';
import { Hero } from './Hero';
import { Results } from './Results';
import { MetricsHUD } from './MetricsHUD';
import { ServiceProtocols } from './ServiceProtocols';

export const MobileLanding = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-brand selection:text-white">
      <Header />
      <main>
        <Hero isMobile={true} />
        <Results />
        <MetricsHUD />
        <ServiceProtocols />
        
        {/* Mobile Specific Section: Quick Contact or something else */}
        <section className="py-24 px-6 bg-zinc-950 border-t border-white/5 text-center">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-zinc-600 font-mono text-[10px] tracking-[0.3em] uppercase mb-8">
              CONTACTO_RÁPIDO
            </h3>
            <div className="flex flex-col gap-6">
              <a href="https://wa.me/5491145XXXXXXXX" className="w-full py-4 rounded-sm bg-green-500/10 border border-green-500/20 text-green-500 font-bold text-sm hover:bg-green-500/20 transition-all">
                WHATSAPP_DIRECTO
              </a>
              <a href="mailto:info@cacheagency.com" className="w-full py-4 rounded-sm bg-zinc-900 border border-white/10 text-white font-bold text-sm hover:border-brand/50 transition-all">
                EMAIL_SOPORTE
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-12 px-6 border-t border-white/5 bg-zinc-950 text-center">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="text-zinc-600 font-mono text-[8px] tracking-widest uppercase">
            © 2024 CACHE_AGENCY // TODOS LOS DERECHOS RESERVADOS
          </div>
          <div className="flex flex-col gap-4 text-zinc-500 font-mono text-[8px] tracking-widest uppercase">
            <a href="#" className="hover:text-brand transition-colors">PRIVACY_POLICY</a>
            <a href="#" className="hover:text-brand transition-colors">TERMS_OF_SERVICE</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
