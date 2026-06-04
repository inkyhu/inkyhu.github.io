export type ProjectCategory = "Games" | "Level Design" | "Other";

export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  description: string;
  imageUrl: string;
  year: string;
  engine?: string;
  tags: string[];
  categories: ProjectCategory[];
  accentColor: string;
  externalLink?: string;
}
