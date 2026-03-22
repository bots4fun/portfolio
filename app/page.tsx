"use client";

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
    items: ["SolidWorks", "3D Experience", "Fusion 360", "Python"],
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
    color:  "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    title:  "Manifold — Pilot Block",
    period: "2023 – 2025",
    desc:   "Aluminum hog-out manifold used to control the piston of a main valve via solenoids and pressure regulators, allowing or restricting flow in the system.",
    tools:  ["SolidWorks", "GD&T", "Aluminum Machining", "Fluid Systems"],
    images: ["/projects/manifold-3d.png"],
  },
  {
    num:    "02",
    label:  "CLA-VAL",
    color:  "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    title:  "Bypass Valve — 381GF",
    period: "2023",
    desc:   "Bypass valve assembly combining aluminum hog-outs and castings. Opens once system pressure reaches a pre-set value — spring and set-screw dictate the cracking pressure.",
    tools:  ["SolidWorks", "Assembly Design", "GD&T", "Pressure Systems"],
    images: ["/projects/bypass-3d.png"],
  },
  {
    num:    "03",
    label:  "CLA-VAL",
    color:  "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    title:  "Test Fixture — 1626M",
    period: "2024",
    desc:   "Modular test fixture covering valve sizes from 6 in to 27 in. Hermetically seals valves via a custom rubber insert and adjustable clamp. Composed of aluminum parts and off-the-shelf hardware.",
    tools:  ["SolidWorks", "Fixture Design", "Testing", "Aluminum Machining"],
    images: ["/projects/fixture-3d.png"],
  },
  {
    num:    "04",
    label:  "CLA-VAL",
    color:  "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    title:  "Spring Compression Tool — X149",
    period: "2024",
    desc:   "2-in-1 Delrin compression tool for disassembling and reassembling pistons across two different product lines. Compact design keeps all parts attached to avoid loss — built for field use.",
    tools:  ["SolidWorks", "Delrin", "Tool Design", "GD&T"],
    images: ["/projects/spring-tool-1.png", "/projects/spring-tool-2.png"],
  },
  {
    num:    "05",
    label:  "CLA-VAL",
    color:  "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    title:  "Wire Rope Hub — Press Master",
    period: "2024",
    desc:   "Custom aluminum hog-out hub mounted on a 200-ton press shaft via woodruff keys, set screws, and clamping force. Designed to increase shaft diameter and prevent wire cable failure due to bending radius.",
    tools:  ["SolidWorks", "GD&T", "Aluminum Machining", "Mechanical Design"],
    images: ["/projects/hub-3d.png", "/projects/hub-2.png"],
  },
];

const academicProjects: Project[] = [
  {
    num:    "01",
    label:  "Academic",
    color:  "bg-violet-500/10 text-violet-300 border-violet-500/20",
    title:  "Unmanned Ground Vehicle — NGCP Senior Project",
    period: "2022 – 2023",
    desc:   "Full UGV design for the NGCP competition. Mission: drive to GPS targets, retrieve a care package and miniature figure (injured hiker), then hand off to a UAV. Responsible for the full payload assembly including rotation plate, linkage bar, leverage arm, linear actuator, storage unit, and separation sub-assembly.",
    tools:  ["SolidWorks", "FEA", "3D Printing", "Team Design", "Systems Integration"],
    images: ["/projects/ugv-3d.png"],
  },
];

const personalProjects: Project[] = [
  {
    num:    "01",
    label:  "Personal",
    color:  "bg-amber-500/10 text-amber-300 border-amber-500/20",
    title:  "Arduino Door Lock Mechanism",
    period: "Jul – Aug 2021",
    desc:   "Designed and built a custom door lock mechanism combining Arduino control logic with 3D-printed mechanical components — concept to working prototype.",
    tools:  ["Arduino", "3D Printing", "CAD", "Embedded Systems"],
    // images: ["/projects/doorlock-1.jpg"],
  },
  {
    num:    "02",
    label:  "Personal",
    color:  "bg-amber-500/10 text-amber-300 border-amber-500/20",
    title:  "3D Printing Projects",
    period: "Ongoing",
    desc:   "Designing and printing mechanical parts, enclosures, and functional prototypes. Each project covers the full loop from CAD model to physical object.",
    tools:  ["3D Printing", "CAD", "Fusion 360", "Prototyping"],
    // images: ["/projects/print-1.jpg", "/projects/print-2.jpg"],
  },
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

            <div className="mx-auto max-w-5xl px-6 pt-16 pb-16 md:pt-24 md:pb-20 grid md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_360px] gap-10 items-center">
              {/* Left — content */}
              <div>
                <div className="fade-in-up inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[hsl(235,80%,68%)]/20 bg-[hsl(235,80%,68%)]/8 mb-8">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(235,80%,72%)] animate-pulse" />
                  <span className="text-xs font-medium text-[hsl(235,80%,78%)]">
                    Mechanical Engineer · Lausanne, Switzerland
                  </span>
                </div>

                <h1
                  className="fade-in-up d1 gradient-text font-bold leading-none tracking-tight"
                  style={{ fontSize: "clamp(44px, 7.5vw, 96px)", letterSpacing: "-0.025em" }}
                >
                  Victor
                  <br />
                  Garnier
                </h1>

                <p className="fade-in-up d2 mt-7 max-w-md text-[16px] leading-7 text-[hsl(215,15%,60%)]">
                  Mechanical Engineer with a B.Sc. from Cal Poly Pomona and 2 years of industry
                  experience designing aircraft refueling systems at CLA-VAL.
                </p>

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

              {/* Right — engineering SVG illustration */}
              <div className="hidden md:flex items-center justify-center fade-in-up d4">
                <svg viewBox="0 0 320 300" fill="none" className="w-full max-w-xs opacity-95" aria-hidden>
                  {/* Outer ring */}
                  <circle cx="160" cy="150" r="118" stroke="hsl(235,80%,68%)" strokeWidth="0.6" strokeOpacity="0.12" />
                  {/* PCD circle */}
                  <circle cx="160" cy="150" r="80" stroke="hsl(235,80%,68%)" strokeWidth="0.8" strokeOpacity="0.22" />
                  {/* Mid ring */}
                  <circle cx="160" cy="150" r="50" stroke="hsl(235,80%,68%)" strokeWidth="1" strokeOpacity="0.3" />
                  {/* Bore / center circle */}
                  <circle cx="160" cy="150" r="22" stroke="hsl(235,80%,68%)" strokeWidth="1.5" strokeOpacity="0.55" fill="hsl(235,80%,68%)" fillOpacity="0.05" />
                  {/* Center point */}
                  <circle cx="160" cy="150" r="3" fill="hsl(235,80%,68%)" fillOpacity="0.75" />
                  {/* Center crosshairs */}
                  <line x1="30" y1="150" x2="290" y2="150" stroke="hsl(235,80%,68%)" strokeWidth="0.5" strokeOpacity="0.18" />
                  <line x1="160" y1="15" x2="160" y2="285" stroke="hsl(235,80%,68%)" strokeWidth="0.5" strokeOpacity="0.18" />
                  {/* 45° construction lines */}
                  <line x1="66" y1="56" x2="254" y2="244" stroke="hsl(235,80%,68%)" strokeWidth="0.3" strokeOpacity="0.09" />
                  <line x1="254" y1="56" x2="66" y2="244" stroke="hsl(235,80%,68%)" strokeWidth="0.3" strokeOpacity="0.09" />
                  {/* Bolt holes × 4 at 90° on PCD */}
                  <circle cx="160" cy="70" r="7" stroke="hsl(235,80%,68%)" strokeWidth="1" strokeOpacity="0.5" />
                  <line x1="155" y1="70" x2="165" y2="70" stroke="hsl(235,80%,68%)" strokeWidth="0.75" strokeOpacity="0.65" />
                  <line x1="160" y1="65" x2="160" y2="75" stroke="hsl(235,80%,68%)" strokeWidth="0.75" strokeOpacity="0.65" />
                  <circle cx="160" cy="230" r="7" stroke="hsl(235,80%,68%)" strokeWidth="1" strokeOpacity="0.5" />
                  <line x1="155" y1="230" x2="165" y2="230" stroke="hsl(235,80%,68%)" strokeWidth="0.75" strokeOpacity="0.65" />
                  <line x1="160" y1="225" x2="160" y2="235" stroke="hsl(235,80%,68%)" strokeWidth="0.75" strokeOpacity="0.65" />
                  <circle cx="80" cy="150" r="7" stroke="hsl(235,80%,68%)" strokeWidth="1" strokeOpacity="0.5" />
                  <line x1="75" y1="150" x2="85" y2="150" stroke="hsl(235,80%,68%)" strokeWidth="0.75" strokeOpacity="0.65" />
                  <line x1="80" y1="145" x2="80" y2="155" stroke="hsl(235,80%,68%)" strokeWidth="0.75" strokeOpacity="0.65" />
                  <circle cx="240" cy="150" r="7" stroke="hsl(235,80%,68%)" strokeWidth="1" strokeOpacity="0.5" />
                  <line x1="235" y1="150" x2="245" y2="150" stroke="hsl(235,80%,68%)" strokeWidth="0.75" strokeOpacity="0.65" />
                  <line x1="240" y1="145" x2="240" y2="155" stroke="hsl(235,80%,68%)" strokeWidth="0.75" strokeOpacity="0.65" />
                  {/* Dimension line — vertical left */}
                  <line x1="22" y1="32" x2="22" y2="268" stroke="hsl(235,80%,68%)" strokeWidth="0.5" strokeOpacity="0.22" />
                  <line x1="18" y1="42" x2="22" y2="32" stroke="hsl(235,80%,68%)" strokeWidth="0.5" strokeOpacity="0.3" />
                  <line x1="26" y1="42" x2="22" y2="32" stroke="hsl(235,80%,68%)" strokeWidth="0.5" strokeOpacity="0.3" />
                  <line x1="18" y1="258" x2="22" y2="268" stroke="hsl(235,80%,68%)" strokeWidth="0.5" strokeOpacity="0.3" />
                  <line x1="26" y1="258" x2="22" y2="268" stroke="hsl(235,80%,68%)" strokeWidth="0.5" strokeOpacity="0.3" />
                  <line x1="22" y1="32" x2="42" y2="32" stroke="hsl(235,80%,68%)" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="3 2" />
                  <line x1="22" y1="268" x2="42" y2="268" stroke="hsl(235,80%,68%)" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="3 2" />
                  {/* Small secondary circle top-right corner */}
                  <circle cx="286" cy="42" r="24" stroke="hsl(235,80%,68%)" strokeWidth="0.6" strokeOpacity="0.13" />
                  <circle cx="286" cy="42" r="12" stroke="hsl(235,80%,68%)" strokeWidth="0.8" strokeOpacity="0.2" />
                  <circle cx="286" cy="42" r="3.5" stroke="hsl(235,80%,68%)" strokeWidth="1" strokeOpacity="0.4" />
                  <circle cx="286" cy="42" r="1.5" fill="hsl(235,80%,68%)" fillOpacity="0.5" />
                  {/* Leader line from secondary circle */}
                  <line x1="268" y1="58" x2="248" y2="78" stroke="hsl(235,80%,68%)" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="3 2" />
                </svg>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="border-y border-[hsl(222,25%,14%)]">
            <div className="mx-auto max-w-5xl px-6">
              <dl className="flex divide-x divide-[hsl(222,25%,14%)]">
                {[
                  { value: "2 yrs",   label: "Industry experience" },
                  { value: "FR / EN", label: "Bilingual" },
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
                  I'm a mechanical engineer with a B.Sc. from <span className="text-[hsl(215,25%,80%)]">Cal Poly Pomona</span> (California, USA) — a polytechnic university with a strong emphasis on hands-on engineering education. My degree gave me a rigorous foundation in fluid dynamics, thermodynamics, machine design, materials science, and structural analysis.
                </p>
                <p>
                  After graduating, I joined <span className="text-[hsl(215,25%,80%)]">Griswold Industries (CLA-VAL)</span> as a Design Engineer, where I spent two years designing and optimizing components for aircraft refueling systems — nozzles, inline valves, and hydrant couplers. I worked across the full product lifecycle: concept design in SolidWorks, FEA structural validation in FEMAP, custom test fixture design, and compliance testing against industry standards.
                </p>
                <p>
                  I'm currently pursuing an <span className="text-[hsl(215,25%,80%)]">M.Sc. in Mechanical Engineering at HES-SO Master</span> in Lausanne, Switzerland, deepening my analytical and research capabilities in advanced simulation and applied mechanics.
                </p>
                <p>
                  I'm a <span className="text-[hsl(215,25%,80%)]">native French speaker</span> and <span className="text-[hsl(215,25%,80%)]">fluent in English</span> — I completed my undergraduate degree entirely in English in the US. I'm comfortable working in international, multicultural environments and across technical and business contexts.
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

          {/* Interests */}
          <section className="border-t border-[hsl(222,25%,14%)] mx-auto max-w-5xl px-6 py-14">
            <h2 className="text-xs font-medium text-[hsl(215,15%,40%)] uppercase tracking-widest mb-8">
              Interests
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: "◈",
                  title: "3D Printing",
                  desc: "Designing and printing mechanical parts, enclosures, and gadgets. I enjoy the full loop from CAD model to physical object.",
                  color: "text-indigo-400",
                },
                {
                  icon: "⬡",
                  title: "Electronics & Raspberry Pi",
                  desc: "Building small automation projects and experimenting with different sensors.",
                  color: "text-violet-400",
                },
                {
                  icon: "⬟",
                  title: "Soccer",
                  desc: "I love playing, watching and discussing about the beautiful game.",
                  color: "text-emerald-400",
                },
                {
                  icon: "◇",
                  title: "Snowboarding",
                  desc: "Riding in the Alps when the season allows. A good reset from the desk, and a reminder that physics matters.",
                  color: "text-sky-400",
                },
                {
                  icon: "◎",
                  title: "Music",
                  desc: "Listening and occasionally playing. Music helps me focus during long design sessions and unwind after them.",
                  color: "text-amber-400",
                },
              ].map((interest) => (
                <div
                  key={interest.title}
                  className={`glow-card rounded-2xl border ${C.border} ${C.card} p-5`}
                >
                  <div className={`text-xl mb-3 ${interest.color}`}>{interest.icon}</div>
                  <h3 className="font-semibold text-white text-sm mb-1.5">{interest.title}</h3>
                  <p className="text-sm text-[hsl(215,15%,55%)] leading-6">{interest.desc}</p>
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

          {[
            { heading: "Work Projects",     items: workProjects },
            { heading: "Academic Projects", items: academicProjects },
            { heading: "Personal Projects", items: personalProjects },
          ].map((section) => (
            <div key={section.heading} className="mb-14">
              <div className="flex items-center gap-4 mb-7">
                <p className="text-xs font-medium text-[hsl(215,15%,40%)] uppercase tracking-widest shrink-0">
                  {section.heading}
                </p>
                <div className="flex-1 h-px bg-[hsl(222,25%,16%)]" />
              </div>
              {section.items.length === 0 ? (
                <p className="text-sm text-[hsl(215,15%,38%)] italic">Coming soon.</p>
              ) : (
                <div className="grid gap-5 md:grid-cols-2">
                  {section.items.map((p) => (
                    <article key={p.num} className={`glow-card rounded-2xl border ${C.border} ${C.card} flex flex-col overflow-hidden`}>
                      {/* Image strip */}
                      {p.images && p.images.length > 0 && (
                        <div className="flex gap-1 overflow-x-auto scrollbar-none">
                          {p.images.map((src, i) => (
                            <button
                              key={i}
                              onClick={() => setLb(src)}
                              className="relative shrink-0 w-full bg-[hsl(222,28%,9%)] flex items-center justify-center p-2"
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
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          ))}
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
