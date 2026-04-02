import { Bell, Clock, ChevronDown, User, Settings, LogOut, Menu, Search, Sun, Moon } from "lucide-react";
import ApexLogo from "@/components/ApexLogo";
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
import { useState, useEffect, useRef } from "react";
import { BookOpen, FileText, BarChart3, Code, GraduationCap } from "lucide-react";

const teacherNavTabs = [
  { label: "Dashboard", url: "/dashboard" },
  { label: "Courses", url: "/dashboard/courses" },
  { label: "Exam Builder", url: "/dashboard/exam-builder" },
  { label: "Question Bank", url: "/dashboard/question-bank" },
  { label: "Results", url: "/dashboard/results" },
];

const studentNavTabs = [
  { label: "Dashboard", url: "/dashboard" },
  { label: "Courses", url: "/dashboard/courses" },
  { label: "Exams", url: "/dashboard/exams" },
  { label: "Playground", url: "/dashboard/playground" },
  { label: "Results", url: "/dashboard/results" },
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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

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
    clearRole();
    setUser({ firstName: "", lastName: "", email: "" });
    navigate("/");
  };

  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  const searchItems = [
    { label: "Dashboard", url: "/dashboard", icon: BarChart3, category: "Pages" },
    { label: "Courses", url: "/dashboard/courses", icon: BookOpen, category: "Pages" },
    { label: "CS101 — Intro to Programming", url: "/dashboard/courses/APX-CS101", icon: BookOpen, category: "Courses" },
    { label: "CS201 — Data Structures", url: "/dashboard/courses/APX-CS201", icon: BookOpen, category: "Courses" },
    { label: "CS301 — Algorithms", url: "/dashboard/courses/APX-CS301", icon: BookOpen, category: "Courses" },
    { label: "Exam Builder", url: "/dashboard/exam-builder", icon: FileText, category: "Pages" },
    { label: "Question Bank", url: "/dashboard/question-bank", icon: BookOpen, category: "Pages" },
    { label: "Grade Written", url: "/dashboard/grade-written", icon: FileText, category: "Pages" },
    { label: "Results & Analytics", url: "/dashboard/results", icon: BarChart3, category: "Pages" },
    ...(role === "student" ? [
      { label: "Upcoming Exams", url: "/dashboard/exams", icon: GraduationCap, category: "Pages" },
      { label: "Playground", url: "/dashboard/playground", icon: Code, category: "Pages" },
    ] : []),
  ];

  const filtered = searchItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group by category
  const grouped = filtered.reduce<Record<string, typeof filtered>>((acc, item) => {
    const cat = item.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      navigate(filtered[selectedIndex].url);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  let flatIndex = -1;

  return (
    <>
      <header className="fixed left-4 right-4 sm:left-6 sm:right-6 top-3 sm:top-4 z-50 flex items-center gap-2 sm:gap-3 h-12">
        {isMobile && (
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            className="flex items-center justify-center border border-border bg-card/80 px-3 py-1.5 shadow-lg backdrop-blur-md rounded-full"
          >
            <Menu className="h-5 w-5 text-foreground" />
          </button>
        )}

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 border border-border bg-card/80 px-3 sm:px-4 py-1.5 shadow-lg backdrop-blur-md rounded-full cursor-pointer"
        >
          <ApexLogo className="h-6 w-6" />
          {!isMobile && <span className="text-lg font-bold tracking-tight text-foreground">APEX</span>}
        </button>

        {!isMobile && (
          <>
            <div className="flex-1" />
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full border border-border bg-card/80 px-2 py-1.5 shadow-lg backdrop-blur-md">
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
          </>
        )}

        {isMobile && <div className="flex-1" />}

        <div className="flex items-center gap-1 rounded-full border border-border bg-card/80 px-2 py-1.5 shadow-lg backdrop-blur-md">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Search className="h-4 w-4" />
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
            <button className="flex items-center gap-2 rounded-full border border-border bg-card/80 px-2 sm:px-3 py-1.5 shadow-lg backdrop-blur-md transition-colors hover:bg-secondary/50 focus:outline-none">
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
          <div className="flex items-center gap-2 mb-6 pt-2">
            <ApexLogo className="h-6 w-6" />
            <span className="text-lg font-bold tracking-tight text-foreground">APEX</span>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-muted-foreground px-2 mb-2">Navigation</p>
            {navTabs.map((tab) => (
              <NavLink
                key={tab.label}
                to={tab.url}
                end={tab.url === "/dashboard"}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                activeClassName="bg-primary/15 text-primary font-medium"
              >
                {tab.label}
              </NavLink>
            ))}
            <div className="border-t border-border my-3" />
            <NavLink
              to="/dashboard/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeClassName="bg-primary/15 text-primary font-medium"
            >
              <User className="h-4 w-4" />
              Profile
            </NavLink>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {isDark ? "Light Mode" : "Dark Mode"}
            </button>
            <button
              onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-destructive transition-colors hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Search overlay — polished command palette */}
      <Dialog open={searchOpen} onOpenChange={(open) => { setSearchOpen(open); if (!open) setSearchQuery(""); }}>
        <DialogContent className="sm:max-w-lg p-0 bg-card border-border overflow-hidden gap-0 [&>button]:hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              autoFocus
              placeholder="Search courses, exams, pages..."
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ESC
            </kbd>
          </div>
          <div ref={listRef} className="max-h-72 overflow-y-auto p-2">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <Search className="h-8 w-8 mb-2 opacity-40" />
                <p className="text-sm font-medium">No results found</p>
                <p className="text-xs mt-1">Try a different search term</p>
              </div>
            ) : (
              Object.entries(grouped).map(([category, items]) => (
                <div key={category} className="mb-1">
                  <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">{category}</p>
                  {items.map((item) => {
                    flatIndex++;
                    const thisIndex = flatIndex;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.url}
                        onClick={() => { navigate(item.url); setSearchOpen(false); setSearchQuery(""); }}
                        data-selected={thisIndex === selectedIndex}
                        className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-secondary/60 data-[selected=true]:bg-secondary/60"
                      >
                        {Icon && <Icon className="h-4 w-4 text-muted-foreground shrink-0" />}
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>
          <div className="border-t border-border px-4 py-2 flex items-center gap-4 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1"><kbd className="rounded border border-border bg-muted px-1 font-mono">↑↓</kbd> Navigate</span>
            <span className="flex items-center gap-1"><kbd className="rounded border border-border bg-muted px-1 font-mono">↵</kbd> Open</span>
            <span className="flex items-center gap-1"><kbd className="rounded border border-border bg-muted px-1 font-mono">esc</kbd> Close</span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
