import axios from 'axios';
import { Credential } from '../types';

const API = 'http://localhost:5000/api/Credentials';

export const fetchCredentials = async (): Promise<Credential[]> => (await axios.get(API)).data;

export const getCredential = async (id: number): Promise<Credential> => (await axios.get(`${API}/${id}`)).data;

export const createCredential = async (credential: Omit<Credential, 'id'>): Promise<Credential> => {
  try {
    const response = await axios.post(API, {
      name: credential.name,
      value: credential.value,
      description: credential.description || null,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Server error response:', error.response.data);
      throw new Error(error.response.data.message || 'Invalid request');
    }
    throw new Error('Failed to create credential: Unknown error');
  }
};

export const deleteCredential = async (id: number): Promise<void> => {
  await axios.delete(`${API}/${id}`);
};