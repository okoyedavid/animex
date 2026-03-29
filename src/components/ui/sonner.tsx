"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      richColors
      theme="dark"
      toastOptions={{
        classNames: {
          toast:
            "!border !border-white/10 !bg-surface-strong !text-white !shadow-cinema",
          title: "!text-white",
          description: "!text-slate-300",
          actionButton: "!bg-white !text-slate-950",
          cancelButton: "!bg-white/10 !text-white",
        },
      }}
    />
  );
}
