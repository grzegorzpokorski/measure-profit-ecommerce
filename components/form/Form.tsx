import { SelectInput } from "../inputs/SelectInput";
import { SubmitInput } from "../inputs/SubmitInput";
import { TextInput } from "../inputs/TextInput";

export const floatValidationPatern = "/^[-+]?[0-9]*.?[0-9]+([eE][-+]?[0-9]+)?$/";

export type FeeType = {
  label: "allegro" | "allegrolokalnie" | "olx";
  value: 6 | 4.9 | 0;
};

export type ShipmentType = {
  label: "nie dotyczy [0.00]" | "inpost paczkomat [8.99]" | "inport kurier [10.95]";
  value: 0 | 8.99 | 10.95;
};

export type InputsType = {
  type: "select" | "text";
  name: string;
  label: string;
  validationPatern: string;
  options?: ShipmentType[] | FeeType[];
};
export const inputs: InputsType[] = [
  {
    type: "select",
    name: "fee",
    label: "Wybierz serwis aukcyjny:",
    validationPatern: floatValidationPatern,
    options: [
      {
        label: "allegro",
        value: 6,
      },
      {
        label: "allegrolokalnie",
        value: 4.9,
      },
      {
        label: "olx",
        value: 0,
      },
    ],
  },
  {
    type: "select",
    name: "shipment",
    label: "Typ wysyłki:",
    validationPatern: floatValidationPatern,
    options: [
      {
        label: "nie dotyczy [0.00]",
        value: 0,
      },
      {
        label: "inpost paczkomat [8.99]",
        value: 8.99,
      },
      {
        label: "inport kurier [10.95]",
        value: 10.95,
      },
    ],
  },
  {
    type: "text",
    name: "purchasePrice",
    label: "Cena zakupu:",
    validationPatern: floatValidationPatern,
  },
  {
    type: "text",
    name: "sellingPrice",
    label: "Cena sprzedazy:",
    validationPatern: floatValidationPatern,
  },
];

export const Form = () => (
  <form className={"bg-zinc-500 m-4"}>
    <fieldset className={"p-4 bg-zinc-200"}>
      <h3 className="sr-only">Oblicz profit ze sprzedaży</h3>
      {inputs &&
        inputs.map((input) => {
          if (input.type === "text") return <TextInput key={input.name} {...input} />;
          if (input.type === "select") return <SelectInput key={input.name} {...input} />;
        })}
      <SubmitInput value="oblicz" />
    </fieldset>
  </form>
);
