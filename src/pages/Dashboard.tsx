import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Play,
  Clock,
  Trophy,
  TrendingUp,
  BookOpen,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const upcomingExams = [
  { id: 1, name: "JavaScript Fundamentals", date: "Feb 25, 2026", duration: "90 min", difficulty: "Medium", questions: 40 },
  { id: 2, name: "React & TypeScript", date: "Mar 01, 2026", duration: "120 min", difficulty: "Hard", questions: 35 },
  { id: 3, name: "Data Structures & Algorithms", date: "Mar 05, 2026", duration: "150 min", difficulty: "Hard", questions: 25 },
  { id: 4, name: "CSS & Responsive Design", date: "Mar 10, 2026", duration: "60 min", difficulty: "Easy", questions: 30 },
];

const pastResults = [
  { id: 1, name: "Python Basics", date: "Feb 15, 2026", score: 92, total: 100, status: "passed" },
  { id: 2, name: "SQL Masterclass", date: "Feb 10, 2026", score: 78, total: 100, status: "passed" },
  { id: 3, name: "Node.js Advanced", date: "Feb 05, 2026", score: 45, total: 100, status: "failed" },
  { id: 4, name: "Git & Version Control", date: "Jan 28, 2026", score: 88, total: 100, status: "passed" },
  { id: 5, name: "HTML5 Essentials", date: "Jan 20, 2026", score: 95, total: 100, status: "passed" },
];

const stats = [
  { label: "Exams Taken", value: "24", icon: BookOpen, color: "text-primary" },
  { label: "Average Score", value: "82%", icon: TrendingUp, color: "text-accent" },
  { label: "Pass Rate", value: "87%", icon: Trophy, color: "text-green-400" },
  { label: "Hours Spent", value: "48h", icon: Clock, color: "text-blue-400" },
];

const difficultyColor = (d: string) => {
  if (d === "Easy") return "bg-green-500/15 text-green-400 border-green-500/30";
  if (d === "Medium") return "bg-accent/15 text-accent border-accent/30";
  return "bg-destructive/15 text-destructive border-destructive/30";
};

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, John 👋</h1>
        <p className="mt-1 text-muted-foreground">Here's an overview of your exam progress.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="border-border/50">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Start */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
        <CardContent className="flex flex-col items-center gap-4 p-8 sm:flex-row sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Ready to test your skills?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Jump into a practice exam or start a scheduled one right away.
            </p>
          </div>
          <Button size="lg" className="gap-2 text-base font-semibold">
            <Play className="h-5 w-5" />
            Start Practice Exam
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Upcoming Exams */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-primary" />
              Upcoming Exams
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingExams.map((exam) => (
              <div
                key={exam.id}
                className="flex items-center justify-between rounded-xl border border-border/50 bg-secondary/30 p-4 transition-colors hover:bg-secondary/60"
              >
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{exam.name}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{exam.date}</span>
                    <span>•</span>
                    <span>{exam.duration}</span>
                    <span>•</span>
                    <span>{exam.questions} questions</span>
                  </div>
                </div>
                <Badge variant="outline" className={difficultyColor(exam.difficulty)}>
                  {exam.difficulty}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Past Results */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Trophy className="h-5 w-5 text-accent" />
              Recent Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Exam</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pastResults.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell className="text-muted-foreground">{r.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={r.score} className="h-2 w-16" />
                        <span className="text-sm font-medium">{r.score}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {r.status === "passed" ? (
                        <div className="flex items-center gap-1 text-green-400">
                          <CheckCircle2 className="h-4 w-4" />
                          <span className="text-xs font-medium">Passed</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-destructive">
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-xs font-medium">Failed</span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-primary" />
            Performance by Category
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { name: "JavaScript", score: 88 },
            { name: "Python", score: 92 },
            { name: "React", score: 75 },
            { name: "SQL", score: 78 },
            { name: "Data Structures", score: 65 },
          ].map((cat) => (
            <div key={cat.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">{cat.name}</span>
                <span className="font-medium text-muted-foreground">{cat.score}%</span>
              </div>
              <Progress value={cat.score} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
