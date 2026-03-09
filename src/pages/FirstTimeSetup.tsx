import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, IdCard, Loader2, Lock, Mail } from "lucide-react";
import authBg from "@/assets/auth-bg.jpg";
import KernelLogo from "@/components/KernelLogo";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useRole } from "@/contexts/RoleContext";
import { useUser } from "@/contexts/UserContext";

const verifySchema = z.object({
  nationalId: z.string().min(5, "National ID must be at least 5 characters").max(20),
});

const setupSchema = z.object({
  email: z.string().email("Invalid email address").max(255),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type VerifyData = z.infer<typeof verifySchema>;
type SetupData = z.infer<typeof setupSchema>;

export default function FirstTimeSetup() {
  const [step, setStep] = useState<"verify" | "setup" | "done">("verify");
  const [verifiedName, setVerifiedName] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setRole } = useRole();
  const { setUser } = useUser();

  const verifyForm = useForm<VerifyData>({ resolver: zodResolver(verifySchema) });
  const setupForm = useForm<SetupData>({ resolver: zodResolver(setupSchema) });

  const onVerify = async (data: VerifyData) => {
    await new Promise((r) => setTimeout(r, 800));
    // Mock: any national ID resolves to a student
    setVerifiedName("Ahmed Hassan");
    setStep("setup");
    toast({ title: "Identity verified", description: "Please set up your email and password." });
  };

  const onSetup = async (data: SetupData) => {
    await new Promise((r) => setTimeout(r, 600));
    setRole("student");
    setUser(verifiedName, data.email);
    setStep("done");
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4 overflow-hidden">
      <img src={authBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 w-full max-w-md">
        <div className="flex items-center gap-2 mb-6 justify-center">
          <KernelLogo className="h-8 w-8" />
          <span className="text-2xl font-bold tracking-tight text-white">Kernel</span>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {["verify", "setup", "done"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                step === s ? "bg-primary text-primary-foreground" :
                ["verify", "setup", "done"].indexOf(step) > i ? "bg-primary/30 text-primary" :
                "bg-white/10 text-white/40"
              }`}>
                {["verify", "setup", "done"].indexOf(step) > i ? <CheckCircle className="h-4 w-4" /> : i + 1}
              </div>
              {i < 2 && <div className={`w-12 h-0.5 ${["verify", "setup", "done"].indexOf(step) > i ? "bg-primary/50" : "bg-white/10"}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: National ID Verification */}
        {step === "verify" && (
          <Card className="border-white/10 bg-card/95 backdrop-blur-xl">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
                <IdCard className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Verify Your Identity</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Enter your National ID to get started. This was provided by your institution.</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={verifyForm.handleSubmit(onVerify)} className="space-y-4">
                <div>
                  <Input
                    placeholder="National ID"
                    className="h-11 text-center text-lg tracking-wider"
                    {...verifyForm.register("nationalId")}
                  />
                  {verifyForm.formState.errors.nationalId && (
                    <p className="mt-1 text-xs text-destructive text-center">{verifyForm.formState.errors.nationalId.message}</p>
                  )}
                </div>
                <Button type="submit" className="h-11 w-full gap-2" disabled={verifyForm.formState.isSubmitting}>
                  {verifyForm.formState.isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                  Verify
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Set Email & Password */}
        {step === "setup" && (
          <Card className="border-white/10 bg-card/95 backdrop-blur-xl">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Set Up Your Account</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Welcome, <span className="font-semibold text-foreground">{verifiedName}</span>! Set your email and password.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={setupForm.handleSubmit(onSetup)} className="space-y-4">
                <div>
                  <Input type="email" placeholder="Email Address" className="h-11" {...setupForm.register("email")} />
                  {setupForm.formState.errors.email && <p className="mt-1 text-xs text-destructive">{setupForm.formState.errors.email.message}</p>}
                </div>
                <div>
                  <Input type="password" placeholder="Password" className="h-11" {...setupForm.register("password")} />
                  {setupForm.formState.errors.password && <p className="mt-1 text-xs text-destructive">{setupForm.formState.errors.password.message}</p>}
                </div>
                <div>
                  <Input type="password" placeholder="Confirm Password" className="h-11" {...setupForm.register("confirmPassword")} />
                  {setupForm.formState.errors.confirmPassword && <p className="mt-1 text-xs text-destructive">{setupForm.formState.errors.confirmPassword.message}</p>}
                </div>
                <Button type="submit" className="h-11 w-full gap-2" disabled={setupForm.formState.isSubmitting}>
                  {setupForm.formState.isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                  Complete Setup
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Done */}
        {step === "done" && (
          <Card className="border-white/10 bg-card/95 backdrop-blur-xl">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/15">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">You're All Set!</h2>
              <p className="text-sm text-muted-foreground">Redirecting you to your dashboard...</p>
              <Loader2 className="h-5 w-5 animate-spin text-primary mx-auto mt-4" />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
