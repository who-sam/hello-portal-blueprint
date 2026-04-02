import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Eye, EyeOff, Loader2, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import authBg from "@/assets/auth-bg.jpg";
import authHero from "@/assets/auth-hero.jpg";
import ApexLogo from "@/components/ApexLogo";
import { useRole, UserRole } from "@/contexts/RoleContext";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type AuthMode = "login" | "signup" | "forgot";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  role: z.enum(["student", "teacher"]),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginData = z.infer<typeof loginSchema>;
type SignupData = z.infer<typeof signupSchema>;

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const { setRole } = useRole();
  const { setUser } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const loginForm = useForm<LoginData>({ resolver: zodResolver(loginSchema) });
  const signupForm = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { role: "student", middleName: "" },
  });

  const onLogin = async (data: LoginData) => {
    await new Promise((r) => setTimeout(r, 500));
    // Mock: detect role from email
    const isTeacher = data.email.includes("teacher");
    const role: UserRole = isTeacher ? "teacher" : "student";
    setRole(role);
    setUser({
      firstName: isTeacher ? "Sarah" : "John",
      middleName: "",
      lastName: isTeacher ? "Miller" : "Doe",
      email: data.email,
      studentId: isTeacher ? "" : "APX--0042",
    });
    navigate("/dashboard");
  };

  const onSignup = async (data: SignupData) => {
    await new Promise((r) => setTimeout(r, 600));
    setRole(data.role);
    setUser({
      firstName: data.firstName,
      middleName: data.middleName || "",
      lastName: data.lastName,
      email: data.email,
      studentId: data.role === "student" ? `APX--${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}` : "",
    });
    toast({ title: "Account created!", description: "Welcome to APEX." });
    navigate("/dashboard");
  };

  const handleSocialLogin = (provider: string) => {
    setRole("student");
    setUser({
      firstName: provider === "google" ? "Google" : "GitHub",
      middleName: "",
      lastName: "User",
      email: `user@${provider}.com`,
      studentId: `APX--${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}`,
    });
    toast({ title: `Signed in with ${provider}` });
    navigate("/dashboard");
  };

  const handleForgotPassword = () => {
    if (!forgotEmail) return;
    toast({ title: "Reset link sent", description: `Check ${forgotEmail} for a password reset link.` });
    setMode("login");
  };

  const selectedRole = signupForm.watch("role");

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4 sm:p-6 overflow-hidden">
      <img src={authBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
          {/* Left: Form */}
          <div className="bg-card/95 backdrop-blur-xl p-8 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-8">
              <ApexLogo className="h-7 w-7" />
              <span className="text-xl font-bold tracking-tight text-foreground">APEX</span>
            </div>

            {/* Login Form */}
            {mode === "login" && (
              <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
                  <p className="text-sm text-muted-foreground mt-1">Log in to your account</p>
                </div>

                {/* Social buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button type="button" variant="outline" className="h-11 gap-2" onClick={() => handleSocialLogin("google")}>
                    <GoogleIcon /> Google
                  </Button>
                  <Button type="button" variant="outline" className="h-11 gap-2" onClick={() => handleSocialLogin("github")}>
                    <GitHubIcon /> GitHub
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">or continue with email</span></div>
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
                  Don't have an account?{" "}
                  <button type="button" onClick={() => setMode("signup")} className="font-medium text-primary hover:underline">Sign up</button>
                </p>
              </form>
            )}

            {/* Signup Form */}
            {mode === "signup" && (
              <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
                  <p className="text-sm text-muted-foreground mt-1">Get started with APEX</p>
                </div>

                {/* Social buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button type="button" variant="outline" className="h-11 gap-2" onClick={() => handleSocialLogin("google")}>
                    <GoogleIcon /> Google
                  </Button>
                  <Button type="button" variant="outline" className="h-11 gap-2" onClick={() => handleSocialLogin("github")}>
                    <GitHubIcon /> GitHub
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">or continue with email</span></div>
                </div>

                {/* Role selector */}
                <div className="flex rounded-lg border border-border overflow-hidden">
                  <button
                    type="button"
                    onClick={() => signupForm.setValue("role", "student")}
                    className={`flex-1 py-2.5 text-sm font-medium transition-colors ${selectedRole === "student" ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:text-foreground"}`}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => signupForm.setValue("role", "teacher")}
                    className={`flex-1 py-2.5 text-sm font-medium transition-colors ${selectedRole === "teacher" ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:text-foreground"}`}
                  >
                    Teacher
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Input placeholder="First Name" className="h-11" {...signupForm.register("firstName")} />
                    {signupForm.formState.errors.firstName && <p className="mt-1 text-xs text-destructive">{signupForm.formState.errors.firstName.message}</p>}
                  </div>
                  <div>
                    <Input placeholder="Middle" className="h-11" {...signupForm.register("middleName")} />
                  </div>
                  <div>
                    <Input placeholder="Last Name" className="h-11" {...signupForm.register("lastName")} />
                    {signupForm.formState.errors.lastName && <p className="mt-1 text-xs text-destructive">{signupForm.formState.errors.lastName.message}</p>}
                  </div>
                </div>

                <div>
                  <Input type="email" placeholder="Email Address" className="h-11" {...signupForm.register("email")} />
                  {signupForm.formState.errors.email && <p className="mt-1 text-xs text-destructive">{signupForm.formState.errors.email.message}</p>}
                </div>

                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} placeholder="Password" className="h-11 pr-10" {...signupForm.register("password")} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  {signupForm.formState.errors.password && <p className="mt-1 text-xs text-destructive">{signupForm.formState.errors.password.message}</p>}
                </div>

                <div>
                  <Input type="password" placeholder="Confirm Password" className="h-11" {...signupForm.register("confirmPassword")} />
                  {signupForm.formState.errors.confirmPassword && <p className="mt-1 text-xs text-destructive">{signupForm.formState.errors.confirmPassword.message}</p>}
                </div>

                <Button type="submit" className="h-11 w-full text-base font-semibold" disabled={signupForm.formState.isSubmitting}>
                  {signupForm.formState.isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Create Account
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <button type="button" onClick={() => setMode("login")} className="font-medium text-primary hover:underline">Log in</button>
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
