// modules
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { filterActions } from "@features/filter/filterSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { ISort, TSort } from "@type/filter";

const FontSizeOptions: ISort[] = [
  {
    label: "최신순",
    value: "new",
  },
  {
    label: "인기순",
    value: "like",
  },
  {
    label: "조회순",
    value: "view",
  },
];

export default function SortDropDown() {
  const dispatch = useAppDispatch();
  const sort = useAppSelector((state) => state.filter.sort);

  return (
    <Select
      value={sort}
      onValueChange={(e) => {
        dispatch(filterActions.getSort(e as TSort));
      }}
    >
      <SelectTrigger className="w-28">
        <SelectValue className="text-xs" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {FontSizeOptions.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
