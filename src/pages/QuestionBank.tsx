import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Plus, Search, BookOpen, FileText, CheckSquare, Code2, Trash2, Copy, Eye,
  ChevronRight, ArrowLeft, Library,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { QuestionType } from "@/types/exam";

/* ── Mock data ── */
const mockCourses = [
  { id: "APX-CS101", name: "CS101 — Intro to Programming" },
  { id: "APX-CS201", name: "CS201 — Data Structures" },
  { id: "APX-CS301", name: "CS301 — Algorithms" },
];

interface BankQuestion {
  id: string;
  type: QuestionType;
  text: string;
  points: number;
  courseId: string;
  tags: string[];
  createdAt: string;
}

const initialQuestions: BankQuestion[] = [
  { id: "qb-1", type: "mcq", text: "What is the time complexity of binary search?", points: 10, courseId: "APX-CS301", tags: ["searching", "complexity"], createdAt: "2026-03-15" },
  { id: "qb-2", type: "written", text: "Explain the difference between a stack and a queue.", points: 20, courseId: "APX-CS201", tags: ["data-structures", "fundamentals"], createdAt: "2026-03-10" },
  { id: "qb-3", type: "coding", text: "Implement a function to reverse a linked list.", points: 30, courseId: "APX-CS201", tags: ["linked-list", "implementation"], createdAt: "2026-03-08" },
  { id: "qb-4", type: "mcq", text: "Which of the following is not a primitive data type in Python?", points: 10, courseId: "APX-CS101", tags: ["python", "basics"], createdAt: "2026-03-05" },
  { id: "qb-5", type: "written", text: "Describe the concept of recursion with an example.", points: 20, courseId: "APX-CS101", tags: ["recursion", "fundamentals"], createdAt: "2026-03-01" },
  { id: "qb-6", type: "coding", text: "Write a function that finds the shortest path in a graph using BFS.", points: 30, courseId: "APX-CS301", tags: ["graphs", "bfs"], createdAt: "2026-02-28" },
  { id: "qb-7", type: "mcq", text: "What is the worst case time complexity of quicksort?", points: 10, courseId: "APX-CS301", tags: ["sorting", "complexity"], createdAt: "2026-02-20" },
  { id: "qb-8", type: "written", text: "Compare and contrast arrays and linked lists.", points: 15, courseId: "APX-CS201", tags: ["data-structures", "comparison"], createdAt: "2026-02-15" },
];

const typeIcons: Record<QuestionType, React.ElementType> = {
  mcq: CheckSquare,
  written: FileText,
  coding: Code2,
};

const typeLabels: Record<QuestionType, string> = {
  mcq: "MCQ",
  written: "Written",
  coding: "Coding",
};

export default function QuestionBank() {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<BankQuestion[]>(initialQuestions);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [addOpen, setAddOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewingQuestion, setViewingQuestion] = useState<BankQuestion | null>(null);

  // New question form
  const [newQuestion, setNewQuestion] = useState<{
    type: QuestionType;
    text: string;
    points: number;
    courseId: string;
    tags: string;
  }>({ type: "mcq", text: "", points: 10, courseId: "", tags: "" });

  const courseQuestions = selectedCourse
    ? questions.filter((q) => q.courseId === selectedCourse)
    : questions;

  const filtered = courseQuestions.filter((q) => {
    const matchesSearch = q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = typeFilter === "all" || q.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleAdd = () => {
    if (!newQuestion.text.trim() || !newQuestion.courseId) {
      toast({ title: "Missing fields", description: "Please fill in question text and assign a course.", variant: "destructive" });
      return;
    }
    const q: BankQuestion = {
      id: `qb-${crypto.randomUUID().slice(0, 8)}`,
      type: newQuestion.type,
      text: newQuestion.text.trim(),
      points: newQuestion.points,
      courseId: newQuestion.courseId,
      tags: newQuestion.tags.split(",").map((t) => t.trim()).filter(Boolean),
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setQuestions((prev) => [q, ...prev]);
    setNewQuestion({ type: "mcq", text: "", points: 10, courseId: "", tags: "" });
    setAddOpen(false);
    toast({ title: "Question added", description: "The question has been added to the bank." });
  };

  const handleDelete = () => {
    if (deleteId) {
      setQuestions((prev) => prev.filter((q) => q.id !== deleteId));
      setDeleteId(null);
      toast({ title: "Question deleted" });
    }
  };

  const handleDuplicate = (q: BankQuestion) => {
    const dup: BankQuestion = {
      ...q,
      id: `qb-${crypto.randomUUID().slice(0, 8)}`,
      text: `${q.text} (Copy)`,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setQuestions((prev) => [dup, ...prev]);
    toast({ title: "Duplicated", description: "Question has been duplicated." });
  };

  const getCourseName = (id: string) => mockCourses.find((c) => c.id === id)?.name || id;

  // ── No course selected: show course grid ──
  if (!selectedCourse) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Library className="h-6 w-6 text-primary" />
              Question Bank
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage and organize questions by course. Add them to exams when building.
            </p>
          </div>
          <Button className="gap-2" onClick={() => setAddOpen(true)}>
            <Plus className="h-4 w-4" /> Add Question
          </Button>
        </div>

        {/* Course cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockCourses.map((c) => {
            const count = questions.filter((q) => q.courseId === c.id).length;
            const mcqCount = questions.filter((q) => q.courseId === c.id && q.type === "mcq").length;
            const writtenCount = questions.filter((q) => q.courseId === c.id && q.type === "written").length;
            const codingCount = questions.filter((q) => q.courseId === c.id && q.type === "coding").length;
            return (
              <Card
                key={c.id}
                className="bg-card/80 backdrop-blur-md border-border/50 cursor-pointer hover:border-primary/50 transition-all"
                onClick={() => setSelectedCourse(c.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{c.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{c.id}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="text-[10px]">{count} questions</Badge>
                    <span>{mcqCount} MCQ</span>
                    <span>{writtenCount} Written</span>
                    <span>{codingCount} Coding</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* "All Questions" card */}
          <Card
            className="bg-card/80 backdrop-blur-md border-border/50 cursor-pointer hover:border-primary/50 transition-all border-dashed"
            onClick={() => setSelectedCourse("all")}
          >
            <CardContent className="p-5 flex flex-col items-center justify-center h-full text-center gap-2">
              <Library className="h-8 w-8 text-muted-foreground" />
              <p className="font-semibold text-foreground">View All Questions</p>
              <p className="text-xs text-muted-foreground">{questions.length} total questions</p>
            </CardContent>
          </Card>
        </div>

        {/* Add dialog */}
        <AddQuestionDialog
          open={addOpen}
          onClose={() => setAddOpen(false)}
          newQuestion={newQuestion}
          setNewQuestion={setNewQuestion}
          onAdd={handleAdd}
        />
      </div>
    );
  }

  // ── Course selected: show questions table ──
  const displayedQuestions = selectedCourse === "all" ? filtered : filtered;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => { setSelectedCourse(""); setSearchQuery(""); setTypeFilter("all"); }}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {selectedCourse === "all" ? "All Questions" : getCourseName(selectedCourse)}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {displayedQuestions.length} question(s)
            </p>
          </div>
        </div>
        <Button className="gap-2" onClick={() => { setNewQuestion({ ...newQuestion, courseId: selectedCourse === "all" ? "" : selectedCourse }); setAddOpen(true); }}>
          <Plus className="h-4 w-4" /> Add Question
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search questions or tags..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="mcq">MCQ</SelectItem>
            <SelectItem value="written">Written</SelectItem>
            <SelectItem value="coding">Coding</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Questions table */}
      <Card className="border-border/50 bg-card/80 backdrop-blur-md">
        <CardContent className="p-0">
          {displayedQuestions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <FileText className="h-10 w-10 mb-3 opacity-40" />
              <p className="font-medium">No questions found</p>
              <p className="text-sm mt-1">Try adjusting your search or add a new question.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Question</TableHead>
                  {selectedCourse === "all" && <TableHead>Course</TableHead>}
                  <TableHead>Points</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedQuestions.map((q) => {
                  const Icon = typeIcons[q.type];
                  return (
                    <TableRow key={q.id}>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs">{typeLabels[q.type]}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-sm text-foreground truncate">{q.text}</p>
                      </TableCell>
                      {selectedCourse === "all" && (
                        <TableCell>
                          <Badge variant="secondary" className="text-[10px] font-mono">{q.courseId}</Badge>
                        </TableCell>
                      )}
                      <TableCell className="font-medium">{q.points}</TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {q.tags.slice(0, 2).map((t) => (
                            <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>
                          ))}
                          {q.tags.length > 2 && <Badge variant="outline" className="text-[10px]">+{q.tags.length - 2}</Badge>}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{q.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setViewingQuestion(q)}>
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDuplicate(q)}>
                            <Copy className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => setDeleteId(q.id)}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add dialog */}
      <AddQuestionDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        newQuestion={newQuestion}
        setNewQuestion={setNewQuestion}
        onAdd={handleAdd}
      />

      {/* View dialog */}
      <Dialog open={!!viewingQuestion} onOpenChange={(open) => { if (!open) setViewingQuestion(null); }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {viewingQuestion && (() => { const Icon = typeIcons[viewingQuestion.type]; return <Icon className="h-4 w-4 text-primary" />; })()}
              Question Details
            </DialogTitle>
          </DialogHeader>
          {viewingQuestion && (
            <div className="space-y-4">
              <div>
                <Label className="text-xs text-muted-foreground">Type</Label>
                <p className="text-sm font-medium">{typeLabels[viewingQuestion.type]}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Question</Label>
                <p className="text-sm">{viewingQuestion.text}</p>
              </div>
              <div className="flex gap-6">
                <div>
                  <Label className="text-xs text-muted-foreground">Points</Label>
                  <p className="text-sm font-medium">{viewingQuestion.points}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Course</Label>
                  <p className="text-sm font-medium">{getCourseName(viewingQuestion.courseId)}</p>
                </div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Tags</Label>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {viewingQuestion.tags.map((t) => (
                    <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete question?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently remove this question from the bank.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

/* ── Add Question Dialog ── */
function AddQuestionDialog({
  open, onClose, newQuestion, setNewQuestion, onAdd,
}: {
  open: boolean;
  onClose: () => void;
  newQuestion: { type: QuestionType; text: string; points: number; courseId: string; tags: string };
  setNewQuestion: (q: typeof newQuestion | ((prev: typeof newQuestion) => typeof newQuestion)) => void;
  onAdd: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Question to Bank</DialogTitle>
          <DialogDescription>Create a new question and assign it to a course.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Question Type</Label>
              <Select value={newQuestion.type} onValueChange={(v) => setNewQuestion({ ...newQuestion, type: v as QuestionType })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="mcq">MCQ</SelectItem>
                  <SelectItem value="written">Written</SelectItem>
                  <SelectItem value="coding">Coding</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Course</Label>
              <Select value={newQuestion.courseId} onValueChange={(v) => setNewQuestion({ ...newQuestion, courseId: v })}>
                <SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger>
                <SelectContent>
                  {mockCourses.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Question Text</Label>
            <Textarea
              placeholder="Enter the question..."
              value={newQuestion.text}
              onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Points</Label>
              <Input
                type="number"
                value={newQuestion.points}
                onChange={(e) => setNewQuestion({ ...newQuestion, points: Number(e.target.value) })}
                min={1}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Tags (comma-separated)</Label>
              <Input
                placeholder="e.g. sorting, algorithms"
                value={newQuestion.tags}
                onChange={(e) => setNewQuestion({ ...newQuestion, tags: e.target.value })}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onAdd} disabled={!newQuestion.text.trim() || !newQuestion.courseId}>Add Question</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
