import ThemeRegistry from "@/features/mui/ThemeRegistry";

export default function MuiLayout({ children }: { children: React.ReactNode }) {
  return <ThemeRegistry>{children}</ThemeRegistry>;
}
