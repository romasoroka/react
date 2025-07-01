import React, { useState } from "react";
import { Project, Credential } from "../../../types/Models";
import { createCredential } from "../../../services/credentials";
import Modal from "../../../components/ui/Modal";
import FormField from "../../../components/ui/FormField";

interface ProjectCredentialsTabProps {
  project: Project;
  showValues: { [key: number]: boolean };
  toggleValue: (index: number) => void;
  onUpdateProject: (updatedProject: Project) => Promise<void>;
}

const ProjectCredentialsTab = ({
  project,
  showValues,
  toggleValue,
  onUpdateProject,
}: ProjectCredentialsTabProps) => {
  const [isAddCredentialOpen, setIsAddCredentialOpen] = useState(false);
  const [newCredential, setNewCredential] = useState<Omit<Credential, "id">>({
    name: "",
    value: "",
    description: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleCredentialChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewCredential({ ...newCredential, [name]: value });
  };

  const validateCredential = () => {
    if (!newCredential.name.trim()) return "Назва є обов’язковою";
    if (!newCredential.value.trim()) return "Значення є обов’язковим";
    return null;
  };

  const handleAddCredential = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validateCredential();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const addedCredential = await createCredential({
        name: newCredential.name.trim(),
        value: newCredential.value.trim(),
        description: newCredential.description?.trim() || "",
      });
      const updatedProject = {
        ...project,
        credentials: [...(project.credentials ?? []), addedCredential],
      };
      await onUpdateProject(updatedProject);
      setIsAddCredentialOpen(false);
      setNewCredential({ name: "", value: "", description: "" });
    } catch (err) {
      setError(
        "Помилка при створенні облікових даних: " +
          (err instanceof Error ? err.message : "Невідома помилка")
      );
    }
  };

  return (
    <div className="flex rounded-lg flex-col animate-slideIn dark:bg-gray-800 text-gray-800 dark:text-gray-100">
      <div className="flex flex-col gap-2 mt-2">
        {project.credentials && project.credentials.length > 0 ? (
          project.credentials.map((cred, index) => (
            <div
              key={index}
              className="flex mx-2 flex-col gap-1 p-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white/50 dark:bg-gray-800/50"
            >
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                Назва: {cred.name}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600 dark:text-gray-300">
                  Значення: {showValues[index] ? cred.value : "••••••••"}
                </span>
                <button
                  type="button"
                  onClick={() => toggleValue(index)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline dark:hover:text-blue-300"
                >
                  {showValues[index] ? "Приховати" : "Показати"}
                </button>
              </div>
              {cred.description && (
                <span className="text-xs text-gray-600 dark:text-gray-300">
                  Опис: {cred.description}
                </span>
              )}
            </div>
          ))
        ) : (
          <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
            Немає облікових даних
          </span>
        )}
        <button
          type="button"
          onClick={() => setIsAddCredentialOpen(true)}
          className="bg-blue-600 mb-2 ml-2 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors mt-2 w-fit"
        >
          Додати облікові дані
        </button>
      </div>
      <Modal
        isOpen={isAddCredentialOpen}
        onClose={() => setIsAddCredentialOpen(false)}
        title="Додати облікові дані"
      >
        <form
          onSubmit={handleAddCredential}
          className="flex flex-col bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
        >
          {error && (
            <div className="mb-4 p-2 bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-200 rounded-lg text-sm">
              {error}
            </div>
          )}
          <FormField
            label="Назва:"
            name="name"
            value={newCredential.name}
            onChange={handleCredentialChange}
            required
          />
          <FormField
            label="Значення:"
            name="value"
            value={newCredential.value}
            onChange={handleCredentialChange}
            required
          />
          <FormField
            label="Опис:"
            name="description"
            value={newCredential.description || ""}
            onChange={handleCredentialChange}
            textarea
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
          >
            Додати
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ProjectCredentialsTab;
