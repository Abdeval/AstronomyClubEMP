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
import { emailRegex, firstNameRegex, lastNameRegex, passwordRegex
 } from "@/lib/regex";
import { toast } from "sonner";


const signupSchema = z.object({
  firstName: z.string().regex(firstNameRegex, "first name must be at least 2 characters"),
  // phoneNumber: z.string().regex(phoneRegex, "Invalid phone number"),
  lastName: z.string().regex(lastNameRegex, "Last name must be at least 2 characters"),
  password: z.string().regex(passwordRegex, "Password must be at least 5 characters"),
  email: z.string().regex(emailRegex, "Not a valid email")
});

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export default function SignUpPage() {
  const [step, setStep] = useState<"signup" | "otp">("signup");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      lastName: "",
      firstName: ""
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
    setFirstName(values.firstName);
    setPassword(values.password);
    setLastName(values.lastName);
    setEmail(values.email);
    setIsLoading(true);
    setStep("otp");
    toast("OTP Sent", {
      description: "Please check your phone for the OTP.",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    })
    setIsLoading(false);
  };

  const onOtpSubmit = async (values: z.infer<typeof otpSchema>) => {
    // Here you would typically send a request to your backend to verify the OTP
    console.log("OTP submitted", values);

    const result = await auth.post('/signup', { firstName, lastName, email, password });
    console.log(result);
    toast(`signup Successful ${result.data}`, {
       description: "You have been logged in successfully.",
       action: {
        label: "Undo",
        onClick: () => console.log("undo")
       }
    })
    navigate("/auth/sign-in");
  };

  return (
    <Card className="lg:w-2/5 md:w-1/2 h-full border-none rounded-[0px] dark:bg-background/30 bg-background">
      <CardHeader className="gap-4">
        <div className="flex items-center gap-4 p-2">
          <img src="/images/child-tele.svg" className="w-12 h-12" />
          <CardTitle className="text-2xl font-semibold">
            Sign up{" "}
            <span className="uppercase font-bold text-primary pl-2">
              {" "}
              albattani
            </span>
          </CardTitle>
        </div>
        <CardDescription className="bg-primary/20 text-primary font-regular p-4 items-center flex justify-center rounded-[16px]">
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
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="REZIGA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Abdelatif" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="abdou@gmail.com" {...field} />
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
              <Button
                type="submit"
                className="w-full font-medium text-foreground bg-primary"
              >
                Verify Code
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-foreground font-regular text-sm">
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
                className="text-muted-foreground font-semibold underline cursor-pointer"
                onClick={() => navigate("/auth/sign-in")}
              >
                sign in
              </span>
            </span>
          )}
        </p>
      </CardFooter>
    </Card>
  );
}