import { useParams, Link } from 'react-router-dom';
import ProjectDetailsTabs from './ProjectDetailsTab';
import { useAppContext } from '../../context/AppContext';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, employees } = useAppContext();
  const project = projects.find((p) => p.id === Number(id));

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto">
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
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-200 pb-2 md:text-2xl">
        {project.name}
      </h2>
      <ProjectDetailsTabs project={project} employees={employees} />
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