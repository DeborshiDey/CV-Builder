export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface Project {
  id: string;
  name: string;
  link?: string;
  description: string;
}

export interface Course {
  id: string;
  name: string;
  institution: string;
  startDate: string;
  endDate: string;
  link: string;
}

export interface CVData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
    website: string;
    summary: string;
    professionalTitle: string;
  };
  targetJob: {
    company: string;
    position: string;
    description: string;
  };
  experience: Experience[];
  education: Education[];
  projects: Project[];
  courses: Course[];
  skills: string[]; // Deprecated, kept for backward compatibility
  hardSkills: string[];
  softSkills: string[];
  selectedTemplate: "classic" | "modern" | "minimal" | "executive";
}

export const initialCVData: CVData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    website: "",
    summary: "",
    professionalTitle: "",
  },
  targetJob: {
    company: "",
    position: "",
    description: "",
  },
  experience: [],
  education: [],
  projects: [],
  courses: [],
  skills: [],
  hardSkills: [],
  softSkills: [],
  selectedTemplate: "classic",
};
