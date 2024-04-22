import React from 'react';

interface IProps {
  label: string;
  options: string[] | number[];
  defaultValue: string;
  required: boolean;
  handleChange: (value: string) => void;
}

/**
 * Select component that accepts Props
 * @param param0 
 * @returns 
 */
const Select: React.FC<IProps> = ({ label, options, defaultValue, handleChange, required }) => {
  return (
    <div className="flex flex-col">
      <select
        defaultValue={defaultValue}
        onChange={(e) => handleChange(e.target.value)}
        className="p-2 border border-gray-300 rounded"
        required={required}
      >
        <option value="">{label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;