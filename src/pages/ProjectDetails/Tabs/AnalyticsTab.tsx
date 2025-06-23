import { Project } from '../../../types';

interface Props {
  project: Project;
}

const ProjectAnalyticsTab = ({ project }: Props) => {
  const teamMembers = project.programmers.length;
  const credentialsCount = project.credentials?.length ?? 0;
  const avgHoursPerMember =
    teamMembers > 0 ? (project.analytics.hoursLogged / teamMembers).toFixed(2) : '0';

  const formattedStartDate = new Date(project.startDate).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col animate-slideIn">
      <div className="grid m-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-2 rounded-lg bg-blue-50 dark:bg-gray-700 text-center">
          <span className="text-2xl font-bold text-blue-600 ">{project.analytics.hoursLogged}</span>
          <p className="text-sm text-gray-600 dark:text-blue-100">Годин відпрацьовано</p>
        </div>
        <div className="p-2 rounded-lg bg-blue-50 dark:bg-gray-700 text-center">
          <span className="text-2xl font-bold text-blue-600">{teamMembers}</span>
          <p className="text-sm text-gray-600 dark:text-blue-100">Членів команди</p>
        </div>
        <div className="p-2 rounded-lg bg-blue-50 dark:bg-gray-700 text-center">
          <span className="text-2xl font-bold text-blue-600">{project.analytics.reports}</span>
          <p className="text-sm text-gray-600 dark:text-blue-100">Звіти</p>
        </div>
        <div className="p-2 rounded-lg bg-blue-50 dark:bg-gray-700 text-center">
          <span className="text-2xl font-bold text-blue-600">{credentialsCount}</span>
          <p className="text-sm text-gray-600 dark:text-blue-100">Облікові дані</p>
        </div>
        <div className="p-2 rounded-lg bg-blue-50 dark:bg-gray-700 text-center">
          <span className="text-2xl font-bold text-blue-600">{avgHoursPerMember}</span>
          <p className="text-sm text-gray-600 dark:text-blue-100">Середні години/учасник</p>
        </div>
        <div className="p-2 rounded-lg bg-blue-50 dark:bg-gray-700 text-center">
          <span className="text-2xl font-bold text-blue-600">{formattedStartDate}</span>
          <p className="text-sm text-gray-600 dark:text-blue-100">Дата початку</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectAnalyticsTab;
