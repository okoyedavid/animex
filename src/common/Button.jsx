const Button = ({
  disabled,
  label,
  className = "",
  type = "submit",
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={disabled}
      className={`inline-flex min-h-14 w-full items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-r from-accent to-accent-soft px-6 py-4 text-sm font-semibold tracking-wide text-slate-950 shadow-[0_18px_45px_rgba(255,138,61,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(255,138,61,0.32)] disabled:cursor-not-allowed disabled:border-white/5 disabled:from-white/15 disabled:to-white/10 disabled:text-white/45 disabled:shadow-none ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
