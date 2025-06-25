import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaBriefcase, FaUsers, FaClock, FaChartPie } from 'react-icons/fa';
import { useSidebarContext } from '../../context/SidebarContext'; 

const metrics = {
  activeProjects: 2,
  totalEmployees: 4,
  hoursLogged: 1480,
  completionRate: 78,
};

const activityData = [
  { date: '2025-06-17', hours: 120, tasks: 8 },
  { date: '2025-06-18', hours: 150, tasks: 10 },
  { date: '2025-06-19', hours: 100, tasks: 7 },
  { date: '2025-06-20', hours: 180, tasks: 12 },
  { date: '2025-06-21', hours: 160, tasks: 9 },
  { date: '2025-06-22', hours: 130, tasks: 6 },
  { date: '2025-06-23', hours: 140, tasks: 11 },
];

const activeProjects = [
  { id: 1, name: 'Project A', progress: 85, dueDate: '2025-07-15' },
  { id: 2, name: 'Project B', progress: 70, dueDate: '2025-08-01' },
];

const recentReports = [
  { id: 1, title: 'Weekly Progress', date: '2025-06-20', author: 'Roman' },
  { id: 2, title: 'Employee Review', date: '2025-06-18', author: 'Anna' },
];

const DashboardPage = () => {
  const { isCollapsed } = useSidebarContext(); 

  return (
    <div className={`space-y-6 ${isCollapsed ? 'pl-20' : ''}`}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Активні проєкти"
          value={metrics.activeProjects}
          icon={(FaBriefcase as any)({ className: 'text-blue-500', size: 24 })}
        />
        <MetricCard
          title="Кількість робочих"
          value={metrics.totalEmployees}
          icon={(FaUsers as any)({ className: 'text-green-500', size: 24 })}
        />
        <MetricCard
          title="Годин зареєстровано"
          value={metrics.hoursLogged.toLocaleString()}
          icon={(FaClock as any)({ className: 'text-yellow-500', size: 24 })}
        />
        <MetricCard
          title="Конкурентна ставка"
          value={`${metrics.completionRate}%`}
          icon={(FaChartPie as any)({ className: 'text-purple-500', size: 24 })}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Активність (останні 7 днів)
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    color: '#f3f4f6',
                  }}
                />
                <Bar dataKey="hours" fill="#3b82f6" name="Годин зареєстровано" />
                <Bar dataKey="tasks" fill="#10b981" name="Завдань виконано" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm max-w-md max-h-60 overflow-y-auto">
            <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">
              Активні проєкти
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Проєкт
                    </th>
                    <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Прогрес
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-600">
                  {activeProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-3 py-1.5 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        {project.name}
                      </td>
                      <td className="px-3 py-1.5 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                        <div className="w-14 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                          <div
                            className="bg-blue-500 h-1.5 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium">{project.progress}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm max-w-md max-h-60 overflow-y-auto">
            <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">
              Недавні репорти
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Назва
                    </th>
                    <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Дата
                    </th>
                    <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Автор
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-600">
                  {recentReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-3 py-1.5 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        {report.title}
                      </td>
                      <td className="px-3 py-1.5 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {report.date}
                      </td>
                      <td className="px-3 py-1.5 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {report.author}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, icon }: { title: string; value: string | number; icon: any }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center gap-4">
      <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">{icon}</div>
      <div>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{value}</p>
      </div>
    </div>
  );
};

export default DashboardPage;