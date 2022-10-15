import { FormEvent, useRef, useState } from "react";
import { SelectInput } from "../inputs/SelectInput";
import { SubmitInput } from "../inputs/SubmitInput";
import { TextInput } from "../inputs/TextInput";

export const floatValidationPattern = "/^[-+]?[0-9]*.?[0-9]+([eE][-+]?[0-9]+)?$/";

export const Form = () => {
  const [validForm, setValidForm] = useState<boolean>(true);

  const refFee = useRef<HTMLSelectElement | null>(null);
  const refShipment = useRef<HTMLSelectElement | null>(null);
  const refPurchasePrice = useRef<HTMLInputElement | null>(null);
  const refSellingPrice = useRef<HTMLInputElement | null>(null);

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className={"flex flex-col m-4 bg-zinc-400"} onSubmit={handleSubmitForm}>
      <fieldset className={"flex flex-col gap-4 p-8 drop-shadow-md"}>
        <h3 className="sr-only">Oblicz profit ze sprzedaży</h3>
        <SelectInput
          name="fee"
          label="Wybierz serwis aukcyjny:"
          validation={{
            pattern: floatValidationPattern,
            message: "Upewnij się, że wprowadzono liczbę",
          }}
          options={[
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
          ]}
          ref={refFee}
        />
        <SelectInput
          name="shipment"
          label="Typ wysyłki:"
          validation={{
            pattern: floatValidationPattern,
            message: "Upewnij się, że wprowadzono liczbę",
          }}
          options={[
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
          ]}
          ref={refShipment}
        />
        <TextInput
          type="text"
          name="purchasePrice"
          label="Cena zakupu:"
          validation={{
            pattern: floatValidationPattern,
            message: "Upewnij się, że wprowadzono liczbę",
          }}
          ref={refPurchasePrice}
        />
        <TextInput
          type="text"
          name="sellingPrice"
          label="Cena sprzedazy:"
          validation={{
            pattern: floatValidationPattern,
            message: "Upewnij się, że wprowadzono liczbę",
          }}
          ref={refSellingPrice}
        />
        <SubmitInput value="oblicz" />
      </fieldset>
    </form>
  );
};
