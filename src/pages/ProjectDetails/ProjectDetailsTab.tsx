import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../components/ui/Modal';
import FormField from '../../components/ui/FormField';
import { Project, Employee, Credential, WorkSession } from '../../types';
import { useAppContext } from '../../context/AppContext';
import ProjectGeneralTab from './Tabs/GeneralTab';
import ProjectTeamTab from './Tabs/TeamTab';
import ProjectAnalyticsTab from './Tabs/AnalyticsTab';
import ProjectCredentialsTab from './Tabs/CredentialsTab';
import ProjectSessionsTab from './Tabs/SessionsTab';




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
    const updatedProject = {
      ...project,
      credentials: [...(project.credentials ?? []), newCredential],
    };
    updateProject(project.id, updatedProject);
    setIsAddCredentialOpen(false);
    setNewCredential({
      name: '',
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
      </div>

      {/* Tab Content */}
      {activeTab === 'general' && <ProjectGeneralTab project={project} />}


{activeTab === 'team' && <ProjectTeamTab project={project} employees={employees} />}
{activeTab === 'analytics' && <ProjectAnalyticsTab project={project} />}

{activeTab === 'credentials' && (
  <ProjectCredentialsTab
    project={project}
    showValues={showValues}
    toggleValue={toggleValue}
    setIsAddCredentialOpen={setIsAddCredentialOpen}
  />
)}


{activeTab === 'sessions' && (
  <ProjectSessionsTab
    project={project}
    employees={employees}
    workSessions={workSessions}
    onAddClick={() => setIsAddSessionModalOpen(true)}
    onViewSession={handleViewSession}
    formatDate={formatDate}
  />
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