import { ReactNode } from "react";

export default function BottomWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="row-center fixed bottom-0 h-[60px] w-screen bg-slate-300 dark:bg-slate-300 dark:text-black">
      {children}
    </div>
  );
}
