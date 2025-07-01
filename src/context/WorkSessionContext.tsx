import { createContext, useContext, ReactNode } from "react";
import { useWorkSessions } from "../hooks/useWorkSessions";
import { WorkSession, Project, Employee } from "../types/Models";

interface WorkSessionContextType {
  workSessions: WorkSession[];
  addWorkSession: (
    session: Omit<WorkSession, "id">,
    project: Project,
    employee: Employee,
    onUpdateProject: (updatedProject: Project) => Promise<void>,
    onUpdateEmployee: (updatedEmployee: Employee) => Promise<void>
  ) => Promise<void>;
  loadWorkSessions: () => Promise<void>;
}

const WorkSessionContext = createContext<WorkSessionContextType | undefined>(
  undefined
);

export const WorkSessionProvider = ({ children }: { children: ReactNode }) => {
  const { workSessions, addWorkSession, loadWorkSessions } = useWorkSessions();
  return (
    <WorkSessionContext.Provider
      value={{ workSessions, addWorkSession, loadWorkSessions }}
    >
      {children}
    </WorkSessionContext.Provider>
  );
};

export const useWorkSessionContext = () => {
  const context = useContext(WorkSessionContext);
  if (!context)
    throw new Error(
      "useWorkSessionContext має використовуватися всередині WorkSessionProvider"
    );
  return context;
};
