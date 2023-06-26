import { ReactNode } from "react";

export default function BottomWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="row-center fixed bottom-0 h-[7%] w-screen bg-muted-foreground">
      {children}
    </div>
  );
}
