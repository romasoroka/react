import axios from 'axios';
import { Employee } from '../types';

const API = 'http://localhost:5000/api/Employees';

export const fetchEmployees = async (): Promise<Employee[]> => {
  console.log('Fetching employees from:', API);
  return (await axios.get(API)).data;
};

export const getEmployee = async (id: number): Promise<Employee> => {
  console.log('Fetching employee:', `${API}/${id}`);
  return (await axios.get(`${API}/${id}`)).data;
};

export const createEmployee = async (employee: Omit<Employee, 'id'>): Promise<Employee> => {
  console.log('Creating employee:', employee);
  try {
    const response = await axios.post(API, employee);
    return response.data;
  } catch (error) {
    console.error('Error creating employee:', error);
    throw new Error('Failed to create employee');
  }
};

export const updateEmployee = async (id: number, employee: Employee): Promise<void> => {
  if (!id) throw new Error('Employee ID is missing');
  console.log('Sending PUT /api/Employees/' + id, employee);
  try {
    await axios.put(`${API}/${id}`, employee);
    console.log('Employee updated successfully');
  } catch (error) {
    console.error('Error updating employee:', error);
    throw new Error('Failed to update employee');
  }
};

export const deleteEmployee = async (id: number): Promise<void> => {
  console.log('Deleting employee:', id);
  await axios.delete(`${API}/${id}`);
};