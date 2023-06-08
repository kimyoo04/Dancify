import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";

import { useToast } from "@components/ui/use-toast";

import { cn } from "@lib/utils";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Icons } from "@components/ui/icons";
import classNames from "classnames";
import { ISignUpForm } from "@type/signUp";
import { signUp } from "@api/auth/signUp";
import { useRouter } from "next/router";

const profileFormSchema = z.object({
  userId: z
    .string({
      required_error: "Please type a User Id to sign in.",
    })
    .min(2, {
      message: "Nickname must be at least 2 characters.",
    })
    .max(30, {
      message: "Nickname must not be longer than 30 characters.",
    }),
  nickname: z
    .string({
      required_error: "Please type a nickname to display.",
    })
    .min(2, {
      message: "Nickname must be at least 2 characters.",
    })
    .max(30, {
      message: "Nickname must not be longer than 30 characters.",
    }),
  phone: z
    .string({
      required_error: "Please type a phone number.",
    })
    .min(10)
    .max(14),
  email: z
    .string({
      required_error: "Please type an email.",
    })
    .email("Not a valid email"),
  password: z
    .string({
      required_error: "Please type a password.",
    })
    .max(160)
    .min(4),
  passwordCheck: z
    .string({
      required_error: "Please type a password check.",
    })
    .max(160)
    .min(4),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export default function UserSignUpForm({
  className,
  ...props
}: UserAuthFormProps) {
  const router = useRouter();
  const [isDancer, setIsDancer] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();

  //! This can come from your database or API.
  const defaultValues: Partial<ProfileFormValues> = {
    userId: "",
    nickname: "",
    phone: "",
    email: "",
    password: "",
    passwordCheck: "",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    // 비밀번호와 체크 불일치 유무 확인
    if (data.password !== data.passwordCheck) {
      toast({
        title: "password error",
        description: "Your password and password check are not match",
      });
      return;
    }

    const signUpData: ISignUpForm = { ...data, isDancer };
    const response = await signUp(signUpData);

    if (response === true) {
      // 회원가입 성공 후 로그인 페이지로 이동
      router.replace("/signin");
      await new Promise((resolve) => setTimeout(resolve, 500));
      return;
    } else {
      // 에러 메시지 UI 전달
      const setErrors = (errors: Record<string, string>) => {
        Object.entries(errors).forEach(([key, value]) => {
          form.setError(
            key as "userId" | "email" | "nickname" | "phone" | "password",
            {
              message: value,
            }
          );
        });
      };
      const errorMessage: { [key: string]: string } = response.data;
      console.log(errorMessage);
      setErrors(errorMessage);
      return;
    }
  }

  const isDancableBg = classNames({
    "bg-main_color_green": !isDancer,
  });
  const isDancerBg = classNames({
    "bg-main_color_green": isDancer,
  });

  return (
    <>
      <div className="row-center h-12 w-full gap-4">
        <Button
          className={`h-full w-full hover:bg-main_color_green/70 ${isDancableBg}`}
          onClick={() => setIsDancer(false)}
        >
          Dancable
        </Button>
        <Button
          className={`h-full w-full hover:bg-main_color_green/70 ${isDancerBg}`}
          onClick={() => setIsDancer(true)}
        >
          Dancer
        </Button>
      </div>

      <Form {...form}>
        <div className={cn("grid gap-6", className)} {...props}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="UserId">
                      UserId
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="userId"
                        placeholder="User Id"
                        type="text"
                        autoCapitalize="none"
                        autoComplete="userId"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="Phone">
                      Phone
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="phone"
                        placeholder="Phone"
                        type="tel"
                        autoCapitalize="none"
                        autoComplete="phone"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="Email">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="Email"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="Nickname">
                      Nickname
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="nickname"
                        placeholder="Nickname"
                        type="text"
                        autoCapitalize="none"
                        autoComplete="nickname"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="Password">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        placeholder="Password"
                        type="password"
                        autoCapitalize="none"
                        autoComplete="password"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passwordCheck"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="PasswordCheck">
                      Password Check
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="passwordCheck"
                        placeholder="Password Check"
                        type="password"
                        autoCapitalize="none"
                        autoComplete="passwordCheck"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign Up
              </Button>
            </div>
          </form>
        </div>
      </Form>
    </>
  );
}
