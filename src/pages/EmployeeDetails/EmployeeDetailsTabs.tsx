import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Employee, Project, WorkSession } from '../../types';
import { useAppContext } from '../../context/AppContext';
import Modal from '../../components/ui/Modal';
import FormField from '../../components/ui/FormField';

interface EmployeeDetailsTabsProps {
  employee: Employee;
  projects: Project[];
}

const EmployeeDetailsTabs = ({ employee, projects }: EmployeeDetailsTabsProps) => {
  const [activeTab, setActiveTab] = useState('general');
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [isAddSessionModalOpen, setIsAddSessionModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<WorkSession | null>(null);
  const [newSession, setNewSession] = useState({
    date: '',
    project: '',
    hours: '',
    description: '',
  });
  const { updateEmployee } = useAppContext();

  const assignedProjects = projects.filter((project) =>
    project.programmers.includes(employee.name)
  );

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handleViewSession = (session: WorkSession) => {
    setSelectedSession(session);
    setIsSessionModalOpen(true);
  };

  const handleSessionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewSession({ ...newSession, [name]: value });
  };

  const handleAddSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSession.date || !newSession.project || !newSession.hours) {
      alert('Дата, проєкт і години є обов’язковими');
      return;
    }
    const session: WorkSession = {
      id: (employee.recentWorkSessions?.length || 0) + 1,
      date: newSession.date,
      project: newSession.project,
      hours: Number(newSession.hours),
      description: newSession.description,
    };
    const updatedEmployee: Employee = {
      ...employee,
      recentWorkSessions: [...(employee.recentWorkSessions || []), session],
      stats: {
        ...employee.stats,
        hoursWorked: (employee.stats.hoursWorked || 0) + session.hours,
      },
    };
    updateEmployee(employee.id, updatedEmployee);
    setIsAddSessionModalOpen(false);
    setNewSession({ date: '', project: '', hours: '', description: '' });
  };

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
        <div className="flex flex-col animate-slideIn">
          <div className="p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Посада:</span>
            <span className="text-sm text-gray-600 ml-2">{employee.position}</span>
          </div>
          <div className="p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
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
          <div className="p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Досвід:</span>
            <span className="text-sm text-gray-600 ml-2">{employee.experience}</span>
          </div>
          <div className="p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Email:</span>
            <span className="text-sm text-gray-600 ml-2">{employee.email}</span>
          </div>
          <div className="p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Телефон:</span>
            <span className="text-sm text-gray-600 ml-2">{employee.phone}</span>
          </div>
          <div className="p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Біо:</span>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{employee.bio}</p>
          </div>
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="flex flex-col gap-6 animate-slideIn">
          {employee.stats ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-2 rounded-lg bg-blue-50 text-center">
                  <span className="text-2xl font-bold text-blue-600">{employee.stats.hoursWorked}</span>
                  <p className="text-sm text-gray-600">Загальні години</p>
                </div>
                <div className="p-2 rounded-lg bg-blue-50 text-center">
                  <span className="text-2xl font-bold text-blue-600">{employee.stats.reportsSubmitted}</span>
                  <p className="text-sm text-gray-600">Звіти подано</p>
                </div>
                <div className="p-2 rounded-lg bg-blue-50 text-center">
                  <span className="text-2xl font-bold text-blue-600">{employee.stats.projectsInvolved}</span>
                  <p className="text-sm text-gray-600">Проєктів залучено</p>
                </div>
              </div>

              {/* Recent Work Sessions Table */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-gray-800">Останні робочі сесії</h3>
                  <button
                    onClick={() => setIsAddSessionModalOpen(true)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-blue-700 transition-colors"
                  >
                    Додати сесію
                  </button>
                </div>
                {employee.recentWorkSessions && employee.recentWorkSessions.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-gray-600 border border-gray-200 rounded-lg">
                      <thead>
                        <tr className="bg-gray-100 text-gray-800">
                          <th className="p-2 text-left">Дата</th>
                          <th className="p-2 text-left">Проєкт</th>
                          <th className="p-2 text-left">Години</th>
                          <th className="p-2 text-left">Опис</th>
                          <th className="p-2 text-left">Дія</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employee.recentWorkSessions.map((session) => (
                          <tr
                            key={session.id}
                            className="border-t border-gray-200 hover:bg-gray-50"
                          >
                            <td className="p-2">{formatDate(session.date)}</td>
                            <td className="p-2">{session.project}</td>
                            <td className="p-2">{session.hours}h</td>
                            <td className="p-2 truncate max-w-xs">{session.description}</td>
                            <td className="p-2">
                              <button
                                onClick={() => handleViewSession(session)}
                                className="text-xs text-blue-600 hover:underline"
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
                  <div className="p-2 rounded-lg bg-white/50 text-sm text-gray-600">
                    Немає робочих сесій
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="p-2 rounded-lg bg-white/50 text-sm text-gray-600">
              Статистика відсутня
            </div>
          )}
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="flex flex-col animate-slideIn">
          {assignedProjects.length > 0 ? (
            assignedProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors flex justify-between items-center"
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
            <div className="p-2 rounded-lg bg-white/50 text-sm text-gray-600">
              Немає призначених проєктів
            </div>
          )}
        </div>
      )}

      {/* Session Details Modal */}
      {selectedSession && (
        <Modal
          isOpen={isSessionModalOpen}
          onClose={() => setIsSessionModalOpen(false)}
          title="Деталі робочої сесії"
        >
          <div className="flex flex-col gap-4">
            <div className="p-2 rounded-lg bg-white/50">
              <span className="text-sm font-semibold text-gray-800">Дата:</span>
              <span className="text-sm text-gray-600 ml-2">{formatDate(selectedSession.date)}</span>
            </div>
            <div className="p-2 rounded-lg bg-white/50">
              <span className="text-sm font-semibold text-gray-800">Проєкт:</span>
              <span className="text-sm text-gray-600 ml-2">{selectedSession.project}</span>
            </div>
            <div className="p-2 rounded-lg bg-white/50">
              <span className="text-sm font-semibold text-gray-800">Години:</span>
              <span className="text-sm text-gray-600 ml-2">{selectedSession.hours}h</span>
            </div>
            <div className="p-2 rounded-lg bg-white/50">
              <span className="text-sm font-semibold text-gray-800">Опис:</span>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{selectedSession.description}</p>
            </div>
            <button
              onClick={() => setIsSessionModalOpen(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Закрити
            </button>
          </div>
        </Modal>
      )}

      {/* Add Session Modal */}
      <Modal
        isOpen={isAddSessionModalOpen}
        onClose={() => setIsAddSessionModalOpen(false)}
        title="Додати робочу сесію"
      >
        <form onSubmit={handleAddSession} className="flex flex-col gap-4">
          <FormField
            label="Дата:"
            name="date"
            value={newSession.date}
            onChange={handleSessionChange}
            type="date"
            required
          />
          <FormField
            label="Проєкт:"
            name="project"
            value={newSession.project}
            onChange={handleSessionChange}
            required
          />
          <FormField
            label="Години:"
            name="hours"
            value={newSession.hours}
            onChange={handleSessionChange}
            type="number"
            required
          />
          <FormField
            label="Опис:"
            name="description"
            value={newSession.description}
            onChange={handleSessionChange}
            textarea
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Додати
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default EmployeeDetailsTabs;