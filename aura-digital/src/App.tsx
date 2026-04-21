/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Footer } from "./components/Footer";
import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

export default function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative bg-black min-h-screen text-white selection:bg-white selection:text-black">
      {/* Global Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white z-[60] origin-left"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <main>
        <Hero />
        
        {/* About / Transition Section */}
        <section id="about" className="py-48 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-24 items-start">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight leading-tight max-w-2xl">
              We were born as developers. We built design on top of us. The tension between these two souls is our method. And our <span className="text-white/30 italic">advantage</span>.
            </h2>
            <div className="space-y-8 max-w-sm">
              <p className="text-white/60 font-light leading-relaxed">
                Not just execution, not isolated services. We provide an end-to-end ecosystem designed to scale, perform and integrate seamlessly with existing platforms.
              </p>
              <div className="flex gap-4">
                <div className="w-12 h-[1px] bg-white/40 mt-3" />
                <button className="text-[10px] uppercase tracking-widest font-medium opacity-60 hover:opacity-100 transition-opacity underline underline-offset-8">
                  The Manifesto
                </button>
              </div>
            </div>
          </div>
        </section>

        <Services />

        {/* Selected Projects / Work Carousel Preview */}
        <section className="py-24 px-6 md:px-12 bg-black overflow-hidden">
          <div className="max-w-7xl mx-auto mb-20">
            <div className="flex justify-between items-end">
              <h2 className="text-6xl md:text-[8vw] font-display font-medium uppercase tracking-tighter leading-none">
                Selected <br />
                <span className="text-white/20 italic">Works</span>
              </h2>
              <p className="text-[10px] uppercase tracking-[0.4em] opacity-40 hidden md:block">03 Selected Case Studies</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] bg-neutral-900 overflow-hidden rounded-sm relative mb-6">
                  <img 
                    src={`https://picsum.photos/seed/agency${i}/800/1000`} 
                    alt={`Project ${i}`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[10px] uppercase tracking-[0.4em] border border-white px-6 py-2 rounded-full">View Case</span>
                  </div>
                </div>
                <h4 className="text-xl uppercase tracking-widest mb-2">Project Name 0{i}</h4>
                <p className="text-[10px] uppercase tracking-widest opacity-40">Luxury eCommerce • 2026</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
