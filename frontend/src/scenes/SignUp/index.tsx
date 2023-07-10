import UserSignUpForm from "./UserSignUpForm";
import SignUpHeader from "./SignUpHeader";

export default function SignUp() {
  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <SignUpHeader />

        <UserSignUpForm />
      </div>
    </div>
  );
}
