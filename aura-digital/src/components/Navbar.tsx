import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-8 md:px-12 md:py-10"
    >
      <div className="text-xl font-bold tracking-tighter uppercase font-display">
        Aura Digital
      </div>
      
      <div className="hidden md:flex gap-12 text-[10px] uppercase tracking-widest font-medium opacity-60">
        <a href="#about" className="hover:opacity-100 transition-opacity">Agency</a>
        <a href="#services" className="hover:opacity-100 transition-opacity">Work</a>
        <a href="#contact" className="hover:opacity-100 transition-opacity">Contact</a>
      </div>

      <div className="flex gap-4 items-center">
        <div className="w-8 h-[1px] bg-white opacity-40"></div>
        <button className="text-[10px] uppercase tracking-[0.2em] font-medium border border-white/20 rounded-full px-6 py-2 hover:bg-white hover:text-black transition-all">
          Enquire
        </button>
      </div>
    </motion.nav>
  );
}
