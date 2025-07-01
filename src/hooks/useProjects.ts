import { useState, useEffect } from "react";
import { Project } from "../types/Models";
import {
  fetchProjects,
  createProject,
  updateProjectService,
  deleteProject,
} from "../services/projects";

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await fetchProjects();
      console.log("Loaded projects:", data);
      setProjects(data);
    } catch (err) {
      setError(
        "Помилка завантаження проєктів: " +
          (err instanceof Error ? err.message : "Невідома помилка")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const addProject = async (project: Omit<Project, "id">) => {
    try {
      const newProject = await createProject(project);
      setProjects((prev) => [...prev, newProject]);
    } catch (error) {
      console.error("Error adding project:", error);
      throw error;
    }
  };

  const updateProject = async (id: number, project: Project) => {
    try {
      console.log("Updating project in useProjects:", { id, project });
      const updatedProject = await updateProjectService(id, project);
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? updatedProject : p))
      );
    } catch (error) {
      console.error("Error updating project in useProjects:", error);
      throw error;
    }
  };

  const deleteProject = async (id: number) => {
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  };

  return {
    projects,
    setProjects,
    addProject,
    updateProject,
    deleteProject,
    loadProjects,
    loading,
    error,
  };
};
