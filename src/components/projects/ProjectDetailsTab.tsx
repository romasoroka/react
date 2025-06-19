import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../ui/Modal';
import FormField from '../ui/FormField';
import { Project, Employee, Credential } from '../../types';
import { useAppContext } from '../../context/AppContext';

interface ProjectDetailsTabsProps {
  project: Project;
  employees: Employee[];
}

const ProjectDetailsTabs = ({ project, employees }: ProjectDetailsTabsProps) => {
  const [activeTab, setActiveTab] = useState('general');
  const [showValues, setShowValues] = useState<{ [key: number]: boolean }>({});
  const [isAddCredentialOpen, setIsAddCredentialOpen] = useState(false);
  const [newCredential, setNewCredential] = useState<Credential>({
    type: 'Username/Password',
    key: '',
    value: '',
    description: '',
  });
  const { updateProject } = useAppContext();

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
      type: 'Username/Password',
      key: '',
      value: '',
      description: '',
    });
  };

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
      </div>

      {/* Tab Content */}
      {activeTab === 'general' && (
        <div className="flex flex-col gap-4 animate-slideIn">
          <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Назва:</span>
            <span className="text-sm text-gray-600 ml-2">{project.name}</span>
          </div>
          <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
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
          <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Опис:</span>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{project.detailedDescription}</p>
          </div>
          <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
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
          <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Дата початку:</span>
            <span className="text-sm text-gray-600 ml-2">{project.startDate}</span>
          </div>
          <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Дата завершення:</span>
            <span className="text-sm text-gray-600 ml-2">{project.endDate}</span>
          </div>
          <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Бюджет:</span>
            <span className="text-sm text-gray-600 ml-2">{project.budget}</span>
          </div>
          <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Клієнт:</span>
            <span className="text-sm text-gray-600 ml-2">{project.client}</span>
          </div>
          <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Облікові дані:</span>
            <div className="flex flex-col gap-2 mt-2">
              {project.credentials && project.credentials.length > 0 ? (
                project.credentials.map((cred, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-1 p-2 border border-gray-200 rounded-md"
                  >
                    <span className="text-xs font-semibold text-gray-600">Тип: {cred.type}</span>
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
        </div>
      )}

      {activeTab === 'team' && (
        <div className="flex flex-col gap-4 animate-slideIn">
          {team.length > 0 ? (
            team.map((member, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors"
              >
                {member.id ? (
                  <Link
                    to={`/employees/${member.id}`}
                    className="text-sm font-semibold text-blue-600 hover:underline"
                  >
                    {member.name}
                  </Link>
                ) : (
                  <span className="text-sm font-semibold text-gray-800">{member.name}</span>
                )}
              </div>
            ))
          ) : (
            <div className="p-4 rounded-lg bg-white/50 text-sm text-gray-600">
              Немає членів команди
            </div>
          )}
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="flex flex-col gap-4 animate-slideIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-blue-50 text-center">
              <span className="text-2xl font-bold text-blue-600">{project.analytics.hoursLogged}</span>
              <p className="text-sm text-gray-600">Годин відпрацьовано</p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 text-center">
              <span className="text-2xl font-bold text-blue-600">{teamMembers}</span>
              <p className="text-sm text-gray-600">Членів команди</p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 text-center">
              <span className="text-2xl font-bold text-blue-600">{project.analytics.reports}</span>
              <p className="text-sm text-gray-600">Звіти</p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 text-center">
              <span className="text-2xl font-bold text-blue-600">{credentialsCount}</span>
              <p className="text-sm text-gray-600">Облікові дані</p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 text-center">
              <span className="text-2xl font-bold text-blue-600">{avgHoursPerMember}</span>
              <p className="text-sm text-gray-600">Середні години/учасник</p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 text-center">
              <span className="text-2xl font-bold text-blue-600">{formattedStartDate}</span>
              <p className="text-sm text-gray-600">Дата початку</p>
            </div>
          </div>
        </div>
      )}

      {/* Credential Modal */}
      <Modal
        isOpen={isAddCredentialOpen}
        onClose={() => setIsAddCredentialOpen(false)}
        title="Додати опублікові дані"
      >
        <form onSubmit={handleAddCredential} className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 p-3 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <label className="text-sm font-semibold text-gray-800">Тип:</label>
            <select
              name="type"
              value={newCredential.type}
              onChange={handleCredentialChange}
              className="w-full p-2 border border-gray-200 rounded-md text-sm text-gray-600 focus:border-blue-600 outline-none"
            >
              <option value="Username/Password">Username/Password</option>
              <option value="API Key">API Key</option>
              <option value="Database URL">Database URL</option>
              <option value="Other">Other</option>
            </select>
          </div>
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
            type="password"
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
    </div>
  );
};

export default ProjectDetailsTabs;