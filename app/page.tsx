"use client";

import Image from "next/image";
import { useState } from "react";

type PageKey = "about" | "cv" | "projects" | "contact";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const skills = {
  Engineering: ["Mechanical Design", "Fluid Dynamics (CFD)", "FEA Analysis", "Machine Design", "Hydraulics"],
  Software: ["SolidWorks", "3D Experience", "Python", "MATLAB", "FEMAP"],
  "Hardware & Prototyping": ["3D Printing", "Arduino", "Raspberry Pi"],
  Languages: ["French (Native)", "English (Fluent)"],
};

const education = [
  {
    degree: "Master's in Mechanical Engineering",
    institution: "HES-SO Master",
    location: "Lausanne, Switzerland",
    period: "2025 – Present",
    description: "Advanced study in mechanical engineering, developing analytical and research capabilities in design, simulation, and applied mechanics.",
  },
  {
    degree: "Bachelor's in Mechanical Engineering",
    institution: "California State Polytechnic University",
    location: "Pomona, USA",
    period: "2018 – 2023",
    gpa: "GPA: 3.58",
    description: "Core curriculum in mechanical design, fluid dynamics, thermodynamics, and materials science. Graduated with a strong technical foundation and hands-on project experience.",
  },
];

const experience = [
  {
    title: "Design Engineer I",
    company: "Griswold Industries DBA CLA-VAL",
    period: "2023 – 2025",
    bullets: [
      "Designed and optimized components for aircraft refueling systems, including nozzles, inline valves, and couplers.",
      "Collaborated with engineering management and sales teams to develop new products and improve existing designs based on customer requirements.",
      "Developed and executed testing procedures for mechanical devices to ensure performance and compliance with industry standards.",
      "Designed custom testing fixtures to streamline product validation and improve testing efficiency.",
      "Applied fluid dynamics and mechanical design principles to improve component performance and reliability.",
      "Performed structural analysis using SolidWorks and FEA to evaluate component durability under various loading conditions.",
    ],
  },
  {
    title: "Engineering Lab Tech Asst – Intern",
    company: "CLA-VAL Summer Internship",
    period: "Jun – Aug 2022",
    bullets: [
      "Collaborated with product engineering and sales teams to design six mechanical assemblies using SolidWorks according to client specifications.",
      "Contributed to the full product development cycle, from initial concept to final implementation.",
      "Designed structural brackets for the new 353GF coupler generation.",
      "Assisted in on-site installation and troubleshooting of industrial valves.",
    ],
  },
  {
    title: "Co-Founder",
    company: "Safaran Boutique",
    period: "2022 – 2023",
    bullets: [
      "Co-founded a retail business with two partners.",
      "Managed operational and strategic aspects of the business, including sourcing, logistics, and sales.",
      "Developed problem-solving and management skills through real-world business challenges.",
    ],
  },
];

const engineeringProjects = [
  {
    number: "01",
    title: "NGCP Project – Payload System for UGV",
    category: "Bachelor's Project",
    categoryColor: "bg-blue-100 text-blue-800",
    period: "2022 – 2023",
    description:
      "Designed and manufactured a payload system for an Unmanned Ground Vehicle (UGV) as part of the NGCP competition. Integrated the system into a multidisciplinary vehicle platform.",
    bullets: [
      "Designed and manufactured a complete payload system for a UGV.",
      "Used SolidWorks, MATLAB, FEMAP, and 3D printing during development.",
      "Collaborated with a multidisciplinary team to integrate the system.",
      "Presented progress and results during team meetings and technical reviews.",
    ],
    tools: ["SolidWorks", "MATLAB", "FEMAP", "3D Printing"],
  },
  {
    number: "02",
    title: "Arduino Door Lock Mechanism",
    category: "Personal Project",
    categoryColor: "bg-orange-100 text-orange-800",
    period: "Jul – Aug 2021",
    description:
      "Designed and built a custom door lock mechanism combining Arduino control logic with 3D-printed mechanical components. Full hands-on project from concept to working prototype.",
    bullets: [
      "Designed and built a custom door lock mechanism using Arduino and 3D-printed components.",
      "Developed Arduino programs to control system functionality.",
      "Gained practical experience in embedded systems and rapid prototyping.",
    ],
    tools: ["Arduino", "3D Printing", "Embedded Systems", "CAD"],
  },
];

// ─────────────────────────────────────────────
// 3D PRINTING GALLERY
// Drop your images into /public/projects/ and update the src fields below.
// Supported formats: .jpg, .png, .webp
// ─────────────────────────────────────────────
const printingProjects: {
  title: string;
  description: string;
  src: string | null; // set to "/projects/your-image.jpg" once you add the file
}[] = [
  {
    title: "Project 1",
    description: "Add a short description of this print.",
    src: null, // e.g. "/projects/print1.jpg"
  },
  {
    title: "Project 2",
    description: "Add a short description of this print.",
    src: null,
  },
  {
    title: "Project 3",
    description: "Add a short description of this print.",
    src: null,
  },
  {
    title: "Project 4",
    description: "Add a short description of this print.",
    src: null,
  },
  {
    title: "Project 5",
    description: "Add a short description of this print.",
    src: null,
  },
  {
    title: "Project 6",
    description: "Add a short description of this print.",
    src: null,
  },
];

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────

export default function Page() {
  const [page, setPage] = useState<PageKey>("about");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const navItems: { id: PageKey; label: string }[] = [
    { id: "about", label: "About" },
    { id: "cv", label: "CV" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-h-[90vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox} alt="Project" className="max-h-[85vh] rounded-2xl object-contain shadow-2xl" />
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-4 -right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-800 shadow-lg hover:bg-slate-100"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <button onClick={() => setPage("about")} className="group text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-orange-500">Portfolio</p>
            <p className="text-lg font-bold tracking-tight text-slate-900 transition group-hover:text-orange-500">
              Victor Garnier
            </p>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  page === item.id
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="/Victor_Garnier_CV.pdf"
              className="ml-3 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Download CV
            </a>
          </nav>

          <button
            className="flex flex-col gap-1.5 p-2 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-5 bg-slate-700 transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-slate-700 transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-slate-700 transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-slate-100 bg-white px-6 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setPage(item.id); setMobileOpen(false); }}
                  className={`rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
                    page === item.id ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <a href="/Victor_Garnier_CV.pdf" className="mt-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700">
                Download CV
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">

        {/* ── ABOUT ── */}
        {page === "about" && (
          <div className="space-y-6">
            {/* Hero */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-10 py-14 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(249,115,22,0.12),_transparent_60%)]" />
              <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center">
                <div className="flex-1">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
                    Mechanical Engineer
                  </p>
                  <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
                    Victor Garnier
                  </h1>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                    2 years of industry experience designing and optimizing aircraft refueling systems.
                    Strong background in fluid dynamics, FEA, and mechanical design.
                    Currently pursuing a Master's in Mechanical Engineering at HES-SO Lausanne.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <button
                      onClick={() => setPage("contact")}
                      className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
                    >
                      Get in touch
                    </button>
                    <a
                      href="/Victor_Garnier_CV.pdf"
                      className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
                    >
                      Download CV
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: "2 yrs", label: "Industry Experience" },
                { value: "M.Sc.", label: "HES-SO Lausanne" },
                { value: "FE Exam", label: "NCEES Certified" },
                { value: "3.58", label: "Bachelor's GPA" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Bio + Skills */}
            <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
              <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900">Profile</h2>
                <p className="mt-5 text-base leading-8 text-slate-600">
                  Mechanical Engineer with 2 years of industry experience in the design and optimization
                  of aircraft refueling systems. Strong background in fluid dynamics, mechanical design,
                  and system troubleshooting, with experience improving complex mechanical assemblies.
                </p>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  Currently pursuing a Master's degree in Mechanical Engineering at HES-SO Lausanne
                  to further develop advanced analytical and research capabilities.
                </p>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  Outside of engineering, I enjoy 3D printing, Raspberry Pi projects, soccer,
                  snowboarding, and music.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => setPage("projects")}
                    className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    View Projects →
                  </button>
                  <button
                    onClick={() => setPage("cv")}
                    className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    View Full CV →
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Current Position
                  </h3>
                  <p className="mt-3 text-lg font-semibold text-slate-900">M.Sc. Student</p>
                  <p className="text-slate-500">HES-SO Master — Lausanne, Switzerland</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4">
                    Skills
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(skills).map(([category, items]) => (
                      <div key={category}>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{category}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {items.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── CV ── */}
        {page === "cv" && (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">Curriculum Vitae</p>
                <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">Education & Experience</h2>
              </div>
              <a
                href="/Victor_Garnier_CV.pdf"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </a>
            </div>

            {/* Education */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Education</h3>
              </div>
              <div className="relative space-y-8 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-slate-100">
                {education.map((item) => (
                  <div key={item.degree} className="relative pl-7">
                    <div className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-blue-600 bg-white" />
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h4 className="font-semibold text-slate-900">{item.degree}</h4>
                        <p className="text-sm font-medium text-blue-600">{item.institution}</p>
                        <p className="text-sm text-slate-500">{item.location}{item.gpa ? ` — ${item.gpa}` : ""}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 h-fit">
                        {item.period}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Work Experience */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500">
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Work Experience</h3>
              </div>
              <div className="relative space-y-10 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-slate-100">
                {experience.map((item) => (
                  <div key={item.title} className="relative pl-7">
                    <div className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-orange-500 bg-white" />
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h4 className="font-semibold text-slate-900">{item.title}</h4>
                        <p className="text-sm font-medium text-orange-500">{item.company}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-700 h-fit">
                        {item.period}
                      </span>
                    </div>
                    <ul className="mt-3 space-y-1.5">
                      {item.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Certification */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600">
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Certification</h3>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-slate-900">NCEES – Fundamentals of Engineering Exam (FE)</h4>
                    <p className="text-sm font-medium text-violet-600">NCEES</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-700">Completed</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  The FE exam is the first step in the process of becoming a licensed Professional Engineer. Demonstrates foundational competency across all core engineering disciplines.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── PROJECTS ── */}
        {page === "projects" && (
          <div className="space-y-10">

            {/* Engineering Projects */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">Engineering</p>
              <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">Projects</h2>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                {engineeringProjects.map((project) => (
                  <article
                    key={project.title}
                    className="flex flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${project.categoryColor}`}>
                        {project.category}
                      </span>
                      <span className="text-4xl font-black text-slate-100 select-none">{project.number}</span>
                    </div>
                    <div className="mt-1 text-right">
                      <span className="text-xs text-slate-400">{project.period}</span>
                    </div>
                    <h3 className="mt-3 text-xl font-bold leading-snug tracking-tight text-slate-900">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{project.description}</p>
                    <ul className="mt-4 space-y-1.5">
                      {project.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {project.tools.map((tool) => (
                        <span key={tool} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* 3D Printing Gallery */}
            <div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">Personal</p>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">3D Printing Projects</h2>
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-500">
                A selection of personal 3D printing projects — from functional parts to custom mechanisms.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {printingProjects.map((item, i) => (
                  <div
                    key={i}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    {/* Image area */}
                    {item.src ? (
                      <button
                        className="relative block h-52 w-full overflow-hidden bg-slate-100"
                        onClick={() => item.src && setLightbox(item.src)}
                      >
                        <Image
                          src={item.src}
                          alt={item.title}
                          fill
                          className="object-cover transition duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100 bg-black/20">
                          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800">
                            View full
                          </span>
                        </div>
                      </button>
                    ) : (
                      <div className="flex h-52 flex-col items-center justify-center gap-2 bg-slate-50 border-b border-slate-100">
                        <svg className="h-10 w-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-xs text-slate-400">
                          Add image to <code className="font-mono">/public/projects/</code>
                        </p>
                      </div>
                    )}

                    {/* Caption */}
                    <div className="p-5">
                      <h4 className="font-semibold text-slate-900">{item.title}</h4>
                      <p className="mt-1 text-sm text-slate-500">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ── CONTACT ── */}
        {page === "contact" && (
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">Get in touch</p>
              <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">Contact</h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
              <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
                <p className="max-w-xl text-lg leading-8 text-slate-600">
                  Open to engineering positions, research collaborations, and consulting opportunities
                  in mechanical design, fluid systems, and applied prototyping.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <a
                    href="mailto:vgarnier0125@gmail.com"
                    className="group flex items-start gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-orange-200 hover:bg-orange-50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 transition group-hover:bg-orange-200">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">Email</p>
                      <p className="mt-1 font-medium text-slate-800">vgarnier0125@gmail.com</p>
                    </div>
                  </a>

                  <a
                    href="tel:+41786017305"
                    className="group flex items-start gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-orange-200 hover:bg-orange-50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 transition group-hover:bg-orange-200">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">Phone</p>
                      <p className="mt-1 font-medium text-slate-800">+41 78 601 73 05</p>
                    </div>
                  </a>

                  <a
                    href="https://github.com/bots4fun"
                    className="group flex items-start gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-slate-200">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">GitHub</p>
                      <p className="mt-1 font-medium text-slate-800">github.com/bots4fun</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 rounded-2xl border border-slate-200 p-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">Location</p>
                      <p className="mt-1 font-medium text-slate-800">Lausanne, Switzerland</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-slate-900 p-10 text-white">
                <h3 className="text-xl font-bold">Open to</h3>
                <ul className="mt-6 space-y-4">
                  {[
                    "Mechanical design & engineering roles",
                    "Fluid systems and hydraulics projects",
                    "Research & development positions",
                    "3D printing and prototyping work",
                    "Embedded systems side projects",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500">
                        <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-sm leading-6 text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 border-t border-white/10 pt-8">
                  <p className="text-sm text-slate-400">Based in Lausanne, Switzerland</p>
                  <p className="text-sm text-slate-400">French & English speaker</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="mt-16 border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <p className="text-sm text-slate-500">© 2026 Victor Garnier — Mechanical Engineer</p>
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className="text-sm text-slate-400 transition hover:text-slate-700"
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
