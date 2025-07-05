"use client";
import { useState, useTransition, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  RefreshCw,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Home,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { login } from "@/actions/login";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  
});

export default function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const [captchaCode, setCaptchaCode] = useState("");
  const [isRefreshingCaptcha, setIsRefreshingCaptcha] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Another account already exists with the same email address"
      : "";

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const generateCaptcha = () => {
    setIsRefreshingCaptcha(true);
    const characters =
      "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setCaptchaCode(result);
    setIsRefreshingCaptcha(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          } else if (data?.success) {
            setSuccess(data.success);
            // Redirect after successful login
            if (data.redirectUrl) {
              setTimeout(() => {
                router.push(data.redirectUrl);
              }, 1000);
            }
          }
        })
        .catch(() => {
          setError("Something went wrong. Please try again.");
        })
        .finally(() => setIsLoading(false));
    });
  };

  return (
    <Card className="w-full max-w-md shadow-sm border border-gray-200 rounded-lg">
      <CardHeader className="space-y-1 px-4 pt-8 pb-2">
        
      </CardHeader>

      <CardContent className="px-8 py-4">
        

        <div className="flex justify-center items-center p-3 group">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
            title="Return to homepage"
          >
            <button
              type="button"
              className="p-2 rounded-md hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              aria-label="Home"
            >
              <Home className="h-5 w-5 transition-transform group-hover:scale-110" />
            </button>
          </Link>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 mt-6"
          >
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-700">{error}</p>
                  {urlError && (
                    <p className="text-sm text-red-600 mt-1">{urlError}</p>
                  )}
                </div>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm font-medium text-green-700">{success}</p>
              </div>
            )}

            
         
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="name@company.com"
                          type="email"
                          className="py-4"
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Password
                        </FormLabel>
                        <Link
                          href="/auth/reset"
                          className="text-xs font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="••••••••"
                            type={showPassword ? "text" : "password"}
                            className="py-4 pr-10"
                            disabled={isPending}
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500"
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                
               
            <Button
              type="submit"
              className={cn(
                "w-full py-4 text-sm font-medium rounded-md transition-colors",
                "bg-indigo-600 hover:bg-indigo-700 text-white",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
                (isPending || isLoading) && "opacity-70 cursor-not-allowed"
              )}
              disabled={isPending || isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>

        
      </CardContent>

      <CardFooter className="px-8 py-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 text-center">
          By continuing, you agree to our{" "}
          <Link
            href="/terms"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </CardFooter>
      {/* Verification Dialog */}
      <Dialog
        open={showVerificationDialog}
        onOpenChange={setShowVerificationDialog}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              Email Verification Required
            </DialogTitle>
            <DialogDescription className="text-center">
              We&apos;ve sent a verification link to your email address.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center space-y-4 py-4">
            <div className="rounded-full bg-blue-50 p-3">
              <CheckCircle2 className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-center text-sm text-gray-700">
              {verificationMessage}
            </p>
            <p className="text-center text-xs text-gray-500">
              Please check your inbox and click on the verification link to
              activate your account. If you don&apos;t see the email, check your
              spam folder.
            </p>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-center">
            <Button
              type="button"
              variant="default"
              onClick={() => {
                setShowVerificationDialog(false);
                window.location.href = "/";
              }}
              className="w-full sm:w-auto"
            >
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
