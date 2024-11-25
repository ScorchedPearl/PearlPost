"use client";
import PostCard from "@/components/self/postcard";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/modif/app-siderbar";
import { Button } from "@/components/ui/button";
import { useGetPosts } from "@/hooks/posts";
export default function FeedBack() {
const {posts}=useGetPosts()
  return (
    <SidebarProvider>
      <AppSidebar/>
      <main className="flex">
        <SidebarTrigger />
        <div className="h-screen overflow-scroll w-6/12">
        {
          posts?.map((post:any)=>{
            return <PostCard key={post.id} data={post}></PostCard>
          })
        }
        </div>
        <div className="m-10 px-10 flex"> <h3 className="relative top-2">Want To Create A Post</h3> <Button className="mx-5">Create Post</Button></div>
      </main>
    </SidebarProvider>
  );
}
