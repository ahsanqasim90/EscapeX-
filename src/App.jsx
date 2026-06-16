import { useMemo, useState } from "react";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, ExternalLink, Mail, MessageCircle, Phone, Play, Send, Star, Video, Wand2 } from "lucide-react";
import Button from "./components/Button.jsx";
import { AdminDashboard, AdminLogin } from "./components/Admin.jsx";
import { CategoryCard, PortfolioCard, TestimonialCard } from "./components/Card.jsx";
import Section from "./components/Section.jsx";
import { useSiteContent } from "./hooks/useSiteContent.js";
import {
  certifications as fallbackCertifications,
  filters,
  serviceCategories,
  skills as fallbackSkills,
} from "./data/portfolioData.js";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
};

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/75 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="flex items-center gap-3 text-sm font-bold text-white">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-white text-ink">
            <Video className="h-4 w-4" aria-hidden="true" />
          </span>
          <span>AI Video Studio</span>
        </a>
        <div className="hidden items-center gap-6 text-sm font-medium text-white/62 md:flex">
          {["About", "Services", "Portfolio", "Reviews", "Process", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-white">
              {item}
            </a>
          ))}
        </div>
        <a href="#contact" className="rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-white transition hover:border-cyan hover:text-cyan">
          Hire Me
        </a>
      </nav>
    </header>
  );
}

function Hero({ profile, stats }) {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-16">
      <div className="absolute inset-0 cinematic-bg" />
      <div className="absolute inset-0 opacity-60 timeline-grid" />
      <div className="absolute inset-0 opacity-45 lens-vignette" />
      <div className="pointer-events-none absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent scan-line" />
      <div className="pointer-events-none absolute inset-x-0 top-20 hidden overflow-hidden opacity-25 lg:block">
        <div className="film-perf flex w-max gap-3">
          {Array.from({ length: 42 }).map((_, index) => (
            <span key={index} className="h-5 w-9 rounded-sm border border-white/20 bg-black/35" />
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-12 left-0 right-0 hidden overflow-hidden opacity-60 lg:block">
        <div className="reel-marquee flex w-max gap-4">
          {[...serviceCategories.slice(0, 10), ...serviceCategories.slice(0, 10)].map((item, index) => (
            <span key={`${item.title}-${index}`} className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white/50">
              {item.title}
            </span>
          ))}
        </div>
      </div>
      <motion.div
        aria-hidden="true"
        className="absolute right-4 top-24 hidden w-[44vw] max-w-3xl lg:block"
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-console relative aspect-[4/3] rounded-lg border border-white/10 bg-black/30 p-5 shadow-premium backdrop-blur">
          <motion.div className="absolute -left-8 top-14 rounded-md border border-cyan/30 bg-cyan/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-cyan" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
            AI scene
          </motion.div>
          <motion.div className="absolute right-8 top-8 rounded-md border border-gold/30 bg-gold/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-gold" animate={{ y: [0, 12, 0] }} transition={{ duration: 5, repeat: Infinity }}>
            Captions
          </motion.div>
          <div className="relative h-2/3 overflow-hidden rounded-md bg-[radial-gradient(circle_at_30%_30%,rgba(110,231,249,.32),transparent_30%),linear-gradient(135deg,#1c2030,#090a0f)] ring-1 ring-white/10">
            <div className="absolute inset-0 video-noise" />
            <div className="absolute left-5 top-5 flex gap-2">
              {["HOOK", "CUT", "CTA"].map((tag) => (
                <span key={tag} className="rounded bg-black/45 px-2 py-1 text-[10px] font-black tracking-[0.2em] text-cyan">{tag}</span>
              ))}
            </div>
            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-5 gap-3">
              {[38, 66, 46, 88, 54].map((height, index) => (
                <motion.span
                  key={height}
                  className="rounded-t bg-gradient-to-t from-coral via-gold to-cyan"
                  animate={{ height: [`${height * 0.45}px`, `${height}px`, `${height * 0.6}px`] }}
                  transition={{ duration: 1.6, delay: index * 0.12, repeat: Infinity, repeatType: "mirror" }}
                />
              ))}
            </div>
            <motion.div className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/18 to-transparent" animate={{ x: [-120, 720] }} transition={{ duration: 3.4, repeat: Infinity, ease: "linear" }} />
          </div>
          <div className="mt-5 space-y-3">
            {[78, 44, 92].map((width, index) => (
              <div key={width} className="flex items-center gap-3">
                <span className="h-8 w-8 rounded bg-white/10" />
                <motion.span
                  className="h-2 rounded-full bg-gradient-to-r from-cyan to-gold"
                  initial={{ width: "18%" }}
                  animate={{ width: `${width}%` }}
                  transition={{ duration: 1.5, delay: index * 0.2, repeat: Infinity, repeatType: "reverse" }}
                />
              </div>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-6 gap-2">
            {Array.from({ length: 18 }).map((_, index) => (
              <motion.span
                key={index}
                className="h-12 rounded bg-white/8 ring-1 ring-white/10"
                animate={{ opacity: [0.32, 0.85, 0.45] }}
                transition={{ duration: 2.2, delay: index * 0.06, repeat: Infinity }}
              />
            ))}
          </div>
        </div>
      </motion.div>
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-5 py-16 sm:px-8">
        <motion.div initial="hidden" animate="show" variants={reveal} className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan">
            <Wand2 className="h-4 w-4" aria-hidden="true" />
            {profile.name} | Premium AI ad creative
          </div>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] text-white sm:text-7xl lg:text-8xl">
            {profile.title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
            {profile.overview}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#portfolio" icon={Play}>View Portfolio</Button>
            <Button href={profile.upworkUrl} variant="secondary" icon={BriefcaseBusiness}>Hire Me on Upwork</Button>
            <Button href="#reviews" variant="secondary" icon={Star}>See Client Reviews</Button>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/62">
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 transition hover:text-cyan">
              <Mail className="h-4 w-4" aria-hidden="true" />
              {profile.email}
            </a>
            <a href={`tel:${profile.phone.replaceAll(" ", "")}`} className="inline-flex items-center gap-2 transition hover:text-cyan">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {profile.phone}
            </a>
          </div>
          <div className="mt-12 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="card-sheen rounded-lg border border-white/10 bg-white/[0.045] p-4">
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                <p className="mt-1 text-xs leading-5 text-white/54">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FilterPills({ active, setActive, options }) {
  return (
    <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
      {options.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => setActive(filter)}
          className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
            active === filter ? "border-cyan bg-cyan text-ink" : "border-white/10 bg-white/[0.04] text-white/64 hover:border-cyan/60 hover:text-white"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

function App() {
  if (window.location.pathname === "/admin-login") return <AdminLogin />;
  if (window.location.pathname === "/admin-dashboard") return <AdminDashboard />;

  const { content } = useSiteContent();
  const {
    profile,
    portfolioItems,
    processSteps,
    sellingPoints,
    stats,
    testimonials,
    tools,
    skills = fallbackSkills,
    certifications = fallbackCertifications,
  } = content;
  const [activeFilter, setActiveFilter] = useState("All");
  const visiblePortfolio = useMemo(
    () => (activeFilter === "All" ? portfolioItems : portfolioItems.filter((item) => item.category === activeFilter)),
    [activeFilter]
  );

  return (
    <main className="min-h-screen bg-ink text-white">
      <Nav />
      <Hero profile={profile} stats={stats} />

      <Section id="about" eyebrow="About" title="Creative editing with ad strategy built in.">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-8 lg:grid-cols-[1.2fr_.8fr]"
        >
          <p className="text-2xl leading-10 text-white/78">
            I create viral short-form videos, Instagram Reels, TikTok edits, YouTube Shorts, product videos, AI ads, UGC-style videos, talking head edits, podcasts, and brand content for clients across multiple niches. My work focuses on retention, clean visuals, strong pacing, captions, storytelling, and professional delivery.
          </p>
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-gold">Creative focus</p>
            <div className="mt-5 grid gap-3">
              {["Hooks that earn the first 3 seconds", "Captions that stay readable on mobile", "AI visuals shaped into real ad narratives", "Exports prepared for modern social platforms", `Direct contact: ${profile.email}`].map((item) => (
                <div key={item} className="flex items-center gap-3 text-white/72">
                  <span className="h-2 w-2 rounded-full bg-cyan" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Section>

      <Section id="services" eyebrow="Services" title="Categories ready for Upwork clients, agencies, and fast-moving brands." className="bg-white/[0.02]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {serviceCategories.map((item, index) => (
            <CategoryCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </Section>

      <Section id="portfolio" eyebrow="Portfolio" title="A flexible video gallery built for real client work.">
        <FilterPills active={activeFilter} setActive={setActiveFilter} options={filters} />
        <motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visiblePortfolio.map((item, index) => (
            <PortfolioCard key={item.title} item={item} index={index} />
          ))}
        </motion.div>
      </Section>

      <Section id="reviews" eyebrow="Client Reviews" title="Proof-style testimonials with room for real Upwork feedback.">
        <div className="relative overflow-hidden">
          <motion.div className="flex gap-5" animate={{ x: [0, -760, 0] }} transition={{ duration: 26, repeat: Infinity, ease: "linear" }}>
            {[...testimonials, ...testimonials].map((item, index) => (
              <TestimonialCard key={`${item.client}-${index}`} item={item} />
            ))}
          </motion.div>
        </div>
      </Section>

      <Section id="process" eyebrow="Process" title="A clear workflow from brief to final delivery." className="bg-white/[0.02]">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="rounded-lg border border-white/10 bg-white/[0.045] p-6"
            >
              <p className="text-sm font-bold text-cyan">Step {index + 1}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{step}</h3>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="tools" eyebrow="Tools" title="Production stack for modern AI-assisted video creation.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <motion.div key={tool} whileHover={{ y: -6 }} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
              <p className="text-lg font-semibold text-white">{tool}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-6">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-gold">Upwork Skills</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-white/68">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {certifications.map((certification) => (
            <motion.div key={certification} whileHover={{ y: -5 }} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm font-semibold text-white">{certification}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-cyan">Certification</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="why" eyebrow="Why Work With Me" title="Creative speed, short-form taste, and client-focused delivery.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {sellingPoints.map((point, index) => (
            <motion.div
              key={point}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="flex min-h-28 items-start gap-4 rounded-lg border border-white/10 bg-white/[0.045] p-5"
            >
              <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-mint text-ink">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="font-semibold leading-6 text-white/78">{point}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="contact" eyebrow="Contact" title="Ready to create scroll-stopping videos?" className="pb-28">
        <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-lg border border-white/10 bg-[linear-gradient(135deg,rgba(110,231,249,.13),rgba(244,199,106,.08),rgba(255,128,102,.11))] p-6">
            <h3 className="text-2xl font-semibold text-white">Send a brief, raw footage, or a product idea.</h3>
            <p className="mt-4 leading-7 text-white/68">Reach me directly or hire me through Upwork. Send your product, raw clips, idea, or reference videos and I will shape it into a polished short-form creative.</p>
            <div className="mt-6 grid gap-3 text-sm text-white/70">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-3 rounded-md border border-white/10 bg-black/20 px-4 py-3 transition hover:border-cyan/60 hover:text-white">
                <Mail className="h-4 w-4 text-cyan" aria-hidden="true" />
                {profile.email}
              </a>
              <a href={`tel:${profile.phone.replaceAll(" ", "")}`} className="flex items-center gap-3 rounded-md border border-white/10 bg-black/20 px-4 py-3 transition hover:border-cyan/60 hover:text-white">
                <Phone className="h-4 w-4 text-cyan" aria-hidden="true" />
                {profile.phone}
              </a>
              <a href={profile.upworkUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-md border border-white/10 bg-black/20 px-4 py-3 transition hover:border-cyan/60 hover:text-white">
                <ExternalLink className="h-4 w-4 text-cyan" aria-hidden="true" />
                Upwork Profile
              </a>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button href={profile.upworkUrl} icon={BriefcaseBusiness}>Hire Me on Upwork</Button>
              <Button href={`mailto:${profile.email}`} variant="secondary" icon={MessageCircle}>Send Message</Button>
              <Button href="#portfolio" variant="secondary" icon={Play}>View Portfolio</Button>
            </div>
          </div>
          <form className="rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-premium">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-white/72">
                Name
                <input className="rounded-md border border-white/10 bg-black/25 px-4 py-3 text-white outline-none transition focus:border-cyan" placeholder="Your name" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-white/72">
                Email
                <input type="email" className="rounded-md border border-white/10 bg-black/25 px-4 py-3 text-white outline-none transition focus:border-cyan" placeholder={profile.email} />
              </label>
            </div>
            <label className="mt-4 grid gap-2 text-sm font-semibold text-white/72">
              Project Type
              <input className="rounded-md border border-white/10 bg-black/25 px-4 py-3 text-white outline-none transition focus:border-cyan" placeholder="AI ad, UGC edit, podcast shorts..." />
            </label>
            <label className="mt-4 grid gap-2 text-sm font-semibold text-white/72">
              Message
              <textarea className="min-h-36 rounded-md border border-white/10 bg-black/25 px-4 py-3 text-white outline-none transition focus:border-cyan" placeholder="Tell me about your goal, footage, deadline, and platform." />
            </label>
            <a href={`mailto:${profile.email}?subject=New video editing project brief`} className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-cyan px-5 text-sm font-bold text-ink transition hover:bg-white sm:w-auto">
              <Send className="h-4 w-4" aria-hidden="true" />
              Send Project Brief
            </a>
          </form>
        </div>
      </Section>
    </main>
  );
}

export default App;
