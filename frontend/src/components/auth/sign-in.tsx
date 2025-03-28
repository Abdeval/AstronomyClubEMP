import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/api";
import SignInButton from "../buttons/sign-in-button";
import { useUser } from "@/hooks";
import { toast } from "sonner";
// import { useToast } from "@/hooks/use-toast";

// const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const loginSchema = z.object({
  email: z.string().regex(emailRegex, "Invalid email"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export default function SignInPage() {
  const [step, setStep] = useState<"login" | "otp">("login");
  // const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const { toast } = useToast();
  const navigate = useNavigate();

  // ! the token of the current user
  const { setToken, user } = useUser({});

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      setIsLoading(true);
      // const result = await auth.post("/verifyCode", {
      //   phoneNumber: values.phoneNumber,
      // });
      // console.log(result);
      setEmail(values.email);
      setPassword(values.password);
      setStep("otp");
      // ! here should be a toast
      toast("OTP Sent", {
        description: "Please check your phone for the OTP.",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      toast("Error", {
        description: "Failed to send verification code. Please try again.",
        // variant: "destructive",
        action: {
          label: "Undo",
          onClick: () => console.log("undo"),
        },
      });
    }
  };

  const onOtpSubmit = async (values: z.infer<typeof otpSchema>) => {
    try {
      console.log(values);
      const result = await auth.post("/login", {
        email,
        password,
      });

      if (result.status === 200) {
        console.log("setting the token...", result.data.access_token);
        setToken(result.data.access_token);
        // ! Navigate to the next page
        if (result.data?.role === "USER" || user?.role === "ADMIN") {
          navigate("/members");
        } else {
          console.log("your are a guest");
          navigate("/guests");
        }
        toast("Login Successful", {
          description: "You have been logged in successfully.",
          // variant: "destructive",
          action: {
            label: "Undo",
            onClick: () => console.log("undo"),
          },
        });
      }
    } catch (err) {
      console.error(err);
      toast("Login Failed", {
        description: "Invalid OTP or server error. Please try again.",
        action: {
          label: "Undo",
          onClick: () => console.log("undo"),
        },
      });
    }
  };

  return (
    // <div className="py-8 flex items-center justify-center min-h-screen bg-gray-100 relative bg-[url('/images/meat-login-picture.jpg')] bg-cover">
    <Card className="backdrop-blur-sm lg:w-1/3 md:w-1/2 h-full rounded-[0px] border-none dark:bg-background/30 bg-background">
      <CardHeader className="gap-4">
        <div className="flex items-center gap-4 p-2">
          <img src="/images/child-tele.svg" alt="Logo" className="w-12 h-12" />
          <CardTitle className="text-2xl font-semibold">
            Login to{" "}
            <span className="uppercase font-bold text-primary pl-2">
              Albattani
            </span>
          </CardTitle>
        </div>
        <CardDescription className="bg-primary/20 text-primary font-regular p-4 items-center flex justify-center rounded-cu">
          {step === "login"
            ? "Enter your phone number and password"
            : "Enter the code sent to your phone"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === "login" ? (
          <Form {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(onLoginSubmit)}
              className="space-y-8"
            >
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="abdou@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SignInButton isLoading={isLoading} />
            </form>
          </Form>
        ) : (
          <Form {...otpForm}>
            <form
              onSubmit={otpForm.handleSubmit(onOtpSubmit)}
              className="space-y-8 w-full max-w-sm mx-auto"
            >
              <FormField
                control={otpForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormLabel className="font-medium text-md w-full pl-3">
                      Confirm Code
                    </FormLabel>
                    {/* <FormControl>
                      <Controller
                        name="otp"
                        control={otpForm.control}
                        render={({ field }) => (
                          <InputOTP
                            maxLength={6}
                            value={field.value}
                            onChange={field.onChange}
                            // className=""
                          >
                            <InputOTPGroup className="text-foreground">
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        )}
                      />
                    </FormControl> */}
                    <FormControl>
                      <Controller
                        name="otp"
                        control={otpForm.control}
                        render={({ field }) => (
                          <InputOTP
                            maxLength={6}
                            value={field.value}
                            onChange={field.onChange}
                            className="gap-2"
                          >
                            <InputOTPGroup>
                              {[0, 1, 2, 3, 4, 5].map((index) => (
                                <InputOTPSlot
                                  key={index}
                                  index={index}
                                  className="rounded-md mx-1 border border-input bg-background text-foreground"
                                />
                              ))}
                            </InputOTPGroup>
                          </InputOTP>
                        )}
                      />
                    </FormControl>
                    <FormMessage className="w-full pl-3" />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full font-medium ">
                Verify Code
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-primary/60 font-regular text-sm">
          {step === "otp" ? (
            <Button
              variant="link"
              className="text-primary/80 font-medium"
              onClick={() => setStep("login")}
            >
              Back to Login
            </Button>
          ) : (
            <span className="text-foreground">
              Don't have an account?{" "}
              <span
                className="text-muted-foreground font-semibold underline cursor-pointer"
                onClick={() => navigate("/auth/sign-up")}
              >
                Sign up
              </span>
            </span>
          )}
        </p>
      </CardFooter>
    </Card>
    // </div>
  );
}
