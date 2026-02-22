import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import authHero from "@/assets/auth-hero.jpg";
import authBg from "@/assets/auth-bg.jpg";

const AuthPage = () => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="relative flex min-h-screen items-center justify-center p-6 overflow-hidden">
      {/* Full-page background wallpaper with dark tint */}
      <img src={authBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/60" />
      {/* Outer white/light frame */}
      <div className="relative z-10 w-full max-w-6xl rounded-3xl border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-md">
        <div className="flex w-full overflow-hidden rounded-2xl bg-card/90 backdrop-blur-sm">
        {/* Left Panel - Form */}
        <div className="flex w-full flex-col justify-between bg-card p-10 md:w-[45%]">
          <div>
            <h2 className="mb-1 text-lg font-bold tracking-tight text-foreground">
              BTR<span className="text-muted-foreground">.fi</span>
            </h2>
          </div>

          <div className="my-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Sign up</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Create your BTR account and grow your share of the Bitcoin Treasury Reserve.
              </p>
            </div>

            <div className="space-y-4">
              <Input type="email" placeholder="Enter Email" className="h-12" />
              <Input type="password" placeholder="Create Password" className="h-12" />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(v) => setAgreed(v === true)}
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                I Agree To The Terms & Privacy Policy
              </label>
            </div>

            <Button className="h-12 w-full text-base font-semibold" disabled={!agreed}>
              Create Account
            </Button>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">or sign up via</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Button variant="social" className="h-11 gap-2">
                <GoogleIcon />
                Google
              </Button>
              <Button variant="social" className="h-11 gap-2">
                <AppleIcon />
                Apple
              </Button>
              <Button variant="social" className="h-11 gap-2">
                <TwitterIcon />
                Twitter
              </Button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already Have An Account?{" "}
            <a href="#" className="font-medium text-accent hover:underline">
              Login
            </a>
          </p>
        </div>

        {/* Right Panel - Hero Image */}
        <div className="relative hidden md:block md:w-[55%]">
          <img
            src={authHero}
            alt="Retro computer on hillside at sunset"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      </div>
    </div>
  );
};

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A11.96 11.96 0 0 0 0 12c0 1.94.46 3.77 1.28 5.4l3.56-2.77.01-.54z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.09 14.97 0 12 0 7.7 0 3.99 2.47 2.18 6.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export default AuthPage;
