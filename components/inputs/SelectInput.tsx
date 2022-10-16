import { Dispatch, forwardRef, RefObject, SetStateAction, useState } from "react";
import { ValidFieldsType } from "../form/Form";

export type FeeType = {
  label: "allegro [6%]" | "allegrolokalnie [4.9%]" | "olx [0%]";
  value: 6 | 4.9 | 0;
};

export type ShipmentType = {
  label: "nie dotyczy [0.00]" | "inpost paczkomat [8.99]" | "inport kurier [10.95]";
  value: 0 | 8.99 | 10.95;
};

type SelectInputProps = {
  name: string;
  label: string;
  validation: {
    pattern: RegExp;
    message: string;
    setValidFields: Dispatch<SetStateAction<ValidFieldsType>>;
    validFields: ValidFieldsType;
  };
  options?: FeeType[] | ShipmentType[];
  ref: RefObject<HTMLSelectElement>;
};

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ name, label, validation, options }, ref) => {
    const inputId = `${name}`;
    const [showError, setShowError] = useState<boolean>(false);
    const handleChange = (target: EventTarget & HTMLSelectElement) => {
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
        <select
          name={name}
          id={inputId}
          ref={ref}
          onChange={(e) => handleChange(e.target)}
          aria-describedby={`${name}-hint`}
          className={"p-2"}
        >
          {options &&
            options.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
        {showError && <p id={`${name}-hint`}>{validation.message}</p>}
      </div>
    );
  },
);

SelectInput.displayName = "SelectInput";
