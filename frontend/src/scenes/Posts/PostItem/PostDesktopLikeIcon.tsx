import { useToggleLike } from "@api/likes/toggleLike";
import { likeActions } from "@features/like/likeSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { TPostCategoryUpper } from "@type/like";
import { useRouter } from "next/router";

export default function PostDesktopLikeIcon() {
  const router = useRouter();
  const pathsArr = router.asPath.split("/");

  const dispatch = useAppDispatch();
  const userLike = useAppSelector((state) => state.like.userLike);

  const { mutateAsync } = useToggleLike();

  return (
    <>
      <button
        className="h-6 col-center"
        onClick={async () => {
          if (
            router.query.id !== undefined &&
            !Array.isArray(router.query.id)
          ) {
            await mutateAsync({
              postId: router.query.id,
              postCategory: pathsArr[1].toUpperCase() as TPostCategoryUpper,
            });
          }
          dispatch(likeActions.toggleUserLike());
        }}
      >
        {userLike ? (
          <i className="ri-heart-fill text-2xl text-muted-foreground text-red-500"></i>
        ) : (
          <i className="ri-heart-line text-2xl text-muted-foreground"></i>
        )}
      </button>
    </>
  );
}
