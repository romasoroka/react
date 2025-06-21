// components/Project/ProjectTabs/ProjectGeneralTab.tsx

import { Project } from '../../../types';

interface Props {
  project: Project;
}

const ProjectGeneralTab = ({ project }: Props) => {
  return (
    <div className="flex flex-col animate-slideIn">
          <div className="p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
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
          <div className="p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Опис:</span>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{project.detailedDescription}</p>
          </div>
          <div className="p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
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
          <div className="p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Дата початку:</span>
            <span className="text-sm text-gray-600 ml-2">{project.startDate}</span>
          </div>
          <div className="p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Дата завершення:</span>
            <span className="text-sm text-gray-600 ml-2">{project.endDate}</span>
          </div>
          <div className="p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Бюджет:</span>
            <span className="text-sm text-gray-600 ml-2">{project.budget}</span>
          </div>
          <div className="p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800">Клієнт:</span>
            <span className="text-sm text-gray-600 ml-2">{project.client}</span>
          </div>
        </div>
  );
};

export default ProjectGeneralTab;
