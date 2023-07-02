import PostDesktopLikeIcon from "@scenes/Posts/PostItem/PostDesktopLikeIcon";
import { IDancerPostDetail } from "@type/dancerPosts";
import { timeYmd } from "@util/dateTime";
import UpDelButton from "./UpDelButton";
import { useAppSelector } from "@toolkit/hook";
import HeaderProfileImage from "@components/ProfileImage/HeaderProfileImage";

interface IHeaderProps {
  data: IDancerPostDetail;
}

export default function DancerHeader({ data }: IHeaderProps) {
  const userId = useAppSelector((state) => state.auth.userId);

  return (
    <div className="flex items-center gap-3 pb-3">
      <HeaderProfileImage imageUrl={data.profileImage} />

      <div className="flex justify-between items-end w-full">
        <div>
          {/* 게시글 제목 */}
          <h2 className="text-xl font-bold">{data.title}</h2>

          {/* 작성자, 작성일, 조회수 -- 수정, 삭제 버튼 */}
          <div className="flex flex-wrap items-center justify-between">
            <div>
              <span className="text-sm text-muted-foreground">
                {data.nickname}
              </span>
              <span className="mx-2 text-sm text-muted-foreground">|</span>
              <span className="text-sm text-muted-foreground">
                {timeYmd(data.createDate)}
              </span>
              <span className="mx-2 text-sm text-muted-foreground">|</span>
              <span className="text-sm text-muted-foreground">
                조회수: {data.views}
              </span>
            </div>
          </div>
        </div>

        <div className="row-center gap-2">
          {userId !== "" && <PostDesktopLikeIcon />}
          {data.userId === userId && <UpDelButton postId={data.postId} />}
        </div>
      </div>
    </div>
  );
}
