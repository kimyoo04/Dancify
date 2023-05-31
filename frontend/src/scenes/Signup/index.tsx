import { useRouter } from "next/router";
import { ISignUpForm } from "@type/signup";
import { useForm } from "react-hook-form";
import ErrorMsg from "@components/TextField/ErrorMsg";
import { TextField } from "@components/TextField";
import Link from "next/link";
import { signup } from "@api/auth/signup";

export default function Signup() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ISignUpForm>({
    defaultValues: {},
  });

  const onValid = async (data: ISignUpForm) => {
    if (data.password !== data.passwordCheck) {
      setError("extraError", { message: "Password가 일치하지 않습니다." });
    }

    // 회원가입 요청 (성공 시 로그인 페이지로 이동)
    const result = await signup(data);
    if (result) {
      router.replace("/signin");
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <TextField
        id="userId"
        label="ID"
        error={errors.userId?.message as string}
        inputProps={{
          ...register("userId", {
            required: "ID가 필요합니다.",
            minLength: {
              value: 6,
              message: "Password는 5보다 길어야 합니다.",
            },
            maxLength: {
              value: 16,
              message: "ID는 17 보다 작아야 합니다.",
            },
          }),
        }}
      />

      <TextField
        id="username"
        label="Name"
        error={errors.username?.message as string}
        inputProps={{
          ...register("username", {
            required: "Name이 필요합니다.",
            minLength: {
              value: 4,
              message: "Name은 3보다 길어야 합니다.",
            },
            maxLength: {
              value: 10,
              message: "Name은 11보다 짧아야 합니다.",
            },
          }),
        }}
      />

      <TextField
        id="password"
        label="Password"
        type="password"
        error={errors.password?.message as string}
        inputProps={{
          ...register("password", {
            required: "Password가 필요합니다.",
            minLength: {
              value: 6,
              message: "Password는 5보다 길어야 합니다.",
            },
            maxLength: {
              value: 16,
              message: "Password는 17보다 짧아야 합니다.",
            },
          }),
        }}
      />

      <TextField
        id="passwordCheck"
        label="Password Check"
        type="password"
        error={errors.passwordCheck?.message as string}
        inputProps={{
          ...register("passwordCheck", {
            required: "Password Check가 필요합니다.",
          }),
        }}
      />

      <ErrorMsg>{errors?.extraError?.message}</ErrorMsg>

      <div className="mt-4 flex items-center justify-between">
        <Link href="/signin">
          <button>로그인</button>
        </Link>

        <button type="submit">회원가입</button>
      </div>
    </form>
  );
}
