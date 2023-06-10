import OnePageLayout from "@layouts/OnePageLayout";
import Search from "@scenes/Search";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
  description: "Search forms built using the components.",
};

export default function SearchPage() {
  return (
    <OnePageLayout>
      <Search />
    </OnePageLayout>
  );
}
