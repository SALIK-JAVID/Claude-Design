import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <footer ref={ref} className="bg-black py-24 px-6 md:px-12 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-32">
          <div>
            <h2 className="text-6xl md:text-8xl font-display font-medium uppercase tracking-tighter leading-[0.9] mb-12">
              Ready to <br />
              <span className="text-white/20 italic">Evolve?</span>
            </h2>
            <button className="w-full md:w-auto px-12 py-6 border border-white/20 rounded-full text-xl uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              Start a project
            </button>
          </div>

          <div className="flex flex-col justify-between items-start md:items-end">
            <div className="space-y-4 text-right">
              <p className="text-[10px] uppercase tracking-[0.4em] opacity-40 mb-4">Location</p>
              <p className="text-xl md:text-2xl font-light">Milan, Italy</p>
              <p className="text-xl md:text-2xl font-light">London, UK</p>
            </div>

            <div className="space-y-4 mt-12 md:mt-0 text-left md:text-right">
              <p className="text-[10px] uppercase tracking-[0.4em] opacity-40 mb-4">Social</p>
              <div className="flex gap-8 text-[12px] uppercase tracking-widest">
                <a href="#" className="hover:opacity-50 transition-opacity">Instagram</a>
                <a href="#" className="hover:opacity-50 transition-opacity">LinkedIn</a>
                <a href="#" className="hover:opacity-50 transition-opacity">Behance</a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 opacity-40 text-[10px] uppercase tracking-[0.2em] gap-8">
          <p>© 2026 Aura Digital. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </div>
          <p className="font-mono">Created by Build</p>
        </div>
      </div>

      {/* Large Decorative Text */}
      <motion.div 
        animate={isInView ? { x: [0, -100, 0] } : {}}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="text-[20vw] font-display font-bold uppercase tracking-tighter opacity-[0.02] whitespace-nowrap -mb-12 select-none pointer-events-none"
      >
        Digital Innovation Agency • Aura Digital • Digital Innovation Agency
      </motion.div>
    </footer>
  );
}
