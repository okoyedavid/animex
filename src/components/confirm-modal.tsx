"use client";

import { AlertTriangle, CheckCircle2, HelpCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ConfirmVariant = "danger" | "success" | "neutral";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title: string;
  description?: string;

  confirmLabel?: string;
  cancelLabel?: string;

  loading?: boolean;
  variant?: ConfirmVariant;

  onConfirm: () => void;
}

const variants = {
  danger: {
    icon: AlertTriangle,
    iconClass: "bg-destructive/10 text-destructive border-destructive/20",
    confirmButton: "destructive" as const,
    accent: "bg-destructive",
  },

  success: {
    icon: CheckCircle2,
    iconClass: "bg-primary/10 text-primary border-primary/20",
    confirmButton: "default" as const,
    accent: "bg-primary",
  },

  neutral: {
    icon: HelpCircle,
    iconClass: "bg-surface-muted text-muted-foreground border-soft-border",
    confirmButton: "default" as const,
    accent: "bg-border",
  },
};

export function ConfirmDialog({
  open,
  onOpenChange,

  title,
  description,

  confirmLabel = "Confirm",
  cancelLabel = "Cancel",

  loading = false,
  variant = "neutral",

  onConfirm,
}: ConfirmDialogProps) {
  const config = variants[variant];
  const Icon = config.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={!loading} className="overflow-hidden p-0">
        {/* Top Accent
        <div className={cn("h-1 w-full", config.accent)} /> */}

        <div className="p-6">
          <DialogHeader className="gap-4 flex items-center flex-row">
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full border",
                config.iconClass,
              )}
            >
              <Icon className="size-6" />
            </div>

            <div className="space-y-1">
              <DialogTitle>{title}</DialogTitle>

              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </div>
          </DialogHeader>

          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              disabled={loading}
              onClick={() => onOpenChange(false)}
            >
              {cancelLabel}
            </Button>

            <Button
              variant={config.confirmButton}
              disabled={loading}
              onClick={onConfirm}
            >
              {loading ? "Please wait..." : confirmLabel}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
