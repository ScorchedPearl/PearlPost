"use client";
import PostCard from "@/components/self/postcard";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/modif/app-siderbar";
import { Button } from "@/components/ui/button";
import { useGetPosts } from "@/hooks/posts";
import { RecommendedCards } from "@/components/modif/recommendationcards";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { PlaceholdersAndVanishInputDemo } from "@/components/modif/placeholder";
import { Spotlight } from "@/components/ui/spotlight";

export default function FeedBack() {
  const { posts } = useGetPosts();

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex">
        <SidebarTrigger />
        <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
        <div className="h-screen">
          <div>
          <PlaceholdersAndVanishInputDemo></PlaceholdersAndVanishInputDemo>
          </div>
          <div className="h-[5rem]"></div>
          <div>

        <TracingBeam className="px-6 ">
          {posts?.map((post: any) => {
            return <PostCard key={post.id} data={post}></PostCard>;
          })}
          </TracingBeam>
          </div>
        </div>
        <div className="fixed ml-[45rem]">
        <div className="m-10 px-10">
        <h3 className="relative top-2">Want To Create A Post</h3>{" "}
        <Button className="mx-5">Create Post</Button>
          <RecommendedCards></RecommendedCards>
        </div>
        </div>
      </main>
    </SidebarProvider>
  );
}