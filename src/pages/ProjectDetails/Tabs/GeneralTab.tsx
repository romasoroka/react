import { Project } from "../../../types/Models";

interface Props {
  project: Project;
}

const ProjectGeneralTab = ({ project }: Props) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col animate-slideIn">
      <div className="p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 dark:bg-gray-800 dark:hover:bg-gray-700/80 transition-colors">
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          Статус:
        </span>
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ml-2 ${
            project.status === 0
              ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
              : project.status === 1
              ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
              : project.status === 2
              ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
              : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
          }`}
        >
          {project.status === 0
            ? "Active"
            : project.status === 1
            ? "Completed"
            : project.status === 2
            ? "OnHold"
            : "Cancelled"}
        </span>
      </div>
      <div className="p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 dark:bg-gray-800 dark:hover:bg-gray-700/80 transition-colors">
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          Опис:
        </span>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
          {project.description}
        </p>
      </div>
      <div className="p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 dark:bg-gray-800 dark:hover:bg-gray-700/80 transition-colors">
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          Технології:
        </span>
        <div className="flex flex-wrap gap-2 mt-2">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 dark:bg-gray-800 dark:hover:bg-gray-700/80 transition-colors">
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          Дата початку:
        </span>
        <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
          {formatDate(project.startDate)}
        </span>
      </div>
      <div className="p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 dark:bg-gray-800 dark:hover:bg-gray-700/80 transition-colors">
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          Дата завершення:
        </span>
        <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
          {project.endDate ? formatDate(project.endDate) : "Не вказано"}
        </span>
      </div>
      <div className="p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 dark:bg-gray-800 dark:hover:bg-gray-700/80 transition-colors">
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          Бюджет:
        </span>
        <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
          {project.budget || "Не вказано"}
        </span>
      </div>
      <div className="p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 dark:bg-gray-800 dark:hover:bg-gray-700/80 transition-colors">
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          Клієнт:
        </span>
        <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
          {project.client || "Не вказано"}
        </span>
      </div>
    </div>
  );
};

export default ProjectGeneralTab;
