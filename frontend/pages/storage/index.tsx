import MainLayout from "@layouts/MainLayout";
import Storage from "@scenes/Storage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Storage",
  description: "Storage Page",
};

export default function StoragePage() {
  return (
    <MainLayout>
      <Storage />
    </MainLayout>
  );
}
