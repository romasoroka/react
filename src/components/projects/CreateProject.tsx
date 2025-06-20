import { useState } from 'react';
import Select from 'react-select';
import Modal from '../ui/Modal';
import FormField from '../ui/FormField';
import { Project, Credential } from '../../types';
import { techOptions } from '../../data/techOptions';
import { initialEmployees } from '../../data/Employees';



interface CreateProjectFormProps {
  onCreate: (project: Project) => void;
}

const CreateProjectForm = ({ onCreate }: CreateProjectFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    status: 'Active',
    technologies: [] as string[], 
    description: '',
    programmers: [] as string[],
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



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const project: Project = {
      id: Math.random(), 
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
      technologies: [] as string[], 
      description: '',
      programmers: [] as string[],
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
        <form onSubmit={handleSubmit} className="flex flex-col">
          <FormField
            label="Назва:"
            name="name"
            value={newProject.name}
            onChange={handleInputChange}
            required
          />
          <div className="flex flex-col  p-3 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
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
          <div className="flex flex-col rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
          <label className="block p-2 text-sm font-medium text-gray-700 mb-1">Технології</label>
          <Select
            isMulti
            name="technologies"
            options={techOptions}
            className="basic-multi-select px-2"
            placeholder="Вибрати технології"
            classNamePrefix="select"
            value={techOptions.filter(option =>
              newProject.technologies.includes(option.value)
            )}
            onChange={(selectedOptions) =>
              setNewProject({
                ...newProject,
                technologies: selectedOptions.map((opt) => opt.value),
              })
            }
          />
          </div>
          

          <FormField
            label="Короткий опис:"
            name="description"
            value={newProject.description}
            onChange={handleInputChange}
            textarea
          />
           <div className="flex flex-col rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
          <label className="block p-2 text-sm font-medium text-gray-700 mb-1">Програмісти</label>
          <Select
            isMulti
            name="programmers"
            options={initialEmployees.map(emp => ({
              value: emp.name,
              label: emp.name,
            }))}
            className="basic-multi-select px-2"
            placeholder="Вибрати технології"
            classNamePrefix="select"
            value={initialEmployees
              .filter(emp => newProject.programmers.includes(emp.name))
              .map(emp => ({ value: emp.name, label: emp.name }))}
            onChange={(selectedOptions) =>
              setNewProject({
                ...newProject,
                programmers: selectedOptions
                  ? selectedOptions.map((opt) => opt.value)
                  : [],
              })
            }
          />

          </div>
         
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
            Створити
          </button>
        </form>
      </Modal>
    </>
  );
};

export default CreateProjectForm;