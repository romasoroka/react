import { useCredentials } from "../hooks/useCredentials";
import { useTechnologies } from "../hooks/useTechnologies";
import { useProjects } from "../hooks/useProjects";
import { useEmployees } from "../hooks/useEmployees";
import { useWorkSessions } from "../hooks/useWorkSessions";
import { useAppDataLoader } from "../hooks/useAppDataLoader";
import { EmployeeProvider } from "./EmployeeContext";
import { ProjectProvider } from "./ProjectContext";
import { WorkSessionProvider } from "./WorkSessionContext";
import { ReactNode } from "react";
import { AppContext } from "./AppContext";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { credentials, setCredentials, addCredential } = useCredentials();
  const { technologies, setTechnologies } = useTechnologies();
  const { setProjects } = useProjects();
  const { setEmployees } = useEmployees();
  const { setWorkSessions } = useWorkSessions();
  const { loading, error } = useAppDataLoader({
    setCredentials,
    setTechnologies,
    setProjects,
    setEmployees,
    setWorkSessions,
  });

  return (
    <AppContext.Provider
      value={{ credentials, addCredential, technologies, loading, error }}
    >
      <ProjectProvider>
        <EmployeeProvider>
          <WorkSessionProvider>{children}</WorkSessionProvider>
        </EmployeeProvider>
      </ProjectProvider>
    </AppContext.Provider>
  );
};
