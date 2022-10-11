import { Input } from "../input/Input";
import { Select } from "../select/Select";

export const Form = () => {
  const handleInputChange = (e) => {
    console.log(e.target.name);

    handleFormChange();
  };

  const handleFormChange = () => {
    console.log("form change");
  };

  return (
    <form className={"w-full md:w-2/3 lg:w-1/2 mx-auto bg-zinc-300"}>
      <fieldset className={"p-8 flex flex-col gap-4"}>
        <legend className={"sr-only"}>Oblicz zysk ze sprzedaży</legend>
        <Select
          name="nazwaSerwisu"
          label="Nazwa serwisu aukcyjnego"
          onChange={handleInputChange}
          options={["allegro", "allegrolokalnie", "olx"]}
        />
        <Input name="cenaZakupu" label="Cena zakupu:" type="text" onChange={handleInputChange} />
        <Input
          name="cenaSprzedazy"
          label="Cena sprzedaży:"
          type="text"
          onChange={handleInputChange}
        />
      </fieldset>
    </form>
  );
};
