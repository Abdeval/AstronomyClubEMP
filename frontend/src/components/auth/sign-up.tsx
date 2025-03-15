import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
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
import { auth } from "@/lib/api";
import SignInButton from "../buttons/sign-in-button";

const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

const signupSchema = z.object({
  phoneNumber: z.string().regex(phoneRegex, "Invalid phone number"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export default function SignUpPage() {
  const [step, setStep] = useState<"signup" | "otp">("signup");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSignupSubmit = async (values: z.infer<typeof signupSchema>) => {
    // const result = await auth.post("/verifyCode", {
    //   phoneNumber: values.phoneNumber,
    // });
    // console.log(result);
    setName(values.name);
    setPassword(values.password);
    setPhoneNumber(values.phoneNumber);
    setIsLoading(true);
    setPhoneNumber(values.phoneNumber);
    setStep("otp");
    // toast({
    //   title: "OTP Sent",
    //   description: "Please check your phone for the OTP.",
    // });
    setIsLoading(false);
  };

  const onOtpSubmit = async (values: z.infer<typeof otpSchema>) => {
    // Here you would typically send a request to your backend to verify the OTP
    console.log("OTP submitted", values);

    const result = await auth.post('/register', { name, phoneNumber, password, accessCode: values.otp, address: "", code: '' });
    console.log(result);
    // toast({
    //   title: `signup Successful ${result.data}`,
    //   description: "You have been logged in successfully.",
    // });
    navigate("/auth/login");
  };

  return (
    <Card className="lg:w-2/5 md:w-1/2 h-full border-none rounded-[0] bg-background/20">
      <CardHeader className="gap-4">
        <div className="flex items-center gap-4 p-2">
          <img src="/vite.svg" className="w-12 h-12" />
          <CardTitle className="text-2xl font-semibold">
            Sign up{" "}
            <span className="uppercase font-bold text-secondary pl-2">
              {" "}
              butcher
            </span>
          </CardTitle>
        </div>
        <CardDescription className="bg-secondary/10 text-secondary font-regular p-4 items-center flex justify-center rounded-[16px]">
          {step === "signup"
            ? "Enter your phone number and password"
            : "Enter the code sent to your phone"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === "signup" ? (
          <Form {...signupForm}>
            <form
              onSubmit={signupForm.handleSubmit(onSignupSubmit)}
              className="space-y-3"
            >
              <FormField
                control={signupForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Abdou" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
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
                    <FormLabel className="font-medium text-md w-full pl-3 text-white/80">
                      Confirm Code
                    </FormLabel>
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
                                  className="rounded-md border border-input bg-background text-primary"
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
              <Button
                type="submit"
                className="w-full font-medium text-white bg-secondary hover:bg-secondary/60"
              >
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
              onClick={() => setStep("signup")}
            >
              Back to signup
            </Button>
          ) : (
            <span>
              Already have an account ?{" "}
              <span
                className="text-primary font-semibold underline cursor-pointer"
                onClick={() => navigate("/auth/login")}
              >
                login
              </span>
            </span>
          )}
        </p>
      </CardFooter>
    </Card>
  );
}