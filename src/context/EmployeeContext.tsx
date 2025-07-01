import { createContext, useContext, ReactNode } from "react";
import { useEmployees } from "../hooks/useEmployees";
import { Employee } from "../types/Models";

interface EmployeeContextType {
  employees: Employee[];
  setEmployees: (employees: Employee[]) => void;
  addEmployee: (employee: Omit<Employee, "id">) => Promise<void>;
  updateEmployee: (id: number, employee: Employee) => Promise<void>;
  loadEmployees: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined
);

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const {
    employees,
    setEmployees,
    addEmployee,
    updateEmployee,
    loadEmployees,
    loading,
    error,
  } = useEmployees();
  return (
    <EmployeeContext.Provider
      value={{
        employees,
        setEmployees,
        addEmployee,
        updateEmployee,
        loadEmployees,
        loading,
        error,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context)
    throw new Error(
      "useEmployeeContext має використовуватися всередині EmployeeProvider"
    );
  return context;
};
