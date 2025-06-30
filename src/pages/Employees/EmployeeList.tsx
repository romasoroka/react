import { Link } from 'react-router-dom';
import { Employee } from '../../types';

interface EmployeeListProps {
  employees: Employee[];
}

const EmployeeList = ({ employees }: EmployeeListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {employees.map((employee) => (
        <Link
          key={employee.id ?? 0}
          to={`/employees/${employee.id}`}
          className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-3 mb-2">
            {employee.imageUrl ? (
              <img
                src={employee.imageUrl}
                alt={employee.fullName}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-white dark:text-gray-200 text-sm font-semibold">
                {employee.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {employee.fullName}
              </h3>
            </div>
          </div>
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
        </Link>
      ))}
    </div>
  );
};

export default EmployeeList;