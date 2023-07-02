import { Separator } from "@components/ui/separator";
import Histories from "@scenes/Histories";
import MyPosts from "@scenes/MyPosts";
import { useAppSelector } from "@toolkit/hook";

export default function Storage() {
  const userId = useAppSelector((state) => state.auth.userId);

  return (
    <div className="space-y-4">
      <MyPosts id={userId} />

      <Separator className="my-4" />

      <Histories />
    </div>
  );
}
