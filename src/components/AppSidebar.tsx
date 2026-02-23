import {
  BarChart3,
  BookOpen,
  ClipboardCheck,
  Play,
  Settings,
  LogOut,
  Code2,
  HelpCircle,
  Phone,
  Users,
  Mail,
  Calendar,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const topItems = [
  { icon: Settings, url: "/dashboard/config", label: "Config" },
  { icon: Phone, url: "/dashboard/contact", label: "Contact" },
];

const mainItems = [
  { icon: BarChart3, url: "/dashboard", label: "Dashboard" },
  { icon: Calendar, url: "/dashboard/upcoming", label: "Upcoming" },
  { icon: ClipboardCheck, url: "/dashboard/results", label: "Results" },
  { icon: Mail, url: "/dashboard/messages", label: "Messages" },
];

const bottomItems = [
  { icon: Users, url: "/dashboard/team", label: "Team" },
  { icon: Settings, url: "/dashboard/settings", label: "Settings" },
];

const footerItems = [
  { icon: HelpCircle, url: "/dashboard/help", label: "Help" },
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
    <aside className="fixed left-4 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center gap-1 rounded-2xl border border-border bg-card/80 px-1.5 py-3 shadow-xl backdrop-blur-md">
      {/* Top section */}
      {topItems.map((item) => (
        <SidebarIcon key={item.label} {...item} />
      ))}

      <div className="my-1.5 h-px w-6 bg-border" />

      {/* Main nav */}
      {mainItems.map((item) => (
        <SidebarIcon
          key={item.label}
          {...item}
          end={item.url === "/dashboard"}
        />
      ))}

      <div className="my-1.5 h-px w-6 bg-border" />

      {/* Bottom nav */}
      {bottomItems.map((item) => (
        <SidebarIcon key={item.label} {...item} />
      ))}

      <div className="flex-1" />
      <div className="my-1.5 h-px w-6 bg-border" />

      {/* Footer */}
      {footerItems.map((item) => (
        <SidebarIcon key={item.label} {...item} />
      ))}

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
    </aside>
  );
}
