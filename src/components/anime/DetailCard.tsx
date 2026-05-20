export default function DetailCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-surface-strong/60 p-5 shadow-cinema backdrop-blur-md">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em]">
        {label}
      </p>
      <p className="mt-3 text-lg font-semibold ">{value}</p>
    </div>
  );
}
