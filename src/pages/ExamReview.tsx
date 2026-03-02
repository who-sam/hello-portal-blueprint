import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, CheckCircle, XCircle, Check, X } from "lucide-react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";

const mockReview = {
  examTitle: "Midterm CS201 - Data Structures",
  score: 42,
  totalPoints: 50,
  percentage: 84,
  timeTaken: "1h 12m",
  rank: 4,
  classAverage: 72,
  passed: true,
  questions: [
    {
      id: "1", type: "mcq" as const, text: "Which data structure uses FIFO ordering?",
      points: 5, earned: 5,
      options: [
        { id: "a", text: "Stack" }, { id: "b", text: "Queue" },
        { id: "c", text: "Tree" }, { id: "d", text: "Graph" },
      ],
      selected: ["b"], correct: ["b"],
      explanation: "A Queue follows First-In-First-Out (FIFO) ordering.",
    },
    {
      id: "2", type: "mcq" as const, text: "What is the time complexity of binary search?",
      points: 5, earned: 0,
      options: [
        { id: "a", text: "O(n)" }, { id: "b", text: "O(n²)" },
        { id: "c", text: "O(log n)" }, { id: "d", text: "O(1)" },
      ],
      selected: ["a"], correct: ["c"],
      explanation: "Binary search divides the search space in half each step, giving O(log n).",
    },
    {
      id: "3", type: "written" as const, text: "Explain the difference between a stack and a queue.",
      points: 10, earned: 8,
      studentAnswer: "A stack uses LIFO ordering where the last element added is the first removed. A queue uses FIFO ordering where the first element added is the first removed. Stacks are used for function calls and undo operations while queues are used for task scheduling and BFS.",
      feedback: "Good explanation. Could have mentioned real-world examples more specifically.",
    },
    {
      id: "4", type: "coding" as const, text: "Implement a function that reverses a linked list.",
      points: 15, earned: 15,
      code: `function reverseList(head) {\n  let prev = null;\n  let current = head;\n  while (current) {\n    const next = current.next;\n    current.next = prev;\n    prev = current;\n    current = next;\n  }\n  return prev;\n}`,
      language: "javascript",
      testResults: [
        { name: "Empty list", passed: true },
        { name: "Single node", passed: true },
        { name: "Multiple nodes", passed: true },
        { name: "Large list (1000 nodes)", passed: true },
      ],
    },
    {
      id: "5", type: "written" as const, text: "Describe the advantages of a hash table over an array.",
      points: 10, earned: 9,
      studentAnswer: "Hash tables provide O(1) average time complexity for lookups, insertions, and deletions compared to O(n) for unsorted arrays. They use key-value pairs which makes data retrieval more intuitive. However, they use more memory and have worst-case O(n) performance with many collisions.",
      feedback: "Excellent answer. Minor: mention amortized complexity for resizing.",
    },
    {
      id: "6", type: "mcq" as const, text: "Which traversal visits the root node first?",
      points: 5, earned: 5,
      options: [
        { id: "a", text: "Inorder" }, { id: "b", text: "Preorder" },
        { id: "c", text: "Postorder" }, { id: "d", text: "Level-order" },
      ],
      selected: ["b"], correct: ["b"],
      explanation: "Preorder traversal visits root, then left subtree, then right subtree.",
    },
  ],
};

export default function ExamReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const r = mockReview;

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate("/dashboard/results")} className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Back to Results
      </Button>

      {/* Summary */}
      <Card className="bg-card/80 backdrop-blur-md border-border/50">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-foreground">{r.examTitle}</h1>
              <div className="flex items-center gap-3 mt-2">
                <Badge variant={r.passed ? "default" : "destructive"}>{r.passed ? "Passed" : "Failed"}</Badge>
                <span className="text-sm text-muted-foreground">Rank #{r.rank} • {r.timeTaken}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-primary">{r.score}/{r.totalPoints}</p>
              <p className="text-sm text-muted-foreground">{r.percentage}%</p>
            </div>
          </div>
          <div className="mt-4 space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Your score vs class average</span>
              <span className="text-muted-foreground">{r.classAverage}% avg</span>
            </div>
            <div className="relative">
              <Progress value={r.percentage} className="h-3" />
              <div className="absolute top-0 h-3 border-r-2 border-foreground/50" style={{ left: `${r.classAverage}%` }} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions */}
      <div className="space-y-4">
        {r.questions.map((q, i) => (
          <Card key={q.id} className="bg-card/80 backdrop-blur-md border-border/50">
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <Badge variant="outline" className="mb-2 capitalize">{q.type}</Badge>
                <CardTitle className="text-base">Q{i + 1}. {q.text}</CardTitle>
              </div>
              <Badge variant={q.earned === q.points ? "default" : "secondary"}>
                {q.earned}/{q.points} pts
              </Badge>
            </CardHeader>
            <CardContent>
              {q.type === "mcq" && (
                <div className="space-y-2">
                  {q.options!.map((opt) => {
                    const isSelected = q.selected!.includes(opt.id);
                    const isCorrect = q.correct!.includes(opt.id);
                    let style = "border-border/50 bg-muted/30";
                    if (isCorrect) style = "border-green-500/50 bg-green-500/10";
                    if (isSelected && !isCorrect) style = "border-destructive/50 bg-destructive/10";
                    return (
                      <div key={opt.id} className={`flex items-center gap-3 rounded-lg border p-3 ${style}`}>
                        {isSelected && isCorrect && <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />}
                        {isSelected && !isCorrect && <XCircle className="h-4 w-4 text-destructive shrink-0" />}
                        {!isSelected && isCorrect && <CheckCircle className="h-4 w-4 text-green-500/50 shrink-0" />}
                        {!isSelected && !isCorrect && <div className="h-4 w-4 shrink-0" />}
                        <span className="text-sm text-foreground">{opt.text}</span>
                      </div>
                    );
                  })}
                  {q.explanation && (
                    <p className="text-sm text-muted-foreground mt-3 p-3 rounded-lg bg-muted/30 border border-border/50">
                      💡 {q.explanation}
                    </p>
                  )}
                </div>
              )}

              {q.type === "written" && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Your Answer</p>
                    <div className="rounded-lg border border-border/50 bg-muted/30 p-3 text-sm text-foreground">{q.studentAnswer}</div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Feedback</p>
                    <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm text-foreground">{q.feedback}</div>
                  </div>
                </div>
              )}

              {q.type === "coding" && (
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden border border-border/50">
                    <Editor
                      height="200px"
                      language={q.language}
                      value={q.code}
                      theme={theme === "dark" ? "vs-dark" : "light"}
                      options={{ readOnly: true, minimap: { enabled: false }, scrollBeyondLastLine: false, fontSize: 13 }}
                    />
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Test Case</TableHead>
                        <TableHead className="w-24">Result</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {q.testResults!.map((t, j) => (
                        <TableRow key={j}>
                          <TableCell className="text-foreground">{t.name}</TableCell>
                          <TableCell>
                            {t.passed ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-destructive" />}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="ghost" onClick={() => navigate("/dashboard/results")} className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Back to Results
      </Button>
    </div>
  );
}
