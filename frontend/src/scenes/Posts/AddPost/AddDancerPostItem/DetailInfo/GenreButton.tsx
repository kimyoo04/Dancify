import { Button } from "@components/ui/button";
import { postActions } from "@features/post/postSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { TGenreValue } from "@type/filter";

export default function GenreButton({ genre }: { genre: TGenreValue }) {
  const dispatch = useAppDispatch();
  const genreState = useAppSelector((state) => state.post.genre);
  const activeColor =
    genreState === genre ? "bg-primary" : "bg-muted text-muted=foreground";

  return (
    <Button
      className={`w-24 ${activeColor}`}
      onClick={() => dispatch(postActions.selectGenre(genre))}
    >
      {genre}
    </Button>
  );
}
