export const siteConfig = {
  siteName: "Inky",
  browserTitle: "Inky's Portfolio",
  role: "Game Designer & Programmer",
  tagline:
    "Under Development",
  contact: {
    email: "crazyhyq0725@gmail.com",
    bilibili: "https://space.bilibili.com/180341097",
    github: "https://github.com/inkyhu/"
  },
  education: {
    school: "Beijing Film Academy",
    degree: "Digital Media Technology Bachelor",
    period: "2023.09 - 2027.06",
    majorCourses: [
      "3D Real-time Engines",
      "Computer 3D Technology",
      "Interactive Media Technology",
      "Computer Graphics",
      "Virtual Previs",
      "Visual Engineering",
      "Programming",
      "Digital Compositing",
      "Digital Photography Technology",
      "Color Grading & Image Processing"
    ]
  },
  routerBasename: import.meta.env.VITE_ROUTER_BASENAME || "/Portfolio/",
  steam: {
    profileUrl: "https://steamcommunity.com/"
  }
} as const;
