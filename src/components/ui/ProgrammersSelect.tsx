import Select from 'react-select';
import { Employee } from '../../types';

interface Props {
  selected: string[];
  employees: Employee[];
  onChange: (values: string[]) => void;
}

const ProgrammersSelect = ({ selected, employees, onChange }: Props) => (
  <div className="flex flex-col rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
    <label className="block p-2 text-sm font-medium text-gray-700 mb-1">Програмісти</label>
    <Select
      isMulti
      name="programmers"
      options={employees.map(emp => ({ value: emp.name, label: emp.name }))}
      className="basic-multi-select px-2"
      placeholder="Вибрати програмістів"
      classNamePrefix="select"
      value={employees
        .filter(emp => selected.includes(emp.name))
        .map(emp => ({ value: emp.name, label: emp.name }))}
      onChange={(selectedOptions) =>
        onChange(selectedOptions ? selectedOptions.map((opt) => opt.value) : [])
      }
    />
  </div>
);

export default ProgrammersSelect;
