import Skeleton from "react-loading-skeleton";

export default function Loading() {
  const skeletons = Array.from({ length: 6 });

  return (
    <ul className="grid list-none gap-5 p-0 sm:grid-cols-2 xl:grid-cols-3">
      {skeletons.map((_, index) => (
        <li
          key={index}
          className="overflow-hidden rounded-[1.75rem] border border-soft-border bg-surface p-4 shadow-cinema backdrop-blur-xl"
        >
          <Skeleton
            height={240}
            width="100%"
            baseColor="var(--color-skeleton)"
            highlightColor="var(--color-skeleton-highlight)"
            borderRadius={24}
          />
          <div className="mt-4 space-y-3">
            <Skeleton
              height={18}
              width="35%"
              baseColor="var(--color-skeleton)"
              highlightColor="var(--color-skeleton-highlight)"
            />
            <Skeleton
              height={32}
              width="78%"
              baseColor="var(--color-skeleton)"
              highlightColor="var(--color-skeleton-highlight)"
            />
            <Skeleton
              count={3}
              baseColor="var(--color-skeleton)"
              highlightColor="var(--color-skeleton-highlight)"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
