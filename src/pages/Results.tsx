import { ClipboardCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResultsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Results</h1>
        <p className="mt-1 text-muted-foreground">Review your past exam results and performance.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-primary" />
            Past Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No results available yet.</p>
        </CardContent>
      </Card>
    </div>
  );
}
