import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import SelectComponent from "../../components/ui/SelectComponents";
import Modal from "../../components/ui/Modal";
import FormField from "../../components/ui/FormField";
import {
  Project,
  ProjectStatus,
  Employee,
  Technology,
} from "../../types/Models";
import { useEmployeeContext } from "../../context/EmployeeContext";
import { fetchTechnologies } from "../../services/technologies";

interface ProjectFormData {
  name: string;
  status: ProjectStatus;
  technologies: string[];
  description: string;
  employeeIds: string[];
  startDate: string;
  endDate: string;
  budget: string;
  client: string;
  detailedDescription: string;
}

const initialProjectFormData: ProjectFormData = {
  name: "",
  status: ProjectStatus.Active,
  technologies: [],
  description: "",
  employeeIds: [],
  startDate: "",
  endDate: "",
  budget: "",
  client: "",
  detailedDescription: "",
};

interface CreateProjectFormProps {
  onCreate: (project: Omit<Project, "id">) => Promise<void>;
}

const CreateProjectForm = ({ onCreate }: CreateProjectFormProps) => {
  const { employees } = useEmployeeContext();
  const [isOpen, setIsOpen] = useState(false);
  const [newProject, setNewProject] = useState<ProjectFormData>(
    initialProjectFormData
  );
  const [error, setError] = useState<string | null>(null);
  const [technologies, setTechnologies] = useState<Technology[]>([]);

  useEffect(() => {
    console.log("Available employees:", employees);
    console.log("Available technologies:", technologies);
  }, [employees, technologies]);

  useEffect(() => {
    const loadTechnologies = async () => {
      try {
        const techs = await fetchTechnologies();
        setTechnologies(techs);
      } catch (err) {
        console.error("Failed to fetch technologies:", err);
        setError("Помилка завантаження технологій");
      }
    };
    loadTechnologies();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewProject({
      ...newProject,
      [name]: name === "status" ? (Number(value) as ProjectStatus) : value,
    });
  };

  const validateForm = () => {
    if (!newProject.name.trim()) return "Назва проєкту є обов’язковою";
    if (!newProject.startDate) return "Дата початку є обов’язковою";
    if (newProject.budget && isNaN(Number(newProject.budget)))
      return "Бюджет має бути числом";
    if (
      newProject.employeeIds.length > 0 &&
      newProject.employeeIds.some(
        (empName: string) =>
          !employees.find((e: Employee) => e.fullName === empName)
      )
    )
      return "Обрано неіснуючого працівника";
    if (newProject.startDate && isNaN(new Date(newProject.startDate).getTime()))
      return "Невірний формат дати початку";
    if (newProject.endDate && isNaN(new Date(newProject.endDate).getTime()))
      return "Невірний формат дати завершення";
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const employeeIds = newProject.employeeIds
      .map((empName: string) => {
        const emp = employees.find((e: Employee) => e.fullName === empName);
        return emp?.id;
      })
      .filter((id): id is number => id !== undefined && id > 0);

    const project: Omit<Project, "id"> = {
      name: newProject.name.trim(),
      status: newProject.status,
      technologies: newProject.technologies,
      description: newProject.description || "",
      detailedDescription: newProject.detailedDescription || "",
      employeeIds,
      startDate: new Date(newProject.startDate).toISOString(),
      endDate: newProject.endDate
        ? new Date(newProject.endDate).toISOString()
        : undefined,
      budget: Number(newProject.budget) || 0,
      client: newProject.client || "",
      credentials: [],
      totalHoursLogged: 0,
      reportCount: 0,
      activeEmployees: employeeIds.length,
    };

    try {
      console.log("Project payload:", JSON.stringify(project, null, 2));
      await onCreate(project);
      setIsOpen(false);
      setNewProject(initialProjectFormData);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error details:", err);
        setError("Помилка при створенні проєкту: " + err.message);
      } else {
        setError("Помилка при створенні проєкту: Невідома помилка");
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      setNewProject(initialProjectFormData);
      setError(null);
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
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Створити новий проєкт"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-white dark:bg-gray-800/50 text-gray-800 dark:text-gray-100"
        >
          {error && (
            <div className="mb-4 p-2 bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-200 rounded-lg text-sm">
              {error}
            </div>
          )}
          <FormField
            label="Назва:"
            name="name"
            value={newProject.name}
            onChange={handleInputChange}
            required
          />
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              Статус:
            </label>
            <select
              name="status"
              value={newProject.status}
              onChange={handleInputChange}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value={ProjectStatus.Active}>Active</option>
              <option value={ProjectStatus.Completed}>Completed</option>
              <option value={ProjectStatus.OnHold}>OnHold</option>
              <option value={ProjectStatus.Cancelled}>Cancelled</option>
            </select>
          </div>
          <SelectComponent
            label="Технології"
            options={technologies.map((tech) => ({
              value: tech.name,
              label: tech.name,
            }))}
            selected={newProject.technologies}
            onChange={(values) =>
              setNewProject({ ...newProject, technologies: values })
            }
          />
          <FormField
            label="Короткий опис:"
            name="description"
            value={newProject.description}
            onChange={handleInputChange}
            textarea
          />
          <FormField
            label="Детальний опис:"
            name="detailedDescription"
            value={newProject.detailedDescription}
            onChange={handleInputChange}
            textarea
          />
          <SelectComponent
            label="Працівники"
            options={employees.map((emp: Employee) => ({
              value: emp.fullName,
              label: emp.fullName,
            }))}
            selected={newProject.employeeIds}
            onChange={(values) =>
              setNewProject({ ...newProject, employeeIds: values })
            }
          />
          <FormField
            label="Дата початку:"
            name="startDate"
            value={newProject.startDate}
            onChange={handleInputChange}
            type="date"
            required
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
            type="number"
          />
          <FormField
            label="Клієнт:"
            name="client"
            value={newProject.client}
            onChange={handleInputChange}
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
