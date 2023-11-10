import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BiMoon } from "react-icons/bi";
import { BiSun } from "react-icons/bi";

const Theme = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      aria-label="theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      variant={"outline"}
      className="border-none"
      size={"sm"}
    >
      {theme === "dark" ? <BiSun /> : <BiMoon />}
    </Button>
  );
};

export default Theme;
