import { ArrowUpRight, Eye, EyeOff, Loader } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import validation_Regex from "../utils/Validation";
import { PlaceholderImage } from "./PlaceholderImage";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SocialButton } from "./SocialButton";
import { GithubIcon, GoogleIcon } from "./icons";
import { loginUser, loginWithGithub, loginWithGoogle } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const { EMAIL, PWD } = validation_Regex;

const SignIn = ({ backgroundImage, handleChange, userInfo }) => {
  useEffect(() => {
    setValidEmail(EMAIL.test(userInfo.email));
    setValidPwd(PWD.test(userInfo.password));
  }, [userInfo]);

  const [validEmail, setValidEmail] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: () => loginUser(userInfo),
    onError: (error) => {
      toast.error(
        error.message ||
          "Login failed. Please check your credentials and try again.",
      );
    },
    onSuccess: (data) => {
      toast.success("Logged in successfully!");
      toast.success("Welcome back, " + data.data.name + "!");
      router.push("/watchlist");
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValidSignIn =
      EMAIL.test(userInfo.email) && PWD.test(userInfo.password);

    if (!isValidSignIn) {
      toast.error("Name or password is not in the expected format.");

      return;
    }

    mutate();
  };

  const imageSrc = backgroundImage

    ?.replace(/^url\(['"]?/, "")
    .replace(/['"]?\)$/, "");

  return (
    <main className="h-screen">
      <div className="h-full grid gap-6 lg:grid-cols-2">
        <section className="relative h-full overflow-hidden rounded-md border border-white/10 shadow-cinema">
          <PlaceholderImage
            src={imageSrc}
            alt="Anime preview"
            className="h-full w-full"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,18,0.12),rgba(5,10,18,0.78)_58%,rgba(5,10,18,0.94))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,195,113,0.16),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(67,97,238,0.16),transparent_26%)]" />

          <div className="absolute inset-0 flex flex-col h-full justify-between p-6 sm:p-8">
            <Link
              href="/"
              className={`font-display z-3 text-2xl md:text-3xl text-popover font-semibold tracking-[0.18em] transition `}
            >
              Animex
            </Link>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white">
                Return to your queue
              </p>
              <h1 className="mt-4 max-w-lg font-display text-popover text-4xl leading-tight sm:text-5xl">
                Step back into your saved anime without losing your place.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200 sm:text-base">
                Sign in to reopen your watchlist, pick up titles you parked for
                later, and move straight back into search.
              </p>
            </div>
          </div>
        </section>

        <section className="flex items-center p-4">
          <form onSubmit={handleSubmit} className="w-full p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-5">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary">
                  Welcome back
                </p>
                <h2 className="font-display text-3xl leading-tight">
                  Sign in to Animex
                </h2>
                <p className="text-sm leading-7 text-foreground">
                  Use your account details to access saved anime and continue
                  where you left off.
                </p>
              </div>

              <Input
                name="email"
                type="email"
                value={userInfo.email}
                onChange={handleChange}
                showError={!validEmail && userInfo.email.length > 0}
                autoComplete="email"
                placeholder="Email address"
                errorMsg="your email must be atleast 4 characters "
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
                  className="absolute inset-y-0 right-4 inline-flex items-center  transition hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <SocialButton
                  label="Sign in with Google"
                  icon={<GoogleIcon />}
                  onClick={loginWithGoogle}
                />
                <SocialButton
                  label="Sign in with GitHub"
                  icon={<GithubIcon />}
                  onClick={loginWithGithub}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="min-h-14"
                disabled={!validEmail || !validPwd || isPending}
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-1">
                    <Loader className="animate-spin text-white" /> please
                    wait{" "}
                  </span>
                ) : (
                  "Sign in"
                )}
              </Button>

              <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-foreground">
                <p>Need an account?</p>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 font-semibold text-primary transition hover"
                >
                  Create one
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

export default SignIn;
