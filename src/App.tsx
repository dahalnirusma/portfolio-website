import { useState } from "react"
import type { IconType } from "react-icons"
import { FaEnvelope, FaFileLines, FaGithub, FaLinkedin } from "react-icons/fa6"

type Page = "home" | "projects"


const profile = {
  name: "Nirusma Dahal",
  education: [
    { degree: "MCS Computer Science, UIUC", school: "2026 - Present" },
    { degree: "BA Computer Science, UVA", school: "2022 - 2026" },
  ],
}

const links = {
  linkedin: "https://www.linkedin.com/in/nirusmadahal",
  resume: "/NirusmaDahalResume.pdf", 
  email: "mailto:dahalnirusma@gmail.com",
  github: "https://github.com/dahalnirusma",
}

type Project = {
  title: string
  tech: string
  description: string
  live?: string 
  github?: string 
  note?: string 
}

const projects: Project[] = [
  {
    title: "Civic Radar",
    tech: "Next.js, TypeScript, Tailwind CSS, Supabase (Postgres + pgvector), OpenAI, Claude",
    description:
      "Tells you when state legislation affects you. Enter topics and a zip code, and it finds recent Virginia bills using embedding search, removes false matches with an LLM relevance check, and shows a plain-language summary of each bill with a quote from the text that explains why it matched.",
    live: "https://civic-radar-liart.vercel.app/",
    github: "https://github.com/dahalnirusma/civic-radar",
  },
  {
    title: "Social Music Review Platform",
    tech: "PHP, JavaScript, PostgreSQL, jQuery, AJAX",
    description: "A Letterboxd-inspired social platform for reviewing music. Owned the entire frontend and designed the PostgreSQL schema behind reviews, follows and a personalized activity feed, using AJAX so posting reviews and updating wishlists never reloads the page.",
    github: "https://github.com/rahilkarkar/PL-for-Web-apps-team20",
  },
  {
    title: "Event Management System",
    tech: "Python, Django, PostgreSQL, JavaScript, HTML/CSS",
    description: "A full-stack platform for campus organizations to schedule events and manage registration. It has role-based access for users, organizers and admins, a permission system that controls who can create, edit and register for events, and a GitHub Actions pipeline that tests every pull request before it ships.",
    note: "In a private organization repository",
  },
]
// --------------------

const socials: { label: string; href: string; Icon: IconType; external: boolean }[] = [
  { label: "GitHub", href: links.github, Icon: FaGithub, external: true },
  { label: "LinkedIn", href: links.linkedin, Icon: FaLinkedin, external: true },
  { label: "Email", href: links.email, Icon: FaEnvelope, external: false },
  { label: "Resume", href: links.resume, Icon: FaFileLines, external: true },
]

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      className={`arrow ${direction === "left" ? "arrow-left" : ""}`}
      viewBox="0 0 48 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14H44M32 5l12 9-12 9" />
    </svg>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>("home")

  const changePage = (nextPage: Page) => {
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <main className="portfolio-shell">
      {page === "home" ? (
        <section className="home-page" aria-labelledby="portfolio-name">
          <div className="intro">
          <h1 id="portfolio-name">{profile.name}</h1>
            {profile.education.map((e) => (
              <div className="education-entry" key={e.degree}>
                <p>{e.degree}</p>
                <p>{e.school}</p>
              </div>
            ))}
          </div>

          <div className="profile-block">
            <div className="profile-photo-frame">
              <img
                src="/assets/nirusma-dahal-image.jpg"
                alt="Nirusma Dahal in graduation attire"
                className="profile-photo"
              />
            </div>
            <nav className="social-links" aria-label="Personal links">
              {socials.map(({ label, href, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>

          <button
            className="page-arrow page-arrow-next"
            type="button"
            onClick={() => changePage("projects")}
            aria-label="View projects"
          >
            <Arrow direction="right" />
          </button>
        </section>
      ) : (
        <section className="projects-page" aria-labelledby="projects-heading">
          <h2 id="projects-heading">Projects</h2>

          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <h3>{project.title}</h3>
                <p className="project-tech">{project.tech}</p>
                <p>
                  <span>Description:</span>
                  {project.description}
                </p>
                <div className="project-links">
                  {project.live && (
                    <a className="project-link" href={project.live} target="_blank" rel="noreferrer">
                      Live site
                    </a>
                  )}
                  {project.github && (
                    <a className="project-link" href={project.github} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  )}
                  {project.note && <span className="project-note">{project.note}</span>}
                </div>
              </article>
            ))}
          </div>

          <button
            className="page-arrow page-arrow-back"
            type="button"
            onClick={() => changePage("home")}
            aria-label="Back to introduction"
          >
            <Arrow direction="left" />
          </button>
        </section>
      )}
    </main>
  )
}