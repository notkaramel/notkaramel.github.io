type Project = {
  title: string;
  featured: boolean;
  shortDesc: string;
  techStack: string[];
  category: string[];
  github: string;
  link: string;
};

export type { Project };
export const projects: Project[] = [
  {
    title: "OSC & SuperCollider 101",
    featured: true,
    shortDesc:
      "Introductory Workshop to Open Sound Control & SuperCollider. For MUMT306 - Fall 2024 and ECSESS Music Tech workshop.",
    techStack: ["Reveal.js", "SuperCollider", "Python"],
    category: ["Music Tech", "Workshop"],
    github: "https://github.com/notkaramel/SuperCollider101",
    link: "https://notkaramel.github.io/SuperCollider101/",
  },
  {
    title: "Plainchant Analyser for MEI Neumes",
    featured: true,
    shortDesc:
      "Search and analyse early music chants. Made for project ECHOES from the Past: Unveiling a Lost Soundscape.",
    techStack: ["JavaScript", "Svelte"],
    category: ["Music Tech"],
    github: "https://github.com/ECHOES-from-the-Past/PAM",
    link: "https://echoes-from-the-past.github.io/PAM/",
  },
  {
    title: "Markdown Editor",
    featured: true,
    shortDesc: "A simple markdown editor for taking notes on-the-go :)",
    techStack: ["Vite", "Bun", "TailwindCSS"],
    category: ["Helpful tools"],
    github: "https://github.com/notkaramel/prosey-editor",
    link: "https://notkaramel.github.io/prosey-editor/",
  },
  {
    title: "ECSESS Website",
    featured: true,
    shortDesc:
      "Website for the Electrical, Computer & Software Engineering Students' Society at McGill University (ECSESS)",
    techStack: ["SvelteKit", "TailwindCSS", "Strapi", "Vercel"],
    category: ["Extracurricular"],
    github: "https://github.com/notkaramel/ECSESS",
    link: "https://ecsess.vercel.app",
  },
  {
    title: "IEEE McGill Website",
    featured: true,
    shortDesc:
      "Website for the Institute of Electrical and Electronics Engineers Student Branch at McGill (IEEE McGill)",
    techStack: ["SvelteKit", "TailwindCSS"],
    category: ["Extracurricular"],
    github: "https://github.com/IEEE-McGill-Student-Branch/IEEE-McGill",
    link: "https://ieeemcgill.com",
  },
  {
    title: "Arch Linux on ARM",
    featured: true,
    shortDesc:
      "A minimal installer of Arch Linux for ARMv7 Raspberry Pi (RPi4, 400), and other supported ARM models.",
    techStack: ["Linux", "Python", "Bash"],
    category: ["Automation", "Personal Project"],
    github: "https://github.com/notkaramel/ArchLinux-on-ARM",
    link: "https://notkaramel.github.io/ArchLinux-on-ARM/",
  },
  {
    title: "Mar-1 Hotel System (ECSE 321)",
    featured: true,
    shortDesc: "Full-stack webapp project for ECSE321 - Fall 2023",
    techStack: ["Java", "Spring Boot", "VueJS", "PostgreSQL"],
    category: ["In-class"],
    github: "https://github.com/notkaramel/ECSE321-Mar1HotelSystem",
    link: "",
  },
  {
    title: "Arduino PS4 Car",
    featured: true,
    shortDesc: "A remote controlled car using a PS4 controller and an Arduino",
    techStack: ["Arduino", "C++", "Tinkercad"],
    category: ["Personal Project"],
    github: "https://github.com/notkaramel/ArduinoPS4Car",
    link: "",
  },
  {
    title: "Waddl-E (ECSE 211)",
    featured: true,
    shortDesc: "An autonomous delivery robot. For ECSE 211 - Winter 2023",
    techStack: ["BrickPi", "Lego Mindstorm", "Python"],
    category: ["In-class"],
    github: "https://github.com/notkaramel/ECSE211-Waddl-E",
    link: "",
  },
  {
    title: "Pepperoni - Forge McGill Hackathon",
    featured: true,
    shortDesc:
      "An Arduino robot car that goes through an obstacle course. Made for the hardware hackathon Forge McGill",
    techStack: ["Arduino", "C++"],
    category: ["Hackathon"],
    github: "https://github.com/notkaramel/Pepperoni",
    link: "",
  },
];
