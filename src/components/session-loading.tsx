export default function SessionsLoading() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="grid gap-4 rounded-lg border border-border bg-surface p-4 lg:grid-cols-[1fr_auto]"
        >
          <div className="flex gap-3">
            <div className="mt-1 size-5 animate-pulse rounded bg-muted" />

            <div className="w-full space-y-3">
              <div className="h-5 w-48 animate-pulse rounded bg-muted" />

              <div className="grid gap-2 sm:grid-cols-2">
                <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                <div className="h-4 w-40 animate-pulse rounded bg-muted" />
                <div className="h-4 w-36 animate-pulse rounded bg-muted" />
                <div className="h-4 w-44 animate-pulse rounded bg-muted" />
              </div>

              <div className="h-3 w-40 animate-pulse rounded bg-muted" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-9 w-20 animate-pulse rounded bg-muted" />
            <div className="h-9 w-20 animate-pulse rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
