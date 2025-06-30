import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Employee, Project, WorkSession } from '../../../types';
import Modal from '../../../components/ui/Modal';
import FormField from '../../../components/ui/FormField';
import { useAppContext } from '../../../context/AppContext';

interface ProjectSessionsTabProps {
  project: Project;
  employees: Employee[];
  workSessions: WorkSession[];
  onAddClick: () => void;
  onViewSession: (session: WorkSession) => void;
  formatDate: (date: string) => string;
  onUpdateProject: (updatedProject: Project) => Promise<void>;
  onUpdateEmployee: (updatedEmployee: Employee) => Promise<void>;
}

const ProjectSessionsTab = ({
  employees,
  project,
  workSessions,
  onViewSession,
  formatDate,
  onUpdateProject,
  onUpdateEmployee,
}: ProjectSessionsTabProps) => {
  const { addWorkSession, loadWorkSessions } = useAppContext();
  const [isAddSessionModalOpen, setIsAddSessionModalOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
  const [newSession, setNewSession] = useState({
    date: '',
    employeeId: '',
    startTime: '',
    endTime: '',
    taskDescription: '',
  });
  const [error, setError] = useState<string | null>(null);

  // Завантажуємо сесії при монтуванні компонента
  useEffect(() => {
    loadWorkSessions();
  }, [loadWorkSessions]);

  const handleSessionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewSession({ ...newSession, [name]: value });
  };

  const validateSession = () => {
    if (!newSession.date) return 'Дата є обов’язковою';
    if (!newSession.employeeId) return 'Працівник є обов’язковим';
    if (!newSession.startTime) return 'Початковий час є обов’язковим';
    if (!newSession.endTime) return 'Кінцевий час є обов’язковим';
    return null;
  };

  const handleAddSession = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validateSession();
    if (validationError) {
      setError(validationError);
      return;
    }

    const employee = employees.find((e) => e.id === Number(newSession.employeeId));
    if (!employee) {
      setError('Працівник не знайдений');
      return;
    }

    const session: Omit<WorkSession, 'id'> = {
      date: newSession.date,
      projectId: project.id,
      employeeId: Number(newSession.employeeId),
      startTime: newSession.startTime,
      endTime: newSession.endTime,
      taskDescription: newSession.taskDescription,
    };

    try {
      console.log('Adding work session:', { session, project, employee });
      await addWorkSession(session, project, employee, onUpdateProject, onUpdateEmployee);
      setIsAddSessionModalOpen(false);
      setNewSession({ date: '', employeeId: '', startTime: '', endTime: '', taskDescription: '' });
    } catch (error) {
      setError('Помилка при додаванні сесії: ' + (error instanceof Error ? error.message : 'Невідома помилка'));
    }
  };

  // Сортування та фільтрація сесій
  const filteredAndSortedSessions = useMemo(() => {
    console.log('WorkSessions in ProjectSessionsTab:', workSessions);
    console.log('Project ID:', project.id);
    let sessions = workSessions.filter((session) => session.projectId === project.id);
    if (selectedEmployeeId) {
      sessions = sessions.filter((session) => session.employeeId === Number(selectedEmployeeId));
    }
    return sessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [workSessions, project.id, selectedEmployeeId]);

  return (
    <div className="flex flex-col m-2 gap-4 animate-slideIn bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Останні робочі сесії</h3>
        <div className="flex items-center gap-4">
          <select
            value={selectedEmployeeId}
            onChange={(e) => setSelectedEmployeeId(e.target.value)}
            className="p-1 border border-gray-200 dark:border-gray-600 rounded-md text-sm text-gray-600 dark:text-gray-200 bg-white dark:bg-gray-800 focus:border-blue-600 dark:focus:border-blue-400 outline-none"
          >
            <option value="">Усі працівники</option>
            {project.employeeIds.map((employeeId) => {
              const employee = employees.find((e) => e.id === employeeId);
              return (
                <option key={employeeId} value={employeeId}>
                  {employee?.fullName || 'Невідомий'}
                </option>
              );
            })}
          </select>
          <button
            onClick={() => setIsAddSessionModalOpen(true)}
            className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
          >
            Додати сесію
          </button>
        </div>
      </div>
      {filteredAndSortedSessions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
                <th className="p-2 text-left">Дата</th>
                <th className="p-2 text-left">Працівник</th>
                <th className="p-2 text-left">Час</th>
                <th className="p-2 text-left">Опис</th>
                <th className="p-2 text-left">Дія</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedSessions.map((session, index) => (
                <tr
                  key={`${session.employeeId}-${session.id}-${index}`}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="p-2">{formatDate(session.date)}</td>
                  <td className="p-2">
                    {employees.find((e) => e.id === session.employeeId)?.id ? (
                      <Link
                        to={`/employees/${employees.find((e) => e.id === session.employeeId)?.id}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline dark:hover:text-blue-300"
                      >
                        {employees.find((e) => e.id === session.employeeId)?.fullName || 'Невідомий'}
                      </Link>
                    ) : (
                      employees.find((e) => e.id === session.employeeId)?.fullName || 'Невідомий'
                    )}
                  </td>
                  <td className="p-2">{`${session.startTime} - ${session.endTime}`}</td>
                  <td className="p-2 truncate max-w-xs">{session.taskDescription}</td>
                  <td className="p-2">
                    <button
                      onClick={() => onViewSession(session)}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline dark:hover:text-blue-300"
                    >
                      Переглянути
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 text-sm text-gray-600 dark:text-gray-300">
          Немає робочих сесій
        </div>
      )}
      <Modal
        isOpen={isAddSessionModalOpen}
        onClose={() => setIsAddSessionModalOpen(false)}
        title="Додати робочу сесію"
      >
        <form
          onSubmit={handleAddSession}
          className="flex flex-col bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
        >
          {error && (
            <div className="mb-4 p-2 bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-200 rounded-lg text-sm">
              {error}
            </div>
          )}
          <FormField
            label="Дата:"
            name="date"
            value={newSession.date}
            onChange={handleSessionChange}
            type="date"
            required
          />
          <div className="flex flex-col gap-2 p-3 rounded-lg bg-white/50 dark:bg-gray-700/50 hover:bg-gray-100/80 dark:hover:bg-gray-600/80 transition-colors">
            <label className="text-sm font-semibold text-gray-800 dark:text-gray-100">Працівник:</label>
            <select
              name="employeeId"
              value={newSession.employeeId}
              onChange={handleSessionChange}
              className="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-md text-sm text-gray-600 dark:text-gray-200 bg-white dark:bg-gray-800 focus:border-blue-600 dark:focus:border-blue-400 outline-none"
              required
            >
              <option value="">Виберіть працівника</option>
              {project.employeeIds.map((employeeId) => {
                const employee = employees.find((e) => e.id === employeeId);
                return (
                  <option key={employeeId} value={employeeId}>
                    {employee?.fullName || 'Невідомий'}
                  </option>
                );
              })}
            </select>
          </div>
          <FormField
            label="Початковий час:"
            name="startTime"
            value={newSession.startTime}
            onChange={handleSessionChange}
            type="time"
            required
          />
          <FormField
            label="Кінцевий час:"
            name="endTime"
            value={newSession.endTime}
            onChange={handleSessionChange}
            type="time"
            required
          />
          <FormField
            label="Опис:"
            name="taskDescription"
            value={newSession.taskDescription}
            onChange={handleSessionChange}
            textarea
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
          >
            Додати
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ProjectSessionsTab;