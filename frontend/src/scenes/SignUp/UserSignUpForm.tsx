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
import { Checkbox } from "@components/ui/checkbox";

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
  isDancer: z.boolean(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

//! This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  userId: "",
  nickname: "",
  phone: "",
  email: "",
  password: "",
  passwordCheck: "",
  isDancer: false,
};

export default function UserSignUpForm({
  className,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
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

            <FormField
              control={form.control}
              name="isDancer"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      if you want to teach users, please check.
                    </FormLabel>
                  </div>
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
  );
}
