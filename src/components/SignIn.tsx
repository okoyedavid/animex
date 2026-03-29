import { useEffect, useState } from "react";
import InputField from "../input";
import validation_Regex from "../utils/Validation";
import Logo from "../common/Logo";
import SignInfo from "../common/SignInfo";
import Button from "../common/Button";
import AuthContainer from "./AuthContainer";
import { PlaceholderImage } from "./PlaceholderImage";
import { Bookmark, Clock3, Sparkles } from "lucide-react";

const { USER, PWD } = validation_Regex;

const SignIn = ({
  backgroundImage,
  handleChange,
  userInfo,
  handleSubmit,
  errorMessage,
}) => {
  useEffect(() => {
    setValidName(USER.test(userInfo.name));
    setValidPwd(PWD.test(userInfo.password));
  }, [userInfo]);

  const [validName, setValidName] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  return (
    <main className="min-h-screen bg-surface px-4 pb-8 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Logo />
        <AuthContainer
          signInfo={
            <SignInfo
              link="/signup"
              member="Want to become a member?"
              label="Sign up"
            >
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-soft">
                  Member access
                </p>
                <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl">
                  Return to your next watch faster than the scroll.
                </h1>
                <p className="max-w-xl text-base leading-8 text-slate-200">
                  Sign in to reopen saved picks, keep your search rhythm tight,
                  and move straight into the titles that already caught your eye.
                </p>
              </div>
            </SignInfo>
          }
          visual={
            <div className="space-y-5">
              <article className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/20">
                <div className="relative">
                  <PlaceholderImage
                    src={backgroundImage?.replace(/^url\(['"]?/, "").replace(/['"]?\)$/, "")}
                    alt="Anime preview"
                    className="aspect-[1.25] w-full"
                    sizes="(max-width: 1024px) 100vw, 520px"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,17,31,0.05),rgba(8,17,31,0.78))]" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent-soft">
                      Night queue
                    </p>
                    <h2 className="mt-2 font-display text-3xl leading-tight text-white">
                      One login away from the titles you meant to finish.
                    </h2>
                  </div>
                </div>
              </article>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                  <Bookmark size={18} className="text-accent-soft" />
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Watchlist ready
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    Pick up saved anime without rebuilding your queue.
                  </p>
                </div>
                <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                  <Clock3 size={18} className="text-accent-soft" />
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Faster return
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    Jump straight back into discovery with less friction.
                  </p>
                </div>
                <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                  <Sparkles size={18} className="text-accent-soft" />
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Cleaner flow
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    Search, save, and revisit in one sharper product loop.
                  </p>
                </div>
              </div>
            </div>
          }
          handleSubmit={handleSubmit}
        >
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent-soft">
              Welcome back
            </p>
            <h2 className="font-display text-3xl leading-tight text-white">
              Sign in to Animex
            </h2>
            <p className="text-sm leading-7 text-slate-300">
              Use your account details to access saved anime and continue where
              you left off.
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
            name="password"
            type="password"
            value={userInfo.password}
            onChange={handleChange}
            valid={validPwd}
            placeholder="Password"
            errorMsg={`Password must be atleast 6 characters long must include a capital letter, symbol and one number `}
          />

          <Button disabled={!validName || !validPwd} label="Sign In" />
          {errorMessage ? (
            <p className="rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-rose-100">
              {errorMessage}
            </p>
          ) : null}
        </AuthContainer>
      </div>
    </main>
  );
};

export default SignIn;
