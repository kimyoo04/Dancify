import { TPlayIndex, TPlayOrdinal } from "@type/practice";

export default function convertToOrdinal(number: TPlayIndex): TPlayOrdinal {
  const ordinalMap: Record<TPlayIndex, TPlayOrdinal> = {
    0: "첫번째",
    1: "두번째",
    2: "세번째",
    3: "네번째",
    4: "다섯번째",
  };

  return ordinalMap[number];
}
