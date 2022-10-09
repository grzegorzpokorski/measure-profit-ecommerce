import cn from "classnames";
import { ChangeEvent, FormEvent, useState } from "react";
import { Layout } from "../components/layout/Layout";
import { ServicesType, useServiceContext } from "../context/ServiceContext";

type ValuesType = {
  service: ServicesType;
  przesylka: number;
  cenaZakupu: number;
  cenaSprzedazy: number;
};

const Home = () => {
  const { service, setService } = useServiceContext();
  const [values, setValues] = useState<ValuesType>({
    service: service,
    przesylka: 0,
    cenaZakupu: 0,
    cenaSprzedazy: 0,
  });
  const [wynik, setWynik] = useState<number | null>(null);

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    switch (service) {
      case "allegro": {
        if (values["cenaZakupu"] && values["cenaSprzedazy"]) {
          const wynikKwota = Math.floor(
            values["cenaSprzedazy"] -
              ((values["cenaSprzedazy"] + values["przesylka"]) * 6) / 100 -
              values["cenaZakupu"],
          );

          setWynik(wynikKwota);
        }
        break;
      }
      case "allegrolokalnie": {
        if (values["cenaZakupu"] && values["cenaSprzedazy"]) {
          const wynikKwota = Math.floor(
            values["cenaSprzedazy"] -
              ((values["cenaSprzedazy"] + values["przesylka"]) * 4.9) / 100 -
              values["cenaZakupu"],
          );

          setWynik(wynikKwota);
        }
        break;
      }
      case "olx": {
        if (values["cenaZakupu"] && values["cenaSprzedazy"]) {
          const wynikKwota = values["cenaSprzedazy"] - values["cenaZakupu"];

          setWynik(wynikKwota);
        }
        break;
      }
    }
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.currentTarget.name === "service") {
      return setValues({ ...values, [e.target.name]: e.target.value });
    }
    setValues({ ...values, [e.target.name]: Number(e.target.value) });
  };

  const border = {
    allegro: "hover:border-orange-400 focus:border-orange-400",
    allegrolokalnie: "hover:border-violet-600 focus:border-violet-600",
    olx: "hover:border-cyan-400 focus:border-cyan-400",
  };

  return (
    <Layout>
      <form className={"pt-12"} onSubmit={(e) => handleSubmitForm(e)}>
        <fieldset
          className={
            "flex flex-col gap-4 mx-auto p-10 bg-white text-zinc-900 w-1/2 drop-shadow-xl rounded-md"
          }
        >
          <div className={"flex flex-col gap-2 w-full"}>
            <label htmlFor="form-serwis">Serwis sprzedażowy:</label>
            <select
              name="service"
              id="form-serwis"
              className={cn(
                "outline-orange-400 py-1 px-2 rounded-md border-2 border-gray-400",
                {
                  [border.allegro]: service === "allegro",
                },
                {
                  [border.allegrolokalnie]: service === "allegrolokalnie",
                },
                {
                  [border.olx]: service === "olx",
                },
              )}
              onChange={(e) => {
                handleChangeValue(e);
                e.target.value && setService(e.target.value as ServicesType);
              }}
            >
              <option value="allegro">allegro</option>
              <option value="allegrolokalnie">allegro lokalnie</option>
              <option value="olx">olx</option>
            </select>
          </div>
          <div className={"flex flex-col gap-2 w-full"}>
            <label htmlFor="form-zakup">Cena zakupu:</label>
            <input
              type="number"
              id="form-zakup"
              name="cenaZakupu"
              min={0}
              className={cn(
                "appearance-none outline-none py-1 px-2 rounded-md border-2 border-gray-400 ",
                {
                  [border.allegro]: service === "allegro",
                },
                {
                  [border.allegrolokalnie]: service === "allegrolokalnie",
                },
                {
                  [border.olx]: service === "olx",
                },
              )}
              onChange={handleChangeValue}
            />
          </div>
          <div className={"flex flex-col gap-2 w-full"}>
            <label htmlFor="form-przesylka">Przesyłka:</label>
            <select
              name="przesylka"
              id="form-przesylka"
              className={cn(
                "outline-orange-400 py-1 px-2 rounded-md border-2 border-gray-400",
                {
                  [border.allegro]: service === "allegro",
                },
                {
                  [border.allegrolokalnie]: service === "allegrolokalnie",
                },
                {
                  [border.olx]: service === "olx",
                },
              )}
              onChange={handleChangeValue}
            >
              <option value={8.99}>paczkomat (8,99)</option>
              <option value={10.95}>kurier inpost (10,95)</option>
              <option value={0}>nie dotyczy (0.00)</option>
            </select>
          </div>
          <div className={"flex flex-col gap-2 w-full"}>
            <label htmlFor="form-zakup">Zakładana cena sprzedaży:</label>
            <input
              type="number"
              id="form-zakup"
              name="cenaSprzedazy"
              min={0}
              className={cn(
                "appearance-none outline-none py-1 px-2 rounded-md border-2 border-gray-400 ",
                {
                  [border.allegro]: service === "allegro",
                },
                {
                  [border.allegrolokalnie]: service === "allegrolokalnie",
                },
                {
                  [border.olx]: service === "olx",
                },
              )}
              onChange={handleChangeValue}
            />
          </div>
          <button
            type="submit"
            className={cn(
              "py-2 px-2 rounded-md text-white transition",
              {
                "bg-orange-500 hover:bg-orange-600 focus:bg-orange-600": service === "allegro",
              },
              {
                "bg-violet-600 hover:bg-violet-800 focus:bg-violet-800":
                  service === "allegrolokalnie",
              },
              {
                "bg-cyan-400 hover:bg-cyan-500 focus:bg-cyan-500": service === "olx",
              },
            )}
          >
            Oblicz
          </button>
          {wynik && <p>{wynik}</p>}
          {values.cenaZakupu && wynik && <p>{(wynik / values.cenaZakupu) * 100} %</p>}
        </fieldset>
      </form>
    </Layout>
  );
};

export default Home;
