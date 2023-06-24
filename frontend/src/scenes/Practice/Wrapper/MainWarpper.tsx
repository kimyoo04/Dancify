import { ReactNode } from "react";

export default function MainWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="col-center h-[93%] w-screen bg-muted">{children}</div>
  );
}
