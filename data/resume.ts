// =====================================================================
//  ALL SITE CONTENT LIVES HERE. Edit this file only.
//  Values starting with "REPLACE_" are placeholders: links/blocks that
//  contain them are hidden automatically until you fill them in.
// =====================================================================

export type Metric = { label: string; value: number; decimals?: number; prefix?: string; suffix?: string; note: string };
export type Role = { company: string; title: string; location: string; period: string; summary: string; bullets: string[]; stack: string[] };
export type Project = {
  slug: string;
  title: string;
  tagline: string;
  problem: string;
  role: string;
  stack: string[];
  highlights: string[];
  outcome: string;
  github: string;
  live?: string;
};
export type SkillGroup = { category: string; items: string[] };
export type Testimonial = { quote: string; name: string; title: string };

export const site = {
  url: "https://REPLACE_your-domain.vercel.app",
  title: "Akilesh K R | Full-Stack & GenAI Engineer",
  description:
    "Mechanical engineer turned software developer. I build full-stack web apps and LLM agents that turn real factory data into answers.",
  formspreeEndpoint: "REPLACE_https://formspree.io/f/your-form-id",
  calendlyUrl: "REPLACE_https://calendly.com/your-handle",
  analytics: true,
};

export const person = {
  name: "Akilesh K R",
  initials: "AK",
  role: "Full-Stack & GenAI Engineer",
  headline: "I build software that makes factory data answer back.",
  valueProp:
    "Mechanical engineering graduate (9.58 CGPA) shipping MERN apps and local LLM agents on real production data.",
  location: "Coimbatore, Tamil Nadu, India",
  openToRelocation: true,
  availability: "Open to work",
  email: "akileshkr27@gmail.com",
  phone: "+91-9345572527",
  linkedin: "https://linkedin.com/in/akilesh-k-r-b90509270",
  github: "https://github.com/Akileshkr01",
  resumeUrl: "/resume.pdf",
};

export const about = {
  story: [
    "I trained as a mechanical engineer, so I think in systems, tolerances and throughput before I think in frameworks.",
    "That background pulled me toward software: first full-stack MERN apps, then an LLM agent that answers plain-English questions about a factory's production data.",
    "I like work where code meets the real world and the result can be measured.",
  ],
  lookingFor:
    "Software Engineer or GenAI / Applied AI roles on a product team, ideally close to data, analytics or manufacturing. Open to relocation.",
};

export const metrics: Metric[] = [
  { label: "CGPA", value: 9.58, decimals: 2, suffix: "/10", note: "B.E. Mechanical Engineering" },
  { label: "Production records", value: 10966, note: "analysed in Factory Line Copilot" },
  { label: "Full-stack projects", value: 3, note: "built and on GitHub" },
  { label: "Hackathon win", value: 1, note: "Smart India Hackathon (intra-college)" },
];

export const experience: Role[] = [
  {
    company: "NidiTech Solutions",
    title: "Web Development Intern",
    location: "Coimbatore, Tamil Nadu",
    period: "Jun 2025 – Jul 2025",
    summary: "One-month industrial training in MERN stack development.",
    bullets: [
      "Designed REST APIs and responsive React interfaces during a one-month MERN training program, working to industry coding standards.",
      "Built Cinibook, a full-stack web application, under mentor guidance, using Git version control throughout.",
    ],
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "Git"],
  },
];

export const projects: Project[] = [
  {
    slug: "factory-line-copilot",
    title: "Factory Line Copilot",
    tagline: "A local LLM agent that answers questions about production data.",
    problem:
      "Plant data sits in SQL tables and dashboards that need an analyst to interrogate. Operators should be able to just ask.",
    role: "Data & AI developer",
    stack: ["Python", "LangGraph", "Ollama", "SQL", "Power BI"],
    highlights: [
      "Built a Power BI dashboard tracking OEE (Overall Equipment Effectiveness) from SQL queries on 10,966 production records.",
      "Developed a local LLM agent with LangGraph and Ollama that turns plain-English questions into queries against the database.",
      "Runs in read-only mode, so the agent can never modify production data.",
    ],
    outcome: "Plain-English answers over 10,966 production records, running fully locally with read-only database access.",
    github: "REPLACE_https://github.com/Akileshkr01/Factory-line-copilot",
  },
  {
    slug: "the-bookmark",
    title: "The Bookmark",
    tagline: "A full-stack online bookstore with admin tooling and payments.",
    problem:
      "A bookstore needs fast catalog browsing, a trustworthy checkout, and a back office to manage books, users and orders.",
    role: "Full-stack developer",
    stack: ["React.js", "Redux", "Node.js", "Express.js", "MongoDB"],
    highlights: [
      "Built a React/Redux frontend and Node/Express REST API with search, pagination, cart, multi-step checkout, and ratings and reviews.",
      "Implemented JWT authentication with role-based access control.",
      "Shipped an admin dashboard for books, users and orders, plus PayPal payments.",
    ],
    outcome: "A complete storefront-to-admin flow, from browsing to paid order, with role-separated access.",
    github: "REPLACE_https://github.com/Akileshkr01/The-Bookmark-",
    live: "REPLACE_https://your-bookmark-demo.vercel.app",
  },
  {
    slug: "social-media-chat",
    title: "Social Media App with Real-Time Chat",
    tagline: "A social platform with a personalized feed and live one-to-one chat.",
    problem:
      "Social products live or die on responsiveness: feeds that feel personal and chat that arrives instantly.",
    role: "Full-stack developer",
    stack: ["React.js", "Context API", "Material UI", "Node.js", "Express.js", "MongoDB", "Socket.IO"],
    highlights: [
      "Built posts with image uploads, likes, comments, follow/unfollow, and a personalized timeline feed.",
      "Implemented JWT authentication with token refresh.",
      "Added real-time one-to-one chat with Socket.IO and online-user presence.",
    ],
    outcome: "A working social platform with authenticated sessions, a personalized feed, and live messaging.",
    github: "REPLACE_https://github.com/Akileshkr01/Social-Media-App",
    live: "REPLACE_https://your-social-demo.vercel.app",
  },
];

export const skillGroups: SkillGroup[] = [
  { category: "Languages", items: ["Java", "Python", "JavaScript"] },
  { category: "Web", items: ["React.js", "Node.js", "Express.js", "REST APIs"] },
  { category: "Databases", items: ["MySQL", "MongoDB"] },
  { category: "GenAI / LLM", items: ["LangChain", "LangGraph", "RAG"] },
  { category: "Cloud & Tools", items: ["Azure", "Docker", "Git", "GitHub"] },
  { category: "CS Fundamentals", items: ["Operating Systems", "Computer Networks", "DBMS"] },
];

export const coreStrengths: string[] = ["React.js", "Node.js", "Python", "LangGraph", "MongoDB"];

export const education = {
  school: "PSNA College of Engineering & Technology",
  location: "Dindigul, Tamil Nadu",
  degree: "B.E. in Mechanical Engineering",
  period: "2022 – 2026",
  cgpa: "9.58 / 10",
  coursework: ["Data Structures & Algorithms", "Object-Oriented Programming", "Software Engineering"],
};

export const certifications: { name: string; issuer: string }[] = [
  { name: "Python Programming", issuer: "Udemy" },
  { name: "Node JS Certification Course", issuer: "Scaler" },
];

export const achievements: string[] = [
  "Gold Medal for Academic Excellence",
  "Winner, Smart India Hackathon (Intra-College)",
];

// Leave empty to hide the Testimonials section entirely.
export const testimonials: Testimonial[] = [];
