import { ReactNode } from "react";
import { useServiceContext } from "../../context/ServiceContext";
import cn from "classnames";

type LayoutProps = {
  children?: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const { service } = useServiceContext();
  return (
    <div
      className={cn(
        "min-w-full min-h-screen",
        { "bg-orange-600": service === "allegro" },
        { "bg-violet-800": service === "allegrolokalnie" },
        { "bg-cyan-400": service === "olx" },
      )}
    >
      {children}
    </div>
  );
};
