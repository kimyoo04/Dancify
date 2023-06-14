import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileFormValues, profileFormSchema } from "@type/auth";

import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";

import { useToast } from "@components/ui/use-toast";
import { useReadProfile } from "@api/auth/readProfile";
import { useState } from "react";

export default function ProfileForm() {
  const [isLoading] = useState<boolean>(false);
  const { data } = useReadProfile();

  const defaultValues: Partial<ProfileFormValues> = {
    nickname: data?.nickname && "",
    email: data?.email && "",
    description: data?.description && "",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { toast } = useToast();

  function onSubmit(data: ProfileFormValues) {
    console.log(data);
    toast({
      title: "Success",
      description: "성공적으로 프로필 정보가 수정되었습니다.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>닉네임</FormLabel>
              <FormControl>
                <Input placeholder="2글자 이상" {...field} />
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
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input placeholder="exmaple@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>자기소개</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="다른 댄서블에게 소개할 말을 적어주세요."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          프로필 정보 수정
        </Button>
      </form>
    </Form>
  );
}
