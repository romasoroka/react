import { useState } from 'react';
import Select from 'react-select';
import SelectComponent from '../../components/ui/SelectComponents';
import Modal from '../../components/ui//Modal';
import FormField from '../../components/ui/FormField';
import { Employee, WorkSession } from '../../types';
import { techOptions } from '../../data/techOptions';

interface CreateEmployeeFormProps {
  onCreate: (employee: Employee) => void;
}

const CreateEmployeeForm = ({ onCreate }: CreateEmployeeFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    skills: '',
    experience: 0,
    projects: '',
    email: '',
    phone: '',
    bio: '',
    hoursWorked: '',
    reportsSubmitted: '',
    projectsInvolved: '',
  });
  const [workSessions, setWorkSessions] = useState<WorkSession[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
  
    setNewEmployee(prev => ({
      ...prev,
      [name]: name === 'experience' 
  ? (value === '' ? '' : Number(value))  
  : value,
    }));
  };
  



 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const employee: Employee = {
      id: Math.random(), 
      name: newEmployee.name,
      position: newEmployee.position,
      skills: newEmployee.skills.split(',').map((s) => s.trim()).filter(Boolean),
      experience: newEmployee.experience,
      projects: newEmployee.projects.split(',').map((p) => p.trim()).filter(Boolean),
      email: newEmployee.email,
      phone: newEmployee.phone,
      bio: newEmployee.bio,
      stats: {
        hoursWorked: Number(newEmployee.hoursWorked) || 0,
        reportsSubmitted: Number(newEmployee.reportsSubmitted) || 0,
        projectsInvolved: Number(newEmployee.projectsInvolved) || newEmployee.projects.split(',').filter(Boolean).length || 0,
      },
      recentWorkSessions: workSessions,
    };
    onCreate(employee);
    setIsOpen(false);
    setNewEmployee({
      name: '',
      position: '',
      skills: '',
      experience: 0,
      projects: '',
      email: '',
      phone: '',
      bio: '',
      hoursWorked: '',
      reportsSubmitted: '',
      projectsInvolved: '',
    });
    setWorkSessions([]);
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
            label="Ім’я:"
            name="name"
            value={newEmployee.name}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Посада:"
            name="position"
            value={newEmployee.position}
            onChange={handleInputChange}
            required
          />
           <SelectComponent
            label="Навички"
            options={techOptions}
            selected={newEmployee.skills.split(',').map(s => s.trim()).filter(Boolean)}
            onChange={(values) =>
              setNewEmployee({
                ...newEmployee,
                skills: values.join(', '),
              })
            }
          />

          <FormField
            label="Досвід:"
            name="experience"
            value={newEmployee.experience.toString()}
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
          />
          <FormField
            label="Телефон:"
            name="phone"
            value={newEmployee.phone}
            onChange={handleInputChange}
            type="tel"
          />
          <FormField
            label="Біографія:"
            name="bio"
            value={newEmployee.bio}
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

export default CreateEmployeeForm;