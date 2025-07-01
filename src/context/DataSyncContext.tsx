import { Project, Employee, WorkSession } from "../types/Models";
import { useEmployeeContext } from "../context/EmployeeContext";
import { useProjectContext } from "../context/ProjectContext";

export const useDataSync = () => {
  const { employees, setEmployees } = useEmployeeContext();
  const { projects, setProjects } = useProjectContext();

  const syncWorkSessions = (
    newSession: WorkSession,
    project: Project,
    employee: Employee
  ) => {
    const updatedProject = {
      ...project,
      workSessions: [...(project.workSessions ?? []), newSession],
    };
    const updatedEmployee = {
      ...employee,
      workSessions: [...(employee.workSessions ?? []), newSession],
    };
    setProjects(
      projects.map((p) => (p.id === project.id ? updatedProject : p))
    );
    setEmployees(
      employees.map((e) => (e.id === employee.id ? updatedEmployee : e))
    );
  };

  return { syncWorkSessions };
};
