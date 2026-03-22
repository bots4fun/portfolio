"use client";

import { useState, useEffect, useRef } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────

const skillGroups = [
  { label:"Engineering", color:"text-orange-300 border-orange-400/30 bg-orange-400/8",
    items:["Mechanical Design","Fluid Dynamics","FEA Analysis","Machine Design","Hydraulics"] },
  { label:"Software",    color:"text-violet-300 border-violet-400/30 bg-violet-400/8",
    items:["SolidWorks","3D Experience","Fusion 360","Python"] },
  { label:"Hardware",    color:"text-sky-300 border-sky-400/30 bg-sky-400/8",
    items:["3D Printing","Arduino","Raspberry Pi"] },
  { label:"Languages",   color:"text-emerald-300 border-emerald-400/30 bg-emerald-400/8",
    items:["French — Native","English — Fluent"] },
];

const experience = [
  { title:"Design Engineer I", company:"Griswold Industries DBA CLA-VAL", period:"2023 – 2025",
    bullets:[
      "Designed and optimized components for aircraft refueling systems such as nozzles, inline valves, and couplers.",
      "Collaborated with engineering and sales teams to develop new products based on customer requirements.",
      "Developed and executed testing procedures ensuring compliance with industry standards.",
      "Designed custom testing fixtures to streamline product validation.",
      "Applied fluid dynamics principles to improve component performance and reliability.",
      "Performed structural analysis using SolidWorks FEA to evaluate durability under loading conditions.",
    ]},
  { title:"Engineering Lab Tech Asst — Intern", company:"CLA-VAL Summer Internship", period:"Jun – Aug 2022",
    bullets:[
      "Designed six mechanical assemblies using SolidWorks to client specifications.",
      "Contributed to the full product development cycle from concept to implementation.",
      "Designed structural brackets for the new 353GF coupler generation.",
    ]},
  { title:"Co-Founder", company:"Safaran Boutique", period:"2022 – 2023",
    bullets:[
      "Co-founded and operated a retail business with two partners.",
      "Managed sourcing, logistics, sales, and operational strategy.",
    ]},
];

const education = [
  { degree:"Master's in Mechanical Engineering", school:"HES-SO Master · Lausanne, Switzerland",
    period:"2025 – Present",
    desc:"Advanced study in product development and design, production of components and systems, materials and manufacturing. Focus on simulation, analysis, and optimization of mechanical and mechatronic systems." },
  { degree:"Bachelor's in Mechanical Engineering", school:"Cal Poly Pomona · Pomona, USA",
    period:"2018 – 2023", note:"GPA 3.58",
    desc:"Core curriculum in mechanical design, fluid dynamics, thermodynamics, and materials science." },
];

type Project = {
  num:string; label:string; accent:string;
  title:string; period:string; desc:string;
  tools:string[]; images?:string[];
};

const workProjects: Project[] = [
  { num:"01", label:"CLA-VAL", accent:"text-orange-400",
    title:"Manifold — Pilot Block", period:"2025",
    desc:"Aluminum hog-out manifold used to control the piston of a main valve via solenoids and pressure regulators. Designed for compactness and ease of assembly in an aircraft refueling truck.",
    tools:["SolidWorks","GD&T","Aluminum Machining","Fluid Systems"], images:["/projects/manifold-3d.png"] },
  { num:"02", label:"CLA-VAL", accent:"text-orange-400",
    title:"Bypass Valve — 381GF", period:"2023",
    desc:"New design iteration of a differential pressure bypass valve for aircraft refueling applications. Focused on improving manufacturability and performance under dynamic pressure conditions.",
    tools:["SolidWorks","GD&T","Fluid Dynamics","Valve Design"], images:["/projects/bypass-3d.png"] },
  { num:"03", label:"CLA-VAL", accent:"text-orange-400",
    title:"Test Fixture — 1626M", period:"2024",
    desc:"Custom test fixture designed to validate the performance of the 1626M valve under simulated operating conditions. Ensured repeatable clamping and alignment for consistent test results.",
    tools:["SolidWorks","FEA","GD&T","Testing & Validation"], images:["/projects/fixture-3d.png"] },
  { num:"04", label:"CLA-VAL", accent:"text-orange-400",
    title:"Spring Compression Tool — X149", period:"2024",
    desc:"Specialized tool to safely compress and hold the internal spring of the X149 valve during assembly. Designed to reduce assembly time and improve technician safety.",
    tools:["SolidWorks","Tooling Design","GD&T","Assembly"], images:["/projects/spring-tool-1.png","/projects/spring-tool-2.png"] },
  { num:"05", label:"CLA-VAL", accent:"text-orange-400",
    title:"Wire Rope Hub — Press Master", period:"2024",
    desc:"Hub component for a wire rope press machine used in internal assembly operations. Designed for durability and precise fitment within the press assembly.",
    tools:["SolidWorks","GD&T","Aluminum Machining","Mechanical Design"], images:["/projects/hub-3d.png","/projects/hub-2.png"] },
];

const academicProjects: Project[] = [
  { num:"01", label:"Academic", accent:"text-violet-400",
    title:"Unmanned Ground Vehicle — NGCP Senior Project", period:"2022 – 2023",
    desc:"Full UGV design for the NGCP competition. Responsible for the full payload assembly including rotation plate, linkage bar, leverage arm, linear actuator, storage unit, and separation sub-assembly.",
    tools:["SolidWorks","FEA","3D Printing","Team Design","Systems Integration"], images:["/projects/ugv-3d.png"] },
  { num:"02", label:"Academic", accent:"text-violet-400",
    title:"CFD Simulations — ANSYS Fluent", period:"2024",
    desc:"Two CFD studies: (1) NACA 4412 airfoil — lift and drag across 0°–15° AoA, comparing k-ε, k-ω SST, and Spalart-Allmaras turbulence models. (2) Liquid sloshing in a spherical tank using VOF multiphase method.",
    tools:["ANSYS Fluent","CFD","VOF Multiphase","Turbulence Modeling","Mesh Generation"],
    images:["/projects/naca4412-cfd.png","/projects/ballottement-cfd.png"] },
];

const personalProjects: Project[] = [
  { num:"01", label:"Personal", accent:"text-sky-400",
    title:"Arduino Door Lock Mechanism", period:"Jul – Aug 2021",
    desc:"Designed and built a custom door lock mechanism combining Arduino control logic with 3D-printed mechanical components — concept to working prototype.",
    tools:["Arduino","3D Printing","CAD","Embedded Systems"] },
  { num:"02", label:"Personal", accent:"text-sky-400",
    title:"3D Printing Projects", period:"Ongoing",
    desc:"Designing and printing mechanical parts, enclosures, and functional prototypes. Full loop from CAD model to physical object.",
    tools:["3D Printing","CAD","Fusion 360","Prototyping"] },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────

export default function Page() {
  const [mob, setMob]       = useState(false);
  const [lb, setLb]         = useState<string | null>(null);
  const [imgIdx, setImgIdx] = useState<Record<string, number>>({});
  const mainRef             = useRef<HTMLDivElement>(null);

  const getIdx = (key: string) => imgIdx[key] ?? 0;
  const prev = (key: string, len: number) =>
    setImgIdx(s => ({ ...s, [key]: (getIdx(key) - 1 + len) % len }));
  const next = (key: string, len: number) =>
    setImgIdx(s => ({ ...s, [key]: (getIdx(key) + 1) % len }));

  // Scroll-triggered reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMob(false);
  };

  const navLinks = [
    { label:"About",    id:"about" },
    { label:"Projects", id:"projects" },
    { label:"CV",       id:"cv" },
    { label:"Contact",  id:"contact" },
  ];

  return (
    <div ref={mainRef} className="min-h-screen bg-[hsl(220,20%,6%)] text-[hsl(40,15%,90%)]">

      {/* ── LIGHTBOX ──────────────────────────────────────────────────── */}
      {lb && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-sm p-4" onClick={() => setLb(null)}>
          <div className="relative" onClick={e => e.stopPropagation()}>
            <img src={lb} alt="" className="max-h-[88vh] max-w-[88vw] object-contain rounded-xl shadow-2xl" />
            <button onClick={() => setLb(null)} className="absolute -top-10 right-0 font-mono text-xs text-[hsl(220,8%,50%)] hover:text-white transition-colors">
              ESC ✕
            </button>
          </div>
        </div>
      )}

      {/* ── HEADER ────────────────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-30 h-16 flex items-center justify-between px-8 md:px-14 bg-[hsl(220,20%,6%)]/80 backdrop-blur-xl border-b border-white/[0.04]">
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[hsl(28,100%,60%)] flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-[hsl(28,100%,60%)]/30">
            <span className="font-black text-[hsl(220,20%,6%)] text-xs">VG</span>
          </div>
          <span className="font-bold text-sm text-[hsl(40,15%,88%)] hidden sm:block">Victor Garnier</span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(n => (
            <button key={n.id} onClick={() => scrollTo(n.id)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-[hsl(220,8%,52%)] hover:text-[hsl(40,15%,88%)] hover:bg-white/5 transition-all">
              {n.label}
            </button>
          ))}
          <a href="/Victor_Garnier_CV.pdf"
            className="ml-3 h-9 px-5 rounded-full bg-[hsl(28,100%,60%)] hover:bg-[hsl(28,100%,68%)] text-[hsl(220,20%,6%)] text-sm font-black transition-all hover:shadow-lg hover:shadow-[hsl(28,100%,60%)]/30 hover:-translate-y-0.5 flex items-center">
            ↓ CV
          </a>
        </nav>

        <button onClick={() => setMob(!mob)} className="md:hidden flex flex-col gap-1.5 p-1" aria-label="Menu">
          <span className={`block h-px w-5 bg-[hsl(40,15%,60%)] transition-transform origin-center ${mob ? "translate-y-[6.5px] rotate-45":""}`} />
          <span className={`block h-px w-5 bg-[hsl(40,15%,60%)] transition-opacity ${mob ? "opacity-0":""}`} />
          <span className={`block h-px w-5 bg-[hsl(40,15%,60%)] transition-transform origin-center ${mob ? "-translate-y-[6.5px] -rotate-45":""}`} />
        </button>
      </header>

      {mob && (
        <div className="md:hidden fixed inset-0 z-20 pt-16 bg-[hsl(220,20%,6%)] flex flex-col px-8 py-8 space-y-1">
          {navLinks.map(n => (
            <button key={n.id} onClick={() => scrollTo(n.id)}
              className="text-left px-4 py-4 text-base font-medium text-[hsl(220,8%,55%)] hover:text-[hsl(40,15%,88%)] transition-colors">
              {n.label}
            </button>
          ))}
          <div className="pt-4 border-t border-white/[0.06]">
            <a href="/Victor_Garnier_CV.pdf" className="block px-4 py-4 font-black text-[hsl(28,100%,60%)]">↓ Download CV</a>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">

        {/* Giant ghost background name */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden>
          <p className="font-black text-white/[0.022] whitespace-nowrap leading-none"
             style={{ fontSize:"clamp(80px,16vw,220px)", letterSpacing:"-0.04em" }}>
            VICTOR GARNIER
          </p>
        </div>

        {/* Top gradient line */}
        <div className="absolute top-16 inset-x-0 h-px bg-gradient-to-r from-transparent via-[hsl(28,100%,60%)]/40 to-transparent" />

        {/* Bottom gradient */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[hsl(220,20%,6%)] to-transparent pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-14 grid md:grid-cols-2 gap-12 lg:gap-20 items-center py-20">

          {/* ── LEFT: Text ────────────────────────────────────────────── */}
          <div>
            <div className="hero-in d0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[hsl(28,100%,60%)]/20 bg-[hsl(28,100%,60%)]/[0.07] mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[11px] text-[hsl(28,100%,65%)] tracking-wider">Open to new opportunities</span>
            </div>

            <h1 className="hero-in d1 font-black leading-none tracking-tighter mb-6 gradient-text"
                style={{ fontSize:"clamp(56px,8.5vw,108px)", letterSpacing:"-0.04em" }}>
              Victor<br />Garnier
            </h1>

            <p className="hero-in d2 font-mono text-[12px] text-[hsl(28,100%,60%)] uppercase tracking-[0.22em] mb-6">
              Mechanical Engineer · Lausanne, CH
            </p>

            <p className="hero-in d3 text-[15px] leading-7 text-[hsl(220,8%,58%)] max-w-[440px] mb-10">
              2 years designing aircraft refueling systems at CLA-VAL.
              Pursuing M.Sc. in Mechanical Engineering at HES-SO Master.
              Bilingual — French & English.
            </p>

            <div className="hero-in d4 flex flex-wrap gap-3 mb-14">
              <button onClick={() => scrollTo("contact")}
                className="h-11 px-7 rounded-full bg-[hsl(28,100%,60%)] hover:bg-[hsl(28,100%,68%)] text-[hsl(220,20%,6%)] text-sm font-black transition-all hover:shadow-2xl hover:shadow-[hsl(28,100%,60%)]/35 hover:-translate-y-0.5 active:translate-y-0">
                Get in touch
              </button>
              <button onClick={() => scrollTo("projects")}
                className="h-11 px-7 rounded-full border border-white/10 text-[hsl(40,15%,68%)] text-sm font-medium hover:border-[hsl(28,100%,60%)]/40 hover:text-[hsl(40,15%,90%)] transition-all">
                View projects →
              </button>
            </div>

            {/* Stats */}
            <div className="hero-in d5 flex gap-10">
              {[
                { v:"2 yrs",   l:"Industry" },
                { v:"FR / EN", l:"Bilingual" },
                { v:"M.Sc.",   l:"HES-SO" },
                { v:"FE",      l:"NCEES" },
              ].map(s => (
                <div key={s.l}>
                  <p className="text-[20px] font-black text-[hsl(40,15%,92%)] leading-tight">{s.v}</p>
                  <p className="font-mono text-[10px] text-[hsl(220,8%,42%)] uppercase tracking-wider mt-0.5">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Animated image ──────────────────────────────────── */}
          <div className="hero-in d2 flex items-center justify-center">
            <div className="relative flex items-center justify-center">

              {/* Ambient glow blob */}
              <div className="absolute w-80 h-80 rounded-full bg-[hsl(28,100%,60%)]/10 blur-[80px] glow-bg" />

              {/* Outer orbit ring with 4 dots */}
              <div className="absolute w-[340px] h-[340px] rounded-full border border-[hsl(28,100%,60%)]/10 ring-cw">
                {[0,90,180,270].map(deg => (
                  <div key={deg} className="absolute w-2 h-2 rounded-full bg-[hsl(28,100%,60%)]/30"
                    style={{ top:"50%", left:"50%",
                      transform:`rotate(${deg}deg) translateX(169px) translateY(-50%)` }} />
                ))}
              </div>

              {/* Inner ring */}
              <div className="absolute w-[270px] h-[270px] rounded-full border border-[hsl(28,100%,60%)]/15 ring-ccw" />

              {/* Photo frame — add /public/profile.jpg to use real photo */}
              <div className="photo-float relative z-10">
                {/* Rotating gradient border wrapper */}
                <div className="photo-border p-[2px] rounded-2xl shadow-2xl shadow-black/50">
                  {/* Inner frame */}
                  <div className="relative w-56 h-[296px] md:w-64 md:h-[340px] rounded-[14px] overflow-hidden bg-[hsl(220,20%,9%)]">

                    {/* Engineering drawing as portrait placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg viewBox="0 0 200 240" fill="none" className="w-4/5 h-4/5 opacity-35">
                        <circle cx="100" cy="112" r="80" stroke="hsl(28,100%,60%)" strokeWidth="0.7" />
                        <circle cx="100" cy="112" r="58" stroke="hsl(28,100%,60%)" strokeWidth="0.9" />
                        <circle cx="100" cy="112" r="36" stroke="hsl(28,100%,60%)" strokeWidth="1.1" />
                        <circle cx="100" cy="112" r="16" stroke="hsl(28,100%,60%)" strokeWidth="1.3" />
                        <circle cx="100" cy="112" r="4"  fill="hsl(28,100%,60%)" fillOpacity="0.8" />
                        <line x1="10" y1="112" x2="190" y2="112" stroke="hsl(28,100%,60%)" strokeWidth="0.35" strokeOpacity="0.5" />
                        <line x1="100" y1="10"  x2="100" y2="214" stroke="hsl(28,100%,60%)" strokeWidth="0.35" strokeOpacity="0.5" />
                        <line x1="43" y1="55" x2="157" y2="169" stroke="hsl(28,100%,60%)" strokeWidth="0.25" strokeOpacity="0.3" />
                        <line x1="157" y1="55" x2="43" y2="169" stroke="hsl(28,100%,60%)" strokeWidth="0.25" strokeOpacity="0.3" />
                        <circle cx="100" cy="32"  r="5.5" stroke="hsl(28,100%,60%)" strokeWidth="0.9" />
                        <line x1="97" y1="32" x2="103" y2="32" stroke="hsl(28,100%,60%)" strokeWidth="0.7" />
                        <line x1="100" y1="29" x2="100" y2="35" stroke="hsl(28,100%,60%)" strokeWidth="0.7" />
                        <circle cx="100" cy="192" r="5.5" stroke="hsl(28,100%,60%)" strokeWidth="0.9" />
                        <line x1="97" y1="192" x2="103" y2="192" stroke="hsl(28,100%,60%)" strokeWidth="0.7" />
                        <line x1="100" y1="189" x2="100" y2="195" stroke="hsl(28,100%,60%)" strokeWidth="0.7" />
                        <circle cx="20"  cy="112" r="5.5" stroke="hsl(28,100%,60%)" strokeWidth="0.9" />
                        <circle cx="180" cy="112" r="5.5" stroke="hsl(28,100%,60%)" strokeWidth="0.9" />
                        <line x1="10" y1="22" x2="10" y2="202" stroke="hsl(28,100%,60%)" strokeWidth="0.35" strokeOpacity="0.3" />
                        <line x1="7" y1="30" x2="10" y2="22" stroke="hsl(28,100%,60%)" strokeWidth="0.4" strokeOpacity="0.5" />
                        <line x1="13" y1="30" x2="10" y2="22" stroke="hsl(28,100%,60%)" strokeWidth="0.4" strokeOpacity="0.5" />
                        <line x1="7" y1="194" x2="10" y2="202" stroke="hsl(28,100%,60%)" strokeWidth="0.4" strokeOpacity="0.5" />
                        <line x1="13" y1="194" x2="10" y2="202" stroke="hsl(28,100%,60%)" strokeWidth="0.4" strokeOpacity="0.5" />
                      </svg>
                    </div>

                    {/* Bottom name card */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[hsl(220,20%,7%)] via-[hsl(220,20%,7%)]/80 to-transparent">
                      <p className="font-black text-[hsl(40,15%,92%)] text-sm tracking-tight">Victor Garnier</p>
                      <p className="font-mono text-[10px] text-[hsl(28,100%,62%)] uppercase tracking-widest mt-0.5">Mech. Engineer</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge — location */}
              <div className="absolute -bottom-2 -left-4 md:-left-8 bg-[hsl(220,20%,10%)] border border-white/10 rounded-xl px-3 py-2 shadow-xl" style={{ animation:"float 7s ease-in-out infinite 1s" }}>
                <p className="font-mono text-[10px] text-[hsl(220,8%,50%)]">Location</p>
                <p className="font-semibold text-xs text-[hsl(40,15%,88%)] mt-0.5">Lausanne, CH</p>
              </div>

              {/* Floating badge — available */}
              <div className="absolute -top-2 -right-4 md:-right-8 bg-[hsl(220,20%,10%)] border border-white/10 rounded-xl px-3 py-2 shadow-xl flex items-center gap-2" style={{ animation:"float 5s ease-in-out infinite 0.5s" }}>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <p className="font-mono text-[10px] text-[hsl(40,15%,80%)]">Available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 scroll-indicator">
          <p className="font-mono text-[9px] text-[hsl(220,8%,36%)] uppercase tracking-[0.25em]">Scroll</p>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="text-[hsl(28,100%,60%)]/40">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.2"/>
            <circle cx="8" cy="7" r="2.5" fill="currentColor"/>
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════════════════════════════ */}
      <section id="about" className="py-16 px-8 md:px-14 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto">

          <div className="reveal flex items-center gap-5 mb-10">
            <span className="font-mono text-[11px] text-[hsl(28,100%,60%)] tracking-[0.2em]">01</span>
            <div className="h-px flex-1 bg-white/[0.06]" />
            <span className="font-mono text-[11px] text-[hsl(220,8%,36%)] uppercase tracking-widest">About</span>
          </div>

          <div className="grid lg:grid-cols-[1fr_300px] gap-16 items-start">
            <div>
              <h2 className="reveal text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight mb-10">
                Designing what moves<br />
                the <span className="gradient-text-orange">world.</span>
              </h2>
              <div className="reveal reveal-delay-1 space-y-5 text-[15px] leading-7 text-[hsl(220,8%,56%)] max-w-2xl">
                <p>
                  I'm a mechanical engineer with a B.Sc. from{" "}
                  <span className="text-[hsl(40,15%,82%)] font-medium">Cal Poly Pomona</span> which is a polytechnic
                  university with a strong hands-on engineering culture. My degree built a rigorous foundation
                  in fluid dynamics, thermodynamics, machine design, and structural analysis.
                </p>
                <p>
                  For two years I worked at{" "}
                  <span className="text-[hsl(40,15%,82%)] font-medium">CLA-VAL (Griswold Industries)</span>{" "}
                  designing components for aircraft refueling systems such as nozzles, inline valves, hydrant couplers.
                  Full product lifecycle: brainstorming, SolidWorks concept design, FEA validation, fixture design,
                  and compliance testing. Improved my design for manufacturability skills and deepened my understanding of machine design and fluid systems.
                </p>
                <p>
                  Currently pursuing an{" "}
                  <span className="text-[hsl(40,15%,82%)] font-medium">M.Sc. at HES-SO Master in Lausanne</span>,
                  deepening research capabilities in advanced simulation and applied mechanics.
                  Native French speaker, fluent English.
                </p>
                <p>
                  Some of the hobbies I enjoy include{" "}
                  <span className="text-[hsl(40,15%,82%)] font-medium">3D printing</span> anything and everything from simple stands to complex mechanical devices,
                  playing, watching and discussing about{" "}
                  <span className="text-[hsl(40,15%,82%)] font-medium">soccer</span>,{" "}
                  <span className="text-[hsl(40,15%,82%)] font-medium">snowboarding</span> when the weather allows it is my favorite winter sport,
                  and listening to or playing{" "}
                  <span className="text-[hsl(40,15%,82%)] font-medium">music</span> as I believe there is nothing better than your favorite song to give you that extra boost of energy and motivation to power through a long day of work or study.
                </p>
              </div>

              {/* Skills grid */}
              <div className="reveal reveal-delay-2 mt-14 grid sm:grid-cols-2 gap-4">
                {skillGroups.map(g => (
                  <div key={g.label} className="card-hover rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
                    <span className={`inline-block font-mono text-[10px] font-bold px-2.5 py-1 rounded border mb-4 uppercase tracking-wider ${g.color}`}>
                      {g.label}
                    </span>
                    <ul className="space-y-1.5">
                      {g.items.map(item => (
                        <li key={item} className="text-sm text-[hsl(220,8%,54%)]">{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Info cards column */}
            <aside className="space-y-4 lg:pt-4">
              {[
                { label:"Currently",   head:"M.Sc. Student",     sub:"HES-SO Master · Lausanne", dot:"bg-emerald-400" },
                { label:"Previously",  head:"Design Engineer I", sub:"CLA-VAL · 2023–2025",      dot:null },
                { label:"Certified",   head:"NCEES FE Exam",     sub:"Fundamentals of Engineering", dot:null },
                { label:"Education",   head:"B.Sc. Mech. Eng.",  sub:"Cal Poly Pomona · GPA 3.58",  dot:null },
              ].map((c, i) => (
                <div key={c.label}
                  className={`reveal reveal-delay-${i+1} card-hover rounded-xl border border-white/[0.07] bg-white/[0.03] p-5`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-mono text-[10px] text-[hsl(220,8%,40%)] uppercase tracking-widest">{c.label}</p>
                    {c.dot && <span className={`h-2 w-2 rounded-full ${c.dot} animate-pulse`} />}
                  </div>
                  <p className="font-bold text-[hsl(40,15%,88%)] text-sm">{c.head}</p>
                  <p className="text-sm text-[hsl(220,8%,48%)] mt-0.5">{c.sub}</p>
                </div>
              ))}

            </aside>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          PROJECTS
      ══════════════════════════════════════════════════════════════════ */}
      <section id="projects" className="py-16 px-8 md:px-14 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto">

          <div className="reveal flex items-center gap-5 mb-10">
            <span className="font-mono text-[11px] text-[hsl(28,100%,60%)] tracking-[0.2em]">02</span>
            <div className="h-px flex-1 bg-white/[0.06]" />
            <span className="font-mono text-[11px] text-[hsl(220,8%,36%)] uppercase tracking-widest">Projects</span>
          </div>

          {[
            { heading:"Work Projects",     items:workProjects },
            { heading:"Academic Projects", items:academicProjects },
            { heading:"Personal Projects", items:personalProjects },
          ].map(section => (
            <div key={section.heading} className="mb-8">
              <p className="reveal font-mono text-[11px] text-[hsl(28,100%,60%)] uppercase tracking-[0.18em] mb-8 flex items-center gap-4">
                — {section.heading}
                <span className="flex-1 h-px bg-white/[0.06]" />
              </p>

              {section.items.length === 0 ? (
                <p className="font-mono text-sm text-[hsl(220,8%,36%)] italic">Coming soon.</p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {section.items.map((p, idx) => (
                    <article key={p.num}
                      className={`project-card reveal reveal-delay-${(idx % 3) + 1} card-hover flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden`}>

                      {p.images && p.images.length > 0 && (() => {
                        const key = `${section.heading}-${p.num}`;
                        const idx = getIdx(key);
                        const len = p.images.length;
                        return (
                          <div className="relative bg-[hsl(220,20%,8%)] flex items-center justify-center p-4 img-zoom group">
                            <button onClick={() => setLb(p.images![idx])} className="w-full flex items-center justify-center">
                              <img src={p.images[idx]} alt={`${p.title} ${idx + 1}`}
                                className="w-full h-auto max-h-52 object-contain" />
                            </button>
                            {len > 1 && (
                              <>
                                <button
                                  onClick={e => { e.stopPropagation(); prev(key, len); }}
                                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 text-sm"
                                >‹</button>
                                <button
                                  onClick={e => { e.stopPropagation(); next(key, len); }}
                                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 text-sm"
                                >›</button>
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                                  {p.images.map((_, i) => (
                                    <span key={i} className={`h-1 rounded-full transition-all ${i === idx ? "w-4 bg-[hsl(28,100%,60%)]" : "w-1 bg-white/30"}`} />
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })()}

                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <span className={`font-mono text-[10px] font-bold uppercase tracking-widest ${p.accent}`}>{p.label}</span>
                          <span className="font-mono text-[10px] text-white/20">{p.num}</span>
                        </div>
                        <h3 className="font-bold text-[hsl(40,15%,88%)] text-base mb-3 leading-snug">{p.title}</h3>
                        <p className="text-sm text-[hsl(220,8%,52%)] leading-6 flex-1">{p.desc}</p>
                        <div className="mt-5 pt-4 border-t border-white/[0.05] flex flex-wrap items-center justify-between gap-2">
                          <div className="flex flex-wrap gap-x-3 gap-y-1">
                            {p.tools.map(t => (
                              <span key={t} className="font-mono text-[11px] text-[hsl(220,8%,42%)]">{t}</span>
                            ))}
                          </div>
                          <span className="font-mono text-[11px] text-white/20 shrink-0">{p.period}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CV / EXPERIENCE
      ══════════════════════════════════════════════════════════════════ */}
      <section id="cv" className="py-16 px-8 md:px-14 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto">

          <div className="reveal flex items-center gap-5 mb-10">
            <span className="font-mono text-[11px] text-[hsl(28,100%,60%)] tracking-[0.2em]">03</span>
            <div className="h-px flex-1 bg-white/[0.06]" />
            <div className="flex items-center gap-5">
              <span className="font-mono text-[11px] text-[hsl(220,8%,36%)] uppercase tracking-widest">CV</span>
              <a href="/Victor_Garnier_CV.pdf" className="font-mono text-[11px] text-[hsl(28,100%,60%)] hover:text-[hsl(28,100%,72%)] transition-colors">↓ PDF</a>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">

            {/* Experience */}
            <div>
              <p className="reveal font-mono text-[11px] text-[hsl(28,100%,60%)] uppercase tracking-[0.18em] mb-10">— Work Experience</p>
              <div className="space-y-0">
                {experience.map((e, i) => (
                  <div key={e.title} className={`reveal reveal-delay-${i+1} relative flex gap-8 pb-10 last:pb-0`}>
                    {i < experience.length - 1 && (
                      <div className="absolute left-[6px] top-7 bottom-0 w-px bg-white/[0.06]" />
                    )}
                    <div className="mt-1.5 shrink-0 h-3.5 w-3.5 rounded-full border-2 border-[hsl(28,100%,60%)] bg-[hsl(220,20%,6%)]" />
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[11px] text-[hsl(28,100%,60%)] mb-1.5 uppercase tracking-widest">{e.period}</p>
                      <h3 className="font-black text-[hsl(40,15%,90%)] text-base mb-0.5">{e.title}</h3>
                      <p className="text-sm text-[hsl(220,8%,48%)] mb-4">{e.company}</p>
                      <ul className="space-y-2">
                        {e.bullets.map(b => (
                          <li key={b} className="flex items-start gap-2.5 text-sm text-[hsl(220,8%,54%)] leading-6">
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

            {/* Education + Cert */}
            <div>
              <p className="reveal font-mono text-[11px] text-[hsl(28,100%,60%)] uppercase tracking-[0.18em] mb-10">— Education</p>
              <div className="space-y-0 mb-14">
                {education.map((e, i) => (
                  <div key={e.degree} className={`reveal reveal-delay-${i+1} relative flex gap-8 pb-10 last:pb-0`}>
                    {i < education.length - 1 && (
                      <div className="absolute left-[6px] top-7 bottom-0 w-px bg-white/[0.06]" />
                    )}
                    <div className="mt-1.5 shrink-0 h-3.5 w-3.5 rounded-full border-2 border-[hsl(28,100%,60%)]/50 bg-[hsl(220,20%,6%)]" />
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[11px] text-[hsl(28,100%,60%)] mb-1.5 uppercase tracking-widest">{e.period}</p>
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <h3 className="font-black text-[hsl(40,15%,90%)] text-base">{e.degree}</h3>
                        {"note" in e && e.note && (
                          <span className="font-mono text-[10px] text-[hsl(28,100%,60%)] border border-[hsl(28,100%,60%)]/30 px-2 py-0.5 rounded">
                            {e.note}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[hsl(220,8%,48%)] mb-3">{e.school}</p>
                      <p className="text-sm text-[hsl(220,8%,52%)] leading-6">{e.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="reveal font-mono text-[11px] text-[hsl(28,100%,60%)] uppercase tracking-[0.18em] mb-6">— Certification</p>
              <div className="reveal card-hover rounded-xl border border-white/[0.07] bg-white/[0.03] p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-black text-[hsl(40,15%,90%)]">NCEES — FE Exam</h3>
                  <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 shrink-0">
                    Passed
                  </span>
                </div>
                <p className="text-sm text-[hsl(220,8%,52%)] leading-6">
                  Fundamentals of Engineering — first step toward PE licensure.
                  Demonstrates competency across all core engineering disciplines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════════════════════════════ */}
      <section id="contact" className="py-16 px-8 md:px-14 border-t border-white/[0.04] relative overflow-hidden">

        {/* Background accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[hsl(28,100%,60%)]/[0.04] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">

          <div className="reveal flex items-center gap-5 mb-10">
            <span className="font-mono text-[11px] text-[hsl(28,100%,60%)] tracking-[0.2em]">04</span>
            <div className="h-px flex-1 bg-white/[0.06]" />
            <span className="font-mono text-[11px] text-[hsl(220,8%,36%)] uppercase tracking-widest">Contact</span>
          </div>

          <h2 className="reveal text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
            Looking forward<br />
            to meeting <span className="gradient-text-orange">you.</span>
          </h2>
          <p className="reveal reveal-delay-1 text-[16px] leading-7 text-[hsl(220,8%,52%)] mb-8 max-w-lg">
            Please feel free to reach out for any inquiries, collaborations, or just to say hi! I'm always open to connecting with fellow engineers, potential employers, or anyone interested in discussing projects, ideas, or opportunities.
          </p>

          <div className="reveal reveal-delay-2 grid sm:grid-cols-[1fr_280px] gap-5 max-w-2xl">
            <div className="space-y-3">
              {[
                { label:"Email",    value:"vgarnier0125@gmail.com", href:"mailto:vgarnier0125@gmail.com" },
                { label:"Phone",    value:"+41 78 601 73 05",       href:"tel:+41786017305" },
                { label:"Location", value:"Lausanne, Switzerland",  href:null },
              ].map(c => (
                <div key={c.label} className="card-hover rounded-xl border border-white/[0.07] bg-white/[0.03] p-5 flex items-center justify-between group">
                  <div>
                    <p className="font-mono text-[10px] text-[hsl(28,100%,60%)] uppercase tracking-wider mb-1">{c.label}</p>
                    {c.href
                      ? <a href={c.href} className="text-sm font-medium text-[hsl(40,15%,80%)] hover:text-white transition-colors"
                           target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{c.value}</a>
                      : <p className="text-sm font-medium text-[hsl(40,15%,80%)]">{c.value}</p>}
                  </div>
                  {c.href && <span className="text-white/20 group-hover:text-[hsl(28,100%,60%)] transition-colors">→</span>}
                </div>
              ))}
            </div>

            <div className="card-hover rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
              <p className="font-mono text-[10px] text-[hsl(28,100%,60%)] uppercase tracking-wider mb-5">Open to</p>
              <ul className="space-y-3">
                {["Mechanical design & engineering roles","Master Thesis in applied mechanics or simulation","R&D and simulation-driven positions","3D printing and prototyping work"].map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[hsl(220,8%,50%)] leading-5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(28,100%,60%)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.04] px-8 md:px-14 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-[hsl(28,100%,60%)] flex items-center justify-center">
            <span className="font-black text-[hsl(220,20%,6%)] text-[8px]">VG</span>
          </div>
          <p className="font-mono text-[10px] text-[hsl(220,8%,36%)]">© 2026 Victor Garnier</p>
        </div>
        <div className="flex items-center gap-6">
          {navLinks.map(n => (
            <button key={n.id} onClick={() => scrollTo(n.id)}
              className="font-mono text-[10px] text-[hsl(220,8%,36%)] hover:text-[hsl(28,100%,60%)] transition-colors uppercase tracking-wider">
              {n.label}
            </button>
          ))}
        </div>
      </footer>

    </div>
  );
}
