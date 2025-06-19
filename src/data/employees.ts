import { Employee } from '../types';

export const initialEmployees: Employee[] = [
  {
    id: 1,
    name: 'Олег Петренко',
    position: 'Frontend Developer',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    experience: '5 years',
    projects: ['E-Commerce Platform'],
    email: 'oleg.petrenko@example.com',
    phone: '+380 123 456 789',
    bio: 'Experienced frontend developer with a passion for building user-friendly interfaces.',
    stats: {
      hoursWorked: 40,
      reportsSubmitted: 1,
      projectsInvolved: 1,
    },
  },
  {
    id: 2,
    name: 'Марія Іванова',
    position: 'Backend Developer',
    skills: ['Node.js', 'MongoDB', 'Express'],
    experience: '4 years',
    projects: ['E-Commerce Platform'],
    email: 'maria.ivanova@example.com',
    phone: '+380 987 654 321',
    bio: 'Skilled backend developer specializing in scalable APIs.',
    stats: {
      hoursWorked: 35,
      reportsSubmitted: 2,
      projectsInvolved: 1,
    },
  },
  {
    id: 3,
    name: 'Дмитро Шевченко',
    position: 'AI Engineer',
    skills: ['Python', 'TensorFlow', 'NLP'],
    experience: '3 years',
    projects: ['AI Chatbot'],
    email: 'dmytro.shevchenko@example.com',
    phone: '+380 456 789 123',
    bio: 'AI enthusiast with expertise in natural language processing.',
    stats: {
      hoursWorked: 45,
      reportsSubmitted: 0,
      projectsInvolved: 1,
    },
  },
];