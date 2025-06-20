import { Employee } from '../types';

export const initialEmployees: Employee[] = [
  {
    id: 1,
    name: 'Олег Петренко',
    image: 'https://ui-avatars.com/api/?name=Олег+Петренко&background=0D8ABC&color=fff',
    position: 'Frontend Developer',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    experience: 5,
    projects: ['E-Commerce Platform'],
    email: 'oleg.petrenko@example.com',
    phone: '+380 123 456 789',
    bio: 'Experienced frontend developer with a passion for building user-friendly interfaces.',
    stats: {
      hoursWorked: 40,
      reportsSubmitted: 1,
      projectsInvolved: 1,
    },
    recentWorkSessions: [
      {
        id: 1,
        date: '2024-06-14',
        project: 'Internal CRM System',
        hours: 8,
        description: 'Finished implementing JWT authentication. Next: role-based access control.',
      },
      {
        id: 2,
        date: '2024-06-13',
        project: 'E-Commerce Platform',
        hours: 6,
        description: 'Developed product listing page with pagination.',
      },
    ],
  },
  {
    id: 2,
    name: 'Марія Іванова',
    image: 'https://ui-avatars.com/api/?name=Марія+Іванова&background=0D8ABC&color=fff',
    position: 'Backend Developer',
    skills: ['Node.js', 'MongoDB', 'Express'],
    experience: 4,
    projects: ['E-Commerce Platform'],
    email: 'maria.ivanova@example.com',
    phone: '+380 987 654 321',
    bio: 'Skilled backend developer specializing in scalable APIs.',
    stats: {
      hoursWorked: 35,
      reportsSubmitted: 2,
      projectsInvolved: 1,
    },
    recentWorkSessions: [
      {
        id: 1,
        date: '2024-06-14',
        project: 'E-Commerce Platform',
        hours: 7,
        description: 'Optimized API endpoints for product search.',
      },
    ],
  },
  {
    id: 3,
    name: 'Дмитро Шевченко',
    image: 'https://ui-avatars.com/api/?name=Дмитро+Шевченко&background=0D8ABC&color=fff',
    position: 'AI Engineer',
    skills: ['Python', 'TensorFlow', 'NLP'],
    experience: 2,
    projects: ['AI Chatbot'],
    email: 'dmytro.shevchenko@example.com',
    phone: '+380 456 789 123',
    bio: 'AI enthusiast with expertise in natural language processing.',
    stats: {
      hoursWorked: 45,
      reportsSubmitted: 0,
      projectsInvolved: 1,
    },
    recentWorkSessions: [
      {
        id: 1,
        date: '2024-06-14',
        project: 'AI Chatbot',
        hours: 9,
        description: 'Trained NLP model for improved intent recognition.',
      },
    ],
  },
];