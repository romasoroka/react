import axios from 'axios';
import { WorkSession } from '../types';

const API = 'http://localhost:5000/api/WorkSessions';

export const fetchSessions = async (): Promise<WorkSession[]> => {
  console.log('Fetching work sessions from:', API);
  try {
    const response = await axios.get(API);
    return response.data;
  } catch (error) {
    console.error('Error fetching work sessions:', error);
    throw new Error('Failed to fetch work sessions');
  }
};

export const getSession = async (id: number): Promise<WorkSession> => {
  console.log('Fetching session:', `${API}/${id}`);
  return (await axios.get(`${API}/${id}`)).data;
};

export const createSession = async (session: Omit<WorkSession, 'id'>): Promise<WorkSession> => {
  console.log('Creating session with:', session);
  try {
    const response = await axios.post(API, session);
    console.log('Created session:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating session:', error);
    throw new Error('Failed to create session');
  }
};

export const updateSession = async (id: number, session: Omit<WorkSession, 'id'>): Promise<void> => {
  console.log('Updating session:', id, session);
  await axios.put(`${API}/${id}`, session);
};

export const deleteSession = async (id: number): Promise<void> => {
  console.log('Deleting session:', id);
  await axios.delete(`${API}/${id}`);
};