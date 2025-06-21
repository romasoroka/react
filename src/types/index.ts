export interface Credential {
  name: string; // e.g., "Username/Password", "API Key", "Database URL"
  value?: string; // e.g., password, secret value (optional for non-sensitive keys)
  description?: string; // Optional context (e.g., "Admin account for server")
}

export interface ProjectAnalytics {
  hoursLogged: number; // Total hours logged on the project
  reports: number; // Number of reports submitted
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
  analytics: ProjectAnalytics; // New field for analytics
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
    recentWorkSessions?: WorkSession[]; // New field
  }

  export interface WorkSession {
    id: number;
    date: string; // e.g., "2024-06-14"
    project: string; // Project name
    hours: number; // Hours worked
    description: string; // Work description
  }

  export interface WorkSessionWithEmployee extends WorkSession {
    employee?: string;
  }

  