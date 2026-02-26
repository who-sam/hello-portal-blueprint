import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PracticePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Practice</h1>
        <p className="mt-1 text-muted-foreground">Start a practice exam to sharpen your skills.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-primary" />
            Available Practice Sets
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">No practice sets available yet.</p>
          <Button className="gap-2">
            <Play className="h-4 w-4" />
            Quick Practice
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
