import type { ProjectItem } from "../app/types";

export const projects: ProjectItem[] = [
  {
    id: "where-things-settle",
    title: "Where Things Settle",
    role: "VR narrative game",
    description: "A moving box becomes a way to revisit the stories we were told, and the choices we make when they no longer fit.",
    imageUrl: `${import.meta.env.BASE_URL}projects/where-things-settle/moving-box.png`,
    year: "In development",
    tags: ["VR", "Interaction", "Narrative"],
    categories: ["Games"],
    accentColor: "#a36b50"
  },
  {
    id: "the-unwritten-postscript",
    title: "The Unwritten Postscript",
    role: "Physical + digital co-op puzzle",
    description: "Two players, one digital room and a set of physical artifacts. The story emerges through what they tell each other.",
    imageUrl: `${import.meta.env.BASE_URL}projects/the-unwritten-postscript/studio.png`,
    year: "In development",
    tags: ["Co-op", "Puzzle", "Mixed media"],
    categories: ["Games"],
    accentColor: "#6e6246"
  },
  {
    id: "wickbound",
    title: "Wickbound",
    role: "Game design · Programming",
    description: "A candle is your vision, your resource and your countdown.",
    imageUrl: "https://img.itch.zone/aW1nLzI4ODEzMjE2LnBuZw%3D%3D/original/a%2Fa5wm.png",
    year: "GMTK Game Jam 2026",
    tags: ["3D", "Puzzle"],
    categories: ["Games"],
    accentColor: "#a87543",
    externalLink: "https://inkyh.itch.io/wickbound"
  },
  {
    id: "turning-signal",
    title: "Turning Signal",
    role: "Ludum Dare 59 · 72 hours",
    description: "Guide a clumsy robot through a puzzle using red and green signals.",
    imageUrl: "https://img.itch.zone/aW1nLzI2ODA4NDExLnBuZw==/315x250%23c/ddykvW.png",
    year: "2026",
    tags: ["2D", "Puzzle"],
    categories: ["Games"],
    accentColor: "#527e5c",
    externalLink: "https://inkyh.itch.io/turning-signal"
  },
  {
    id: "eos-born-of-two",
    title: "Eos: Born of Two",
    role: "BOOOMJAM 2026",
    description: "A local two-player puzzle played together on one keyboard.",
    imageUrl: "https://img.itch.zone/aW1nLzI3Mjk3OTk4LnBuZw==/315x250%23c/IFbsOJ.png",
    year: "2026",
    tags: ["Co-op", "Puzzle"],
    categories: ["Games"],
    accentColor: "#555f91",
    externalLink: "https://inkyh.itch.io/eos-born-of-two"
  }
];
