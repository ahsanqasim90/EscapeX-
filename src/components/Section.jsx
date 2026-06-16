import { motion } from "framer-motion";
import React from "react";

export default function Section({ eyebrow, title, children, id, className = "" }) {
  return (
    <section id={id} className={`relative overflow-hidden py-20 sm:py-24 ${className}`}>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        {title ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="mb-10 max-w-3xl"
          >
            {eyebrow ? <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-cyan">{eyebrow}</p> : null}
            <h2 className="text-3xl font-semibold leading-tight text-white sm:text-5xl">{title}</h2>
          </motion.div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
