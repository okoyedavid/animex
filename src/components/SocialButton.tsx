const SocialButton = ({ label, icon, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex min-h-auto hover:text-primary sm:min-h-7 md:min-h-14 w-full items-center justify-center gap-2 xl:gap-3 rounded-md border border-foreground/12 bg-white/6 px-4 xl:px-5 py-4 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-white/10"
  >
    {icon}
    <span>{label}</span>
  </button>
);

export { SocialButton };
