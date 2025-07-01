import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Employee,
  Project,
  WorkSession,
  ProjectStatus,
} from "../../types/Models";
import { useWorkSessionContext } from "../../context/WorkSessionContext";
import { useEmployeeContext } from "../../context/EmployeeContext";
import { useProjectContext } from "../../context/ProjectContext";
import Modal from "../../components/ui/Modal";
import FormField from "../../components/ui/FormField";
import { formatYears } from "../../components/utils/formatDate";
import InfoCard from "../../components/ui/InfoCard";

interface EmployeeDetailsTabsProps {
  employee: Employee;
  projects: Project[];
}

const EmployeeDetailsTabs = ({
  employee,
  projects,
}: EmployeeDetailsTabsProps) => {
  const { workSessions, addWorkSession, loadWorkSessions } =
    useWorkSessionContext();
  const { updateEmployee } = useEmployeeContext();
  const { updateProject } = useProjectContext();
  const [activeTab, setActiveTab] = useState("general");
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [isAddSessionModalOpen, setIsAddSessionModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<WorkSession | null>(
    null
  );
  const [newSession, setNewSession] = useState({
    date: "",
    projectId: "",
    startTime: "",
    endTime: "",
    taskDescription: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Loading work sessions for employee:", employee.id);
    loadWorkSessions();
  }, [loadWorkSessions, employee.id]);

  const assignedProjects = projects.filter((p) =>
    employee.projectIds.includes(p.id!)
  );
  const employeeSessions = workSessions.filter(
    (ws: WorkSession) => ws.employeeId === employee.id
  );

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime())
      ? "Невалідна дата"
      : parsedDate.toLocaleDateString("uk-UA", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
  };

  const handleViewSession = (session: WorkSession) => {
    setSelectedSession(session);
    setIsSessionModalOpen(true);
  };

  const handleSessionChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewSession({ ...newSession, [name]: value });
  };

  const handleAddSession = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (
      !newSession.date ||
      !newSession.projectId ||
      !newSession.startTime ||
      !newSession.endTime
    ) {
      setError("Дата, проєкт, початковий і кінцевий час є обов’язковими");
      return;
    }

    const project = projects.find((p) => p.id === Number(newSession.projectId));
    if (!project) {
      setError("Проєкт не знайдений");
      return;
    }

    const session: Omit<WorkSession, "id"> = {
      date: newSession.date,
      projectId: Number(newSession.projectId),
      employeeId: employee.id ?? 0,
      startTime: newSession.startTime,
      endTime: newSession.endTime,
      taskDescription: newSession.taskDescription,
    };

    try {
      await addWorkSession(
        session,
        project,
        employee,
        async (updatedProject: Project) => {
          await updateProject(updatedProject.id!, updatedProject);
        },
        async (updatedEmployee: Employee) => {
          await updateEmployee(updatedEmployee.id!, updatedEmployee);
        }
      );
      await loadWorkSessions();
      setIsAddSessionModalOpen(false);
      setNewSession({
        date: "",
        projectId: "",
        startTime: "",
        endTime: "",
        taskDescription: "",
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : "Невідома помилка");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "general"
              ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
              : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("general")}
        >
          Загальна інформація
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "stats"
              ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
              : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("stats")}
        >
          Статистика роботи
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "projects"
              ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
              : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("projects")}
        >
          Проєкти
        </button>
      </div>

      {activeTab === "general" && (
        <div className="flex flex-col animate-slideIn">
          <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              Навички:
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {employee.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              Досвід:
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
              {formatYears(employee.yearsOfExperience)}
            </span>
          </div>
          <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              Email:
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
              {employee.email}
            </span>
          </div>
          <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              Телефон:
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
              {employee.phone || "Не вказано"}
            </span>
          </div>
          <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors">
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              Біо:
            </span>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
              {employee.bio || "Не вказано"}
            </p>
          </div>
        </div>
      )}

      {activeTab === "stats" && (
        <div className="flex flex-col gap-6 animate-slideIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoCard
              value={employee.totalHoursWorked}
              label="Загальні години"
            />
            <InfoCard value={employee.reportsSubmitted} label="Звіти подано" />
            <InfoCard
              value={employee.projectsInvolved}
              label="Проєктів залучено"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Останні робочі сесії
              </h3>
              <button
                onClick={() => setIsAddSessionModalOpen(true)}
                className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
              >
                Додати сесію
              </button>
            </div>
            {employeeSessions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
                      <th className="p-2 text-left">Дата</th>
                      <th className="p-2 text-left">Проєкт</th>
                      <th className="p-2 text-left">Час</th>
                      <th className="p-2 text-left">Опис</th>
                      <th className="p-2 text-left">Дія</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeSessions.map(
                      (session: WorkSession, index: number) => (
                        <tr
                          key={`${session.id}-${index}`}
                          className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        >
                          <td className="p-2">{formatDate(session.date)}</td>
                          <td className="p-2">
                            <Link
                              to={`/projects/${session.projectId}`}
                              className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              {projects.find((p) => p.id === session.projectId)
                                ?.name || "Невідомий"}
                            </Link>
                          </td>
                          <td className="p-2">{`${session.startTime} - ${session.endTime}`}</td>
                          <td className="p-2 truncate max-w-xs">
                            {session.taskDescription}
                          </td>
                          <td className="p-2">
                            <button
                              onClick={() => handleViewSession(session)}
                              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              Переглянути
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 text-sm text-gray-600 dark:text-gray-400">
                Немає робочих сесій
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "projects" && (
        <div className="flex flex-col animate-slideIn">
          {assignedProjects.length > 0 ? (
            assignedProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors flex justify-between items-center"
              >
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {project.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {project.description}
                  </p>
                </div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === ProjectStatus.Active
                      ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-200"
                      : project.status === ProjectStatus.Completed
                      ? "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200"
                      : project.status === ProjectStatus.OnHold
                      ? "bg-yellow-100 dark:bg-yellow-800 text-yellow-600 dark:text-yellow-200"
                      : "bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-200"
                  }`}
                >
                  {project.status}
                </span>
              </Link>
            ))
          ) : (
            <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 text-sm text-gray-600 dark:text-gray-400">
              Немає призначених проєктів
            </div>
          )}
        </div>
      )}

      {selectedSession && (
        <Modal
          isOpen={isSessionModalOpen}
          onClose={() => setIsSessionModalOpen(false)}
          title="Деталі робочої сесії"
        >
          <div className="flex flex-col gap-4">
            <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50">
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Дата:
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                {formatDate(selectedSession.date)}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50">
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Проєкт:
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                {projects.find((p) => p.id === selectedSession.projectId)
                  ?.name || "Невідомий"}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50">
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Час:
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{`${selectedSession.startTime} - ${selectedSession.endTime}`}</span>
            </div>
            <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50">
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Опис:
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                {selectedSession.taskDescription}
              </p>
            </div>
            <button
              onClick={() => setIsSessionModalOpen(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
            >
              Закрити
            </button>
          </div>
        </Modal>
      )}

      <Modal
        isOpen={isAddSessionModalOpen}
        onClose={() => setIsAddSessionModalOpen(false)}
        title="Додати робочу сесію"
      >
        <form onSubmit={handleAddSession} className="flex flex-col gap-4">
          {error && (
            <div className="mb-4 p-2 bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-200 rounded-lg text-sm">
              {error}
            </div>
          )}
          <FormField
            label="Дата:"
            name="date"
            value={newSession.date}
            onChange={handleSessionChange}
            type="date"
            required
          />
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              Проєкт:
            </label>
            <select
              name="projectId"
              value={newSession.projectId}
              onChange={handleSessionChange}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Виберіть проєкт</option>
              {assignedProjects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
          <FormField
            label="Початковий час:"
            name="startTime"
            value={newSession.startTime}
            onChange={handleSessionChange}
            type="time"
            required
          />
          <FormField
            label="Кінцевий час:"
            name="endTime"
            value={newSession.endTime}
            onChange={handleSessionChange}
            type="time"
            required
          />
          <FormField
            label="Опис:"
            name="taskDescription"
            value={newSession.taskDescription}
            onChange={handleSessionChange}
            textarea
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
          >
            Додати
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default EmployeeDetailsTabs;
