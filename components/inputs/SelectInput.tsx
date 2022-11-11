import { Dispatch, forwardRef, Ref, RefObject, SetStateAction, useState } from "react";
import { ValidFieldsType } from "../form/Form";

type AllegroFeeType = {
  label: "allegro";
  value: 6.5;
};

type AllegroLokalnieFeeType = {
  label: "allegrolokalnie";
  value: 4.9;
};

type OlxFeeType = {
  label: "olx";
  value: 0;
};

export type FeeType = AllegroFeeType | AllegroLokalnieFeeType | OlxFeeType;

type NieDotyczyShipmentType = {
  label: "nie dotyczy [0.00]";
  value: 0;
};

type PaczkomatShipmentType = {
  label: "inpost paczkomat [8.99]";
  value: 8.99;
};

type KurierShipmentType = {
  label: "inport kurier [10.95]";
  value: 10.95;
};

export type ShipmentType = NieDotyczyShipmentType | PaczkomatShipmentType | KurierShipmentType;

type SelectInputProps<T> = {
  name: string;
  label: string;
  validation: {
    pattern: RegExp;
    message: string;
    setValidFields: Dispatch<SetStateAction<ValidFieldsType>>;
    validFields: ValidFieldsType;
  };
  options?: T[];
  ref: RefObject<HTMLSelectElement>;
};

const _SelectInput = <T extends FeeType | ShipmentType>(
  { name, label, validation, options }: SelectInputProps<T>,
  ref: Ref<HTMLSelectElement>,
) => {
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
};

export const SelectInput = forwardRef(_SelectInput) as typeof _SelectInput;
