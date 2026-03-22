"use client";

import { useState } from "react";

type PageKey = "about" | "cv" | "projects" | "contact";

// ─── COLORS (warm off-white + ink) ────────────────────────────────────────
const C = {
  bg:      "bg-[hsl(38,35%,96%)]",
  card:    "bg-[hsl(38,28%,99%)]",
  border:  "border-[hsl(35,20%,87%)]",
  text:    "text-[hsl(220,20%,10%)]",
  muted:   "text-[hsl(220,10%,42%)]",
  accent:  "text-[hsl(220,65%,35%)]",
  accentBg:"bg-[hsl(220,65%,35%)]",
};

// ─── DATA ─────────────────────────────────────────────────────────────────

const skillGroups = [
  {
    label: "Engineering",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    items: ["Mechanical Design", "Fluid Dynamics", "FEA Analysis", "Machine Design", "Hydraulics"],
  },
  {
    label: "Software",
    color: "bg-violet-100 text-violet-700 border-violet-200",
    items: ["SolidWorks", "3D Experience", "Fusion 360", "Python"],
  },
  {
    label: "Hardware",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    items: ["3D Printing", "Arduino", "Raspberry Pi"],
  },
  {
    label: "Languages",
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    items: ["French — Native", "English — Fluent"],
  },
];

const education = [
  {
    degree:   "Master's in Mechanical Engineering",
    school:   "HES-SO Master · Lausanne, Switzerland",
    period:   "2025 – Present",
    desc:     "Advanced study in product development and design, production of components and systems, materials and manufacturing techniques. Focus on mechanical and mechatronic systems, including their control and automation and in-depth skills in simulation, analysis, optimization and validation.",
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
      "Designed and optimized components for aircraft refueling systems such as nozzles, inline valves, and couplers.",
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

type Project = {
  num: string; label: string; color: string;
  title: string; period: string; desc: string;
  tools: string[]; images?: string[];
};

const workProjects: Project[] = [
  {
    num:    "01",
    label:  "CLA-VAL",
    color:  "bg-indigo-100 text-indigo-700 border-indigo-200",
    title:  "Manifold — Pilot Block",
    period: "2025",
    desc:   "Aluminum hog-out manifold used to control the piston of a main valve via solenoids and pressure regulators. Designed for compactness and ease of assembly in an aircraft refueling truck.",
    tools:  ["SolidWorks", "GD&T", "Aluminum Machining", "Fluid Systems"],
    images: ["/projects/manifold-3d.png"],
  },
  {
    num:    "02",
    label:  "CLA-VAL",
    color:  "bg-indigo-100 text-indigo-700 border-indigo-200",
    title:  "Bypass Valve — 381GF",
    period: "2023",
    desc:   "New design iteration of a differential pressure bypass valve for aircraft refueling applications. Focused on improving manufacturability and performance under dynamic pressure conditions.",
    tools:  ["SolidWorks", "GD&T", "Fluid Dynamics", "Valve Design"],
    images: ["/projects/bypass-3d.png"],
  },
  {
    num:    "03",
    label:  "CLA-VAL",
    color:  "bg-indigo-100 text-indigo-700 border-indigo-200",
    title:  "Test Fixture — 1626M",
    period: "2024",
    desc:   "Custom test fixture designed to validate the performance of the 1626M valve under simulated operating conditions. Ensured repeatable clamping and alignment for consistent test results.",
    tools:  ["SolidWorks", "FEA", "GD&T", "Testing & Validation"],
    images: ["/projects/fixture-3d.png"],
  },
  {
    num:    "04",
    label:  "CLA-VAL",
    color:  "bg-indigo-100 text-indigo-700 border-indigo-200",
    title:  "Spring Compression Tool — X149",
    period: "2024",
    desc:   "Specialized tool to safely compress and hold the internal spring of the X149 valve during assembly and disassembly. Designed to reduce assembly time and improve technician safety.",
    tools:  ["SolidWorks", "Tooling Design", "GD&T", "Assembly"],
    images: ["/projects/spring-tool-1.png", "/projects/spring-tool-2.png"],
  },
  {
    num:    "05",
    label:  "CLA-VAL",
    color:  "bg-indigo-100 text-indigo-700 border-indigo-200",
    title:  "Wire Rope Hub — Press Master",
    period: "2024",
    desc:   "Hub component for a wire rope press machine used in internal assembly operations. Designed for durability and precise fitment within the press assembly.",
    tools:  ["SolidWorks", "GD&T", "Aluminum Machining", "Mechanical Design"],
    images: ["/projects/hub-3d.png", "/projects/hub-2.png"],
  },
];

const academicProjects: Project[] = [
  {
    num:    "01",
    label:  "Academic",
    color:  "bg-violet-100 text-violet-700 border-violet-200",
    title:  "Unmanned Ground Vehicle — NGCP Senior Project",
    period: "2022 – 2023",
    desc:   "Full UGV design for the NGCP competition. Mission: drive to GPS targets, retrieve a care package and miniature figure (injured hiker), then hand off to a UAV. Responsible for the full payload assembly including rotation plate, linkage bar, leverage arm, linear actuator, storage unit, and separation sub-assembly.",
    tools:  ["SolidWorks", "FEA", "3D Printing", "Team Design", "Systems Integration"],
    images: ["/projects/ugv-3d.png"],
  },
  {
    num:    "02",
    label:  "Academic",
    color:  "bg-violet-100 text-violet-700 border-violet-200",
    title:  "CFD Simulations — ANSYS Fluent",
    period: "2024",
    desc:   "Two CFD studies using ANSYS Fluent. (1) NACA 4412 airfoil: simulated lift and drag across multiple angles of attack (0°–15°), comparing k-ε Realizable, k-ω SST, and Spalart-Allmaras turbulence models on coarse, medium, and fine meshes. (2) Liquid sloshing (ballottement) in a spherical tank: modeled free-surface dynamics under lateral excitation using the VOF multiphase method across mesh refinements and turbulence models.",
    tools:  ["ANSYS Fluent", "CFD", "VOF Multiphase", "Turbulence Modeling", "Mesh Generation", "Aerodynamics"],
    images: ["/projects/naca4412-cfd.png", "/projects/ballottement-cfd.png"],
  },
];

const personalProjects: Project[] = [
  {
    num:    "01",
    label:  "Personal",
    color:  "bg-amber-100 text-amber-700 border-amber-200",
    title:  "Arduino Door Lock Mechanism",
    period: "Jul – Aug 2021",
    desc:   "Designed and built a custom door lock mechanism combining Arduino control logic with 3D-printed mechanical components — concept to working prototype.",
    tools:  ["Arduino", "3D Printing", "CAD", "Embedded Systems"],
  },
  {
    num:    "02",
    label:  "Personal",
    color:  "bg-amber-100 text-amber-700 border-amber-200",
    title:  "3D Printing Projects",
    period: "Ongoing",
    desc:   "Designing and printing mechanical parts, enclosures, and functional prototypes. Each project covers the full loop from CAD model to physical object.",
    tools:  ["3D Printing", "CAD", "Fusion 360", "Prototyping"],
  },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────

export default function Page() {
  const [page, setPage] = useState<PageKey>("about");
  const [mob, setMob]   = useState(false);
  const [lb, setLb]     = useState<string | null>(null);

  const go = (id: PageKey) => { setPage(id); setMob(false); };

  const navItems: { id: PageKey; label: string; num: string }[] = [
    { id: "about",    label: "About",    num: "01" },
    { id: "cv",       label: "CV",       num: "02" },
    { id: "projects", label: "Projects", num: "03" },
    { id: "contact",  label: "Contact",  num: "04" },
  ];

  return (
    <div className={`${C.bg} ${C.text} min-h-screen`}>

      {/* ── LIGHTBOX ──────────────────────────────────────────────────────── */}
      {lb && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[hsl(220,20%,5%)]/85 backdrop-blur-md p-4"
          onClick={() => setLb(null)}
        >
          <div className="relative" onClick={e => e.stopPropagation()}>
            <img src={lb} alt="" className="max-h-[88vh] max-w-[88vw] object-contain rounded-xl shadow-2xl" />
            <button
              onClick={() => setLb(null)}
              className="absolute -top-10 right-0 text-sm text-[hsl(220,10%,60%)] hover:text-white transition-colors"
            >
              Close ✕
            </button>
          </div>
        </div>
      )}

      {/* ── SIDEBAR (desktop) ─────────────────────────────────────────────── */}
      <aside className={`hidden lg:flex flex-col fixed left-0 top-0 h-screen w-[220px] ${C.card} border-r ${C.border} z-20`}>

        {/* Top — name */}
        <div className="px-8 pt-10 pb-8 border-b border-[hsl(35,20%,87%)]">
          <button onClick={() => go("about")} className="text-left group">
            <p className="font-black text-[hsl(220,20%,8%)] text-[22px] leading-tight tracking-tight group-hover:text-[hsl(220,65%,35%)] transition-colors">
              Victor<br />Garnier
            </p>
            <p className="font-mono text-[10px] text-[hsl(220,10%,55%)] mt-2 uppercase tracking-widest">
              Mech. Engineer
            </p>
          </button>
        </div>

        {/* Mid — nav */}
        <nav className="flex flex-col gap-0.5 px-4 py-6 flex-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left group ${
                page === item.id
                  ? "bg-[hsl(220,65%,35%)]/10 text-[hsl(220,65%,35%)]"
                  : "text-[hsl(220,10%,45%)] hover:text-[hsl(220,20%,10%)] hover:bg-[hsl(220,20%,10%)]/5"
              }`}
            >
              <span className={`font-mono text-[10px] w-5 ${page === item.id ? "text-[hsl(220,65%,35%)]" : "text-[hsl(220,10%,62%)]"}`}>
                {item.num}
              </span>
              {item.label}
              {page === item.id && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[hsl(220,65%,35%)]" />
              )}
            </button>
          ))}
        </nav>

        {/* Decorative engineering detail */}
        <div className="px-8 pb-6 opacity-25 pointer-events-none select-none">
          <svg viewBox="0 0 80 80" fill="none" className="w-14 h-14">
            <circle cx="40" cy="40" r="32" stroke="hsl(220,65%,35%)" strokeWidth="0.7" />
            <circle cx="40" cy="40" r="20" stroke="hsl(220,65%,35%)" strokeWidth="1" />
            <circle cx="40" cy="40" r="9"  stroke="hsl(220,65%,35%)" strokeWidth="1.2" />
            <circle cx="40" cy="40" r="2"  fill="hsl(220,65%,35%)" />
            <line x1="2"  y1="40" x2="78" y2="40" stroke="hsl(220,65%,35%)" strokeWidth="0.4" strokeOpacity="0.5" />
            <line x1="40" y1="2"  x2="40" y2="78" stroke="hsl(220,65%,35%)" strokeWidth="0.4" strokeOpacity="0.5" />
            <circle cx="40" cy="8"  r="3" stroke="hsl(220,65%,35%)" strokeWidth="0.8" />
            <circle cx="40" cy="72" r="3" stroke="hsl(220,65%,35%)" strokeWidth="0.8" />
            <circle cx="8"  cy="40" r="3" stroke="hsl(220,65%,35%)" strokeWidth="0.8" />
            <circle cx="72" cy="40" r="3" stroke="hsl(220,65%,35%)" strokeWidth="0.8" />
          </svg>
        </div>

        {/* Bottom — status + CV */}
        <div className="px-8 pb-8 pt-4 border-t border-[hsl(35,20%,87%)] space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[10px] text-[hsl(220,10%,52%)] uppercase tracking-wider">Available</span>
          </div>
          <p className="font-mono text-[10px] text-[hsl(220,10%,58%)]">Lausanne · CH</p>
          <a
            href="/Victor_Garnier_CV.pdf"
            className="block font-semibold text-xs text-[hsl(220,65%,35%)] hover:text-[hsl(220,65%,28%)] transition-colors"
          >
            ↓ Download CV
          </a>
        </div>
      </aside>

      {/* ── MOBILE HEADER ─────────────────────────────────────────────────── */}
      <header className={`lg:hidden fixed top-0 inset-x-0 z-30 h-14 flex items-center justify-between px-6 border-b border-[hsl(35,20%,87%)] bg-[hsl(38,35%,96%)]/90 backdrop-blur-xl`}>
        <button onClick={() => go("about")} className="font-black text-sm text-[hsl(220,20%,8%)]">
          Victor Garnier
        </button>
        <button onClick={() => setMob(!mob)} className="flex flex-col gap-1.5 p-1" aria-label="Menu">
          <span className={`block h-px w-5 bg-[hsl(220,20%,20%)]/70 transition-transform origin-center ${mob ? "translate-y-[6.5px] rotate-45" : ""}`} />
          <span className={`block h-px w-5 bg-[hsl(220,20%,20%)]/70 transition-opacity ${mob ? "opacity-0" : ""}`} />
          <span className={`block h-px w-5 bg-[hsl(220,20%,20%)]/70 transition-transform origin-center ${mob ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
        </button>
      </header>

      {mob && (
        <div className={`lg:hidden fixed inset-0 z-20 pt-14 ${C.bg} flex flex-col px-6 py-8 space-y-1`}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                page === item.id
                  ? "bg-[hsl(220,65%,35%)]/10 text-[hsl(220,65%,35%)]"
                  : "text-[hsl(220,10%,42%)]"
              }`}
            >
              <span className="font-mono text-[10px] text-[hsl(220,10%,58%)]">{item.num}</span>
              {item.label}
            </button>
          ))}
          <div className="pt-6 border-t border-[hsl(35,20%,87%)]">
            <a href="/Victor_Garnier_CV.pdf" className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-[hsl(220,65%,35%)]">
              ↓ Download CV
            </a>
          </div>
        </div>
      )}

      {/* ── MAIN ──────────────────────────────────────────────────────────── */}
      <main className="lg:ml-[220px] min-h-screen dot-grid">

        {/* ════════════════════ ABOUT ═══════════════════════════════════════ */}
        {page === "about" && (
          <div className="fade-in-up pt-14 lg:pt-0">

            {/* Hero */}
            <section className="relative px-8 md:px-14 pt-14 pb-14 border-b border-[hsl(35,20%,87%)] overflow-hidden">
              {/* Big background number */}
              <span
                className="absolute right-6 bottom-0 font-black leading-none select-none pointer-events-none text-[hsl(220,20%,10%)]/[0.04]"
                style={{ fontSize: "clamp(120px, 18vw, 220px)" }}
                aria-hidden
              >
                01
              </span>

              <p className="font-mono text-[11px] text-[hsl(220,10%,55%)] tracking-widest uppercase mb-8">
                01 / About
              </p>

              <h1
                className="gradient-text font-black leading-none tracking-tight mb-6"
                style={{ fontSize: "clamp(56px, 9vw, 116px)", letterSpacing: "-0.03em" }}
              >
                Victor<br />Garnier
              </h1>

              <div className="flex flex-wrap items-center gap-3 mb-7">
                <span className="inline-flex items-center gap-2 text-sm text-[hsl(220,10%,42%)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available for new opportunities
                </span>
                <span className="text-[hsl(35,20%,78%)]">·</span>
                <span className="font-mono text-[12px] text-[hsl(220,10%,52%)]">Lausanne, Switzerland</span>
              </div>

              <p className="max-w-lg text-[16px] leading-7 text-[hsl(220,10%,40%)] mb-9">
                Mechanical Engineer with a B.Sc. from Cal Poly Pomona and 2 years designing
                aircraft refueling systems at CLA-VAL. Currently pursuing M.Sc. at HES-SO Master.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => go("contact")}
                  className="h-10 px-6 rounded-full bg-[hsl(220,65%,35%)] hover:bg-[hsl(220,65%,29%)] text-white text-sm font-semibold transition-colors shadow-md shadow-[hsl(220,65%,35%)]/20"
                >
                  Get in touch
                </button>
                <button
                  onClick={() => go("projects")}
                  className="h-10 px-6 rounded-full border border-[hsl(35,20%,80%)] text-[hsl(220,20%,22%)] text-sm font-medium hover:border-[hsl(220,65%,35%)] hover:text-[hsl(220,65%,35%)] transition-colors"
                >
                  View projects →
                </button>
              </div>
            </section>

            {/* Stats strip */}
            <section className="border-b border-[hsl(35,20%,87%)] bg-[hsl(38,28%,99%)]">
              <dl className="px-8 md:px-14 flex flex-wrap">
                {[
                  { value: "2 yrs",   label: "Industry experience" },
                  { value: "FR / EN", label: "Bilingual" },
                  { value: "FE Exam", label: "NCEES Certified" },
                  { value: "M.Sc.",   label: "HES-SO Lausanne" },
                ].map((s, i) => (
                  <div
                    key={s.label}
                    className={`flex-1 min-w-[120px] py-6 px-6 ${i !== 0 ? "border-l border-[hsl(35,20%,87%)]" : ""}`}
                  >
                    <dd className="text-[22px] font-black text-[hsl(220,20%,8%)] leading-tight">{s.value}</dd>
                    <dt className="font-mono text-[10px] text-[hsl(220,10%,54%)] uppercase tracking-wider mt-1">{s.label}</dt>
                  </div>
                ))}
              </dl>
            </section>

            {/* Bio + Info cards */}
            <section className="px-8 md:px-14 py-14 grid lg:grid-cols-[1fr_260px] gap-12">
              <div>
                <p className="font-mono text-[11px] text-[hsl(220,10%,55%)] uppercase tracking-widest mb-6">
                  — Who I am
                </p>
                <div className="space-y-4 text-[15px] leading-7 text-[hsl(220,10%,40%)]">
                  <p>
                    I'm a mechanical engineer with a B.Sc. from{" "}
                    <span className="text-[hsl(220,20%,14%)] font-medium">Cal Poly Pomona</span>{" "}
                    (California, USA) — a polytechnic university with a strong emphasis on hands-on
                    engineering education. My degree gave me a rigorous foundation in fluid dynamics,
                    thermodynamics, machine design, materials science, and structural analysis.
                  </p>
                  <p>
                    After graduating, I joined{" "}
                    <span className="text-[hsl(220,20%,14%)] font-medium">Griswold Industries (CLA-VAL)</span>{" "}
                    as a Design Engineer, where I spent two years designing and optimizing components for
                    aircraft refueling systems — nozzles, inline valves, and hydrant couplers. I worked
                    across the full product lifecycle: concept design in SolidWorks, FEA structural
                    validation in FEMAP, custom test fixture design, and compliance testing.
                  </p>
                  <p>
                    I'm currently pursuing an{" "}
                    <span className="text-[hsl(220,20%,14%)] font-medium">M.Sc. in Mechanical Engineering at HES-SO Master</span>{" "}
                    in Lausanne, Switzerland, deepening my analytical and research capabilities in
                    advanced simulation and applied mechanics.
                  </p>
                  <p>
                    I'm a{" "}
                    <span className="text-[hsl(220,20%,14%)] font-medium">native French speaker</span>{" "}
                    and{" "}
                    <span className="text-[hsl(220,20%,14%)] font-medium">fluent in English</span>{" "}
                    — I completed my undergraduate degree entirely in English in the US.
                  </p>
                </div>
              </div>

              <aside className="space-y-3">
                {[
                  { label: "Current",    title: "M.Sc. Student",      sub: "HES-SO Master · Lausanne", badge: { text: "Active", color: "text-emerald-600 bg-emerald-50 border-emerald-200" } },
                  { label: "Previously", title: "Design Engineer I",  sub: "CLA-VAL · 2023–2025" },
                  { label: "Certified",  title: "NCEES FE Exam",      sub: "Fundamentals of Engineering" },
                  { label: "Education",  title: "B.Sc. Mech. Eng.",   sub: "Cal Poly Pomona · GPA 3.58" },
                ].map(card => (
                  <div key={card.label} className={`glow-card rounded-2xl border ${C.border} ${C.card} p-5`}>
                    <p className="font-mono text-[10px] text-[hsl(220,10%,54%)] uppercase tracking-widest mb-2">{card.label}</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-[hsl(220,20%,10%)] text-sm">{card.title}</p>
                      {card.badge && (
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${card.badge.color}`}>
                          {card.badge.text}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[hsl(220,10%,42%)] mt-0.5">{card.sub}</p>
                  </div>
                ))}
              </aside>
            </section>

            {/* Skills */}
            <section className="px-8 md:px-14 py-12 border-t border-[hsl(35,20%,87%)]">
              <p className="font-mono text-[11px] text-[hsl(220,10%,55%)] uppercase tracking-widest mb-8">
                — Skills & Tools
              </p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {skillGroups.map(g => (
                  <div key={g.label} className={`glow-card rounded-2xl border ${C.border} ${C.card} p-5`}>
                    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border mb-4 ${g.color}`}>
                      {g.label}
                    </span>
                    <ul className="space-y-1.5">
                      {g.items.map(item => (
                        <li key={item} className="text-sm text-[hsl(220,10%,40%)]">{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Interests */}
            <section className="px-8 md:px-14 py-12 border-t border-[hsl(35,20%,87%)]">
              <p className="font-mono text-[11px] text-[hsl(220,10%,55%)] uppercase tracking-widest mb-8">
                — Interests
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { icon: "◈", title: "3D Printing",           desc: "Designing and printing mechanical parts, enclosures, and gadgets. I enjoy the full loop from CAD model to physical object.",            color: "text-indigo-500" },
                  { icon: "⬡", title: "Electronics & Raspberry Pi", desc: "Building small automation projects and experimenting with different sensors.",                                                    color: "text-violet-500" },
                  { icon: "⬟", title: "Soccer",                desc: "I love playing, watching and discussing about the beautiful game.",                                                                    color: "text-emerald-500" },
                  { icon: "◇", title: "Snowboarding",          desc: "Riding in the Alps when the season allows. A good reset from the desk, and a reminder that physics matters.",                           color: "text-sky-500" },
                  { icon: "◎", title: "Music",                 desc: "Listening and occasionally playing. Music helps me focus during long design sessions and unwind after them.",                            color: "text-amber-500" },
                ].map(interest => (
                  <div key={interest.title} className={`glow-card rounded-2xl border ${C.border} ${C.card} p-5`}>
                    <div className={`text-xl mb-3 ${interest.color}`}>{interest.icon}</div>
                    <h3 className="font-semibold text-[hsl(220,20%,8%)] text-sm mb-1.5">{interest.title}</h3>
                    <p className="text-sm text-[hsl(220,10%,42%)] leading-6">{interest.desc}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* ════════════════════ CV ══════════════════════════════════════════ */}
        {page === "cv" && (
          <div className="fade-in-up pt-14 lg:pt-0 px-8 md:px-14 py-14">

            {/* Header */}
            <div className="flex items-center gap-4 mb-14">
              <p className="font-mono text-[11px] text-[hsl(220,10%,55%)] tracking-widest uppercase shrink-0">02 / CV</p>
              <div className="flex-1 h-px bg-[hsl(35,20%,87%)]" />
              <a href="/Victor_Garnier_CV.pdf" className="font-semibold text-xs text-[hsl(220,65%,35%)] hover:text-[hsl(220,65%,28%)] transition-colors shrink-0">
                ↓ PDF
              </a>
            </div>

            {/* Experience timeline */}
            <div className="mb-16">
              <p className="font-mono text-[11px] text-[hsl(220,10%,55%)] uppercase tracking-widest mb-10">
                — Work Experience
              </p>
              <div className="space-y-0">
                {experience.map((e, i) => (
                  <div key={e.title} className="relative flex gap-8 pb-10 last:pb-0">
                    {i < experience.length - 1 && (
                      <div className="absolute left-[6px] top-7 bottom-0 w-px bg-[hsl(35,20%,85%)]" />
                    )}
                    <div className="mt-1 shrink-0">
                      <div className="h-3.5 w-3.5 rounded-full border-2 border-[hsl(220,65%,35%)] bg-[hsl(38,35%,96%)]" />
                    </div>
                    <div className="flex-1 min-w-0 -mt-0.5">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 mb-1">
                        <h3 className="font-bold text-[hsl(220,20%,8%)]">{e.title}</h3>
                        <span className="text-sm text-[hsl(220,10%,45%)]">{e.company}</span>
                      </div>
                      <p className="font-mono text-[11px] text-[hsl(220,10%,56%)] mb-4">{e.period}</p>
                      <ul className="space-y-2">
                        {e.bullets.map(b => (
                          <li key={b} className="flex items-start gap-2.5 text-sm text-[hsl(220,10%,40%)] leading-6">
                            <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[hsl(220,65%,35%)]" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education timeline */}
            <div className="mb-16">
              <p className="font-mono text-[11px] text-[hsl(220,10%,55%)] uppercase tracking-widest mb-10">
                — Education
              </p>
              <div className="space-y-0">
                {education.map((e, i) => (
                  <div key={e.degree} className="relative flex gap-8 pb-10 last:pb-0">
                    {i < education.length - 1 && (
                      <div className="absolute left-[6px] top-7 bottom-0 w-px bg-[hsl(35,20%,85%)]" />
                    )}
                    <div className="mt-1 shrink-0">
                      <div className="h-3.5 w-3.5 rounded-full border-2 border-[hsl(220,65%,35%)]/50 bg-[hsl(38,35%,96%)]" />
                    </div>
                    <div className="flex-1 min-w-0 -mt-0.5">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                        <h3 className="font-bold text-[hsl(220,20%,8%)]">{e.degree}</h3>
                        {"note" in e && e.note && (
                          <span className="font-mono text-[11px] text-[hsl(220,65%,35%)] border border-[hsl(220,65%,35%)]/30 px-2 py-0.5 rounded">
                            {e.note}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[hsl(220,10%,45%)] mb-1">{e.school}</p>
                      <p className="font-mono text-[11px] text-[hsl(220,10%,56%)] mb-4">{e.period}</p>
                      <p className="text-sm text-[hsl(220,10%,40%)] leading-6">{e.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certification */}
            <div>
              <p className="font-mono text-[11px] text-[hsl(220,10%,55%)] uppercase tracking-widest mb-8">
                — Certification
              </p>
              <div className={`glow-card rounded-2xl border ${C.border} ${C.card} p-6`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-[hsl(220,20%,8%)]">NCEES — Fundamentals of Engineering (FE)</h3>
                    <p className="text-sm text-[hsl(220,10%,45%)] mt-0.5">NCEES</p>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    Completed
                  </span>
                </div>
                <p className="mt-3 text-sm text-[hsl(220,10%,42%)] leading-6">
                  First step toward becoming a licensed Professional Engineer. Demonstrates foundational
                  competency across all core engineering disciplines.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* ════════════════════ PROJECTS ════════════════════════════════════ */}
        {page === "projects" && (
          <div className="fade-in-up pt-14 lg:pt-0 px-8 md:px-14 py-14">

            <div className="flex items-center gap-4 mb-14">
              <p className="font-mono text-[11px] text-[hsl(220,10%,55%)] tracking-widest uppercase shrink-0">03 / Projects</p>
              <div className="flex-1 h-px bg-[hsl(35,20%,87%)]" />
            </div>

            {[
              { heading: "Work Projects",     items: workProjects },
              { heading: "Academic Projects", items: academicProjects },
              { heading: "Personal Projects", items: personalProjects },
            ].map(section => (
              <div key={section.heading} className="mb-14">
                <p className="font-mono text-[11px] text-[hsl(220,10%,55%)] uppercase tracking-widest mb-7 flex items-center gap-4">
                  — {section.heading}
                  <span className="flex-1 h-px bg-[hsl(35,20%,87%)]" />
                </p>
                {section.items.length === 0 ? (
                  <p className="text-sm text-[hsl(220,10%,54%)] italic">Coming soon.</p>
                ) : (
                  <div className="grid gap-5 md:grid-cols-2">
                    {section.items.map(p => (
                      <article key={p.num} className={`glow-card rounded-2xl border ${C.border} ${C.card} flex flex-col overflow-hidden`}>
                        {p.images && p.images.length > 0 && (
                          <div className="flex gap-1 overflow-x-auto scrollbar-none">
                            {p.images.map((src, i) => (
                              <button
                                key={i}
                                onClick={() => setLb(src)}
                                className="relative shrink-0 w-full bg-[hsl(38,28%,97%)] flex items-center justify-center p-2"
                                style={{ minWidth: p.images!.length > 1 ? "60%" : "100%" }}
                              >
                                <img
                                  src={src}
                                  alt={`${p.title} ${i + 1}`}
                                  className="w-full h-auto max-h-64 object-contain hover:opacity-90 transition-opacity duration-300"
                                />
                              </button>
                            ))}
                          </div>
                        )}
                        <div className="p-7 flex flex-col flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${p.color}`}>{p.label}</span>
                            <span className="font-mono text-[11px] text-[hsl(220,10%,60%)]">{p.num}</span>
                          </div>
                          <h3 className="text-base font-bold text-[hsl(220,20%,8%)] mb-3">{p.title}</h3>
                          <p className="text-sm text-[hsl(220,10%,40%)] leading-6 flex-1">{p.desc}</p>
                          <div className="mt-6 pt-5 border-t border-[hsl(35,20%,87%)] flex flex-wrap items-center justify-between gap-2">
                            <div className="flex flex-wrap gap-x-3 gap-y-1">
                              {p.tools.map(t => (
                                <span key={t} className="font-mono text-[11px] text-[hsl(220,10%,50%)]">{t}</span>
                              ))}
                            </div>
                            <span className="font-mono text-[11px] text-[hsl(220,10%,58%)] shrink-0">{p.period}</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ════════════════════ CONTACT ═════════════════════════════════════ */}
        {page === "contact" && (
          <div className="fade-in-up pt-14 lg:pt-0 px-8 md:px-14 py-14 min-h-[calc(100vh-0px)] flex flex-col">

            <div className="flex items-center gap-4 mb-14">
              <p className="font-mono text-[11px] text-[hsl(220,10%,55%)] tracking-widest uppercase shrink-0">04 / Contact</p>
              <div className="flex-1 h-px bg-[hsl(35,20%,87%)]" />
            </div>

            <div className="flex-1 flex flex-col justify-center max-w-2xl">
              <h2
                className="gradient-text font-black leading-none tracking-tight mb-6"
                style={{ fontSize: "clamp(38px, 6vw, 72px)", letterSpacing: "-0.03em" }}
              >
                Looking forward<br />to meeting you
              </h2>

              <p className="text-[16px] leading-7 text-[hsl(220,10%,40%)] mb-12 max-w-lg">
                Whether you have a project in mind, a thesis opportunity, or just want to connect — I'd love to hear from you.
              </p>

              <div className="grid sm:grid-cols-[1fr_260px] gap-6">

                {/* Contact list */}
                <div className="space-y-3">
                  {[
                    { label: "Email",    value: "vgarnier0125@gmail.com", href: "mailto:vgarnier0125@gmail.com" },
                    { label: "Phone",    value: "+41 78 601 73 05",       href: "tel:+41786017305" },
                    { label: "Location", value: "Lausanne, Switzerland",  href: null },
                  ].map(c => (
                    <div key={c.label} className={`glow-card rounded-2xl border ${C.border} ${C.card} p-5 flex items-center justify-between group`}>
                      <div>
                        <p className="font-mono text-[10px] text-[hsl(220,10%,54%)] uppercase tracking-wider mb-1">{c.label}</p>
                        {c.href ? (
                          <a href={c.href} className="text-sm font-medium text-[hsl(220,65%,35%)] group-hover:underline" target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                            {c.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-[hsl(220,20%,10%)]">{c.value}</p>
                        )}
                      </div>
                      {c.href && <span className="text-[hsl(220,10%,62%)] group-hover:text-[hsl(220,65%,35%)] transition-colors text-sm">→</span>}
                    </div>
                  ))}
                </div>

                {/* Open to */}
                <div className={`glow-card rounded-2xl border ${C.border} ${C.card} p-5`}>
                  <p className="font-mono text-[10px] text-[hsl(220,10%,54%)] uppercase tracking-wider mb-4">Open to</p>
                  <ul className="space-y-2.5">
                    {[
                      "Mechanical design & engineering roles",
                      "Master Thesis in applied mechanics or simulation",
                      "R&D and simulation-driven positions",
                      "3D printing and prototyping work",
                    ].map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[hsl(220,10%,40%)] leading-5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(220,65%,35%)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 pt-4 border-t border-[hsl(35,20%,87%)] space-y-1">
                    <p className="font-mono text-[10px] text-[hsl(220,10%,56%)]">Lausanne, Switzerland</p>
                    <p className="font-mono text-[10px] text-[hsl(220,10%,56%)]">French & English</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer line */}
            <div className="mt-16 pt-6 border-t border-[hsl(35,20%,87%)] flex items-center justify-between">
              <p className="font-mono text-[10px] text-[hsl(220,10%,54%)]">© 2026 Victor Garnier</p>
              <div className="flex items-center gap-5">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => go(item.id)}
                    className="font-mono text-[10px] text-[hsl(220,10%,54%)] hover:text-[hsl(220,10%,38%)] transition-colors uppercase tracking-wider"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
