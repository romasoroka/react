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
    credentials: [
      {
        name: 'Username/Password',
        value: 'securePass123',
        description: 'Admin account for backend dashboard',
      },
      {
        name: 'API Key',
        value: 'sk_test_123456789',
        description: 'Stripe payment integration',
      },
    ],
    analytics: {
      hoursLogged: 320,
      reports: 1,
    },
  },
  {
    id: 2,
    name: 'AI Chatbot',
    status: 'In Progress',
    technologies: ['Python', 'TensorFlow', 'Next.js'],
    description: 'Чат-бот із підтримкою NLP для клієнтської підтримки.',
    programmers: ['Дмитро Шевченко', 'Олена Литвин'],
    startDate: '2025-03-01',
    endDate: '2025-09-15',
    budget: '$30,000',
    client: 'TechSupport Ltd.',
    detailedDescription:
      'Розробка чат-бота з інтеграцією NLP для автоматизації клієнтської підтримки, з можливістю інтеграції з CRM-системами.',
    credentials: [
      {
        name: 'Database URL',
        value: 'mongodb://localhost:27017/chatbot',
      },
    ],
    analytics: {
      hoursLogged: 200,
      reports: 2,
    },
  },
];