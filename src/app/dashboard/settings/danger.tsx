import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Download, Trash2 } from "lucide-react";

export default function DangerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-destructive">
          Danger Zone
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Irreversible and destructive actions.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="size-4 text-primary" />
            Data export
          </CardTitle>

          <CardDescription>
            Download profile, watchlist, notification settings, and security
            activity.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-lg border border-border bg-surface p-4 text-sm text-muted-foreground">
            Require recent authentication and make generated export links
            short-lived.
          </div>
          <Button variant="outline">Request data export</Button>
        </CardContent>
      </Card>

      <Card className="border-destructive/30 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trash2 className="size-4" />
            Delete account
          </CardTitle>

          <CardDescription>
            Permanently delete your account and all associated data.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

                <AlertDialogDescription>
                  This action cannot be undone. Backend should require password,
                  2FA if enabled, and confirmation text before deletion.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="space-y-2">
                <Input placeholder="Type DELETE to continue" />
                <Input type="password" placeholder="Confirm password" />
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
