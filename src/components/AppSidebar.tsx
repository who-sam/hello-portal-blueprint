import {
  BarChart3,
  BookOpen,
  Calendar,
  ClipboardCheck,
  HelpCircle,
  LogOut,
  Mail,
  Settings,
  Users,
  Code2,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const mainItems = [
  { icon: BarChart3, url: "/dashboard", label: "Dashboard" },
  { icon: Calendar, url: "/dashboard/upcoming", label: "Upcoming" },
  { icon: ClipboardCheck, url: "/dashboard/results", label: "Results" },
  { icon: Mail, url: "/dashboard/messages", label: "Messages" },
];

const secondaryItems = [
  { icon: Users, url: "/dashboard/team", label: "Team" },
  { icon: Settings, url: "/dashboard/settings", label: "Settings" },
];

function SidebarIcon({
  icon: Icon,
  url,
  label,
  end,
}: {
  icon: React.ElementType;
  url: string;
  label: string;
  end?: boolean;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <NavLink
          to={url}
          end={end}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
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
  return (
    <aside className="fixed left-4 top-20 bottom-6 z-40 flex flex-col items-center gap-3 w-14">
      {/* Logo + brand — standalone rounded pill */}
      <div className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card/80 px-3 py-2 shadow-lg backdrop-blur-md">
        <Code2 className="h-6 w-6 text-primary" />
        <span className="text-sm font-bold tracking-tight text-foreground">
          Exam<span className="text-muted-foreground">.dev</span>
        </span>
      </div>

      {/* Main nav group */}
      <div className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-card/80 px-1.5 py-2 shadow-lg backdrop-blur-md">
        {mainItems.map((item) => (
          <SidebarIcon key={item.label} {...item} end={item.url === "/dashboard"} />
        ))}
      </div>

      {/* Secondary nav group */}
      <div className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-card/80 px-1.5 py-2 shadow-lg backdrop-blur-md">
        {secondaryItems.map((item) => (
          <SidebarIcon key={item.label} {...item} />
        ))}
      </div>

      <div className="flex-1" />

      {/* Footer group — Help & Logout */}
      <div className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-card/80 px-1.5 py-2 shadow-lg backdrop-blur-md">
        <SidebarIcon icon={HelpCircle} url="/dashboard/help" label="Help" />
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
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
