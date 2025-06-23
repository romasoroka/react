import { createContext, useContext, useState, ReactNode } from 'react';
import { Project, Employee } from '../types';
import { initialProjects } from '../data/projects';
import { initialEmployees } from '../data/employees';


interface AppContextType {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (id: number, project: Project) => void;
  deleteProject: (id: number) => void;
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  updateEmployee: (id: number, employee: Employee) => void;
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
    recentWorkSessions: employee.recentWorkSessions || [],
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
    setProjects(projects.map((p) => (p.id === id ? { ...updatedProject } : p)));
  };

  const deleteProject = (id: number) => {
    const project = projects.find((p) => p.id === id);
    if (project) {
      // Remove project from employees
      setEmployees(
        employees.map((employee) => {
          if (employee.projects.includes(project.name)) {
            const updatedProjects = employee.projects.filter((p) => p !== project.name);
            return {
              ...employee,
              projects: updatedProjects,
              stats: { ...employee.stats, projectsInvolved: updatedProjects.length },
            };
          }
          return employee;
        })
      );
    }
    setProjects(projects.filter((p) => p.id !== id));
  };

  const addEmployee = (employee: Employee) => {
    setEmployees([...employees, { ...employee, id: employees.length + 1 }]);
  };

  const updateEmployee = (id: number, updatedEmployee: Employee) => {
    setEmployees(employees.map((e) => (e.id === id ? { ...updatedEmployee } : e)));
  };

  return (
    <AppContext.Provider
      value={{ projects, addProject, updateProject, deleteProject, employees, addEmployee, updateEmployee }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};