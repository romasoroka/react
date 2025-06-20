export interface ProjectFormData {
    name: string;
    status: 'Active' | 'In Progress' | 'Completed';
    technologies: string[];
    description: string;
    programmers: string[];
    startDate: string;
    endDate: string;
    budget: string;
    client: string;
    detailedDescription: string;
    hoursLogged: string;
    reports: string;
  }
  
  export const initialProjectFormData: ProjectFormData = {
    name: '',
    status: 'Active',
    technologies: [],
    description: '',
    programmers: [],
    startDate: '',
    endDate: '',
    budget: '',
    client: '',
    detailedDescription: '',
    hoursLogged: '',
    reports: '',
  };

  export interface SessionFormData {
    date: string;
    employee: string;
    hours: string;
    description: string;
  }
  
  export interface CredentialFormData {
    name: string;
    key: string;
    value: string;
    description: string;
  }
  

  
  export const initialSessionFormData: SessionFormData = {
    date: '',
    employee: '',
    hours: '',
    description: '',
  };
  
  export const initialCredentialFormData: CredentialFormData = {
    name: '',
    key: '',
    value: '',
    description: '',
  };