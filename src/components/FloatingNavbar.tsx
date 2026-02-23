import { Code2, Search, Bell, Clock } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NavLink } from "@/components/NavLink";

const navTabs = [
  { label: "Overview", url: "/dashboard" },
  { label: "Exams", url: "/dashboard/upcoming" },
  { label: "Results", url: "/dashboard/results" },
  { label: "Practice", url: "/dashboard/start" },
  { label: "Settings", url: "/dashboard/settings" },
];

export function FloatingNavbar() {
  return (
    <header className="fixed left-20 right-6 top-4 z-50 flex items-center justify-between rounded-2xl border border-border bg-card/80 px-6 py-3 shadow-xl backdrop-blur-md">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Code2 className="h-6 w-6 text-primary" />
        <span className="text-lg font-bold tracking-tight text-foreground">
          Exam<span className="text-muted-foreground">.dev</span>
        </span>
      </div>

      {/* Nav tabs */}
      <nav className="flex items-center gap-1">
        {navTabs.map((tab) => (
          <NavLink
            key={tab.label}
            to={tab.url}
            end={tab.url === "/dashboard"}
            className="rounded-lg px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            activeClassName="bg-primary text-primary-foreground"
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
          <Search className="h-4 w-4" />
        </button>
        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
          <Bell className="h-4 w-4" />
        </button>
        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
          <Clock className="h-4 w-4" />
        </button>

        <div className="ml-1 h-6 w-px bg-border" />

        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/20 text-xs font-semibold text-primary">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium leading-none text-foreground">John Doe</p>
            <p className="text-xs text-muted-foreground">john@exam.dev</p>
          </div>
        </div>
      </div>
    </header>
  );
}
