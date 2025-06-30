import { useEffect, useState } from 'react';
import { Project, Employee, Credential, Technology, WorkSession } from '../types';
import { fetchProjects } from '../services/projects';
import { fetchEmployees } from '../services/employees';
import { fetchCredentials } from '../services/credentials';
import { fetchTechnologies } from '../services/technologies';
import { fetchSessions } from '../services/workSessions';

interface AppDataLoaderProps {
  setProjects: (projects: Project[]) => void;
  setEmployees: (employees: Employee[]) => void;
  setCredentials: (credentials: Credential[]) => void;
  setTechnologies: (technologies: Technology[]) => void;
  setWorkSessions: (workSessions: WorkSession[]) => void;
}

export const useAppDataLoader = ({
  setProjects,
  setEmployees,
  setCredentials,
  setTechnologies,
  setWorkSessions,
}: AppDataLoaderProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [projects, employees, credentials, technologies, workSessions] = await Promise.all([
          fetchProjects(),
          fetchEmployees(),
          fetchCredentials(),
          fetchTechnologies(),
          fetchSessions(),
        ]);
        // Прив’язуємо workSessions до проєктів
        const updatedProjects = projects.map((project) => ({
          ...project,
          workSessions: workSessions.filter((ws) => ws.projectId === project.id),
        }));
        setProjects(updatedProjects);
        setEmployees(employees);
        setCredentials(credentials);
        setTechnologies(technologies);
        setWorkSessions(workSessions);
      } catch (err) {
        setError('Помилка завантаження даних: ' + (err instanceof Error ? err.message : 'Невідома помилка'));
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [setProjects, setEmployees, setCredentials, setTechnologies, setWorkSessions]);

  return { loading, error };
};