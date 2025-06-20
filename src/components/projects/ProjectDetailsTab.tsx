import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../ui/Modal';
import FormField from '../ui/FormField';
import { Project, Employee, Credential, WorkSession } from '../../types';
import { useAppContext } from '../../context/AppContext';

interface ProjectDetailsTabsProps {
  project: Project;
  employees: Employee[];
}

const ProjectDetailsTabs = ({ project, employees }: ProjectDetailsTabsProps) => {
  const [activeTab, setActiveTab] = useState('general');
  const [showValues, setShowValues] = useState<{ [key: number]: boolean }>({});
  const [isAddCredentialOpen, setIsAddCredentialOpen] = useState(false);
  const [isAddSessionModalOpen, setIsAddSessionModalOpen] = useState(false);
  const [isViewSessionModalOpen, setIsViewSessionModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<WorkSession | null>(null);
  const [newSession, setNewSession] = useState({
    date: '',
    employee: '',
    hours: '',
    description: '',
  });
  const { updateProject, deleteProject, updateEmployee } = useAppContext();
  const navigate = useNavigate();

  const toggleValue = (index: number) => {
    setShowValues((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleCredentialChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewCredential({ ...newCredential, [name]: value });
  };

  const handleAddCredential = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCredential.key.trim()) {
      alert('Ключ облікових даних є обов’язковим');
      return;
    }
    const updatedProject = {
      ...project,
      credentials: [...(project.credentials ?? []), newCredential],
    };
    updateProject(project.id, updatedProject);
    setIsAddCredentialOpen(false);
    setNewCredential({
      name: '',
      key: '',
      value: '',
      description: '',
    });
  };


  const handleSessionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewSession({ ...newSession, [name]: value });
  };

  const handleAddSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSession.date || !newSession.employee || !newSession.hours) {
      alert('Дата, працівник і години є обов’язковими');
      return;
    }
    const employee = employees.find((e) => e.name === newSession.employee);
    if (!employee) {
      alert('Працівник не знайдений');
      return;
    }
    const session: WorkSession = {
      id: (employee.recentWorkSessions?.length || 0) + 1,
      date: newSession.date,
      project: project.name,
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
    const updatedProject: Project = {
      ...project,
      analytics: {
        ...project.analytics,
        hoursLogged: project.analytics.hoursLogged + session.hours,
      },
    };
    updateEmployee(employee.id, updatedEmployee);
    updateProject(project.id, updatedProject);
    setIsAddSessionModalOpen(false);
    setNewSession({ date: '', employee: '', hours: '', description: '' });
  };

  const handleViewSession = (session: WorkSession) => {
    setSelectedSession(session);
    setIsViewSessionModalOpen(true);
  };

  // Aggregate work sessions for this project
  const workSessions = employees
    .flatMap((employee) =>
      (employee.recentWorkSessions || [])
        .filter((session) => session.project === project.name)
        .map((session) => ({ ...session, employee: employee.name }))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Calculate analytics metrics
  const teamMembers = project.programmers.length;
  const credentialsCount = project.credentials?.length ?? 0;
  const avgHoursPerMember = teamMembers > 0 ? (project.analytics.hoursLogged / teamMembers).toFixed(2) : 0;
  const formattedStartDate = new Date(project.startDate).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  // Map programmers to employees for links
  const team = project.programmers.map((programmer) => {
    const employee = employees.find((e) => e.name === programmer);
    return { name: programmer, id: employee?.id };
  });

  const [newCredential, setNewCredential] = useState<Credential>({
    name: '',
    key: '',
    value: '',
    description: '',
  });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
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
          Основна інформація
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'team'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
          onClick={() => setActiveTab('team')}
        >
          Команда
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'analytics'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
          onClick={() => setActiveTab('analytics')}
        >
          Аналітика
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'credentials'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
          onClick={() => setActiveTab('credentials')}
        >
          Облікові дані
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'sessions'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
          onClick={() => setActiveTab('sessions')}
        >
          Робочі сесії
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'general' && (
        <div className="flex flex-col animate-slideIn">
          <div className="p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Статус:</span>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ml-2 ${
                project.status === 'Active'
                  ? 'bg-green-100 text-green-600'
                  : project.status === 'In Progress'
                  ? 'bg-yellow-100 text-yellow-600'
                  : 'bg-indigo-100 text-indigo-600'
              }`}
            >
              {project.status}
            </span>
          </div>
          <div className="p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Опис:</span>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{project.detailedDescription}</p>
          </div>
          <div className="p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Технології:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Дата початку:</span>
            <span className="text-sm text-gray-600 ml-2">{project.startDate}</span>
          </div>
          <div className="p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Дата завершення:</span>
            <span className="text-sm text-gray-600 ml-2">{project.endDate}</span>
          </div>
          <div className="p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Бюджет:</span>
            <span className="text-sm text-gray-600 ml-2">{project.budget}</span>
          </div>
          <div className="p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Клієнт:</span>
            <span className="text-sm text-gray-600 ml-2">{project.client}</span>
          </div>
        </div>
      )}

{activeTab === 'team' && (
  <div className="flex flex-col animate-slideIn">
    {team.length > 0 ? (
      team.map((member, index) => {
        const employee = employees.find((e) => e.id === member.id || e.name === member.name);
        return (
          <div
            key={index}
            className="flex items-center gap-3 p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors"
          >
            {employee?.image ? (
              <img
                src={employee.image}
                alt={member.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xs text-white font-bold">
                {member.name[0]}
              </div>
            )}  
              <span className="text-sm font-semibold text-gray-800">{member.name}</span>
          </div>
        );
      })
    ) : (
      <div className="p-2 rounded-lg bg-white/50 text-sm text-gray-600">
        Немає членів команди
      </div>
    )}
  </div>
)}


      {activeTab === 'analytics' && (
        <div className="flex flex-col animate-slideIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-2 rounded-lg bg-blue-50 text-center">
              <span className="text-2xl font-bold text-blue-600">{project.analytics.hoursLogged}</span>
              <p className="text-sm text-gray-600">Годин відпрацьовано</p>
            </div>
            <div className="p-2 rounded-lg bg-blue-50 text-center">
              <span className="text-2xl font-bold text-blue-600">{teamMembers}</span>
              <p className="text-sm text-gray-600">Членів команди</p>
            </div>
            <div className="p-2 rounded-lg bg-blue-50 text-center">
              <span className="text-2xl font-bold text-blue-600">{project.analytics.reports}</span>
              <p className="text-sm text-gray-600">Звіти</p>
            </div>
            <div className="p-2 rounded-lg bg-blue-50 text-center">
              <span className="text-2xl font-bold text-blue-600">{credentialsCount}</span>
              <p className="text-sm text-gray-600">Облікові дані</p>
            </div>
            <div className="p-2 rounded-lg bg-blue-50 text-center">
              <span className="text-2xl font-bold text-blue-600">{avgHoursPerMember}</span>
              <p className="text-sm text-gray-600">Середні години/учасник</p>
            </div>
            <div className="p-2 rounded-lg bg-blue-50 text-center">
              <span className="text-2xl font-bold text-blue-600">{formattedStartDate}</span>
              <p className="text-sm text-gray-600">Дата початку</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'credentials' && (
        <div className="flex flex-col animate-slideIn">
          <div className="flex flex-col gap-2 mt-2">
            {project.credentials && project.credentials.length > 0 ? (
              project.credentials.map((cred, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-1 p-2 border border-gray-200 rounded-md"
                >
                  <span className="text-xs font-semibold text-gray-600">Назва: {cred.name}</span>
                  <span className="text-xs text-gray-600">Ключ: {cred.key}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600">
                      Значення: {showValues[index] ? cred.value : '••••••••'}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleValue(index)}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      {showValues[index] ? 'Приховати' : 'Показати'}
                    </button>
                  </div>
                  {cred.description && (
                    <span className="text-xs text-gray-600">Опис: {cred.description}</span>
                  )}
                </div>
              ))
            ) : (
              <span className="text-sm text-gray-600 ml-2">Немає облікових даних</span>
            )}
            <button
              type="button"
              onClick={() => setIsAddCredentialOpen(true)}
              className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-blue-700 transition-colors mt-2 w-fit"
            >
              Додати опублікові дані
            </button>
          </div>
        </div>
      )}

      {activeTab === 'sessions' && (
        <div className="flex flex-col gap-4 animate-slideIn">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-800">Останні робочі сесії</h3>
            <button
              onClick={() => setIsAddSessionModalOpen(true)}
              className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-blue-700 transition-colors"
            >
              Додати сесію
            </button>
          </div>
          {workSessions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-gray-600 border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-gray-800">
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
                      className="border-t border-gray-200 hover:bg-gray-50"
                    >
                      <td className="p-2">{formatDate(session.date)}</td>
                      <td className="p-2">
                        {employees.find((e) => e.name === session.employee)?.id ? (
                          <Link
                            to={`/employees/${employees.find((e) => e.name === session.employee)?.id}`}
                            className="text-blue-600 hover:underline"
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
      )}

      {/* Credential Modal */}
      <Modal
        isOpen={isAddCredentialOpen}
        onClose={() => setIsAddCredentialOpen(false)}
        title="Додати опублікові дані"
      >
        <form onSubmit={handleAddCredential} className="flex flex-col gap-2">
            <FormField
            label="Назва:"
            name="name"
            value={newCredential.name}
            onChange={handleCredentialChange}
            required ></FormField>
          <FormField
            label="Ключ (e.g., username, API key):"
            name="key"
            value={newCredential.key}
            onChange={handleCredentialChange}
            required
          />
          <FormField
            label="Значення (e.g., password, secret):"
            name="value"
            value={newCredential.value ?? ''}
            onChange={handleCredentialChange}
          />
          <FormField
            label="Опис (опціонально):"
            name="description"
            value={newCredential.description ?? ''}
            onChange={handleCredentialChange}
            textarea
          /> 
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Додати
          </button>
        </form>
      </Modal>

     

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
          <div className="flex flex-col gap-2 p-3 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <label className="text-sm font-semibold text-gray-800">Працівник:</label>
            <select
              name="employee"
              value={newSession.employee}
              onChange={handleSessionChange}
              className="w-full p-2 border border-gray-200 rounded-md text-sm text-gray-600 focus:border-blue-600 outline-none"
              required
            >
              <option value="">Виберіть працівника</option>
              {project.programmers.map((programmer, index) => (
                <option key={index} value={programmer}>{programmer}</option>
              ))}
            </select>
          </div>
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

      {/* View Session Modal */}
      {selectedSession && (
        <Modal
          isOpen={isViewSessionModalOpen}
          onClose={() => setIsViewSessionModalOpen(false)}
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
              onClick={() => setIsViewSessionModalOpen(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Закрити
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProjectDetailsTabs;