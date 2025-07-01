import { useState, lazy, Suspense } from "react";
import Modal from "../../components/ui/Modal";
import { Project, Employee, WorkSession } from "../../types/Models";
import { useProjectContext } from "../../context/ProjectContext";
import { useEmployeeContext } from "../../context/EmployeeContext";
import { useWorkSessionContext } from "../../context/WorkSessionContext";
import ProjectGeneralTab from "./Tabs/GeneralTab";
import ProjectTeamTab from "./Tabs/TeamTab";
import ProjectAnalyticsTab from "./Tabs/AnalyticsTab";
import ProjectSessionsTab from "./Tabs/SessionsTab";

const ProjectCredentialsTab = lazy(() => import("./Tabs/CredentialsTab"));

interface ProjectDetailsTabsProps {
  project: Project;
  employees: Employee[];
}

const ProjectDetailsTabs = ({
  project,
  employees,
}: ProjectDetailsTabsProps) => {
  const [activeTab, setActiveTab] = useState("general");
  const [showValues, setShowValues] = useState<{ [key: number]: boolean }>({});
  const [isViewSessionModalOpen, setIsViewSessionModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<WorkSession | null>(
    null
  );
  const { updateProject } = useProjectContext();
  const { updateEmployee } = useEmployeeContext();
  const { workSessions } = useWorkSessionContext();

  const toggleValue = (index: number) => {
    setShowValues((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleUpdateProject = async (updatedProject: Project) => {
    try {
      if (!updatedProject.id) throw new Error("Project ID is missing");
      console.log("Updating project with:", updatedProject);
      await updateProject(updatedProject.id, updatedProject);
    } catch (err) {
      console.error("Update project error:", err);
      alert(
        "Помилка при оновленні проєкту: " +
          (err instanceof Error ? err.message : "Невідома помилка")
      );
    }
  };

  const handleUpdateEmployee = async (updatedEmployee: Employee) => {
    try {
      if (!updatedEmployee.id) throw new Error("Employee ID is missing");
      console.log("Updating employee with:", updatedEmployee);
      await updateEmployee(updatedEmployee.id, updatedEmployee);
    } catch (err) {
      console.error("Update employee error:", err);
      alert(
        "Помилка при оновленні працівника: " +
          (err instanceof Error ? err.message : "Невідома помилка")
      );
    }
  };

  const handleViewSession = (session: WorkSession) => {
    setSelectedSession(session);
    setIsViewSessionModalOpen(true);
  };

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return "Невалідна дата";
    }
    return parsedDate.toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg dark:bg-gray-800 text-gray-800 dark:text-gray-100">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "general"
              ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
              : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
          }`}
          onClick={() => setActiveTab("general")}
        >
          Основна інформація
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "team"
              ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
              : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
          }`}
          onClick={() => setActiveTab("team")}
        >
          Команда
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "credentials"
              ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
              : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
          }`}
          onClick={() => setActiveTab("credentials")}
        >
          Облікові дані
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "sessions"
              ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
              : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
          }`}
          onClick={() => setActiveTab("sessions")}
        >
          Робочі сесії
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "analytics"
              ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
              : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
          }`}
          onClick={() => setActiveTab("analytics")}
        >
          Аналітика
        </button>
      </div>

      {activeTab === "general" && <ProjectGeneralTab project={project} />}
      {activeTab === "team" && (
        <ProjectTeamTab project={project} employees={employees} />
      )}
      {activeTab === "analytics" && <ProjectAnalyticsTab project={project} />}
      {activeTab === "credentials" && (
        <Suspense fallback={<div>Loading...</div>}>
          <ProjectCredentialsTab
            project={project}
            showValues={showValues}
            toggleValue={toggleValue}
            onUpdateProject={handleUpdateProject}
          />
        </Suspense>
      )}
      {activeTab === "sessions" && (
        <ProjectSessionsTab
          project={project}
          employees={employees}
          workSessions={workSessions}
          onAddClick={() => {}}
          onViewSession={handleViewSession}
          formatDate={formatDate}
          onUpdateProject={handleUpdateProject}
          onUpdateEmployee={handleUpdateEmployee}
        />
      )}

      {selectedSession && (
        <Modal
          isOpen={isViewSessionModalOpen}
          onClose={() => setIsViewSessionModalOpen(false)}
          title="Деталі робочої сесії"
        >
          <div className="flex flex-col gap-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100">
            <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-700/50">
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Дата:
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
                {formatDate(selectedSession.date)}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-700/50">
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Проєкт:
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
                {project.name}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-700/50">
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Працівник:
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
                {employees.find((e) => e.id === selectedSession.employeeId)
                  ?.fullName || "Невідомий"}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-700/50">
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Час:
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">{`${selectedSession.startTime} - ${selectedSession.endTime}`}</span>
            </div>
            <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-700/50">
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Опис:
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                {selectedSession.taskDescription}
              </p>
            </div>
            <button
              onClick={() => setIsViewSessionModalOpen(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
            >
              Закрити
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProjectDetailsTabs;
