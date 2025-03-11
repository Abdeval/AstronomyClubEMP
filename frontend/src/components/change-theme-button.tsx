import * as React from "react";

import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/context/theme-provider";

export default function ChangeThemeButton() {
  const { theme, setTheme } = useTheme();

  console.log("the theme is :", theme);

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="items-center flex gap-4">
      <span className="text-foreground font-bold">{theme}</span>
      <Switch
        checked={theme === "dark" ? true : false}
        onCheckedChange={toggleTheme}
      />
    </div>
  );
}
