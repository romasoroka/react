import { useState } from 'react';
import Modal from '../ui/Modal';
import EmployeeList from './EmployeeList';
import CreateEmployeeForm from './CreateEmployee';
import EmployeeDetailsTabs from './EmployeeDetailsTabs';
import { useAppContext } from '../../context/AppContext';
import { Employee } from '../../types';

const Employees = () => {
  const { employees, projects, addEmployee } = useAppContext();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const openModal = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const closeModal = () => {
    setSelectedEmployee(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2 md:text-2xl">
        👥 Працівники
      </h2>
      <CreateEmployeeForm onCreate={addEmployee} />
      <EmployeeList employees={employees} onEmployeeClick={openModal} />
      {selectedEmployee && (
        <Modal
          isOpen={!!selectedEmployee}
          onClose={closeModal}
          title={selectedEmployee.name}
        >
          <EmployeeDetailsTabs employee={selectedEmployee} projects={projects} />
        </Modal>
      )}
    </div>
  );
};

export default Employees;