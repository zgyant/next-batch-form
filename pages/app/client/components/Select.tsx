import React from 'react';

interface IProps {
  label: string;
  options: string[];
  defaultValue: string;
  handleChange: (value: string) => void;
}

/**
 * Select component that accepts Props
 * @param param0 
 * @returns 
 */
const Select: React.FC<IProps> = ({ label, options, defaultValue, handleChange }) => {
  return (
    <div className="flex flex-col">
      <label className="mb-2">{label}</label>
      <select
        defaultValue={defaultValue}
        onChange={(e) => handleChange(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="">{`Select ${label}`}</option>
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