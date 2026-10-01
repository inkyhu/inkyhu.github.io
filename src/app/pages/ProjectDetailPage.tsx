import { Link, useParams } from "react-router-dom";
import { Footer } from "../components/Footer";
import { projects } from "../../data/projects";

const asset = (project: string, file: string) => `${import.meta.env.BASE_URL}projects/${project}/${file}`;

const caseStudies = {
  "where-things-settle": {
    question: "How can a player handle a memory with their hands?",
    overview: "Where Things Settle is a VR narrative game about growing up inside an overprotective view of the world. Sorting a moving box begins as an ordinary task; familiar objects gradually reveal what that view left out.",
    facts: ["My focus: VR interaction & narrative design", "Unity 6 · Meta XR", "Designed for Meta Quest 3"],
    flowLabel: "Proposed interaction loop",
    flow: ["Sort belongings", "Notice an anomaly", "Handle a memory object", "Return to a changed room"],
    sections: [
      {
        label: "01 / Premise",
        title: "Begin with the ordinary act of unpacking",
        body: "Moving gives each object a reason to be picked up, examined and placed somewhere new. The action also mirrors the story: the player is deciding where old experiences belong in a life they are beginning to shape for themselves.",
        image: asset("where-things-settle", "moving-box.png"),
        alt: "A moving box containing a globe and other personal objects in the game",
        caption: "Current build · A box of personal objects in the new home"
      },
      {
        label: "02 / Interaction design",
        title: "Turn an inner decision into a physical one",
        body: "The central design proposes two ways to deal with an anomalous memory object: break through its protective layer to hear what was obscured, or take it out and keep it. Neither action is meant to be a moral score. Each should offer a different way to understand the same memory.",
        image: asset("where-things-settle", "intro-memory.png"),
        alt: "A choice about forgotten memories in the game's introduction",
        caption: "Current build · The introduction frames memory as an active choice"
      },
      {
        label: "03 / Spatial storytelling",
        title: "Let the room carry the consequence",
        body: "The living room is designed as the player's point of return. Changes in sound, light and space should make decisions legible without reducing them to a good or bad ending. A study shifting toward a classroom is one representative transformation in the design documents; its final extent still needs to be checked against the playable build.",
        image: asset("where-things-settle", "clock.png"),
        alt: "VR hands holding a clock in a room",
        caption: "Current build · Object handling in VR"
      }
    ],
    status: "The screenshots here document the introduction, moving box and object interaction. The broader room transformations, full choice loop and Quest playthrough are design goals until confirmed with a current gameplay capture."
  },
  "the-unwritten-postscript": {
    question: "What happens when the puzzle exists between two players?",
    overview: "The Unwritten Postscript is a two-player cooperative puzzle across a digital studio and a set of physical materials. One player explores the room on a computer; the other handles paper artifacts. Progress depends on describing, listening and checking information together.",
    facts: ["My focus: cooperative puzzle design", "Digital room + physical props", "1930s British writer's studio"],
    flowLabel: "Game flow",
    flow: ["Four studio puzzles", "Open the bookcase", "Two side-room puzzles", "Complete the ending URL"],
    sections: [
      {
        label: "01 / Core interaction",
        title: "Make information exchange the action",
        body: "In the rug puzzle, the player with a photograph identifies a position but cannot read its blurred motif. The player in the digital room finds and describes the matching motif. The first player then uses a printed key to translate it into a number. The clue moves back and forth, so neither side can finish the task alone.",
        image: asset("the-unwritten-postscript", "studio.png"),
        alt: "The digital studio, with desk, rug and shelves",
        caption: "Current build · Eileen's digital studio"
      },
      {
        label: "02 / Game flow",
        title: "From a locked bookcase to a real website",
        body: "Four puzzles in the main studio lead to a bookcase door. Two further puzzles in the side room provide the last digits of a URL. Entering that address moves the ending outside the game. The two spaces give the collaboration a clear rhythm before the final change of medium.",
        image: asset("the-unwritten-postscript", "menu.png"),
        alt: "The Unwritten Postscript title screen on a desk",
        caption: "Current build · The game opens inside Eileen's workspace"
      },
      {
        label: "03 / Material design",
        title: "Give the physical player more than a paper manual",
        body: "A record can encode sound, a Polaroid can preserve a viewpoint, transparent cards can reveal a message when layered, and a sheet can become a clue through folding. These formats ask the player to manipulate information, then explain the result to someone who cannot touch it.",
        image: asset("the-unwritten-postscript", "cover.png"),
        alt: "Official cover for The Unwritten Postscript",
        caption: "Project artwork · Physical and digital clues share one visual world"
      }
    ],
    status: "The digital studio and game menu are shown here. The local Unity project contains code for the ending URL interaction; a full playthrough is still unverified. Physical prop use and player balance need documented photos or playtest evidence before being presented as observed results."
  }
} as const;

export function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find((item) => item.id === projectId);
  const study = projectId ? caseStudies[projectId as keyof typeof caseStudies] : undefined;

  if (!project || !study) {
    return <main className="wrap missing-project"><h1>Project not found</h1><Link to="/">← Back to work</Link></main>;
  }

  return (
    <div className="site-shell">
      <header className="site-header wrap">
        <Link className="wordmark" to="/">Inky Hu<span className="wordmark-dot">.</span></Link>
        <nav aria-label="Main navigation"><Link to="/">← All work</Link></nav>
      </header>
      <main>
        <section className="case-hero wrap">
          <p className="eyebrow">Selected work / Case study</p>
          <h1>{project.title}</h1>
          {project.id === "where-things-settle" && <p className="case-translation">《安放之后》</p>}
          <p className="case-question">{study.question}</p>
          <div className="case-hero-image"><img src={project.imageUrl} alt={`${project.title} game scene`} /></div>
          <div className="case-intro"><p>{study.overview}</p><ul>{study.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul></div>
          <div className="case-flow"><p className="eyebrow">{study.flowLabel}</p><ol>{study.flow.map((step) => <li key={step}>{step}</li>)}</ol></div>
        </section>
        <div className="case-sections wrap">
          {study.sections.map((section) => (
            <section className="case-section" key={section.title}>
              <div className="case-section-text"><p className="eyebrow">{section.label}</p><h2>{section.title}</h2><p>{section.body}</p></div>
              <figure><img src={section.image} alt={section.alt} loading="lazy" /><figcaption>{section.caption}</figcaption></figure>
            </section>
          ))}
        </div>
        <section className="case-status"><div className="wrap"><p className="eyebrow">Development note</p><h2>What these materials show</h2><p>{study.status}</p><Link className="text-link" to="/">← Back to all work</Link></div></section>
      </main>
      <Footer />
    </div>
  );
}
