import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "@/src/lib/utils";
import React from "react";

interface ServiceProps {
  number: string;
  title: string;
  description: string;
  tags: string[];
  key?: React.Key;
}

export function Service({ number, title, description, tags }: ServiceProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative border-t border-white/10 pt-12 pb-24 grid grid-cols-1 md:grid-cols-4 gap-8"
    >
      <div className="text-[10px] font-mono opacity-40 group-hover:text-white transition-colors">
        {number}
      </div>
      
      <div className="md:col-span-2">
        <h3 className="text-4xl md:text-6xl font-display font-medium uppercase tracking-tight mb-8">
          {title}
        </h3>
        <p className="max-w-md text-white/60 text-lg md:text-xl font-light leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex flex-col justify-end items-start md:items-end gap-4">
        <div className="flex flex-wrap gap-2 md:justify-end">
          {tags.map((tag, i) => (
            <span key={i} className="text-[10px] uppercase tracking-widest border border-white/20 rounded-full px-3 py-1 opacity-40 group-hover:opacity-100 transition-opacity">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover Background Effect */}
      <div className="absolute inset-x-0 bottom-0 h-0 bg-white/5 transition-all duration-700 group-hover:h-full -z-10" />
    </motion.div>
  );
}

export function Services() {
  const services = [
    {
      number: "01",
      title: "Brand Direction",
      description: "Defining identity, visual language and communication strategies that resonate with your target audience.",
      tags: ["Strategy", "Visual ID", "Positioning"]
    },
    {
      number: "02",
      title: "Advanced Tech",
      description: "Custom eCommerce solutions and headless architectures built for performance and absolute control.",
      tags: ["Shopify", "React", "Integrations"]
    },
    {
      number: "03",
      title: "Performance",
      description: "Data-driven marketing campaigns and conversion rate optimization designed to maximize ROI.",
      tags: ["Growth", "SEM", "Social Ads"]
    }
  ];

  return (
    <section id="services" className="py-24 px-6 md:px-12 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
          <h2 className="text-xl uppercase tracking-[0.4em] opacity-40">Our Method</h2>
          <p className="max-w-sm text-sm text-white/50 uppercase tracking-widest">
            A linear approach from conception to scalability.
          </p>
        </div>
        
        <div className="space-y-0">
          {services.map((service, i) => (
            <Service 
              key={i} 
              number={service.number}
              title={service.title}
              description={service.description}
              tags={service.tags}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
