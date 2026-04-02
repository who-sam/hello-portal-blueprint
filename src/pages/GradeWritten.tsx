import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ArrowLeft, ChevronRight, ChevronLeft, CheckCircle, Clock, FileText,
  MessageSquare, Save, SkipForward,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

/* ── Mock data ── */
const mockCourses = [
  { id: "APX-CS101", name: "CS101 — Intro to Programming" },
  { id: "APX-CS201", name: "CS201 — Data Structures" },
  { id: "APX-CS301", name: "CS301 — Algorithms" },
];

const mockExams: Record<string, { id: string; name: string; pendingCount: number }[]> = {
  "APX-CS201": [
    { id: "ex-1", name: "Midterm — Data Structures", pendingCount: 5 },
    { id: "ex-2", name: "Quiz 3 — Arrays", pendingCount: 3 },
  ],
  "APX-CS301": [
    { id: "ex-3", name: "Assignment 1 — Graph Algorithms", pendingCount: 8 },
  ],
  "APX-CS101": [
    { id: "ex-4", name: "Midterm — Intro to Programming", pendingCount: 2 },
  ],
};

interface WrittenSubmission {
  id: string;
  studentName: string;
  studentId: string;
  questions: {
    id: string;
    questionText: string;
    maxPoints: number;
    rubric: string;
    studentAnswer: string;
    awardedPoints: number | null;
    feedback: string;
  }[];
  graded: boolean;
}

const mockSubmissions: WrittenSubmission[] = [
  {
    id: "sub-1", studentName: "Ahmed Hassan", studentId: "STU-001", graded: false,
    questions: [
      { id: "q1", questionText: "Explain the difference between a stack and a queue.", maxPoints: 20, rubric: "Must mention LIFO vs FIFO, provide examples, and discuss use cases.", studentAnswer: "A stack follows LIFO (Last In First Out) — the last element added is the first removed. Think of a stack of plates. A queue follows FIFO (First In First Out) — the first element added is the first removed. Like a line at a store.", awardedPoints: null, feedback: "" },
      { id: "q2", questionText: "What is a linked list and why would you use one over an array?", maxPoints: 20, rubric: "Should define linked list structure, mention dynamic memory, and compare insertion/deletion performance.", studentAnswer: "A linked list is a data structure where each element points to the next one. You'd use it over an array when you need to frequently insert or delete elements because these operations are O(1) in a linked list versus O(n) in an array.", awardedPoints: null, feedback: "" },
    ],
  },
  {
    id: "sub-2", studentName: "Sara Ali", studentId: "STU-002", graded: false,
    questions: [
      { id: "q1", questionText: "Explain the difference between a stack and a queue.", maxPoints: 20, rubric: "Must mention LIFO vs FIFO, provide examples, and discuss use cases.", studentAnswer: "Stacks and queues are both data structures. A stack is LIFO and a queue is FIFO.", awardedPoints: null, feedback: "" },
      { id: "q2", questionText: "What is a linked list and why would you use one over an array?", maxPoints: 20, rubric: "Should define linked list structure, mention dynamic memory, and compare insertion/deletion performance.", studentAnswer: "A linked list is where nodes are connected. Each node has data and a pointer. It's better than arrays for adding and removing items because you don't need to shift elements. However, arrays are better for random access since linked lists require traversal.", awardedPoints: null, feedback: "" },
    ],
  },
  {
    id: "sub-3", studentName: "Fatima Nour", studentId: "STU-004", graded: false,
    questions: [
      { id: "q1", questionText: "Explain the difference between a stack and a queue.", maxPoints: 20, rubric: "Must mention LIFO vs FIFO, provide examples, and discuss use cases.", studentAnswer: "They are both data structures used to store information.", awardedPoints: null, feedback: "" },
      { id: "q2", questionText: "What is a linked list and why would you use one over an array?", maxPoints: 20, rubric: "Should define linked list structure, mention dynamic memory, and compare insertion/deletion performance.", studentAnswer: "A linked list stores things in order.", awardedPoints: null, feedback: "" },
    ],
  },
  {
    id: "sub-4", studentName: "Omar Khaled", studentId: "STU-003", graded: true,
    questions: [
      { id: "q1", questionText: "Explain the difference between a stack and a queue.", maxPoints: 20, rubric: "Must mention LIFO vs FIFO, provide examples, and discuss use cases.", studentAnswer: "Stack = LIFO, Queue = FIFO. Stack example: undo button. Queue example: print jobs.", awardedPoints: 16, feedback: "Good understanding but could use more detail on use cases." },
      { id: "q2", questionText: "What is a linked list and why would you use one over an array?", maxPoints: 20, rubric: "Should define linked list structure, mention dynamic memory, and compare insertion/deletion performance.", studentAnswer: "A linked list is nodes pointing to next nodes. Better for insertion/deletion at O(1). Arrays are O(n) for these operations.", awardedPoints: 18, feedback: "Clear and concise." },
    ],
  },
];

type Step = "course" | "exam" | "grading";

export default function GradeWritten() {
  const { toast } = useToast();
  const [step, setStep] = useState<Step>("course");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [submissions, setSubmissions] = useState<WrittenSubmission[]>(mockSubmissions);
  const [currentSubIdx, setCurrentSubIdx] = useState(0);
  const [filter, setFilter] = useState<"all" | "pending" | "graded">("pending");

  const exams = selectedCourse ? (mockExams[selectedCourse] || []) : [];
  const pendingSubs = submissions.filter((s) => !s.graded);
  const gradedSubs = submissions.filter((s) => s.graded);
  const filteredSubs = filter === "all" ? submissions : filter === "pending" ? pendingSubs : gradedSubs;
  const currentSub = filteredSubs[currentSubIdx];

  const updateQuestionGrade = (qIdx: number, points: number | null, feedback: string) => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === currentSub?.id
          ? {
              ...s,
              questions: s.questions.map((q, i) =>
                i === qIdx ? { ...q, awardedPoints: points, feedback } : q
              ),
            }
          : s
      )
    );
  };

  const markGraded = () => {
    if (!currentSub) return;
    const allGraded = currentSub.questions.every((q) => q.awardedPoints !== null);
    if (!allGraded) {
      toast({ title: "Incomplete", description: "Please grade all questions before submitting.", variant: "destructive" });
      return;
    }
    setSubmissions((prev) =>
      prev.map((s) => (s.id === currentSub.id ? { ...s, graded: true } : s))
    );
    toast({ title: "Grading saved", description: `${currentSub.studentName}'s submission has been graded.` });
    // Move to next ungraded
    const nextUngraded = filteredSubs.findIndex((s, i) => i > currentSubIdx && !s.graded);
    if (nextUngraded !== -1) setCurrentSubIdx(nextUngraded);
  };

  // ── Step: Course selection ──
  if (step === "course") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            Grade Written Answers
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Select a course to start grading written/short answer questions.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockCourses.map((c) => {
            const courseExams = mockExams[c.id] || [];
            const totalPending = courseExams.reduce((a, e) => a + e.pendingCount, 0);
            return (
              <Card
                key={c.id}
                className="bg-card/80 backdrop-blur-md border-border/50 cursor-pointer hover:border-primary/50 transition-all"
                onClick={() => { setSelectedCourse(c.id); setStep("exam"); }}
              >
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">{c.id}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-[10px]">{courseExams.length} exam(s)</Badge>
                      {totalPending > 0 && (
                        <Badge variant="destructive" className="text-[10px]">{totalPending} pending</Badge>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Step: Exam selection ──
  if (step === "exam") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => { setStep("course"); setSelectedCourse(""); }}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {mockCourses.find((c) => c.id === selectedCourse)?.name}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">Select an exam to grade</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {exams.map((e) => (
            <Card
              key={e.id}
              className="bg-card/80 backdrop-blur-md border-border/50 cursor-pointer hover:border-primary/50 transition-all"
              onClick={() => { setSelectedExam(e.id); setStep("grading"); setCurrentSubIdx(0); }}
            >
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{e.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="destructive" className="text-[10px] flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {e.pendingCount} pending
                    </Badge>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
          {exams.length === 0 && (
            <Card className="col-span-full bg-card/80 backdrop-blur-md border-border/50">
              <CardContent className="p-8 text-center text-muted-foreground">
                <FileText className="h-10 w-10 mx-auto mb-3 opacity-40" />
                <p>No exams with written questions found for this course.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  // ── Step: Grading interface ──
  const totalPoints = currentSub ? currentSub.questions.reduce((a, q) => a + q.maxPoints, 0) : 0;
  const awardedTotal = currentSub
    ? currentSub.questions.reduce((a, q) => a + (q.awardedPoints ?? 0), 0)
    : 0;
  const gradedCount = currentSub?.questions.filter((q) => q.awardedPoints !== null).length ?? 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => { setStep("exam"); setSelectedExam(""); }}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Grade Written Answers</h1>
            <p className="text-sm text-muted-foreground">
              {mockCourses.find((c) => c.id === selectedCourse)?.name} • {exams.find((e) => e.id === selectedExam)?.name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={filter} onValueChange={(v) => { setFilter(v as typeof filter); setCurrentSubIdx(0); }}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All ({submissions.length})</SelectItem>
              <SelectItem value="pending">Pending ({pendingSubs.length})</SelectItem>
              <SelectItem value="graded">Graded ({gradedSubs.length})</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Progress bar */}
      <Card className="border-border/50 bg-card/80 backdrop-blur-md">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">
              Grading progress: {gradedSubs.length}/{submissions.length} submissions
            </p>
            <span className="text-sm font-medium text-foreground">
              {Math.round((gradedSubs.length / submissions.length) * 100)}%
            </span>
          </div>
          <Progress value={(gradedSubs.length / submissions.length) * 100} className="h-2" />
        </CardContent>
      </Card>

      {filteredSubs.length === 0 ? (
        <Card className="border-border/50 bg-card/80 backdrop-blur-md">
          <CardContent className="p-12 text-center text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-500 opacity-60" />
            <p className="font-medium text-foreground">All done!</p>
            <p className="text-sm mt-1">No {filter === "pending" ? "pending" : ""} submissions to grade.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Student navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="outline" size="icon"
                disabled={currentSubIdx <= 0}
                onClick={() => setCurrentSubIdx((p) => Math.max(0, p - 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div>
                <p className="text-sm font-semibold text-foreground">{currentSub?.studentName}</p>
                <p className="text-xs text-muted-foreground font-mono">{currentSub?.studentId}</p>
              </div>
              <Button
                variant="outline" size="icon"
                disabled={currentSubIdx >= filteredSubs.length - 1}
                onClick={() => setCurrentSubIdx((p) => Math.min(filteredSubs.length - 1, p + 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={currentSub?.graded ? "default" : "destructive"}>
                {currentSub?.graded ? "Graded" : "Pending"}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {currentSubIdx + 1} of {filteredSubs.length}
              </span>
            </div>
          </div>

          {/* Score summary */}
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">
              Score: <span className="font-bold text-foreground">{awardedTotal}/{totalPoints}</span>
            </span>
            <span className="text-muted-foreground">
              Graded: <span className="font-medium text-foreground">{gradedCount}/{currentSub?.questions.length}</span>
            </span>
          </div>

          {/* Questions to grade */}
          <div className="space-y-4">
            {currentSub?.questions.map((q, qIdx) => (
              <Card key={q.id} className="border-border/50 bg-card/80 backdrop-blur-md">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Q{qIdx + 1}: {q.questionText}
                    </CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {q.awardedPoints !== null ? q.awardedPoints : "—"}/{q.maxPoints} pts
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Rubric */}
                  <div className="rounded-lg bg-muted/40 p-3 border border-border/30">
                    <p className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" /> Rubric
                    </p>
                    <p className="text-sm text-foreground">{q.rubric}</p>
                  </div>

                  {/* Student answer */}
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Student's Answer</p>
                    <div className="rounded-lg bg-secondary/30 border border-border/30 p-3">
                      <p className="text-sm text-foreground whitespace-pre-wrap">{q.studentAnswer}</p>
                    </div>
                  </div>

                  {/* Grading inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">Points Awarded</label>
                      <Input
                        type="number"
                        min={0}
                        max={q.maxPoints}
                        value={q.awardedPoints ?? ""}
                        placeholder="—"
                        onChange={(e) => {
                          const val = e.target.value === "" ? null : Math.min(Number(e.target.value), q.maxPoints);
                          updateQuestionGrade(qIdx, val, q.feedback);
                        }}
                      />
                    </div>
                    <div className="sm:col-span-3 space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">Feedback</label>
                      <Textarea
                        placeholder="Optional feedback for the student..."
                        value={q.feedback}
                        onChange={(e) => updateQuestionGrade(qIdx, q.awardedPoints, e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              className="gap-2"
              disabled={currentSubIdx >= filteredSubs.length - 1}
              onClick={() => setCurrentSubIdx((p) => Math.min(filteredSubs.length - 1, p + 1))}
            >
              <SkipForward className="h-4 w-4" /> Skip
            </Button>
            <Button className="gap-2" onClick={markGraded} disabled={currentSub?.graded}>
              <Save className="h-4 w-4" />
              {currentSub?.graded ? "Already Graded" : "Submit Grades"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
