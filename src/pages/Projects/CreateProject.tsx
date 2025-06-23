  import { useState, useEffect,FormEvent, ChangeEvent } from 'react';
  import SelectComponent from '../../components/ui/SelectComponents';
  import Modal from '../../components/ui/Modal';
  import FormField from '../../components/ui/FormField';
  import { Project, Credential } from '../../types';
  import { initialEmployees } from '../../data/employees';
  import { initialProjectFormData, ProjectFormData } from '../../data/initialProjectFormData';


  import { techOptions } from '../../data/techOptions';


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

    useEffect(() => {
      if (isOpen) {
        setNewProject(initialProjectFormData);
        setCredentials([]);
      }
    }, [isOpen]);
    

    return (
      <>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold mb-6 hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
          onClick={() => setIsOpen(true)}
        >
          Створити проєкт
        </button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Створити новий проєкт">
          <form onSubmit={handleSubmit} className="flex flex-col bg-white  text-gray-800 dark:bg-gray-800/50  ">
            <FormField
              label="Назва:"
              name="name"
              value={newProject.name}
              onChange={handleInputChange}
              required
            />
            <SelectComponent
              label="Статус"
              options={[
                { value: 'Active', label: 'Active' },
                { value: 'In Progress', label: 'In Progress' },
                { value: 'Completed', label: 'Completed' },
              ]}
              selected={[newProject.status]}
              onChange={(values) =>
                setNewProject({ ...newProject, status: values[0] as "Active" | "In Progress" | "Completed" })
              }
              />

            <SelectComponent
              label="Технології"
              options={techOptions}
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
            <SelectComponent
              label="Програмісти"
              options={initialEmployees.map(emp => ({ value: emp.name, label: emp.name }))}
              selected={newProject.programmers}
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
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
            >
              Створи
            </button>
          </form>
        </Modal>
      </>
    );
  };

  export default CreateProjectForm;