import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export default function DarkToggle() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <button className="group" onClick={toggleTheme}>
      {theme === "dark" ? (
        <MoonIcon className="text-xl group-hover:text-yellow-400 dark:group-hover:text-yellow-400" />
      ) : (
        <SunIcon className="text-xl group-hover:text-orange-400 dark:group-hover:text-orange-400" />
      )}
    </button>
  );
}
