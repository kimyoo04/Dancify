import { Button } from "@components/ui/button";
import { useAppSelector } from "@toolkit/hook";
import { Pencil } from "lucide-react";
import Link from "next/link";

export default function CreateButton({ category }: { category: string }) {
  const isOpen = useAppSelector((state) => state.sideBar.isOpen);
  const paddingleft = isOpen ? "md:pl-[200px]" : "md:pl-[72px]";

  return (
    <div
      className={`row-center fixed bottom-20 left-0 right-0 z-20 mx-auto md:bottom-6 ${paddingleft}`}
    >
      <Link href={`/${category}/new`}>
        <Button className="shadow-md hover:scale-110">
          <Pencil className="text-white" />
        </Button>
      </Link>
    </div>
  );
}
