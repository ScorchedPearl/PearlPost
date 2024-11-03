"use client";
import PostCard from "@/components/self/postcard";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/modif/app-siderbar";

export default function FeedBack() {

  return (
    <SidebarProvider>
      <AppSidebar/>
      <main>
        <SidebarTrigger />
        <div className="h-screen overflow-scroll w-6/12">
          <PostCard></PostCard>
          <PostCard></PostCard>
          <PostCard></PostCard>
          <PostCard></PostCard>
          <PostCard></PostCard>
          <PostCard></PostCard>
          <PostCard></PostCard>

        </div>
      </main>
    </SidebarProvider>
  );
}
