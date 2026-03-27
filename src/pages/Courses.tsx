import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useRole } from "@/contexts/RoleContext";
import { useToast } from "@/hooks/use-toast";
import {
  BookOpen, Plus, Users, Upload, Copy, Check, Search, LogIn,
  MoreHorizontal, Eye, Pencil, Trash2,
} from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/* ── mock data ── */
const initialTeacherCourses = [
  { id: "KRN-CS101", name: "CS101 — Intro to Programming", students: 45, exams: 3 },
  { id: "KRN-CS201", name: "CS201 — Data Structures", students: 38, exams: 5 },
  { id: "KRN-CS301", name: "CS301 — Algorithms", students: 32, exams: 2 },
];

const initialStudentCourses = [
  { id: "KRN-CS101", name: "CS101 — Intro to Programming", teacher: "Dr. Smith", exams: 3 },
  { id: "KRN-CS201", name: "CS201 — Data Structures", teacher: "Prof. Johnson", exams: 5 },
];

/* ── helpers ── */
function generateCourseId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "KRN-";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

/* ================================================================
   TEACHER VIEW
   ================================================================ */
function TeacherCourses() {
  const { toast } = useToast();
  const [courses, setCourses] = useState(initialTeacherCourses);
  const [createOpen, setCreateOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCreate = () => {
    if (!newName.trim()) return;
    const id = generateCourseId();
    setCourses((prev) => [{ id, name: newName.trim(), students: 0, exams: 0 }, ...prev]);
    setNewName("");
    setCreateOpen(false);
    toast({
      title: "Course created",
      description: (
        <span>
          Course ID: <strong>{id}</strong> — share this with your students so they can enroll.
        </span>
      ),
    });
  };

  const copyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    toast({ title: "Copied!", description: `Course ID ${id} copied to clipboard.` });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    toast({ title: "Course deleted" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Course Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create courses, share the course ID with students, and manage enrollment.
          </p>
        </div>
        <Button className="gap-2" onClick={() => setCreateOpen(true)}>
          <Plus className="h-4 w-4" />
          New Course
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                {course.name}
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="gap-2">
                    <Eye className="h-4 w-4" /> View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <Pencil className="h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="gap-2 text-destructive focus:text-destructive"
                    onClick={() => deleteCourse(course.id)}
                  >
                    <Trash2 className="h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Course ID row */}
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-mono text-xs tracking-wider">
                  {course.id}
                </Badge>
                <button
                  onClick={() => copyId(course.id)}
                  className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  aria-label="Copy course ID"
                >
                  {copiedId === course.id ? (
                    <Check className="h-3.5 w-3.5 text-green-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  {course.students} students
                </span>
                <span className="text-muted-foreground">{course.exams} exams</span>
              </div>

              <Button variant="outline" size="sm" className="w-full gap-1.5">
                <Upload className="h-3.5 w-3.5" />
                Enroll via CSV
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Course Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
            <DialogDescription>
              A unique course ID will be generated automatically. Share it with your students so they can enroll.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="course-name">Course Name</Label>
              <Input
                id="course-name"
                placeholder="e.g. CS401 — Operating Systems"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={!newName.trim()}>
              Create Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ================================================================
   STUDENT VIEW
   ================================================================ */
function StudentCourses() {
  const { toast } = useToast();
  const [courses, setCourses] = useState(initialStudentCourses);
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [courseIdInput, setCourseIdInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleEnroll = () => {
    const id = courseIdInput.trim().toUpperCase();
    if (!id) return;
    if (courses.some((c) => c.id === id)) {
      toast({ title: "Already enrolled", description: "You are already in this course.", variant: "destructive" });
      return;
    }
    // Mock: pretend enrollment succeeded
    setCourses((prev) => [
      { id, name: `Course ${id}`, teacher: "Instructor", exams: 0 },
      ...prev,
    ]);
    setCourseIdInput("");
    setEnrollOpen(false);
    toast({ title: "Enrolled!", description: `You have been enrolled in ${id}.` });
  };

  const filtered = courses.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Courses</h1>
          <p className="text-sm text-muted-foreground mt-1">
            View your enrolled courses or join a new one using a course ID.
          </p>
        </div>
        <Button className="gap-2" onClick={() => setEnrollOpen(true)}>
          <LogIn className="h-4 w-4" />
          Enroll in Course
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search courses..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Course cards */}
      {filtered.length === 0 ? (
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <BookOpen className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-foreground font-medium">No courses found</p>
            <p className="text-sm text-muted-foreground mt-1">
              {searchQuery ? "Try a different search." : "Enroll in a course using the course ID from your teacher."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <Card
              key={course.id}
              className="border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  {course.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Badge variant="secondary" className="font-mono text-xs tracking-wider">
                  {course.id}
                </Badge>
                <p className="text-sm text-muted-foreground">Instructor: {course.teacher}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{course.exams} exams</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Enroll Dialog */}
      <Dialog open={enrollOpen} onOpenChange={setEnrollOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enroll in a Course</DialogTitle>
            <DialogDescription>
              Enter the course ID provided by your teacher to join the course.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="enroll-id">Course ID</Label>
              <Input
                id="enroll-id"
                placeholder="e.g. KRN-CS101"
                className="font-mono"
                value={courseIdInput}
                onChange={(e) => setCourseIdInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleEnroll()}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEnrollOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEnroll} disabled={!courseIdInput.trim()}>
              Enroll
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ================================================================
   MAIN EXPORT
   ================================================================ */
export default function Courses() {
  const { role } = useRole();
  return role === "teacher" ? <TeacherCourses /> : <StudentCourses />;
}
