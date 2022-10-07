import cn from "classnames";

type SwitchProps = {
  label: string;
  color: string;
  onChange: () => void;
};

export const Switch = ({ label, color, onChange }: SwitchProps) => {
  return (
    <label
      className={cn("py-2 px-6 text-white border-2 border-white cursor-pointer", `bg-${color}`)}
      htmlFor={`service-${label}`}
    >
      <input
        name="service"
        type="radio"
        id={`service-${label}`}
        className="hidden"
        onChange={() => onChange()}
      />
      <span>{label}</span>
    </label>
  );
};
