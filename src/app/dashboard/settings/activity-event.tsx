import type { AuditEvent } from "@/api/audit";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

type ActivityEventProps = {
  event: AuditEvent;
};

function formatEventType(type: string) {
  return type
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function ActivityEvent({ event }: ActivityEventProps) {
  const needsReview = ["failed", "failure", "denied"].includes(
    event.outcome.toLowerCase(),
  );
  const isWarning = event.severity.toLowerCase() === "warning";
  const Icon = needsReview ? AlertTriangle : CheckCircle2;
  const location = [event.city, event.region, event.country]
    .filter(Boolean)
    .join(", ");
  const detail =
    event.reason ||
    [event.deviceName, location, event.ipAddress].filter(Boolean).join(" - ") ||
    "No additional details.";

  return (
    <div className="grid gap-3 rounded-lg border border-border bg-surface p-4 sm:grid-cols-[1fr_auto]">
      <div className="flex gap-3">
        <Icon
          className={
            needsReview
              ? "mt-1 size-4 text-amber-500"
              : "mt-1 size-4 text-primary"
          }
        />
        <div>
          <p className="font-medium">
            {formatEventType(event.eventType)}
          </p>
          <p className="text-sm text-muted-foreground">{detail}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:justify-end">
        <Badge
          variant={needsReview ? "destructive" : "secondary"}
          className="rounded-md"
        >
          {needsReview ? "Review" : isWarning ? "Warning" : event.outcome}
        </Badge>
        <span className="text-xs text-muted-foreground">
          {formatDate(event.createdAt)}
        </span>
      </div>
    </div>
  );
}
