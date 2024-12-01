"use client";
import { AppSidebar } from "../../../../components/modif/app-siderbar";
import { SidebarProvider } from "../../../../components/ui/sidebar";
import { usePostCount } from "../../../../hooks/posts";
import { useCurrentUser, useCurrentUserById } from "@/hooks/user";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { GiCaptainHatProfile } from "react-icons/gi";
import React, { useCallback, useMemo } from "react";
import { BentoGrid, BentoGridItem } from "../../../../components/ui/bento-grid";
import Image from "next/image";
import { BackgroundBeams } from "../../../../components/ui/background-beams";
import { usePathname } from 'next/navigation';
import { graphqlClient } from "../../../../../clients/api";
import { followUserMutation, unfollowUserMutation } from "graphql/mutation/user";
import { useQueryClient } from "@tanstack/react-query";
export default function Profile() {
  const pathname = usePathname();
  const lastSegment = pathname?.split('/').pop();
  const { userid } = useCurrentUserById(lastSegment?lastSegment:"");
  const username = userid?.username ? userid.username : "lol";
  const { postCount } = usePostCount(username);
  const { user }=useCurrentUser();
  console.log(lastSegment);
  const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
      {/* <Image
        src={user?.posts?.[props.value]?.imageUrl || "" }
        alt="Post Image"
        width={100}
        height={100}
        className="rounded-xl"
      /> */}
    </div>
  );
  const amiFollowing=useMemo(()=>{
    if(!userid){
      return false;
    }
    return (user?.following?.findIndex((follower)=>follower?.username===userid?.username)??-1)>=0
  },[user?.following,userid])
  const queryClient=useQueryClient();
  const handleFollowUser=useCallback(async()=>{
    console.log("CLicked");
    if(!userid?.id) return;
    else{
      await graphqlClient.request(followUserMutation as any,{to:userid?.id})
      await queryClient.invalidateQueries(["current-user",userid?.id]as any)
    }
  },[queryClient,userid?.id])
  const handleUnfollowUser=useCallback(async()=>{
    console.log("CLicked");
    if(!userid?.id) return;
    else{
      await graphqlClient.request(unfollowUserMutation as any,{to:userid?.id})
      await queryClient.invalidateQueries(["current-user",userid?.id]as any)
    }
  },[queryClient,userid?.id])
  const items = userid?.posts?.map((post, index) => ({
    title: post?.title || null,
    description: post?.content || null,
    header: <Image src={post?.imageURL as any} alt={<Skeleton ></Skeleton> as any} width={500} height={500}/>,
    // icon: post?.tags?[1]: null,
  })) || [];
  return (
    <SidebarProvider>
      <AppSidebar />
      <div>
        {/* <SidebarTrigger /> */}
        <div>
          <div className="w-screen h-screen">
            <nav className="flex">
              <GiCaptainHatProfile className="ml-4 text-4xl" />
              <div>
                <div className="text-xl ml-4 bottom-2 relative">
                  {userid?.name}
                </div>
                <div className="text-sm ml-4 bottom-4 relative text-gray-500">
                  {postCount} Posts
                </div>
              </div>{" "}
            </nav>
            <div className="flex items-center justify-between">
              <div>
                <div>
                  <Avatar>
                    <AvatarImage
                      className="rounded-full ml-20 mt-10 h-32 w-32"
                      src={
                        userid && userid.profileImageURL
                          ? userid.profileImageURL
                          : "https://avatars.githubusercontent.com/u/184803610?s=96&v=4"
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-24 text-2xl">{userid?.name}</div>
                <div className="ml-24 text-sm text-gray-500">
                  @{userid?.username}
                </div>
              </div>
              <div className="mr-96 z-50">
                {(userid?.username!==user?.username)&&<>
                {
                  amiFollowing ? (
                    <button onClick={handleUnfollowUser}className="bg-blue-500 z-50 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Following
                    </button>
                  ) : (
                    <button onClick={handleFollowUser}className="bg-blue-500 z-50 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Follow
                    </button>
                  )
                }
                </>}
              </div>
            </div>
            <div className="ml-24">
              {/* BIO
              <br />
              ..
              <br />
              .. ..
              <br />
              .. .. ..
              <br /> */}
            </div>
            <div className="ml-24 flex gap-4 text-gray-500 text-sm "><span>Following-{userid?.following?.length}  </span><span>Follower-{userid?.followers?.length}</span></div>
            <BentoGrid></BentoGrid>

            <div className="relative right-48">
              <BentoGrid className="max-w-4xl mx-auto">
                {items.map((item, i) => (
                  <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    // icon={item.icon}
                    className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                  />
                ))}
              </BentoGrid>
            </div>
          </div>
        </div>
        <BackgroundBeams />
      </div>
    </SidebarProvider>
  );
}
