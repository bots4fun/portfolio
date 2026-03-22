"use client";

import { useState } from "react";

type PageKey = "about" | "cv" | "projects" | "contact";

export default function Page() {
  const [page, setPage] = useState<PageKey>("about");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navItems: { id: PageKey; label: string }[] = [
    { id: "about", label: "About" },
    { id: "cv", label: "CV" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const skills = [
    { label: "Digital Forensics", color: "bg-violet-50 text-violet-800 border-violet-200" },
    { label: "Cybersecurity", color: "bg-blue-50 text-blue-800 border-blue-200" },
    { label: "Python", color: "bg-sky-50 text-sky-800 border-sky-200" },
    { label: "SQLite", color: "bg-teal-50 text-teal-800 border-teal-200" },
    { label: "Pandas", color: "bg-emerald-50 text-emerald-800 border-emerald-200" },
    { label: "Automation", color: "bg-blue-50 text-blue-800 border-blue-200" },
    { label: "Technical Reporting", color: "bg-indigo-50 text-indigo-800 border-indigo-200" },
    { label: "Incident Investigation", color: "bg-violet-50 text-violet-800 border-violet-200" },
  ];

  const education = [
    {
      degree: "Master's in Forensic Science",
      institution: "University of Lausanne (UNIL)",
      specialization: "Digital Investigation & Cybersecurity",
      period: "Current",
      description:
        "Specialization in digital investigation, technical analysis, and applied cybersecurity. Thesis research on remnant data exposure on second-hand storage devices.",
    },
    {
      degree: "Bachelor's in Criminalistics",
      institution: "University of Lausanne (UNIL)",
      specialization: "Forensic Science",
      period: "Completed",
      description:
        "Foundation in forensic methodology, evidence analysis, and scientific investigation principles across criminal and digital domains.",
    },
  ];

  const experience = [
    {
      title: "Consultant Working Student",
      company: "Eraneos Switzerland",
      period: "2026 – Present",
      description:
        "Hands-on cybersecurity consulting work alongside academic specialization. Supporting client engagements in security analysis, technical assessments, and documentation.",
    },
  ];

  const certifications = [
    {
      name: "CompTIA Security+",
      issuer: "CompTIA",
      period: "Completed",
      description:
        "Covers security operations, architecture, risk management, incident response, and core cybersecurity principles.",
    },
  ];

  const projects = [
    {
      number: "01",
      title: "Master Thesis – Second-Hand Storage Devices",
      category: "Research",
      categoryColor: "bg-violet-100 text-violet-800",
      description:
        "Forensic research on remnant data exposure on second-hand storage devices. Developed a rigorous methodology for data recovery and risk quantification across consumer and enterprise media.",
      tools: ["Python", "Autopsy", "FTK Imager", "SQLite"],
      link: "#",
    },
    {
      number: "02",
      title: "Cell Tower Geolocation Analysis",
      category: "Data Analysis",
      categoryColor: "bg-sky-100 text-sky-800",
      description:
        "Built a structured collection and analysis pipeline to benchmark mobile geolocation services using cell tower data, database processing, and statistical evaluation.",
      tools: ["Python", "Pandas", "SQLite", "API Integration"],
      link: "#",
    },
    {
      number: "03",
      title: "Forensic Automation Scripts",
      category: "Automation",
      categoryColor: "bg-emerald-100 text-emerald-800",
      description:
        "Designed Python and Bash scripts to automate repetitive forensic investigation tasks — including artifact parsing, data cleaning, and structured reporting workflows.",
      tools: ["Python", "Bash", "SQL"],
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <button
            onClick={() => setPage("about")}
            className="group text-left"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-blue-600">
              Portfolio
            </p>
            <p className="text-lg font-semibold tracking-tight text-slate-900 group-hover:text-blue-700 transition">
              Valéry Garnier
            </p>
          </button>

          {/* Desktop nav */}
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
              href="/Valery_Garnier_CV.pdf"
              className="ml-3 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Download CV
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="flex flex-col gap-1.5 p-2 md:hidden"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-5 bg-slate-700 transition-transform ${mobileNavOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-slate-700 transition-opacity ${mobileNavOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-slate-700 transition-transform ${mobileNavOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileNavOpen && (
          <div className="border-t border-slate-100 bg-white px-6 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setPage(item.id); setMobileNavOpen(false); }}
                  className={`rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
                    page === item.id
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <a
                href="/Valery_Garnier_CV.pdf"
                className="mt-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
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
            {/* Hero banner */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-10 py-14 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.15),_transparent_60%)]" />
              <div className="relative">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
                  Digital Forensics & Cybersecurity
                </p>
                <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
                  Valéry Garnier
                </h1>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                  Master's student at UNIL specializing in Digital Investigation and Cybersecurity.
                  Building rigorous forensic methodologies and translating complex investigations
                  into clear, actionable results.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => setPage("contact")}
                    className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                  >
                    Get in touch
                  </button>
                  <a
                    href="/Valery_Garnier_CV.pdf"
                    className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
                  >
                    Download CV
                  </a>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: "M.Sc.", label: "Forensic Science" },
                { value: "Security+", label: "CompTIA Certified" },
                { value: "3+", label: "Research Projects" },
                { value: "Eraneos", label: "Current Employer" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
                >
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Bio + Skills */}
            <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
              <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900">About Me</h2>
                <div className="mt-5 space-y-4 text-base leading-8 text-slate-600">
                  <p>
                    I am pursuing a Master's in Forensic Science at the University of Lausanne,
                    with a focus on Digital Investigation and Cybersecurity. My academic work
                    bridges rigorous scientific methodology with technical security practice.
                  </p>
                  <p>
                    Alongside my studies, I work as a Consultant Working Student at Eraneos
                    Switzerland, where I apply my skills in real-world cybersecurity consulting
                    engagements.
                  </p>
                  <p>
                    My core interests lie in digital forensics, data recovery, automation of
                    investigation workflows, and translating technical findings into structured,
                    usable outputs for investigators and decision-makers.
                  </p>
                </div>
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
                  <p className="mt-3 text-lg font-semibold text-slate-900">
                    Consultant Working Student
                  </p>
                  <p className="text-slate-500">Eraneos Switzerland</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Core Skills
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill.label}
                        className={`rounded-full border px-3 py-1 text-xs font-medium ${skill.color}`}
                      >
                        {skill.label}
                      </span>
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
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
                  Curriculum Vitae
                </p>
                <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
                  Education & Experience
                </h2>
              </div>
              <a
                href="/Valery_Garnier_CV.pdf"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </a>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
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
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-slate-900">{item.degree}</h4>
                          <p className="text-sm text-blue-600 font-medium">{item.institution}</p>
                          <p className="text-sm text-slate-500">{item.specialization}</p>
                        </div>
                        <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                          {item.period}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience + Certifications */}
              <div className="space-y-6">
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600">
                      <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Experience</h3>
                  </div>

                  <div className="relative space-y-8 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-slate-100">
                    {experience.map((item) => (
                      <div key={item.title} className="relative pl-7">
                        <div className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-emerald-600 bg-white" />
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-semibold text-slate-900">{item.title}</h4>
                            <p className="text-sm text-emerald-600 font-medium">{item.company}</p>
                          </div>
                          <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                            {item.period}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600">
                      <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Certifications</h3>
                  </div>

                  <div className="space-y-5">
                    {certifications.map((cert) => (
                      <div key={cert.name} className="rounded-2xl bg-slate-50 p-5">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-semibold text-slate-900">{cert.name}</h4>
                            <p className="text-sm text-violet-600 font-medium">{cert.issuer}</p>
                          </div>
                          <span className="shrink-0 rounded-full bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-700">
                            {cert.period}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{cert.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── PROJECTS ── */}
        {page === "projects" && (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
                  Selected Work
                </p>
                <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
                  Projects
                </h2>
              </div>
              <a
                href="https://github.com/bots4fun"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${project.categoryColor}`}>
                      {project.category}
                    </span>
                    <span className="text-4xl font-black text-slate-100 select-none">
                      {project.number}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold leading-snug tracking-tight text-slate-900">
                    {project.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                    {project.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {project.link !== "#" && (
                    <a
                      href={project.link}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                    >
                      View project
                      <svg className="h-4 w-4 transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        )}

        {/* ── CONTACT ── */}
        {page === "contact" && (
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
                Get in touch
              </p>
              <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
                Contact
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
              <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
                <p className="max-w-xl text-lg leading-8 text-slate-600">
                  I am open to opportunities in digital forensics, cybersecurity consulting,
                  research collaborations, and professional projects. Feel free to reach out.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <a
                    href="mailto:your.email@example.com"
                    className="group flex items-start gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-blue-200 hover:bg-blue-50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">Email</p>
                      <p className="mt-1 font-medium text-slate-800">your.email@example.com</p>
                    </div>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/your-profile"
                    className="group flex items-start gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-blue-200 hover:bg-blue-50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">LinkedIn</p>
                      <p className="mt-1 font-medium text-slate-800">linkedin.com/in/your-profile</p>
                    </div>
                  </a>

                  <a
                    href="https://github.com/bots4fun"
                    className="group flex items-start gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 group-hover:bg-slate-200 transition">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">GitHub</p>
                      <p className="mt-1 font-medium text-slate-800">github.com/bots4fun</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="rounded-3xl bg-slate-900 p-10 text-white">
                <h3 className="text-xl font-bold">Open to</h3>
                <ul className="mt-6 space-y-4">
                  {[
                    "Digital forensics & incident response roles",
                    "Cybersecurity consulting opportunities",
                    "Academic research collaborations",
                    "Technical writing and reporting projects",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600">
                        <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-sm leading-6 text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 border-t border-white/10 pt-8">
                  <p className="text-sm text-slate-400">Based in Switzerland</p>
                  <p className="text-sm text-slate-400">Available from 2026</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            © 2026 Valéry Garnier. Digital Forensics & Cybersecurity.
          </p>
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
