import { forwardRef, RefObject } from "react";

export type FeeType = {
  label: "allegro" | "allegrolokalnie" | "olx";
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
    pattern: string;
    message: string;
  };
  options?: FeeType[] | ShipmentType[];
  ref: RefObject<HTMLSelectElement>;
};

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ name, label, validation, options }, ref) => {
    const inputId = `${name}`;
    return (
      <div className={"flex flex-col gap-2"}>
        <label htmlFor={inputId}>{label}</label>
        <select name={name} id={inputId} ref={ref} className={"p-2"}>
          {options &&
            options.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
      </div>
    );
  },
);
