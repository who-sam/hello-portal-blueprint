import { AppSidebar } from "@/components/AppSidebar";
import { FloatingNavbar } from "@/components/FloatingNavbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="relative min-h-screen w-full bg-background">
      {/* Floating top navbar */}
      <FloatingNavbar />

      {/* Floating icon sidebar */}
      <AppSidebar />

      {/* Page content — offset for sidebar + navbar */}
      <main className="ml-20 pt-20 pr-6 pb-6">
        <Outlet />
      </main>
    </div>
  );
}
