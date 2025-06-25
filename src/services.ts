import axios from 'axios';
import { Employee, Project } from './types';

const API_URL = 'http://localhost:5000/api'; 

export const fetchEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await axios.get(`${API_URL}/Employees`);
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const createEmployee = async (employee: Omit<Employee, 'id'>): Promise<Employee> => {
    try {
      const response = await axios.post(`${API_URL}/Employees`, employee);
      console.log('Created employee:', response.data); 
      return response.data;
    } catch (error) {
      console.error('Error creating employee:', error);
      throw error;
    }
  };

  
  export const fetchProjects= async (): Promise<Project[]> => {
    try {
      const response = await axios.get(`${API_URL}/Projects`);
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  };

  export const createProject = async (project: Omit<Project, 'id'>): Promise<Project> => {
    try {
      const response = await axios.post(`${API_URL}/Projects`, project);
      console.log('Created project:', response.data); 
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  };