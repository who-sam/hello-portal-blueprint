import { Search, Bell, Clock, ChevronDown, Code2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NavLink } from "@/components/NavLink";

const navTabs = [
{ label: "Overview", url: "/dashboard" },
{ label: "Exams", url: "/dashboard/upcoming" },
{ label: "Results", url: "/dashboard/results" },
{ label: "Practice", url: "/dashboard/start" },
{ label: "Settings", url: "/dashboard/settings" }];


export function FloatingNavbar() {
  return (
    <header className="fixed left-20 right-6 top-4 z-50 flex items-center gap-3 h-12">
      {/* Logo — left pill */}
      <div className="flex items-center gap-2 border border-border bg-card/80 px-4 py-1.5 shadow-lg backdrop-blur-md rounded-full">
        <Code2 className="h-5 w-5 text-primary" />
        <span className="text-lg font-bold tracking-tight text-foreground">
          Exam<span className="text-muted-foreground">.dev</span>
        </span>
      </div>

      <div className="flex-1" />

      {/* Nav tabs — centered pill */}
      <div className="flex items-center gap-1 rounded-2xl border border-border bg-card/80 px-2 py-1.5 shadow-lg backdrop-blur-md">
        {navTabs.map((tab) =>
        <NavLink
          key={tab.label}
          to={tab.url}
          end={tab.url === "/dashboard"}
          className="rounded-xl px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          activeClassName="bg-primary text-primary-foreground">

            {tab.label}
          </NavLink>
        )}
      </div>

      <div className="flex-1" />

      {/* Action icons — separate rounded pill */}
      <div className="flex items-center gap-1 rounded-2xl border border-border bg-card/80 px-2 py-1.5 shadow-lg backdrop-blur-md">
        <button className="flex h-8 w-8 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
          <Search className="h-4 w-4" />
        </button>
        <button className="flex h-8 w-8 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
          <Bell className="h-4 w-4" />
        </button>
        <button className="flex h-8 w-8 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
          <Clock className="h-4 w-4" />
        </button>
      </div>

      {/* Profile — separate rounded pill */}
      <div className="flex items-center gap-2 rounded-2xl border border-border bg-card/80 px-3 py-1.5 shadow-lg backdrop-blur-md">
        <Avatar className="h-7 w-7">
          <AvatarFallback className="bg-primary/20 text-xs font-semibold text-primary">
            JD
          </AvatarFallback>
        </Avatar>
        <div className="hidden text-left sm:block">
          <p className="text-sm font-medium leading-none text-foreground">John Doe</p>
          <p className="text-xs text-muted-foreground">john@exam.dev</p>
        </div>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </div>
    </header>);

}