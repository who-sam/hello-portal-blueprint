import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Sep", score: 68 },
  { month: "Oct", score: 74 },
  { month: "Nov", score: 71 },
  { month: "Dec", score: 80 },
  { month: "Jan", score: 85 },
  { month: "Feb", score: 82 },
];

export function PerformanceChart() {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5 text-primary" />
          Score Trend
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Your average score over the last 6 months
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={28}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(20 12% 22%)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(20 10% 55%)", fontSize: 12 }}
              />
              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(20 10% 55%)", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(20 12% 12%)",
                  border: "1px solid hsl(20 12% 22%)",
                  borderRadius: "8px",
                  color: "hsl(30 20% 90%)",
                  fontSize: 13,
                }}
                cursor={{ fill: "hsl(20 15% 18% / 0.5)" }}
              />
              <Bar
                dataKey="score"
                fill="hsl(20 90% 52%)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
