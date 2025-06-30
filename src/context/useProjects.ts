import { useState } from 'react';
import { Project } from '../types';
import { createProject, updateProject as updateProjectService } from '../services/projects';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const addProject = async (project: Omit<Project, 'id'>) => {
    try {
      const newProject = await createProject(project);
      setProjects((prev) => [...prev, newProject]);
    } catch (error) {
      console.error('Error adding project:', error);
      if (error instanceof Error) {
        throw new Error(`Не вдалося додати проєкт: ${error.message}`);
      }
      throw new Error('Не вдалося додати проєкт: невідома помилка');
    }
  };

   const updateProject = async (id: number, updated: Project) => {
    try {
      console.log('Updating project in state:', updated);
      setProjects((prev) => prev.map((p) => (p.id === id ? { ...updated } : p)));
      await updateProjectService(id, updated);
    } catch (error) {
      console.error('Error updating project:', error);
      throw new Error('Failed to update project');
    }
  };
  const deleteProject = (id: number) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return { projects, setProjects, addProject, updateProject, deleteProject };
};