import { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Project {
  id: number;
  name: string;
  status: string;
  technologies: string[];
  description: string;
  programmers: string[];
  startDate: string;
  endDate: string;
  budget: string;
  client: string;
  detailedDescription: string;
}

const initialProjects: Project[] = [
  {
    id: 1,
    name: 'E-Commerce Platform',
    status: 'Active',
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    description: 'Онлайн-платформа для продажу товарів із сучасним дизайном.',
    programmers: ['Олег Петренко', 'Марія Іванова'],
    startDate: '2025-01-15',
    endDate: '2025-07-30',
    budget: '$50,000',
    client: 'ShopEasy Inc.',
    detailedDescription:
      'Цей проєкт спрямований на створення повнофункціональної платформи електронної комерції з підтримкою багатомовності, інтеграцією Stripe та PayPal, а також аналітикою для власників бізнесу.',
  },
  {
    id: 2,
    name: 'Task Management App',
    status: 'In Progress',
    technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
    description: 'Додаток для управління завданнями з командною роботою.',
    programmers: ['Ігор Сидоренко', 'Анна Коваленко', 'Павло Зайцев'],
    startDate: '2025-03-01',
    endDate: '2025-09-15',
    budget: '$30,000',
    client: 'TeamSync Ltd.',
    detailedDescription:
      'Додаток для управління завданнями з функціями Kanban-дошки, інтеграцією з Google Calendar та реальним часом для оновлення статусів завдань.',
  },
  {
    id: 3,
    name: 'AI Chatbot',
    status: 'Completed',
    technologies: ['Python', 'TensorFlow', 'Next.js'],
    description: 'Розумний чат-бот для автоматизації підтримки клієнтів.',
    programmers: ['Дмитро Шевченко', 'Олена Литвин'],
    startDate: '2024-06-01',
    endDate: '2024-12-20',
    budget: '$40,000',
    client: 'SmartTalk Co.',
    detailedDescription:
      'AI-чат-бот із підтримкою обробки природної мови (NLP) для автоматизації запитів клієнтів. Інтегрується з CRM-системами.',
  },
];

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState(initialProjects);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    status: 'Active',
    technologies: '',
    description: '',
    programmers: '',
    startDate: '',
    endDate: '',
    budget: '',
    client: '',
    detailedDescription: '',
  });

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openCreateModal = () => setShowCreateModal(true);

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setNewProject({
      name: '',
      status: 'Active',
      technologies: '',
      description: '',
      programmers: '',
      startDate: '',
      endDate: '',
      budget: '',
      client: '',
      detailedDescription: '',
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const createProject = (event: React.FormEvent) => {
    event.preventDefault();
    const newId = projects.length + 1;
    const project: Project = {
      id: newId,
      name: newProject.name,
      status: newProject.status,
      technologies: newProject.technologies.split(',').map((t) => t.trim()),
      description: newProject.description,
      programmers: newProject.programmers.split(',').map((p) => p.trim()),
      startDate: newProject.startDate,
      endDate: newProject.endDate,
      budget: newProject.budget,
      client: newProject.client,
      detailedDescription: newProject.detailedDescription,
    };
    setProjects([...projects, project]);
    closeCreateModal();
  };

  return (
    <div className="max-w-6xl mx-auto p-8 md:p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2 md:text-2xl">
        💼 Projects
      </h2>
      <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm mb-8 max-w-md w-full md:max-w-full">
        {(FaSearch as any)({ className: 'text-gray-500' })}
        <input
          type="text"
          placeholder="Пошук проєктів за назвою..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 border-none outline-none text-sm text-gray-600 placeholder-gray-400"
        />
      </div>
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold mb-6 hover:bg-blue-700 transition-colors"
        onClick={openCreateModal}
      >
        Створити проєкт
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{project.name}</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{project.description}</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  project.status === 'Active'
                    ? 'bg-green-100 text-green-600'
                    : project.status === 'In Progress'
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-indigo-100 text-indigo-600'
                }`}
              >
                {project.status}
              </span>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.programmers.map((programmer, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-indigo-100 to-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold hover:scale-105 transition-transform"
                  >
                    {programmer}
                  </span>
                ))}
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-3 mt-8 text-base">
            Проєктів не знайдено
          </p>
        )}
      </div>

      {showCreateModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] animate-fadeIn"
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
              Створити новий проєкт
            </h2>
            <form onSubmit={createProject} className="flex flex-col gap-2">
              <div className="flex flex-col gap-2 p-3 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
                <label className="text-sm font-semibold text-gray-800">Назва:</label>
                <input
                  name="name"
                  value={newProject.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-200 rounded-md text-sm text-gray-600 focus:border-blue-600 outline-none"
                />
              </div>
              <div className="flex flex-col gap-2 p-3 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
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
              <div className="flex flex-col gap-2 p-3 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
                <label className="text-sm font-semibold text-gray-800">Технології (через кому):</label>
                <input
                  name="technologies"
                  value={newProject.technologies}
                  onChange={handleInputChange}
                  placeholder="React, TypeScript"
                  className="w-full p-2 border border-gray-200 rounded-md text-sm text-gray-600 focus:border-blue-600 outline-none"
                />
              </div>
              <div className="flex flex-col gap-2 p-3 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
                <label className="text-sm font-semibold text-gray-800">Короткий опис:</label>
                <textarea
                  name="description"
                  value={newProject.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-md text-sm text-gray-600 focus:border-blue-600 outline-none h-20"
                />
              </div>
              <div className="flex flex-col gap-2 p-3 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
                <label className="text-sm font-semibold text-gray-800">Програмісти (через кому):</label>
                <input
                  name="programmers"
                  value={newProject.programmers}
                  onChange={handleInputChange}
                  placeholder="Олег Петренко, Марія Іванова"
                  className="w-full p-2 border border-gray-200 rounded-md text-sm text-gray-600 focus:border-blue-600 outline-none"
                />
              </div>
              <div className="flex flex-col gap-2 p-3 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
                <label className="text-sm font-semibold text-gray-800">Дата початку:</label>
                <input
                  name="startDate"
                  type="date"
                  value={newProject.startDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-md text-sm text-gray-600 focus:border-blue-600 outline-none"
                />
              </div>
              <div className="flex flex-col gap-2 p-3 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
                <label className="text-sm font-semibold text-gray-800">Дата завершення:</label>
                <input
                  name="endDate"
                  type="date"
                  value={newProject.endDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-md text-sm text-gray-600 focus:border-blue-600 outline-none"
                />
              </div>
              <div className="flex flex-col gap-2 p-3 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
                <label className="text-sm font-semibold text-gray-800">Бюджет:</label>
                <input
                  name="budget"
                  value={newProject.budget}
                  onChange={handleInputChange}
                  placeholder="$50,000"
                  className="w-full p-2 border border-gray-200 rounded-md text-sm text-gray-600 focus:border-blue-600 outline-none"
                />
              </div>
              <div className="flex flex-col gap-2 p-3 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
                <label className="text-sm font-semibold text-gray-800">Клієнт:</label>
                <input
                  name="client"
                  value={newProject.client}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-md text-sm text-gray-600 focus:border-blue-600 outline-none"
                />
              </div>
              <div className="flex flex-col gap-2 p-3 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
                <label className="text-sm font-semibold text-gray-800">Детальний опис:</label>
                <textarea
                  name="detailedDescription"
                  value={newProject.detailedDescription}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-md text-sm text-gray-600 focus:border-blue-600 outline-none h-20"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Створити
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;  