type AcademicRecord = {
  school: string;
  major: string;
  minor: string[];
  duration: string;
  cgpa: string;
};

export const academicRecord: AcademicRecord = {
  school: "McGill University",
  major: "B.Eng., Electrical Engineering",
  minor: ["Musical Science & Technology", "Software Engineering"],
  duration: "Sep 2021 - Present",
  cgpa: "3.5/4.0",
};

type Publication = {
  title: string;
  authors: string[];
  publisher: string;
  conference: string;
  location: string;
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

// book: "Digital Technologies Applied to Music Research: Methodologies, Projects and Challenges",

export const publications: Publication[] = [
  {
    title: "Enhancing Musicological Analysis through Digital Tools",
    authors: ["Martha Thomae", "Antoine Phan", "Elsa De Luca"],
    conference:
      "Digital Technologies Applied to Music Research: Methodologies, Projects and Challenges",
    time: "June 27-29, 2024",
    location: "Lisbon, Portugal",
    url: "",
    publisher: "",
    doi: "",
  },
  {
    title: "Music Retrieval Tools (OMR and music analysis).",
    authors: ["Elsa De Luca", "Martha Thomae", "Antoine Phan"],
    time: "June 27-29, 2024",
    location: "Lisbon, Portugal",
    url: "",
    publisher: "",
    doi: "",
    conference:
      "Digital Technologies Applied to Music Research: Methodologies, Projects and Challenges",
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
