"use client";

import { useMutation } from "@tanstack/react-query";
import {
  ArrowRight,
  BadgeCheck,
  KeyRound,
  Mail,
  MailCheck,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { resendVerificationEmail, verifyEmail } from "@/api/auth";
import { useRandomBackground } from "@/hooks/useRandomBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import validation_Regex from "@/utils/Validation";
import { useRouter } from "next/navigation";

const RESEND_COOLDOWN_SECONDS = 45;
const { EMAIL } = validation_Regex;

const CODE_REGEX = /^\d{6}$/;

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: "easeOut" as const },
};

type VerifyEmailProps = {
  initialEmail?: string;
};

function formatCountdown(seconds: number) {
  if (seconds <= 0) {
    return "Resend email";
  }

  return `Resend in ${seconds}s`;
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-soft-border bg-card p-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}

export default function VerifyEmail({ initialEmail = "" }: VerifyEmailProps) {
  const backgroundImage = useRandomBackground();
  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [verificationState, setVerificationState] = useState<
    "idle" | "success" | "error"
  >("idle");

  useEffect(() => {
    if (!email && initialEmail) {
      setEmail(initialEmail);
    }
  }, [email, initialEmail]);

  const router = useRouter();

  useEffect(() => {
    if (cooldown <= 0) {
      return;
    }

    const timer = window.setTimeout(() => {
      setCooldown((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [cooldown]);

  const isEmailValid = useMemo(() => EMAIL.test(email.trim()), [email]);
  const normalizedCode = useMemo(() => code.trim(), [code]);
  const isCodeValid = useMemo(
    () => CODE_REGEX.test(normalizedCode),
    [normalizedCode],
  );

  const imageSrc = backgroundImage
    ?.replace(/^url\(['"]?/, "")
    .replace(/['"]?\)$/, "");

  const resendMutation = useMutation({
    mutationFn: async (targetEmail: string) => {
      const response = await resendVerificationEmail(targetEmail);

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

  const verifyMutation = useMutation({
    mutationFn: async ({
      targetEmail,
      targetCode,
    }: {
      targetEmail: string;
      targetCode: string;
    }) => {
      const response = await verifyEmail({
        email: targetEmail,
        otp: targetCode,
      });

      if (!response.success) {
        throw new Error(
          response.message ||
            "Verification failed. Check the code and try again.",
        );
      }

      return response;
    },
    onSuccess: (response) => {
      setVerificationState("success");
      toast.success(response.message || "Email verified successfully.");
      router.push("/signin");
    },
    onError: (error: Error) => {
      setVerificationState("error");
      toast.error(
        error.message || "Verification failed. Check the code and try again.",
      );
    },
  });

  const handleResend = () => {
    const normalizedEmail = email.trim();

    if (!EMAIL.test(normalizedEmail)) {
      toast.error("Enter a valid email address before requesting a resend.");
      return;
    }

    resendMutation.mutate(normalizedEmail);
  };

  const handleVerify = () => {
    const normalizedEmail = email.trim();

    if (!EMAIL.test(normalizedEmail)) {
      toast.error("Enter a valid email address before verifying.");
      return;
    }

    if (!CODE_REGEX.test(normalizedCode)) {
      toast.error("Enter the verification code from your email.");
      setVerificationState("error");
      return;
    }

    setVerificationState("idle");
    verifyMutation.mutate({
      targetEmail: normalizedEmail,
      targetCode: normalizedCode,
    });
  };

  return (
    <main className="h-screen">
      <div className=" grid h-full lg:grid-cols-[1.1fr_0.9fr]">
        <motion.section
          {...fadeUp}
          className="relative overflow-hidden rounded-md border border-soft-border shadow-cinema"
        >
          <PlaceholderImage
            src={imageSrc}
            alt="Verify your email"
            className="h-full min-h-[420px] w-full"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,12,18,0.12),rgba(9,12,18,0.72)_58%,rgba(9,12,18,0.92))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,138,61,0.18),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(67,97,238,0.14),transparent_28%)]" />

          <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
            <Link
              href="/"
              className="font-display text-2xl font-semibold tracking-[0.18em] text-popover transition hover:text-primary"
            >
              Animex
            </Link>

            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-background/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-sm">
                <ShieldCheck size={14} className="text-primary" />
                Verification pending
              </div>

              <h1 className="mt-5 font-display text-4xl leading-tight text-white sm:text-5xl">
                One more step and your account is ready to keep every anime
                pick.
              </h1>

              <p className="mt-4 text-sm leading-7 text-slate-200 sm:text-base">
                We sent a verification code to your inbox. Enter it on the
                right, confirm the address, then continue into your watchlist
                and saved titles.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <StatTile label="Step 1" value="Open the email" />
                <StatTile label="Step 2" value="Copy the code" />
                <StatTile label="Step 3" value="Verify here" />
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.08 }}
          className="rounded-md border border-soft-border bg-[linear-gradient(180deg,var(--color-surface-strong),var(--color-surface))] p-6 shadow-cinema sm:p-8"
        >
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary">
                Verify email
              </p>
              <h2 className="font-display text-3xl leading-tight">
                Enter your code
              </h2>
              <p className="text-sm leading-7 text-muted-foreground">
                Use the same email you signed up with, then paste the code we
                sent. If it does not arrive, request another one below.
              </p>
            </div>

            <div className="rounded-md border border-soft-border bg-card p-5">
              <div className="flex items-start gap-4">
                <div className="inline-flex rounded-full bg-primary/12 p-3 text-primary">
                  <MailCheck size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    Delivery target
                  </p>
                  <p className="mt-2 break-all text-base font-semibold text-foreground">
                    {email.trim() || "Enter your email below"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email address"
                autoComplete="email"
                showError={email.length > 0 && !isEmailValid}
                errorMsg="Use the address you registered with."
              />

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

              {verificationState === "success" ? (
                <div className="rounded-md border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-foreground">
                  <span className="inline-flex items-center gap-2 font-semibold text-primary">
                    <BadgeCheck size={16} />
                    Verification successful
                  </span>
                  <p className="mt-2 text-muted-foreground">
                    Your email has been confirmed. You can continue to sign in.
                  </p>
                </div>
              ) : null}

              {verificationState === "error" ? (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  <span className="inline-flex items-center gap-2 font-semibold">
                    <KeyRound size={16} />
                    Verification failed
                  </span>
                  <p className="mt-2 text-muted-foreground">
                    The code is invalid or expired. Check the latest email or
                    request a fresh code.
                  </p>
                </div>
              ) : null}

              <div className="grid gap-3 sm:grid-cols-2">
                <Button
                  type="button"
                  size="lg"
                  className="min-h-14"
                  onClick={handleVerify}
                  disabled={
                    verifyMutation.isPending || !isEmailValid || !isCodeValid
                  }
                >
                  {verifyMutation.isPending ? (
                    <span className="inline-flex items-center gap-2">
                      <RefreshCcw size={16} className="animate-spin" />
                      Verifying...
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <BadgeCheck size={16} />
                      Verify code
                    </span>
                  )}
                </Button>

                <Button
                  type="button"
                  size="lg"
                  className="min-h-14"
                  onClick={handleResend}
                  disabled={
                    resendMutation.isPending || cooldown > 0 || !isEmailValid
                  }
                >
                  {resendMutation.isPending ? (
                    <span className="inline-flex items-center gap-2">
                      <RefreshCcw size={16} className="animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <Mail size={16} />
                      {formatCountdown(cooldown)}
                    </span>
                  )}
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-2 text-sm text-muted-foreground">
              <a
                href={isEmailValid ? `mailto:${email.trim()}` : "mailto:"}
                className="font-semibold text-foreground transition hover:text-primary"
              >
                Open mail app
              </a>
              <Link
                href="/signin"
                className="inline-flex items-center gap-2 font-semibold text-foreground transition hover:text-primary"
              >
                Continue to sign in
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
