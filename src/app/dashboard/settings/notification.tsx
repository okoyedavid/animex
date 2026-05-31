import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const items = [
  {
    name: "Security alerts",
    description: "Password, email, 2FA, and dangerous account changes.",
    locked: true,
  },
  {
    name: "New login alerts",
    description: "Get notified when a new device signs in.",
    locked: false,
  },
  {
    name: "Weekly watchlist summary",
    description: "Anime saved, removed, or trending from your list.",
    locked: false,
  },
  {
    name: "Product updates",
    description: "New Animex features and quality-of-life changes.",
    locked: false,
  },
  {
    name: "Marketing emails",
    description: "Low-priority promotional messages.",
    locked: false,
  },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Control how we contact you.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>
            Choose your notification preferences.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {items.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between gap-4 rounded-lg border border-border bg-surface p-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{item.name}</p>
                  {item.locked && (
                    <Badge variant="outline" className="rounded-md">
                      Required
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>

              <Switch defaultChecked disabled={item.locked} />
            </div>
          ))}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-surface p-4">
              <p className="font-medium">Delivery channels</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Store separate preferences for email, in-app, and push once the
                app supports push notifications.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface p-4">
              <p className="font-medium">Audit rule</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Changes to security notification preferences should create a
                security event.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
