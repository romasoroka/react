import React from 'react';
import { Project } from '../../../types';

interface ProjectCredentialsTabProps {
  project: Project;
  showValues: { [key: number]: boolean };
  toggleValue: (index: number) => void;
  setIsAddCredentialOpen: (val: boolean) => void;
}

const ProjectCredentialsTab = ({
  project,
  showValues,
  toggleValue,
  setIsAddCredentialOpen,
}: ProjectCredentialsTabProps) => {
  return (
    <div className="flex rounded-lg flex-col animate-slideIn  dark:bg-gray-800 text-gray-800 dark:text-gray-100">
      <div className="flex flex-col gap-2 mt-2">
        {project.credentials && project.credentials.length > 0 ? (
          project.credentials.map((cred, index) => (
            <div
              key={index}
              className="flex mx-2 flex-col gap-1 p-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white/50 dark:bg-gray-800/50"
            >
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">Назва: {cred.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600 dark:text-gray-300">
                  Значення: {showValues[index] ? cred.value : '••••••••'}
                </span>
                <button
                  type="button"
                  onClick={() => toggleValue(index)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline dark:hover:text-blue-300"
                >
                  {showValues[index] ? 'Приховати' : 'Показати'}
                </button>
              </div>
              {cred.description && (
                <span className="text-xs text-gray-600 dark:text-gray-300">Опис: {cred.description}</span>
              )}
            </div>
          ))
        ) : (
          <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">Немає облікових даних</span>
        )}
        <button
          type="button"
          onClick={() => setIsAddCredentialOpen(true)}
          className="bg-blue-600 mb-2 ml-2 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors mt-2 w-fit"
        >
          Додати облікові дані
        </button>
      </div>
    </div>
  );
};

export default ProjectCredentialsTab;