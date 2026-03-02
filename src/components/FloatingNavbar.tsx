import { Search, Bell, Clock, ChevronDown, User, Settings, LogOut } from "lucide-react";
import KernelLogo from "@/components/KernelLogo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NavLink } from "@/components/NavLink";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";

const teacherNavTabs = [
  { label: "Overview", url: "/dashboard" },
  { label: "Exams", url: "/dashboard/upcoming" },
  { label: "Exam Builder", url: "/dashboard/exam-builder" },
  { label: "Results", url: "/dashboard/results" },
  { label: "Settings", url: "/dashboard/settings" },
];

const studentNavTabs = [
  { label: "Overview", url: "/dashboard" },
  { label: "Exams", url: "/dashboard/upcoming" },
  { label: "Results", url: "/dashboard/results" },
  { label: "Practice", url: "/dashboard/start" },
  { label: "Settings", url: "/dashboard/settings" },
];

export function FloatingNavbar() {
  const navigate = useNavigate();
  const { role } = useRole();
  const navTabs = role === "teacher" ? teacherNavTabs : studentNavTabs;

  return (
    <header className="fixed left-20 right-6 top-4 z-50 flex items-center gap-3 h-12">
      {/* Logo — left pill */}
      <div className="flex items-center gap-2 border border-border bg-card/80 px-4 py-1.5 shadow-lg backdrop-blur-md rounded-full">
        <KernelLogo className="h-6 w-6" />
        <span className="text-lg font-bold tracking-tight text-foreground">Kernel</span>
      </div>

      <div className="flex-1" />

      {/* Nav tabs — centered pill */}
      <div className="flex items-center gap-1 rounded-full border border-border bg-card/80 px-2 py-1.5 shadow-lg backdrop-blur-md">
        {navTabs.map((tab) => (
          <NavLink
            key={tab.label}
            to={tab.url}
            end={tab.url === "/dashboard"}
            className="rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            activeClassName="bg-primary text-primary-foreground"
          >
            {tab.label}
          </NavLink>
        ))}
      </div>

      <div className="flex-1" />

      {/* Action icons — separate rounded pill */}
      <div className="flex items-center gap-1 rounded-full border border-border bg-card/80 px-2 py-1.5 shadow-lg backdrop-blur-md">
        <button
          onClick={() => navigate("/dashboard/editor")}
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Search className="h-4 w-4" />
        </button>
        <button
          onClick={() => navigate("/dashboard/notifications")}
          className="relative flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-primary text-[9px] font-bold text-primary-foreground flex items-center justify-center">2</span>
        </button>
        <button
          onClick={() => navigate("/dashboard/upcoming")}
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Clock className="h-4 w-4" />
        </button>
      </div>

      {/* Profile — dropdown pill */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1.5 shadow-lg backdrop-blur-md transition-colors hover:bg-secondary/50 focus:outline-none">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="bg-primary/20 text-xs font-semibold text-primary">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium leading-none text-foreground">John Doe</p>
              <p className="text-xs text-muted-foreground">john@kernel.dev</p>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 z-[100] bg-card border border-border shadow-xl">
          <DropdownMenuItem onClick={() => navigate("/dashboard/profile")} className="cursor-pointer gap-2">
            <User className="h-4 w-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/dashboard/settings")} className="cursor-pointer gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/")} className="cursor-pointer gap-2 text-destructive focus:text-destructive">
            <LogOut className="h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
