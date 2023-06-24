import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";
import GenreButton from "./GenreButton";
import { IGenres } from "@type/filter";

export default function GenreButtons() {
  const genreArr: IGenres[] = [
    { genre: "전체" },
    { genre: "기본동작" },
    { genre: "k-pop" },
  ];

  return (
    <ScrollArea>
      <ul className="flex space-x-4 px-0 pb-4">
        {genreArr.map((data) => (
          <GenreButton key={data.genre} genre={data.genre} />
        ))}
      </ul>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
