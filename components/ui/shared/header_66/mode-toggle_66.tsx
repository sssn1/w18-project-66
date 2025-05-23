'use client'
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, SunMoon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const Modetoggle_66 = () => {
    const { theme, setTheme } = useTheme();
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="focus-visible:ring-0 focus-visible:ring-offset-0">
            {theme === "system" ? <SunIcon /> : theme === "dark" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
  checked={theme === "dark"}
  onCheckedChange={() => setTheme("dark")}
  className="justify-between"
>
  Dark
</DropdownMenuCheckboxItem>
<DropdownMenuCheckboxItem
  checked={theme === "light"}
  onCheckedChange={() => setTheme("light")}
  className="justify-between">
  Light
</DropdownMenuCheckboxItem>
<DropdownMenuCheckboxItem
  checked={theme === "system"}
  onCheckedChange={() => setTheme("system")}
  className="justify-between">
  system
</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
export default Modetoggle_66;
