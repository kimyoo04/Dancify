import { buttonVariants } from "@components/ui/button";
import { useAppSelector } from "@toolkit/hook";
import { cn } from "@lib/utils";

interface StepNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    title: string;
    step: number;
  }[];
}

export default function StepNav({ className, items, ...props }: StepNavProps) {
  const step = useAppSelector((state) => state.post.step);

  return (
    <nav className={cn("flex md:space-x-2", className)} {...props}>
      {items.map((item) => (
        <button
          key={item.step}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            step === item.step
              ? "bg-primary text-white hover:bg-primary"
              : "hidden hover:bg-transparent md:block",
            "justify-start"
          )}
        >
          {item.title}
        </button>
      ))}
    </nav>
  );
}
