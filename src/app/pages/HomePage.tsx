import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { projects } from "../../data/projects";
import { siteConfig } from "../../config/site.config";

const featured = projects.slice(0, 2);
const jams = projects.slice(2);

export function HomePage() {
  return (
    <div className="site-shell">
      <header className="site-header wrap">
        <a className="wordmark" href="#top">Inky Hu<span className="wordmark-dot">.</span></a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href={`mailto:${siteConfig.contact.email}`}>Contact ↗</a>
        </nav>
      </header>

      <main id="top">
        <section className="intro wrap" aria-labelledby="intro-title">
          <div className="intro-topline"><span>Yingqi “Inky” Hu</span><span>Game & Interaction Design</span></div>
          <h1 id="intro-title">Games about the things we <em>notice, carry, and share.</em></h1>
          <div className="intro-bottom">
            <p>I design experiences where exploration, space and small acts of interaction give a story its shape.</p>
            <a href="#work" aria-label="Explore selected work">Explore work <span aria-hidden="true">↓</span></a>
          </div>
        </section>

        <section className="work-section wrap" id="work" aria-labelledby="work-title">
          <div className="section-heading"><p className="eyebrow">01 / Selected work</p><h2 id="work-title">Featured projects</h2></div>
          <div className="featured-list">
            {featured.map((project, index) => (
              <Link className="featured-project" key={project.id} to={`/project/${project.id}`}>
                <div className="featured-image"><img src={project.imageUrl} alt={`${project.title} gameplay`} /></div>
                <div className="featured-copy">
                  <div className="project-index">0{index + 1} <span>{project.role}</span></div>
                  <h3>{project.title}</h3>
                  {project.id === "where-things-settle" && <p className="project-translation">《安放之后》</p>}
                  <p className="featured-description">{project.description}</p>
                  <div className="featured-footer"><span>{project.tags.join(" / ")}</span><span className="round-arrow" aria-hidden="true">↗</span></div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="jams-section wrap" aria-labelledby="jams-title">
          <div className="section-heading"><p className="eyebrow">02 / Short-form work</p><h2 id="jams-title">Game jams</h2></div>
          <div className="jam-grid">
            {jams.map((project) => (
              <a className="jam-card" key={project.id} href={project.externalLink} target="_blank" rel="noreferrer">
                <div className="jam-image"><img src={project.imageUrl} alt={`${project.title} cover`} loading="lazy" /></div>
                <div className="jam-meta"><span>{project.role}</span><span aria-hidden="true">↗</span></div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </a>
            ))}
          </div>
          <a className="text-link" href="https://inkyh.itch.io/" target="_blank" rel="noreferrer">More playable work on itch.io ↗</a>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-title">
          <div className="wrap about-grid">
            <p className="eyebrow">03 / About</p>
            <div>
              <h2 id="about-title">I’m Inky, a game designer with a background in film and interactive media.</h2>
              <p>I study Digital Media Technology at Beijing Film Academy (2023–2027). I’m interested in exploration, puzzles, narrative and the emotions a space can hold. I use tools including Unity, Unreal Engine and VR to make those ideas playable.</p>
              <div className="about-links"><a href={`mailto:${siteConfig.contact.email}`}>Email ↗</a><a href={siteConfig.contact.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://inkyh.itch.io/" target="_blank" rel="noreferrer">itch.io ↗</a></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
