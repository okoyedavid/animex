"use client";
import {
  KeyRound,
  LockKeyhole,
  QrCode,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/api/auth";
import { toast } from "sonner";

export default function SecurityPage() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,

    onSuccess: (data) => {
      toast.success(data.message ?? "Password updated successfully");

      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? "Failed to update password",
      );
    },
  });

  const handleUpdatePassword = () => {
    if (!password || !newPassword || !confirmPassword) {
      return;
    }

    if (newPassword !== confirmPassword) {
      return;
    }

    resetPasswordMutation.mutate({
      password,
      newPassword,
    });
  };
  return (
    <div className="space-y-6" id="security">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Security</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Protect your account and manage authentication.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="size-4 text-primary" />
              Password
            </CardTitle>
            <CardDescription>
              Change your password and revoke other sessions after a successful
              update.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Current Password</Label>

              <Input
                placeholder="Enter current password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>New Password</Label>

                <Input
                  placeholder="Enter new password"
                  type="password"
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Confirm New Password</Label>

                <Input
                  placeholder="Confirm new password"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <Button
              onClick={handleUpdatePassword}
              disabled={resetPasswordMutation.isPending}
            >
              {resetPasswordMutation.isPending
                ? "Updating..."
                : "Update Password"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LockKeyhole className="size-4 text-primary" />
              Recovery state
            </CardTitle>
            <CardDescription>
              Security metadata the backend should calculate.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              ["Email verification", "Enabled"],
              ["Password login", "Enabled"],
              ["Authenticator app", "Not enabled"],
              ["Backup codes", "Not generated"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-lg border border-border bg-surface p-3"
              >
                <span className="text-sm">{label}</span>
                <Badge variant={value === "Enabled" ? "default" : "outline"}>
                  {value}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
