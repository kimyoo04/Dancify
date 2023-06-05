import MainLayout from "@layouts/MainLayout";
import Likes from "@scenes/Likes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Likes",
  description: "Likes Page",
};

export default function LikesPage() {
  return (
    <MainLayout>
      <Likes />
    </MainLayout>
  );
}
