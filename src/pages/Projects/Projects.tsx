import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import ProjectList from './ProjectList';
import CreateProjectForm from './CreateProject';
import { useAppContext } from '../../context/AppContext';

const Projects = () => {
  const { projects, addProject } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-8 md:p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2 md:text-2xl">
        💼 Projects
      </h2>
      <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm mb-8 max-w-md w-full md:max-w-full">
        {(FaSearch as any)({ className: 'text-gray-500' })}
        <input
          type="text"
          placeholder="Пошук проєктів за назвою..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 border-none outline-none text-sm text-gray-600 placeholder-gray-400"
        />
      </div>
      <CreateProjectForm onCreate={addProject} />
      <ProjectList projects={filteredProjects} />
    </div>
  );
};

export default Projects;