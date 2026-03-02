import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bell, Clock, CheckCircle, Megaphone, UserPlus, Send } from "lucide-react";
import type { AppNotification } from "@/types/exam";

const mockNotifications: AppNotification[] = [
  { id: "1", type: "exam", title: "Midterm Exam Tomorrow", description: "CS201 Midterm starts at 10:00 AM. Make sure to review your notes.", timestamp: "2 hours ago", read: false, linkTo: "/dashboard/upcoming" },
  { id: "2", type: "result", title: "Quiz 3 Results Published", description: "Your score: 95%. View detailed breakdown.", timestamp: "5 hours ago", read: false, linkTo: "/dashboard/results" },
  { id: "3", type: "class", title: "Welcome to CS301", description: "You have been enrolled in CS301 - Algorithms by Prof. Smith.", timestamp: "1 day ago", read: true, linkTo: "/dashboard/team" },
  { id: "4", type: "submission", title: "Practice Set #12 Submitted", description: "Your submission has been received and is being graded.", timestamp: "2 days ago", read: true, linkTo: "/dashboard/results" },
  { id: "5", type: "system", title: "Platform Update", description: "New coding editor features are now available. Try the improved autocomplete!", timestamp: "3 days ago", read: true, linkTo: "/dashboard/editor" },
  { id: "6", type: "exam", title: "Pop Quiz in 30 Minutes", description: "CS201 pop quiz starting soon. Head to the exam page.", timestamp: "4 days ago", read: true, linkTo: "/dashboard/upcoming" },
  { id: "7", type: "result", title: "Final CS101 Graded", description: "Your final exam has been graded. Score: 91%.", timestamp: "1 week ago", read: true, linkTo: "/dashboard/results" },
  { id: "8", type: "class", title: "New Classmate Joined", description: "Grace Liu has joined CS201 - Data Structures.", timestamp: "1 week ago", read: true, linkTo: "/dashboard/team" },
  { id: "9", type: "submission", title: "Code Review Ready", description: "Your coding submission for Linked Lists has been reviewed.", timestamp: "2 weeks ago", read: true, linkTo: "/dashboard/results" },
  { id: "10", type: "system", title: "Scheduled Maintenance", description: "Platform will be down for maintenance on March 5 from 2-4 AM.", timestamp: "2 weeks ago", read: true, linkTo: "/dashboard/help" },
];

const typeConfig: Record<string, { icon: React.ElementType; color: string }> = {
  exam: { icon: Clock, color: "text-amber-500 bg-amber-500/10" },
  result: { icon: CheckCircle, color: "text-green-500 bg-green-500/10" },
  class: { icon: UserPlus, color: "text-purple-500 bg-purple-500/10" },
  submission: { icon: Send, color: "text-green-600 bg-green-600/10" },
  system: { icon: Megaphone, color: "text-blue-500 bg-blue-500/10" },
};

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? notifications : notifications.filter((n) => n.type === filter);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          {unreadCount > 0 && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">{unreadCount}</span>
          )}
        </div>
        <Button variant="ghost" size="sm" onClick={markAllRead}>Mark all as read</Button>
      </div>

      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="exam">Exams</TabsTrigger>
          <TabsTrigger value="class">Classes</TabsTrigger>
          <TabsTrigger value="result">Results</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-4">
          {filtered.length === 0 ? (
            <Card className="bg-card/80 backdrop-blur-md border-border/50">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-foreground">No notifications yet</p>
                <p className="text-sm text-muted-foreground mt-1">You're all caught up!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {filtered.map((n) => {
                const config = typeConfig[n.type];
                const Icon = config.icon;
                return (
                  <Card
                    key={n.id}
                    className={`bg-card/80 backdrop-blur-md border-border/50 cursor-pointer transition-all hover:bg-secondary/30 ${!n.read ? "border-l-2 border-l-primary" : ""}`}
                    onClick={() => navigate(n.linkTo)}
                  >
                    <CardContent className="flex items-center gap-4 py-4">
                      <div className={`rounded-full p-2.5 shrink-0 ${config.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${!n.read ? "font-semibold text-foreground" : "text-foreground"}`}>{n.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">{n.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{n.timestamp}</p>
                      </div>
                      {!n.read && <div className="h-2.5 w-2.5 rounded-full bg-primary shrink-0" />}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
