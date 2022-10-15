import { createContext, useContext, Dispatch, SetStateAction } from "react";

export type FromBackgroundType = {
  formBackground: "bg-orange-600";
};
export type FormContextType = {
  formBackground: FromBackgroundType;
  setService: Dispatch<SetStateAction<FromBackgroundType>>;
};

export const FormContext = createContext<FormContextType | null>(null);

export const useFormContext = () => {
  const formContext = useContext(FormContext);

  if (!formContext) {
    throw new Error("missing data in FormContext!");
  }

  return formContext;
};
