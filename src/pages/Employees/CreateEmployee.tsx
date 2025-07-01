import { useState } from "react";
import SelectComponent from "../../components/ui/SelectComponents";
import Modal from "../../components/ui/Modal";
import FormField from "../../components/ui/FormField";
import { Employee } from "../../types/Models";
import { techOptions } from "../../data/initialData";

interface CreateEmployeeFormProps {
  onCreate: (employee: Omit<Employee, "id">) => Promise<void>;
}

const CreateEmployeeForm = ({ onCreate }: CreateEmployeeFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState<Omit<Employee, "id">>({
    fullName: "",
    skills: [],
    yearsOfExperience: 0,
    projectIds: [],
    email: "",
    phone: "",
    bio: "",
    totalHoursWorked: 0,
    reportsSubmitted: 0,
    projectsInvolved: 0,
    workSessions: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({
      ...prev,
      [name]:
        name === "yearsOfExperience"
          ? value === ""
            ? 0
            : Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      if (!newEmployee.fullName || !newEmployee.email) {
        throw new Error("Повне ім’я та email є обов’язковими");
      }
      const employee: Omit<Employee, "id"> = {
        ...newEmployee,
        skills: newEmployee.skills,
        projectIds: newEmployee.projectIds,
        totalHoursWorked: 0,
        reportsSubmitted: 0,
        projectsInvolved: newEmployee.projectIds.length,
        workSessions: [],
      };
      console.log("Creating employee:", employee);
      await onCreate(employee);
      setIsOpen(false);
      setNewEmployee({
        fullName: "",
        skills: [],
        yearsOfExperience: 0,
        projectIds: [],
        email: "",
        phone: "",
        bio: "",
        totalHoursWorked: 0,
        reportsSubmitted: 0,
        projectsInvolved: 0,
        workSessions: [],
      });
    } catch (err) {
      console.error("Form Submission Error:", err);
      setError(err instanceof Error ? err.message : "Невідома помилка");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold mb-6 hover:bg-blue-700 transition-colors"
        onClick={() => setIsOpen(true)}
      >
        Створити працівника
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Створити нового працівника"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          {error && (
            <div className="mb-4 p-2 bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-200 rounded-lg text-sm">
              {error}
            </div>
          )}
          <FormField
            label="Повне ім’я:"
            name="fullName"
            value={newEmployee.fullName}
            onChange={handleInputChange}
            required
          />
          <SelectComponent
            label="Навички"
            options={techOptions}
            selected={newEmployee.skills}
            onChange={(values) =>
              setNewEmployee({ ...newEmployee, skills: values })
            }
          />
          <FormField
            label="Досвід (роки):"
            name="yearsOfExperience"
            value={newEmployee.yearsOfExperience.toString()}
            onChange={handleInputChange}
            placeholder="5"
            type="number"
          />
          <FormField
            label="Email:"
            name="email"
            value={newEmployee.email}
            onChange={handleInputChange}
            type="email"
            required
          />
          <FormField
            label="Телефон:"
            name="phone"
            value={newEmployee.phone || ""}
            onChange={handleInputChange}
            type="tel"
          />
          <FormField
            label="Біографія:"
            name="bio"
            value={newEmployee.bio || ""}
            onChange={handleInputChange}
            textarea
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            {isSubmitting ? "Створення..." : "Створити"}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default CreateEmployeeForm;
