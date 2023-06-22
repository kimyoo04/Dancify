import Histories from "@scenes/Histories";
import MyPosts from "@scenes/MyPosts";
import { useAppSelector } from "@toolkit/hook";

export default function Storage() {
  const userId = useAppSelector((state) => state.auth.userId);

  return (
    <div>
      <h1>Storage</h1>
      <Histories />
      <MyPosts id={userId} />
    </div>
  );
}
