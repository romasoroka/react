import { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import './projects.css';

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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    <div className="projects-page">
      <h2 className="page-title">💼 Projects</h2>
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Пошук проєктів за назвою..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <button className="create-project-button" onClick={openCreateModal}>
        Створити проєкт
      </button>
      <div className="projects-grid">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div key={project.id} className="project-card" onClick={() => openModal(project)}>
              <h3 className="project-title">{project.name}</h3>
              <p className="project-description">{project.description}</p>
              <span className={`project-status status-${project.status.toLowerCase().replace(' ', '-')}`}>
                {project.status}
              </span>
              <div className="project-technologies">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="project-programmers">
                {project.programmers.map((programmer, index) => (
                  <span key={index} className="programmer-tag">
                    {programmer}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">Проєктів не знайдено</p>
        )}
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <FaTimes size={20} />
            </button>
            <h2 className="modal-title">{selectedProject.name}</h2>
            <div className="modal-section">
              <span className="modal-label">Статус:</span>
              <span className={`project-status status-${selectedProject.status.toLowerCase().replace(' ', '-')}`}>
                {selectedProject.status}
              </span>
            </div>
            <div className="modal-section">
              <span className="modal-label">Опис:</span>
              <p className="modal-description">{selectedProject.detailedDescription}</p>
            </div>
            <div className="modal-section">
              <span className="modal-label">Технології:</span>
              <div className="modal-technologies">
                {selectedProject.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="modal-section">
              <span className="modal-label">Команда:</span>
              <div className="modal-programmers">
                {selectedProject.programmers.map((programmer, index) => (
                  <span key={index} className="programmer-tag">
                    {programmer}
                  </span>
                ))}
              </div>
            </div>
            <div className="modal-section">
              <span className="modal-label">Дата початку:</span>
              <span>{selectedProject.startDate}</span>
            </div>
            <div className="modal-section">
              <span className="modal-label">Дата завершення:</span>
              <span>{selectedProject.endDate}</span>
            </div>
            <div className="modal-section">
              <span className="modal-label">Бюджет:</span>
              <span>{selectedProject.budget}</span>
            </div>
            <div className="modal-section">
              <span className="modal-label">Клієнт:</span>
              <span>{selectedProject.client}</span>
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
            <h2 className="modal-title">Створити новий проєкт</h2>
            <form onSubmit={createProject} className="create-form">
              <div className="modal-section">
                <label className="modal-label">Назва:</label>
                <input
                  name="name"
                  value={newProject.name}
                  onChange={handleInputChange}
                  required
                  className="modal-input"
                />
              </div>
              <div className="modal-section">
                <label className="modal-label">Статус:</label>
                <select
                  name="status"
                  value={newProject.status}
                  onChange={handleInputChange}
                  className="modal-input"
                >
                  <option value="Active">Active</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="modal-section">
                <label className="modal-label">Технології (через кому):</label>
                <input
                  name="technologies"
                  value={newProject.technologies}
                  onChange={handleInputChange}
                  placeholder="React, TypeScript"
                  className="modal-input"
                />
              </div>
              <div className="modal-section">
                <label className="modal-label">Короткий опис:</label>
                <textarea
                  name="description"
                  value={newProject.description}
                  onChange={handleInputChange}
                  className="modal-textarea"
                />
              </div>
              <div className="modal-section">
                <label className="modal-label">Програмісти (через кому):</label>
                <input
                  name="programmers"
                  value={newProject.programmers}
                  onChange={handleInputChange}
                  placeholder="Олег Петренко, Марія Іванова"
                  className="modal-input"
                />
              </div>
              <div className="modal-section">
                <label className="modal-label">Дата початку:</label>
                <input
                  name="startDate"
                  type="date"
                  value={newProject.startDate}
                  onChange={handleInputChange}
                  className="modal-input"
                />
              </div>
              <div className="modal-section">
                <label className="modal-label">Дата завершення:</label>
                <input
                  name="endDate"
                  type="date"
                  value={newProject.endDate}
                  onChange={handleInputChange}
                  className="modal-input"
                />
              </div>
              <div className="modal-section">
                <label className="modal-label">Бюджет:</label>
                <input
                  name="budget"
                  value={newProject.budget}
                  onChange={handleInputChange}
                  placeholder="$50,000"
                  className="modal-input"
                />
              </div>
              <div className="modal-section">
                <label className="modal-label">Клієнт:</label>
                <input
                  name="client"
                  value={newProject.client}
                  onChange={handleInputChange}
                  className="modal-input"
                />
              </div>
              <div className="modal-section">
                <label className="modal-label">Детальний опис:</label>
                <textarea
                  name="detailedDescription"
                  value={newProject.detailedDescription}
                  onChange={handleInputChange}
                  className="modal-textarea"
                />
              </div>
              <button type="submit" className="submit-button">
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