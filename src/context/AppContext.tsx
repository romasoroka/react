import { createContext, useContext, ReactNode } from 'react';
import { useProjects } from './useProjects';
import { useEmployees } from './useEmployees';
import { useCredentials } from './useCredentials';
import { useTechnologies } from './useTechnologies';
import { useWorkSessions } from './useWorkSessions';
import { useAppDataLoader } from './useAppDataLoader';
import { Project, Employee, Credential, Technology, WorkSession } from '../types';

interface AppContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (id: number, project: Project) => Promise<void>;
  deleteProject: (id: number) => void;
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, 'id'>) => Promise<void>;
  updateEmployee: (id: number, employee: Employee) => Promise<void>;
  credentials: Credential[];
  addCredential: (credential: Omit<Credential, 'id'>) => Promise<void>;
  technologies: Technology[];
  workSessions: WorkSession[];
  addWorkSession: (
    session: Omit<WorkSession, 'id'>,
    project: Project,
    employee: Employee,
    onUpdateProject: (updatedProject: Project) => Promise<void>,
    onUpdateEmployee: (updatedEmployee: Employee) => Promise<void>
  ) => Promise<void>;
  loadWorkSessions: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { projects, setProjects, addProject, updateProject } = useProjects();
  const { employees, setEmployees, addEmployee, updateEmployee } = useEmployees();
  const { credentials, setCredentials, addCredential } = useCredentials();
  const { technologies, setTechnologies } = useTechnologies();
  const { workSessions, setWorkSessions, addWorkSession, loadWorkSessions } = useWorkSessions();

  const { loading, error } = useAppDataLoader({
    setProjects,
    setEmployees,
    setCredentials,
    setTechnologies,
    setWorkSessions,
  });

  return (
    <AppContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject: (id: number) => setProjects((prev) => prev.filter((p) => p.id !== id)),
        employees,
        addEmployee,
        updateEmployee,
        credentials,
        addCredential,
        technologies,
        workSessions,
        addWorkSession,
        loadWorkSessions,
        loading,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext має використовуватися всередині AppProvider');
  return context;
};