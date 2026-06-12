import { useMutation } from "@tanstack/react-query";
import { ArrowUpRight, Eye, EyeOff, Loader, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import validation_Regex from "../utils/Validation";
import { GithubIcon, GoogleIcon } from "./icons";
import { PlaceholderImage } from "./PlaceholderImage";
import { SocialButton } from "./SocialButton";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { loginWithGithub, loginWithGoogle, registerUser } from "@/api/auth";

const { USER, PWD, EMAIL } = validation_Regex;

const SignUp = ({ userInfo, handleChange, backgroundImage }) => {
  useEffect(() => {
    setValidName(USER.test(userInfo.name));
    setValidPwd(PWD.test(userInfo.password));
    setValidEmail(EMAIL.test(userInfo.email));
  }, [userInfo]);

  const [validName, setValidName] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const imageSrc = backgroundImage
    ?.replace(/^url\(['"]?/, "")
    .replace(/['"]?\)$/, "");

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: () => registerUser(userInfo),
    onError: (error) => {
      toast.error(
        error.message ||
          "Sign up failed. Please check your information and try again.",
      );
    },
    onSuccess: (data) => {
      toast.success("Account created successfully!");
      toast.success("Please verify your Email!");
      router.push(`/verify-email?email=${encodeURIComponent(userInfo.email)}`);
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValidSignIn =
      EMAIL.test(userInfo.email) &&
      PWD.test(userInfo.password) &&
      USER.test(userInfo.name);

    if (!isValidSignIn) {
      toast.error("Name or password is not in the expected format.");

      return;
    }

    mutate();
  };

  return (
    <main className="h-screen">
      <div className="grid h-full gap-6 lg:grid-cols-2">
        <section className="hidden lg:relative h-full overflow-hidden rounded-md border border-white/10 shadow-cinema">
          <PlaceholderImage
            src={imageSrc}
            alt="Anime sign up preview"
            className="h-full w-full"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,18,0.12),rgba(5,10,18,0.78)_58%,rgba(5,10,18,0.94))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,195,113,0.16),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(67,97,238,0.16),transparent_26%)]" />

          <div className="absolute inset-0 flex flex-col h-full justify-between  p-6 sm:p-8">
            <Link
              href="/"
              className={`font-display z-3 text-2xl md:text-3xl text-popover font-semibold tracking-[0.18em] transition `}
            >
              Animex
            </Link>
            <div>
              <div className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-slate-950/60 px-3 py-2 text-xs text-white">
                <ShieldCheck size={14} className="text-accent-soft" />
                Save what you want to watch
              </div>
              <h1 className="mt-4 max-w-lg font-display text-4xl leading-tight text-white sm:text-5xl">
                Create your account and keep every anime pick in one place.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200 sm:text-base">
                Build a watchlist you can return to anytime and keep track of
                the titles that catch your attention.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-sm border border-white/10 bg-slate-950/55 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-100">
                  Personal watchlist
                </div>
                <div className="rounded-sm border border-white/10 bg-slate-950/55 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-100">
                  Save your favorites
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center">
          <form
            onSubmit={handleSubmit}
            className="w-full shadow-cinema backdrop-blur-xl p-6 sm:p-8"
          >
            <div className="flex flex-col gap-5">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent-soft">
                  New account
                </p>
                <h2 className="font-display text-3xl leading-tight">
                  Create your Animex profile
                </h2>
                <p className="text-sm leading-7 text-foreground">
                  Set up your account to save anime, keep watchlists, and come
                  back to your picks anytime.
                </p>
              </div>

              <Input
                name="name"
                type="text"
                value={userInfo.name}
                onChange={handleChange}
                placeholder="Name"
                errorMsg="your name must be atleast 4 characters "
              />
              <Input
                name="email"
                type="email"
                value={userInfo.email}
                onChange={handleChange}
                placeholder="Email"
                errorMsg="Email is not correct"
              />
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  isPassword
                  value={userInfo.password}
                  onChange={handleChange}
                  placeholder="Password"
                  autoComplete="current-password"
                  showError={!validPwd && userInfo.password.length > 0}
                  errorMsg={`Password must be atleast 6 characters long must include a capital letter, symbol and one number `}
                />

                <button
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute inset-y-0 right-4 inline-flex items-center  transition hover:text-primary"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <SocialButton
                  label="Sign up with Google"
                  icon={<GoogleIcon />}
                  onClick={loginWithGoogle}
                />
                <SocialButton
                  label="Sign up with GitHub"
                  icon={<GithubIcon />}
                  onClick={loginWithGithub}
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Or continue with email
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <Button
                size="lg"
                type="submit"
                className="min-h-14"
                disabled={!validName || !validPwd || !validEmail}
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-1">
                    <Loader className="animate-spin text-white" /> please
                    wait{" "}
                  </span>
                ) : (
                  "Create Account"
                )}
              </Button>

              <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-foreground">
                <p>Already have an account?</p>
                <Link
                  href="/signin"
                  className="inline-flex items-center gap-2 font-semibold text-primary transition   "
                >
                  Sign in
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default SignUp;
