export interface Credential {
  id?: number; 
  name: string;
  value: string;
  description?: string;
}

export interface Technology {
  id: number;
  name: string;
}

export enum ProjectStatus {
  Active = 0,
  Completed = 1,
  OnHold = 2,
  Cancelled = 3,
}

export interface Project {
  id: number; 
  name: string;
  status: ProjectStatus;
  technologies: string[];
  description: string;
  detailedDescription?: string;
  startDate: string; 
  endDate?: string; 
  budget: number;
  client: string;
  credentials?: Credential[];
  workSessions?: WorkSession[];
  totalHoursLogged: number; 
  reportCount: number;
  activeEmployees: number; 
  employeeIds: number[];
  employeeNames?: string[];
}

export interface Employee {
  id: number; 
  fullName: string;
  yearsOfExperience: number;
  skills: string[];
  email: string;
  phone?: string;
  bio?: string;
  imageUrl?: string;
  totalHoursWorked: number; 
  reportsSubmitted: number; 
  projectsInvolved: number; 
  projectIds: number[];
  workSessions?: WorkSession[];
}

export interface WorkSession {
  id?: number;
  date: string;
  startTime: string;
  endTime: string;
  taskDescription: string;
  projectId: number;
  employeeId: number;
}
