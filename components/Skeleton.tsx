/**
 * Pulse placeholders used as Suspense fallbacks while database-backed lists
 * stream in. They keep the page shell (and client-side navigation) instant
 * even when the database is slow to answer.
 */
export function SkeletonRows({ rows = 4 }: { rows?: number }) {
  return (
    <div aria-hidden="true" className="animate-pulse">
      {Array.from({ length: rows }, (_, i) => (
        <div
          key={i}
          className="grid grid-cols-[minmax(96px,150px)_1fr] items-baseline gap-4 border-b border-ink/15 py-[26px] first:border-t"
        >
          <span className="block h-4 w-20 rounded bg-ink/10" />
          <span>
            <span className="block h-5 w-3/4 rounded bg-ink/10" />
            <span className="mt-2.5 block h-3.5 w-1/2 rounded bg-ink/10" />
          </span>
        </div>
      ))}
    </div>
  );
}

export function SkeletonCards({ count = 4 }: { count?: number }) {
  return (
    <div
      aria-hidden="true"
      className="grid animate-pulse grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-6"
    >
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="overflow-hidden rounded-[4px] border border-ink/15 bg-white">
          <div className="h-[128px] bg-ink/10" />
          <div className="p-6">
            <span className="block h-3 w-16 rounded bg-ink/10" />
            <span className="mt-3 block h-5 w-4/5 rounded bg-ink/10" />
            <span className="mt-2 block h-3.5 w-full rounded bg-ink/10" />
            <span className="mt-1.5 block h-3.5 w-2/3 rounded bg-ink/10" />
          </div>
        </div>
      ))}
    </div>
  );
}
