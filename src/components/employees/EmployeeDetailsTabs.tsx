import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Employee, Project } from '../../types';
import { useAppContext } from '../../context/AppContext';

interface EmployeeDetailsTabsProps {
  employee: Employee;
  projects: Project[];
}

const EmployeeDetailsTabs = ({ employee, projects }: EmployeeDetailsTabsProps) => {
  const [activeTab, setActiveTab] = useState('general');

  const assignedProjects = projects.filter((project) =>
    project.programmers.includes(employee.name)
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'general'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
          onClick={() => setActiveTab('general')}
        >
          Загальна інформація
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'stats'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
          onClick={() => setActiveTab('stats')}
        >
          Статистика роботи
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'projects'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
          onClick={() => setActiveTab('projects')}
        >
          Проєкти
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'general' && (
        <div className="flex flex-col gap-4 animate-slideIn">
          <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Ім’я:</span>
            <span className="text-sm text-gray-600 ml-2">{employee.name}</span>
          </div>
          <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Посада:</span>
            <span className="text-sm text-gray-600 ml-2">{employee.position}</span>
          </div>
          <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Навички:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {employee.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Досвід:</span>
            <span className="text-sm text-gray-600 ml-2">{employee.experience}</span>
          </div>
          <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Email:</span>
            <span className="text-sm text-gray-600 ml-2">{employee.email}</span>
          </div>
          <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Телефон:</span>
            <span className="text-sm text-gray-600 ml-2">{employee.phone}</span>
          </div>
          <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Біо:</span>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{employee.bio}</p>
          </div>
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="flex flex-col gap-4 animate-slideIn">
          {employee.stats ? (
            <>
              <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
                <span className="text-sm font-semibold text-gray-800">Загальні години:</span>
                <span className="text-sm text-gray-600 ml-2">{employee.stats.hoursWorked}</span>
              </div>
              <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
                <span className="text-sm font-semibold text-gray-800">Звіти подано:</span>
                <span className="text-sm text-gray-600 ml-2">{employee.stats.reportsSubmitted}</span>
              </div>
              <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
                <span className="text-sm font-semibold text-gray-800">Проєктів залучено:</span>
                <span className="text-sm text-gray-600 ml-2">{employee.stats.projectsInvolved}</span>
              </div>
            </>
          ) : (
            <div className="p-4 rounded-lg bg-white/50 text-sm text-gray-600">
              Статистика відсутня
            </div>
          )}
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="flex flex-col gap-4 animate-slideIn">
          {assignedProjects.length > 0 ? (
            assignedProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors flex justify-between items-center"
              >
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">{project.name}</h3>
                  <p className="text-xs text-gray-600">{project.description}</p>
                </div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Active'
                      ? 'bg-green-100 text-green-600'
                      : project.status === 'In Progress'
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-indigo-100 text-indigo-600'
                  }`}
                >
                  {project.status}
                </span>
              </Link>
            ))
          ) : (
            <div className="p-4 rounded-lg bg-white/50 text-sm text-gray-600">
              Немає призначених проєктів
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeDetailsTabs;