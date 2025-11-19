"use client";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { useRouter } from "next/navigation";
import { NavBar } from "@/components/NavBar";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Package, Coins } from "lucide-react";
import { ReactNode } from "react";
import { useItemNavBar } from "@/store/useSelectedItemNavBar";

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  const { selectedItemNavBar } = useItemNavBar();
//   const { user, logout } = useAuthStore();

    const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl: "/path/to/avatar.jpg",
    vbucksBalance: 1500,
  };
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };



  const initials =
    user?.name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <SidebarProvider>
      <NavBar />
      <SidebarInset>
        <div className="flex h-14 shrink-0 items-center justify-between border-b px-4 bg-[#0a3371]">
          <div className="flex flex-row gap-4">
            <SidebarTrigger className="-ml-1 text-white" />
            <h1 className="text-lg font-semibold text-white">
              {selectedItemNavBar}
            </h1>
          </div>

          <div className="flex items-center gap-4">
    
            {!user ? (
              <Button
                variant="outline"
                size="sm"
                className="bg-white text-black hover:bg-slate-100"
                onClick={handleLoginClick}
              >
                Entrar
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <div className="flex items-center gap-2 text-white">
                    <Avatar className="h-8 w-8 border border-white/30 text-black">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium max-w-[140px] truncate">
                      {user.name}
                    </span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      {user.email && (
                        <span className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </span>
                      )}
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => router.push("/inventory")}
                    className="cursor-pointer"
                  >
                    <Package className="mr-2 h-4 w-4" />
                    <span>Meu Perfil</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-2 max-w-full bg-gray-50">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
