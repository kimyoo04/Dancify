import { Button } from "@components/ui/button";
import { filterActions } from "@features/filter/filterSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { TGenreValue } from "@type/filter";

export default function GenreButton({ genre }: { genre: TGenreValue }) {
  const dispatch = useAppDispatch();
  const genreState = useAppSelector((state) => state.filter.genre);
  const activeColor =
    genreState === genre ? "bg-primary" : "bg-muted text-muted=foreground";

  return (
    <Button
      className={`w-24 ${activeColor}`}
      onClick={() => dispatch(filterActions.getGenre(genre))}
    >
      {genre}
    </Button>
  );
}
