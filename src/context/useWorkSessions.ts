import { useState } from 'react';
import { WorkSession, Project, Employee } from '../types';
import { createSession, fetchSessions } from '../services/workSessions';
import { updateProject as updateProjectService } from '../services/projects';
import { updateEmployee as updateEmployeeService } from '../services/employees';

export const useWorkSessions = () => {
  const [workSessions, setWorkSessions] = useState<WorkSession[]>([]);

  const loadWorkSessions = async () => {
    try {
      const sessions = await fetchSessions();
      setWorkSessions(sessions);
    } catch (error) {
      console.error('Error loading work sessions:', error);
      throw new Error('Failed to load work sessions');
    }
  };

  const addWorkSession = async (
    session: Omit<WorkSession, 'id'>,
    project: Project,
    employee: Employee,
    onUpdateProject: (updatedProject: Project) => Promise<void>,
    onUpdateEmployee: (updatedEmployee: Employee) => Promise<void>
  ) => {
    try {
      const newSession = await createSession(session);
      console.log('Created session:', newSession);

      // Оновлюємо локальний стан
      setWorkSessions((prev) => [...prev, newSession]);

      // Оновлюємо проєкт
      const updatedProject = {
        ...project,
        workSessions: [...(project.workSessions ?? []), newSession],
      };
      console.log('Updating project:', updatedProject);
      await onUpdateProject(updatedProject);

      // Оновлюємо працівника
      const updatedEmployee = {
        ...employee,
        workSessions: [...(employee.workSessions ?? []), newSession],
      };
      console.log('Updating employee:', updatedEmployee);
      await onUpdateEmployee(updatedEmployee);

      // Перезавантажуємо сесії з бекенду
      await loadWorkSessions();
    } catch (error) {
      console.error('Error adding work session:', error);
      throw new Error('Не вдалося додати робочу сесію');
    }
  };

  return { workSessions, setWorkSessions, addWorkSession, loadWorkSessions };
};