type AcademicRecord = {
  school: string;
  major: string;
  minor: string[];
  duration: string;
  cgpa: string;
};

type Publication = {
  title: string;
  authors: string[];
  type: string;
  details: string[];
  time: string;
  doi: string | any;
  url: string | any;
};

type ConferenceWorkshop = {
  title: string;
  authors: string[];
  time: string;
  location: string;
};

type WorkExperience = {
  jobTitle: string;
  workplace: string;
  location: string;
  time: string;
  description: string[];
};
// ------------------------------------------------------------------------- //

export const academicRecord: AcademicRecord = {
  school: "McGill University",
  major: "B.Eng., Electrical Engineering",
  minor: ["Musical Science & Technology", "Software Engineering"],
  duration: "Sep 2021 - Present",
  cgpa: "3.5/4.0",
};

export const publications: Publication[] = [
  {
    type: "Confernece Paper",
    title: "Enhancing Musicological Analysis through Digital Tools",
    authors: ["Martha Thomae", "Antoine Phan", "Elsa De Luca"],
    details: [
      "conference: Digital Technologies Applied to Music Research: Methodologies, Projects and Challenges. Location: Lisbon, Portugal",
    ],
    time: "June 27-29, 2024",
    url: "",
    doi: "",
  },
  {
    type: "Confernece Paper",
    title: "Music Retrieval Tools (OMR and music analysis).",
    authors: ["Elsa De Luca", "Martha Thomae", "Antoine Phan"],
    details: [
      "location: Lisbon, Portugal",
      "publisher: ",
      "conference: Digital Technologies Applied to Music Research: Methodologies, Projects and Challenges",
    ],
    time: "June 27-29, 2024",
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
    description: ["I do this", "I do that"],
  },
  {
    jobTitle: "Software Developer",
    workplace: "CESEM",
    time: "Dec 2024 - Nov 2025",
    location: "Portugal (Remote)",
    description: ["I do this", "I do that"],
  },
  {
    jobTitle: "Software Developer",
    workplace: "SRL",
    location: "Montreal, Canada",
    time: "May 2023 - Aug 2023",
    description: ["I do this", "I do that"],
  },
];
