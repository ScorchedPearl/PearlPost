"use client";
import { Inputmod } from "@/components/modif/inputwithbutton2";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/modif/app-siderbar";
import { useCurrentUser } from "@/hooks/user";
import IconCard from "@/components/self/iconcard";
import Multiart from "@/components/modif/linechart";
import { useGetPostsByUsername, usePostCount } from "@/hooks/posts";
import PostCard from "@/components/self/postcard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function FeedBack() {
  let [showPost,setShowposts]=useState(false);
  const { user } = useCurrentUser();
  const username = user?.username ? user.username : "lol";
  const { postCount } = usePostCount(username);
  const { post }  = useGetPostsByUsername(username);
  function handlePosts(){
    setShowposts(!showPost);
    return;
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <div>
        <SidebarTrigger />
        <div>
          <div className="w-full h-full ">
            <Inputmod></Inputmod>
            <div className="ml-4">
              <h1 className="text-3xl pt-10 font-bold">DashBoard</h1>
              <h4 className="text-sm font-bold  text-green-600">
                Welcome To {user?.name} Dashboard
              </h4>
            </div>
            <br />
            <div>
              <IconCard PostCount={postCount}></IconCard>
            </div>
            <div className="pt-5">
              <Multiart></Multiart>
            </div>
            <Button onClick={handlePosts}></Button>
            {showPost&&<div className="h-80 overflow-scroll w-6/12">
              {post?.map((post: any) => {
                return <PostCard key={post.id} data={post}></PostCard>;
              })}
            </div>}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
