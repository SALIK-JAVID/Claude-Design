import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "@/src/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function TextReveal({ text, className, delay = 0, once = true }: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  const words = text.split(" ");

  return (
    <div ref={ref} className={cn("overflow-hidden flex flex-wrap", className)}>
      {words.map((word, i) => (
        <span key={i} className="relative inline-block mr-[0.2em] overflow-hidden">
          <motion.span
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : { y: "100%" }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.05,
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
