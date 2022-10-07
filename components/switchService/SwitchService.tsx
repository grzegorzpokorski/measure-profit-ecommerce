import { useServiceContext } from "../../context/ServiceContext";
import { Switch } from "./Switch";

export const SwitchService = () => {
  const { setService } = useServiceContext();

  return (
    <form className={"flex flex-row w-full gap-4 justify-center py-12"}>
      <Switch label="allegro" color="orange-600" onChange={() => setService("allegro")} />
      <Switch
        label="allegrolokalnie"
        color="violet-800"
        onChange={() => setService("allegrolokalnie")}
      />
      <Switch label="olx" color="cyan-400" onChange={() => setService("olx")} />
    </form>
  );
};
