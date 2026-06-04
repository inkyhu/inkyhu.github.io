import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import type { ProjectItem } from "../types";

interface Props {
  project: ProjectItem;
}

function hexToRgbString(hex: string) {
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) {
    return "148,163,184";
  }

  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

export function ProjectCard({ project }: Props) {
  const badgeStyle = { backgroundColor: `${project.accentColor}E6` };
  const cardStyle = {
    "--card-accent": project.accentColor,
    "--card-accent-rgb": hexToRgbString(project.accentColor)
  } as CSSProperties;
  const detailPath = `/project/${project.id}`;
  const cardContent = (
    <article className="project-card glass-soft" style={cardStyle}>
      <div className="project-card__media">
        <img src={project.imageUrl} alt={project.title} loading="lazy" />
        <span className="project-card__year-badge" style={badgeStyle}>
          {project.year}
        </span>
      </div>

      <h3>{project.title}</h3>
      <p className="project-role">{project.role}</p>
      <p className="project-description">{project.description}</p>
      <div className="tags">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </article>
  );

  if (project.externalLink) {
    return (
      <a className="project-card-link" href={project.externalLink} target="_blank" rel="noreferrer">
        {cardContent}
      </a>
    );
  }

  return (
    <Link className="project-card-link" to={detailPath}>
      {cardContent}
    </Link>
  );
}
