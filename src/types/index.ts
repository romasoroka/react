export interface Credential {
  name: string; 
  value?: string;
  description?: string;
}

export interface ProjectAnalytics {
  hoursLogged: number; 
  reports: number; 
}

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
  credentials?: Credential[];
  analytics: ProjectAnalytics; 
}
  
  export interface EmployeeStats {
    hoursWorked: number; 
    reportsSubmitted: number; 
    projectsInvolved: number; 
  }
  
  export interface Employee {
    id: number;
    name: string;
    position: string;
    skills: string[];
    experience: number;
    projects: string[]; 
    email: string;
    phone: string;
    bio: string;
    stats: EmployeeStats;
    image?: string; 
    recentWorkSessions?: WorkSession[]; 
  }

  export interface WorkSession {
    id: number;
    date: string; 
    project: string; 
    hours: number; 
    description: string; 
  }

  export interface WorkSessionWithEmployee extends WorkSession {
    employee?: string;
  }

  