import { HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Help & Support</h1>
        <p className="mt-1 text-muted-foreground">Find answers and get assistance.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            FAQ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Help center coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
