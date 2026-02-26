import { Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Messages</h1>
        <p className="mt-1 text-muted-foreground">Your inbox and notifications.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Inbox
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No messages yet.</p>
        </CardContent>
      </Card>
    </div>
  );
}
