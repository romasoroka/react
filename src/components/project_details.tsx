import { useParams, Link } from 'react-router-dom';

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

// Temporary data store (replace with API or Context in production)
const projects: Project[] = [
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

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === Number(id));

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto p-8 md:p-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 md:text-2xl">
          Проєкт не знайдено
        </h2>
        <Link to="/projects" className="text-blue-600 hover:underline text-sm">
          Повернутися до проєктів
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl md:p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-200 pb-2 md:text-2xl">
        {project.name}
      </h2>
      <div className="flex flex-col gap-4">
        <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
          <span className="text-sm font-semibold text-gray-800">Статус:</span>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ml-2 ${
              project.status === 'Active'
                ? 'bg-green-100 text-green-600'
                : project.status === 'In Progress'
                ? 'bg-yellow-100 text-yellow-600'
                : 'bg-indigo-100 text-indigo-600'
            }`}
          >
            {project.status}
          </span>
        </div>
        <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
          <span className="text-sm font-semibold text-gray-800">Опис:</span>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            {project.detailedDescription}
          </p>
        </div>
        <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
          <span className="text-sm font-semibold text-gray-800">Технології:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
          <span className="text-sm font-semibold text-gray-800">Команда:</span>
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
        </div>
        <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
          <span className="text-sm font-semibold text-gray-800">Дата початку:</span>
          <span className="text-sm text-gray-600 ml-2">{project.startDate}</span>
        </div>
        <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
          <span className="text-sm font-semibold text-gray-800">Дата завершення:</span>
          <span className="text-sm text-gray-600 ml-2">{project.endDate}</span>
        </div>
        <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
          <span className="text-sm font-semibold text-gray-800">Бюджет:</span>
          <span className="text-sm text-gray-600 ml-2">{project.budget}</span>
        </div>
        <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
          <span className="text-sm font-semibold text-gray-800">Клієнт:</span>
          <span className="text-sm text-gray-600 ml-2">{project.client}</span>
        </div>
      </div>
      <Link
        to="/projects"
        className="inline-block mt-6 text-blue-600 hover:underline text-sm"
      >
        Повернутися до проєктів
      </Link>
    </div>
  );
};

export default ProjectDetails;