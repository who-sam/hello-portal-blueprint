import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRole } from "@/contexts/RoleContext";
import { useToast } from "@/hooks/use-toast";
import {
  BookOpen, ArrowLeft, Clock, FileText, Megaphone, Trophy,
  Users, Copy, Check, Upload, Plus, Search, MoreHorizontal,
  Trash2, Eye,
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

/* ── Mock data ── */
const courseData: Record<string, { name: string; teacher: string; id: string }> = {
  "KRN-CS101": { name: "CS101 — Intro to Programming", teacher: "Dr. Smith", id: "KRN-CS101" },
  "KRN-CS201": { name: "CS201 — Data Structures", teacher: "Prof. Johnson", id: "KRN-CS201" },
  "KRN-CS301": { name: "CS301 — Algorithms", teacher: "Dr. Williams", id: "KRN-CS301" },
};

const courseExams = [
  { id: "mid-ds", name: "Midterm Exam", date: "Mar 28, 2026", duration: "90 min", status: "upcoming" as const, score: null },
  { id: "quiz-3", name: "Quiz 3 — Linked Lists", date: "Mar 20, 2026", duration: "30 min", status: "completed" as const, score: 85 },
  { id: "quiz-2", name: "Quiz 2 — Stacks & Queues", date: "Mar 10, 2026", duration: "30 min", status: "completed" as const, score: 92 },
  { id: "quiz-1", name: "Quiz 1 — Arrays", date: "Feb 28, 2026", duration: "30 min", status: "completed" as const, score: 78 },
];

const courseGrades = [
  { exam: "Quiz 3 — Linked Lists", score: 85, total: 100, date: "Mar 20, 2026" },
  { exam: "Quiz 2 — Stacks & Queues", score: 92, total: 100, date: "Mar 10, 2026" },
  { exam: "Quiz 1 — Arrays", score: 78, total: 100, date: "Feb 28, 2026" },
];

const courseAnnouncements = [
  { id: 1, title: "Midterm Exam Scheduled", body: "The midterm exam will be held on March 28th. It will cover all material from weeks 1–7.", date: "Mar 15, 2026" },
  { id: 2, title: "Office Hours Change", body: "Office hours this week will be moved to Thursday 3–5 PM instead of the usual Wednesday slot.", date: "Mar 12, 2026" },
  { id: 3, title: "Quiz 3 Results", body: "Quiz 3 results are now available. Class average was 81%. Great work everyone!", date: "Mar 21, 2026" },
];

const enrolledStudents = [
  { id: "S001", name: "Ahmed Salem", nationalId: "29901XXXXXX", avg: 85 },
  { id: "S002", name: "Maria Khan", nationalId: "30001XXXXXX", avg: 91 },
  { id: "S003", name: "Liam Park", nationalId: "29905XXXXXX", avg: 72 },
  { id: "S004", name: "Sara Reda", nationalId: "30003XXXXXX", avg: 88 },
  { id: "S005", name: "James Liu", nationalId: "29908XXXXXX", avg: 65 },
];

const statusColor = (s: string) => {
  if (s === "upcoming") return "bg-accent/15 text-accent border-accent/30";
  if (s === "completed") return "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30";
  return "bg-muted text-muted-foreground";
};

const gradeColor = (pct: number) => {
  if (pct >= 90) return "text-green-600 dark:text-green-400";
  if (pct >= 75) return "text-accent";
  if (pct >= 60) return "text-yellow-600 dark:text-yellow-400";
  return "text-destructive";
};

/* ================================================================
   STUDENT COURSE DETAIL
   ================================================================ */
function StudentCourseDetail({ course }: { course: { name: string; teacher: string; id: string } }) {
  const navigate = useNavigate();

  const overallAvg = courseGrades.length
    ? Math.round(courseGrades.reduce((s, g) => s + (g.score / g.total) * 100, 0) / courseGrades.length)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard/courses")} className="mt-1 shrink-0">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            {course.name}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Instructor: {course.teacher} • Course ID: <span className="font-mono">{course.id}</span>
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-sm text-muted-foreground">Overall Average</p>
          <p className={`text-2xl font-bold ${gradeColor(overallAvg)}`}>{overallAvg}%</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="exams" className="space-y-4">
        <TabsList>
          <TabsTrigger value="exams" className="gap-1.5">
            <FileText className="h-4 w-4" /> Exams
          </TabsTrigger>
          <TabsTrigger value="grades" className="gap-1.5">
            <Trophy className="h-4 w-4" /> Grades
          </TabsTrigger>
          <TabsTrigger value="announcements" className="gap-1.5">
            <Megaphone className="h-4 w-4" /> Announcements
          </TabsTrigger>
        </TabsList>

        {/* EXAMS TAB */}
        <TabsContent value="exams" className="space-y-3">
          {courseExams.map((exam) => (
            <Card
              key={exam.id}
              className="border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => {
                if (exam.status === "upcoming") navigate(`/dashboard/exam/${exam.id}/take`);
                else navigate(`/dashboard/exam/${exam.id}/review`);
              }}
            >
              <CardContent className="flex items-center justify-between p-4">
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{exam.name}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{exam.date}</span>
                    <span>•</span>
                    <span>{exam.duration}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {exam.score !== null && (
                    <span className={`text-lg font-bold ${gradeColor(exam.score)}`}>{exam.score}%</span>
                  )}
                  <Badge variant="outline" className={statusColor(exam.status)}>
                    {exam.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* GRADES TAB */}
        <TabsContent value="grades" className="space-y-4">
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50 text-muted-foreground">
                    <th className="px-5 py-3 text-left font-medium">Assessment</th>
                    <th className="px-3 py-3 text-left font-medium">Date</th>
                    <th className="px-3 py-3 text-right font-medium">Score</th>
                    <th className="px-3 py-3 text-right font-medium">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {courseGrades.map((g, i) => {
                    const pct = Math.round((g.score / g.total) * 100);
                    return (
                      <tr key={i} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                        <td className="px-5 py-3 font-medium text-foreground">{g.exam}</td>
                        <td className="px-3 py-3 text-muted-foreground">{g.date}</td>
                        <td className="px-3 py-3 text-right text-foreground">{g.score}/{g.total}</td>
                        <td className={`px-3 py-3 text-right font-bold ${gradeColor(pct)}`}>{pct}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Summary card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border-border/50 bg-card/80">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Assessments</p>
                <p className="text-2xl font-bold text-foreground">{courseGrades.length}</p>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/80">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Average</p>
                <p className={`text-2xl font-bold ${gradeColor(overallAvg)}`}>{overallAvg}%</p>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/80">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Highest</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {Math.max(...courseGrades.map((g) => Math.round((g.score / g.total) * 100)))}%
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ANNOUNCEMENTS TAB */}
        <TabsContent value="announcements" className="space-y-3">
          {courseAnnouncements.map((a) => (
            <Card key={a.id} className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <p className="font-medium text-foreground">{a.title}</p>
                  <span className="text-xs text-muted-foreground shrink-0 ml-4">{a.date}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.body}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ================================================================
   TEACHER COURSE DETAIL
   ================================================================ */
function TeacherCourseDetail({ course }: { course: { name: string; teacher: string; id: string } }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState(false);
  const [students, setStudents] = useState(enrolledStudents);
  const [searchQuery, setSearchQuery] = useState("");
  const [announceOpen, setAnnounceOpen] = useState(false);
  const [announceTitle, setAnnounceTitle] = useState("");
  const [announceBody, setAnnounceBody] = useState("");
  const [announcements, setAnnouncements] = useState(courseAnnouncements);

  const copyId = () => {
    navigator.clipboard.writeText(course.id);
    setCopiedId(true);
    toast({ title: "Copied!", description: `Course ID ${course.id} copied to clipboard.` });
    setTimeout(() => setCopiedId(false), 2000);
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const removeStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    toast({ title: "Student removed" });
  };

  const postAnnouncement = () => {
    if (!announceTitle.trim()) return;
    setAnnouncements((prev) => [
      { id: Date.now(), title: announceTitle.trim(), body: announceBody.trim(), date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) },
      ...prev,
    ]);
    setAnnounceTitle("");
    setAnnounceBody("");
    setAnnounceOpen(false);
    toast({ title: "Announcement posted" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard/courses")} className="mt-1 shrink-0">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            {course.name}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className="font-mono text-xs tracking-wider">{course.id}</Badge>
            <button
              onClick={copyId}
              className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              {copiedId ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
            <span className="text-sm text-muted-foreground">• {students.length} students</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="students" className="space-y-4">
        <TabsList>
          <TabsTrigger value="students" className="gap-1.5">
            <Users className="h-4 w-4" /> Students
          </TabsTrigger>
          <TabsTrigger value="exams" className="gap-1.5">
            <FileText className="h-4 w-4" /> Exams
          </TabsTrigger>
          <TabsTrigger value="announcements" className="gap-1.5">
            <Megaphone className="h-4 w-4" /> Announcements
          </TabsTrigger>
        </TabsList>

        {/* STUDENTS TAB */}
        <TabsContent value="students" className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search students..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <Button variant="outline" className="gap-1.5">
              <Upload className="h-4 w-4" /> Enroll via CSV
            </Button>
          </div>

          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50 text-muted-foreground">
                    <th className="px-5 py-3 text-left font-medium">Student</th>
                    <th className="px-3 py-3 text-left font-medium">ID</th>
                    <th className="px-3 py-3 text-right font-medium">Average</th>
                    <th className="px-3 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((s) => (
                    <tr key={s.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/15 text-xs font-semibold text-primary">
                              {s.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-foreground">{s.name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-muted-foreground font-mono text-xs">{s.id}</td>
                      <td className={`px-3 py-3 text-right font-bold ${gradeColor(s.avg)}`}>{s.avg}%</td>
                      <td className="px-3 py-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2"><Eye className="h-4 w-4" /> View Grades</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive" onClick={() => removeStudent(s.id)}>
                              <Trash2 className="h-4 w-4" /> Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-5 py-8 text-center text-muted-foreground">No students found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* EXAMS TAB */}
        <TabsContent value="exams" className="space-y-3">
          <div className="flex justify-end">
            <Button className="gap-1.5" onClick={() => navigate("/dashboard/exam-builder")}>
              <Plus className="h-4 w-4" /> Assign Exam
            </Button>
          </div>
          {courseExams.map((exam) => (
            <Card key={exam.id} className="border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="flex items-center justify-between p-4">
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{exam.name}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{exam.date}</span>
                    <span>•</span>
                    <span>{exam.duration}</span>
                  </div>
                </div>
                <Badge variant="outline" className={statusColor(exam.status)}>{exam.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* ANNOUNCEMENTS TAB */}
        <TabsContent value="announcements" className="space-y-4">
          <div className="flex justify-end">
            <Button className="gap-1.5" onClick={() => setAnnounceOpen(true)}>
              <Plus className="h-4 w-4" /> Post Announcement
            </Button>
          </div>
          {announcements.map((a) => (
            <Card key={a.id} className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <p className="font-medium text-foreground">{a.title}</p>
                  <span className="text-xs text-muted-foreground shrink-0 ml-4">{a.date}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.body}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Post Announcement Dialog */}
      <Dialog open={announceOpen} onOpenChange={setAnnounceOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Post Announcement</DialogTitle>
            <DialogDescription>This will be visible to all enrolled students.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="a-title">Title</Label>
              <Input id="a-title" placeholder="Announcement title" value={announceTitle} onChange={(e) => setAnnounceTitle(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="a-body">Message</Label>
              <Textarea id="a-body" placeholder="Write your announcement..." rows={4} value={announceBody} onChange={(e) => setAnnounceBody(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAnnounceOpen(false)}>Cancel</Button>
            <Button onClick={postAnnouncement} disabled={!announceTitle.trim()}>Post</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ================================================================
   MAIN EXPORT
   ================================================================ */
export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const { role } = useRole();
  const navigate = useNavigate();

  const course = id ? courseData[id] : null;

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-bold text-foreground">Course not found</h2>
        <p className="text-sm text-muted-foreground mt-1">This course doesn't exist or you don't have access.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/dashboard/courses")}>
          Back to Courses
        </Button>
      </div>
    );
  }

  return role === "teacher" ? <TeacherCourseDetail course={course} /> : <StudentCourseDetail course={course} />;
}
