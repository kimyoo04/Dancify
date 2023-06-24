import { ReactNode } from "react";

export default function BottomWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="row-center h-[7%] w-screen bg-red-500">{children}</div>
  );
}
