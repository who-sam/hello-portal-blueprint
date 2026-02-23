import {
  BookOpen,
  ClipboardCheck,
  BarChart3,
  Play,
  Settings,
  LogOut,
  Code2,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
  { title: "Upcoming Exams", url: "/dashboard/upcoming", icon: BookOpen },
  { title: "Past Results", url: "/dashboard/results", icon: ClipboardCheck },
  { title: "Quick Start", url: "/dashboard/start", icon: Play },
];

const bottomItems = [
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-border bg-card">
      <div className="flex items-center gap-2 px-6 py-5">
        <Code2 className="h-6 w-6 text-primary" />
        <span className="text-lg font-bold text-foreground tracking-tight">
          Exam<span className="text-muted-foreground">.dev</span>
        </span>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/60">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      activeClassName="bg-primary/10 text-primary font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        <SidebarMenu>
          {bottomItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <NavLink
                  to={item.url}
                  end
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  activeClassName="bg-primary/10 text-primary font-medium"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
