import { useParams, useNavigate } from "react-router-dom";
import { useEmployeeContext } from "../../context/EmployeeContext";
import { useProjectContext } from "../../context/ProjectContext";
import EmployeeDetailsTabs from "../EmployeeDetails/EmployeeDetailsTabs";
import { Employee, Project } from "../../types/Models";

const EmployeeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { employees } = useEmployeeContext();
  const { projects } = useProjectContext();
  const navigate = useNavigate();

  const employee = employees.find((e: Employee) => e.id === Number(id));

  if (!employee) {
    return (
      <div className="mx-auto mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 text-gray-800 dark:text-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b-2 border-gray-200 dark:border-gray-700 pb-2 md:text-2xl">
          Працівник не знайдений
        </h2>
        <p>Працівник з ID {id} не існує.</p>
        <button
          onClick={() => navigate("/employees")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
        >
          Повернутися до працівників
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 text-gray-800 dark:text-gray-100">
      <div className="flex items-center gap-4 mb-6 border-b-2 border-gray-200 dark:border-gray-700 pb-2">
        {employee.imageUrl ? (
          <img
            src={employee.imageUrl}
            alt={employee.fullName}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-white dark:text-gray-200 text-sm font-semibold">
            {employee.fullName
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
        )}
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 md:text-2xl">
          {employee.fullName}
        </h2>
      </div>
      <EmployeeDetailsTabs employee={employee} projects={projects} />
    </div>
  );
};

export default EmployeeDetails;
