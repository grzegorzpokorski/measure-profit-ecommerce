import { createContext, useContext, Dispatch, SetStateAction } from "react";

export type ServicesType = "allegro" | "allegrolokalnie" | "olx";

export type ServiceContextType = {
  service: ServicesType;
  setService: Dispatch<SetStateAction<ServicesType>>;
};

export const ServiceContext = createContext<ServiceContextType | null>(null);

export const useServiceContext = () => {
  const serviceContext = useContext(ServiceContext);

  if (!serviceContext) {
    throw new Error("missing data in ServiceContext!");
  }

  return serviceContext;
};
