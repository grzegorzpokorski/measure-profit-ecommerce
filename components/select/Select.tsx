type SelectProps = {
  label: string;
  name: string;
  onChange: () => void;
  options: string[];
};

export const Select = ({ onChange, label, name, options }: SelectProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={`form-${name}`}>{label}</label>
      <select onChange={onChange} name={name} id={`form-${name}`}>
        {options.map((option) => (
          <Option option={option} key={option} />
        ))}
      </select>
    </div>
  );
};

type OptionProps = {
  option: string;
};

const Option = ({ option }: OptionProps) => {
  return <option value={option}>{option}</option>;
};
