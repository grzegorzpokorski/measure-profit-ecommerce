import type { AppProps } from "next/app";
import { ServiceContext, ServicesType } from "../context/ServiceContext";
import { useState } from "react";
import "../styles/style.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const [service, setService] = useState<ServicesType>("allegrolokalnie");

  return (
    <ServiceContext.Provider value={{ service, setService }}>
      <Component {...pageProps} />
    </ServiceContext.Provider>
  );
}

export default MyApp;
