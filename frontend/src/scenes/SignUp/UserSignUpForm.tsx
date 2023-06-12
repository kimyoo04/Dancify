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
      required_error: "로그인을 위한 아이디를 입력해주세요.",
    })
    .min(2, {
      message: "아이디는 최초 2글자 이상입니다.",
    })
    .max(20, {
      message: "아이디는 최대 20글자 이하입니다.",
    }),
  nickname: z
    .string({
      required_error: "다른 사람들에게 보일 닉네임을 입력해주세요.",
    })
    .min(2, {
      message: "닉네임은 최초 2글자 이상입니다.",
    })
    .max(10, {
      message: "닉네임은 최대 10글자 이하입니다.",
    }),
  phone: z
    .string({
      required_error: "전화번호를 입력해주세요.",
    })
    .min(10)
    .max(14),
  email: z
    .string({
      required_error: "이메일을 입력해주세요.",
    })
    .email("이메일 형식으로 입력해주세요."),
  password: z
    .string({
      required_error: "비밀번호를 입력해주세요.",
    })
    .max(20, {
      message: "비밀번호는 최대 20글자 이하입니다.",
    })
    .min(4, {
      message: "비밀번호는 최소 4글자 이상입니다.",
    }),
  passwordCheck: z.string({
    required_error: "비밀번호 확인을 입력해주세요.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export default function UserSignUpForm({
  className,
  ...props
}: UserAuthFormProps) {
  const router = useRouter();
  const [isDancer, setIsDancer] = React.useState(false);
  const [isLoading] = React.useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
  });

  async function onSubmit(data: ProfileFormValues) {
    // 비밀번호와 체크 불일치 유무 확인
    if (data.password !== data.passwordCheck) {
      toast({
        title: "비밀번호 확인 불일치",
        description: "비밀번호와 비밀번호 확인을 다시 확인해주세요.",
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

  return (
    <>
      <div className="row-center h-12 w-full gap-4">
        <Button
          className={`hover:bg-primary/70 h-full w-full bg-muted-foreground ${
            isDancer ? "bg-primary" : ""
          }`}
          onClick={() => setIsDancer(false)}
        >
          Dancable
        </Button>
        <Button
          className={`hover:bg-primary/70 h-full w-full bg-muted-foreground ${
            isDancer ? "" : "bg-primary"
          }`}
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
