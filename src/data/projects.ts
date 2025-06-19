import { Project } from '../types';

export const initialProjects: Project[] = [
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