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
    <div className="flex items-center relative px-12 justify-between min-h-20 gap-4 max-w-[250px] max-h-[250px]">
      <div className="bg-black/80 absolute h-full w-full  z-2 inset-0 "></div>
      <Image
        src={"/download2.jpeg"}
        alt={"Profile"}
        fill
        className="object-cover"
      />{" "}
      <Link
        href="/"
        className={`font-display z-3 text-2xl font-semibold tracking-[0.18em] transition ${className}`}
      >
        Animex
      </Link>
      {children}
    </div>
  );
};

export default Logo;
