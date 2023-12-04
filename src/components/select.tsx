const Select: React.FC<{
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}> = ({
  options,
  value,
  onChange,
  placeholder = "Select a difficulty level...",
}) => {
  const handleSelectChange = (selectedValue: string) => {
    onChange(selectedValue);
  };

  return (
    <div className="relative">
      <div className="flex items-center border rounded-md shadow-sm focus:outline-none focus:ring focus:border-primary">
        <select
          value={value}
          onChange={(e) => handleSelectChange(e.target.value)}
          className="appearance-none block w-full px-3 py-2 focus:outline-none"
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 absolute right-2 pointer-events-none"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 12a1 1 0 0 1-.7-.29l-3-3a1 1 0 1 1 1.41-1.42L10 10.59l2.29-2.3a1 1 0 0 1 1.41 1.42l-3 3a1 1 0 0 1-.7.28z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default Select;
