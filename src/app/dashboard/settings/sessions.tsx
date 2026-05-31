import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Laptop, MapPin, MonitorX, ShieldAlert, Smartphone } from "lucide-react";

const sessions = [
  {
    id: "current",
    device: "Chrome on Windows",
    browser: "Chrome 125",
    ip: "102.89.xxx.xxx",
    location: "Lagos, Nigeria",
    lastActive: "Active now",
    createdAt: "May 27, 2026",
    current: true,
    trusted: true,
  },
  {
    id: "mobile",
    device: "Safari on iPhone",
    browser: "Safari iOS",
    ip: "197.210.xxx.xxx",
    location: "Abuja, Nigeria",
    lastActive: "2 hours ago",
    createdAt: "May 25, 2026",
    current: false,
    trusted: false,
  },
];

export default function SessionsPage() {
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
          <Button variant="outline" size="sm">
            <MonitorX className="size-4" />
            Revoke all others
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="grid gap-4 rounded-lg border border-border bg-surface p-4 lg:grid-cols-[1fr_auto]"
            >
              <div className="flex gap-3">
                {session.device.includes("iPhone") ? (
                  <Smartphone className="mt-1 size-5 text-primary" />
                ) : (
                  <Laptop className="mt-1 size-5 text-primary" />
                )}
                <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{session.device}</p>

                  {session.current && <Badge>Current</Badge>}
                  {session.trusted ? (
                    <Badge variant="outline" className="rounded-md">
                      Trusted
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="rounded-md">
                      Review
                    </Badge>
                  )}
                </div>

                <div className="grid gap-1 text-sm text-muted-foreground sm:grid-cols-2">
                  <span>{session.browser}</span>
                  <span>{session.ip}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3" />
                    {session.location}
                  </span>
                  <span>Last active: {session.lastActive}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Signed in {session.createdAt}
                </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!session.trusted && (
                  <Button variant="outline" size="sm">
                    Trust
                  </Button>
                )}
                <Button
                  variant={session.current ? "outline" : "destructive"}
                  size="sm"
                >
                  {session.current ? "Sign out here" : "Revoke"}
                </Button>
              </div>
            </div>
          ))}

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
            <div className="mb-1 flex items-center gap-2 font-medium">
              <ShieldAlert className="size-4 text-amber-500" />
              Backend model
            </div>
            <p className="text-muted-foreground">
              Each refresh token should map to a session record with a device
              fingerprint, IP, user agent, created time, last active time, and
              revoked time.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
