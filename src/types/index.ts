export interface Project {
    id: number;
    name: string;
    status: string;
    technologies: string[];
    description: string;
    programmers: string[];
    startDate: string;
    endDate: string;
    budget: string;
    client: string;
    detailedDescription: string;
  }
  
  export interface Employee {
    id: number;
    name: string;
    position: string;
    skills: string[];
    experience: string;
    projects: string[];
    email: string;
    phone: string;
    bio: string;
  }