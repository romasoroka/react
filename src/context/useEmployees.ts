import { useState } from 'react';
import { Employee } from '../types';
import { createEmployee, updateEmployee as updateEmployeeService } from '../services/employees';

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const addEmployee = async (employee: Omit<Employee, 'id'>) => {
    try {
      const newEmployee = await createEmployee(employee);
      setEmployees((prev) => [...prev, newEmployee]);
    } catch (error) {
      console.error('Error adding employee:', error);
      throw new Error(`Не вдалося додати працівника: ${error instanceof Error ? error.message : 'невідома помилка'}`);
    }
  };

  const updateEmployee = async (id: number, updated: Employee) => {
    try {
      setEmployees((prev) => prev.map((e) => (e.id === id ? { ...updated } : e)));
      await updateEmployeeService(id, updated);
    } catch (error) {
      console.error('Error updating employee:', error);
      throw new Error(`Не вдалося оновити працівника: ${error instanceof Error ? error.message : 'невідома помилка'}`);
    }
  };

  return { employees, setEmployees, addEmployee, updateEmployee };
};