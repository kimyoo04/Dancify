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
import { cn } from "@lib/utils";
import { useToast } from "@components/ui/use-toast";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Icons } from "@components/ui/icons";

import { signUp } from "@api/auth/signUp";
import { useRouter } from "next/router";

import {
  ISignUpForm,
  signUpFormSchema,
  SignUpFormValues,
  SignUpFormProps,
} from "@type/signUp";
import makePhoneNumber from "@util/makePhoneNumber";

export default function UserSignUpForm({
  className,
  ...props
}: SignUpFormProps) {
  const router = useRouter();
  const [isDancer, setIsDancer] = React.useState(false);
  const [isLoading] = React.useState<boolean>(false);
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
  });

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputPhoneNumber = event.target.value;
    const formattedPhoneNumber = makePhoneNumber(inputPhoneNumber);
    setPhoneNumber(formattedPhoneNumber);
  };

  async function onSubmit(data: SignUpFormValues) {
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="Phone">
                      Phone
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="phone"
                        placeholder="전화번호 ('-' 제외)"
                        type="tel"
                        autoCapitalize="none"
                        autoComplete="phone"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
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
                        placeholder="이메일주소"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
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
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="Nickname">
                      Nickname
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="nickname"
                        placeholder="닉네임"
                        type="text"
                        autoCapitalize="none"
                        autoComplete="nickname"
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
                        placeholder="비밀번호 확인"
                        type="password"
                        autoCapitalize="none"
                        autoComplete="passwordCheck"
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
                회원 가입
              </Button>
            </div>
          </form>
        </div>
      </Form>
    </>
  );
}
