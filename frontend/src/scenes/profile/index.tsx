import ProfileForm from "./ProfileForm";
import ProfileImage from "./ProfileImage";

export default function Profile() {
  //! JWT에서 데이터 받아오기

  return (
    <div className="w-full max-w-lg">
      <ProfileImage />
      <ProfileForm />
    </div>
  );
}
