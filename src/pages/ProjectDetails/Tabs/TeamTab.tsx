import { Employee, Project } from '../../../types';

interface Props {
  project: Project;
  employees: Employee[];
}

const ProjectTeamTab = ({ project, employees }: Props) => {
  const team = project.programmers.map((name) => {
    const emp = employees.find((e) => e.name === name);
    return { name, id: emp?.id, image: emp?.image };
  });

  return (
    <div className="flex flex-col animate-slideIn">
    {team.length > 0 ? (
      team.map((member, index) => {
        const employee = employees.find((e) => e.id === member.id || e.name === member.name);
        return (
          <div
            key={index}
            className="flex items-center gap-3 p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors"
          >
            {employee?.image ? (
              <img
                src={employee.image}
                alt={member.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xs text-white font-bold">
                {member.name[0]}
              </div>
            )}  
              <span className="text-sm font-semibold text-gray-800">{member.name}</span>
          </div>
        );
      })
    ) : (
      <div className="p-2 rounded-lg bg-white/50 text-sm text-gray-600">
        Немає членів команди
      </div>
    )}
  </div>
  );
};

export default ProjectTeamTab;
