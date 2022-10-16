import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { FeeType, SelectInput, ShipmentType } from "../inputs/SelectInput";
import { SubmitInput } from "../inputs/SubmitInput";
import { TextInput } from "../inputs/TextInput";
import { floatValidationPattern } from "../utils/regexpPatterns";

export type ValidFieldsType = {
  fee: boolean;
  shipment: boolean;
  purchasePrice: boolean | null;
  sellingPrice: boolean | null;
};

export const Form = () => {
  const [validForm, setValidForm] = useState<boolean>(false);
  const [validFields, setValidFields] = useState<ValidFieldsType>({
    fee: true,
    shipment: true,
    purchasePrice: null,
    sellingPrice: null,
  });

  useEffect(() => {
    if (Object.values(validFields).includes(false) || Object.values(validFields).includes(null)) {
      setValidForm(false);
    } else {
      setValidForm(true);
    }
  }, [validFields]);

  const refFee = useRef<HTMLSelectElement | null>(null);
  const refShipment = useRef<HTMLSelectElement | null>(null);
  const refPurchasePrice = useRef<HTMLInputElement | null>(null);
  const refSellingPrice = useRef<HTMLInputElement | null>(null);

  const [result, setResult] = useState<{ amount: number; percentage: number } | null>(null);

  const handleSubmitForm = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (!validForm) return;

      const calculation =
        Number(refSellingPrice.current?.value) -
        Number(refPurchasePrice.current?.value) -
        ((Number(refSellingPrice.current?.value) + Number(refShipment.current?.value)) *
          Number(refFee.current?.value)) /
          100;

      setResult({
        amount: Number(calculation.toFixed(2)),
        percentage: Number(
          ((calculation / Number(refPurchasePrice.current?.value)) * 100).toFixed(2),
        ),
      });
    },
    [validForm],
  );

  return (
    <form className={"flex flex-col m-4 bg-zinc-400"} onSubmit={handleSubmitForm}>
      <fieldset className={"flex flex-col gap-4 p-8 drop-shadow-md"}>
        <h3 className="font-medium border-b-2 border-white text-center pb-4">
          Oblicz profit ze sprzedaży urządzeń wskazujących
        </h3>
        <SelectInput
          name="fee"
          label="Wybierz serwis aukcyjny:"
          validation={{
            pattern: floatValidationPattern,
            message: "Upewnij się, że wprowadzono dodatnią liczbę.",
            setValidFields: setValidFields,
            validFields: validFields,
          }}
          options={Array<FeeType>(
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
          )}
          ref={refFee}
        />
        <SelectInput
          name="shipment"
          label="Typ wysyłki:"
          validation={{
            pattern: floatValidationPattern,
            message: "Upewnij się, że wprowadzono dodatnią liczbę.",
            setValidFields: setValidFields,
            validFields: validFields,
          }}
          options={Array<ShipmentType>(
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
          )}
          ref={refShipment}
        />
        <TextInput
          type="text"
          name="purchasePrice"
          label="Cena zakupu:"
          validation={{
            pattern: floatValidationPattern,
            message: "Upewnij się, że wprowadzono dodatnią liczbę.",
            setValidFields: setValidFields,
            validFields: validFields,
          }}
          ref={refPurchasePrice}
        />
        <TextInput
          type="text"
          name="sellingPrice"
          label="Cena sprzedazy:"
          validation={{
            pattern: floatValidationPattern,
            message: "Upewnij się, że wprowadzono dodatnią liczbę.",
            setValidFields: setValidFields,
            validFields: validFields,
          }}
          ref={refSellingPrice}
        />
        <SubmitInput value="oblicz" disabled={!validForm} />
        {result && (
          <div className="flex flex-col">
            <p>Zysk kwotowo: {result.amount} PLN</p>
            <p>Zysk procentowo: {result.percentage} %</p>
          </div>
        )}
      </fieldset>
    </form>
  );
};
