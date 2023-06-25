import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";
import GenreButton from "./GenreButton";
import { IGenres } from "@type/filter";

export default function GenreButtons() {
  const genreArr: IGenres[] = [
    { label: "전체" , value: "전체" },
    { label: "기본동작", value: "basic" },
    { label: "k-pop", value: "kpop" },
  ];

  return (
    <ScrollArea>
      <ul className="flex space-x-4 px-0 pb-4">
        {genreArr.map((data) => (
          <GenreButton key={data.label} genre={data.value} />
        ))}
      </ul>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
