import { useEffect, useState } from "react";
import {
  Credential,
  Technology,
  Project,
  Employee,
  WorkSession,
} from "../types/Models";
import { fetchCredentials } from "../services/credentials";
import { fetchTechnologies } from "../services/technologies";
import { fetchProjects } from "../services/projects";
import { fetchEmployees } from "../services/employees";
import { fetchSessions } from "../services/workSessions";

interface AppDataLoaderProps {
  setCredentials: (credentials: Credential[]) => void;
  setTechnologies: (technologies: Technology[]) => void;
  setProjects: (projects: Project[]) => void;
  setEmployees: (employees: Employee[]) => void;
  setWorkSessions: (workSessions: WorkSession[]) => void;
}

export const useAppDataLoader = ({
  setCredentials,
  setTechnologies,
  setProjects,
  setEmployees,
  setWorkSessions,
}: AppDataLoaderProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        console.log("Starting data load...");
        const [credentials, technologies, projects, employees, workSessions] =
          await Promise.all([
            fetchCredentials(),
            fetchTechnologies(),
            fetchProjects(),
            fetchEmployees(),
            fetchSessions(),
          ]);

        console.log("Fetched data:", {
          credentials,
          technologies,
          projects,
          employees,
          workSessions,
        });

        const updatedProjects = projects.map((project) => ({
          ...project,
          workSessions: workSessions.filter(
            (ws) => ws.projectId === project.id
          ),
        }));
        const updatedEmployees = employees.map((employee) => ({
          ...employee,
          workSessions: workSessions.filter(
            (ws) => ws.employeeId === employee.id
          ),
        }));

        setCredentials(credentials);
        setTechnologies(technologies);
        setProjects(updatedProjects);
        setEmployees(updatedEmployees);
        setWorkSessions(workSessions);
        console.log("Data set:", {
          updatedProjects,
          updatedEmployees,
          workSessions,
        });
      } catch (err) {
        setError(
          "Помилка завантаження даних: " +
            (err instanceof Error ? err.message : "Невідома помилка")
        );
        console.error("Load error:", err);
      } finally {
        setLoading(false);
        console.log("Data load completed, loading:", false);
      }
    };
    loadData();
  }, [
    setCredentials,
    setTechnologies,
    setProjects,
    setEmployees,
    setWorkSessions,
  ]);

  return { loading, error };
};
