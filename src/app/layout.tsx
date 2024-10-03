import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	const i = Math.floor(Math.random() * 8) + 1;
	const background = "url('/assets/backgrounds/frame-" + i + ".png')";
	const darkClass = i > 6 ? 'min-h-screen	gap-8 px-4 py-12 dark' : 'min-h-screen gap-8 px-4 py-12'

  return (
    <html lang="en">
      <body style={{backgroundImage: background, backgroundSize: 'cover'}} className={darkClass}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
