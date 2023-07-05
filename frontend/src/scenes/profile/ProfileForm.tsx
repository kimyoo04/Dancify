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
import {
  IProfileInfoForm,
  ProfileFormValues,
  profileFormSchema,
} from "@type/auth";

import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { useToast } from "@components/ui/use-toast";

import { useAppSelector } from "@toolkit/hook";
import { readProfile } from "@api/auth/readProfile";
import { updateProfile } from "@api/auth/updateProfile";
import encodeFileToBase64 from "@util/encodeFileToBase64";

import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProfileForm() {
  const router = useRouter()
  const [isLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>("");
  const [imageFile, setImageFile] = useState<File | undefined>();
  const { toast } = useToast();
  const userId = useAppSelector((state) => state.auth.userId);

  const imagePreview = imageFile ? URL.createObjectURL(imageFile) : undefined;

  // 이미지 메모리 누수 처리
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      nickname: "",
      email: "",
      description: "",
    }
  });

  useEffect(() => {
    async function getPofileInfo() {
      const data = await readProfile();
      if (data) {
        const profileImage = data.profileImage ? data.profileImage : undefined;
        setImageUrl(profileImage);
        const { nickname, email, description } = data;
        form.setValue("nickname", nickname);
        form.setValue("email", email);
        {description ?  form.setValue("description", description): form.setValue("description", undefined)}
        return;
      }
    }
    getPofileInfo();
  }, [form]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const profileData: IProfileInfoForm = {
        userId,
        nickname: data.nickname,
        email: data.email,
      };

      // 폼 정보에 입력이 있는 경우 데이터에 포함
      if (data.description) profileData.description = data.description;
      if (data.profileImage)
        profileData.profileImage = await encodeFileToBase64(data.profileImage);

      // 프로필 정보 수정 요청
      const isUpdated = await updateProfile(profileData);
      isUpdated && router.reload()
      toast({
        title: "Success",
        description: "성공적으로 프로필 정보가 수정되었습니다.",
      });
    } catch (err) {
      console.log("🚀ProfileForm.tsx - onSubmit:", err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* 프로필 이미지 미리보기 */}
        <div className="relative h-20 w-20 overflow-hidden rounded-full">
          {/* 프로필 이미지가 있을 때 프로필이미지 */}
          {!imagePreview && imageUrl ? (
            <Image src={imageUrl} alt="preview" width={80} height={80} />
          ) :  !imagePreview ? (
            <Image
              src={"/images/avatar.png"}
              alt="profile_image"
              width={80}
              height={80}
              priority
            />
          ): <Image src={imagePreview} alt="preview" width={80} height={80} />}
        </div>

        <div className="h-20 w-80 cursor-pointer">
          <FormField
            control={form.control}
            name="profileImage"
            render={({ field: { ref, name, onBlur, onChange } }) => (
              <FormItem>
                <FormLabel>프로필 이미지 {"(선택)"}</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    ref={ref}
                    name={name}
                    onBlur={onBlur}
                    onChange={(e) => {
                      setImageFile(e.target.files?.[0]);
                      onChange(e.target.files?.[0]);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
              <FormLabel>자기소개 {"(선택)"}</FormLabel>
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

        <Button disabled={isLoading} className="text-white" type="submit">
          프로필 정보 수정
        </Button>
      </form>
    </Form>
  );
}
