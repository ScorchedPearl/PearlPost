'use client'
import { Home, Inbox, Search, Settings } from "lucide-react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { ModeToggle } from "./modetoggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/lib/action";
import { useState,useEffect } from "react";
import { useCurrentUser } from "@/hooks/user";

const items = [
  {
    title: "Home",
    link: "/feedback",
    url: "#",
    icon: Home,
  },
  {
    title: "CreatePost",
    link: "/feedback/createpost",
    url: "#",
    icon: Inbox,
  },
  {
    title: "SearchPost",
    link: "/feedback/searchpost",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    link: "/feedback",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const {user}=useCurrentUser();
console.log(user);
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsername() {
      try {
        const response = await fetch("/api/getUsername");

        if (!response.ok) {
          const { error } = await response.json();
          throw new Error(error || "Failed to fetch username");
        }

        const data = await response.json();
        setUsername(data.username);
      } catch (err:any) {
        setError(err.message);
      }
    }

    fetchUsername();
  }, []);
console.log(username);
  return (
    <div>
    <Sidebar>
      <SidebarContent>
      <SidebarHeader>
      <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <div className="flex pt-2 pb-2">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="text-xl ml-4 mt-1 text-gray-400">{username}</div>
                    </div>
                    {/* <ChevronUp className="ml-auto" /> */}
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span onClick={()=>{logout()}}>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
          </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>
            <span className="mr-32">Application </span>
            <ModeToggle></ModeToggle>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href="">
                      <item.icon />
                      <Link href={item.link}>
                        <span>{item.title}</span>
                      </Link>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    </div>
  );
}
