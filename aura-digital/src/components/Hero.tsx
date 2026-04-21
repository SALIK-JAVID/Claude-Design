import { motion } from "motion/react";
import { TextReveal } from "./TextReveal";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20">
      <div className="max-w-7xl">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[10px] uppercase tracking-[0.4em] mb-8"
        >
          Evolutionary Design & Tech
        </motion.p>
        
        <h1 className="text-[12vw] md:text-[10vw] font-display font-bold leading-[0.9] tracking-tighter uppercase mb-12">
          <TextReveal text="Crafting digital" delay={0.4} />
          <TextReveal text="ecosystems that" delay={0.6} />
          <TextReveal text="scale beyond" delay={0.8} />
          <span className="text-white/30 italic"><TextReveal text="limits" delay={1.0} /></span>
        </h1>

        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
          className="h-[1px] w-full bg-white/20 origin-left mb-12"
        />

        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="max-w-md text-sm md:text-lg leading-relaxed font-light"
          >
            We are a digital innovation agency. We provide brand direction, advanced technology, and high-performance marketing as one connected approach.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="w-32 h-32 md:w-48 md:h-48 border border-white/20 rounded-full flex items-center justify-center p-4 text-center text-[10px] uppercase tracking-widest leading-tight hover:bg-white hover:text-black transition-all cursor-pointer group"
          >
            <span className="group-hover:scale-110 transition-transform">Explore Our Method</span>
          </motion.div>
        </div>
      </div>

      {/* Decorative vertical line */}
      <motion.div 
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        className="absolute right-12 bottom-0 w-[1px] h-32 bg-white/10 origin-bottom hidden md:block"
      />
    </section>
  );
}
