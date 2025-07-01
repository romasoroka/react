import { Project } from "../../../types/Models";
import InfoCard from "../../../components/ui/InfoCard";

interface Props {
  project: Project;
}

const ProjectAnalyticsTab = ({ project }: Props) => {
  const teamMembers = project.employeeIds.length;
  const credentialsCount = project.credentials?.length ?? 0;
  const avgHoursPerMember =
    teamMembers > 0 ? (project.totalHoursLogged / teamMembers).toFixed(2) : "0";

  const formattedStartDate = new Date(project.startDate).toLocaleDateString(
    "uk-UA",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );

  return (
    <div className="flex flex-col animate-slideIn">
      <div className="grid m-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <InfoCard
          value={project.totalHoursLogged}
          label="Годин відпрацьовано"
        />
        <InfoCard value={teamMembers} label="Членів команди" />
        <InfoCard value={project.reportCount} label="Звіти" />
        <InfoCard value={credentialsCount} label="Облікові дані" />
        <InfoCard value={avgHoursPerMember} label="Середні години/учасник" />
        <InfoCard value={formattedStartDate} label="Дата початку" />
      </div>
    </div>
  );
};

export default ProjectAnalyticsTab;
