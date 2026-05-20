"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      richColors
      theme="light"
      toastOptions={{
        classNames: {
          toast:
            "!border !border-soft-border !bg-surface-strong !text-foreground !shadow-cinema",
          title: "!text-foreground",
          description: "!text-muted-foreground",
          actionButton:
            "!border !border-primary/20 !bg-primary !text-primary-foreground hover:!bg-primary/90",
          cancelButton:
            "!border !border-soft-border !bg-surface !text-foreground hover:!bg-accent/35",
          success:
            "!border !border-primary/20 !bg-surface-strong !text-foreground",
          error:
            "!border !border-destructive/25 !bg-destructive/10 !text-destructive",
          warning:
            "!border !border-primary/25 !bg-accent/45 !text-foreground",
          info: "!border !border-soft-border !bg-surface !text-foreground",
        },
      }}
    />
  );
}
