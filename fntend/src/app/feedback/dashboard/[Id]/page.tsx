'use client'
import { Inputmod } from "@/components/modif/inputwithbutton2";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/modif/app-siderbar";
import { useCurrentUser } from "@/hooks/user";
import IconCard from "@/components/self/iconcard";
import Multiart from "@/components/modif/linechart";
import usePostCount from "@/hooks/usepostcount";

export default function FeedBack() {
  const {user}=useCurrentUser();
  const username= user?.username? user.username:"lol"
  const {posts}=usePostCount(username);
  return (
    <SidebarProvider>
      <AppSidebar/>
      <div>
        <SidebarTrigger />
        <div>
          <div className="w-full h-full ">
            <Inputmod></Inputmod>
            <div className="ml-4"><h1 className="text-3xl pt-10 font-bold">DashBoard</h1>
            <h4 className="text-sm font-bold  text-green-600">Welcome To {user?.name} Dashboard</h4></div>
            <br />
            <div>
              <IconCard PostCount={posts}></IconCard>
            </div>
            <div className="pt-5">
              <Multiart></Multiart>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}