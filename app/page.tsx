"use client";

import Image from "next/image";
import { useState } from "react";

type PageKey = "about" | "cv" | "projects" | "contact";

// ─── COLORS (HSL, dark theme) ─────────────────────────────────────────────
// bg base:   hsl(222, 28%, 7%)
// card:      hsl(222, 28%, 11%)
// border:    hsl(222, 25%, 18%)
// text:      hsl(215, 25%, 92%)
// muted:     hsl(215, 15%, 55%)
// accent:    hsl(235, 80%, 68%)  indigo-ish
// ─────────────────────────────────────────────────────────────────────────

const C = {
  bg:      "bg-[hsl(222,28%,7%)]",
  card:    "bg-[hsl(222,28%,11%)]",
  border:  "border-[hsl(222,25%,18%)]",
  text:    "text-[hsl(215,25%,92%)]",
  muted:   "text-[hsl(215,15%,55%)]",
  accent:  "text-[hsl(235,80%,72%)]",
  accentBg:"bg-[hsl(235,80%,68%)]",
};

// ─── DATA ─────────────────────────────────────────────────────────────────

const skillGroups = [
  {
    label: "Engineering",
    color: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    items: ["Mechanical Design", "Fluid Dynamics", "FEA Analysis", "Machine Design", "Hydraulics"],
  },
  {
    label: "Software",
    color: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    items: ["SolidWorks", "3D Experience", "MATLAB", "FEMAP", "Python"],
  },
  {
    label: "Hardware",
    color: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    items: ["3D Printing", "Arduino", "Raspberry Pi"],
  },
  {
    label: "Languages",
    color: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    items: ["French — Native", "English — Fluent"],
  },
];

const education = [
  {
    degree:   "Master's in Mechanical Engineering",
    school:   "HES-SO Master · Lausanne, Switzerland",
    period:   "2025 – Present",
    desc:     "Advanced study in design, simulation, and applied mechanics. Deepening analytical and research capabilities.",
  },
  {
    degree:   "Bachelor's in Mechanical Engineering",
    school:   "Cal Poly Pomona · Pomona, USA",
    period:   "2018 – 2023",
    note:     "GPA 3.58",
    desc:     "Core curriculum in mechanical design, fluid dynamics, thermodynamics, and materials science.",
  },
];

const experience = [
  {
    title:   "Design Engineer I",
    company: "Griswold Industries DBA CLA-VAL",
    period:  "2023 – 2025",
    bullets: [
      "Designed and optimized components for aircraft refueling systems — nozzles, inline valves, couplers.",
      "Collaborated with engineering and sales teams to develop new products based on customer requirements.",
      "Developed and executed testing procedures ensuring compliance with industry standards.",
      "Designed custom testing fixtures to streamline product validation.",
      "Applied fluid dynamics principles to improve component performance and reliability.",
      "Performed structural analysis using SolidWorks FEA to evaluate durability under loading conditions.",
    ],
  },
  {
    title:   "Engineering Lab Tech Asst — Intern",
    company: "CLA-VAL Summer Internship",
    period:  "Jun – Aug 2022",
    bullets: [
      "Designed six mechanical assemblies using SolidWorks to client specifications.",
      "Contributed to the full product development cycle from concept to implementation.",
      "Designed structural brackets for the new 353GF coupler generation.",
    ],
  },
  {
    title:   "Co-Founder",
    company: "Safaran Boutique",
    period:  "2022 – 2023",
    bullets: [
      "Co-founded and operated a retail business with two partners.",
      "Managed sourcing, logistics, sales, and operational strategy.",
    ],
  },
];

const projects = [
  {
    num:    "01",
    label:  "Academic",
    color:  "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    title:  "NGCP Payload System — UGV",
    period: "2022 – 2023",
    desc:   "Designed and manufactured a complete payload system for an Unmanned Ground Vehicle for the NGCP competition. Integrated with a multidisciplinary team across the full development cycle.",
    tools:  ["SolidWorks", "MATLAB", "FEMAP", "3D Printing"],
  },
  {
    num:    "02",
    label:  "Personal",
    color:  "bg-amber-500/10 text-amber-300 border-amber-500/20",
    title:  "Arduino Door Lock Mechanism",
    period: "Jul – Aug 2021",
    desc:   "Designed and built a custom door lock mechanism combining Arduino control logic with 3D-printed mechanical components — concept to working prototype.",
    tools:  ["Arduino", "3D Printing", "CAD", "Embedded Systems"],
  },
];

const prints: { title: string; desc: string; src: string | null }[] = [
  { title: "Project 1", desc: "Short description.", src: null },
  { title: "Project 2", desc: "Short description.", src: null },
  { title: "Project 3", desc: "Short description.", src: null },
  { title: "Project 4", desc: "Short description.", src: null },
  { title: "Project 5", desc: "Short description.", src: null },
  { title: "Project 6", desc: "Short description.", src: null },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────

export default function Page() {
  const [page, setPage]   = useState<PageKey>("about");
  const [mob, setMob]     = useState(false);
  const [lb, setLb]       = useState<string | null>(null);

  const nav: { id: PageKey; label: string }[] = [
    { id: "about",    label: "About" },
    { id: "cv",       label: "CV" },
    { id: "projects", label: "Projects" },
    { id: "contact",  label: "Contact" },
  ];

  const go = (id: PageKey) => { setPage(id); setMob(false); };

  return (
    <div className={`min-h-screen ${C.bg} ${C.text}`}>

      {/* Lightbox */}
      {lb && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
          onClick={() => setLb(null)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img src={lb} alt="" className="max-h-[88vh] max-w-[88vw] object-contain rounded-lg" />
            <button
              onClick={() => setLb(null)}
              className={`absolute -top-10 right-0 text-sm ${C.muted} hover:text-white transition-colors`}
            >
              Close ✕
            </button>
          </div>
        </div>
      )}

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 border-b border-[hsl(222,25%,14%)] bg-[hsl(222,28%,7%)]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">

          <button
            onClick={() => go("about")}
            className="text-sm font-semibold text-white/90 hover:text-white transition-colors"
          >
            Victor Garnier
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  page === item.id
                    ? "bg-[hsl(235,80%,68%)]/15 text-[hsl(235,80%,80%)]"
                    : "text-[hsl(215,15%,55%)] hover:text-[hsl(215,25%,80%)] hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="/Victor_Garnier_CV.pdf"
              className="ml-2 px-4 py-1.5 rounded-full text-sm font-medium border border-[hsl(222,25%,22%)] text-[hsl(215,15%,55%)] hover:border-[hsl(222,25%,35%)] hover:text-[hsl(215,25%,80%)] transition-colors"
            >
              ↓ CV
            </a>
          </nav>

          <button
            onClick={() => setMob(!mob)}
            className="flex flex-col gap-1.5 p-1 md:hidden"
            aria-label="Menu"
          >
            <span className={`block h-px w-5 bg-white/60 transition-transform origin-center ${mob ? "translate-y-[6.5px] rotate-45" : ""}`} />
            <span className={`block h-px w-5 bg-white/60 transition-opacity ${mob ? "opacity-0" : ""}`} />
            <span className={`block h-px w-5 bg-white/60 transition-transform origin-center ${mob ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
          </button>
        </div>

        {mob && (
          <div className="border-t border-[hsl(222,25%,14%)] px-6 py-4 md:hidden space-y-1">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  page === item.id ? "bg-white/5 text-white" : "text-[hsl(215,15%,55%)]"
                }`}
              >
                {item.label}
              </button>
            ))}
            <a href="/Victor_Garnier_CV.pdf" className="block px-3 py-2 text-sm text-[hsl(215,15%,55%)]">↓ CV</a>
          </div>
        )}
      </header>

      {/* ── ABOUT ──────────────────────────────────────────────────────── */}
      {page === "about" && (
        <div>
          {/* Hero */}
          <section className="relative overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[hsl(235,80%,68%)]/60 to-transparent" />
            {/* Soft radial glow */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,hsl(235,80%,68%,0.07),transparent)]" />

            <div className="mx-auto max-w-5xl px-6 pt-20 pb-20 md:pt-28 md:pb-24">
              {/* Pill badge */}
              <div className="fade-in-up inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[hsl(235,80%,68%)]/20 bg-[hsl(235,80%,68%)]/8 mb-8">
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(235,80%,72%)] animate-pulse" />
                <span className="text-xs font-medium text-[hsl(235,80%,78%)]">
                  Mechanical Engineer · HES-SO Lausanne
                </span>
              </div>

              {/* Name */}
              <h1
                className="fade-in-up d1 gradient-text font-bold leading-none tracking-tight"
                style={{ fontSize: "clamp(48px, 8.5vw, 104px)", letterSpacing: "-0.025em" }}
              >
                Victor
                <br />
                Garnier
              </h1>

              {/* Tagline */}
              <p className="fade-in-up d2 mt-7 max-w-lg text-[17px] leading-7 text-[hsl(215,15%,60%)]">
                2 years designing aircraft refueling systems at CLA-VAL. Strong background
                in fluid dynamics, FEA, and mechanical design.
              </p>

              {/* CTAs */}
              <div className="fade-in-up d3 mt-9 flex flex-wrap gap-3">
                <button
                  onClick={() => go("contact")}
                  className="h-10 px-6 rounded-full bg-[hsl(235,80%,62%)] hover:bg-[hsl(235,80%,68%)] text-white text-sm font-semibold transition-colors shadow-lg shadow-[hsl(235,80%,62%)]/25"
                >
                  Get in touch
                </button>
                <a
                  href="/Victor_Garnier_CV.pdf"
                  className="h-10 px-6 rounded-full border border-[hsl(222,25%,22%)] text-[hsl(215,25%,75%)] text-sm font-medium hover:border-[hsl(222,25%,32%)] hover:bg-white/4 transition-colors flex items-center"
                >
                  Download CV
                </a>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="border-y border-[hsl(222,25%,14%)]">
            <div className="mx-auto max-w-5xl px-6">
              <dl className="flex divide-x divide-[hsl(222,25%,14%)]">
                {[
                  { value: "2 yrs",   label: "Industry experience" },
                  { value: "3.58",    label: "Bachelor's GPA" },
                  { value: "FE Exam", label: "NCEES Certified" },
                  { value: "M.Sc.",   label: "HES-SO Lausanne" },
                ].map((s) => (
                  <div key={s.label} className="flex-1 px-6 py-7 first:pl-0 last:pr-0">
                    <dt className="text-xs font-medium text-[hsl(215,15%,45%)] uppercase tracking-widest mb-1">
                      {s.label}
                    </dt>
                    <dd className="text-2xl font-bold text-white">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* About + Info */}
          <section className="mx-auto max-w-5xl px-6 py-16 grid gap-10 lg:grid-cols-[1fr_280px]">
            <div>
              <h2 className="text-xl font-semibold text-white mb-5">About me</h2>
              <div className="space-y-4 text-[15px] leading-7 text-[hsl(215,15%,60%)]">
                <p>
                  Mechanical engineer with a strong foundation in fluid dynamics, FEA, and product
                  design. I spent two years at Griswold Industries (CLA-VAL) designing and optimizing
                  aircraft refueling system components — nozzles, valves, and couplers — from initial
                  design through testing and validation.
                </p>
                <p>
                  Currently pursuing an M.Sc. in Mechanical Engineering at HES-SO Lausanne, developing
                  advanced analytical and simulation skills to complement my industry experience.
                </p>
                <p>
                  Outside of engineering, I enjoy 3D printing, Arduino/Raspberry Pi projects,
                  soccer, snowboarding, and music.
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => go("projects")}
                  className="text-sm font-medium text-[hsl(235,80%,75%)] hover:text-[hsl(235,80%,85%)] transition-colors"
                >
                  View projects →
                </button>
                <button
                  onClick={() => go("cv")}
                  className="text-sm font-medium text-[hsl(215,15%,50%)] hover:text-[hsl(215,15%,70%)] transition-colors"
                >
                  Full CV →
                </button>
              </div>
            </div>

            <aside className="space-y-3">
              <div className={`glow-card rounded-2xl border ${C.border} ${C.card} p-5`}>
                <p className="text-xs font-medium text-[hsl(215,15%,40%)] uppercase tracking-widest mb-3">
                  Current
                </p>
                <p className="font-semibold text-white text-sm">M.Sc. Student</p>
                <p className="text-sm text-[hsl(215,15%,55%)] mt-0.5">HES-SO Master · Lausanne</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Active
                </div>
              </div>
              <div className={`glow-card rounded-2xl border ${C.border} ${C.card} p-5`}>
                <p className="text-xs font-medium text-[hsl(215,15%,40%)] uppercase tracking-widest mb-3">
                  Previously
                </p>
                <p className="font-semibold text-white text-sm">Design Engineer I</p>
                <p className="text-sm text-[hsl(215,15%,55%)] mt-0.5">CLA-VAL · 2023–2025</p>
              </div>
              <div className={`glow-card rounded-2xl border ${C.border} ${C.card} p-5`}>
                <p className="text-xs font-medium text-[hsl(215,15%,40%)] uppercase tracking-widest mb-3">
                  Certified
                </p>
                <p className="font-semibold text-white text-sm">NCEES FE Exam</p>
                <p className="text-sm text-[hsl(215,15%,55%)] mt-0.5">Fundamentals of Engineering</p>
              </div>
            </aside>
          </section>

          {/* Skills */}
          <section className="border-t border-[hsl(222,25%,14%)] mx-auto max-w-5xl px-6 py-14">
            <h2 className="text-xs font-medium text-[hsl(215,15%,40%)] uppercase tracking-widest mb-8">
              Skills & Tools
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {skillGroups.map((g) => (
                <div key={g.label}>
                  <p className="text-xs font-semibold text-[hsl(215,15%,45%)] uppercase tracking-widest mb-3">
                    {g.label}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {g.items.map((item) => (
                      <span
                        key={item}
                        className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border ${g.color}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ── CV ─────────────────────────────────────────────────────────── */}
      {page === "cv" && (
        <div className="fade-in-up mx-auto max-w-5xl px-6 py-16">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-medium text-[hsl(215,15%,40%)] uppercase tracking-widest mb-2">
                Curriculum Vitae
              </p>
              <h2 className="text-3xl font-bold text-white">Education & Experience</h2>
            </div>
            <a
              href="/Victor_Garnier_CV.pdf"
              className="text-sm text-[hsl(235,80%,72%)] hover:text-[hsl(235,80%,82%)] transition-colors"
            >
              Download PDF ↓
            </a>
          </div>

          {[
            { heading: "Education", rows: education, dotColor: "bg-[hsl(235,80%,68%)]" },
            { heading: "Work Experience", rows: experience, dotColor: "bg-[hsl(215,15%,45%)]" },
          ].map((section) => (
            <div key={section.heading} className="mb-14">
              <div className="flex items-center gap-4 mb-7">
                <p className="text-xs font-medium text-[hsl(215,15%,40%)] uppercase tracking-widest shrink-0">
                  {section.heading}
                </p>
                <div className="flex-1 h-px bg-[hsl(222,25%,16%)]" />
              </div>
              <div className="relative space-y-6 before:absolute before:left-[5px] before:top-3 before:bottom-3 before:w-px before:bg-[hsl(222,25%,18%)]">
                {section.rows.map((row: typeof education[0] | typeof experience[0]) => (
                  <div key={"degree" in row ? row.degree : row.title} className="relative pl-7">
                    <div className={`absolute left-0 top-[7px] h-2.5 w-2.5 rounded-full ${section.dotColor} ring-4 ring-[hsl(222,28%,7%)]`} />
                    <div className={`glow-card rounded-2xl border ${C.border} ${C.card} p-5`}>
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <div>
                          <h3 className="font-semibold text-white">
                            {"degree" in row ? row.degree : row.title}
                          </h3>
                          <p className="text-sm text-[hsl(215,15%,55%)] mt-0.5">
                            {"school" in row ? row.school : (row as typeof experience[0]).company}
                            {"note" in row && row.note ? ` · ${row.note}` : ""}
                          </p>
                        </div>
                        <span className="text-xs font-medium text-[hsl(215,15%,45%)] shrink-0">
                          {row.period}
                        </span>
                      </div>
                      {"desc" in row && row.desc && (
                        <p className="text-sm text-[hsl(215,15%,55%)] leading-6">{row.desc}</p>
                      )}
                      {"bullets" in row && row.bullets && (
                        <ul className="mt-2 space-y-1.5">
                          {row.bullets.map((b: string) => (
                            <li key={b} className="flex items-start gap-2 text-sm text-[hsl(215,15%,55%)] leading-6">
                              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[hsl(215,15%,35%)]" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Certification */}
          <div>
            <div className="flex items-center gap-4 mb-7">
              <p className="text-xs font-medium text-[hsl(215,15%,40%)] uppercase tracking-widest shrink-0">
                Certification
              </p>
              <div className="flex-1 h-px bg-[hsl(222,25%,16%)]" />
            </div>
            <div className={`glow-card rounded-2xl border ${C.border} ${C.card} p-5`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-white">NCEES — Fundamentals of Engineering (FE)</h3>
                  <p className="text-sm text-[hsl(215,15%,55%)] mt-0.5">NCEES</p>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  Completed
                </span>
              </div>
              <p className="mt-3 text-sm text-[hsl(215,15%,55%)] leading-6">
                First step toward becoming a licensed Professional Engineer. Demonstrates foundational
                competency across all core engineering disciplines.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── PROJECTS ────────────────────────────────────────────────────── */}
      {page === "projects" && (
        <div className="fade-in-up mx-auto max-w-5xl px-6 py-16">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-medium text-[hsl(215,15%,40%)] uppercase tracking-widest mb-2">
                Selected Work
              </p>
              <h2 className="text-3xl font-bold text-white">Projects</h2>
            </div>
            <a
              href="https://github.com/bots4fun"
              className="text-sm text-[hsl(235,80%,72%)] hover:text-[hsl(235,80%,82%)] transition-colors"
            >
              GitHub →
            </a>
          </div>

          {/* Engineering */}
          <div className="grid gap-5 md:grid-cols-2 mb-16">
            {projects.map((p) => (
              <article key={p.num} className={`glow-card rounded-2xl border ${C.border} ${C.card} p-7 flex flex-col`}>
                <div className="flex items-start justify-between mb-5">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${p.color}`}>
                    {p.label}
                  </span>
                  <span className="text-3xl font-black text-[hsl(222,25%,18%)] select-none leading-none">
                    {p.num}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{p.title}</h3>
                <p className="text-sm text-[hsl(215,15%,55%)] leading-6 flex-1">{p.desc}</p>
                <div className="mt-6 pt-5 border-t border-[hsl(222,25%,16%)] flex flex-wrap gap-2">
                  {p.tools.map((t) => (
                    <span key={t} className="text-xs text-[hsl(215,15%,50%)] font-medium">{t}</span>
                  ))}
                </div>
                <p className="mt-2 text-xs text-[hsl(215,15%,38%)]">{p.period}</p>
              </article>
            ))}
          </div>

          {/* 3D Printing */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <p className="text-xs font-medium text-[hsl(215,15%,40%)] uppercase tracking-widest shrink-0">
                3D Printing
              </p>
              <div className="flex-1 h-px bg-[hsl(222,25%,16%)]" />
              <p className="text-xs text-[hsl(215,15%,35%)] shrink-0">
                Add images to <code className="font-mono bg-[hsl(222,28%,14%)] px-1 py-0.5 rounded">/public/projects/</code>
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {prints.map((item, i) => (
                <div key={i} className={`glow-card rounded-2xl border ${C.border} overflow-hidden ${C.card}`}>
                  {item.src ? (
                    <button
                      className="relative block w-full aspect-[4/3] overflow-hidden"
                      onClick={() => item.src && setLb(item.src)}
                    >
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </button>
                  ) : (
                    <div className="aspect-[4/3] bg-[hsl(222,28%,9%)] flex flex-col items-center justify-center gap-2">
                      <svg className="h-8 w-8 text-[hsl(215,15%,22%)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-xs text-[hsl(215,15%,28%)]">No image yet</p>
                    </div>
                  )}
                  <div className="p-4">
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="text-xs text-[hsl(215,15%,50%)] mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── CONTACT ─────────────────────────────────────────────────────── */}
      {page === "contact" && (
        <div className="fade-in-up relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[hsl(235,80%,68%)]/50 to-transparent" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,hsl(235,80%,68%,0.06),transparent)]" />

          <div className="mx-auto max-w-5xl px-6 py-20">
            <p className="text-xs font-medium text-[hsl(215,15%,40%)] uppercase tracking-widest mb-4">
              Contact
            </p>
            <h2
              className="gradient-text font-bold leading-none tracking-tight mb-14"
              style={{ fontSize: "clamp(40px, 6vw, 76px)", letterSpacing: "-0.02em" }}
            >
              Let's build
              <br />
              something.
            </h2>

            <div className="grid gap-8 md:grid-cols-[1fr_300px]">
              <div>
                {[
                  { label: "Email",    value: "vgarnier0125@gmail.com", href: "mailto:vgarnier0125@gmail.com" },
                  { label: "Phone",    value: "+41 78 601 73 05",       href: "tel:+41786017305" },
                  { label: "GitHub",   value: "github.com/bots4fun",    href: "https://github.com/bots4fun" },
                  { label: "Location", value: "Lausanne, Switzerland",  href: null },
                ].map((item, idx, arr) => {
                  const inner = (
                    <div className={`py-5 flex items-center justify-between group ${idx < arr.length - 1 ? "border-b border-[hsl(222,25%,14%)]" : ""}`}>
                      <span className="text-xs font-medium uppercase tracking-widest text-[hsl(215,15%,40%)] w-24">
                        {item.label}
                      </span>
                      <span className="text-[15px] text-[hsl(215,25%,75%)] group-hover:text-white transition-colors">
                        {item.value}
                      </span>
                    </div>
                  );
                  return item.href
                    ? <a key={item.label} href={item.href}>{inner}</a>
                    : <div key={item.label}>{inner}</div>;
                })}
              </div>

              <div className={`glow-card rounded-2xl border ${C.border} ${C.card} p-6 self-start`}>
                <p className="text-xs font-medium text-[hsl(215,15%,40%)] uppercase tracking-widest mb-5">
                  Open to
                </p>
                <ul className="space-y-3">
                  {[
                    "Mechanical design & engineering roles",
                    "Fluid systems and hydraulics projects",
                    "R&D and simulation-driven positions",
                    "3D printing and prototyping work",
                    "Embedded systems side projects",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[hsl(215,15%,58%)] leading-6">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(235,80%,68%)]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-5 border-t border-[hsl(222,25%,16%)] text-xs text-[hsl(215,15%,38%)] space-y-1">
                  <p>Lausanne, Switzerland</p>
                  <p>French & English</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-[hsl(222,25%,12%)] mt-8">
        <div className="mx-auto max-w-5xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[hsl(215,15%,35%)]">© 2026 Victor Garnier</p>
          <div className="flex items-center gap-5">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className="text-xs text-[hsl(215,15%,35%)] hover:text-[hsl(215,15%,60%)] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
