import Select from 'react-select';
import { techOptions } from '../../data/techOptions';

interface Props {
  selected: string[];
  onChange: (values: string[]) => void;
}

const TechnologiesSelect = ({ selected, onChange }: Props) => (
  <div className="flex mb-2 flex-col rounded-lg bg-white/50 hover:bg-gray-100/80 transition-colors">
    <label className="block p-2 text-sm font-medium text-gray-700 mb-1">Технології</label>
    <Select
      isMulti
      name="technologies"
      options={techOptions}
      className="basic-multi-select px-2"
      placeholder="Вибрати технології"
      classNamePrefix="select"
      value={techOptions.filter(option => selected.includes(option.value))}
      onChange={(selectedOptions) =>
        onChange(selectedOptions.map((opt) => opt.value))
      }
    />
  </div>
);

export default TechnologiesSelect;
