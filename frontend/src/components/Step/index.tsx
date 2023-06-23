import { ReactNode } from "react";

interface StepPorps {
  isActive: boolean;
  children: ReactNode;
}

export default function Step({ isActive, children }: StepPorps) {
  return <>{isActive ? children : null}</>;
}
