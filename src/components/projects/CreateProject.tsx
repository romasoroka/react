import { useState } from 'react';
import Modal from '../ui/Modal';
import FormField from '../ui/FormField';
import { Project, Credential } from '../../types';

interface CreateProjectFormProps {
  onCreate: (project: Project) => void;
}

const CreateProjectForm = ({ onCreate }: CreateProjectFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    status: 'Active',
    technologies: '',
    description: '',
    programmers: '',
    startDate: '',
    endDate: '',
    budget: '',
    client: '',
    detailedDescription: '',
    hoursLogged: '',
    reports: '',
  });
  const [credentials, setCredentials] = useState<Credential[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleCredentialChange = (
    index: number,
    field: keyof Credential,
    value: string
  ) => {
    const updatedCredentials = [...credentials];
    updatedCredentials[index] = { ...updatedCredentials[index], [field]: value };
    setCredentials(updatedCredentials);
  };

  const addCredential = () => {
    setCredentials([...credentials, { type: 'Username/Password', key: '', value: '' }]);
  };

  const removeCredential = (index: number) => {
    setCredentials(credentials.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const project: Project = {
      id: Math.random(), // Replace with proper ID generation
      name: newProject.name,
      status: newProject.status,
      technologies: newProject.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      description: newProject.description,
      programmers: newProject.programmers.split(',').map((p) => p.trim()).filter(Boolean),
      startDate: newProject.startDate,
      endDate: newProject.endDate,
      budget: newProject.budget,
      client: newProject.client,
      detailedDescription: newProject.detailedDescription,
      credentials: credentials.filter((c) => c.key.trim() !== ''),
      analytics: {
        hoursLogged: Number(newProject.hoursLogged) || 0,
        reports: Number(newProject.reports) || 0,
      },
    };
    onCreate(project);
    setIsOpen(false);
    setNewProject({
      name: '',
      status: 'Active',
      technologies: '',
      description: '',
      programmers: '',
      startDate: '',
      endDate: '',
      budget: '',
      client: '',
      detailedDescription: '',
      hoursLogged: '',
      reports: '',
    });
    setCredentials([]);
  };

  return (
    <>
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold mb-6 hover:bg-blue-700 transition-colors"
        onClick={() => setIsOpen(true)}
      >
        Створити проєкт
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Створити новий проєкт">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <FormField
            label="Назва:"
            name="name"
            value={newProject.name}
            onChange={handleInputChange}
            required
          />
          <div className="flex flex-col gap-2 p-3 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <label className="text-sm font-semibold text-gray-800">Статус:</label>
            <select
              name="status"
              value={newProject.status}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-200 rounded-md text-sm text-gray-600 focus:border-blue-600 outline-none"
            >
              <option value="Active">Active</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <FormField
            label="Технології (через кому):"
            name="technologies"
            value={newProject.technologies}
            onChange={handleInputChange}
            placeholder="React, TypeScript"
          />
          <FormField
            label="Короткий опис:"
            name="description"
            value={newProject.description}
            onChange={handleInputChange}
            textarea
          />
          <FormField
            label="Програмісти (через кому):"
            name="programmers"
            value={newProject.programmers}
            onChange={handleInputChange}
            placeholder="Олег Петренко, Марія Іванова"
          />
          <FormField
            label="Дата початку:"
            name="startDate"
            value={newProject.startDate}
            onChange={handleInputChange}
            type="date"
          />
          <FormField
            label="Дата завершення:"
            name="endDate"
            value={newProject.endDate}
            onChange={handleInputChange}
            type="date"
          />
          <FormField
            label="Бюджет:"
            name="budget"
            value={newProject.budget}
            onChange={handleInputChange}
            placeholder="$50,000"
          />
          <FormField
            label="Клієнт:"
            name="client"
            value={newProject.client}
            onChange={handleInputChange}
          />
          <FormField
            label="Детальний опис:"
            name="detailedDescription"
            value={newProject.detailedDescription}
            onChange={handleInputChange}
            textarea
          />
          <FormField
            label="Годин відпрацьовано:"
            name="hoursLogged"
            value={newProject.hoursLogged}
            onChange={handleInputChange}
            type="number"
            placeholder="320"
          />
          <FormField
            label="Звіти:"
            name="reports"
            value={newProject.reports}
            onChange={handleInputChange}
            type="number"
            placeholder="1"
          />
          <div className="flex flex-col gap-2 p-3 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <label className="text-sm font-semibold text-gray-800">Облікові дані:</label>
            {credentials.map((cred, index) => (
              <div key={index} className="flex flex-col gap-2 p-2 border border-gray-200 rounded-md">
                <select
                  value={cred.type}
                  onChange={(e) => handleCredentialChange(index, 'type', e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-md text-sm text-gray-600 focus:border-blue-600 outline-none"
                >
                  <option value="Username/Password">Username/Password</option>
                  <option value="API Key">API Key</option>
                  <option value="Database URL">Database URL</option>
                  <option value="Other">Other</option>
                </select>
                <input
                  placeholder="Key (e.g., username, API key)"
                  value={cred.key}
                  onChange={(e) => handleCredentialChange(index, 'key', e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-md text-sm text-gray-600 focus:border-blue-600 outline-none"
                />
                <input
                  placeholder="Value (e.g., password, secret)"
                  value={cred.value || ''}
                  onChange={(e) => handleCredentialChange(index, 'value', e.target.value)}
                  type="password"
                  className="w-full p-2 border border-gray-200 rounded-md text-sm text-gray-600 focus:border-blue-600 outline-none"
                />
                <input
                  placeholder="Description (optional)"
                  value={cred.description || ''}
                  onChange={(e) => handleCredentialChange(index, 'description', e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-md text-sm text-gray-600 focus:border-blue-600 outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeCredential(index)}
                  className="bg-red-600 text-white px-4 py-1 rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors"
                >
                  Видалити
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addCredential}
              className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-blue-700 transition-colors mt-2"
            >
              Додати облікові дані
            </button>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Створити
          </button>
        </form>
      </Modal>
    </>
  );
};

export default CreateProjectForm;