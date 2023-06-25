import { ReactNode } from "react";

export default function MainWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="col-center h-full w-screen p-6 sm:p-10">{children}</div>
  );
}
