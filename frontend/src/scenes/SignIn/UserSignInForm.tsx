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
import { signIn } from "@api/auth/signIn";
import { useRouter } from "next/router";
import Link from "next/link";

const profileFormSchema = z.object({
  userId: z
    .string({
      required_error: "아이디를 입력해주세요.",
    })
    .min(2, {
      message: "아이디는 최소 2글자 이상입니다.",
    })
    .max(30, {
      message: "아이디는 최대 30글자 이하입니다.",
    }),
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
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

//! This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  userId: "",
  password: "",
};

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export default function UserSignInForm({
  className,
  ...props
}: UserAuthFormProps) {
  const router = useRouter();
  const [isLoading] = React.useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  async function onSubmit(data: ProfileFormValues) {
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
        description: "이메일과 비밀번호를 확인해주세요.",
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
                    <FormLabel className="sr-only" htmlFor="UserId">
                      UserId
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="userId"
                        placeholder="Id"
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
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <Button disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                로그인
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

      {/* OAuth */}
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
