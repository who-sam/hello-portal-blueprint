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

  const demoAccounts = {
    student: { email: "student@kernel.edu", password: "demo1234", firstName: "John", middleName: "", lastName: "Doe", studentId: "STU-2026-0042", role: "student" as const },
    teacher: { email: "teacher@kernel.edu", password: "demo1234", firstName: "Sarah", middleName: "", lastName: "Miller", studentId: "", role: "teacher" as const },
  };

  const onLogin = async (data: LoginData) => {
    await new Promise((r) => setTimeout(r, 500));
    const demo = Object.values(demoAccounts).find((a) => a.email === data.email);
    const role = demo?.role ?? "student";
    setRole(role);
    setUser({
      firstName: demo?.firstName ?? "John",
      middleName: demo?.middleName ?? "",
      lastName: demo?.lastName ?? "Doe",
      email: data.email,
      studentId: demo?.studentId ?? "STU-2026-0001",
    });
    navigate("/dashboard");
  };

  const fillDemo = (type: "student" | "teacher") => {
    const account = demoAccounts[type];
    loginForm.setValue("email", account.email);
    loginForm.setValue("password", account.password);
  };

  const handleForgotPassword = () => {
    if (!forgotEmail) return;
    toast({ title: "Reset link sent", description: `Check ${forgotEmail} for a password reset link.` });
    setMode("login");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4 sm:p-6 overflow-hidden">
      <img src={authBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
          {/* Left: Form */}
          <div className="bg-card/95 backdrop-blur-xl p-8 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-8">
              <KernelLogo className="h-7 w-7" />
              <span className="text-xl font-bold tracking-tight text-foreground">Kernel</span>
            </div>

            {/* Login Form */}
            {mode === "login" && (
              <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
                  <p className="text-sm text-muted-foreground mt-1">Log in to your account</p>
                </div>
                <div className="space-y-3">
                  <div>
                    <Input type="email" placeholder="Email Address" className="h-11" {...loginForm.register("email")} />
                    {loginForm.formState.errors.email && <p className="mt-1 text-xs text-destructive">{loginForm.formState.errors.email.message}</p>}
                  </div>
                  <div className="relative">
                    <Input type={showPassword ? "text" : "password"} placeholder="Password" className="h-11 pr-10" {...loginForm.register("password")} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    {loginForm.formState.errors.password && <p className="mt-1 text-xs text-destructive">{loginForm.formState.errors.password.message}</p>}
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <button type="button" onClick={() => setMode("forgot")} className="text-sm text-primary hover:underline">Forgot Password?</button>
                </div>
                <Button type="submit" className="h-11 w-full text-base font-semibold" disabled={loginForm.formState.isSubmitting}>
                  {loginForm.formState.isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Log In
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  First time here?{" "}
                  <button type="button" onClick={() => navigate("/setup")} className="font-medium text-primary hover:underline">Set up your account</button>
                </p>
              </form>
            )}

            {/* Forgot Password */}
            {mode === "forgot" && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setMode("login")} className="text-muted-foreground hover:text-foreground"><ArrowLeft className="h-5 w-5" /></button>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">Reset Password</h1>
                    <p className="text-sm text-muted-foreground">Enter your email to receive a reset link</p>
                  </div>
                </div>
                <Input type="email" placeholder="Email Address" className="h-11" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} />
                <Button onClick={handleForgotPassword} className="h-11 w-full text-base font-semibold">Send Reset Link</Button>
                <p className="text-center text-sm text-muted-foreground">
                  Remember your password?{" "}
                  <button onClick={() => setMode("login")} className="font-medium text-primary hover:underline">Log in</button>
                </p>
              </div>
            )}
          </div>

          {/* Right: Hero Image */}
          <div className="hidden md:block">
            <img src={authHero} alt="Kernel platform" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
