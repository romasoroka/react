import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import CreateEmployeeForm from './CreateEmployee';
import EmployeeList from './EmployeeList';
import { useAppContext } from '../../context/AppContext';

const Employees = () => {
  const { employees, addEmployee } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mt-4 mx-auto rounded-2xl p-8 md:p-4 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2 md:text-2xl">
        👥 Працівники
      </h2>
      <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm mb-8 max-w-md w-full md:max-w-full">
        {(FaSearch as any)({ className: 'text-gray-500 dark:text-gray-400' })}
        <input
          type="text"
          placeholder="Пошук працівників за ім’ям..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-sm text-gray-600 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
        />
      </div>
      <CreateEmployeeForm onCreate={addEmployee} />
      <EmployeeList employees={filteredEmployees} />
    </div>
  );
};

export default Employees;