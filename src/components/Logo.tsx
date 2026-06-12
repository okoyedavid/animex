import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const Logo = ({
  children,
  className = "text-white",
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div className="relative flex h-20 w-[7.5rem] shrink-0 items-center justify-center overflow-hidden px-3 sm:w-40 sm:px-6 lg:w-48">
      <div className="absolute inset-0 z-[1] h-full w-full bg-black/80"></div>
      <Image
        src={"/download2.jpeg"}
        alt=""
        fill
        className="object-cover"
        priority
      />{" "}
      <Link
        href="/"
        className={`font-display relative z-[2] text-lg font-semibold tracking-[0.12em] transition sm:text-2xl sm:tracking-[0.18em] ${className}`}
      >
        Animex
      </Link>
      {children}
    </div>
  );
};

export default Logo;
