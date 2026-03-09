import { Bell, Clock, ChevronDown, User, Settings, LogOut, Menu, Command, Sun, Moon } from "lucide-react";
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
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";
import { useUser } from "@/contexts/UserContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const teacherNavTabs = [
  { label: "Dashboard", url: "/dashboard" },
  { label: "Courses", url: "/dashboard/courses" },
  { label: "Exam Builder", url: "/dashboard/exam-builder" },
  { label: "Results", url: "/dashboard/results" },
  { label: "Settings", url: "/dashboard/settings" },
];

const studentNavTabs = [
  { label: "Dashboard", url: "/dashboard" },
  { label: "Exams", url: "/dashboard/exams" },
  { label: "Playground", url: "/dashboard/playground" },
  { label: "Results", url: "/dashboard/results" },
  { label: "Settings", url: "/dashboard/settings" },
];

export function FloatingNavbar() {
  const navigate = useNavigate();
  const { role, clearRole } = useRole();
  const { name, email, setUser } = useUser();
  const { unreadCount } = useNotifications();
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const navTabs = role === "teacher" ? teacherNavTabs : studentNavTabs;
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const initials = name
    ? name.split(" ").filter(Boolean).map((n) => n[0]?.toUpperCase() || "").join("").slice(0, 2)
    : "";

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("kernel-user-name");
    localStorage.removeItem("kernel-user-email");
    clearRole();
    setUser("", "");
    navigate("/");
  };

  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  const searchItems = [
    { label: "Dashboard", url: "/dashboard" },
    { label: "Profile", url: "/dashboard/profile" },
    { label: "Playground", url: "/dashboard/playground" },
    { label: "Exams", url: "/dashboard/exams" },
    { label: "Results", url: "/dashboard/results" },
    { label: "Settings", url: "/dashboard/settings" },
    { label: "Courses", url: "/dashboard/courses" },
    { label: "Exam Builder", url: "/dashboard/exam-builder" },
  ];

  return (
    <>
      <header className="fixed left-6 right-6 top-4 z-50 flex items-center gap-3 h-12">
        {isMobile && (
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            className="flex items-center justify-center border border-border bg-card/80 px-3 py-1.5 shadow-lg backdrop-blur-md rounded-full"
          >
            <Menu className="h-5 w-5 text-foreground" />
          </button>
        )}

        <div className="flex items-center gap-2 border border-border bg-card/80 px-4 py-1.5 shadow-lg backdrop-blur-md rounded-full">
          <KernelLogo className="h-6 w-6" />
          <span className="text-lg font-bold tracking-tight text-foreground">Kernel</span>
        </div>

        <div className="flex-1" />

        {!isMobile && (
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
        )}

        <div className="flex-1" />

        <div className="flex items-center gap-1 rounded-full border border-border bg-card/80 px-2 py-1.5 shadow-lg backdrop-blur-md">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Command className="h-4 w-4" />
          </button>
          {!isMobile && (
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1.5 shadow-lg backdrop-blur-md transition-colors hover:bg-secondary/50 focus:outline-none">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary/20 text-xs font-semibold text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              {!isMobile && (
                <div className="hidden text-left sm:block">
                  <p className="text-sm font-medium leading-none text-foreground">{name}</p>
                  <p className="text-xs text-muted-foreground">{email}</p>
                </div>
              )}
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
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer gap-2 text-destructive focus:text-destructive">
              <LogOut className="h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Mobile nav sheet */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-72 p-4 bg-background border-border">
          <div className="flex flex-col gap-2 pt-4">
            <p className="text-xs font-medium text-muted-foreground px-2 mb-2">Navigation</p>
            {navTabs.map((tab) => (
              <NavLink
                key={tab.label}
                to={tab.url}
                end={tab.url === "/dashboard"}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                activeClassName="bg-primary/15 text-primary font-medium"
              >
                {tab.label}
              </NavLink>
            ))}
            <div className="border-t border-border my-2" />
            <NavLink
              to="/dashboard/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeClassName="bg-primary/15 text-primary font-medium"
            >
              <User className="h-4 w-4" />
              Profile
            </NavLink>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {isDark ? "Light Mode" : "Dark Mode"}
            </button>
            <button
              onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Search overlay */}
      <Dialog open={searchOpen} onOpenChange={(open) => { setSearchOpen(open); if (!open) setSearchQuery(""); }}>
        <DialogContent className="sm:max-w-md p-0 bg-card/95 backdrop-blur-xl border-border/50 overflow-hidden">
          <div className="p-4 border-b border-border">
            <input
              autoFocus
              placeholder="Search pages..."
              className="w-full bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="search-input"
            />
          </div>
          <div className="max-h-64 overflow-y-auto p-2">
            {(() => {
              const filtered = searchItems.filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase()));
              if (filtered.length === 0) {
                return <p className="text-sm text-muted-foreground text-center py-4">No results found</p>;
              }
              return filtered.map((item) => (
                <button
                  key={item.url}
                  onClick={() => { navigate(item.url); setSearchOpen(false); setSearchQuery(""); }}
                  className="w-full text-left rounded-lg px-3 py-2 text-sm text-foreground hover:bg-secondary/50 transition-colors"
                >
                  {item.label}
                </button>
              ));
            })()}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
