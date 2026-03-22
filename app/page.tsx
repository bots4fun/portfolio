"use client";

import Image from "next/image";
import { useState } from "react";

type PageKey = "about" | "cv" | "projects" | "contact";

// ─── DATA ────────────────────────────────────────────────────────────────────

const skills = [
  { group: "Engineering",          items: ["Mechanical Design", "Fluid Dynamics (CFD)", "FEA Analysis", "Machine Design", "Hydraulics"] },
  { group: "Software",             items: ["SolidWorks", "3D Experience", "MATLAB", "FEMAP", "Python"] },
  { group: "Hardware",             items: ["3D Printing", "Arduino", "Raspberry Pi"] },
  { group: "Languages",            items: ["French — Native", "English — Fluent"] },
];

const education = [
  {
    degree:    "Master's in Mechanical Engineering",
    school:    "HES-SO Master",
    location:  "Lausanne, Switzerland",
    period:    "2025 – Present",
    note:      "",
    desc:      "Advanced development of analytical and research capabilities in design, simulation, and applied mechanics.",
  },
  {
    degree:    "Bachelor's in Mechanical Engineering",
    school:    "Cal Poly Pomona",
    location:  "Pomona, USA",
    period:    "2018 – 2023",
    note:      "GPA 3.58",
    desc:      "Core curriculum covering mechanical design, fluid dynamics, thermodynamics, and materials science.",
  },
];

const experience = [
  {
    title:   "Design Engineer I",
    company: "Griswold Industries DBA CLA-VAL",
    period:  "2023 – 2025",
    bullets: [
      "Designed and optimized components for aircraft refueling systems — nozzles, inline valves, and couplers.",
      "Collaborated with engineering and sales teams to develop new products based on customer requirements.",
      "Developed and executed testing procedures to ensure compliance with industry standards.",
      "Designed custom testing fixtures to streamline product validation and improve testing efficiency.",
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
      "Assisted in on-site installation and troubleshooting of industrial valves.",
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

const engProjects = [
  {
    label: "Academic",
    title: "NGCP Payload System — UGV",
    period: "2022 – 2023",
    desc: "Designed and manufactured a complete payload system for an Unmanned Ground Vehicle as part of the NGCP competition.",
    bullets: [
      "Designed and manufactured a full payload system for a UGV platform.",
      "Used SolidWorks, MATLAB, FEMAP, and 3D printing during development.",
      "Integrated system with a multidisciplinary team.",
      "Presented technical results during design reviews.",
    ],
    tools: ["SolidWorks", "MATLAB", "FEMAP", "3D Printing"],
  },
  {
    label: "Personal",
    title: "Arduino Door Lock Mechanism",
    period: "Jul – Aug 2021",
    desc: "Designed and built a custom door lock mechanism combining Arduino control logic with 3D-printed mechanical components.",
    bullets: [
      "Full design cycle from concept to working prototype.",
      "All mechanical parts 3D-printed and assembled.",
      "Programmed Arduino control logic from scratch.",
    ],
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
  const [page, setPage]       = useState<PageKey>("about");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lightbox, setLightbox]     = useState<string | null>(null);

  const nav: { id: PageKey; label: string }[] = [
    { id: "about",    label: "About" },
    { id: "cv",       label: "CV" },
    { id: "projects", label: "Projects" },
    { id: "contact",  label: "Contact" },
  ];

  const go = (id: PageKey) => { setPage(id); setMobileOpen(false); };

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox} alt="3D Print" className="max-h-[88vh] max-w-[90vw] object-contain rounded-xl shadow-2xl" />
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-4 -right-4 h-8 w-8 rounded-full bg-white shadow-md text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">

          <button onClick={() => go("about")} className="text-left group">
            <p className="text-xs font-medium text-slate-400 tracking-widest uppercase">Portfolio</p>
            <p className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
              Victor Garnier
            </p>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`text-sm font-medium pb-0.5 border-b transition-colors ${
                  page === item.id
                    ? "text-slate-900 border-slate-900"
                    : "text-slate-400 border-transparent hover:text-slate-700"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/Victor_Garnier_CV.pdf"
              className="hidden md:block text-sm font-medium border border-slate-200 rounded-lg px-4 py-2 text-slate-600 hover:border-slate-400 transition-colors"
            >
              Download CV
            </a>
            <button
              className="flex flex-col gap-[5px] p-1 md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <span className={`block h-px w-5 bg-slate-600 transition-transform origin-center ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`block h-px w-5 bg-slate-600 transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px w-5 bg-slate-600 transition-transform origin-center ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-slate-100 bg-white px-6 py-4 md:hidden space-y-1">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  page === item.id ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="/Victor_Garnier_CV.pdf"
              className="block px-3 py-2.5 text-sm font-medium text-slate-500"
            >
              Download CV
            </a>
          </div>
        )}
      </header>

      {/* ── MAIN ── */}
      <main>

        {/* ── ABOUT ── */}
        {page === "about" && (
          <div className="page-section">

            {/* Hero with animated gradient */}
            <section className="relative overflow-hidden bg-slate-50 border-b border-slate-100">
              {/* Animated blobs */}
              <div className="absolute inset-0 pointer-events-none" aria-hidden>
                <div className="blob absolute -top-24 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-100/60 blur-3xl" />
                <div className="blob blob-d1 absolute top-10 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-100/50 blur-3xl" />
                <div className="blob blob-d2 absolute bottom-0 left-1/3 w-[350px] h-[350px] rounded-full bg-slate-200/60 blur-3xl" />
              </div>

              <div className="relative mx-auto max-w-5xl px-6 py-24 md:py-32">
                <p className="text-sm font-medium text-blue-600 tracking-wide">
                  Mechanical Engineer
                </p>
                <h1 className="mt-4 text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.05]">
                  Victor Garnier
                </h1>
                <p className="mt-6 max-w-xl text-lg text-slate-500 leading-relaxed">
                  2 years designing aircraft refueling systems at CLA-VAL.
                  Strong background in fluid dynamics, FEA, and mechanical design.
                  Currently pursuing an M.Sc. at HES-SO Lausanne.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => go("contact")}
                    className="bg-slate-900 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
                  >
                    Get in touch
                  </button>
                  <a
                    href="/Victor_Garnier_CV.pdf"
                    className="border border-slate-200 bg-white px-6 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Download CV
                  </a>
                </div>
              </div>
            </section>

            {/* About body */}
            <section className="mx-auto max-w-5xl px-6 py-16 grid gap-12 lg:grid-cols-[1fr_320px]">

              {/* Left — profile */}
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Profile</h2>
                <div className="mt-5 space-y-4 text-[15px] leading-7 text-slate-500">
                  <p>
                    Mechanical Engineer with 2 years of industry experience in the design and
                    optimization of aircraft refueling systems. Strong background in fluid dynamics,
                    mechanical design, and system troubleshooting with experience improving complex
                    mechanical assemblies.
                  </p>
                  <p>
                    Currently pursuing a Master's degree in Mechanical Engineering at HES-SO Lausanne
                    to further develop advanced analytical and research capabilities.
                  </p>
                  <p>
                    Outside of work I enjoy 3D printing, electronics projects with Raspberry Pi and
                    Arduino, soccer, snowboarding, and music.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => go("projects")}
                    className="text-sm font-medium text-slate-600 underline underline-offset-4 hover:text-slate-900 transition-colors"
                  >
                    View projects →
                  </button>
                  <button
                    onClick={() => go("cv")}
                    className="text-sm font-medium text-slate-600 underline underline-offset-4 hover:text-slate-900 transition-colors"
                  >
                    Full CV →
                  </button>
                </div>
              </div>

              {/* Right — info + skills */}
              <div className="space-y-6">
                {/* Current status */}
                <div className="border border-slate-100 rounded-2xl p-6 bg-white shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Current Position
                  </p>
                  <p className="mt-2 font-semibold text-slate-900">M.Sc. Student</p>
                  <p className="text-sm text-slate-500">HES-SO Master · Lausanne</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                </div>

                {/* Skills */}
                <div className="border border-slate-100 rounded-2xl p-6 bg-white shadow-sm space-y-5">
                  {skills.map((group) => (
                    <div key={group.group}>
                      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                        {group.group}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {group.items.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs font-medium rounded-md border border-slate-100 bg-slate-50 px-2.5 py-1 text-slate-600"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Stats strip */}
            <section className="border-t border-slate-100">
              <div className="mx-auto max-w-5xl px-6 py-10 grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-100">
                {[
                  { value: "2 yrs",    label: "Industry experience" },
                  { value: "GPA 3.58", label: "Bachelor's degree" },
                  { value: "FE Exam",  label: "NCEES certification" },
                  { value: "M.Sc.",    label: "HES-SO Lausanne" },
                ].map((stat) => (
                  <div key={stat.label} className="px-6 first:pl-0 last:pr-0 py-2">
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ── CV ── */}
        {page === "cv" && (
          <div className="page-section mx-auto max-w-5xl px-6 py-14 space-y-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Curriculum Vitae</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">Education & Experience</h2>
              </div>
              <a
                href="/Victor_Garnier_CV.pdf"
                className="self-start sm:self-auto border border-slate-200 rounded-lg px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors inline-flex items-center gap-2"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </a>
            </div>

            <div className="grid gap-10 lg:grid-cols-2">

              {/* Education */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6">Education</h3>
                <div className="relative space-y-6 before:absolute before:left-[3px] before:top-2 before:bottom-2 before:w-px before:bg-slate-100">
                  {education.map((item) => (
                    <div key={item.degree} className="relative pl-6">
                      <div className="absolute left-0 top-[7px] h-2 w-2 rounded-full bg-blue-600" />
                      <div>
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <h4 className="font-semibold text-slate-900">{item.degree}</h4>
                            <p className="text-sm text-slate-500">{item.school} · {item.location}</p>
                            {item.note && (
                              <p className="text-xs text-blue-600 font-medium mt-0.5">{item.note}</p>
                            )}
                          </div>
                          <span className="text-xs font-medium text-slate-400 shrink-0">{item.period}</span>
                        </div>
                        <p className="mt-2 text-sm text-slate-400 leading-6">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Certification */}
                <div className="mt-10">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6">Certification</h3>
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-[7px] h-2 w-2 rounded-full bg-violet-500" />
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="font-semibold text-slate-900">NCEES — Fundamentals of Engineering (FE)</h4>
                        <p className="text-sm text-slate-500">NCEES</p>
                      </div>
                      <span className="text-xs font-medium text-slate-400">Completed</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-400 leading-6">
                      First step toward becoming a licensed Professional Engineer. Demonstrates foundational competency across all core engineering disciplines.
                    </p>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6">Work Experience</h3>
                <div className="relative space-y-8 before:absolute before:left-[3px] before:top-2 before:bottom-2 before:w-px before:bg-slate-100">
                  {experience.map((item) => (
                    <div key={item.title} className="relative pl-6">
                      <div className="absolute left-0 top-[7px] h-2 w-2 rounded-full bg-slate-400" />
                      <div>
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <h4 className="font-semibold text-slate-900">{item.title}</h4>
                            <p className="text-sm text-slate-500">{item.company}</p>
                          </div>
                          <span className="text-xs font-medium text-slate-400 shrink-0">{item.period}</span>
                        </div>
                        <ul className="mt-3 space-y-1.5">
                          {item.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-2 text-sm text-slate-400 leading-6">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-300" />
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
        )}

        {/* ── PROJECTS ── */}
        {page === "projects" && (
          <div className="page-section mx-auto max-w-5xl px-6 py-14 space-y-14">

            {/* Engineering projects */}
            <div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Engineering</p>
                  <h2 className="mt-2 text-3xl font-bold text-slate-900">Projects</h2>
                </div>
                <a
                  href="https://github.com/bots4fun"
                  className="self-start sm:self-auto text-sm font-medium text-slate-400 hover:text-slate-700 transition-colors underline underline-offset-4"
                >
                  View GitHub →
                </a>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {engProjects.map((project) => (
                  <div
                    key={project.title}
                    className="border border-slate-100 rounded-2xl bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-2 mb-4">
                      <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                        {project.label}
                      </span>
                      <span className="text-xs text-slate-400">{project.period}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900">{project.title}</h3>
                    <p className="mt-2 text-sm text-slate-500 leading-6">{project.desc}</p>
                    <ul className="mt-4 space-y-1.5">
                      {project.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-slate-400 leading-6">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-300" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 pt-5 border-t border-slate-50 flex flex-wrap gap-1.5">
                      {project.tools.map((t) => (
                        <span key={t} className="text-xs font-medium rounded-md border border-slate-100 bg-slate-50 px-2.5 py-1 text-slate-500">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3D Printing gallery */}
            <div>
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Personal</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">3D Printing</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Drop images into <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">/public/projects/</code> and set the src fields below.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {prints.map((item, i) => (
                  <div
                    key={i}
                    className="border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow group"
                  >
                    {item.src ? (
                      <button
                        className="relative block w-full h-52 overflow-hidden bg-slate-50"
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
                      <div className="flex h-52 items-center justify-center bg-slate-50">
                        <svg className="h-8 w-8 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="p-5 border-t border-slate-50">
                      <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── CONTACT ── */}
        {page === "contact" && (
          <div className="page-section">

            {/* Contact hero — same blob animation */}
            <section className="relative overflow-hidden bg-slate-50 border-b border-slate-100">
              <div className="absolute inset-0 pointer-events-none" aria-hidden>
                <div className="blob absolute -top-16 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-100/50 blur-3xl" />
                <div className="blob blob-d1 absolute bottom-0 left-1/3 w-[350px] h-[350px] rounded-full bg-indigo-100/40 blur-3xl" />
              </div>
              <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-24">
                <p className="text-sm font-medium text-blue-600 tracking-wide">Contact</p>
                <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                  Let's connect.
                </h2>
                <p className="mt-4 max-w-lg text-lg text-slate-500">
                  Open to engineering positions, research collaborations, and consulting opportunities.
                </p>
              </div>
            </section>

            <section className="mx-auto max-w-5xl px-6 py-16 grid gap-10 lg:grid-cols-[1fr_320px]">

              {/* Contact cards */}
              <div className="grid gap-3 sm:grid-cols-2 content-start">
                {[
                  { label: "Email",    value: "vgarnier0125@gmail.com",  href: "mailto:vgarnier0125@gmail.com" },
                  { label: "Phone",    value: "+41 78 601 73 05",        href: "tel:+41786017305" },
                  { label: "GitHub",   value: "github.com/bots4fun",     href: "https://github.com/bots4fun" },
                  { label: "Location", value: "Lausanne, Switzerland",   href: null },
                ].map((item) => {
                  const inner = (
                    <div className="border border-slate-100 rounded-2xl p-5 bg-white shadow-sm hover:shadow-md hover:border-slate-200 transition-all">
                      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{item.label}</p>
                      <p className="mt-1.5 text-sm font-medium text-slate-900">{item.value}</p>
                    </div>
                  );
                  return item.href
                    ? <a key={item.label} href={item.href}>{inner}</a>
                    : <div key={item.label}>{inner}</div>;
                })}
              </div>

              {/* Open to */}
              <div className="border border-slate-100 rounded-2xl p-7 bg-white shadow-sm self-start">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-5">Open to</p>
                <ul className="space-y-3">
                  {[
                    "Mechanical design & engineering roles",
                    "Fluid systems and hydraulics projects",
                    "R&D and simulation-driven work",
                    "3D printing and prototyping",
                    "Embedded systems side projects",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-5 border-t border-slate-50 space-y-1.5 text-sm text-slate-400">
                  <p>Based in Lausanne, Switzerland</p>
                  <p>French & English speaker</p>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">© 2026 Victor Garnier</p>
          <div className="flex items-center gap-6">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className="text-sm text-slate-400 hover:text-slate-700 transition-colors"
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
