import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import {
  Users, Download, TrendingUp, TrendingDown, BarChart3, CheckCircle, XCircle, FileText,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockExams = [
  { id: "1", name: "CS101 - Midterm", course: "CS101", date: "Feb 15, 2026", submissions: 42, avgScore: 74, passRate: 82 },
  { id: "2", name: "CS201 - Quiz 3", course: "CS201", date: "Feb 10, 2026", submissions: 38, avgScore: 68, passRate: 71 },
  { id: "3", name: "CS101 - Quiz 2", course: "CS101", date: "Feb 05, 2026", submissions: 45, avgScore: 81, passRate: 89 },
  { id: "4", name: "CS301 - Assignment 1", course: "CS301", date: "Jan 28, 2026", submissions: 30, avgScore: 72, passRate: 77 },
];

const mockStudentResults = [
  { id: "1", name: "Ahmed Hassan", score: 92, total: 100, status: "passed", time: "45 min" },
  { id: "2", name: "Sara Ali", score: 88, total: 100, status: "passed", time: "52 min" },
  { id: "3", name: "Omar Khaled", score: 74, total: 100, status: "passed", time: "67 min" },
  { id: "4", name: "Fatima Nour", score: 56, total: 100, status: "failed", time: "80 min" },
  { id: "5", name: "Youssef Tarek", score: 45, total: 100, status: "failed", time: "90 min" },
  { id: "6", name: "Mona Ibrahim", score: 91, total: 100, status: "passed", time: "38 min" },
  { id: "7", name: "Karim Sayed", score: 83, total: 100, status: "passed", time: "55 min" },
  { id: "8", name: "Nada Fouad", score: 67, total: 100, status: "passed", time: "72 min" },
];

const questionPerformance = [
  { name: "Q1 (MCQ)", avgScore: 85, type: "MCQ" },
  { name: "Q2 (MCQ)", avgScore: 72, type: "MCQ" },
  { name: "Q3 (Written)", avgScore: 68, type: "Written" },
  { name: "Q4 (Code)", avgScore: 61, type: "Coding" },
  { name: "Q5 (MCQ)", avgScore: 90, type: "MCQ" },
  { name: "Q6 (Code)", avgScore: 55, type: "Coding" },
];

const gradeDistribution = [
  { name: "A", value: 3, color: "hsl(var(--chart-1))" },
  { name: "B", value: 3, color: "hsl(var(--chart-2))" },
  { name: "C", value: 1, color: "hsl(var(--chart-3))" },
  { name: "F", value: 1, color: "hsl(var(--chart-5))" },
];

const testCaseResults = [
  { name: "TC 1", passRate: 95 },
  { name: "TC 2", passRate: 82 },
  { name: "TC 3", passRate: 68 },
  { name: "TC 4", passRate: 45 },
  { name: "TC 5", passRate: 38 },
];

export default function TeacherResults() {
  const { toast } = useToast();
  const [selectedExam, setSelectedExam] = useState(mockExams[0].id);
  const exam = mockExams.find((e) => e.id === selectedExam)!;
  const passed = mockStudentResults.filter((s) => s.status === "passed").length;
  const failed = mockStudentResults.filter((s) => s.status === "failed").length;
  const classAvg = Math.round(mockStudentResults.reduce((a, s) => a + s.score, 0) / mockStudentResults.length);

  const handleExport = () => {
    const headers = "Name,Score,Total,Status,Time\n";
    const rows = mockStudentResults.map((s) => `${s.name},${s.score},${s.total},${s.status},${s.time}`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${exam.name.replace(/\s+/g, "_")}_results.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Exported", description: "Results downloaded as CSV." });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Results & Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">View student performance and export results</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedExam} onValueChange={setSelectedExam}>
            <SelectTrigger className="w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mockExams.map((e) => (
                <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border/50 bg-card/80 backdrop-blur-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Users className="h-4 w-4" />
              <span className="text-xs">Submissions</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{exam.submissions}</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/80 backdrop-blur-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <BarChart3 className="h-4 w-4" />
              <span className="text-xs">Class Average</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{classAvg}%</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/80 backdrop-blur-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-xs">Passed</span>
            </div>
            <p className="text-2xl font-bold text-green-500">{passed}</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/80 backdrop-blur-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <XCircle className="h-4 w-4 text-destructive" />
              <span className="text-xs">Failed</span>
            </div>
            <p className="text-2xl font-bold text-destructive">{failed}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts row */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Question performance */}
        <Card className="border-border/50 bg-card/80 backdrop-blur-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Question Performance (Class Avg %)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={questionPerformance}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Bar dataKey="avgScore" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Grade distribution */}
        <Card className="border-border/50 bg-card/80 backdrop-blur-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Grade Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={gradeDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                    {gradeDistribution.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Test case pass rates for programming questions */}
      <Card className="border-border/50 bg-card/80 backdrop-blur-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            Programming Question — Test Case Pass Rates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {testCaseResults.map((tc) => (
              <div key={tc.name} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-12">{tc.name}</span>
                <Progress value={tc.passRate} className="h-3 flex-1" />
                <span className={`text-sm font-medium w-12 text-right ${tc.passRate >= 70 ? "text-green-500" : "text-destructive"}`}>
                  {tc.passRate}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Student results table */}
      <Card className="border-border/50 bg-card/80 backdrop-blur-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Student Results — {exam.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time Spent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockStudentResults.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{s.score}/{s.total}</span>
                      <Progress value={s.score} className="h-1.5 w-16" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={s.status === "passed" ? "bg-green-500/15 text-green-500 border-green-500/30" : "bg-destructive/15 text-destructive border-destructive/30"}>
                      {s.status === "passed" ? "Passed" : "Failed"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{s.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
