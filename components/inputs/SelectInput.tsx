import { FeeType, ShipmentType } from "../form/Form";

type SelectInputProps = {
  type: string;
  name: string;
  label: string;
  validationPatern: string;
  options?: FeeType[] | ShipmentType[];
};

export const SelectInput = ({ type, name, label, validationPatern, options }: SelectInputProps) => {
  const inputId = `${name}-${type}`;
  return (
    <div>
      <label htmlFor={inputId}>{label}</label>
      <select name={name} id={inputId}>
        {options &&
          options.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  );
};
