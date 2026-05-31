import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, AlertTriangle, CheckCircle2 } from "lucide-react";

const events = [
  {
    title: "Password changed",
    detail: "Chrome on Windows - Lagos, Nigeria",
    time: "2 hours ago",
    status: "success",
  },
  {
    title: "New login detected",
    detail: "Safari on iPhone - Abuja, Nigeria",
    time: "Yesterday",
    status: "review",
  },
  {
    title: "Email verification sent",
    detail: "Code sent to your primary email",
    time: "May 26, 2026",
    status: "success",
  },
  {
    title: "Failed login attempt",
    detail: "Unknown browser - IP rate limited",
    time: "May 24, 2026",
    status: "review",
  },
];

export default function ActivityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Security Activity
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Review sign-ins, authentication changes, and sensitive account events.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="size-4 text-primary" />
            Audit log
          </CardTitle>
          <CardDescription>
            This should come from an append-only backend security-events table or
            collection.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          {events.map((event) => {
            const needsReview = event.status === "review";
            const Icon = needsReview ? AlertTriangle : CheckCircle2;

            return (
              <div
                key={`${event.title}-${event.time}`}
                className="grid gap-3 rounded-lg border border-border bg-surface p-4 sm:grid-cols-[1fr_auto]"
              >
                <div className="flex gap-3">
                  <Icon
                    className={
                      needsReview
                        ? "mt-1 size-4 text-amber-500"
                        : "mt-1 size-4 text-primary"
                    }
                  />
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.detail}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:justify-end">
                  <Badge
                    variant={needsReview ? "destructive" : "secondary"}
                    className="rounded-md"
                  >
                    {needsReview ? "Review" : "Success"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {event.time}
                  </span>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
