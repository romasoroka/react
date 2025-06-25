import Select from 'react-select';
import { useState, useEffect } from 'react';

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

const getCustomStyles = (theme: string) => ({
  control: (provided: any) => ({
    ...provided,
    width: '100%',
    padding: '0.5rem',
    border: `1px solid ${theme === 'dark' ? '#4B5563' : '#E5E7EB'}`,
    borderRadius: '0.65rem',
    fontSize: '0.875rem',
    color: theme === 'dark' ? '#E5E7EB' : '#4B5563',
    backgroundColor: theme === 'dark' ? '#1F2937' : 'white',
    outline: 'none',
    '&:focus': {
      borderColor: theme === 'dark' ? '#60A5FA' : '#2563EB',
    },
    '&:hover': {
      borderColor: theme === 'dark' ? '#60A5FA' : '#2563EB',
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: theme === 'dark' ? '#1F2937' : 'white', // Solid background
    borderRadius: '0.35rem',
    zIndex: 9999, // Ensure menu is above other elements
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#2563EB'
      : theme === 'dark' ? '#1F2937' : 'white', // Solid background
    color: state.isSelected ? 'white' : theme === 'dark' ? '#E5E7EB' : '#4B5563',
    '&:hover': {
      backgroundColor: theme === 'dark' ? '#374151' : '#F3F4F6', // Solid hover background
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: theme === 'dark' ? '#4B5563' : '#E5E7EB',
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: theme === 'dark' ? '#E5E7EB' : '#4B5563',
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: theme === 'dark' ? '#E5E7EB' : '#4B63',
    '&:hover': {
      backgroundColor: '#DC2626',
      color: 'white',
    },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#9CA3AF',
  }),
  input: (provided: any) => ({
    ...provided,
    color: theme === 'dark' ? '#E5E7EB' : '#4B5563',
  }),
});

const SelectComponent = ({ label, options, selected, onChange, placeholder = 'Оберіть значення' }: Props) => {
  const [theme, setTheme] = useState(document.documentElement.dataset.theme || 'light');

  // Listen for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.dataset.theme || 'light';
      setTheme(newTheme);
      console.log('Theme changed to:', newTheme); // Debug
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  const value = options.filter((option) => selected.includes(option.value));

  return (
    <div className="flex flex-col py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors">
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
        styles={getCustomStyles(theme)}
      />
    </div>
  );
};

export default SelectComponent;