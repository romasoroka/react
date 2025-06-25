import React from 'react';
import { Link } from 'react-router-dom';
import { Employee, Project, WorkSession } from '../../../types';

interface ProjectSessionsTabProps {
  employees: Employee[];
  project: Project;
  workSessions: (WorkSession & { employee: string })[];
  onAddClick: () => void;
  onViewSession: (session: WorkSession & { employee: string }) => void;
  formatDate: (date: string) => string;
}

const ProjectSessionsTab = ({
  employees,
  project,
  workSessions,
  onAddClick,
  onViewSession,
  formatDate,
}: ProjectSessionsTabProps) => {
  return (
    <div className="flex flex-col m-2 gap-4 animate-slideIn bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Останні робочі сесії</h3>
        <button
          onClick={onAddClick}
          className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
        >
          Додати сесію
        </button>
      </div>
      {workSessions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
                <th className="p-2 text-left">Дата</th>
                <th className="p-2 text-left">Працівник</th>
                <th className="p-2 text-left">Години</th>
                <th className="p-2 text-left">Опис</th>
                <th className="p-2 text-left">Дія</th>
              </tr>
            </thead>
            <tbody>
              {workSessions.map((session, index) => (
                <tr
                  key={`${session.employee}-${session.id}-${index}`}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="p-2">{formatDate(session.date)}</td>
                  <td className="p-2">
                    {employees.find((e) => e.name === session.employee)?.id ? (
                      <Link
                        to={`/employees/${employees.find((e) => e.name === session.employee)?.id}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline dark:hover:text-blue-300"
                      >
                        {session.employee}
                      </Link>
                    ) : (
                      session.employee
                    )}
                  </td>
                  <td className="p-2">{session.hours}h</td>
                  <td className="p-2 truncate max-w-xs">{session.description}</td>
                  <td className="p-2">
                    <button
                      onClick={() => onViewSession(session)}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline dark:hover:text-blue-300"
                    >
                      View Full
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
    </div>
  );
};

export default ProjectSessionsTab;