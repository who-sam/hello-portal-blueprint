import { useState } from "react";
import { Mail, MailOpen, Star, Trash2, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const initialMessages = [
  { id: 1, from: "Kernel Team", initials: "KT", subject: "Welcome to Kernel!", body: "Thanks for joining Kernel. Start by exploring your dashboard, setting up your profile, and taking your first practice exam.", time: "2h ago", read: false, starred: false, type: "system" },
  { id: 2, from: "Dr. Sarah Chen", initials: "SC", subject: "React Exam Feedback", body: "Great job on your React exam! Your understanding of hooks is solid. I'd recommend reviewing useReducer and custom hooks for the next assessment.", time: "1d ago", read: false, starred: true, type: "feedback" },
  { id: 3, from: "Study Group", initials: "SG", subject: "DSA Session Tomorrow", body: "Hey team, our Data Structures study session is tomorrow at 3 PM. We'll be covering binary trees and graph traversal algorithms.", time: "2d ago", read: true, starred: false, type: "group" },
  { id: 4, from: "Kernel Team", initials: "KT", subject: "New Exam Available: SQL Mastery", body: "A new practice exam is now available! Test your SQL skills with 35 questions covering joins, subqueries, and window functions.", time: "3d ago", read: true, starred: false, type: "system" },
  { id: 5, from: "Alex Rivera", initials: "AR", subject: "TypeScript Study Notes", body: "I've compiled notes from our TypeScript session. Attached are the key takeaways on generics, utility types, and type narrowing techniques.", time: "5d ago", read: true, starred: true, type: "direct" },
];

const typeColor = (t: string) => {
  if (t === "system") return "bg-primary/15 text-primary border-primary/30";
  if (t === "feedback") return "bg-green-500/15 text-green-500 border-green-500/30";
  if (t === "group") return "bg-accent/15 text-accent border-accent/30";
  return "bg-secondary text-secondary-foreground border-border";
};

export default function MessagesPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const selected = messages.find((m) => m.id === selectedId);
  const filtered = messages.filter((m) => m.subject.toLowerCase().includes(search.toLowerCase()) || m.from.toLowerCase().includes(search.toLowerCase()));
  const unread = messages.filter((m) => !m.read).length;

  const toggleRead = (id: number) => setMessages((ms) => ms.map((m) => m.id === id ? { ...m, read: !m.read } : m));
  const toggleStar = (id: number) => setMessages((ms) => ms.map((m) => m.id === id ? { ...m, starred: !m.starred } : m));
  const deleteMsg = (id: number) => { setMessages((ms) => ms.filter((m) => m.id !== id)); if (selectedId === id) setSelectedId(null); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Messages</h1>
          <p className="mt-1 text-muted-foreground">{unread} unread message{unread !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        {/* Message list */}
        <Card className="xl:col-span-2 border-border/50">
          <CardHeader className="pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search messages..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1 max-h-[500px] overflow-y-auto">
            {filtered.map((msg) => (
              <div
                key={msg.id}
                onClick={() => { setSelectedId(msg.id); if (!msg.read) toggleRead(msg.id); }}
                className={`flex items-start gap-3 rounded-xl p-3 cursor-pointer transition-all ${
                  selectedId === msg.id ? "bg-primary/5 border border-primary/30" : "hover:bg-secondary/50"
                } ${!msg.read ? "bg-secondary/30" : ""}`}
              >
                <Avatar className="h-9 w-9 mt-0.5">
                  <AvatarFallback className="bg-primary/10 text-xs text-primary">{msg.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm truncate ${!msg.read ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{msg.from}</p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{msg.time}</span>
                  </div>
                  <p className={`text-sm truncate ${!msg.read ? "font-medium text-foreground" : "text-muted-foreground"}`}>{msg.subject}</p>
                </div>
                {!msg.read && <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Message detail */}
        <Card className="xl:col-span-3 border-border/50">
          {selected ? (
            <>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{selected.subject}</CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">From: {selected.from}</span>
                      <Badge variant="outline" className={typeColor(selected.type)}>{selected.type}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button size="icon" variant="ghost" onClick={() => toggleStar(selected.id)}>
                      <Star className={`h-4 w-4 ${selected.starred ? "fill-accent text-accent" : "text-muted-foreground"}`} />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => toggleRead(selected.id)}>
                      {selected.read ? <MailOpen className="h-4 w-4 text-muted-foreground" /> : <Mail className="h-4 w-4 text-primary" />}
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => deleteMsg(selected.id)} className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4">
                <p className="text-sm leading-relaxed text-foreground">{selected.body}</p>
                <p className="mt-4 text-xs text-muted-foreground">{selected.time}</p>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex h-64 items-center justify-center">
              <p className="text-muted-foreground">Select a message to read</p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
