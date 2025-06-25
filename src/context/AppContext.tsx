import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, Employee } from '../types';
import { initialProjects } from '../data/projects';
import { fetchEmployees, createEmployee, fetchProjects } from '../services';

interface AppContextType {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (id: number, project: Project) => void;
  deleteProject: (id: number) => void;
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, 'id'>) => Promise<void>; 
  updateEmployee: (id: number, employee: Employee) => void;
  loading: boolean;
  error: string | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const migratedProjects = initialProjects.map((project) => ({
    ...project,
    analytics: project.analytics || {
      hoursLogged: 0,
      reports: 0,
    },
  }));

  const [projects, setProjects] = useState<Project[]>(migratedProjects);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await fetchEmployees();
        const migratedEmployees = data.map((employee) => ({
          ...employee,
          stats: employee.stats || {
            hoursWorked: 0,
            reportsSubmitted: 0,
            projectsInvolved: employee.projects?.length || 0,
          },
          recentWorkSessions: employee.recentWorkSessions || [],
        }));
        setEmployees(migratedEmployees);
        setLoading(false);
      } catch (err) {
        setError('Не вдалося завантажити працівників');
        setLoading(false);
        console.error('Error loading employees:', err);
      }
    };
    loadEmployees();
  }, []);

  const addProject = (project: Project) => {
    setProjects([...projects, { ...project, id: projects.length + 1 }]);
  };

  const updateProject = (id: number, updatedProject: Project) => {
    setProjects(projects.map((p) => (p.id === id ? { ...updatedProject } : p)));
  };

  const deleteProject = (id: number) => {
    const project = projects.find((p) => p.id === id);
    if (project) {
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

  const addEmployee = async (employee: Omit<Employee, 'id'>) => {
    try {
      const newEmployee = await createEmployee(employee);
      setEmployees((prev) => [...prev, {
        ...newEmployee,
        stats: newEmployee.stats || {
          hoursWorked: 0,
          reportsSubmitted: 0,
          projectsInvolved: newEmployee.projects?.length || 0,
        },
        recentWorkSessions: newEmployee.recentWorkSessions || [],
      }]);
    } catch (err) {
      setError('Error adding employee');
      console.error('Error adding employee:', err);
      throw err; 
    }
  };

  const updateEmployee = (id: number, updatedEmployee: Employee) => {
    setEmployees(employees.map((e) => (e.id === id ? { ...updatedEmployee } : e)));
  };

  return (
    <AppContext.Provider
      value={{ projects, addProject, updateProject, deleteProject, employees, addEmployee, updateEmployee, loading, error }}
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