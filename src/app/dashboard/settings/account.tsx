"use client";
import {
  confirmChangeEmail,
  deleteProvider,
  getProviders,
  getUser,
  sendChangeEmailOtp,
} from "@/api/auth";
import Providers from "@/app/providers";
import { ConfirmDialog } from "@/components/confirm-modal";
import { Badge } from "@/components/ui/badge";
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
import validationRegex from "@/utils/Validation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle2,
  KeyRound,
  Loader,
  LucideIcon,
  Mail,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
const RESEND_COOLDOWN_SECONDS = 45;

const CODE_REGEX = /^\d{6}$/;
const { EMAIL } = validationRegex;
export type Providers = {
  name: string;
  connected: boolean;
  icon?: LucideIcon;
}[];

const dummyProviders: Providers = [
  { name: "Password", connected: false },
  { name: "Google", connected: false },
  { name: "GitHub", connected: false, icon: KeyRound },
];

export default function Account() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const { data: providersData, isLoading: loadingProviders } = useQuery({
    queryKey: ["providers"],
    queryFn: getProviders,
  });

  const providers = loadingProviders
    ? dummyProviders
    : providersData.success
      ? providersData.data
      : dummyProviders;

  const [codeSent, setCodeSent] = useState(false);

  const [email, setEmail] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [code, setCode] = useState("");

  const [open, setOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");

  useEffect(() => {
    if (cooldown <= 0) {
      return;
    }

    const timer = window.setTimeout(() => {
      setCooldown((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [cooldown]);

  const normalizedCode = useMemo(() => code.trim(), [code]);
  const normalizedEmail = useMemo(() => email.trim().toLowerCase(), [email]);
  const isEmailValid = useMemo(
    () => EMAIL.test(normalizedEmail),
    [normalizedEmail],
  );
  const isCodeValid = useMemo(
    () => CODE_REGEX.test(normalizedCode),
    [normalizedCode],
  );

  const user = data?.data
    ? {
        ...data.data,
        profilePhoto: data.data.avatar || "/default-profile.jpeg",
      }
    : null;
  const isCurrentEmail = normalizedEmail === user?.email?.toLowerCase();

  const resendMutation = useMutation({
    mutationFn: async (targetEmail: string) => {
      const response = await sendChangeEmailOtp({
        newEmail: targetEmail,
      });

      if (!response.success) {
        throw new Error(
          response.message ||
            "Could not resend verification email. Please try again.",
        );
      }

      return response;
    },
    onSuccess: (response, targetEmail) => {
      setCooldown(RESEND_COOLDOWN_SECONDS);
      setCodeSent(true);
      setCode("");
      toast.success(
        response.message || `Verification email sent to ${targetEmail}`,
      );
    },
    onError: (error: Error) => {
      toast.error(
        error.message ||
          "Could not resend verification email. Please try again.",
      );
    },
  });

  const deleteProviderMutation = useMutation({
    mutationFn: async () => {
      const response = await deleteProvider({ provider: selectedMethod });

      if (!response.success) {
        throw new Error(
          response.message || "Failed to delete Provider! please try again",
        );
      }

      return response;
    },
    onSuccess: (response, targetEmail) => {
      toast.success(
        response.message || `${selectedMethod} deleted Succesfully!`,
      );
      setOpen(false);
      setSelectedMethod("");
    },
    onError: (error: Error) => {
      toast.error(
        error.message || "Could not delete Provider! Please try again.",
      );
    },
  });

  const confirmMutation = useMutation({
    mutationFn: async ({ targetCode }: { targetCode: string }) => {
      const response = await confirmChangeEmail({
        otp: targetCode,
      });

      if (!response.success) {
        throw new Error(
          response.message ||
            "Could not change email. Check the code and try again.",
        );
      }

      return response;
    },
    onSuccess: async (response) => {
      setCodeSent(false);
      setEmail("");
      setCode("");
      setCooldown(0);
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success(response.message || "Email changed successfully.");
    },
    onError: (error: Error) => {
      toast.error(
        error.message ||
          "Could not change email. Check the code and try again.",
      );
    },
  });

  const canRequestCode =
    Boolean(user?.email) &&
    isEmailValid &&
    !isCurrentEmail &&
    cooldown === 0 &&
    !resendMutation.isPending;

  const handleSendCode = () => {
    if (!user?.email) {
      toast.error("Could not load your current account email.");
      return;
    }

    if (!isEmailValid) {
      toast.error("Enter a valid new email address.");
      return;
    }

    if (isCurrentEmail) {
      toast.error("Enter an email address different from your current one.");
      return;
    }

    if (cooldown > 0) {
      toast.error(`Please wait ${cooldown}s before requesting another code.`);
      return;
    }

    resendMutation.mutate(normalizedEmail);
  };

  const handleConfirmEmailChange = () => {
    if (!isEmailValid) {
      toast.error("Enter a valid new email address.");
      return;
    }

    if (!isCodeValid) {
      toast.error("Enter the 6-digit verification code.");
      return;
    }

    confirmMutation.mutate({
      targetCode: normalizedCode,
    });
  };

  const handleEditEmail = () => {
    setCodeSent(false);
    setCode("");
  };
  const openDialog = (name: string) => {
    setSelectedMethod(name);
    setOpen(true);
  };

  const handleDisconnect = () => {
    const remainingSignInMethods = providers.filter(
      (provider) => provider.name !== selectedMethod && provider.connected,
    );
    if (remainingSignInMethods.length < 1) {
      toast.error(
        "Please add another sign in method before you can Disconnect",
      );
      return;
    }

    deleteProviderMutation.mutate();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Account</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage email verification, sign-in providers, and account metadata.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="size-4 text-primary" />
              Email address
            </CardTitle>
            <CardDescription>
              Changing your email requires verification.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge
                className="rounded-md"
                variant={user?.emailVerifiedAt ? "default" : "destructive"}
              >
                {user?.emailVerifiedAt ? "Verified" : "Unverified"}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {user ? (
                  user.email
                ) : (
                  <div className="h-4 w-24 animate-pulse rounded-sm bg-muted" />
                )}
              </span>
            </div>

            <div className="space-y-2">
              <Label>New Email</Label>
              <Input
                type="email"
                value={email}
                disabled={codeSent || resendMutation.isPending}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="new@email.com"
                autoComplete="email"
                showError={
                  email.length > 0 && (!isEmailValid || isCurrentEmail)
                }
                errorMsg={
                  isCurrentEmail
                    ? "Use an email address different from your current one."
                    : "Enter a valid email address."
                }
              />
            </div>

            {codeSent && (
              <div className="space-y-2">
                <Label>Verification code</Label>
                <Input
                  type="text"
                  name="code"
                  value={code}
                  onChange={(event) =>
                    setCode(event.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="Enter 6-digit code"
                  autoComplete="one-time-code"
                  showError={code.length > 0 && !isCodeValid}
                  errorMsg="Enter the 6-digit code from your email."
                  className="tracking-[0.24em]"
                />
              </div>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                type="button"
                onClick={handleSendCode}
                disabled={!canRequestCode}
              >
                {resendMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader className="animate-spin" /> please wait...
                  </span>
                ) : cooldown > 0 ? (
                  `Resend in ${cooldown}s`
                ) : codeSent ? (
                  "Resend verification code"
                ) : (
                  "Send verification code"
                )}
              </Button>
              {codeSent ? (
                <Button
                  type="button"
                  onClick={handleConfirmEmailChange}
                  disabled={!isCodeValid || confirmMutation.isPending}
                >
                  {confirmMutation.isPending ? (
                    <span className="flex items-center gap-2">
                      <Loader className="animate-spin" /> changing...
                    </span>
                  ) : (
                    "Change email"
                  )}
                </Button>
              ) : !user?.emailVerifiedAt ? (
                <Button type="button" variant="outline">
                  Resend current verification
                </Button>
              ) : null}
            </div>

            {codeSent && (
              <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
                <span className="break-all">
                  Code sent to {normalizedEmail}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleEditEmail}
                  disabled={confirmMutation.isPending}
                >
                  Edit email
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" />
              Sign-in methods
            </CardTitle>
            <CardDescription>
              Keep at least one strong recovery method attached to the account.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            {providers.map((provider) => {
              const Icon = provider.connected ? CheckCircle2 : KeyRound;

              return (
                <div
                  key={provider.name}
                  className="flex items-center justify-between rounded-lg border border-border bg-surface p-3"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="size-4 text-primary" />
                    <div>
                      <p className="font-medium">{provider.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {provider.connected ? "Connected" : "Not connected"}
                      </p>
                    </div>
                  </div>
                  {provider.connected && provider.name === "password" ? (
                    <Link href={"#security"}>
                      {" "}
                      <Button variant="outline" size="sm">
                        {" "}
                        Change Password
                      </Button>{" "}
                    </Link>
                  ) : provider.connected ? (
                    <Button
                      onClick={() => openDialog(provider.name)}
                      variant="outline"
                      size="sm"
                    >
                      {" "}
                      Disconnect
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      Connect{" "}
                    </Button>
                  )}
                </div>
              );
            })}

            <ConfirmDialog
              open={open}
              onOpenChange={setOpen}
              variant="danger"
              title={`Disconnect ${selectedMethod} Sign in Method`}
              description="This action cannot be undone."
              confirmLabel="Delete"
              loading={deleteProviderMutation.isPending}
              onConfirm={handleDisconnect}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
