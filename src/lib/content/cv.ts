import type {
  AcademicRecord,
  Publication,
  ConferenceWorkshop,
  WorkExperience,
  Skill,
} from "@schemas";
// ------------------------------------------------------------------------- //

export const academicRecord: AcademicRecord = {
  school: "McGill University",
  degree: "B.Eng., Electrical Engineering",
  duration: "Sep 2021 - Present",
  details: [
    "Minors in Software Engineering (B.Eng), and Musical Science & Technology (MST).",
    "Relevant courses: Operating System, Control System, Embedded System, Microprocessors, Software Delivery.",
  ],
  cgpa: "3.41/4.0",
};

export const publications: Publication[] = [
  {
    type: "Conference Paper",
    title:
      "Plainchant Analyser for MEI Neumes: A Tool for Understanding Chant Transmission",
    authors: [
      "Antoine Phan",
      "Martha Thomae",
      "Elsa De Luca",
      "Francesco Orio",
    ],
    details: [
      "Conference: Music Encoding Conference 2025",
      "Location: London, United Kingdom.",
      "Time: June 27-29, 2024",
    ],
    url: "",
    doi: "",
  },
  {
    type: "Confernece Paper",
    title: "Enhancing Musicological Analysis through Digital Tools",
    authors: ["Martha Thomae", "Antoine Phan", "Elsa De Luca"],
    details: [
      "Conference: Digital Technologies Applied to Music Research: Methodologies, Projects and Challenges",
      "Location: Lisbon, Portugal",
      "Time: June 27-29, 2024",
    ],
    url: "",
    doi: "",
  },
  {
    type: "Confernece Paper",
    title: "Music Retrieval Tools (OMR and music analysis).",
    authors: ["Elsa De Luca", "Martha Thomae", "Antoine Phan"],
    details: [
      "Conference: Digital Technologies Applied to Music Research: Methodologies, Projects and Challenges",
      "Location: Lisbon, Portugal",
      "Time: June 24th, 2024",
    ],
    url: "",
    doi: "",
  },
];

export const conferenceWorkshops: ConferenceWorkshop[] = [
  {
    title: "ECHOES Workshop on the automatic analysis of early music sources",
    authors: ["Martha Thomae", "Antoine Phan", "Elsa De Luca"],
    time: "29th June, 2024",
    location: "CESEM - FCSH, NOVA Universidade de Lisboa, Lisbon, Portugal",
  },
];

export const workExperience: WorkExperience[] = [
  {
    jobTitle: "Backend Developer, Server Administrator",
    workplace: "DDMAL",
    time: "Dec 2025 - Present",
    location: "Montreal, Canada",
    description: [
      "Streamlined backend architecture and deployment, leading to increased developer productivity and reduced complexity.",
      "Updating and optimizing dependencies in Dockerfiles for legacy backend services, improving reliability and maintainability.",
      "Overseeing deployment pipeline and monitoring system uptime for multiple lab projects.",
    ],
  },
  {
    jobTitle: "Teaching Assistant",
    workplace: "McGill University",
    time: "Jan 2024 - Apr 2024",
    location: "Montreal, Quebec",
    description: [
      "Provided support to students by answering questions on the discussion board and assiting with their deliverables.",
    ],
  },
  {
    jobTitle: "Software Developer",
    workplace: "CESEM",
    time: "Dec 2023 - Nov 2024",
    location: "Portugal (Remote)",
    description: [
      "Implemented and deployed the Plainchant Analyser for MEI Neumes web interface to search and analyze a historical chant corpus from the Portuguese Early Music (PEM) database.",
      "Worked in an interdisciplinary team composed of historical musicologists, music technology and computer science experts.",
    ],
  },
  {
    jobTitle: "Software Developer",
    workplace: "SRL",
    location: "Montreal, Canada",
    time: "May 2023 - Aug 2023",
    description: [
      "Implemented and Dockerized a multilingual translation microservice to the project IMAGE's backend using open-source Large Language Models (LLMs) from HuggingFace and written in Python.",
      "Designed earcons to support multilingual user interactions and enhance accessibility.",
    ],
  },
];

export const skills: Skill[] = [
  {
    title: "System Administration",
    tools: ["Linux (Debian-based, Arch)", "SSH", "DNS Configuration"],
  },
  {
    title: "DevOps",
    tools: [
      "Docker",
      "Docker Compose",
      "AWS EC2",
      "GitHub Actions CI/CD",
      "Vercel",
    ],
  },

  {
    title: "Programming",
    tools: ["Python", "C", "C++", "Java", "Assembly (ARMv7)", "SuperCollider"],
  },
  {
    title: "Web development",
    tools: [
      "JavaScript/TypeScript",
      "SvelteKit",
      "TailwindCSS",
      "expressJS",
      "Flask",
      "Django",
    ],
  },
  {
    title: "Simulation & Design",
    tools: ["MATLAB", "Simulink", "3D Printing"],
  },
  {
    title: "Electronics",
    tools: ["Arduino UNO", "Raspberry Pi", "Electric Circuit Design"],
  },
  {
    title: "Languages",
    tools: ["English", "French", "Vietnamese", "Spanish."],
  },
];
