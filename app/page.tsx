"use client";

import { useState } from "react";

type PageKey = "about" | "cv" | "projects" | "contact";

export default function Page() {
  const [page, setPage] = useState<PageKey>("about");

  const navItems: { id: PageKey; label: string }[] = [
    { id: "about", label: "About Me" },
    { id: "cv", label: "My CV" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const skills = [
    "Digital Forensics",
    "Cybersecurity",
    "Python",
    "SQLite",
    "Pandas",
    "Automation",
    "Technical Reporting",
    "Incident Investigation",
  ];

  const projects = [
    {
      title: "Master Thesis – Second-Hand Storage Devices",
      category: "Research",
      description:
        "Forensic research focused on remnant data exposure on second-hand storage devices, with emphasis on methodology, data recovery, and risk analysis.",
      tools: ["Python", "Autopsy", "FTK Imager", "SQLite"],
      link: "#",
    },
    {
      title: "Cell Tower Geolocation Analysis",
      category: "Data Analysis",
      description:
        "Built a structured collection and analysis pipeline to compare mobile geolocation services using cell data, database processing, and statistical evaluation.",
      tools: ["Python", "Pandas", "SQLite", "API Integration"],
      link: "#",
    },
    {
      title: "Forensic Automation Scripts",
      category: "Automation",
      description:
        "Designed scripts to automate repetitive investigation and reporting tasks, including parsing, cleaning, and data processing workflows.",
      tools: ["Python", "Bash", "SQL"],
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-blue-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-700">
              Portfolio
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Valéry Garnier
            </h1>
          </div>

          <nav className="hidden gap-2 rounded-2xl border border-blue-100 bg-blue-50 p-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  page === item.id
                    ? "bg-blue-700 text-white shadow-sm"
                    : "text-blue-900 hover:bg-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        {page === "about" && (
          <section className="grid gap-6 lg:grid-cols-[1.45fr_0.95fr]">
            <div className="rounded-3xl border border-blue-100 bg-white p-10 shadow-sm">
              <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                About Me
              </span>
              <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Digital Forensics and Cybersecurity with a structured, research-driven approach.
              </h2>
              <div className="mt-6 space-y-4 text-base leading-8 text-slate-700">
                <p>
                  I am a Master’s student in Forensic Science at the University of Lausanne, specializing in Digital Investigation and Cybersecurity.
                </p>
                <p>
                  My work focuses on digital forensics, technical analysis, automation, and applied security. I am particularly interested in building rigorous methodologies and translating complex technical investigations into clear, usable results.
                </p>
                <p>
                  This website presents my academic background, selected projects, and professional profile in a concise and professional format.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="mailto:your.email@example.com"
                  className="rounded-2xl bg-blue-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-800"
                >
                  Contact Me
                </a>
                <a
                  href="/Valery_Garnier_CV.pdf"
                  className="rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-800 transition hover:bg-blue-50"
                >
                  Download CV
                </a>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">Current Role</h3>
                <p className="mt-3 text-base font-medium text-blue-800">
                  Consultant Working Student
                </p>
                <p className="text-slate-600">Eraneos Switzerland</p>
              </div>

              <div className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">Core Skills</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-900"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-700 to-blue-900 p-7 text-white shadow-sm">
                <h3 className="text-lg font-semibold">Professional Focus</h3>
                <p className="mt-3 leading-7 text-blue-50">
                  Forensic methodology, structured technical analysis, and practical cybersecurity work supported by scripting and data-driven investigation.
                </p>
              </div>
            </div>
          </section>
        )}

        {page === "cv" && (
          <section className="rounded-3xl border border-blue-100 bg-white p-10 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                  My CV
                </span>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">
                  Education and Experience
                </h2>
              </div>
              <a
                href="/Valery_Garnier_CV.pdf"
                className="rounded-2xl bg-blue-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-800"
              >
                Download PDF CV
              </a>
            </div>

            <div className="mt-10 space-y-5">
              <div className="rounded-2xl border border-slate-200 p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      Master’s in Forensic Science
                    </h3>
                    <p className="text-slate-600">
                      University of Lausanne — Digital Investigation & Cybersecurity
                    </p>
                  </div>
                  <p className="text-sm font-medium text-blue-800">Current</p>
                </div>
                <p className="mt-3 leading-7 text-slate-700">
                  Specialization focused on digital investigation, technical analysis, and applied cybersecurity within a forensic science framework.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      Consultant Working Student
                    </h3>
                    <p className="text-slate-600">Eraneos Switzerland</p>
                  </div>
                  <p className="text-sm font-medium text-blue-800">2026 – Present</p>
                </div>
                <p className="mt-3 leading-7 text-slate-700">
                  Building hands-on experience in cybersecurity and consulting while working in a professional environment alongside academic specialization.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      CompTIA Security+
                    </h3>
                    <p className="text-slate-600">Certification</p>
                  </div>
                  <p className="text-sm font-medium text-blue-800">Completed</p>
                </div>
                <p className="mt-3 leading-7 text-slate-700">
                  Foundation in security operations, architecture, risk management, and core cybersecurity principles.
                </p>
              </div>
            </div>
          </section>
        )}

        {page === "projects" && (
          <section>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                  Projects
                </span>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">
                  Selected Work
                </h2>
              </div>
              <a
                href="https://github.com/your-username"
                className="rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-800 transition hover:bg-blue-50"
              >
                View GitHub
              </a>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm"
                >
                  <p className="text-sm font-medium uppercase tracking-[0.15em] text-blue-700">
                    {project.category}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
                    {project.title}
                  </h3>
                  <p className="mt-4 leading-7 text-slate-700">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-900"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.link}
                    className="mt-6 inline-flex rounded-2xl bg-blue-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800"
                  >
                    Project Link
                  </a>
                </article>
              ))}
            </div>
          </section>
        )}

        {page === "contact" && (
          <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-blue-100 bg-white p-10 shadow-sm">
              <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                Contact
              </span>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">
                Let’s connect.
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-slate-700">
                Feel free to contact me regarding digital forensics, cybersecurity, research projects, or professional opportunities.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <a
                  href="mailto:your.email@example.com"
                  className="rounded-2xl border border-slate-200 p-5 transition hover:bg-blue-50"
                >
                  <p className="text-sm font-medium uppercase tracking-[0.15em] text-blue-700">
                    Email
                  </p>
                  <p className="mt-2 text-slate-700">your.email@example.com</p>
                </a>

                <a
                  href="https://www.linkedin.com/in/your-profile"
                  className="rounded-2xl border border-slate-200 p-5 transition hover:bg-blue-50"
                >
                  <p className="text-sm font-medium uppercase tracking-[0.15em] text-blue-700">
                    LinkedIn
                  </p>
                  <p className="mt-2 text-slate-700">linkedin.com/in/your-profile</p>
                </a>

                <a
                  href="https://github.com/your-username"
                  className="rounded-2xl border border-slate-200 p-5 transition hover:bg-blue-50"
                >
                  <p className="text-sm font-medium uppercase tracking-[0.15em] text-blue-700">
                    GitHub
                  </p>
                  <p className="mt-2 text-slate-700">github.com/your-username</p>
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-blue-700 p-10 text-white shadow-sm">
              <h3 className="text-2xl font-semibold">Before publishing</h3>
              <div className="mt-5 space-y-4 leading-7 text-blue-50">
                <p>Replace the email, LinkedIn, GitHub, and project links with your own information.</p>
                <p>Put your CV PDF in the public folder and name it exactly: Valery_Garnier_CV.pdf</p>
                <p>You can later add a profile photo, GitHub links for each project, and screenshots for a stronger portfolio.</p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}