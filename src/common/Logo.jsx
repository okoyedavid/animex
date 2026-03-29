import Link from "next/link";

const Logo = ({ children = null, className = "" }) => {
  return (
    <>
      <Link
        href="/"
        className={`font-display text-2xl font-semibold tracking-[0.18em] text-white transition hover:text-accent-soft ${className}`}
      >
        Animex
      </Link>
      {children}
    </>
  );
};

export default Logo;
