import { createContext, useContext, ReactNode } from "react";
import { useProjects } from "../hooks/useProjects";
import { Project } from "../types/Models";

interface ProjectContextType {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  addProject: (project: Omit<Project, "id">) => Promise<void>;
  updateProject: (id: number, project: Project) => Promise<void>;
  deleteProject: (id: number) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const { projects, setProjects, addProject, updateProject, deleteProject } =
    useProjects();
  return (
    <ProjectContext.Provider
      value={{
        projects,
        setProjects,
        addProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context)
    throw new Error(
      "useProjectContext має використовуватися всередині ProjectProvider"
    );
  return context;
};
