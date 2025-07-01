import { useParams } from "react-router-dom";
import ProjectDetailsTabs from "./ProjectDetailsTab";
import { useProjectContext } from "../../context/ProjectContext";
import { useEmployeeContext } from "../../context/EmployeeContext";
import { Project } from "../../types/Models";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { projects } = useProjectContext();
  const { employees } = useEmployeeContext();
  const project = projects.find((p: Project) => p.id === Number(id));

  if (!project) {
    return (
      <div className="mt-2 mx-auto bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 md:text-2xl">
          Проєкт не знайдено
        </h2>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 text-gray-800 dark:text-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b-2 border-gray-200 dark:border-gray-700 pb-2 md:text-2xl">
        {project.name}
      </h2>
      <ProjectDetailsTabs project={project} employees={employees} />
    </div>
  );
};

export default ProjectDetails;
