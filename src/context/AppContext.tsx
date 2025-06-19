import { createContext, useContext, useState, ReactNode } from 'react';
import { Project, Employee } from '../types';
import { initialProjects } from '../data/Projects';
import { initialEmployees } from '../data/Employees';

interface AppContextType {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (id: number, project: Project) => void;
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Migrate employees
  const migratedEmployees = initialEmployees.map((employee) => ({
    ...employee,
    stats: employee.stats || {
      hoursWorked: 0,
      reportsSubmitted: 0,
      projectsInvolved: employee.projects.length || 0,
    },
  }));

  // Migrate projects
  const migratedProjects = initialProjects.map((project) => ({
    ...project,
    analytics: project.analytics || {
      hoursLogged: 0,
      reports: 0,
    },
  }));

  const [projects, setProjects] = useState<Project[]>(migratedProjects);
  const [employees, setEmployees] = useState<Employee[]>(migratedEmployees);

  const addProject = (project: Project) => {
    setProjects([...projects, { ...project, id: projects.length + 1 }]);
  };

  const updateProject = (id: number, updatedProject: Project) => {
    setProjects(projects.map((p) => (p.id === id ? updatedProject : p)));
  };

  const addEmployee = (employee: Employee) => {
    setEmployees([...employees, { ...employee, id: employees.length + 1 }]);
  };

  return (
    <AppContext.Provider value={{ projects, addProject, updateProject, employees, addEmployee }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};