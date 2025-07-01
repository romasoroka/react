import { useState, useCallback } from "react";
import { WorkSession, Project, Employee } from "../types/Models";
import { createSession, fetchSessions } from "../services/workSessions";

export const useWorkSessions = () => {
  const [workSessions, setWorkSessions] = useState<WorkSession[]>([]);

  const loadWorkSessions = useCallback(async () => {
    try {
      const sessions = await fetchSessions();
      console.log("Loaded work sessions:", sessions);
      setWorkSessions(sessions);
    } catch (error) {
      console.error("Error loading work sessions:", error);
      throw new Error("Failed to load work sessions");
    }
  }, []);

  const addWorkSession = async (
    session: Omit<WorkSession, "id">,
    project: Project,
    employee: Employee
  ) => {
    try {
      console.log("Starting addWorkSession:", {
        session,
        projectId: project.id,
        employeeId: employee.id,
      });
      const newSession = await createSession(session);
      console.log("Created session:", newSession);
      setWorkSessions((prev) => {
        const newSessions = [...prev, newSession];
        console.log("Updated workSessions:", newSessions);
        return newSessions;
      });
    } catch (error) {
      console.error("Error in addWorkSession:", error);
      throw error;
    }
  };

  return { workSessions, setWorkSessions, addWorkSession, loadWorkSessions };
};
