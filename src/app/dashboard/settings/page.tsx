import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Account from "./account";
import ActivityPage from "./activity";
import { SETTINGS_BACKEND_ROUTES } from "./backend";
import DangerPage from "./danger";
import NotificationsPage from "./notification";
import ProfileSettingsPage from "./profile";
import SecurityPage from "./security";
import SessionsPage from "./sessions";

export default function Page() {
  const protectedRoutes = SETTINGS_BACKEND_ROUTES.filter(
    (route) => route.auth === "required",
  ).length;

  return (
    <section className="space-y-8 p-4 md:p-8">
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div>
          <Badge variant="outline" className="mb-3 rounded-md">
            Security center
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight">Settings</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            Manage profile details, authentication methods, trusted devices,
            notification preferences, privacy exports, and destructive account
            actions from one place.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <Account />
        <Separator className="h-1 bg-muted" />
        <ProfileSettingsPage />
        <Separator className="h-1 bg-muted" />
        <SessionsPage />
        <Separator className="h-1 bg-muted" />
        <SecurityPage />
        <Separator className="h-1 bg-muted" />
        <ActivityPage />
        <Separator className="h-1 bg-muted" />
        <NotificationsPage />
        <Separator className="h-1 bg-muted" />
        <DangerPage />
      </div>
    </section>
  );
}
