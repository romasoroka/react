import Select from "react-select";

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
  control: (base: any) => ({
    ...base,
    padding: "0.5rem",
    borderRadius: "0.65rem",
    fontSize: "0.875rem",
    backgroundColor: "transparent",
  }),
  menu: (base: any) => ({
    ...base,
    borderRadius: "0.35rem",
    zIndex: 9999,
    backgroundColor: "var(--menu-bg)",
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused
      ? "var(--menu-hover-bg)"
      : "var(--menu-bg)",
    color: "var(--menu-text)",
  }),
  placeholder: (base: any) => ({
    ...base,
    color: "#9CA3AF",
  }),
};

const SelectComponent = ({
  label,
  options,
  selected,
  onChange,
  placeholder = "Оберіть значення",
}: Props) => {
  const value = options.filter((opt) => selected.includes(opt.value));

  const isDark = document.documentElement.classList.contains("dark");

  document.documentElement.style.setProperty(
    "--menu-bg",
    isDark ? "#1F2937" : "white"
  );
  document.documentElement.style.setProperty(
    "--menu-hover-bg",
    isDark ? "#374151" : "#F3F4F6"
  );
  document.documentElement.style.setProperty(
    "--menu-text",
    isDark ? "#E5E7EB" : "#1F2937"
  );

  return (
    <div className="flex flex-col gap-1 py-2 px-2 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors">
      <label className="text-sm font-semibold text-gray-800 dark:text-gray-100">
        {label}
      </label>
      <Select
        isMulti
        name={label}
        options={options}
        classNamePrefix="select"
        value={value}
        placeholder={placeholder}
        styles={customStyles}
        className="text-sm text-gray-800 dark:text-gray-100"
        onChange={(opts) => onChange(opts ? opts.map((o) => o.value) : [])}
      />
    </div>
  );
};

export default SelectComponent;
