type TextInputProps = {
  type: string;
  name: string;
  label: string;
  validationPatern: string;
};

export const TextInput = ({ type, name, label, validationPatern }: TextInputProps) => {
  const inputId = `${name}-${type}`;
  return (
    <div>
      <label htmlFor={inputId}>{label}</label>
      <input type={type} name={name} id={inputId} />
    </div>
  );
};
