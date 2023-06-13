// modules
import { useState } from "react";
import { Editor } from "@tiptap/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
// styles

interface IFontSizeOption {
  label: string;
  value: string;
}

const FontSizeOptions: IFontSizeOption[] = [
  {
    label: "16px",
    value: "16",
  },
  {
    label: "20px",
    value: "20",
  },
  {
    label: "24px",
    value: "24",
  },
  {
    label: "28px",
    value: "28",
  },
];

const FontSizeDropDown = ({ editor }: { editor: Editor }) => {
  const [selectedOption, setSelectedOption] = useState(
    FontSizeOptions[0].value
  );
  return (
    <Select
      value={selectedOption}
      onValueChange={(e) => {
        editor.commands.setFontSize(e);
        setSelectedOption(e);
      }}
    >
      <SelectTrigger className="w-[62px] border-none p-1">
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
};

export default FontSizeDropDown;
