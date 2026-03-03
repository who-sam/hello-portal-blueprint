import { createContext, useContext, useState, ReactNode } from "react";
import type { AppNotification } from "@/types/exam";

const initialNotifications: AppNotification[] = [
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

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  markAllRead: () => void;
  markAsRead: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markAsRead = (id: string) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAllRead, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotifications must be used within a NotificationProvider");
  return context;
}
