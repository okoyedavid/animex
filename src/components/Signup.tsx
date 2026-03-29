import { useEffect, useState } from "react";
import InputField from "../input";
import validation_Regex from "../utils/Validation";
import Logo from "../common/Logo";
import SignInfo from "../common/SignInfo";
import AuthContainer from "./AuthContainer";
import Button from "../common/Button";
import { PlaceholderImage } from "./PlaceholderImage";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

const { USER, PWD, EMAIL } = validation_Regex;

const SignUp = ({
  handleSubmit,
  userInfo,
  handleChange,
  backgroundImage,
  errorMessage,
  success,
}) => {
  useEffect(() => {
    setValidName(USER.test(userInfo.name));
    setValidPwd(PWD.test(userInfo.password));
    setValidEmail(EMAIL.test(userInfo.email));
  }, [userInfo]);

  const [validName, setValidName] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  return (
    <main className="min-h-screen bg-surface px-4 pb-8 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Logo />
        <AuthContainer
          signInfo={
            <SignInfo link="/signin" member="Already a member?" label="Login">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-soft">
                  Start for free
                </p>
                <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl">
                  Create an account that feels like a premium anime hub.
                </h1>
                <p className="max-w-xl text-base leading-8 text-slate-200">
                  Save your momentum, tighten the search loop, and move through
                  a cleaner interface built around discovery rather than
                  clutter.
                </p>
              </div>
            </SignInfo>
          }
          visual={
            <article className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/20">
              <div className="relative">
                <PlaceholderImage
                  src={backgroundImage?.replace(/^url\(['"]?/, "").replace(/['"]?\)$/, "")}
                  alt="Anime sign up preview"
                  className="aspect-[1.2] w-full"
                  sizes="(max-width: 1024px) 100vw, 520px"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,17,31,0.05),rgba(8,17,31,0.82))]" />
                <div className="absolute inset-x-0 bottom-0 space-y-4 p-5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-3 py-2 text-xs text-white">
                    <ShieldCheck size={14} className="text-accent-soft" />
                    Personal watchlist starts here
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <h2 className="max-w-sm font-display text-3xl leading-tight text-white">
                      Build an account that can grow beyond guest storage.
                    </h2>
                    <ArrowUpRight className="shrink-0 text-white" size={20} />
                  </div>
                </div>
              </div>
            </article>
          }
          handleSubmit={handleSubmit}
        >
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent-soft">
              New account
            </p>
            <h2 className="font-display text-3xl leading-tight text-white">
              Create your Animex profile
            </h2>
            <p className="text-sm leading-7 text-slate-300">
              Set up your account to keep watchlists, continue browsing, and
              stay inside a cleaner anime workflow.
            </p>
          </div>
          <InputField
            name="name"
            type="text"
            value={userInfo.name}
            onChange={handleChange}
            valid={validName}
            placeholder="Name"
            errorMsg="your name must be atleast 4 characters "
          />
          <InputField
            name="email"
            type="email"
            value={userInfo.email}
            onChange={handleChange}
            valid={validEmail}
            placeholder="Email"
            errorMsg="Email is not correct"
          />
          <InputField
            name="password"
            type="password"
            value={userInfo.password}
            onChange={handleChange}
            valid={validPwd}
            placeholder="Password"
            errorMsg={`Password must be atleast 6 characters long must include a capital letter, symbol and one number `}
          />
          <Button
            disabled={!validName || !validPwd || !validEmail}
            label="Create Account"
          />
          {errorMessage ? (
            <p className="rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-rose-100">
              {errorMessage}
            </p>
          ) : null}
          {success ? (
            <p className="rounded-2xl border border-emerald-300/30 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100">
              Account created successfully.
            </p>
          ) : null}
        </AuthContainer>
      </div>
    </main>
  );
};

export default SignUp;
