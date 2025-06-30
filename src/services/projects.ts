import axios from 'axios';
import { Project } from '../types';

const API = 'http://localhost:5000/api/Projects';

export const fetchProjects = async (): Promise<Project[]> => (await axios.get(API)).data;

export const getProject = async (id: number): Promise<Project> => {
  console.log('Fetching project:', `${API}/${id}`);
  return (await axios.get(`${API}/${id}`)).data;
};
export const createProject = async (project: Omit<Project, 'id'>): Promise<Project> => {
  try {
    const response = await axios.post(API, project);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Server error response:', error.response.data);
      const message = error.response.data.message || error.response.data.error || 'Invalid request';
      throw new Error(message);
    }
    throw new Error('Failed to create project: Unknown error');
  }
};

export const updateProject = async (id: number, project: Omit<Project, 'id'>): Promise<void> => {
  try {
    await axios.put(`${API}/${id}`, project);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Server error response:', error.response.data);
      const message = error.response.data.message || error.response.data.error || 'Invalid request';
      throw new Error(message);
    }
    throw new Error('Failed to update project: Unknown error');
  }
};

export const deleteProject = async (id: number): Promise<void> => {
  await axios.delete(`${API}/${id}`);
};