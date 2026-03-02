import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Medal, TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { LeaderboardEntry } from "@/types/exam";

const classEntries: LeaderboardEntry[] = [
  { rank: 1, studentName: "Alice Chen", avatar: "AC", score: 96, examsCompleted: 24, streak: 30, trend: "up" },
  { rank: 2, studentName: "Bob Kumar", avatar: "BK", score: 93, examsCompleted: 22, streak: 18, trend: "up" },
  { rank: 3, studentName: "Carla Ruiz", avatar: "CR", score: 91, examsCompleted: 23, streak: 25, trend: "same" },
  { rank: 4, studentName: "John Doe", avatar: "JD", score: 88, examsCompleted: 20, streak: 12, trend: "up", isCurrentUser: true },
  { rank: 5, studentName: "Emily Park", avatar: "EP", score: 85, examsCompleted: 21, streak: 8, trend: "down" },
  { rank: 6, studentName: "Farhan Ali", avatar: "FA", score: 82, examsCompleted: 19, streak: 5, trend: "same" },
  { rank: 7, studentName: "Grace Liu", avatar: "GL", score: 79, examsCompleted: 18, streak: 3, trend: "down" },
  { rank: 8, studentName: "Henry Wu", avatar: "HW", score: 76, examsCompleted: 17, streak: 15, trend: "up" },
];

const globalEntries: LeaderboardEntry[] = [
  { rank: 1, studentName: "Mei Tanaka", avatar: "MT", score: 99, examsCompleted: 40, streak: 60, trend: "up" },
  { rank: 2, studentName: "Alice Chen", avatar: "AC", score: 96, examsCompleted: 24, streak: 30, trend: "up" },
  { rank: 3, studentName: "Raj Patel", avatar: "RP", score: 95, examsCompleted: 35, streak: 45, trend: "same" },
  { rank: 4, studentName: "Bob Kumar", avatar: "BK", score: 93, examsCompleted: 22, streak: 18, trend: "up" },
  { rank: 5, studentName: "Carla Ruiz", avatar: "CR", score: 91, examsCompleted: 23, streak: 25, trend: "down" },
  { rank: 6, studentName: "John Doe", avatar: "JD", score: 88, examsCompleted: 20, streak: 12, trend: "up", isCurrentUser: true },
  { rank: 7, studentName: "Emily Park", avatar: "EP", score: 85, examsCompleted: 21, streak: 8, trend: "down" },
  { rank: 8, studentName: "Farhan Ali", avatar: "FA", score: 82, examsCompleted: 19, streak: 5, trend: "same" },
];

const medalColors = ["text-yellow-500", "text-gray-400", "text-amber-700"];

function TrendIcon({ trend }: { trend: string }) {
  if (trend === "up") return <TrendingUp className="h-4 w-4 text-green-500" />;
  if (trend === "down") return <TrendingDown className="h-4 w-4 text-destructive" />;
  return <Minus className="h-4 w-4 text-muted-foreground" />;
}

function Podium({ entries }: { entries: LeaderboardEntry[] }) {
  const top3 = entries.slice(0, 3);
  const order = [1, 0, 2]; // silver, gold, bronze visual order
  return (
    <div className="flex items-end justify-center gap-4 mb-6">
      {order.map((idx) => {
        const e = top3[idx];
        if (!e) return null;
        const isFirst = idx === 0;
        return (
          <Card key={e.rank} className={`bg-card/80 backdrop-blur-md border-border/50 flex flex-col items-center p-4 ${isFirst ? "pb-8 -mt-4" : "pb-6"} w-36`}>
            <Medal className={`h-6 w-6 mb-2 ${medalColors[idx]}`} />
            <Avatar className="h-12 w-12 mb-2">
              <AvatarFallback className="bg-primary/20 font-semibold text-primary">{e.avatar}</AvatarFallback>
            </Avatar>
            <p className="font-semibold text-sm text-foreground text-center">{e.studentName}</p>
            <p className="text-lg font-bold text-primary mt-1">{e.score}%</p>
            {e.isCurrentUser && <Badge className="mt-1 text-xs">You</Badge>}
          </Card>
        );
      })}
    </div>
  );
}

function RankedTable({ entries }: { entries: LeaderboardEntry[] }) {
  return (
    <Card className="bg-card/80 backdrop-blur-md border-border/50">
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Rank</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Exams</TableHead>
              <TableHead>Streak</TableHead>
              <TableHead className="w-16">Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((e) => (
              <TableRow key={e.rank} className={e.isCurrentUser ? "border border-primary/30 bg-primary/5" : ""}>
                <TableCell className="font-bold text-foreground">
                  {e.rank <= 3 ? <Medal className={`h-4 w-4 inline ${medalColors[e.rank - 1]}`} /> : `#${e.rank}`}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-primary/20 text-xs font-semibold text-primary">{e.avatar}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground">{e.studentName}</span>
                    {e.isCurrentUser && <Badge variant="secondary" className="text-xs">You</Badge>}
                  </div>
                </TableCell>
                <TableCell className="font-semibold text-foreground">{e.score}%</TableCell>
                <TableCell className="text-muted-foreground">{e.examsCompleted}</TableCell>
                <TableCell className="text-muted-foreground">{e.streak}🔥</TableCell>
                <TableCell><TrendIcon trend={e.trend} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default function Leaderboard() {
  const [selectedClass, setSelectedClass] = useState("cs201");
  const [timeFilter, setTimeFilter] = useState("all");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Leaderboard</h1>

      <Tabs defaultValue="class">
        <TabsList>
          <TabsTrigger value="class">Class Leaderboard</TabsTrigger>
          <TabsTrigger value="global">Global Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="class" className="mt-4 space-y-4">
          <div className="flex items-center gap-4">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="cs201">CS201 - Data Structures</SelectItem>
                <SelectItem value="cs301">CS301 - Algorithms</SelectItem>
                <SelectItem value="cs101">CS101 - Intro to CS</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-1 rounded-full border border-border bg-card/80 px-1 py-0.5 backdrop-blur-md">
              {["week", "month", "all"].map((f) => (
                <button
                  key={f}
                  onClick={() => setTimeFilter(f)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${timeFilter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {f === "week" ? "This Week" : f === "month" ? "This Month" : "All Time"}
                </button>
              ))}
            </div>
          </div>
          <Podium entries={classEntries} />
          <RankedTable entries={classEntries} />
        </TabsContent>

        <TabsContent value="global" className="mt-4 space-y-4">
          <div className="flex gap-1 rounded-full border border-border bg-card/80 px-1 py-0.5 backdrop-blur-md w-fit">
            {["week", "month", "all"].map((f) => (
              <button
                key={f}
                onClick={() => setTimeFilter(f)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${timeFilter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {f === "week" ? "This Week" : f === "month" ? "This Month" : "All Time"}
              </button>
            ))}
          </div>
          <Podium entries={globalEntries} />
          <RankedTable entries={globalEntries} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
