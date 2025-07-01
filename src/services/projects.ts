import axios from "axios";
import { Project } from "../types/Models";

const API = "http://localhost:5000/api/Projects";

export const fetchProjects = async (): Promise<Project[]> => {
  console.log("Fetching projects from:", API);
  try {
    const response = await axios.get(API);
    console.log("API Projects:", response.data);
    return response.data.map((project: Project) => ({
      ...project,
      employeeIds: project.employeeIds || [],
    }));
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
  }
};

export const getProject = async (id: number): Promise<Project> => {
  console.log("Fetching project:", `${API}/${id}`);
  try {
    const response = await axios.get(`${API}/${id}`);
    console.log("API Project:", response.data);
    return { ...response.data, employeeIds: response.data.employeeIds || [] };
  } catch (error) {
    console.error("Error fetching project:", error);
    throw new Error("Failed to fetch project");
  }
};

export const createProject = async (
  project: Omit<Project, "id">
): Promise<Project> => {
  try {
    const response = await axios.post(API, project);
    console.log("Created project:", response.data);
    return { ...response.data, employeeIds: response.data.employeeIds || [] };
  } catch (error) {
    console.error("Error creating project:", error);
    throw new Error("Failed to create project");
  }
};

export const updateProjectService = async (
  id: number,
  project: Omit<Project, "id">
): Promise<Project> => {
  try {
    const projectData = {
      ...project,
      employeeIds: project.employeeIds || [],
      workSessions: undefined,
    };
    console.log("Updating project:", projectData);
    const response = await axios.put(`${API}/${id}`, projectData);
    console.log("Updated project:", response.data);
    return {
      ...response.data,
      id,
      employeeIds: response.data.employeeIds || [],
    };
  } catch (error) {
    console.error("Error updating project:", error);
    throw new Error("Failed to update project");
  }
};

export const deleteProject = async (id: number): Promise<void> => {
  console.log("Deleting project:", id);
  try {
    await axios.delete(`${API}/${id}`);
  } catch (error) {
    console.error("Error deleting project:", error);
    throw new Error("Failed to delete project");
  }
};
