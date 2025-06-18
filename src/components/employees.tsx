import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './employees.css';


interface Employee {
  id: number;
  name: string;
  position: string;
  skills: string[];
  experience: string;
  projects: string[];
  email: string;
  phone: string;
  bio: string;
}

const initialEmployees: Employee[] = [
  {
    id: 1,
    name: 'Олег Петренко',
    position: 'Senior Full-Stack Developer',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    experience: '7 років',
    projects: ['E-Commerce Platform'],
    email: 'oleg.petrenko@example.com',
    phone: '+380 (67) 123-4567',
    bio: 'Олег — досвідчений розробник із фокусом на створення масштабованих веб-додатків. Спеціалізується на React і Node.js, має досвід управління командами.',
  },
  {
    id: 2,
    name: 'Марія Іванова',
    position: 'Frontend Developer',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    experience: '4 роки',
    projects: ['E-Commerce Platform'],
    email: 'maria.ivanova@example.com',
    phone: '+380 (50) 987-6543',
    bio: 'Марія створює сучасні та адаптивні інтерфейси користувача. Вона захоплюється UI/UX і має сильні навички в TypeScript.',
  },
  {
    id: 3,
    name: 'Дмитро Шевченко',
    position: 'AI Engineer',
    skills: ['Python', 'TensorFlow', 'Next.js'],
    experience: '5 років',
    projects: ['AI Chatbot'],
    email: 'dmytro.shevchenko@example.com',
    phone: '+380 (93) 555-7890',
    bio: 'Дмитро спеціалізується на розробці AI-рішень, зокрема чат-ботів із підтримкою NLP. Має досвід інтеграції AI з веб-додатками.',
  },
  {
    id: 4,
    name: 'Олена Литвин',
    position: 'Backend Developer',
    skills: ['Python', 'Django', 'PostgreSQL'],
    experience: '6 років',
    projects: ['AI Chatbot'],
    email: 'olena.lytvyn@example.com',
    phone: '+380 (98) 222-3333',
    bio: 'Олена — експерт із серверної розробки, зосереджена на створенні надійних API та оптимізації баз даних.',
  },
];

const Employees = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employees, setEmployees] = useState(initialEmployees);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    skills: '',
    experience: '',
    projects: '',
    email: '',
    phone: '',
    bio: '',
  });

  const openModal = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const closeModal = () => {
    setSelectedEmployee(null);
  };

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setNewEmployee({
      name: '',
      position: '',
      skills: '',
      experience: '',
      projects: '',
      email: '',
      phone: '',
      bio: '',
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const createEmployee = (event: React.FormEvent) => {
    event.preventDefault();
    const newId = employees.length + 1; 
    const employee: Employee = {
      id: newId,
      name: newEmployee.name,
      position: newEmployee.position,
      skills: newEmployee.skills.split(',').map((s) => s.trim()),
      experience: newEmployee.experience,
      projects: newEmployee.projects.split(',').map((p) => p.trim()),
      email: newEmployee.email,
      phone: newEmployee.phone,
      bio: newEmployee.bio,
    };
    setEmployees([...employees, employee]);
    closeCreateModal();
  };

  return (
    <div className="employees-page">
      <h2 className="page-title">👥 Employees</h2>
      <button className="create-employee-button" onClick={openCreateModal}>
        Додати програміста
      </button>
      <div className="employees-grid">
        {employees.map((employee) => (
          <div key={employee.id} className="employee-card" onClick={() => openModal(employee)}>
            <h3 className="employee-name">{employee.name}</h3>
            <p className="employee-position">{employee.position}</p>
            <div className="employee-skills">
              {employee.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Модальне вікно для деталей програміста */}
      {selectedEmployee && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <FaTimes size={20} />
            </button>
            <h2 className="modal-title">{selectedEmployee.name}</h2>
            <div className="modal-section">
              <span className="modal-label">Посада:</span>
              <span>{selectedEmployee.position}</span>
            </div>
            <div className="modal-section">
              <span className="modal-label">Біографія:</span>
              <p className="modal-bio">{selectedEmployee.bio}</p>
            </div>
            <div className="modal-section">
              <span className="modal-label">Навички:</span>
              <div className="modal-skills">
                {selectedEmployee.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="modal-section">
              <span className="modal-label">Досвід:</span>
              <span>{selectedEmployee.experience}</span>
            </div>
            <div className="modal-section">
              <span className="modal-label">Проєкти:</span>
              <div className="modal-projects">
                {selectedEmployee.projects.map((project, index) => (
                  <span key={index} className="project-tag">
                    {project}
                  </span>
                ))}
              </div>
            </div>
            <div className="modal-section">
              <span className="modal-label">Email:</span>
              <span>{selectedEmployee.email}</span>
            </div>
            <div className="modal-section">
              <span className="modal-label">Телефон:</span>
              <span>{selectedEmployee.phone}</span>
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="modal-overlay" onClick={closeCreateModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeCreateModal}>
              <FaTimes size={20} />
            </button>
            <h2 className="modal-title">Додати нового програміста</h2>
            <form onSubmit={createEmployee} className="create-form">
              <div className="modal-section">
                <label className="modal-label">Ім’я:</label>
                <input
                  name="name"
                  value={newEmployee.name}
                  onChange={handleInputChange}
                  required
                  className="modal-input"
                />
              </div>
              <div className="modal-section">
                <label className="modal-label">Посада:</label>
                <input
                  name="position"
                  value={newEmployee.position}
                  onChange={handleInputChange}
                  className="modal-input"
                />
              </div>
              <div className="modal-section">
                <label className="modal-label">Навички (через кому):</label>
                <input
                  name="skills"
                  value={newEmployee.skills}
                  onChange={handleInputChange}
                  placeholder="React, TypeScript"
                  className="modal-input"
                />
              </div>
              <div className="modal-section">
                <label className="modal-label">Досвід:</label>
                <input
                  name="experience"
                  value={newEmployee.experience}
                  onChange={handleInputChange}
                  placeholder="5 років"
                  className="modal-input"
                />
              </div>
              <div className="modal-section">
                <label className="modal-label">Проєкти (через кому):</label>
                <input
                  name="projects"
                  value={newEmployee.projects}
                  onChange={handleInputChange}
                  placeholder="E-Commerce Platform"
                  className="modal-input"
                />
              </div>
              <div className="modal-section">
                <label className="modal-label">Email:</label>
                <input
                  name="email"
                  value={newEmployee.email}
                  onChange={handleInputChange}
                  type="email"
                  className="modal-input"
                />
              </div>
              <div className="modal-section">
                <label className="modal-label">Телефон:</label>
                <input
                  name="phone"
                  value={newEmployee.phone}
                  onChange={handleInputChange}
                  type="tel"
                  className="modal-input"
                />
              </div>
              <div className="modal-section">
                <label className="modal-label">Біографія:</label>
                <textarea
                  name="bio"
                  value={newEmployee.bio}
                  onChange={handleInputChange}
                  className="modal-textarea"
                />
              </div>
              <button type="submit" className="submit-button">
                Додати
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;