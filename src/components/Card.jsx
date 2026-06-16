import { motion } from "framer-motion";
import React from "react";
import { getVideoEmbed } from "../lib/media";

export function CategoryCard({ item, index }) {
  const Icon = item.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.03, 0.25) }}
      whileHover={{ y: -8 }}
      className="card-sheen group grid min-h-[260px] content-between rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-premium backdrop-blur transition hover:border-cyan/45 hover:bg-white/[0.07]"
    >
      <div>
        <div className="mb-5 flex items-center justify-between">
          <span className="grid h-11 w-11 place-items-center rounded-md bg-cyan/10 text-cyan ring-1 ring-cyan/20 transition group-hover:bg-cyan group-hover:text-ink">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
            Sample
          </span>
        </div>
        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
        <p className="mt-3 text-sm leading-6 text-white/64">{item.description}</p>
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-xs font-semibold text-gold">{item.sample}</p>
        <a href="#portfolio" className="shrink-0 text-sm font-bold text-cyan transition group-hover:text-white">
          View Work
        </a>
      </div>
    </motion.article>
  );
}

export function PortfolioCard({ item, index }) {
  const videoEmbed = getVideoEmbed(item.videoUrl);
  const canPreview = videoEmbed?.type === "iframe" || videoEmbed?.type === "video";

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.96, y: 18 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.24) }}
      className="card-sheen group overflow-hidden rounded-lg border border-white/10 bg-panel shadow-premium"
    >
      <div className="relative aspect-video overflow-hidden bg-[radial-gradient(circle_at_30%_20%,rgba(110,231,249,.35),transparent_28%),radial-gradient(circle_at_78%_56%,rgba(244,199,106,.25),transparent_26%),linear-gradient(135deg,#141824,#07080c)]">
        {videoEmbed?.type === "iframe" ? (
          <iframe
            src={videoEmbed.src}
            title={`${item.title} video`}
            allow="autoplay; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0 bg-black"
          />
        ) : null}
        {videoEmbed?.type === "video" ? (
          <video src={videoEmbed.src} controls className="absolute inset-0 h-full w-full bg-black object-contain" />
        ) : null}
        {!canPreview && item.thumbnailUrl ? (
          <img
            src={item.thumbnailUrl}
            alt={`${item.title} thumbnail`}
            className="absolute inset-0 h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/78 via-black/10 to-black/25" />
        <div className="pointer-events-none absolute inset-x-5 top-5 flex items-center justify-between">
          <span className="rounded-full bg-black/45 px-3 py-1 text-xs font-semibold text-cyan ring-1 ring-white/10">{item.category}</span>
          <span className="h-3 w-3 rounded-full bg-coral shadow-[0_0_22px_rgba(255,128,102,.8)]" />
        </div>
        {!canPreview ? <div className="absolute bottom-5 left-5 right-5">
          <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan via-gold to-coral"
              initial={{ width: "18%" }}
              whileInView={{ width: "82%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((bar) => (
              <span key={bar} className="h-10 rounded bg-white/10 ring-1 ring-white/10 transition group-hover:bg-white/16" />
            ))}
          </div>
        </div> : null}
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{item.niche}</p>
        <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
        <p className="mt-3 text-sm leading-6 text-white/62">{item.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tools.map((tool) => (
            <span key={tool} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/64">
              {tool}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
          <p className="text-xs leading-5 text-white/55">{item.result}</p>
          <a href={videoEmbed?.src || item.videoUrl || "#contact"} target={(videoEmbed?.src || item.videoUrl)?.startsWith("http") ? "_blank" : undefined} rel={(videoEmbed?.src || item.videoUrl)?.startsWith("http") ? "noreferrer" : undefined} className="rounded-full bg-white px-4 py-2 text-sm font-bold text-ink transition hover:bg-cyan">
            Watch
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function TestimonialCard({ item }) {
  return (
    <article className="min-w-[320px] max-w-[390px] rounded-lg border border-white/10 bg-white/[0.055] p-6 shadow-premium backdrop-blur">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-white">{item.client}</h3>
          <p className="text-xs uppercase tracking-[0.18em] text-cyan">{item.platform}</p>
        </div>
        <div className="text-sm text-gold">{"★".repeat(item.rating)}</div>
      </div>
      <p className="text-base leading-7 text-white/74">"{item.text}"</p>
      <p className="mt-5 text-sm font-semibold text-white/50">{item.project}</p>
    </article>
  );
}
