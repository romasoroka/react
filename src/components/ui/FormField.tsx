interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}

const FormField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  textarea = false,
}: FormFieldProps) => {
  return (
    <div className="flex flex-col p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors">
      <label className="text-sm font-semibold text-gray-800 dark:text-gray-100">{label}</label>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-md text-sm text-gray-600 dark:text-gray-200 bg-white dark:bg-gray-800 focus:border-blue-600 dark:focus:border-blue-400 outline-none h-20"
        />
      ) : (
        <input
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          required={required}
          className="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-md text-sm text-gray-600 dark:text-gray-200 bg-white dark:bg-gray-800 focus:border-blue-600 dark:focus:border-blue-400 outline-none"
        />
      )}
    </div>
  );
};

export default FormField;