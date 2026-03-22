"use client";

import Image from "next/image";
import { useState } from "react";

type PageKey = "about" | "cv" | "projects" | "contact";

// ─── DATA ────────────────────────────────────────────────────────────────────

const skills = {
  "// ENGINEERING": ["Mechanical Design", "Fluid Dynamics (CFD)", "FEA Analysis", "Machine Design", "Hydraulics"],
  "// SOFTWARE":    ["SolidWorks", "3D Experience", "Python", "MATLAB", "FEMAP"],
  "// HARDWARE":    ["3D Printing", "Arduino", "Raspberry Pi"],
  "// LANGUAGES":   ["French (Native)", "English (Fluent)"],
};

const education = [
  {
    ref: "EDU-01",
    degree: "Master's in Mechanical Engineering",
    institution: "HES-SO Master",
    location: "Lausanne, Switzerland",
    period: "2025 – Present",
    description: "Advanced study developing analytical and research capabilities in design, simulation, and applied mechanics.",
  },
  {
    ref: "EDU-02",
    degree: "Bachelor's in Mechanical Engineering",
    institution: "Cal Poly Pomona",
    location: "Pomona, USA",
    period: "2018 – 2023",
    gpa: "GPA 3.58",
    description: "Core curriculum covering mechanical design, fluid dynamics, thermodynamics, and materials science.",
  },
];

const experience = [
  {
    ref: "EXP-01",
    title: "Design Engineer I",
    company: "Griswold Industries DBA CLA-VAL",
    period: "2023 – 2025",
    bullets: [
      "Designed and optimized components for aircraft refueling systems — nozzles, inline valves, couplers.",
      "Collaborated with engineering management and sales teams to develop new products based on customer requirements.",
      "Developed and executed testing procedures for mechanical devices ensuring compliance with industry standards.",
      "Designed custom testing fixtures to streamline product validation and improve testing efficiency.",
      "Applied fluid dynamics and mechanical design principles to improve component performance and reliability.",
      "Performed structural analysis using SolidWorks FEA to evaluate durability under loading conditions.",
    ],
  },
  {
    ref: "EXP-02",
    title: "Engineering Lab Tech Asst – Intern",
    company: "CLA-VAL Summer Internship",
    period: "Jun – Aug 2022",
    bullets: [
      "Designed six mechanical assemblies using SolidWorks to client specifications.",
      "Contributed to the full product development cycle, from concept to final implementation.",
      "Designed structural brackets for the new 353GF coupler generation.",
      "Assisted in on-site installation and troubleshooting of industrial valves.",
    ],
  },
  {
    ref: "EXP-03",
    title: "Co-Founder",
    company: "Safaran Boutique",
    period: "2022 – 2023",
    bullets: [
      "Co-founded a retail business with two partners.",
      "Managed sourcing, logistics, sales, and operational strategy.",
      "Developed problem-solving and management skills in a real-world business context.",
    ],
  },
];

const engineeringProjects = [
  {
    ref: "P-001",
    title: "NGCP Payload System — UGV",
    category: "BACHELOR'S PROJECT",
    period: "2022 – 2023",
    description: "Designed and manufactured a complete payload system for an Unmanned Ground Vehicle for the NGCP competition.",
    bullets: [
      "→ Designed and manufactured full payload system for a UGV platform.",
      "→ Used SolidWorks, MATLAB, FEMAP, and 3D printing during development.",
      "→ Integrated system with a multidisciplinary team.",
      "→ Presented technical results during design reviews.",
    ],
    tools: ["SolidWorks", "MATLAB", "FEMAP", "3D Printing"],
  },
  {
    ref: "P-002",
    title: "Arduino Door Lock Mechanism",
    category: "PERSONAL PROJECT",
    period: "Jul – Aug 2021",
    description: "Designed and built a custom door lock mechanism combining Arduino logic with 3D-printed mechanical components.",
    bullets: [
      "→ Full design from concept to working prototype.",
      "→ 3D-printed all mechanical components.",
      "→ Programmed Arduino for system control logic.",
      "→ Gained practical experience in embedded systems and rapid prototyping.",
    ],
    tools: ["Arduino", "3D Printing", "CAD", "Embedded Systems"],
  },
];

// → Drop your images into /public/projects/ and set src below.
const printingProjects: { title: string; description: string; src: string | null }[] = [
  { title: "Project 1", description: "Short description of this print.", src: null },
  { title: "Project 2", description: "Short description of this print.", src: null },
  { title: "Project 3", description: "Short description of this print.", src: null },
  { title: "Project 4", description: "Short description of this print.", src: null },
  { title: "Project 5", description: "Short description of this print.", src: null },
  { title: "Project 6", description: "Short description of this print.", src: null },
];

// ─── SMALL COMPONENTS ────────────────────────────────────────────────────────

function Tag({ label }: { label: string }) {
  return (
    <span className="font-mono text-[11px] border border-zinc-800 px-2 py-0.5 text-zinc-500 hover:border-cyan-400/40 hover:text-zinc-300 transition-colors">
      [{label}]
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-400/60 mb-1">
      {children}
    </p>
  );
}

// Corner bracket decoration around a card
function Bracketed({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-cyan-400/30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-cyan-400/30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-cyan-400/30 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-cyan-400/30 pointer-events-none" />
      {children}
    </div>
  );
}

// Diamond timeline node
function DiamondNode({ color = "border-cyan-400" }: { color?: string }) {
  return (
    <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rotate-45 border-2 ${color} bg-zinc-950`} />
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function Page() {
  const [page, setPage] = useState<PageKey>("about");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const navItems: { id: PageKey; num: string; label: string }[] = [
    { id: "about",    num: "01", label: "About" },
    { id: "cv",       num: "02", label: "CV" },
    { id: "projects", num: "03", label: "Projects" },
    { id: "contact",  num: "04", label: "Contact" },
  ];

  const go = (id: PageKey) => { setPage(id); setMobileOpen(false); };

  return (
    <div className="min-h-screen text-zinc-100">

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox} alt="Project" className="max-h-[88vh] max-w-[90vw] object-contain" />
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-5 -right-5 font-mono text-xs border border-zinc-600 bg-zinc-900 px-3 py-1.5 text-zinc-400 hover:border-cyan-400 hover:text-cyan-400 transition"
            >
              [✕ CLOSE]
            </button>
          </div>
        </div>
      )}

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-30 bg-zinc-950/95 backdrop-blur border-b border-zinc-800/60">
        <div className="mx-auto max-w-6xl px-6 flex items-stretch justify-between">

          <button onClick={() => go("about")} className="py-4 text-left group">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-400/60">
              // Mechanical Engineer
            </p>
            <p className="text-base font-bold text-zinc-100 group-hover:text-cyan-400 transition-colors">
              Victor Garnier
            </p>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-stretch gap-0">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`flex items-center gap-2 px-5 text-sm font-medium border-b-2 transition-colors ${
                  page === item.id
                    ? "text-cyan-400 border-cyan-400"
                    : "text-zinc-500 border-transparent hover:text-zinc-300"
                }`}
              >
                <span className="font-mono text-[10px] text-cyan-400/40">{item.num}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/Victor_Garnier_CV.pdf"
              className="hidden md:block font-mono text-[11px] border border-zinc-700 px-4 py-2 text-zinc-400 hover:border-cyan-400/60 hover:text-cyan-400 transition-colors"
            >
              → CV.pdf
            </a>
            {/* Mobile hamburger */}
            <button
              className="flex flex-col gap-1.5 py-4 md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block h-px w-5 bg-zinc-400 transition-transform ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`block h-px w-5 bg-zinc-400 transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px w-5 bg-zinc-400 transition-transform ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-zinc-800 bg-zinc-950 px-6 py-4 md:hidden">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`flex items-center gap-3 w-full py-3 text-sm font-medium border-b border-zinc-800/40 ${
                  page === item.id ? "text-cyan-400" : "text-zinc-400"
                }`}
              >
                <span className="font-mono text-[10px] text-cyan-400/40">{item.num}</span>
                {item.label}
              </button>
            ))}
            <a
              href="/Victor_Garnier_CV.pdf"
              className="mt-3 block font-mono text-[11px] border border-zinc-700 px-4 py-2.5 text-center text-zinc-400"
            >
              → CV.pdf
            </a>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 space-y-4">

        {/* ── ABOUT ── */}
        {page === "about" && (
          <>
            {/* Hero */}
            <Bracketed className="border border-zinc-800 bg-zinc-900/40 p-8 md:p-12">
              {/* GD&T diameter symbol — decorative watermark */}
              <div
                className="absolute right-6 top-1/2 -translate-y-1/2 select-none pointer-events-none font-black leading-none text-zinc-800/30"
                style={{ fontSize: "clamp(120px, 18vw, 220px)" }}
                aria-hidden
              >
                ⌀
              </div>

              <div className="relative grid gap-8 lg:grid-cols-[1fr_320px] items-start">
                {/* Left — name + bio */}
                <div>
                  <SectionLabel>SUBJECT: Mechanical Engineer</SectionLabel>
                  <h1
                    className="font-black tracking-tighter text-zinc-100 leading-[0.9] mt-4"
                    style={{ fontSize: "clamp(52px, 9vw, 92px)" }}
                  >
                    Victor<br />Garnier
                  </h1>
                  <div className="mt-6 h-px bg-zinc-800" />
                  <p className="mt-6 text-[15px] leading-7 text-zinc-400 max-w-xl">
                    Mechanical Engineer with 2 years of industry experience designing and optimizing
                    aircraft refueling systems. Strong background in fluid dynamics, FEA, and
                    mechanical design. Currently pursuing an M.Sc. at HES-SO Lausanne.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <button
                      onClick={() => go("contact")}
                      className="bg-cyan-400 text-zinc-950 px-6 py-3 text-sm font-semibold font-mono hover:bg-cyan-300 transition-colors"
                    >
                      → Contact
                    </button>
                    <a
                      href="/Victor_Garnier_CV.pdf"
                      className="border border-zinc-700 text-zinc-300 px-6 py-3 text-sm font-mono hover:border-zinc-500 hover:text-zinc-100 transition-colors"
                    >
                      → CV.pdf
                    </a>
                  </div>
                </div>

                {/* Right — spec sheet */}
                <div className="border border-zinc-800 bg-zinc-950/60">
                  <div className="border-b border-zinc-800 px-5 py-3">
                    <SectionLabel>// SPECIFICATIONS</SectionLabel>
                  </div>
                  <div className="divide-y divide-zinc-800/50">
                    {[
                      { label: "LOCATION",      value: "Lausanne, CH" },
                      { label: "DEGREE",        value: "M.Sc. Mech. Eng." },
                      { label: "INSTITUTION",   value: "HES-SO Master" },
                      { label: "STATUS",        value: "● Active" },
                      { label: "PREV. ROLE",    value: "Design Engineer I" },
                      { label: "CERTIFICATION", value: "NCEES FE Exam" },
                      { label: "EXPERIENCE",    value: "2 yrs industry" },
                    ].map((row) => (
                      <div key={row.label} className="flex items-center justify-between px-5 py-2.5 gap-4">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600 shrink-0">
                          {row.label}
                        </span>
                        <span className={`font-mono text-[11px] text-right ${row.label === "STATUS" ? "text-emerald-400" : "text-zinc-300"}`}>
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Bracketed>

            {/* Instrument cluster — stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { value: "2",     unit: "YRS",   label: "INDUSTRY EXP." },
                { value: "3.58",  unit: "GPA",   label: "BACHELOR'S" },
                { value: "FE",    unit: "EXAM",  label: "NCEES CERT." },
                { value: "M.Sc.", unit: "→",     label: "HES-SO 2025" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="border border-zinc-800 bg-zinc-900/40 px-5 py-4 border-l-2 border-l-cyan-400/30"
                >
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-mono text-2xl font-bold text-cyan-400">{stat.value}</span>
                    <span className="font-mono text-[10px] text-zinc-600">{stat.unit}</span>
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Technical specifications — skills */}
            <div className="border border-zinc-800 bg-zinc-900/30">
              <div className="border-b border-zinc-800 px-6 py-3">
                <SectionLabel>// TECHNICAL SPECIFICATIONS</SectionLabel>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800/50">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category} className="px-6 py-5">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-600 mb-4">
                      {category}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((skill) => (
                        <Tag key={skill} label={skill} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interests strip */}
            <div className="border border-zinc-800 bg-zinc-900/20 px-6 py-4 flex flex-wrap items-center gap-4">
              <SectionLabel>// INTERESTS</SectionLabel>
              {["3D Printing", "Raspberry Pi", "Soccer", "Snowboarding", "Music"].map((i) => (
                <span key={i} className="font-mono text-[11px] text-zinc-500">{i}</span>
              ))}
            </div>
          </>
        )}

        {/* ── CV ── */}
        {page === "cv" && (
          <>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
              <div>
                <SectionLabel>DOCUMENT: Curriculum Vitae</SectionLabel>
                <h2 className="text-3xl font-bold tracking-tight text-zinc-100">
                  Education & Experience
                </h2>
              </div>
              <a
                href="/Victor_Garnier_CV.pdf"
                className="font-mono text-[11px] border border-zinc-700 px-5 py-2.5 text-zinc-400 hover:border-cyan-400/60 hover:text-cyan-400 transition-colors self-start sm:self-auto"
              >
                → Download PDF
              </a>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {/* Education */}
              <div className="border border-zinc-800 bg-zinc-900/40">
                <div className="border-b border-zinc-800 px-6 py-3 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rotate-45 bg-cyan-400" />
                  <SectionLabel>// EDUCATION</SectionLabel>
                </div>
                <div className="p-6">
                  <div className="relative space-y-6 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-cyan-400/10">
                    {education.map((item, i) => (
                      <div key={item.ref} className="relative pl-6">
                        <DiamondNode />
                        <div className="border border-zinc-800 bg-zinc-950/50 p-4">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-2">
                            <div>
                              <span className="font-mono text-[10px] text-zinc-600">[{item.ref}]</span>
                              <h4 className="font-bold text-zinc-100 mt-0.5">{item.degree}</h4>
                              <p className="font-mono text-[11px] text-cyan-400/80">{item.institution}</p>
                              <p className="font-mono text-[10px] text-zinc-600">{item.location}{item.gpa ? ` · ${item.gpa}` : ""}</p>
                            </div>
                            <span className="font-mono text-[11px] border border-zinc-800 px-2 py-1 text-zinc-500 h-fit shrink-0">
                              {item.period}
                            </span>
                          </div>
                          <p className="text-sm leading-6 text-zinc-500">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certification */}
                <div className="border-t border-zinc-800">
                  <div className="border-b border-zinc-800 px-6 py-3 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rotate-45 bg-violet-400" />
                    <SectionLabel>// CERTIFICATION</SectionLabel>
                  </div>
                  <div className="p-6">
                    <div className="border border-zinc-800 bg-zinc-950/50 p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-mono text-[10px] text-zinc-600">[CERT-01]</span>
                          <h4 className="font-bold text-zinc-100 mt-0.5">NCEES – Fundamentals of Engineering (FE)</h4>
                          <p className="font-mono text-[11px] text-violet-400/80">NCEES</p>
                        </div>
                        <span className="font-mono text-[11px] border border-zinc-800 px-2 py-1 text-zinc-500 shrink-0">Completed</span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-zinc-500">
                        First step toward becoming a licensed Professional Engineer. Demonstrates foundational competency across all core engineering disciplines.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Work Experience */}
              <div className="border border-zinc-800 bg-zinc-900/40">
                <div className="border-b border-zinc-800 px-6 py-3 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rotate-45 bg-orange-400" />
                  <SectionLabel>// WORK EXPERIENCE</SectionLabel>
                </div>
                <div className="p-6">
                  <div className="relative space-y-6 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-orange-400/10">
                    {experience.map((item) => (
                      <div key={item.ref} className="relative pl-6">
                        <DiamondNode color="border-orange-400" />
                        <div className="border border-zinc-800 bg-zinc-950/50 p-4">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-2">
                            <div>
                              <span className="font-mono text-[10px] text-zinc-600">[{item.ref}]</span>
                              <h4 className="font-bold text-zinc-100 mt-0.5">{item.title}</h4>
                              <p className="font-mono text-[11px] text-orange-400/80">{item.company}</p>
                            </div>
                            <span className="font-mono text-[11px] border border-zinc-800 px-2 py-1 text-zinc-500 h-fit shrink-0">
                              {item.period}
                            </span>
                          </div>
                          <ul className="space-y-1 mt-2">
                            {item.bullets.map((b) => (
                              <li key={b} className="text-[13px] leading-6 text-zinc-500 flex gap-2">
                                <span className="text-zinc-700 shrink-0">→</span>
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── PROJECTS ── */}
        {page === "projects" && (
          <>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
              <div>
                <SectionLabel>DOCUMENT: Project Portfolio</SectionLabel>
                <h2 className="text-3xl font-bold tracking-tight text-zinc-100">Projects</h2>
              </div>
              <a
                href="https://github.com/bots4fun"
                className="font-mono text-[11px] border border-zinc-700 px-5 py-2.5 text-zinc-400 hover:border-cyan-400/60 hover:text-cyan-400 transition-colors self-start sm:self-auto flex items-center gap-2"
              >
                → github.com/bots4fun
              </a>
            </div>

            {/* Engineering projects */}
            <div className="grid gap-4 lg:grid-cols-2">
              {engineeringProjects.map((project) => (
                <Bracketed key={project.ref} className="border border-zinc-800 bg-zinc-900/40 p-6 hover:border-zinc-700 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="font-mono text-[10px] text-zinc-600">[{project.ref}]</span>
                      <span className="ml-3 font-mono text-[10px] border border-zinc-700 px-2 py-0.5 text-zinc-500">
                        {project.category}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-zinc-600">{project.period}</span>
                  </div>
                  <h3 className="text-xl font-bold text-zinc-100">{project.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{project.description}</p>
                  <ul className="mt-4 space-y-1">
                    {project.bullets.map((b) => (
                      <li key={b} className="font-mono text-[12px] leading-6 text-zinc-500">{b}</li>
                    ))}
                  </ul>
                  <div className="mt-5 h-px bg-zinc-800" />
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tools.map((t) => (
                      <Tag key={t} label={t} />
                    ))}
                  </div>
                </Bracketed>
              ))}
            </div>

            {/* 3D Printing gallery */}
            <div className="border border-zinc-800 bg-zinc-900/20 mt-6">
              <div className="border-b border-zinc-800 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rotate-45 bg-cyan-400" />
                  <SectionLabel>// 3D PRINTING — PERSONAL PROJECTS</SectionLabel>
                </div>
              </div>
              <div className="p-6">
                <p className="font-mono text-[11px] text-zinc-600 mb-6">
                  → To add images: drop files into <code className="text-cyan-400/60">/public/projects/</code> and set src in the printingProjects array.
                </p>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {printingProjects.map((item, i) => (
                    <div
                      key={i}
                      className="border border-zinc-800 bg-zinc-950/50 overflow-hidden hover:border-zinc-700 transition-colors group"
                    >
                      {item.src ? (
                        <button
                          className="relative block w-full h-48 overflow-hidden bg-zinc-900"
                          onClick={() => item.src && setLightbox(item.src)}
                        >
                          <Image
                            src={item.src}
                            alt={item.title}
                            fill
                            className="object-cover transition duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/5 transition-colors flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 font-mono text-[11px] border border-cyan-400/60 px-3 py-1 text-cyan-400 bg-zinc-950/80 transition-opacity">
                              [EXPAND]
                            </span>
                          </div>
                        </button>
                      ) : (
                        <div className="flex h-48 flex-col items-center justify-center gap-3 bg-zinc-900/50">
                          {/* Cross-hatch pattern suggestion */}
                          <div className="w-8 h-8 border border-zinc-700 flex items-center justify-center">
                            <svg className="w-4 h-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="font-mono text-[10px] text-zinc-600">IMG: NULL</p>
                        </div>
                      )}
                      <div className="p-4 border-t border-zinc-800">
                        <div className="flex items-center justify-between">
                          <h4 className="font-mono text-[12px] font-semibold text-zinc-300">{item.title}</h4>
                          <span className="font-mono text-[10px] text-zinc-600">3DP-{String(i + 1).padStart(2, "0")}</span>
                        </div>
                        <p className="text-[12px] text-zinc-600 mt-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── CONTACT ── */}
        {page === "contact" && (
          <>
            <div className="mb-6">
              <SectionLabel>DOCUMENT: Contact</SectionLabel>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-100">Get in Touch</h2>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
              <div className="border border-zinc-800 bg-zinc-900/40">
                <div className="border-b border-zinc-800 px-6 py-3">
                  <SectionLabel>{">"} initiating_contact.sh</SectionLabel>
                </div>
                <div className="p-6">
                  <p className="text-[15px] leading-7 text-zinc-400 mb-8 max-w-lg">
                    Open to engineering positions, research collaborations, and consulting
                    opportunities in mechanical design, fluid systems, and applied prototyping.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        label: "EMAIL",
                        value: "vgarnier0125@gmail.com",
                        href: "mailto:vgarnier0125@gmail.com",
                      },
                      {
                        label: "PHONE",
                        value: "+41 78 601 73 05",
                        href: "tel:+41786017305",
                      },
                      {
                        label: "GITHUB",
                        value: "github.com/bots4fun",
                        href: "https://github.com/bots4fun",
                      },
                      {
                        label: "LOCATION",
                        value: "Lausanne, Switzerland",
                        href: null,
                      },
                    ].map((item) => {
                      const inner = (
                        <div className="border border-zinc-800 bg-zinc-950/50 px-5 py-4 hover:border-cyan-400/30 transition-colors group">
                          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600 mb-1">
                            {item.label}
                          </p>
                          <p className="font-mono text-[12px] text-zinc-300 group-hover:text-cyan-400 transition-colors">
                            {">"} {item.value}
                          </p>
                        </div>
                      );
                      return item.href ? (
                        <a key={item.label} href={item.href}>{inner}</a>
                      ) : (
                        <div key={item.label}>{inner}</div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Requirements matrix */}
              <div className="border border-zinc-800 bg-zinc-900/40">
                <div className="border-b border-zinc-800 px-6 py-3">
                  <SectionLabel>// REQUIREMENTS MATRIX</SectionLabel>
                </div>
                <div className="p-6">
                  <p className="font-mono text-[10px] text-zinc-600 mb-5">STATUS: OPEN — SEEKING</p>
                  <div className="space-y-3">
                    {[
                      "Mechanical design & engineering roles",
                      "Fluid systems and hydraulics projects",
                      "R&D and simulation-driven work",
                      "3D printing and prototyping",
                      "Embedded systems side projects",
                    ].map((item, i) => (
                      <div key={item} className="flex items-start gap-3">
                        <span className="font-mono text-[10px] text-cyan-400/60 shrink-0 mt-0.5">
                          [✓] REQ-{String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm text-zinc-400">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-zinc-800 space-y-2">
                    <div className="flex justify-between">
                      <span className="font-mono text-[10px] text-zinc-600">LOCATION</span>
                      <span className="font-mono text-[11px] text-zinc-400">Lausanne, Switzerland</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono text-[10px] text-zinc-600">LANGUAGES</span>
                      <span className="font-mono text-[11px] text-zinc-400">FR + EN</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono text-[10px] text-zinc-600">AVAILABILITY</span>
                      <span className="font-mono text-[11px] text-emerald-400">● Negotiable</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-zinc-800/60 mt-16 px-6 py-6">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-zinc-600">
            // Victor Garnier — Mechanical Engineer — Lausanne, Switzerland — 2026
          </p>
          <div className="flex items-center gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className="font-mono text-[10px] uppercase tracking-wider text-zinc-600 hover:text-zinc-400 transition-colors"
              >
                {item.num}:{item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
