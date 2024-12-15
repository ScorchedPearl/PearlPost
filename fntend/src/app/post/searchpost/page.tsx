"use client";
import PostCard from "../../../components/self/postcard";
import { SidebarProvider, SidebarTrigger } from "../../../components/ui/sidebar";
import { AppSidebar } from "@/components/modif/app-siderbar"
import { Button } from "../../../components/ui/button";
import { useGetPosts } from "../../../hooks/posts";
import { RecommendedCards } from "../../../components/modif/recommendationcards";
import { TracingBeam } from "../../../components/ui/tracing-beam";
import { PlaceholdersAndVanishInputDemo } from "../../../components/modif/placeholder";
import Loader from "@/app/loading/page";
import { useCurrentUser } from "@/hooks/user";


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
          <h3 className="relative top-2">Want To Create A Post</h3>{" "}
          <Button className="mx-5">Create Post</Button>
            <RecommendedCards></RecommendedCards>
          </div>
          </div>
        </main>
        
      </SidebarProvider>
    );
  } 
}
