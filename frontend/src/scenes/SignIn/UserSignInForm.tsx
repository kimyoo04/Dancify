import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { signIn } from "@api/auth/signIn";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  signInFormSchema,
  SignInFormValues,
  SignInFormProps,
} from "@type/signIn";

export default function UserSignInForm({
  className,
  ...props
}: SignInFormProps) {
  const router = useRouter();
  const [isLoading] = React.useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      userId: "",
      password: "",
    }
  });

  async function onSubmit(data: SignInFormValues) {
    const response = await signIn(data);
    console.log(
      "🚀 ~ file: UserSignInForm.tsx:69 ~ onSubmit ~ response:",
      response
    );

    if (response === true) {
      // 회원가입 성공 후 로그인 페이지로 이동
      router.replace("/");
      await new Promise((resolve) => setTimeout(resolve, 500));
      return;
    } else {
      toast({
        title: "로그인 인증",
        description: "아이디와 비밀번호를 확인해주세요.",
      });
      return;
    }
  }

  return (
    <>
      {/* 아이디 & 패스워드 */}
      <Form {...form}>
        <div className={cn("grid gap-6", className)} {...props}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="UserId">아이디</FormLabel>
                    <FormControl>
                      <Input
                        id="userId"
                        placeholder="아이디"
                        type="text"
                        autoCapitalize="none"
                        autoComplete="userId"
                        autoCorrect="off"
                        disabled={isLoading}
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
                    <FormLabel className="sr-only" htmlFor="Password">비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        placeholder="비밀번호"
                        type="password"
                        autoCapitalize="none"
                        autoComplete="password"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <Button disabled={isLoading}>
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "로그인"
                )}
              </Button>
            </div>
          </form>
        </div>
      </Form>

      {/* 구분선 */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      {/* 회원 가입 */}
      <Link href="/signup" className="group w-full">
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          className="w-full group-hover:bg-primary"
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <span className="group-hover:text-white">회원 가입</span>
          )}
        </Button>
      </Link>
    </>
  );
}
