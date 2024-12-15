"use client";
import PostCard from "../../../components/self/postcard";
import { SidebarProvider, SidebarTrigger } from "../../../components/ui/sidebar";
import { AppSidebar } from "@/components/modif/app-siderbar"
import { useGetPosts } from "../../../hooks/posts";
import { RecommendedCards } from "../../../components/modif/recommendationcards";
import { TracingBeam } from "../../../components/ui/tracing-beam";
import { PlaceholdersAndVanishInputDemo } from "../../../components/modif/placeholder";
import Loader from "@/app/loading/page";
import { useCurrentUser } from "@/hooks/user";
import Image from 'next/image';
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function FeedBack() {
  const { posts,isLoading2 } = useGetPosts();
  const {user,isLoading}=useCurrentUser();
  if(isLoading||isLoading2){
    return(
      <Loader></Loader>
    );
  }
  else{
    return (
      <SidebarProvider>
        <AppSidebar user={user} />
        
        <main className="flex">
          <SidebarTrigger />
          <div className="h-screen">
            <div>
            <PlaceholdersAndVanishInputDemo></PlaceholdersAndVanishInputDemo>
            </div>
            <div className="h-[5rem]"></div>
            <TracingBeam className="px-6 ">
            <div>
            {posts?.map((post: any) => {
              return <PostCard key={post.id} data={post}></PostCard>;
            })}
            </div>
            </TracingBeam>
          </div>
          <div className="fixed ml-[45rem]">
          <div className="m-10 px-10">


    

          {user?.recommendedUsers? user.recommendedUsers.length>0?
          <div><div className=" flex justify-center text-center relative top-10 right-10">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
          >
            Users You May Know
          </HoverBorderGradient>
        </div>
        <RecommendedCards user={user}></RecommendedCards></div>
          :null :null
          }
          </div>
          </div>
        </main>
      
      </SidebarProvider>
    );
  } 
}
