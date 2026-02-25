import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import {
  Play,
  Send,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Clock,
  ThumbsUp,
  ThumbsDown,
  BookmarkPlus,
  Share2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SAMPLE_PROBLEM = {
  id: 1,
  title: "Two Sum",
  difficulty: "Easy",
  tags: ["Array", "Hash Table"],
  likes: 12453,
  dislikes: 342,
  description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.`,
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
      explanation: "",
    },
    {
      input: "nums = [3,3], target = 6",
      output: "[0,1]",
      explanation: "",
    },
  ],
  constraints: [
    "2 ≤ nums.length ≤ 10⁴",
    "-10⁹ ≤ nums[i] ≤ 10⁹",
    "-10⁹ ≤ target ≤ 10⁹",
    "Only one valid answer exists.",
  ],
};

const DEFAULT_CODE: Record<string, string> = {
  javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Write your solution here
    
};`,
  python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        # Write your solution here
        pass`,
  typescript: `function twoSum(nums: number[], target: number): number[] {
    // Write your solution here
    
};`,
  java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        
    }
}`,
};

const LANG_MAP: Record<string, string> = {
  javascript: "javascript",
  python: "python",
  typescript: "typescript",
  java: "java",
};

interface TestResult {
  id: number;
  input: string;
  expected: string;
  output: string;
  passed: boolean;
  time: string;
}

export default function CodeEditorPage() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(DEFAULT_CODE.javascript);
  const [activeTab, setActiveTab] = useState("description");
  const [bottomTab, setBottomTab] = useState("testcase");
  const [testResults, setTestResults] = useState<TestResult[] | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setCode(DEFAULT_CODE[lang] || DEFAULT_CODE.javascript);
  };

  const handleRun = () => {
    setIsRunning(true);
    setBottomTab("result");
    setTimeout(() => {
      setTestResults([
        {
          id: 1,
          input: "nums = [2,7,11,15], target = 9",
          expected: "[0,1]",
          output: "[0,1]",
          passed: true,
          time: "4ms",
        },
        {
          id: 2,
          input: "nums = [3,2,4], target = 6",
          expected: "[1,2]",
          output: "[1,2]",
          passed: true,
          time: "3ms",
        },
        {
          id: 3,
          input: "nums = [3,3], target = 6",
          expected: "[0,1]",
          output: "[0,1]",
          passed: true,
          time: "2ms",
        },
      ]);
      setIsRunning(false);
    }, 1500);
  };

  const handleSubmit = () => {
    setIsRunning(true);
    setBottomTab("result");
    setTimeout(() => {
      setTestResults([
        {
          id: 1,
          input: "nums = [2,7,11,15], target = 9",
          expected: "[0,1]",
          output: "[0,1]",
          passed: true,
          time: "4ms",
        },
        {
          id: 2,
          input: "nums = [3,2,4], target = 6",
          expected: "[1,2]",
          output: "[1,2]",
          passed: true,
          time: "3ms",
        },
        {
          id: 3,
          input: "nums = [3,3], target = 6",
          expected: "[0,1]",
          output: "[0,1]",
          passed: true,
          time: "2ms",
        },
      ]);
      setIsRunning(false);
    }, 2000);
  };

  const difficultyColor = {
    Easy: "text-green-400",
    Medium: "text-yellow-400",
    Hard: "text-red-400",
  }[SAMPLE_PROBLEM.difficulty];

  return (
    <div className="h-[calc(100vh-5.5rem)] flex flex-col gap-3">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-foreground">
            {SAMPLE_PROBLEM.id}. {SAMPLE_PROBLEM.title}
          </h2>
          <span className={`text-sm font-semibold ${difficultyColor}`}>
            {SAMPLE_PROBLEM.difficulty}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 rounded-full"
            onClick={handleRun}
            disabled={isRunning}
          >
            <Play className="h-4 w-4" />
            Run
          </Button>
          <Button
            size="sm"
            className="gap-2 rounded-full"
            onClick={handleSubmit}
            disabled={isRunning}
          >
            <Send className="h-4 w-4" />
            Submit
          </Button>
        </div>
      </div>

      {/* Main split */}
      <ResizablePanelGroup direction="horizontal" className="flex-1 rounded-2xl border border-border overflow-hidden bg-card/60 backdrop-blur-sm">
        {/* Left panel — Problem */}
        <ResizablePanel defaultSize={40} minSize={25}>
          <div className="flex h-full flex-col">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
              <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent px-4 pt-2">
                <TabsTrigger value="description" className="rounded-full data-[state=active]:bg-primary/15 data-[state=active]:text-primary">
                  Description
                </TabsTrigger>
                <TabsTrigger value="editorial" className="rounded-full data-[state=active]:bg-primary/15 data-[state=active]:text-primary">
                  Editorial
                </TabsTrigger>
                <TabsTrigger value="solutions" className="rounded-full data-[state=active]:bg-primary/15 data-[state=active]:text-primary">
                  Solutions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="flex-1 overflow-y-auto p-5 m-0 space-y-5">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_PROBLEM.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="rounded-full text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Description */}
                <div className="prose prose-sm prose-invert max-w-none text-foreground/90 leading-relaxed">
                  <p className="whitespace-pre-line">{SAMPLE_PROBLEM.description}</p>
                </div>

                {/* Examples */}
                <div className="space-y-4">
                  {SAMPLE_PROBLEM.examples.map((ex, i) => (
                    <div key={i} className="space-y-2">
                      <h4 className="text-sm font-semibold text-foreground">
                        Example {i + 1}:
                      </h4>
                      <div className="rounded-xl bg-muted/50 border border-border p-4 font-mono text-sm space-y-1">
                        <div>
                          <span className="text-muted-foreground">Input: </span>
                          <span className="text-foreground">{ex.input}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Output: </span>
                          <span className="text-primary font-semibold">{ex.output}</span>
                        </div>
                        {ex.explanation && (
                          <div>
                            <span className="text-muted-foreground">Explanation: </span>
                            <span className="text-foreground/80">{ex.explanation}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground">Constraints:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/80">
                    {SAMPLE_PROBLEM.constraints.map((c, i) => (
                      <li key={i} className="font-mono text-xs">{c}</li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 text-muted-foreground pt-2">
                  <button className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors">
                    <ThumbsUp className="h-4 w-4" /> {SAMPLE_PROBLEM.likes}
                  </button>
                  <button className="flex items-center gap-1.5 text-sm hover:text-destructive transition-colors">
                    <ThumbsDown className="h-4 w-4" /> {SAMPLE_PROBLEM.dislikes}
                  </button>
                  <button className="flex items-center gap-1.5 text-sm hover:text-accent transition-colors">
                    <BookmarkPlus className="h-4 w-4" />
                  </button>
                  <button className="flex items-center gap-1.5 text-sm hover:text-accent transition-colors">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </TabsContent>

              <TabsContent value="editorial" className="flex-1 overflow-y-auto p-5 m-0">
                <p className="text-muted-foreground text-sm">Editorial coming soon…</p>
              </TabsContent>

              <TabsContent value="solutions" className="flex-1 overflow-y-auto p-5 m-0">
                <p className="text-muted-foreground text-sm">Community solutions coming soon…</p>
              </TabsContent>
            </Tabs>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right panel — Editor + Console */}
        <ResizablePanel defaultSize={60} minSize={35}>
          <ResizablePanelGroup direction="vertical">
            {/* Code editor */}
            <ResizablePanel defaultSize={65} minSize={30}>
              <div className="flex h-full flex-col">
                {/* Editor toolbar */}
                <div className="flex items-center justify-between border-b border-border px-4 py-2">
                  <Select value={language} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-[160px] h-8 rounded-full text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Monaco */}
                <div className="flex-1">
                  <Editor
                    height="100%"
                    language={LANG_MAP[language]}
                    value={code}
                    onChange={(v) => setCode(v || "")}
                    theme="vs-dark"
                    options={{
                      fontSize: 14,
                      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                      minimap: { enabled: false },
                      padding: { top: 16 },
                      scrollBeyondLastLine: false,
                      wordWrap: "on",
                      lineNumbers: "on",
                      renderLineHighlight: "line",
                      cursorBlinking: "smooth",
                      smoothScrolling: true,
                      bracketPairColorization: { enabled: true },
                      autoClosingBrackets: "always",
                      tabSize: 4,
                    }}
                  />
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Bottom — Test cases / Results */}
            <ResizablePanel defaultSize={35} minSize={15}>
              <Tabs value={bottomTab} onValueChange={setBottomTab} className="flex flex-col h-full">
                <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent px-4 pt-1">
                  <TabsTrigger value="testcase" className="rounded-full text-xs data-[state=active]:bg-primary/15 data-[state=active]:text-primary">
                    Test Cases
                  </TabsTrigger>
                  <TabsTrigger value="result" className="rounded-full text-xs data-[state=active]:bg-primary/15 data-[state=active]:text-primary">
                    Results
                    {testResults && (
                      <span className="ml-1.5">
                        {testResults.every((t) => t.passed) ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-400 inline" />
                        ) : (
                          <XCircle className="h-3.5 w-3.5 text-red-400 inline" />
                        )}
                      </span>
                    )}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="testcase" className="flex-1 overflow-y-auto p-4 m-0 space-y-3">
                  {SAMPLE_PROBLEM.examples.map((ex, i) => (
                    <div key={i} className="rounded-xl bg-muted/40 border border-border p-3 font-mono text-xs space-y-1">
                      <div className="text-muted-foreground">Case {i + 1}</div>
                      <div className="text-foreground">{ex.input}</div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="result" className="flex-1 overflow-y-auto p-4 m-0">
                  {isRunning ? (
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      Running tests…
                    </div>
                  ) : testResults ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        {testResults.every((t) => t.passed) ? (
                          <Badge className="rounded-full bg-green-500/15 text-green-400 border-green-500/30">
                            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                            All Passed
                          </Badge>
                        ) : (
                          <Badge className="rounded-full bg-red-500/15 text-red-400 border-red-500/30">
                            <XCircle className="h-3.5 w-3.5 mr-1" />
                            Some Failed
                          </Badge>
                        )}
                      </div>
                      {testResults.map((t) => (
                        <div
                          key={t.id}
                          className={`rounded-xl border p-3 font-mono text-xs space-y-1 ${
                            t.passed
                              ? "border-green-500/20 bg-green-500/5"
                              : "border-red-500/20 bg-red-500/5"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-foreground">
                              Case {t.id}
                            </span>
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-3 w-3" /> {t.time}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Input: </span>
                            {t.input}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Expected: </span>
                            {t.expected}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Output: </span>
                            <span className={t.passed ? "text-green-400" : "text-red-400"}>
                              {t.output}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Run or submit your code to see results.
                    </p>
                  )}
                </TabsContent>
              </Tabs>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
