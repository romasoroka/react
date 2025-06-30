import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Employee, Project, WorkSession, ProjectStatus } from '../../types';
import { useAppContext } from '../../context/AppContext';
import Modal from '../../components/ui/Modal';
import FormField from '../../components/ui/FormField';
import { formatYears } from '../../components/utils/formatDate';
import InfoCard from '../../components/ui/InfoCard';

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
    projectId: '',
    startTime: '',
    endTime: '',
    taskDescription: '',
  });
  const { updateEmployee } = useAppContext();

  const assignedProjects = projects.filter((p) => employee.projectIds.includes(p.id!));

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewSession({ ...newSession, [name]: value });
  };

  const handleAddSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSession.date || !newSession.projectId || !newSession.startTime || !newSession.endTime) {
      alert('Дата, проєкт, початковий і кінцевий час є обов’язковими');
      return;
    }
    const session: WorkSession = {
      id: 0,
      date: newSession.date,
      projectId: Number(newSession.projectId),
      employeeId: employee.id ?? 0,
      startTime: newSession.startTime,
      endTime: newSession.endTime,
      taskDescription: newSession.taskDescription,
    };

    try {
      const response = await fetch('/api/worksessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(session),
      });
      if (!response.ok) {
        throw new Error('Не вдалося додати робочу сесію');
      }
      setIsAddSessionModalOpen(false);
      setNewSession({ date: '', projectId: '', startTime: '', endTime: '', taskDescription: '' });
    } catch (error) {
      alert('Помилка при додаванні сесії: ' + (error instanceof Error ? error.message : 'Невідома помилка'));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'general'
              ? 'border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
              : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500'
          }`}
          onClick={() => setActiveTab('general')}
        >
          Загальна інформація
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'stats'
              ? 'border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
              : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500'
          }`}
          onClick={() => setActiveTab('stats')}
        >
          Статистика роботи
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'projects'
              ? 'border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
              : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500'
          }`}
          onClick={() => setActiveTab('projects')}
        >
          Проєкти
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'general' && (
        <div className="flex flex-col animate-slideIn">
          <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">Навички:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {employee.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">Досвід:</span>
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{formatYears(employee.yearsOfExperience)}</span>
          </div>
          <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">Email:</span>
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{employee.email}</span>
          </div>
          <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">Телефон:</span>
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{employee.phone || 'Не вказано'}</span>
          </div>
          <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">Біо:</span>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">{employee.bio || 'Не вказано'}</p>
          </div>
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="flex flex-col gap-6 animate-slideIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoCard value={employee.totalHoursWorked} label="Загальні години" />
            <InfoCard value={employee.reportsSubmitted} label="Звіти подано" />
            <InfoCard value={employee.projectsInvolved} label="Проєктів залучено" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Останні робочі сесії</h3>
              <button
                onClick={() => setIsAddSessionModalOpen(true)}
                className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
              >
                Додати сесію
              </button>
            </div>
            <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 text-sm text-gray-600 dark:text-gray-400">
              Немає робочих сесій
            </div>
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="flex flex-col animate-slideIn">
          {assignedProjects.length > 0 ? (
            assignedProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors flex justify-between items-center"
              >
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">{project.name}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{project.description}</p>
                </div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === ProjectStatus.Active
                      ? 'bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-200'
                      : project.status === ProjectStatus.Completed
                      ? 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200'
                      : project.status === ProjectStatus.OnHold
                      ? 'bg-yellow-100 dark:bg-yellow-800 text-yellow-600 dark:text-yellow-200'
                      : 'bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-200'
                  }`}
                >
                  {project.status}
                </span>
              </Link>
            ))
          ) : (
            <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 text-sm text-gray-600 dark:text-gray-400">
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
            <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50">
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">Дата:</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{formatDate(selectedSession.date)}</span>
            </div>
            <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50">
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">Проєкт:</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{projects.find((p) => p.id === selectedSession.projectId)?.name || 'Невідомий'}</span>
            </div>
            <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50">
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">Час:</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{`${selectedSession.startTime} - ${selectedSession.endTime}`}</span>
            </div>
            <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50">
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">Опис:</span>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">{selectedSession.taskDescription}</p>
            </div>
            <button
              onClick={() => setIsSessionModalOpen(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
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
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-800 dark:text-gray-100">Проєкт:</label>
            <select
              name="projectId"
              value={newSession.projectId}
              onChange={handleSessionChange}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Виберіть проєкт</option>
              {assignedProjects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
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
            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
          >
            Додати
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default EmployeeDetailsTabs;