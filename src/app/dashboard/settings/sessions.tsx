"use client";

import { getSession, logout } from "@/api/auth";
import { revokeSession } from "@/api/session";
import SessionsLoading from "@/components/session-loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, getBrowser } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Laptop, Loader, MapPin, MonitorX, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SessionsPage() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user-sessions"],
    queryFn: getSession,
  });

  const router = useRouter();

  const revokeSessionMutation = useMutation({
    mutationFn: (sessionID: string | null) => revokeSession(sessionID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-sessions"] });
      toast.success("Session Revoked!");
    },
    onError: () => toast.error("Failed to Revoke session 😔, please try again"),
  });
  const logoutUserMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
      queryClient.removeQueries({ queryKey: ["user-sessions"] });

      toast.success("Logout successful");
      router.push("/signin");
    },
    onError: () => toast.error("Failed to Logout, please try again"),
  });

  const rawSessions = data?.data;

  const sessions = Array.isArray(rawSessions)
    ? rawSessions
    : rawSessions
      ? [rawSessions]
      : [];

  const handleRevoke = (
    state: "revoke" | "revokeAll" | "logout",
    sessionID?: string | null,
  ) => {
    if (state === "revoke") {
      if (!sessionID) return toast.error("Session ID is missing");

      revokeSessionMutation.mutate(sessionID);
      return;
    }

    if (state === "revokeAll") {
      revokeSessionMutation.mutate(null);
      return;
    }

    logoutUserMutation.mutate();
  };

  const isLogoutPending = logoutUserMutation.isPending;

  const isRevokeAllPending =
    revokeSessionMutation.isPending && revokeSessionMutation.variables === null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Sessions</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage logged in devices.
        </p>
      </div>

      <Card>
        <CardHeader className="gap-3 sm:flex sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Active devices</CardTitle>

          <Button
            variant="outline"
            size="sm"
            disabled={isLoading || isRevokeAllPending}
            onClick={() => handleRevoke("revokeAll", null)}
          >
            {isRevokeAllPending ? (
              <>
                <Loader className="animate-spin size-4" /> Please Wait...
              </>
            ) : (
              <>
                <MonitorX className="size-4" />
                Revoke all others
              </>
            )}
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {isLoading ? (
            <SessionsLoading />
          ) : isError || data?.success === false ? (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
              {data?.message || "Failed to load sessions."}
            </div>
          ) : sessions.length === 0 ? (
            <div className="rounded-lg border border-border bg-surface p-4 text-sm text-muted-foreground">
              No active sessions found.
            </div>
          ) : (
            sessions.map((session) => {
              const isThisSessionPending =
                revokeSessionMutation.isPending &&
                revokeSessionMutation.variables === session.userSessionId;

              const device = session.deviceName || "Unknown";
              const browser = getBrowser(session.userAgent);
              const ip = session.ipAddress || "Unknown";

              const location = [session.city, session.region, session.country]
                .filter(Boolean)
                .join(", ");

              const isPhone =
                device.toLowerCase().includes("iphone") ||
                session.userAgent?.toLowerCase().includes("mobile");

              return (
                <div
                  key={session.id}
                  className="grid gap-4 rounded-lg border border-border bg-surface p-4 lg:grid-cols-[1fr_auto]"
                >
                  <div className="flex gap-3">
                    {isPhone ? (
                      <Smartphone className="mt-1 size-5 text-primary" />
                    ) : (
                      <Laptop className="mt-1 size-5 text-primary" />
                    )}

                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium">{device}</p>

                        {session.isCurrentSession && <Badge>Current</Badge>}

                        {session.revokedAt ? (
                          <Badge variant="destructive" className="rounded-md">
                            Revoked
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="rounded-md">
                            Active
                          </Badge>
                        )}
                      </div>

                      <div className="grid gap-1 text-sm text-muted-foreground sm:grid-cols-2">
                        <span>{browser}</span>
                        <span>{ip}</span>

                        <span className="flex items-center gap-1">
                          <MapPin className="size-3" />
                          {location || "Unknown"}
                        </span>

                        <span>
                          Last active: {formatDate(session.lastSeenAt)}
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground">
                        Signed in {formatDate(session.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      disabled={
                        isThisSessionPending ||
                        isLogoutPending ||
                        Boolean(session.revokedAt)
                      }
                      onClick={() =>
                        handleRevoke(
                          session.isCurrentSession ? "logout" : "revoke",
                          session.userSessionId,
                        )
                      }
                      variant={
                        session.isCurrentSession ? "outline" : "destructive"
                      }
                      size="sm"
                    >
                      {isThisSessionPending ||
                      (session.isCurrentSession && isLogoutPending) ? (
                        <>
                          <Loader className="animate-spin size-4" />
                          Please Wait...
                        </>
                      ) : session.isCurrentSession ? (
                        "Sign out here"
                      ) : (
                        "Revoke"
                      )}
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}
