import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import { Project } from '../../types';

interface ProjectListProps {
  projects: Project[];
}

const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.length > 0 ? (
        projects.map((project) => (
          <Link key={project.id} to={`/projects/${project.id}`}>
            <Card
              title={project.name}
              subtitle={project.description}
              tags={project.technologies}
              tagGradient
            />
          </Link>
        ))
      ) : (
        <p className="text-gray-500 text-center col-span-3 mt-8 text-base">
          Проєктів не знайдено
        </p>
      )}
    </div>
  );
};

export default ProjectList;