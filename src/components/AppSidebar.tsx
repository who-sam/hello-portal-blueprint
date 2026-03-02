import { useState } from "react";
import {
  BarChart3,
  Calendar,
  ClipboardCheck,
  Code2,
  HelpCircle,
  LogOut,
  Mail,
  Settings,
  Users,
  Sun,
  Moon,
  FilePlus2,
  GraduationCap,
  User,
  Trophy,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useRole } from "@/contexts/RoleContext";

const teacherMainItems = [
  { icon: BarChart3, url: "/dashboard", label: "Dashboard" },
  { icon: FilePlus2, url: "/dashboard/exam-builder", label: "Exam Builder" },
  { icon: ClipboardCheck, url: "/dashboard/results", label: "Results" },
  { icon: Mail, url: "/dashboard/messages", label: "Messages" },
];

const teacherSecondaryItems = [
  { icon: Users, url: "/dashboard/team", label: "Team" },
  { icon: Settings, url: "/dashboard/settings", label: "Settings" },
];

const studentMainItems = [
  { icon: BarChart3, url: "/dashboard", label: "Dashboard" },
  { icon: User, url: "/dashboard/profile", label: "Profile" },
  { icon: Trophy, url: "/dashboard/leaderboard", label: "Leaderboard" },
  { icon: Code2, url: "/dashboard/editor", label: "Code Editor" },
  { icon: Calendar, url: "/dashboard/upcoming", label: "Upcoming" },
  { icon: ClipboardCheck, url: "/dashboard/results", label: "Results" },
  { icon: Mail, url: "/dashboard/messages", label: "Messages" },
];

const studentSecondaryItems = [
  { icon: Settings, url: "/dashboard/settings", label: "Settings" },
];

function SidebarIcon({
  icon: Icon,
  url,
  label,
  end,
}: { icon: React.ElementType; url: string; label: string; end?: boolean }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <NavLink
          to={url}
          end={end}
          className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          activeClassName="bg-primary/15 text-primary"
        >
          <Icon className="h-5 w-5" />
        </NavLink>
      </TooltipTrigger>
      <TooltipContent side="right" className="text-xs">
        {label}
      </TooltipContent>
    </Tooltip>
  );
}

export function AppSidebar() {
  const [isDark, setIsDark] = useState(true);
  const { role } = useRole();

  const mainItems = role === "teacher" ? teacherMainItems : studentMainItems;
  const secondaryItems = role === "teacher" ? teacherSecondaryItems : studentSecondaryItems;

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <aside className="fixed left-4 top-20 bottom-6 z-40 flex flex-col items-center gap-3 w-14">
      {/* Theme toggle — top */}
      <div className="flex flex-col items-center border border-border bg-card/80 px-1.5 py-1.5 shadow-lg backdrop-blur-md rounded-full">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-xs">
            {isDark ? "Light mode" : "Dark mode"}
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="flex-1" />

      {/* Main nav group — centered */}
      <div className="flex flex-col items-center gap-1 border border-border bg-card/80 px-1.5 py-2 shadow-lg backdrop-blur-md rounded-full">
        {mainItems.map((item) => (
          <SidebarIcon key={item.label} {...item} end={item.url === "/dashboard"} />
        ))}
      </div>

      {/* Secondary nav group — centered */}
      <div className="flex flex-col items-center gap-1 rounded-full border border-border bg-card/80 px-1.5 py-2 shadow-lg backdrop-blur-md">
        {secondaryItems.map((item) => (
          <SidebarIcon key={item.label} {...item} />
        ))}
      </div>

      <div className="flex-1" />

      {/* Footer group — Help & Logout */}
      <div className="flex flex-col items-center gap-1 border border-border bg-card/80 px-1.5 py-2 shadow-lg backdrop-blur-md rounded-full">
        <SidebarIcon icon={HelpCircle} url="/dashboard/help" label="Help" />
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
              <LogOut className="h-5 w-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-xs">
            Logout
          </TooltipContent>
        </Tooltip>
      </div>
    </aside>
  );
}
