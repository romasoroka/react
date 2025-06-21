import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import EmployeeDetailsTabs from '../EmployeeDetails/EmployeeDetailsTabs';
import { Employee, Project } from '../../types';

const EmployeeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { employees, projects } = useAppContext();
  const navigate = useNavigate();

  const employee = employees.find((e) => e.id === Number(id));
  

  if (!employee) {
    return (
      <div className="max-w-7xl mx-auto mt-2 bg-white rounded-xl shadow-2xl p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-200 pb-2 md:text-2xl">
        Працівник не знайдений</h2>
        <p>Працівник з ID {id} не існує.</p>
        <button
          onClick={() => navigate('/employees')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          Повернутися до працівників
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-2 bg-white rounded-xl shadow-2xl p-6">
      <div className="flex items-center gap-4 mb-6 border-b-2 border-gray-200 pb-2">
        {/* Аватар */}
        {employee.image ? (
          <img
            src={employee.image}
            alt={employee.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white text-sm font-semibold">
            {employee.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>
        )}

        {/* Ім’я */}
        <h2 className="text-3xl font-bold text-gray-800 md:text-2xl">
          {employee.name}
        </h2>
      </div>

      <EmployeeDetailsTabs employee={employee} projects={projects} />
    </div>
  );
};

export default EmployeeDetails;