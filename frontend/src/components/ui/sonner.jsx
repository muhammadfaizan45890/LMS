import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = (props) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={{
        "--normal-bg": "var(--popover, #fff)",
        "--normal-text": "var(--popover-foreground, #000)",
        "--normal-border": "var(--border, #ccc)",
      }}
      {...props}
    />
  );
};

export { Toaster };
