import { useNavigate } from "react-router-dom";
import { Project } from "../../types/Models";
import Card from "../../components/ui/Card";

interface ProjectsProps {
  projects: Project[];
}

const Projects = ({ projects }: ProjectsProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card
          key={project.id}
          title={project.name}
          subtitle={project.description}
          tags={project.technologies}
          onClick={() => navigate(`/projects/${project.id}`)}
          tagGradient={true}
        />
      ))}
    </div>
  );
};

export default Projects;
