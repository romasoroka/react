import { useState } from 'react';
import Modal from '../ui/Modal';
import FormField from '../ui/FormField';
import { Employee } from '../../types';

interface CreateEmployeeFormProps {
  onCreate: (employee: Employee) => void;
}

const CreateEmployeeForm = ({ onCreate }: CreateEmployeeFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    skills: '',
    experience: '',
    projects: '',
    email: '',
    phone: '',
    bio: '',
    hoursWorked: '',
    reportsSubmitted: '',
    projectsInvolved: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const employee: Employee = {
      id: Math.random(), // Replace with proper ID generation
      name: newEmployee.name,
      position: newEmployee.position,
      skills: newEmployee.skills.split(',').map((s) => s.trim()),
      experience: newEmployee.experience,
      projects: newEmployee.projects.split(',').map((p) => p.trim()),
      email: newEmployee.email,
      phone: newEmployee.phone,
      bio: newEmployee.bio,
      stats: {
        hoursWorked: Number(newEmployee.hoursWorked) || 0,
        reportsSubmitted: Number(newEmployee.reportsSubmitted) || 0,
        projectsInvolved: Number(newEmployee.projectsInvolved) || 0,
      },
    };
    onCreate(employee);
    setIsOpen(false);
    setNewEmployee({
      name: '',
      position: '',
      skills: '',
      experience: '',
      projects: '',
      email: '',
      phone: '',
      bio: '',
      hoursWorked: '',
      reportsSubmitted: '',
      projectsInvolved: '',
    });
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
          <FormField
            label="Навички (через кому):"
            name="skills"
            value={newEmployee.skills}
            onChange={handleInputChange}
            placeholder="React, TypeScript"
          />
          <FormField
            label="Досвід:"
            name="experience"
            value={newEmployee.experience}
            onChange={handleInputChange}
            placeholder="5 years"
          />
          <FormField
            label="Проєкти (через кому):"
            name="projects"
            value={newEmployee.projects}
            onChange={handleInputChange}
            placeholder="E-Commerce Platform"
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
            label="Біо:"
            name="bio"
            value={newEmployee.bio}
            onChange={handleInputChange}
            textarea
          />
          <FormField
            label="Загальні години:"
            name="hoursWorked"
            value={newEmployee.hoursWorked}
            onChange={handleInputChange}
            type="number"
            placeholder="40"
          />
          <FormField
            label="Звіти подано:"
            name="reportsSubmitted"
            value={newEmployee.reportsSubmitted}
            onChange={handleInputChange}
            type="number"
            placeholder="1"
          />
          <FormField
            label="Проєктів залучено:"
            name="projectsInvolved"
            value={newEmployee.projectsInvolved}
            onChange={handleInputChange}
            type="number"
            placeholder="1"
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