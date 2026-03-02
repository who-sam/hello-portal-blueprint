import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar as CalendarIcon, Clock, BookOpen, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, isSameDay } from "date-fns";

const exams = [
  { id: 1, name: "JavaScript Fundamentals", date: new Date(2026, 2, 3), duration: "90 min", difficulty: "Medium", questions: 40, subject: "JavaScript" },
  { id: 2, name: "React & TypeScript", date: new Date(2026, 2, 8), duration: "120 min", difficulty: "Hard", questions: 35, subject: "React" },
  { id: 3, name: "Data Structures & Algorithms", date: new Date(2026, 2, 14), duration: "150 min", difficulty: "Hard", questions: 25, subject: "CS Core" },
  { id: 4, name: "CSS & Responsive Design", date: new Date(2026, 2, 20), duration: "60 min", difficulty: "Easy", questions: 30, subject: "CSS" },
  { id: 5, name: "Node.js Backend", date: new Date(2026, 2, 27), duration: "100 min", difficulty: "Medium", questions: 30, subject: "Backend" },
  { id: 6, name: "SQL & Database Design", date: new Date(2026, 3, 2), duration: "90 min", difficulty: "Medium", questions: 35, subject: "Database" },
];

const difficultyColor = (d: string) => {
  if (d === "Easy") return "bg-green-500/15 text-green-500 border-green-500/30";
  if (d === "Medium") return "bg-accent/15 text-accent border-accent/30";
  return "bg-destructive/15 text-destructive border-destructive/30";
};

export default function UpcomingExamsPage() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const examDates = exams.map((e) => e.date);
  const selectedExam = selectedDate ? exams.find((e) => isSameDay(e.date, selectedDate)) : null;
  const sortedExams = [...exams].sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Upcoming Exams</h1>
        <p className="mt-1 text-muted-foreground">View your exam schedule and prepare ahead.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Calendar */}
        <Card className="xl:col-span-1 border-border/50 bg-card/80 backdrop-blur-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <CalendarIcon className="h-5 w-5 text-primary" />
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="p-3 pointer-events-auto"
              modifiers={{ exam: examDates }}
              modifiersClassNames={{ exam: "bg-primary/20 text-primary font-bold rounded-full" }}
            />
            {selectedExam && (
              <div className="mt-4 rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-2">
                <p className="font-semibold text-foreground">{selectedExam.name}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {selectedExam.duration} · {selectedExam.questions} questions
                </div>
                <Badge variant="outline" className={difficultyColor(selectedExam.difficulty)}>
                  {selectedExam.difficulty}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Exam list */}
        <Card className="xl:col-span-2 border-border/50 bg-card/80 backdrop-blur-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5 text-primary" />
              Exam Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {sortedExams.map((exam) => {
              const isSelected = selectedDate && isSameDay(exam.date, selectedDate);
              const isPast = exam.date < new Date();
              return (
                <div
                  key={exam.id}
                  onClick={() => setSelectedDate(exam.date)}
                  className={`flex items-center justify-between rounded-xl border p-4 transition-all cursor-pointer ${
                    isSelected
                      ? "border-primary/50 bg-primary/5 shadow-sm"
                      : "border-border/50 bg-secondary/30 hover:bg-secondary/60"
                  } ${isPast ? "opacity-50" : ""}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <span className="text-xs font-medium leading-none">{format(exam.date, "MMM")}</span>
                      <span className="text-lg font-bold leading-none">{format(exam.date, "d")}</span>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">{exam.name}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{format(exam.date, "EEEE, MMM d")}</span>
                        <span>·</span>
                        <span>{exam.duration}</span>
                        <span>·</span>
                        <span>{exam.questions} questions</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={difficultyColor(exam.difficulty)}>
                      {exam.difficulty}
                    </Badge>
                    {!isPast && (
                      <Button size="sm" variant="ghost" className="gap-1 text-primary" onClick={(e) => { e.stopPropagation(); navigate("/dashboard/start"); }}>
                        Prepare <ArrowRight className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
