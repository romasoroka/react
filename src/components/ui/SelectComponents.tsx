import Select from 'react-select';

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  options: Option[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #E5E7EB',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    color: '#4B5563',
    backgroundColor: 'white',
    outline: 'none',
    '&:focus': {
      borderColor: '#2563EB',
    },
    '&:hover': {
      borderColor: '#2563EB',
    },
    '[data-theme="dark"] &': {
      border: '1px solid #4B5563',
      color: '#E5E7EB',
      backgroundColor: '#1F2937',
      '&:focus': {
        borderColor: '#60A5FA',
      },
      '&:hover': {
        borderColor: '#60A5FA',
      },
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: 'white',
    '[data-theme="dark"] &': {
      backgroundColor: '#1F2937',
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#2563EB' : 'white',
    color: state.isSelected ? 'white' : '#4B5563',
    '&:hover': {
      backgroundColor: '#F3F4F6',
    },
    '[data-theme="dark"] &': {
      backgroundColor: state.isSelected ? '#2563EB' : '#1F2937',
      color: state.isSelected ? 'white' : '#E5E7EB',
      '&:hover': {
        backgroundColor: '#374151',
      },
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: '#E5E7EB',
    '[data-theme="dark"] &': {
      backgroundColor: '#4B5563',
    },
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: '#4B5563',
    '[data-theme="dark"] &': {
      color: '#E5E7EB',
    },
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: '#4B5563',
    '&:hover': {
      backgroundColor: '#DC2626',
      color: 'white',
    },
    '[data-theme="dark"] &': {
      color: '#E5E7EB',
      '&:hover': {
        backgroundColor: '#DC2626',
        color: 'white',
      },
    },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#9CA3AF',
    '[data-theme="dark"] &': {
      color: '#9CA3AF',
    },
  }),
  input: (provided: any) => ({
    ...provided,
    color: '#4B5563',
    '[data-theme="dark"] &': {
      color: '#E5E7EB',
    },
  }),
};

const SelectComponent = ({ label, options, selected, onChange, placeholder = 'Оберіть значення' }: Props) => {
  const value = options.filter((option) => selected.includes(option.value));

  return (
    <div className="flex flex-col p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors">
      <label className="text-sm font-semibold text-gray-800 dark:text-gray-100">{label}</label>
      <Select
        isMulti
        name={label}
        options={options}
        className="basic-multi-select px-2"
        placeholder={placeholder}
        classNamePrefix="select"
        value={value}
        onChange={(selectedOptions) =>
          onChange(selectedOptions ? selectedOptions.map((opt) => opt.value) : [])
        }
        styles={customStyles}
      />
    </div>
  );
};

export default SelectComponent;
