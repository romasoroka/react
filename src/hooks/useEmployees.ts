import { useState, useEffect } from "react";
import { Employee } from "../types/Models";
import {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employees";

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadEmployees = async () => {
    setLoading(true);
    try {
      const data = await fetchEmployees();
      console.log("Loaded employees:", data);
      setEmployees(data);
    } catch (err) {
      setError(
        "Помилка завантаження працівників: " +
          (err instanceof Error ? err.message : "Невідома помилка")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const addEmployee = async (employee: Omit<Employee, "id">) => {
    try {
      const newEmployee = await createEmployee(employee);
      setEmployees((prev) => [...prev, newEmployee]);
    } catch (error) {
      console.error("Error adding employee:", error);
      throw error;
    }
  };

  const updateEmployee = async (id: number, employee: Employee) => {
    try {
      console.log("Updating employee in useEmployees:", { id, employee });
      await updateEmployee(id, employee);
      setEmployees((prev) => prev.map((e) => (e.id === id ? employee : e)));
    } catch (error) {
      console.error("Error updating employee in useEmployees:", error);
      throw error;
    }
  };

  const deleteEmployee = async (id: number) => {
    try {
      await deleteEmployee(id);
      setEmployees((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
      throw error;
    }
  };

  return {
    employees,
    setEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    loadEmployees,
    loading,
    error,
  };
};
