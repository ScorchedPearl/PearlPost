"use client";
import { AppSidebar } from "@/components/modif/app-siderbar";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { usePostCount } from "@/hooks/posts";
import { useCurrentUser, useCurrentUserById } from "@/hooks/user";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { GiCaptainHatProfile } from "react-icons/gi";
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import Image from "next/image";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { usePathname } from 'next/navigation';
export default function Profile() {
  const pathname = usePathname();
  const lastSegment = pathname?.split('/').pop();
  const { user } = useCurrentUserById(lastSegment?lastSegment:"");
  const username = user?.username ? user.username : "lol";
  const { postCount } = usePostCount(username);
  console.log(lastSegment);
  const Skeleton = (props) => (
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
  const items = user?.posts?.map((post, index) => ({
    title: post?.title || null,
    description: post?.content || null,
    header: <Image src={post?.imageURL as any} alt={<Skeleton value={index}></Skeleton> as any} width={500} height={500}/>,
    // icon: post?.tags?[1]: null,
  })) || [];
  return (
    <SidebarProvider>
      <AppSidebar />
      <div>
        <SidebarTrigger />
        <div>
          <div className="w-screen h-screen">
            <nav className="flex">
              <GiCaptainHatProfile className="ml-4 text-4xl" />
              <div>
                <div className="text-xl ml-4 bottom-2 relative">
                  {user?.name}
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
                      className="rounded-full ml-40 mt-20 h-32 w-32"
                      src={
                        user && user.profileImageURL
                          ? user.profileImageURL
                          : "https://avatars.githubusercontent.com/u/184803610?s=96&v=4"
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-44 text-2xl">{user?.name}</div>
                <div className="ml-44 text-sm text-gray-500">
                  @{user?.username}
                </div>
              </div>
              <div className="mr-96">
                <Button>Edit Profile</Button>
              </div>
            </div>
            <div className="ml-44">
              BIO
              <br />
              ..
              <br />
              .. ..
              <br />
              .. .. ..
              <br />
            </div>
            <div className="ml-44">Following- Follower-</div>
            <BentoGrid></BentoGrid>

            <div className="relative right-28">
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
