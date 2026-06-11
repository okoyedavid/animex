"use client";

import { getAuditEvents } from "@/api/audit";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Activity } from "lucide-react";
import ActivityEvent from "./activity-event";

export default function ActivityPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["audit-events"],
    queryFn: getAuditEvents,
  });

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
            Recent security and account activity for your account.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          {isLoading ? (
            Array.from({ length: 3 }, (_, index) => (
              <Skeleton key={index} className="h-24 w-full" />
            ))
          ) : isError ? (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
              Failed to load security activity.
            </div>
          ) : data?.data.length ? (
            data.data.map((event) => (
              <ActivityEvent key={event._id} event={event} />
            ))
          ) : (
            <div className="rounded-lg border border-border bg-surface p-4 text-sm text-muted-foreground">
              No security activity found.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
