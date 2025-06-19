import { Employee } from '../../types';

interface EmployeeDetailsModalContentProps {
  employee: Employee;
}

const EmployeeDetailsModalContent = ({ employee }: EmployeeDetailsModalContentProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
        <span className="text-sm font-semibold text-gray-800">Посада:</span>
        <span className="text-sm text-gray-600 ml-2">{employee.position}</span>
      </div>
      <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
        <span className="text-sm font-semibold text-gray-800">Біографія:</span>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">{employee.bio}</p>
      </div>
      <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
        <span className="text-sm font-semibold text-gray-800">Навички:</span>
        <div className="flex flex-wrap gap-2 mt-2">
          {employee.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-gradient-to-r from-indigo-100 to-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold hover:scale-105 transition-transform"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
        <span className="text-sm font-semibold text-gray-800">Досвід:</span>
        <span className="text-sm text-gray-600 ml-2">{employee.experience}</span>
      </div>
      <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
        <span className="text-sm font-semibold text-gray-800">Проєкти:</span>
        <div className="flex flex-wrap gap-2 mt-2">
          {employee.projects.map((project, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold"
            >
              {project}
            </span>
          ))}
        </div>
      </div>
      <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
        <span className="text-sm font-semibold text-gray-800">Email:</span>
        <span className="text-sm text-gray-600 ml-2">{employee.email}</span>
      </div>
      <div className="p-4 rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
        <span className="text-sm font-semibold text-gray-800">Телефон:</span>
        <span className="text-sm text-gray-600 ml-2">{employee.phone}</span>
      </div>
    </div>
  );
};

export default EmployeeDetailsModalContent;