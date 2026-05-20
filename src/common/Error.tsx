type ErrorProps = {
  err: string;
};

export default function Error({ err }: ErrorProps) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-[2rem] border border-destructive/30 bg-destructive/10 px-6 text-center shadow-cinema">
      <p className="font-display text-3xl text-destructive">
        Something went wrong.
      </p>
      <span className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
        {err}
      </span>
    </div>
  );
}
