import { useMemo, useState } from "react";
import { Navbar } from "../components/Navbar";
import { DynamicBackground } from "../components/DynamicBackground";
import { MouseParticles } from "../components/MouseParticles";
import { siteConfig } from "../../config/site.config";
import { projects } from "../../data/projects";
import { ProjectCard } from "../components/ProjectCard";
import { SteamGames } from "../components/SteamGames";
import { Footer } from "../components/Footer";
import type { ProjectCategory } from "../types";

const PERSONAL_FILTERS: (ProjectCategory | "All")[] = [
  "All",
  "Games",
  "Level Design",
  "Other"
];

export function HomePage() {
  const [personalFilter, setPersonalFilter] = useState<(typeof PERSONAL_FILTERS)[number]>("All");

  const personalProjects = useMemo(() => projects, []);

  const filteredPersonal = useMemo(() => {
    if (personalFilter === "All") {
      return personalProjects;
    }
    return personalProjects.filter((project) => project.categories.includes(personalFilter));
  }, [personalFilter, personalProjects]);

  return (
    <div id="home" className="page-shell">
      <Navbar />
      <DynamicBackground />
      <MouseParticles />
      <main className="container">
        <section id="about" className="hero glass">
          <h1 className="hero-name">Inky</h1>
          <p className="hero-role">Game Designer & Programmer</p>
          <p className="hero-subtitle">
            Under development...
          </p>
          <div className="hero-links">
            <a href={`mailto:${siteConfig.contact.email}`}>Email</a>
            <a href={siteConfig.contact.bilibili} target="_blank" rel="noreferrer">
              Bilibili
            </a>
            <a href={siteConfig.contact.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </section>

        <section id="experience" className="panel glass">
          <div className="section-title-wrap">
            <h2 className="section-title">Experience & Education</h2>
          </div>
          <div className="timeline-item">
            <h3>{siteConfig.education.school}</h3>
            <p className="muted">
              {siteConfig.education.period} · {siteConfig.education.degree}
            </p>
            <p className="education-label">Major courses</p>
            <div className="course-inline">
              {siteConfig.education.majorCourses.map((course) => (
                <span key={course}>{course}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="panel glass">
          <div className="section-title-wrap">
            <h2 className="section-title">Projects</h2>
            <p className="section-subtitle">Independent projects I've developed as a solo developer</p>
          </div>
          <div className="filter-row">
            {PERSONAL_FILTERS.map((filter) => (
              <button
                key={filter}
                className={personalFilter === filter ? "chip chip--active" : "chip"}
                onClick={() => setPersonalFilter(filter)}
                type="button"
              >
                {filter}
                <span className="chip-count">
                  {filter === "All"
                    ? personalProjects.length
                    : personalProjects.filter((project) => project.categories.includes(filter)).length}
                </span>
              </button>
            ))}
          </div>
          <div className="project-grid">
            {filteredPersonal.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        <SteamGames />
      </main>
      <Footer />
    </div>
  );
}
