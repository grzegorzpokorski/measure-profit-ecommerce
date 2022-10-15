import { ReactNode } from "react";

type LayoutProps = {
  children?: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return <div className={"mx-auto w-full md:w-2/3 lg:w-1/2"}>{children}</div>;
};
