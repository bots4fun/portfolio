"use client";

import { useState } from "react";

type PageKey = "about" | "cv" | "projects" | "contact";

// ─── PALETTE ──────────────────────────────────────────────────────────────
// bg:      hsl(222,22%,7%)     deep navy-black
// surface: hsl(222,20%,10%)    card / sidebar surface
// border:  hsl(222,20%,16%)    subtle border
// text:    hsl(40,15%,90%)     warm white
// muted:   hsl(220,8%,48%)     muted gray
// accent:  hsl(28,100%,60%)    electric orange
// ──────────────────────────────────────────────────────────────────────────

// ─── DATA ─────────────────────────────────────────────────────────────────

const skillGroups = [
  { label: "Engineering", color: "text-orange-300 border-orange-400/30 bg-orange-400/8",
    items: ["Mechanical Design","Fluid Dynamics","FEA Analysis","Machine Design","Hydraulics"] },
  { label: "Software",    color: "text-violet-300 border-violet-400/30 bg-violet-400/8",
    items: ["SolidWorks","3D Experience","Fusion 360","Python"] },
  { label: "Hardware",    color: "text-sky-300 border-sky-400/30 bg-sky-400/8",
    items: ["3D Printing","Arduino","Raspberry Pi"] },
  { label: "Languages",   color: "text-emerald-300 border-emerald-400/30 bg-emerald-400/8",
    items: ["French — Native","English — Fluent"] },
];

const education = [
  { degree: "Master's in Mechanical Engineering", school: "HES-SO Master · Lausanne, Switzerland",
    period: "2025 – Present",
    desc: "Advanced study in product development and design, production of components and systems, materials and manufacturing techniques. Focus on mechanical and mechatronic systems, including their control and automation and in-depth skills in simulation, analysis, optimization and validation." },
  { degree: "Bachelor's in Mechanical Engineering", school: "Cal Poly Pomona · Pomona, USA",
    period: "2018 – 2023", note: "GPA 3.58",
    desc: "Core curriculum in mechanical design, fluid dynamics, thermodynamics, and materials science." },
];

const experience = [
  { title: "Design Engineer I", company: "Griswold Industries DBA CLA-VAL", period: "2023 – 2025",
    bullets: [
      "Designed and optimized components for aircraft refueling systems such as nozzles, inline valves, and couplers.",
      "Collaborated with engineering and sales teams to develop new products based on customer requirements.",
      "Developed and executed testing procedures ensuring compliance with industry standards.",
      "Designed custom testing fixtures to streamline product validation.",
      "Applied fluid dynamics principles to improve component performance and reliability.",
      "Performed structural analysis using SolidWorks FEA to evaluate durability under loading conditions.",
    ]},
  { title: "Engineering Lab Tech Asst — Intern", company: "CLA-VAL Summer Internship", period: "Jun – Aug 2022",
    bullets: [
      "Designed six mechanical assemblies using SolidWorks to client specifications.",
      "Contributed to the full product development cycle from concept to implementation.",
      "Designed structural brackets for the new 353GF coupler generation.",
    ]},
  { title: "Co-Founder", company: "Safaran Boutique", period: "2022 – 2023",
    bullets: [
      "Co-founded and operated a retail business with two partners.",
      "Managed sourcing, logistics, sales, and operational strategy.",
    ]},
];

type Project = {
  num: string; label: string; accent: string;
  title: string; period: string; desc: string;
  tools: string[]; images?: string[];
};

const workProjects: Project[] = [
  { num:"01", label:"CLA-VAL", accent:"text-orange-400", title:"Manifold — Pilot Block", period:"2025",
    desc:"Aluminum hog-out manifold used to control the piston of a main valve via solenoids and pressure regulators. Designed for compactness and ease of assembly in an aircraft refueling truck.",
    tools:["SolidWorks","GD&T","Aluminum Machining","Fluid Systems"], images:["/projects/manifold-3d.png"] },
  { num:"02", label:"CLA-VAL", accent:"text-orange-400", title:"Bypass Valve — 381GF", period:"2023",
    desc:"New design iteration of a differential pressure bypass valve for aircraft refueling applications. Focused on improving manufacturability and performance under dynamic pressure conditions.",
    tools:["SolidWorks","GD&T","Fluid Dynamics","Valve Design"], images:["/projects/bypass-3d.png"] },
  { num:"03", label:"CLA-VAL", accent:"text-orange-400", title:"Test Fixture — 1626M", period:"2024",
    desc:"Custom test fixture designed to validate the performance of the 1626M valve under simulated operating conditions. Ensured repeatable clamping and alignment for consistent test results.",
    tools:["SolidWorks","FEA","GD&T","Testing & Validation"], images:["/projects/fixture-3d.png"] },
  { num:"04", label:"CLA-VAL", accent:"text-orange-400", title:"Spring Compression Tool — X149", period:"2024",
    desc:"Specialized tool to safely compress and hold the internal spring of the X149 valve during assembly and disassembly. Designed to reduce assembly time and improve technician safety.",
    tools:["SolidWorks","Tooling Design","GD&T","Assembly"], images:["/projects/spring-tool-1.png","/projects/spring-tool-2.png"] },
  { num:"05", label:"CLA-VAL", accent:"text-orange-400", title:"Wire Rope Hub — Press Master", period:"2024",
    desc:"Hub component for a wire rope press machine used in internal assembly operations. Designed for durability and precise fitment within the press assembly.",
    tools:["SolidWorks","GD&T","Aluminum Machining","Mechanical Design"], images:["/projects/hub-3d.png","/projects/hub-2.png"] },
];

const academicProjects: Project[] = [
  { num:"01", label:"Academic", accent:"text-violet-400", title:"Unmanned Ground Vehicle — NGCP Senior Project", period:"2022 – 2023",
    desc:"Full UGV design for the NGCP competition. Mission: drive to GPS targets, retrieve a care package and miniature figure (injured hiker), then hand off to a UAV. Responsible for the full payload assembly including rotation plate, linkage bar, leverage arm, linear actuator, storage unit, and separation sub-assembly.",
    tools:["SolidWorks","FEA","3D Printing","Team Design","Systems Integration"], images:["/projects/ugv-3d.png"] },
  { num:"02", label:"Academic", accent:"text-violet-400", title:"CFD Simulations — ANSYS Fluent", period:"2024",
    desc:"Two CFD studies using ANSYS Fluent. (1) NACA 4412 airfoil: simulated lift and drag across multiple angles of attack (0°–15°), comparing k-ε Realizable, k-ω SST, and Spalart-Allmaras turbulence models. (2) Liquid sloshing (ballottement) in a spherical tank: modeled free-surface dynamics under lateral excitation using the VOF multiphase method.",
    tools:["ANSYS Fluent","CFD","VOF Multiphase","Turbulence Modeling","Mesh Generation","Aerodynamics"],
    images:["/projects/naca4412-cfd.png","/projects/ballottement-cfd.png"] },
];

const personalProjects: Project[] = [
  { num:"01", label:"Personal", accent:"text-sky-400", title:"Arduino Door Lock Mechanism", period:"Jul – Aug 2021",
    desc:"Designed and built a custom door lock mechanism combining Arduino control logic with 3D-printed mechanical components — concept to working prototype.",
    tools:["Arduino","3D Printing","CAD","Embedded Systems"] },
  { num:"02", label:"Personal", accent:"text-sky-400", title:"3D Printing Projects", period:"Ongoing",
    desc:"Designing and printing mechanical parts, enclosures, and functional prototypes. Each project covers the full loop from CAD model to physical object.",
    tools:["3D Printing","CAD","Fusion 360","Prototyping"] },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────

export default function Page() {
  const [page, setPage] = useState<PageKey>("about");
  const [mob, setMob]   = useState(false);
  const [lb, setLb]     = useState<string | null>(null);

  const go = (id: PageKey) => { setPage(id); setMob(false); };

  const navItems: { id: PageKey; label: string; num: string }[] = [
    { id:"about",    label:"About",    num:"01" },
    { id:"cv",       label:"CV",       num:"02" },
    { id:"projects", label:"Projects", num:"03" },
    { id:"contact",  label:"Contact",  num:"04" },
  ];

  /* ─────────── shared section header ─────────── */
  const SectionHeader = ({ num, title }: { num: string; title: string }) => (
    <div className="flex items-center gap-5 mb-14">
      <span className="font-mono text-[11px] text-[hsl(28,100%,60%)] tracking-widest">{num}</span>
      <span className="h-px flex-1 bg-[hsl(222,20%,16%)]" />
      <span className="font-mono text-[11px] text-[hsl(220,8%,48%)] uppercase tracking-widest">{title}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[hsl(222,22%,7%)] text-[hsl(40,15%,90%)]">

      {/* ── LIGHTBOX ──────────────────────────────────────────────────── */}
      {lb && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={() => setLb(null)}>
          <div className="relative" onClick={e => e.stopPropagation()}>
            <img src={lb} alt="" className="max-h-[88vh] max-w-[88vw] object-contain rounded-lg shadow-2xl" />
            <button onClick={() => setLb(null)} className="absolute -top-10 right-0 font-mono text-xs text-[hsl(220,8%,52%)] hover:text-white transition-colors">
              ESC / CLOSE ✕
            </button>
          </div>
        </div>
      )}

      {/* ── SIDEBAR ───────────────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-[240px] bg-[hsl(222,22%,9%)] border-r border-[hsl(222,20%,13%)] sidebar-grid z-20">

        {/* Monogram */}
        <div className="px-8 pt-10 pb-8">
          <button onClick={() => go("about")} className="group block">
            <div className="w-10 h-10 rounded-lg bg-[hsl(28,100%,60%)] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <span className="font-black text-[hsl(222,22%,7%)] text-sm tracking-tight">VG</span>
            </div>
            <p className="font-black text-[hsl(40,15%,92%)] text-lg leading-tight tracking-tight">
              Victor<br />Garnier
            </p>
            <p className="font-mono text-[10px] text-[hsl(220,8%,48%)] mt-2 uppercase tracking-widest">
              Mech. Engineer
            </p>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col px-4 flex-1">
          {navItems.map(item => {
            const active = page === item.id;
            return (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left group overflow-hidden ${
                  active
                    ? "text-[hsl(40,15%,92%)]"
                    : "text-[hsl(220,8%,48%)] hover:text-[hsl(40,15%,80%)]"
                }`}
              >
                {/* Active background */}
                {active && (
                  <span className="absolute inset-0 bg-[hsl(222,20%,14%)] rounded-lg" />
                )}
                {/* Active left bar */}
                {active && (
                  <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-[hsl(28,100%,60%)]" />
                )}
                <span className={`relative font-mono text-[10px] w-5 ${active ? "text-[hsl(28,100%,60%)]" : "text-[hsl(220,8%,36%)] group-hover:text-[hsl(220,8%,52%)]"} transition-colors`}>
                  {item.num}
                </span>
                <span className="relative">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Decorative circle drawing */}
        <div className="px-8 py-6 opacity-[0.18] pointer-events-none select-none">
          <svg viewBox="0 0 80 60" fill="none" className="w-20 h-16">
            <circle cx="30" cy="30" r="26" stroke="hsl(28,100%,60%)" strokeWidth="0.7" />
            <circle cx="30" cy="30" r="16" stroke="hsl(28,100%,60%)" strokeWidth="0.9" />
            <circle cx="30" cy="30" r="6"  stroke="hsl(28,100%,60%)" strokeWidth="1" />
            <circle cx="30" cy="30" r="1.5" fill="hsl(28,100%,60%)" />
            <line x1="0" y1="30" x2="60" y2="30" stroke="hsl(28,100%,60%)" strokeWidth="0.4" strokeOpacity="0.6" />
            <line x1="30" y1="2"  x2="30" y2="58" stroke="hsl(28,100%,60%)" strokeWidth="0.4" strokeOpacity="0.6" />
            <circle cx="30" cy="4"  r="2.5" stroke="hsl(28,100%,60%)" strokeWidth="0.7" />
            <circle cx="30" cy="56" r="2.5" stroke="hsl(28,100%,60%)" strokeWidth="0.7" />
            <circle cx="4"  cy="30" r="2.5" stroke="hsl(28,100%,60%)" strokeWidth="0.7" />
            <circle cx="56" cy="30" r="2.5" stroke="hsl(28,100%,60%)" strokeWidth="0.7" />
            <line x1="62" y1="10" x2="75" y2="10" stroke="hsl(28,100%,60%)" strokeWidth="0.5" strokeOpacity="0.5" />
            <line x1="62" y1="30" x2="78" y2="30" stroke="hsl(28,100%,60%)" strokeWidth="0.5" strokeOpacity="0.5" />
            <line x1="62" y1="50" x2="75" y2="50" stroke="hsl(28,100%,60%)" strokeWidth="0.5" strokeOpacity="0.5" />
          </svg>
        </div>

        {/* Bottom */}
        <div className="px-8 pb-8 pt-4 border-t border-[hsl(222,20%,13%)] space-y-3">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[10px] text-[hsl(220,8%,48%)] uppercase tracking-wider">Available</span>
          </div>
          <p className="font-mono text-[10px] text-[hsl(220,8%,38%)]">Lausanne · CH</p>
          <a href="/Victor_Garnier_CV.pdf" className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-[hsl(28,100%,60%)] hover:text-[hsl(28,100%,72%)] transition-colors underline-draw">
            ↓ Download CV
          </a>
        </div>
      </aside>

      {/* ── MOBILE HEADER ─────────────────────────────────────────────── */}
      <header className="lg:hidden fixed top-0 inset-x-0 z-30 h-14 flex items-center justify-between px-6 bg-[hsl(222,22%,7%)]/95 backdrop-blur border-b border-[hsl(222,20%,13%)]">
        <button onClick={() => go("about")} className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-[hsl(28,100%,60%)] flex items-center justify-center">
            <span className="font-black text-[hsl(222,22%,7%)] text-[9px]">VG</span>
          </div>
          <span className="font-black text-sm text-[hsl(40,15%,90%)]">Victor Garnier</span>
        </button>
        <button onClick={() => setMob(!mob)} className="flex flex-col gap-1.5 p-1" aria-label="Menu">
          <span className={`block h-px w-5 bg-[hsl(40,15%,60%)] transition-transform origin-center ${mob ? "translate-y-[6.5px] rotate-45" : ""}`} />
          <span className={`block h-px w-5 bg-[hsl(40,15%,60%)] transition-opacity ${mob ? "opacity-0" : ""}`} />
          <span className={`block h-px w-5 bg-[hsl(40,15%,60%)] transition-transform origin-center ${mob ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
        </button>
      </header>

      {mob && (
        <div className="lg:hidden fixed inset-0 z-20 pt-14 bg-[hsl(222,22%,7%)] flex flex-col px-6 py-8 space-y-1">
          {navItems.map(item => (
            <button key={item.id} onClick={() => go(item.id)}
              className={`flex items-center gap-4 px-4 py-4 rounded-xl text-sm font-medium transition-all ${
                page === item.id ? "bg-[hsl(222,20%,14%)] text-[hsl(40,15%,92%)]" : "text-[hsl(220,8%,48%)]"
              }`}>
              <span className="font-mono text-[10px] text-[hsl(28,100%,60%)]">{item.num}</span>
              {item.label}
            </button>
          ))}
          <div className="pt-6 border-t border-[hsl(222,20%,16%)]">
            <a href="/Victor_Garnier_CV.pdf" className="flex items-center gap-2 px-4 py-3 font-mono text-sm font-semibold text-[hsl(28,100%,60%)]">↓ Download CV</a>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          MAIN
      ══════════════════════════════════════════════════════════════════ */}
      <main className="lg:ml-[240px] min-h-screen">

        {/* ══════════════ ABOUT ══════════════════════════════════════════ */}
        {page === "about" && (
          <div key="about">

            {/* Hero */}
            <section className="relative px-8 md:px-16 pt-24 lg:pt-20 pb-20 overflow-hidden border-b border-[hsl(222,20%,13%)]">

              {/* Giant ghost number */}
              <span
                className="anim-fade-in absolute right-0 top-0 font-black leading-none select-none pointer-events-none text-white/[0.025]"
                style={{ fontSize: "clamp(140px,22vw,280px)" }}
                aria-hidden
              >01</span>

              {/* Orange horizontal accent line top */}
              <div className="anim-fade-in absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[hsl(28,100%,60%)] via-[hsl(28,100%,60%)]/40 to-transparent" />

              {/* Label */}
              <p className="anim-fade-up font-mono text-[11px] text-[hsl(28,100%,60%)] tracking-[0.2em] uppercase mb-10">
                Mechanical Engineer
              </p>

              {/* Name */}
              <h1
                className="anim-fade-up d1 gradient-text font-black leading-none tracking-tighter mb-8"
                style={{ fontSize: "clamp(64px, 10vw, 130px)", letterSpacing: "-0.035em" }}
              >
                Victor<br />Garnier
              </h1>

              {/* Tagline row */}
              <div className="anim-fade-up d2 flex flex-wrap items-center gap-4 mb-10">
                <span className="inline-flex items-center gap-2 font-mono text-xs text-[hsl(220,8%,52%)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available for opportunities
                </span>
                <span className="text-[hsl(222,20%,20%)]">|</span>
                <span className="font-mono text-xs text-[hsl(220,8%,42%)]">Lausanne, Switzerland</span>
                <span className="text-[hsl(222,20%,20%)]">|</span>
                <span className="font-mono text-xs text-[hsl(220,8%,42%)]">FR / EN</span>
              </div>

              {/* Intro */}
              <p className="anim-fade-up d3 max-w-xl text-[16px] leading-7 text-[hsl(220,8%,62%)] mb-10">
                2 years designing aircraft refueling systems at CLA-VAL.
                Currently pursuing M.Sc. in Mechanical Engineering at HES-SO Master, Lausanne.
              </p>

              {/* CTAs */}
              <div className="anim-fade-up d4 flex flex-wrap gap-3">
                <button
                  onClick={() => go("contact")}
                  className="h-11 px-7 rounded-full bg-[hsl(28,100%,60%)] hover:bg-[hsl(28,100%,68%)] text-[hsl(222,22%,7%)] text-sm font-black transition-all hover:shadow-lg hover:shadow-[hsl(28,100%,60%)]/25 hover:-translate-y-0.5"
                >
                  Get in touch
                </button>
                <button
                  onClick={() => go("projects")}
                  className="h-11 px-7 rounded-full border border-[hsl(222,20%,22%)] text-[hsl(40,15%,72%)] text-sm font-medium hover:border-[hsl(28,100%,60%)]/40 hover:text-[hsl(40,15%,90%)] transition-all"
                >
                  View projects →
                </button>
                <a
                  href="/Victor_Garnier_CV.pdf"
                  className="h-11 px-7 rounded-full border border-[hsl(222,20%,22%)] text-[hsl(40,15%,72%)] text-sm font-medium hover:border-[hsl(222,20%,30%)] hover:text-[hsl(40,15%,90%)] transition-all flex items-center"
                >
                  ↓ CV
                </a>
              </div>
            </section>

            {/* Stats strip */}
            <section className="anim-fade-up border-b border-[hsl(222,20%,13%)] bg-[hsl(222,22%,9%)]">
              <dl className="px-8 md:px-16 flex flex-wrap">
                {[
                  { value: "2 yrs",   label: "Industry experience" },
                  { value: "FR / EN", label: "Bilingual" },
                  { value: "FE Exam", label: "NCEES Certified" },
                  { value: "M.Sc.",   label: "HES-SO Lausanne" },
                ].map((s, i) => (
                  <div key={s.label} className={`flex-1 min-w-[120px] py-7 px-6 ${i !== 0 ? "border-l border-[hsl(222,20%,13%)]" : ""}`}>
                    <dd className="text-[22px] font-black text-[hsl(40,15%,92%)] leading-tight">{s.value}</dd>
                    <dt className="font-mono text-[10px] text-[hsl(220,8%,42%)] uppercase tracking-wider mt-1">{s.label}</dt>
                  </div>
                ))}
              </dl>
            </section>

            {/* About + Info */}
            <section className="anim-fade-up d1 px-8 md:px-16 py-16 grid lg:grid-cols-[1fr_260px] gap-14">
              <div>
                <p className="font-mono text-[11px] text-[hsl(28,100%,60%)] uppercase tracking-[0.15em] mb-8">
                  — Background
                </p>
                <div className="space-y-5 text-[15px] leading-7 text-[hsl(220,8%,60%)]">
                  <p>
                    I'm a mechanical engineer with a B.Sc. from{" "}
                    <span className="text-[hsl(40,15%,85%)] font-medium">Cal Poly Pomona</span>{" "}
                    (California, USA) — a polytechnic university with a strong emphasis on hands-on
                    engineering education. My degree gave me a rigorous foundation in fluid dynamics,
                    thermodynamics, machine design, materials science, and structural analysis.
                  </p>
                  <p>
                    After graduating, I joined{" "}
                    <span className="text-[hsl(40,15%,85%)] font-medium">Griswold Industries (CLA-VAL)</span>{" "}
                    as a Design Engineer, where I spent two years designing and optimizing components for
                    aircraft refueling systems — nozzles, inline valves, and hydrant couplers. I worked
                    across the full product lifecycle: concept design in SolidWorks, FEA structural
                    validation in FEMAP, custom test fixture design, and compliance testing.
                  </p>
                  <p>
                    I'm currently pursuing an{" "}
                    <span className="text-[hsl(40,15%,85%)] font-medium">M.Sc. in Mechanical Engineering at HES-SO Master</span>{" "}
                    in Lausanne, Switzerland, deepening my analytical and research capabilities in
                    advanced simulation and applied mechanics.
                  </p>
                  <p>
                    I'm a{" "}
                    <span className="text-[hsl(40,15%,85%)] font-medium">native French speaker</span>{" "}
                    and{" "}
                    <span className="text-[hsl(40,15%,85%)] font-medium">fluent in English</span>{" "}
                    — I completed my undergraduate degree entirely in English in the US.
                  </p>
                </div>
              </div>

              <aside className="space-y-3">
                {[
                  { label:"Current",    head:"M.Sc. Student",     sub:"HES-SO Master · Lausanne",     badge:"Active" },
                  { label:"Previously", head:"Design Engineer I", sub:"CLA-VAL · 2023–2025",          badge:null },
                  { label:"Certified",  head:"NCEES FE Exam",     sub:"Fundamentals of Engineering",  badge:null },
                  { label:"Education",  head:"B.Sc. Mech. Eng.",  sub:"Cal Poly Pomona · GPA 3.58",   badge:null },
                ].map(c => (
                  <div key={c.label} className="card-hover rounded-xl border border-[hsl(222,20%,16%)] bg-[hsl(222,20%,10%)] p-5">
                    <p className="font-mono text-[10px] text-[hsl(220,8%,42%)] uppercase tracking-widest mb-2">{c.label}</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-[hsl(40,15%,90%)] text-sm">{c.head}</p>
                      {c.badge && (
                        <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                          {c.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[hsl(220,8%,50%)] mt-0.5">{c.sub}</p>
                  </div>
                ))}
              </aside>
            </section>

            {/* Skills */}
            <section className="px-8 md:px-16 py-14 border-t border-[hsl(222,20%,13%)]">
              <p className="font-mono text-[11px] text-[hsl(28,100%,60%)] uppercase tracking-[0.15em] mb-10">
                — Skills & Tools
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {skillGroups.map(g => (
                  <div key={g.label} className="card-hover rounded-xl border border-[hsl(222,20%,16%)] bg-[hsl(222,20%,10%)] p-5">
                    <span className={`inline-block font-mono text-[10px] font-bold px-2.5 py-1 rounded border mb-5 uppercase tracking-wider ${g.color}`}>
                      {g.label}
                    </span>
                    <ul className="space-y-2">
                      {g.items.map(item => (
                        <li key={item} className="text-sm text-[hsl(220,8%,56%)]">{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Interests */}
            <section className="px-8 md:px-16 py-14 border-t border-[hsl(222,20%,13%)]">
              <p className="font-mono text-[11px] text-[hsl(28,100%,60%)] uppercase tracking-[0.15em] mb-10">
                — Outside Engineering
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { icon:"◈", title:"3D Printing",           color:"text-orange-400", desc:"Designing and printing mechanical parts, enclosures, and gadgets. Full loop from CAD model to physical object." },
                  { icon:"⬡", title:"Electronics & RPi",     color:"text-violet-400", desc:"Building small automation projects and experimenting with different sensors." },
                  { icon:"⬟", title:"Soccer",                color:"text-emerald-400", desc:"Playing, watching, and discussing the beautiful game." },
                  { icon:"◇", title:"Snowboarding",          color:"text-sky-400",    desc:"Riding in the Alps when the season allows. Physics in action." },
                  { icon:"◎", title:"Music",                 color:"text-amber-400",  desc:"Listening and occasionally playing. Good soundtrack for long design sessions." },
                ].map(i => (
                  <div key={i.title} className="card-hover rounded-xl border border-[hsl(222,20%,16%)] bg-[hsl(222,20%,10%)] p-5">
                    <span className={`text-2xl block mb-3 ${i.color}`}>{i.icon}</span>
                    <h3 className="font-semibold text-[hsl(40,15%,88%)] text-sm mb-2">{i.title}</h3>
                    <p className="text-sm text-[hsl(220,8%,52%)] leading-6">{i.desc}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* ══════════════ CV ═════════════════════════════════════════════ */}
        {page === "cv" && (
          <div key="cv" className="anim-fade-up px-8 md:px-16 pt-24 lg:pt-16 pb-20">

            <div className="flex items-center gap-5 mb-16">
              <div className="h-[2px] w-8 bg-[hsl(28,100%,60%)]" />
              <SectionHeader num="02" title="Curriculum Vitae" />
              <a href="/Victor_Garnier_CV.pdf" className="font-mono text-xs text-[hsl(28,100%,60%)] hover:text-[hsl(28,100%,72%)] transition-colors underline-draw ml-auto shrink-0">
                ↓ PDF
              </a>
            </div>

            {/* Experience */}
            <div className="mb-20">
              <p className="font-mono text-[11px] text-[hsl(28,100%,60%)] uppercase tracking-[0.15em] mb-12">— Work Experience</p>
              <div className="space-y-0">
                {experience.map((e, i) => (
                  <div key={e.title} className="relative flex gap-10 pb-12 last:pb-0">
                    {i < experience.length - 1 && (
                      <div className="absolute left-[7px] top-8 bottom-0 w-px bg-[hsl(222,20%,18%)]" />
                    )}
                    <div className="mt-1.5 shrink-0">
                      <div className="h-3.5 w-3.5 rounded-full border-2 border-[hsl(28,100%,60%)] bg-[hsl(222,22%,7%)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[11px] text-[hsl(28,100%,60%)] mb-2 uppercase tracking-widest">{e.period}</p>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 mb-4">
                        <h3 className="font-black text-[hsl(40,15%,90%)] text-lg">{e.title}</h3>
                        <span className="text-sm text-[hsl(220,8%,48%)]">{e.company}</span>
                      </div>
                      <ul className="space-y-2">
                        {e.bullets.map(b => (
                          <li key={b} className="flex items-start gap-3 text-sm text-[hsl(220,8%,56%)] leading-6">
                            <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[hsl(28,100%,60%)]" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mb-20">
              <p className="font-mono text-[11px] text-[hsl(28,100%,60%)] uppercase tracking-[0.15em] mb-12">— Education</p>
              <div className="space-y-0">
                {education.map((e, i) => (
                  <div key={e.degree} className="relative flex gap-10 pb-12 last:pb-0">
                    {i < education.length - 1 && (
                      <div className="absolute left-[7px] top-8 bottom-0 w-px bg-[hsl(222,20%,18%)]" />
                    )}
                    <div className="mt-1.5 shrink-0">
                      <div className="h-3.5 w-3.5 rounded-full border-2 border-[hsl(28,100%,60%)]/50 bg-[hsl(222,22%,7%)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[11px] text-[hsl(28,100%,60%)] mb-2 uppercase tracking-widest">{e.period}</p>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                        <h3 className="font-black text-[hsl(40,15%,90%)] text-lg">{e.degree}</h3>
                        {"note" in e && e.note && (
                          <span className="font-mono text-[10px] text-[hsl(28,100%,60%)] border border-[hsl(28,100%,60%)]/30 px-2 py-0.5 rounded">
                            {e.note}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[hsl(220,8%,52%)] mb-4">{e.school}</p>
                      <p className="text-sm text-[hsl(220,8%,56%)] leading-6">{e.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certification */}
            <div>
              <p className="font-mono text-[11px] text-[hsl(28,100%,60%)] uppercase tracking-[0.15em] mb-8">— Certification</p>
              <div className="card-hover rounded-xl border border-[hsl(222,20%,16%)] bg-[hsl(222,20%,10%)] p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-black text-[hsl(40,15%,90%)]">NCEES — Fundamentals of Engineering (FE)</h3>
                    <p className="text-sm text-[hsl(220,8%,50%)] mt-1">NCEES</p>
                  </div>
                  <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 shrink-0">
                    Completed
                  </span>
                </div>
                <p className="mt-4 text-sm text-[hsl(220,8%,54%)] leading-6">
                  First step toward becoming a licensed Professional Engineer. Demonstrates foundational
                  competency across all core engineering disciplines.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* ══════════════ PROJECTS ═══════════════════════════════════════ */}
        {page === "projects" && (
          <div key="projects" className="anim-fade-up px-8 md:px-16 pt-24 lg:pt-16 pb-20">

            <SectionHeader num="03" title="Projects" />

            {[
              { heading:"Work Projects",     accent:"text-orange-400", items: workProjects },
              { heading:"Academic Projects", accent:"text-violet-400", items: academicProjects },
              { heading:"Personal Projects", accent:"text-sky-400",    items: personalProjects },
            ].map(section => (
              <div key={section.heading} className="mb-16">
                <p className={`font-mono text-[11px] uppercase tracking-[0.15em] mb-8 flex items-center gap-4 ${section.accent}`}>
                  — {section.heading}
                  <span className="flex-1 h-px bg-[hsl(222,20%,16%)]" />
                </p>

                {section.items.length === 0 ? (
                  <p className="font-mono text-sm text-[hsl(220,8%,38%)] italic">Coming soon.</p>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {section.items.map(p => (
                      <article key={p.num} className="card-hover flex flex-col rounded-xl border border-[hsl(222,20%,16%)] bg-[hsl(222,20%,10%)] overflow-hidden">

                        {/* Image strip */}
                        {p.images && p.images.length > 0 && (
                          <div className="flex gap-0.5 overflow-x-auto scrollbar-none">
                            {p.images.map((src, i) => (
                              <button
                                key={i}
                                onClick={() => setLb(src)}
                                className="relative shrink-0 w-full bg-[hsl(222,22%,8%)] flex items-center justify-center p-3"
                                style={{ minWidth: p.images!.length > 1 ? "60%" : "100%" }}
                              >
                                <img
                                  src={src}
                                  alt={`${p.title} ${i + 1}`}
                                  className="w-full h-auto max-h-56 object-contain opacity-90 hover:opacity-100 transition-opacity"
                                />
                              </button>
                            ))}
                          </div>
                        )}

                        <div className="p-6 flex flex-col flex-1">
                          <div className="flex items-center justify-between mb-4">
                            <span className={`font-mono text-[10px] font-bold uppercase tracking-wider ${p.accent}`}>{p.label}</span>
                            <span className="font-mono text-[10px] text-[hsl(220,8%,36%)]">{p.num}</span>
                          </div>
                          <h3 className="font-bold text-[hsl(40,15%,90%)] text-[15px] mb-3 leading-snug">{p.title}</h3>
                          <p className="text-sm text-[hsl(220,8%,54%)] leading-6 flex-1">{p.desc}</p>
                          <div className="mt-5 pt-4 border-t border-[hsl(222,20%,16%)] flex flex-wrap items-center justify-between gap-2">
                            <div className="flex flex-wrap gap-x-3 gap-y-1">
                              {p.tools.map(t => (
                                <span key={t} className="font-mono text-[11px] text-[hsl(220,8%,44%)]">{t}</span>
                              ))}
                            </div>
                            <span className="font-mono text-[11px] text-[hsl(220,8%,36%)] shrink-0">{p.period}</span>
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

        {/* ══════════════ CONTACT ════════════════════════════════════════ */}
        {page === "contact" && (
          <div key="contact" className="anim-fade-up px-8 md:px-16 pt-24 lg:pt-16 pb-20 min-h-screen flex flex-col">

            <SectionHeader num="04" title="Contact" />

            <div className="flex-1 flex flex-col justify-center max-w-2xl">

              {/* Big heading */}
              <h2
                className="anim-fade-up gradient-text font-black leading-none tracking-tighter mb-8"
                style={{ fontSize: "clamp(40px, 7vw, 84px)", letterSpacing: "-0.035em" }}
              >
                Looking forward<br />to meeting you.
              </h2>

              <p className="anim-fade-up d1 text-[16px] leading-7 text-[hsl(220,8%,56%)] mb-14 max-w-md">
                Whether you have a project in mind, a thesis opportunity, or just want to connect — I'd love to hear from you.
              </p>

              {/* Contact cards */}
              <div className="anim-fade-up d2 grid sm:grid-cols-[1fr_240px] gap-5">
                <div className="space-y-3">
                  {[
                    { label:"Email",    value:"vgarnier0125@gmail.com", href:"mailto:vgarnier0125@gmail.com" },
                    { label:"Phone",    value:"+41 78 601 73 05",       href:"tel:+41786017305" },
                    { label:"Location", value:"Lausanne, Switzerland",  href:null },
                  ].map(c => (
                    <div key={c.label} className="card-hover rounded-xl border border-[hsl(222,20%,16%)] bg-[hsl(222,20%,10%)] p-5 flex items-center justify-between group">
                      <div>
                        <p className="font-mono text-[10px] text-[hsl(28,100%,60%)] uppercase tracking-wider mb-1">{c.label}</p>
                        {c.href ? (
                          <a href={c.href} className="text-sm font-medium text-[hsl(40,15%,82%)] hover:text-white transition-colors underline-draw" target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                            {c.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-[hsl(40,15%,82%)]">{c.value}</p>
                        )}
                      </div>
                      {c.href && <span className="text-[hsl(220,8%,38%)] group-hover:text-[hsl(28,100%,60%)] transition-colors">→</span>}
                    </div>
                  ))}
                </div>

                {/* Open to */}
                <div className="card-hover rounded-xl border border-[hsl(222,20%,16%)] bg-[hsl(222,20%,10%)] p-5">
                  <p className="font-mono text-[10px] text-[hsl(28,100%,60%)] uppercase tracking-wider mb-5">Open to</p>
                  <ul className="space-y-3">
                    {[
                      "Mechanical design & engineering roles",
                      "Master Thesis in applied mechanics or simulation",
                      "R&D and simulation-driven positions",
                      "3D printing and prototyping work",
                    ].map(item => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[hsl(220,8%,52%)] leading-5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(28,100%,60%)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 pt-4 border-t border-[hsl(222,20%,16%)] space-y-1">
                    <p className="font-mono text-[10px] text-[hsl(220,8%,38%)]">Lausanne, Switzerland</p>
                    <p className="font-mono text-[10px] text-[hsl(220,8%,38%)]">French & English</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-20 pt-6 border-t border-[hsl(222,20%,13%)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded bg-[hsl(28,100%,60%)] flex items-center justify-center">
                  <span className="font-black text-[hsl(222,22%,7%)] text-[7px]">VG</span>
                </div>
                <p className="font-mono text-[10px] text-[hsl(220,8%,40%)]">© 2026 Victor Garnier</p>
              </div>
              <div className="flex items-center gap-5">
                {navItems.map(item => (
                  <button key={item.id} onClick={() => go(item.id)}
                    className="font-mono text-[10px] text-[hsl(220,8%,40%)] hover:text-[hsl(28,100%,60%)] transition-colors uppercase tracking-wider">
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
