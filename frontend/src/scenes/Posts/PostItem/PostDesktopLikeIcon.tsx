import { useToggleLike } from "@api/like/toggleLike";
import { likeActions } from "@features/like/likeSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { TUserLike } from "@type/auth";
import { TPostCategory } from "@type/like";
import { useRouter } from "next/router";

export default function PostDesktopLikeIcon({
  userLike,
}: {
  userLike: TUserLike;
}) {
  const router = useRouter();
  const pathsArr = router.asPath.split("/");

  const dispatch = useAppDispatch();
  const newUserLike = useAppSelector((state) => state.like.userLike);

  const { mutateAsync } = useToggleLike();

  return (
    <>
      {userLike ? (
        <button
          className="mb-1"
          onClick={async () => {
            await mutateAsync({
              postId: pathsArr[3],
              postCategory: pathsArr[2].toUpperCase() as TPostCategory,
            });
            dispatch(likeActions.toggleLike());
          }}
        >
          {newUserLike ? (
            <i className="ri-heart-line text-2xl text-muted-foreground"></i>
          ) : (
            <i className="ri-heart-fill text-2xl text-muted-foreground text-red-500"></i>
          )}
        </button>
      ) : (
        <button
          className="mb-1"
          onClick={async () => {
            await mutateAsync({
              postId: pathsArr[3],
              postCategory: pathsArr[2].toUpperCase() as TPostCategory,
            });
            dispatch(likeActions.toggleLike());
          }}
        >
          {newUserLike ? (
            <i className="ri-heart-fill text-2xl text-muted-foreground text-red-500"></i>
          ) : (
            <i className="ri-heart-line text-2xl text-muted-foreground"></i>
          )}
        </button>
      )}
    </>
  );
}
