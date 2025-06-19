import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

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

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    <div className="max-w-6xl mx-auto p-8 md:p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2 md:text-2xl">
        👥 Employees
      </h2>
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold mb-6 hover:bg-blue-700 transition-colors"
        onClick={openCreateModal}
      >
        Додати програміста
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
            onClick={() => openModal(employee)}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{employee.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{employee.position}</p>
            <div className="flex flex-wrap gap-2">
              {employee.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-indigo-100 to-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold hover:scale-105 transition-transform"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedEmployee && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1000] animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-10 w-[90%] max-w-[650px] max-h-[85vh] overflow-y-auto shadow-2xl relative animate-slideIn md:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-5 right-5 bg-gray-100 text-gray-600 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
              onClick={closeModal}
            >
              {(FaTimes as any)({ size: 20 })}
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-gray-200 pb-2 md:text-xl">
              {selectedEmployee.name}
            </h2>
            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
                <span className="text-sm font-semibold text-gray-800">Посада:</span>
                <span className="text-sm text-gray-600 ml-2">{selectedEmployee.position}</span>
              </div>
              <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
                <span className="text-sm font-semibold text-gray-800">Біографія:</span>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{selectedEmployee.bio}</p>
              </div>
              <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
                <span className="text-sm font-semibold text-gray-800">Навички:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedEmployee.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-indigo-100 to-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold hover:scale-105 transition-transform"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
                <span className="text-sm font-semibold text-gray-800">Досвід:</span>
                <span className="text-sm text-gray-600 ml-2">{selectedEmployee.experience}</span>
              </div>
              <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
                <span className="text-sm font-semibold text-gray-800">Проєкти:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedEmployee.projects.map((project, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold"
                    >
                      {project}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
                <span className="text-sm font-semibold text-gray-800">Email:</span>
                <span className="text-sm text-gray-600 ml-2">{selectedEmployee.email}</span>
              </div>
              <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
                <span className="text-sm font-semibold text-gray-800">Телефон:</span>
                <span className="text-sm text-gray-600 ml-2">{selectedEmployee.phone}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1000] animate-fadeIn"
          onClick={closeCreateModal}
        >
          <div
            className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-10 w-[90%] max-w-[650px] max-h-[85vh] overflow-y-auto shadow-2xl relative animate-slideIn md:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-5 right-5 bg-gray-100 text-gray-600 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
              onClick={closeCreateModal}
            >
              {(FaTimes as any)({ size: 20 })}
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-gray-200 pb-2 md:text-xl">
              Додати нового програміста
            </h2>
            <form onSubmit={createEmployee} className="flex flex-col gap-2">
              <div className="flex flex-col gap-2 p-3 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
                <label className="text-sm font-semibold text-gray-800">Ім’я:</label>
                <input
                  name="name"
                  value={newEmployee.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-200 rounded-md text-sm text-gray-600 focus:border-blue-600 outline-none"
                />
              </div>
              <div className="flex flex-col gap-2 p-3 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
                <label className="text-sm font-semibold text-gray-800">Посада:</label>
                <input
                  name="position"
                  value={newEmployee.position}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-md text-sm text-gray-600 focus:border-blue-600 outline-none"
                />
              </div>
              <div className="flex flex-col gap-2 p-3 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
                <label className="text-sm font-semibold text-gray-800">Навички (через кому):</label>
                <input
                  name="skills"
                  value={newEmployee.skills}
                  onChange={handleInputChange}
                  placeholder="React, TypeScript"
                  className="w-full p-2 border border-gray-200 rounded-md text-sm text-gray-600 focus:border-blue-600 outline-none"
                />
              </div>
              <div className="flex flex-col gap-2 p-3 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
                <label className="text-sm font-semibold text-gray-800">Досвід:</label>
                <input
                  name="experience"
                  value={newEmployee.experience}
                  onChange={handleInputChange}
                  placeholder="5 років"
                  className="w-full p-2 border border-gray-200 rounded-md text-sm text-gray-600 focus:border-blue-600 outline-none"
                />
              </div>
              <div className="flex flex-col gap-2 p-3 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
                <label className="text-sm font-semibold text-gray-800">Проєкти (через кому):</label>
                <input
                  name="projects"
                  value={newEmployee.projects}
                  onChange={handleInputChange}
                  placeholder="E-Commerce Platform"
                  className="w-full p-2 border border-gray-200 rounded-md text-sm text-gray-600 focus:border-blue-600 outline-none"
                />
              </div>
              <div className="flex flex-col gap-2 p-3 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
                <label className="text-sm font-semibold text-gray-800">Email:</label>
                <input
                  name="email"
                  value={newEmployee.email}
                  onChange={handleInputChange}
                  type="email"
                  className="w-full p-2 border border-gray-200 rounded-md text-sm text-gray-600 focus:border-blue-600 outline-none"
                />
              </div>
              <div className="flex flex-col gap-2 p-3 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
                <label className="text-sm font-semibold text-gray-800">Телефон:</label>
                <input
                  name="phone"
                  value={newEmployee.phone}
                  onChange={handleInputChange}
                  type="tel"
                  className="w-full p-2 border border-gray-200 rounded-md text-sm text-gray-600 focus:border-blue-600 outline-none"
                />
              </div>
              <div className="flex flex-col gap-2 p-3 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
                <label className="text-sm font-semibold text-gray-800">Біографія:</label>
                <textarea
                  name="bio"
                  value={newEmployee.bio}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-md text-sm text-gray-600 focus:border-blue-600 outline-none h-20"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
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