export default function Error({ err }) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-[2rem] border border-danger/30 bg-danger/10 px-6 text-center shadow-cinema">
      <p className="font-display text-3xl text-white">Something went wrong.</p>
      <span className="mt-3 max-w-xl text-sm leading-7 text-rose-100 sm:text-base">
        {err}
      </span>
    </div>
  );
}
