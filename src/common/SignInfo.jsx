import Link from "next/link";

const SignInfo = ({ children, link, member, label }) => {
  return (
    <div className="flex flex-col gap-5 text-center lg:text-left">
      {children}
      <p className="text-sm text-slate-300">
        {member}
        <span className="ml-2">
          <Link
            href={link}
            className="font-semibold text-accent-soft transition hover:text-white"
          >
            {label}
          </Link>
        </span>
      </p>
    </div>
  );
};

export default SignInfo;
