import { useState, ChangeEvent, FormEvent } from "react";
import { Input } from "../input/Input";
import { Select } from "../select/Select";
import { Submit } from "../submit/Submit";
import { Error } from "../error/Error";
import { Result } from "../result/Result";

type NazwaSerwisuType = "allegro" | "allegrolokalnie" | "olx";

type ValuesProps = {
  nazwaSerwisu: NazwaSerwisuType;
  typWysylki: number;
  cenaZakupu: number | null;
  cenaSprzedazy: number | null;
};

export type ResultType = {
  valuable: number;
  percentage: number;
};

export const Form = () => {
  const [values, setValues] = useState<ValuesProps>({
    nazwaSerwisu: "allegro",
    typWysylki: 0,
    cenaZakupu: null,
    cenaSprzedazy: null,
  });
  const [result, setResult] = useState<ResultType | null>(null);
  const [formError, setFormError] = useState<boolean>(false);

  const handleInputChange = (target: EventTarget & (HTMLSelectElement | HTMLInputElement)) => {
    if (!target) return;

    const name = target.name;
    const value = Number(target.value);

    if (isNaN(value) || value < 0) return setFormError(true);

    if (name === "nazwaSerwisu") {
      const value = target.value;

      if (!["allegro", "allegrolokalnie", "olx"].includes(name)) return setFormError(true);
    }

    setFormError(false);
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (values.cenaZakupu == null || values.cenaSprzedazy == null) return setFormError(true);

    switch (values.nazwaSerwisu) {
      case "allegro":
        {
          const valuable =
            values.cenaSprzedazy -
            values.cenaZakupu -
            ((values.cenaSprzedazy + values.typWysylki) * 6) / 100;
          const percentage = (valuable / values.cenaZakupu) * 100;
          setResult({ valuable, percentage });
        }
        break;

      case "allegrolokalnie":
        {
          const valuable =
            values.cenaSprzedazy -
            values.cenaZakupu -
            ((values.cenaSprzedazy + values.typWysylki) * 4.9) / 100;
          const percentage = (valuable / values.cenaZakupu) * 100;
          setResult({ valuable, percentage });
        }
        break;

      case "olx":
        {
          const valuable = values.cenaSprzedazy - values.cenaZakupu;
          const percentage = (valuable / values.cenaZakupu) * 100;
          setResult({ valuable, percentage });
        }
        break;

      default:
        setFormError(true);
        break;
    }
  };

  return (
    <form
      className={"w-full md:w-2/3 lg:w-1/2 mx-auto bg-zinc-300 mt-2"}
      onSubmit={(e) => handleSubmit(e)}
    >
      <fieldset className={"p-8 flex flex-col gap-4"}>
        <legend className={"sr-only"}>Oblicz zysk ze sprzedaży</legend>
        <Select
          name="nazwaSerwisu"
          label="Nazwa serwisu aukcyjnego"
          onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(e.target)}
          options={[
            { label: "allegro", value: "allegro" },
            { label: "allegrolokalnie", value: "allegrolokalnie" },
            { label: "olx", value: "olx" },
          ]}
        />
        <Select
          name="typWysylki"
          label="Typ wysyłki"
          onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(e.target)}
          options={[
            { label: "nie dotyczy [0.00]", value: 0 },
            { label: "paczkomat [8.99]", value: 8.99 },
            { label: "kukier inpost [10.95]", value: 10.95 },
          ]}
        />
        <Input
          name="cenaZakupu"
          label="Cena zakupu:"
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target)}
        />
        <Input
          name="cenaSprzedazy"
          label="Cena sprzedaży:"
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target)}
        />
        <Submit label="Oblicz" />
        {!formError && result && <Result {...result} />}
        {formError && <Error />}
      </fieldset>
    </form>
  );
};
