import { Link, useParams } from "react-router-dom";
import { projects } from "../../data/projects";
import { DynamicBackground } from "../components/DynamicBackground";

export function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    return (
      <div className="container page-gap">
        <h1>Project Not Found</h1>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <DynamicBackground />
      <main className="container page-gap">
        <Link to="/">← Back</Link>
        <section className="panel glass">
          <p className="hero-role">{project.year}</p>
          <h1>{project.title}</h1>
          <p className="project-role">{project.role}</p>
          <p>{project.description}</p>
          <div className="tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <p className="muted">
            这是详情页占位。后续可加入截图轮播、开发日志、技术拆解、可玩链接与下载入口。
          </p>
        </section>
      </main>
    </div>
  );
}
