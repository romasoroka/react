import axios from "axios";
import { Employee } from "../types/Models";

const API = "http://localhost:5000/api/Employees";

export const fetchEmployees = async (): Promise<Employee[]> => {
  console.log("Fetching employees from:", API);
  try {
    const response = await axios.get(API);
    console.log("API Employees:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw new Error("Failed to fetch employees");
  }
};

export const getEmployee = async (id: number): Promise<Employee> => {
  console.log("Fetching employee:", `${API}/${id}`);
  try {
    const response = await axios.get(`${API}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching employee:", error);
    throw new Error("Failed to fetch employee");
  }
};

export const createEmployee = async (
  employee: Omit<Employee, "id">
): Promise<Employee> => {
  console.log("Creating employee:", employee);
  try {
    const response = await axios.post(API, employee);
    return response.data;
  } catch (error) {
    console.error("Error creating employee:", error);
    throw new Error("Failed to create employee");
  }
};

export const updateEmployee = async (
  id: number,
  employee: Employee
): Promise<void> => {
  if (!id) throw new Error("Employee ID is missing");
  const employeeData = {
    ...employee,
    workSessions: undefined, // Видаляємо workSessions, якщо бекенд їх не обробляє
  };
  console.log("Sending PUT /api/Employees/" + id, employeeData);
  try {
    await axios.put(`${API}/${id}`, employeeData);
    console.log("Employee updated successfully");
  } catch (error) {
    console.error("Error updating employee:", error);
    throw new Error("Failed to update employee");
  }
};

export const deleteEmployee = async (id: number): Promise<void> => {
  console.log("Deleting employee:", id);
  try {
    await axios.delete(`${API}/${id}`);
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw new Error("Failed to delete employee");
  }
};
