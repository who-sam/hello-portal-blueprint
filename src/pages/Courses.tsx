import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRole } from "@/contexts/RoleContext";
import { BookOpen, Plus, Users, Upload } from "lucide-react";

const mockCourses = [
  { id: "1", name: "CS101 - Intro to Programming", students: 45, exams: 3 },
  { id: "2", name: "CS201 - Data Structures", students: 38, exams: 5 },
  { id: "3", name: "CS301 - Algorithms", students: 32, exams: 2 },
];

const studentCourses = [
  { id: "1", name: "CS101 - Intro to Programming", teacher: "Dr. Smith", exams: 3, announcements: 1 },
  { id: "2", name: "CS201 - Data Structures", teacher: "Prof. Johnson", exams: 5, announcements: 0 },
];

export default function Courses() {
  const { role } = useRole();

  if (role === "teacher") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Course Management</h1>
            <p className="text-sm text-muted-foreground mt-1">Create courses and manage student enrollment</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Course
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockCourses.map((course) => (
            <Card key={course.id} className="border-border bg-card/80 backdrop-blur-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  {course.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    {course.students} students
                  </span>
                  <span className="text-muted-foreground">{course.exams} exams</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-1.5">
                    <Upload className="h-3.5 w-3.5" />
                    Enroll CSV
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Student view — enrolled courses
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Courses</h1>
        <p className="text-sm text-muted-foreground mt-1">Your enrolled courses and announcements</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {studentCourses.map((course) => (
          <Card key={course.id} className="border-border bg-card/80 backdrop-blur-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                {course.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">Instructor: {course.teacher}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{course.exams} exams</span>
                {course.announcements > 0 && (
                  <span className="text-xs bg-primary/15 text-primary px-2 py-0.5 rounded-full font-medium">
                    {course.announcements} new
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
