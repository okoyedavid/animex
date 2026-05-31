import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <section className="mx-auto flex max-w-4xl flex-col items-center justify-center rounded-[2.5rem] border border-white/10 bg-white/5 px-6 py-16 text-center shadow-cinema backdrop-blur-xl sm:px-10">
        <p className="text-3xl font-semibold uppercase tracking-[0.3em] text-primary">
          404
        </p>
        <h1 className="mt-4 font-display text-5xl leading-none sm:text-6xl">
          This anime page drifted out of range.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 ">
          The route could not be found. Return to search and keep looking for
          your next anime.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/search"
            className="inline-flex items-center rounded-sm bg-white px-5 py-3 text-sm font-semibold  transition hover:bg-accent-soft"
          >
            Go to search
          </Link>
          <Link
            href="/"
            className="inline-flex items-center rounded-sm border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold transition hover:border-white/25 hover:bg-white/10"
          >
            Back home
          </Link>
        </div>
      </section>
    </main>
  );
}
