type InputProps = {
  label: string;
  name: string;
  type: "text" | "number";
  onChange: () => void;
};

export const Input = ({ type, onChange, label, name }: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={`form-${name}`}>{label}</label>
      <input type={type} onChange={onChange} name={name} id={`form-${name}`} />
    </div>
  );
};
