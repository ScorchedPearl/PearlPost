import { AppSidebar } from "@/components/modif/app-siderbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Profile() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div>
        <SidebarTrigger />
        <div>
          <div className="w-full h-full ">
            
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
