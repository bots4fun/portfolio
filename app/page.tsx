"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type PageKey = "about" | "cv" | "projects" | "contact";

// ─── DATA ────────────────────────────────────────────────────────────────────

const skillGroups = [
  { label: "Engineering",    items: ["Mechanical Design", "Fluid Dynamics (CFD)", "FEA Analysis", "Machine Design", "Hydraulics"] },
  { label: "Software",       items: ["SolidWorks", "3D Experience", "MATLAB", "FEMAP", "Python"] },
  { label: "Hardware",       items: ["3D Printing", "Arduino", "Raspberry Pi"] },
  { label: "Languages",      items: ["French — Native", "English — Fluent"] },
];

const cvRows: {
  period: string;
  title: string;
  sub: string;
  note?: string;
  bullets?: string[];
}[] = [
  {
    period: "2025 – Present",
    title: "M.Sc. Mechanical Engineering",
    sub: "HES-SO Master · Lausanne, Switzerland",
    bullets: ["Advanced analytical and research capabilities in design, simulation, and applied mechanics."],
  },
  {
    period: "2018 – 2023",
    title: "B.Sc. Mechanical Engineering",
    sub: "Cal Poly Pomona · Pomona, USA",
    note: "GPA 3.58",
    bullets: ["Core curriculum in mechanical design, fluid dynamics, thermodynamics, and materials science."],
  },
  {
    period: "2023 – 2025",
    title: "Design Engineer I",
    sub: "Griswold Industries DBA CLA-VAL",
    bullets: [
      "Designed and optimized components for aircraft refueling systems — nozzles, inline valves, couplers.",
      "Collaborated with engineering and sales teams to develop and improve products based on customer requirements.",
      "Developed and executed testing procedures ensuring compliance with industry standards.",
      "Designed custom testing fixtures to streamline product validation and improve efficiency.",
      "Applied fluid dynamics principles to improve component performance and reliability.",
      "Performed structural analysis using SolidWorks FEA to evaluate durability under loading conditions.",
    ],
  },
  {
    period: "Jun – Aug 2022",
    title: "Engineering Lab Tech Asst — Intern",
    sub: "CLA-VAL Summer Internship",
    bullets: [
      "Designed six mechanical assemblies using SolidWorks to client specifications.",
      "Contributed to the full product development cycle from concept to implementation.",
      "Designed structural brackets for the new 353GF coupler generation.",
    ],
  },
  {
    period: "2022 – 2023",
    title: "Co-Founder",
    sub: "Safaran Boutique",
    bullets: [
      "Co-founded and operated a retail business with two partners.",
      "Managed sourcing, logistics, sales, and operational strategy.",
    ],
  },
  {
    period: "Completed",
    title: "NCEES — Fundamentals of Engineering (FE)",
    sub: "Certification · NCEES",
    bullets: ["First step toward becoming a licensed Professional Engineer."],
  },
];

const projects = [
  {
    num: "01",
    title: "NGCP Payload System — UGV",
    type: "Academic",
    period: "2022 – 2023",
    desc: "Designed and manufactured a complete payload system for an Unmanned Ground Vehicle as part of the NGCP competition. Integrated system with a multidisciplinary team.",
    tools: ["SolidWorks", "MATLAB", "FEMAP", "3D Printing"],
  },
  {
    num: "02",
    title: "Arduino Door Lock Mechanism",
    type: "Personal",
    period: "Jul – Aug 2021",
    desc: "Designed and built a custom door lock mechanism combining Arduino control logic with 3D-printed mechanical components — from concept to working prototype.",
    tools: ["Arduino", "3D Printing", "CAD"],
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

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function Page() {
  const [page, setPage]         = useState<PageKey>("about");
  const [mobileOpen, setMobile] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const glowRef                 = useRef<HTMLDivElement>(null);

  const nav: { id: PageKey; label: string }[] = [
    { id: "about",    label: "About" },
    { id: "cv",       label: "CV" },
    { id: "projects", label: "Projects" },
    { id: "contact",  label: "Contact" },
  ];

  const go = (id: PageKey) => { setPage(id); setMobile(false); };

  // Cursor-following warm glow — direct DOM write, zero React re-render
  const onMouseMove = (e: React.MouseEvent) => {
    if (glowRef.current) {
      glowRef.current.style.background =
        `radial-gradient(700px circle at ${e.clientX}px ${e.clientY}px, rgba(214,196,168,0.13), transparent 55%)`;
    }
  };

  return (
    <div
      className="min-h-screen bg-stone-50 text-stone-900 selection:bg-stone-200"
      onMouseMove={onMouseMove}
    >
      {/* Cursor glow — fixed so it works across the whole page */}
      <div ref={glowRef} className="fixed inset-0 pointer-events-none z-10" />

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-sm p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox} alt="" className="max-h-[90vh] max-w-[90vw] object-contain" />
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-10 right-0 text-sm text-stone-400 hover:text-white transition-colors"
            >
              Close ✕
            </button>
          </div>
        </div>
      )}

      {/* ── HEADER ── */}
      <header className="relative z-20 sticky top-0 bg-stone-50/90 backdrop-blur border-b border-stone-200">
        <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">

          <button
            onClick={() => go("about")}
            className="text-sm font-semibold text-stone-900 hover:text-stone-500 transition-colors"
          >
            Victor Garnier
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`text-sm transition-colors ${
                  page === item.id
                    ? "text-stone-900 font-medium"
                    : "text-stone-400 hover:text-stone-700"
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="/Victor_Garnier_CV.pdf"
              className="text-sm text-stone-400 hover:text-stone-700 transition-colors"
            >
              ↓ CV
            </a>
          </nav>

          <button
            onClick={() => setMobile(!mobileOpen)}
            className="md:hidden flex flex-col gap-[5px] p-1"
            aria-label="Menu"
          >
            <span className={`block h-px w-5 bg-stone-600 transition-transform origin-center ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-px w-5 bg-stone-600 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-5 bg-stone-600 transition-transform origin-center ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-stone-100 bg-stone-50 px-6 py-5 md:hidden space-y-4">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`block text-sm ${page === item.id ? "text-stone-900 font-medium" : "text-stone-400"}`}
              >
                {item.label}
              </button>
            ))}
            <a href="/Victor_Garnier_CV.pdf" className="block text-sm text-stone-400">↓ CV</a>
          </div>
        )}
      </header>

      {/* ── CONTENT ── */}
      <div className="relative z-20">

        {/* ═══ ABOUT ═══ */}
        {page === "about" && (
          <div>
            {/* Hero */}
            <section className="mx-auto max-w-5xl px-6 pt-20 pb-16 md:pt-28 md:pb-20">
              <p className="slide-up text-xs font-medium uppercase tracking-[0.25em] text-stone-400">
                Mechanical Engineer
              </p>

              <h1
                className="slide-up slide-up-d1 font-bold text-stone-900 leading-none mt-5"
                style={{ fontSize: "clamp(52px, 9vw, 108px)", letterSpacing: "-0.025em" }}
              >
                Victor
                <br />
                Garnier
              </h1>

              <div className="slide-up slide-up-d2 mt-10 h-px bg-stone-200" />

              <div className="slide-up slide-up-d3 mt-10 grid gap-8 md:grid-cols-[1fr_auto]">
                <p className="max-w-md text-[15px] leading-7 text-stone-500">
                  2 years designing aircraft refueling systems at CLA-VAL.
                  Strong background in fluid dynamics, FEA, and mechanical design.
                  Currently pursuing an M.Sc. in Mechanical Engineering at HES-SO Lausanne.
                </p>
                <div className="grid grid-cols-2 gap-x-12 gap-y-4 content-start text-sm">
                  {[
                    ["Status",       "M.Sc. Student — Active"],
                    ["Location",     "Lausanne, Switzerland"],
                    ["Previously",   "Design Engineer I, CLA-VAL"],
                    ["Certified",    "NCEES FE Exam"],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="text-[11px] uppercase tracking-widest text-stone-400 mb-0.5">{label}</p>
                      <p className="text-stone-700 text-sm">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  onClick={() => go("contact")}
                  className="h-10 px-6 bg-stone-900 text-stone-50 text-sm font-medium rounded-full hover:bg-stone-700 transition-colors"
                >
                  Get in touch
                </button>
                <a
                  href="/Victor_Garnier_CV.pdf"
                  className="h-10 px-6 border border-stone-200 text-stone-600 text-sm font-medium rounded-full hover:bg-stone-100 transition-colors flex items-center"
                >
                  Download CV
                </a>
              </div>
            </section>

            {/* Stats strip */}
            <section className="border-y border-stone-200">
              <div className="mx-auto max-w-5xl px-6">
                <div className="flex divide-x divide-stone-200">
                  {[
                    { value: "2 yrs",    label: "Industry experience" },
                    { value: "3.58",     label: "Bachelor's GPA" },
                    { value: "FE Exam",  label: "NCEES Certified" },
                    { value: "M.Sc.",    label: "HES-SO Lausanne" },
                  ].map((s) => (
                    <div key={s.label} className="flex-1 px-6 py-8 first:pl-0 last:pr-0">
                      <p className="text-2xl font-semibold text-stone-900">{s.value}</p>
                      <p className="mt-1 text-xs text-stone-400">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Skills */}
            <section className="mx-auto max-w-5xl px-6 py-16">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-stone-400 mb-10">
                Skills
              </p>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {skillGroups.map((g) => (
                  <div key={g.label}>
                    <p className="text-xs font-medium uppercase tracking-widest text-stone-400 mb-3">
                      {g.label}
                    </p>
                    <ul className="space-y-1.5">
                      {g.items.map((item) => (
                        <li key={item} className="text-sm text-stone-600">{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ═══ CV ═══ */}
        {page === "cv" && (
          <div className="slide-up mx-auto max-w-5xl px-6 py-16">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-stone-400">
                  Curriculum Vitae
                </p>
                <h2 className="mt-2 text-3xl font-bold text-stone-900">
                  Education & Experience
                </h2>
              </div>
              <a
                href="/Victor_Garnier_CV.pdf"
                className="text-sm text-stone-400 hover:text-stone-700 transition-colors underline underline-offset-4"
              >
                Download PDF ↓
              </a>
            </div>

            {/* Document-style table */}
            <div className="space-y-0">
              {/* Section headers */}
              {[
                {
                  heading: "Education",
                  rows: cvRows.slice(0, 2),
                },
                {
                  heading: "Work Experience",
                  rows: cvRows.slice(2, 5),
                },
                {
                  heading: "Certification",
                  rows: cvRows.slice(5),
                },
              ].map((section) => (
                <div key={section.heading} className="mb-10">
                  <div className="flex items-center gap-4 mb-6">
                    <p className="text-xs font-medium uppercase tracking-[0.25em] text-stone-400 shrink-0">
                      {section.heading}
                    </p>
                    <div className="flex-1 h-px bg-stone-200" />
                  </div>
                  <div className="space-y-8">
                    {section.rows.map((row) => (
                      <div
                        key={row.title}
                        className="grid gap-2 md:grid-cols-[180px_1fr]"
                      >
                        <div className="pt-0.5">
                          <p className="text-xs text-stone-400 font-medium">{row.period}</p>
                          {row.note && (
                            <p className="text-xs text-stone-400 mt-0.5">{row.note}</p>
                          )}
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-stone-900">{row.title}</h3>
                          <p className="text-sm text-stone-500 mt-0.5">{row.sub}</p>
                          {row.bullets && row.bullets.length > 0 && (
                            <ul className="mt-3 space-y-1.5">
                              {row.bullets.map((b) => (
                                <li key={b} className="text-sm text-stone-500 leading-6 flex gap-2">
                                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-stone-300" />
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
            </div>
          </div>
        )}

        {/* ═══ PROJECTS ═══ */}
        {page === "projects" && (
          <div className="slide-up mx-auto max-w-5xl px-6 py-16">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-stone-400">Projects</p>
            <h2 className="mt-2 text-3xl font-bold text-stone-900 mb-12">Selected Work</h2>

            {/* Engineering projects — full-width rows */}
            <div>
              {projects.map((p, i) => (
                <div key={p.num}>
                  {i === 0 && <div className="h-px bg-stone-200" />}
                  <div className="py-10 grid gap-4 md:grid-cols-[80px_1fr_200px]">
                    <p className="text-4xl font-bold text-stone-100 select-none leading-none pt-1">
                      {p.num}
                    </p>
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-stone-900">{p.title}</h3>
                        <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">
                          {p.type}
                        </span>
                      </div>
                      <p className="text-sm text-stone-500 leading-6 max-w-xl">{p.desc}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {p.tools.map((t) => (
                          <span key={t} className="text-xs text-stone-400">{t}</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-stone-400 md:text-right">{p.period}</p>
                  </div>
                  <div className="h-px bg-stone-200" />
                </div>
              ))}
            </div>

            {/* 3D printing */}
            <div className="mt-16">
              <div className="flex items-center gap-4 mb-8">
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-stone-400 shrink-0">
                  3D Printing
                </p>
                <div className="flex-1 h-px bg-stone-200" />
                <p className="text-xs text-stone-400 shrink-0">
                  Drop images into <code className="font-mono bg-stone-100 px-1 rounded">/public/projects/</code>
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {prints.map((item, i) => (
                  <div key={i} className="group">
                    {item.src ? (
                      <button
                        className="relative block w-full aspect-[4/3] overflow-hidden bg-stone-100"
                        onClick={() => item.src && setLightbox(item.src)}
                      >
                        <Image
                          src={item.src}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </button>
                    ) : (
                      <div className="w-full aspect-[4/3] bg-stone-100 flex items-center justify-center">
                        <span className="text-xs text-stone-300">No image</span>
                      </div>
                    )}
                    <div className="mt-3">
                      <p className="text-sm font-medium text-stone-700">{item.title}</p>
                      <p className="text-xs text-stone-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ CONTACT ═══ */}
        {page === "contact" && (
          <div className="slide-up mx-auto max-w-5xl px-6 py-16">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-stone-400">Contact</p>

            <h2
              className="font-bold text-stone-900 leading-none mt-4 mb-16"
              style={{ fontSize: "clamp(40px, 6vw, 80px)", letterSpacing: "-0.02em" }}
            >
              Let's connect.
            </h2>

            <div className="grid gap-12 md:grid-cols-[1fr_300px]">
              {/* Contact items */}
              <div>
                {[
                  { label: "Email",    value: "vgarnier0125@gmail.com", href: "mailto:vgarnier0125@gmail.com" },
                  { label: "Phone",    value: "+41 78 601 73 05",       href: "tel:+41786017305" },
                  { label: "GitHub",   value: "github.com/bots4fun",    href: "https://github.com/bots4fun" },
                  { label: "Location", value: "Lausanne, Switzerland",  href: null },
                ].map((item, i, arr) => {
                  const inner = (
                    <div className={`py-5 flex items-center justify-between group ${i < arr.length - 1 ? "border-b border-stone-200" : ""}`}>
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400 w-24">
                        {item.label}
                      </p>
                      <p className="text-base text-stone-700 group-hover:text-stone-900 transition-colors flex-1 text-right">
                        {item.value}
                      </p>
                    </div>
                  );
                  return item.href
                    ? <a key={item.label} href={item.href}>{inner}</a>
                    : <div key={item.label}>{inner}</div>;
                })}
              </div>

              {/* Open to */}
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-stone-400 mb-6">
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
                    <li key={item} className="text-sm text-stone-500 leading-6">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-stone-200 space-y-1 text-xs text-stone-400">
                  <p>Lausanne, Switzerland</p>
                  <p>French & English</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── FOOTER ── */}
      <footer className="relative z-20 border-t border-stone-200 mt-8">
        <div className="mx-auto max-w-5xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-400">© 2026 Victor Garnier — Mechanical Engineer</p>
          <div className="flex items-center gap-6">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className="text-xs text-stone-400 hover:text-stone-700 transition-colors"
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
