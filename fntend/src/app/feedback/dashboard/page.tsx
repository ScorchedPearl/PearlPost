import { InputWithButton } from "@/components/modif/inputwithbutton2";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/modif/app-siderbar";

export default function FeedBack() {

  return (
    <SidebarProvider>
      <AppSidebar/>
      <main>
        <SidebarTrigger />
        <div>
          <div className="flex">
            <div className="w-1/6 left-0"> <InputWithButton></InputWithButton></div>
            <div className="w-1/6 right-0"></div>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
