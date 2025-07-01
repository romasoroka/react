import axios from "axios";
import { WorkSession } from "../types/Models";

const API = "http://localhost:5000/api/WorkSessions";

export const fetchSessions = async (): Promise<WorkSession[]> => {
  console.log("Fetching work sessions from:", API);
  try {
    const response = await axios.get(API);
    console.log("API WorkSessions:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching work sessions:", error);
    if (axios.isAxiosError(error) && error.response) {
      console.error("Server error response:", error.response.data);
      throw new Error(
        error.response.data.message || "Failed to fetch work sessions"
      );
    }
    throw new Error("Failed to fetch work sessions");
  }
};

export const createSession = async (
  session: Omit<WorkSession, "id">
): Promise<WorkSession> => {
  console.log("Creating work session:", session);
  try {
    const response = await axios.post(API, session);
    console.log("Created work session:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating work session:", error);
    if (axios.isAxiosError(error) && error.response) {
      console.error("Server error response:", error.response.data);
      throw new Error(
        error.response.data.message || "Failed to create work session"
      );
    }
    throw new Error("Failed to create work session");
  }
};
