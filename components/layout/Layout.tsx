import { ReactNode } from "react";

type LayoutProps = {
  children?: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return <div className={"min-w-full min-h-screen bg-orange-500"}>{children}</div>;
};
