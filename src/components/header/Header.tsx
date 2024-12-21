import { useAppContext } from "../../context";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

function Header() {
  const { setDarkMode } = useAppContext();

  const handleThemeChange = (value: string) => {
    if (value === "dark") {
      setDarkMode(true);
    } else if (value === "light") {
      setDarkMode(false);
    } else if (value === "device_theme") {
      // Qurilma mavzusiga qaytish uchun
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(prefersDarkMode);
    }
  };

  return (
    <header className="bg-white dark:text-white flex items-center justify-between dark:bg-zinc-800 px-2 md:px-0">
      <div className="container py-3">
        <h1 className="text-3xl font-consolas font-bold">ChatGPT</h1>
      </div>
      <Select onValueChange={handleThemeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Theme</SelectLabel>
            <SelectItem value="device_theme">Device Theme</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="light">Light</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </header>
  );
}

export default Header;