import { useMotionValueEvent, useScroll } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useState } from "react";

export default function ScrollButton() {
  const [isTop, setIsTop] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (position) => {
    if (
      position !== 0 &&
      position + window.innerHeight + 20 < document.body.scrollHeight
    ) {
      setIsTop(false);
    } else if (position !== 0) {
      setIsTop(false);
    } else {
      setIsTop(true);
    }
  });

  // 최상단으로 이동
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <button
      onClick={() => scrollToTop()}
      className={`col-center dark:shadow-gray-4 group fixed bottom-20 right-4 z-10 h-8 w-8 rounded-full bg-muted shadow-sm shadow-gray_1 transition-all hover:scale-110 md:bottom-4 ${
        isTop ? "cursor-default opacity-0" : ""
      }`}
    >
      <ChevronUp />
    </button>
  );
}
