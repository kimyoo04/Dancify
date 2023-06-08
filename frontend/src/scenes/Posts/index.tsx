import { Metadata } from "next";
import Link from "next/link";

import { Button } from "@components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@components/ui/tabs";

import { playlists } from "./data/playlists";
import { ShoppingBag } from "lucide-react";

import SideBar from "./SideBar";
import AllPosts from "./All";
import FreePosts from "./Free";
import VideoPosts from "./Video";

export const metadata: Metadata = {
  title: "Music App",
  description: "Example music app using the components.",
};

export default function Posts() {
  return (
    <>
      <div className="container bg-background">
        <div className="grid grid-cols-3 lg:grid-cols-5">
          <SideBar playlists={playlists} className="hidden lg:block" />
          <div className="col-span-3 lg:col-span-4 lg:border-l">
            <div className="h-full py-6 lg:px-8">
              <Tabs defaultValue="all" className="h-full space-y-6">
                <div className="row-center">
                  {/* 게시판 고르는 탭 목록 */}
                  <TabsList>
                    <TabsTrigger value="all">전체</TabsTrigger>
                    <TabsTrigger value="video">자랑게시판</TabsTrigger>
                    <TabsTrigger value="free">자유게시판</TabsTrigger>
                  </TabsList>

                  {/* 게시글 쓰기 버튼*/}
                  <Link href={"/storage"} className="ml-auto">
                    <Button>
                      <ShoppingBag className="mr-2 h-4 w-4" />내 보관함
                    </Button>
                  </Link>
                </div>

                {/* 전체 보기 */}
                <AllPosts />

                {/* 자유게시판 보기 */}
                <VideoPosts />

                {/* 자유게시판 보기 */}
                <FreePosts />
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
