import { ChangeEvent } from "react";

type OptionProps = {
  label: string;
  value: string | number;
};

type SelectProps = {
  label: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: OptionProps[];
};

export const Select = ({ onChange, label, name, options }: SelectProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={`form-${name}`}>{label}</label>
      <select onChange={onChange} name={name} id={`form-${name}`}>
        {options.map((option) => (
          <Option key={option.label} {...option} />
        ))}
      </select>
    </div>
  );
};

const Option = ({ label, value }: OptionProps) => {
  return <option value={value}>{label}</option>;
};
