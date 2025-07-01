// ===== INITIAL DATA: Technologies, Employees, Projects =====

import { Project, ProjectStatus, Credential, Employee } from "../types/Models";

export type Option = {
  value: string;
  label: string;
};

// === Technologies ===
export const techOptions: Option[] = [
  { value: "React", label: "React" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "Node.js", label: "Node.js" },
  { value: "Express", label: "Express" },
  { value: "MongoDB", label: "MongoDB" },
  { value: "PostgreSQL", label: "PostgreSQL" },
  { value: "Docker", label: "Docker" },
  { value: "Kubernetes", label: "Kubernetes" },
  { value: "Azure", label: "Azure" },
  { value: "AWS", label: "AWS" },
];

// === Employees ===
export const initialEmployees: Employee[] = [
  {
    id: 1,
    fullName: "Іван Іванов",
    yearsOfExperience: 4,
    skills: ["React", "TypeScript", "Node.js"],
    email: "ivan.ivanov@example.com",
    totalHoursWorked: 1200,
    reportsSubmitted: 45,
    projectsInvolved: 3,
    projectIds: [1],
  },
  {
    id: 2,
    fullName: "Олена Петренко",
    yearsOfExperience: 3,
    skills: ["Figma", "Adobe XD"],
    email: "olena.petrenko@example.com",
    totalHoursWorked: 950,
    reportsSubmitted: 30,
    projectsInvolved: 2,
    projectIds: [1, 2],
  },
  {
    id: 3,
    fullName: "Андрій Сидоренко",
    yearsOfExperience: 6,
    skills: ["Agile", "Scrum", "Leadership"],
    email: "andriy.sydorenko@example.com",
    totalHoursWorked: 1500,
    reportsSubmitted: 60,
    projectsInvolved: 4,
    projectIds: [1],
  },
];

// === Projects ===
export const initialProjects: Project[] = [
  {
    id: 1,
    name: "CRM-система для продажів",
    status: ProjectStatus.Active,
    technologies: ["React", "Node.js", "MongoDB"],
    description: "Система для керування клієнтами та угодами.",
    detailedDescription:
      "Повноцінна CRM з інтеграцією e-mail, календаря та звітністю.",
    startDate: "2024-01-10T00:00:00Z",
    endDate: "2024-12-20T00:00:00Z",
    budget: 75000,
    client: 'ТОВ "Прогрес"',
    credentials: [
      {
        id: 1,
        name: "Admin Panel Login",
        value: "admin:password123",
        description: "Доступ до адміністративної панелі",
      },
    ],
    totalHoursLogged: 1200,
    reportCount: 30,
    activeEmployees: 3,
    employeeIds: [1, 2, 3],
    employeeNames: ["Іван Іванов", "Олена Петренко", "Андрій Сидоренко"],
  },
  {
    id: 2,
    name: "Маркетплейс туристичних послуг",
    status: ProjectStatus.OnHold,
    technologies: ["TypeScript", "PostgreSQL", "Docker"],
    description: "Платформа для бронювання турів, готелів і екскурсій.",
    detailedDescription:
      "Інтеграція з системами бронювання, онлайн-оплата, карта готелів.",
    startDate: "2024-03-01T00:00:00Z",
    budget: 50000,
    client: "TravelGo",
    credentials: [],
    totalHoursLogged: 300,
    reportCount: 10,
    activeEmployees: 1,
    employeeIds: [2],
    employeeNames: ["Олена Петренко"],
  },
];
