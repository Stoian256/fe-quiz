const Select: React.FC<{
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}> = ({
  options,
  value,
  onChange,
  placeholder = "Select a difficulty level..."
}) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-primary"
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="w-4 h-4 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Select;
