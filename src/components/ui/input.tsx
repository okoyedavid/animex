import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  isPassword?: boolean;
  showError?: boolean;
  errorMsg?: string;
}

function Input({
  className,
  isPassword,
  showError,
  errorMsg,
  type,
  id,
  ...props
}: InputProps) {
  const errorId = React.useId();
  const hasError = Boolean(showError);
  const isPasswordField = isPassword || type === "password";
  const autoCompleteValue =
    props.autoComplete ??
    (isPasswordField ? "current-password" : type === "email" ? "email" : "off");

  return (
    <div>
      <input
        id={id}
        type={type}
        data-slot="input"
        autoComplete={autoCompleteValue}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError && errorMsg ? errorId : undefined}
        className={cn(
          "min-h-14 w-full min-w-0 rounded-lg border border-border bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
          isPasswordField ? "pr-14" : "pr-4",
          hasError
            ? "border-destructive/80 bg-destructive/5 focus-visible:border-destructive focus-visible:ring-destructive/20"
            : "focus:ring-4 focus:ring-accent/10",
          className,
        )}
        {...props}
      />
      {hasError && errorMsg ? (
        <p
          id={errorId}
          className="mt-2 text-sm leading-6 text-destructive"
        >
          {errorMsg}
        </p>
      ) : null}
    </div>
  );
}

export { Input };
