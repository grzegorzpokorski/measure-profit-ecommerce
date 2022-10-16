import { Dispatch, forwardRef, RefObject, SetStateAction, useState } from "react";
import { ValidFieldsType } from "../form/Form";

type TextInputProps = {
  type: "text";
  name: string;
  label: string;
  validation: {
    pattern: RegExp;
    message: string;
    setValidFields: Dispatch<SetStateAction<ValidFieldsType>>;
    validFields: ValidFieldsType;
  };
  ref: RefObject<HTMLInputElement>;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ type, name, label, validation }, ref) => {
    const inputId = `${name}-${type}`;
    const [showError, setShowError] = useState<boolean>(false);

    const handleChange = (target: EventTarget & HTMLInputElement) => {
      const re = new RegExp(validation.pattern);
      const isValid = !re.test(target.value.trim());

      if (isValid) {
        validation.setValidFields({ ...validation.validFields, [target.name]: false });
        setShowError(true);
      }
      if (!isValid) {
        validation.setValidFields({ ...validation.validFields, [target.name]: true });
        setShowError(false);
      }
    };

    return (
      <div className={"flex flex-col gap-2"}>
        <label htmlFor={inputId}>{label}</label>
        <input
          type={type}
          name={name}
          id={inputId}
          ref={ref}
          onChange={(e) => handleChange(e.target)}
          aria-describedby={`${name}-hint`}
          className={"p-2"}
        />
        {showError && <p id={`${name}-hint`}>{validation.message}</p>}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";
