import { useState, FormEvent, ChangeEvent } from 'react';
import Select from 'react-select';
import Modal from '../../components/ui/Modal';
import FormField from '../../components/ui/FormField';
import { Project, Credential } from '../../types';
import { initialEmployees } from '../../data/employees';
import { initialProjectFormData, ProjectFormData } from '../../data/initialProjectFormData';
import TechnologiesSelect from '../../components/ui/TechnologiesSelect';
import ProgrammersSelect from '../../components/ui/ProgrammersSelect';

interface CreateProjectFormProps {
  onCreate: (project: Project) => void;
}

const CreateProjectForm = ({ onCreate }: CreateProjectFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newProject, setNewProject] = useState<ProjectFormData>(initialProjectFormData);
  const [credentials, setCredentials] = useState<Credential[]>([]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const project: Project = {
      id: Date.now(), 
      name: newProject.name,
      status: newProject.status,
      technologies: newProject.technologies,
      description: newProject.description,
      programmers: newProject.programmers,
      startDate: newProject.startDate,
      endDate: newProject.endDate,
      budget: newProject.budget,
      client: newProject.client,
      detailedDescription: newProject.detailedDescription,
      credentials: credentials,
      analytics: {
        hoursLogged: Number(newProject.hoursLogged) || 0,
        reports: Number(newProject.reports) || 0,
      },
    };
    onCreate(project);
    setIsOpen(false);
    setNewProject(initialProjectFormData); 
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
        <form onSubmit={handleSubmit} className="flex flex-col">
          <FormField
            label="Назва:"
            name="name"
            value={newProject.name}
            onChange={handleInputChange}
            required
          />
          <div className="flex flex-col p-3 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
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
          <TechnologiesSelect
            selected={newProject.technologies}
            onChange={(values) => setNewProject({ ...newProject, technologies: values })}
          />
          <FormField
            label="Короткий опис:"
            name="description"
            value={newProject.description}
            onChange={handleInputChange}
            textarea
          />
          <ProgrammersSelect
            selected={newProject.programmers}
            employees={initialEmployees}
            onChange={(values) => setNewProject({ ...newProject, programmers: values })}
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
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Створи
          </button>
        </form>
      </Modal>
    </>
  );
};

export default CreateProjectForm;