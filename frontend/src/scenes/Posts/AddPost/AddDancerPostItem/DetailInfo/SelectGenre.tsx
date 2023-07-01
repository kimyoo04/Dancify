import GenreButton from "./GenreButton";
import { IGenres } from "@type/filter";

export default function SelectGenres() {
  const genreArr: IGenres[] = [
    { label: "기본동작", value: "basic" },
    { label: "k-pop", value: "kpop" },
  ];

  return (
    <div className="space-y-1">
      <label
        htmlFor="genre"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        장르
      </label>
      <ul className="m-0 flex space-x-4 px-0">
        {genreArr.map((data) => (
          <GenreButton key={data.label} genre={data.value} />
        ))}
      </ul>
    </div>
  );
}
