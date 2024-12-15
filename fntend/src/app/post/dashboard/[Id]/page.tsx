"use client";
import { Inputmod } from "../../../../components/modif/inputwithbutton2";
import { SidebarProvider, SidebarTrigger } from "../../../../components/ui/sidebar";
import { AppSidebar } from "../../../../components/modif/app-siderbar";
import { useCurrentUser } from "@/hooks/user";
import IconCard from "../../../../components/self/iconcard";
import Multiart from "../../../../components/modif/linechart";
import { useGetPostsByUsername, usePostCount } from "../../../../hooks/posts";
import PostCard from "../../../../components/self/postcard";
import { Button } from "../../../../components/ui/button";
import { useState } from "react";
import Loader from "@/app/loading/page";

export default function FeedBack() {
  let [showPost,setShowposts]=useState(false);
  const { user,isLoading } = useCurrentUser();
  const username = user?.username ? user.username : "lol";
  const { postCount,isLoading3 } = usePostCount(username);
  const { post,isLoading4 }  = useGetPostsByUsername(username);
  const { likeCount }=user?.likes?.length? {likeCount:user.likes.length}: {likeCount:0} ;
  const { followerCount }=user?.followers?.length? {followerCount:user.followers.length}: {followerCount:0} ;
  function handlePosts(){
    setShowposts(!showPost);
    return;
  }
  if(isLoading||isLoading3||isLoading4){
    return<Loader></Loader>
  }
  else{
    return (
      <SidebarProvider>
        <AppSidebar user={user}/>
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
                <IconCard PostCount={postCount} LikeCount={likeCount} FollowerCount={followerCount}></IconCard>
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
  
}
