import { useState } from 'react';
import Select from 'react-select';
import SelectComponent from '../../components/ui/SelectComponents';
import Modal from '../../components/ui/Modal';
import FormField from '../../components/ui/FormField';
import { Employee } from '../../types';
import { techOptions } from '../../data/initialData';

interface CreateEmployeeFormProps {
  onCreate: (employee: Omit<Employee, 'id'>) => Promise<void>;
}

const CreateEmployeeForm = ({ onCreate }: CreateEmployeeFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState<Omit<Employee, 'id'>>({
    fullName: '',
    skills: [],
    yearsOfExperience: 0,
    projectIds: [],
    email: '',
    phone: '',
    bio: '',
    totalHoursWorked: 0,
    reportsSubmitted: 0,
    projectsInvolved: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({
      ...prev,
      [name]: name === 'yearsOfExperience' ? (value === '' ? 0 : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const employee: Omit<Employee, 'id'> = {
        ...newEmployee,
        skills: newEmployee.skills,
        projectIds: newEmployee.projectIds,
        totalHoursWorked: newEmployee.totalHoursWorked || 0,
        reportsSubmitted: newEmployee.reportsSubmitted || 0,
        projectsInvolved: newEmployee.projectIds.length || 0,
      };
      await onCreate(employee);
      setIsOpen(false);
      setNewEmployee({
        fullName: '',
        skills: [],
        yearsOfExperience: 0,
        projectIds: [],
        email: '',
        phone: '',
        bio: '',
        totalHoursWorked: 0,
        reportsSubmitted: 0,
        projectsInvolved: 0,
      });
    } catch (err) {
      console.error('Form Submission Error:', err);
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
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Створити нового працівника">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
              setNewEmployee({
                ...newEmployee,
                skills: values,
              })
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
            value={newEmployee.phone || ''}
            onChange={handleInputChange}
            type="tel"
          />
          <FormField
            label="Біографія:"
            name="bio"
            value={newEmployee.bio || ''}
            onChange={handleInputChange}
            textarea
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            {isSubmitting ? 'Створення...' : 'Створити'}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default CreateEmployeeForm;