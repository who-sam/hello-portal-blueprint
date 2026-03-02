import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  BookOpen, Flame, FileText, Award, Lock, CheckCircle,
  Zap, Globe, Target, Trophy, Star, Settings,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import type { Achievement } from "@/types/exam";

const performanceData = [
  { month: "Sep", score: 72 },
  { month: "Oct", score: 78 },
  { month: "Nov", score: 65 },
  { month: "Dec", score: 82 },
  { month: "Jan", score: 88 },
  { month: "Feb", score: 91 },
];

const skills = [
  { topic: "Arrays", percent: 85 },
  { topic: "Strings", percent: 72 },
  { topic: "Trees", percent: 60 },
  { topic: "Dynamic Programming", percent: 45 },
  { topic: "Graphs", percent: 68 },
];

const recentActivity = [
  { text: "Submitted Midterm Exam", time: "2 hours ago" },
  { text: "Achieved 'Speed Demon' badge", time: "1 day ago" },
  { text: "Completed Practice Set #12", time: "2 days ago" },
  { text: "Joined class CS301", time: "5 days ago" },
  { text: "Scored 95% on Quiz 3", time: "1 week ago" },
];

const submissions = [
  { id: "mid-cs201", exam: "Midterm CS201", score: 88, language: "Python", date: "2026-02-28", status: "graded" },
  { id: "quiz-3", exam: "Quiz 3 - Arrays", score: 95, language: "JavaScript", date: "2026-02-20", status: "graded" },
  { id: "practice-12", exam: "Practice Set #12", score: 72, language: "C++", date: "2026-02-18", status: "graded" },
  { id: "pop-strings", exam: "Pop Quiz - Strings", score: 60, language: "Python", date: "2026-02-10", status: "graded" },
  { id: "final-cs101", exam: "Final CS101", score: 91, language: "Java", date: "2026-01-15", status: "graded" },
];

const achievements: Achievement[] = [
  { id: "1", name: "First Submit", description: "Submit your first exam", icon: "CheckCircle", maxProgress: 1, unlocked: true, earnedAt: "2025-09-15" },
  { id: "2", name: "Perfect Score", description: "Score 100% on any exam", icon: "Star", maxProgress: 1, unlocked: true, earnedAt: "2025-11-20" },
  { id: "3", name: "10 Exams Completed", description: "Complete 10 exams", icon: "Trophy", maxProgress: 10, progress: 8, unlocked: false },
  { id: "4", name: "Speed Demon", description: "Finish an exam in under half the time", icon: "Zap", maxProgress: 1, unlocked: true, earnedAt: "2026-02-27" },
  { id: "5", name: "Polyglot", description: "Submit in 3 different languages", icon: "Globe", maxProgress: 3, progress: 3, unlocked: true, earnedAt: "2026-01-10" },
  { id: "6", name: "Streak Master", description: "Maintain a 30-day streak", icon: "Flame", maxProgress: 30, progress: 12, unlocked: false },
  { id: "7", name: "Top 3", description: "Rank in the top 3 on the leaderboard", icon: "Target", maxProgress: 1, unlocked: false, progress: 0 },
  { id: "8", name: "Bookworm", description: "Complete all practice sets", icon: "BookOpen", maxProgress: 15, progress: 12, unlocked: false },
];

const iconMap: Record<string, React.ElementType> = {
  CheckCircle, Star, Trophy, Zap, Globe, Flame, Target, BookOpen,
};

export default function Profile() {
  const navigate = useNavigate();
  const { name, email } = useUser();
  const [tab, setTab] = useState("overview");

  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-card/80 backdrop-blur-md border-border/50">
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-6">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-primary/20 text-2xl font-bold text-primary">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">{name}</h1>
              <Badge variant="secondary">Student</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{email}</p>
            <p className="text-sm text-muted-foreground">Member since September 2025</p>
            <p className="text-sm text-foreground/80 mt-2">Passionate about algorithms and competitive programming. Currently studying CS at MIT.</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/dashboard/settings")} className="gap-2">
            <Settings className="h-4 w-4" /> Edit Profile
          </Button>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Exams Taken", value: "24", icon: FileText },
          { label: "Average Score", value: "82%", icon: Award },
          { label: "Total Submissions", value: "47", icon: CheckCircle },
          { label: "Current Streak", value: "12 days", icon: Flame },
        ].map((s) => (
          <Card key={s.label} className="bg-card/80 backdrop-blur-md border-border/50">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-full bg-primary/10 p-3">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-4">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-card/80 backdrop-blur-md border-border/50">
              <CardHeader><CardTitle className="text-base">Performance Trend</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                    <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-md border-border/50">
              <CardHeader><CardTitle className="text-base">Skill Breakdown</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {skills.map((s) => (
                  <div key={s.topic} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground">{s.topic}</span>
                      <span className="text-muted-foreground">{s.percent}%</span>
                    </div>
                    <Progress value={s.percent} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-card/80 backdrop-blur-md border-border/50">
              <CardHeader><CardTitle className="text-base">Recent Activity</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((a, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="text-sm text-foreground">{a.text}</p>
                        <p className="text-xs text-muted-foreground">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-md border-border/50">
              <CardHeader><CardTitle className="text-base">Classes Enrolled</CardTitle></CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {["CS101 - Intro to CS", "CS201 - Data Structures", "CS301 - Algorithms", "MATH201 - Discrete Math"].map((c) => (
                  <Badge key={c} variant="secondary">{c}</Badge>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="submissions" className="mt-4">
          <Card className="bg-card/80 backdrop-blur-md border-border/50">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exam Name</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Language</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((s) => (
                    <TableRow
                      key={s.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => navigate(`/dashboard/exam/${s.id}/review`)}
                    >
                      <TableCell className="font-medium text-foreground">{s.exam}</TableCell>
                      <TableCell className="text-foreground">{s.score}%</TableCell>
                      <TableCell className="text-muted-foreground">{s.language}</TableCell>
                      <TableCell className="text-muted-foreground">{s.date}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="capitalize">{s.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((a) => {
              const Icon = iconMap[a.icon] || Award;
              return (
                <Card key={a.id} className={`bg-card/80 backdrop-blur-md border-border/50 transition-all ${!a.unlocked ? "opacity-50 grayscale" : ""}`}>
                  <CardContent className="flex flex-col items-center text-center gap-3 pt-6">
                    <div className={`rounded-full p-3 ${a.unlocked ? "bg-primary/15" : "bg-muted"}`}>
                      {a.unlocked ? <Icon className="h-6 w-6 text-primary" /> : <Lock className="h-6 w-6 text-muted-foreground" />}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{a.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{a.description}</p>
                    </div>
                    {a.unlocked ? (
                      <p className="text-xs text-primary">{a.earnedAt}</p>
                    ) : (
                      <div className="w-full space-y-1">
                        <Progress value={((a.progress || 0) / a.maxProgress) * 100} className="h-1.5" />
                        <p className="text-xs text-muted-foreground">{a.progress}/{a.maxProgress}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
