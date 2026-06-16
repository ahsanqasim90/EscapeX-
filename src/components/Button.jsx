import { motion } from "framer-motion";
import React from "react";

export default function Button({ children, href = "#", variant = "primary", icon: Icon }) {
  const styles =
    variant === "primary"
      ? "bg-white text-ink shadow-glow hover:bg-cyan"
      : "border border-white/15 bg-white/5 text-white hover:border-cyan/70 hover:bg-cyan/10";
  const isExternal = href.startsWith("http");

  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition ${styles}`}
    >
      {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
      <span>{children}</span>
    </motion.a>
  );
}
