import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UpcomingExamsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Upcoming Exams</h1>
        <p className="mt-1 text-muted-foreground">View and manage your scheduled exams.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Exam Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No upcoming exams scheduled yet.</p>
        </CardContent>
      </Card>
    </div>
  );
}
