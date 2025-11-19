import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useItemNavBar } from "@/store/useSelectedItemNavBar";
import { data } from "@/utils/data/itensNavBar";
import Image from "next/image";

export function NavBar(props: React.ComponentProps<typeof Sidebar>) {
  const { isMobile, toggleSidebar } = useSidebar();
  const activeTeam = data.teams[0];
  const { selectedItemNavBar, setSelectedItemNavBar } = useItemNavBar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-[#0a3371]">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="bg-[#0a3371] text-sidebar-primary-foreground flex aspect-square size-12 items-center justify-center rounded-lg">
                    <Image
                        src={activeTeam.logo}
                        alt={activeTeam.name}
                        width={64}
                        height={64}
                      />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium text-white">
                      {activeTeam.name}
                    </span>
                    <span className="truncate text-xs text-gray-400">{activeTeam.plan}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>

        
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-[#0a3371]">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white"> ESO</SidebarGroupLabel>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title} className="text-white">
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a
                    href={item.to}
                    className={
                      "flex items-center gap-2 " +
                      (selectedItemNavBar === item.title
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "")
                    }
                    onClick={() => {
                      if (isMobile) toggleSidebar?.();
                      setSelectedItemNavBar(item.title);
                    }}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
