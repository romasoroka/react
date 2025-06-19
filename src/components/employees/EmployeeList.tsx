import { Employee } from '../../types';

interface EmployeeListProps {
  employees: Employee[];
  onEmployeeClick: (employee: Employee) => void;
}

const EmployeeList = ({ employees, onEmployeeClick }: EmployeeListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {employees.map((employee) => (
        <div
          key={employee.id}
          className="p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onEmployeeClick(employee)}
        >
          <h3 className="text-lg font-semibold text-gray-800">{employee.name}</h3>
          <p className="text-sm text-gray-600">{employee.position}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {employee.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;