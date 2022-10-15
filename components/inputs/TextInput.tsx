import { forwardRef, RefObject } from "react";

type TextInputProps = {
  type: "text";
  name: string;
  label: string;
  validation: {
    pattern: string;
    message: string;
  };
  ref: RefObject<HTMLInputElement>;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ type, name, label, validation }, ref) => {
    const inputId = `${name}-${type}`;

    return (
      <div className={"flex flex-col gap-2"}>
        <label htmlFor={inputId}>{label}</label>
        <input type={type} name={name} id={inputId} ref={ref} className={"p-2"} />
      </div>
    );
  },
);
