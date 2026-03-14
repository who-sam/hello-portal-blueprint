import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import authBg from "@/assets/auth-bg.jpg";
import authHero from "@/assets/auth-hero.jpg";
import KernelLogo from "@/components/KernelLogo";
import { useRole } from "@/contexts/RoleContext";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type AuthMode = "login" | "forgot";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginData = z.infer<typeof loginSchema>;

const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const { setRole } = useRole();
  const { setUser } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();

  const loginForm = useForm<LoginData>({ resolver: zodResolver(loginSchema) });

  const onLogin = async (data: LoginData) => {
    await new Promise((r) => setTimeout(r, 500));
    setRole("student");
    setUser("John Doe", data.email);
    navigate("/dashboard");
  };

  const handleForgotPassword = () => {
    if (!forgotEmail) return;
    toast({ title: "Reset link sent", description: `Check ${forgotEmail} for a password reset link.` });
    setMode("login");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center p-6 sm:p-10 overflow-hidden">
      {/* Full-screen background */}
      <img src={authBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/30" />

      {/* Main card */}
      <div className="relative z-10 w-full max-w-[1100px]">
        <div
          className="grid grid-cols-1 md:grid-cols-[minmax(0,480px)_1fr] overflow-hidden rounded-3xl border border-white/[0.08] shadow-[0_8px_60px_-12px_rgba(0,0,0,0.5)]"
          style={{ minHeight: "580px" }}
        >
          {/* Left: Dark glossy form panel */}
          <div
            className="relative flex flex-col justify-center px-10 py-12"
            style={{
              background: "linear-gradient(160deg, rgba(15,12,10,0.92) 0%, rgba(20,16,12,0.88) 100%)",
              backdropFilter: "blur(40px) saturate(1.4)",
              WebkitBackdropFilter: "blur(40px) saturate(1.4)",
            }}
          >
            {/* Glossy highlight */}
            <div
              className="pointer-events-none absolute inset-0 rounded-l-3xl"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 40%)",
              }}
            />

            <div className="relative z-10">
              {/* Logo */}
              <div className="flex items-center gap-2.5 mb-10">
                <KernelLogo className="h-8 w-8" />
                <span className="text-xl font-bold tracking-tight text-white">Kernel</span>
              </div>

              {/* Login Form */}
              {mode === "login" && (
                <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-5">
                  <div>
                    <h1 className="text-[1.75rem] font-bold text-white leading-tight">Welcome Back</h1>
                    <p className="text-sm text-white/50 mt-1.5">Log in to your Kernel account</p>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <Input
                        type="email"
                        placeholder="Enter Email"
                        className="h-12 border-white/[0.08] bg-white/[0.06] text-white placeholder:text-white/30 focus-visible:ring-primary/50 focus-visible:border-primary/40"
                        {...loginForm.register("email")}
                      />
                      {loginForm.formState.errors.email && (
                        <p className="mt-1 text-xs text-destructive">{loginForm.formState.errors.email.message}</p>
                      )}
                    </div>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="h-12 pr-10 border-white/[0.08] bg-white/[0.06] text-white placeholder:text-white/30 focus-visible:ring-primary/50 focus-visible:border-primary/40"
                        {...loginForm.register("password")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-white/30 hover:text-white/60 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                      {loginForm.formState.errors.password && (
                        <p className="mt-1 text-xs text-destructive">{loginForm.formState.errors.password.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => setMode("forgot")}
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <Button
                    type="submit"
                    className="h-12 w-full text-base font-semibold rounded-xl"
                    disabled={loginForm.formState.isSubmitting}
                  >
                    {loginForm.formState.isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Log In
                  </Button>
                  <p className="text-center text-sm text-white/40">
                    First time here?{" "}
                    <button
                      type="button"
                      onClick={() => navigate("/setup")}
                      className="font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Set up your account
                    </button>
                  </p>
                </form>
              )}

              {/* Forgot Password */}
              {mode === "forgot" && (
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setMode("login")}
                      className="text-white/40 hover:text-white transition-colors"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                      <h1 className="text-[1.75rem] font-bold text-white leading-tight">Reset Password</h1>
                      <p className="text-sm text-white/50">Enter your email to receive a reset link</p>
                    </div>
                  </div>
                  <Input
                    type="email"
                    placeholder="Enter Email"
                    className="h-12 border-white/[0.08] bg-white/[0.06] text-white placeholder:text-white/30 focus-visible:ring-primary/50 focus-visible:border-primary/40"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                  />
                  <Button onClick={handleForgotPassword} className="h-12 w-full text-base font-semibold rounded-xl">
                    Send Reset Link
                  </Button>
                  <p className="text-center text-sm text-white/40">
                    Remember your password?{" "}
                    <button onClick={() => setMode("login")} className="font-medium text-primary hover:text-primary/80 transition-colors">
                      Log in
                    </button>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Transparent panel - background shows through */}
          <div
            className="hidden md:block relative"
            style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(1px)",
              WebkitBackdropFilter: "blur(1px)",
            }}
          >
            {/* Subtle glossy highlight */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
