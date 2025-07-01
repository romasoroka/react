import { Link } from "react-router-dom";
import { Employee, Project } from "../../../types/Models";

interface Props {
  project: Project;
  employees: Employee[];
}

const ProjectTeamTab = ({ project, employees }: Props) => {
  const team = project.employeeIds.map((employeeId) => {
    const emp = employees.find((e) => e.id === employeeId);
    return {
      name: emp?.fullName || "Невідомий",
      id: emp?.id,
      imageUrl: emp?.imageUrl,
    };
  });

  return (
    <div className="flex flex-col rounded-lg animate-slideIn bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
      {team.length > 0 ? (
        team.map((member, index) => (
          <Link
            key={index}
            to={member.id ? `/employees/${member.id}` : "#"}
            className="flex items-center gap-3 p-2 rounded-lg bg-white/50 hover:bg-gray-100/80 dark:bg-gray-800 dark:hover:bg-gray-700/80 transition-colors"
          >
            {member.imageUrl ? (
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs text-white dark:text-gray-200 font-bold">
                {member.name[0]}
              </div>
            )}
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              {member.name}
            </span>
          </Link>
        ))
      ) : (
        <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 text-sm text-gray-600 dark:text-gray-300">
          Немає членів команди
        </div>
      )}
    </div>
  );
};

export default ProjectTeamTab;
