import "./globals.css";
import clientData from "@/data/clientData";
import { ThemeProvider } from "./ThemeProvider";

export const metadata = {
  title: `${clientData.name} - Portfolio`,
  description: clientData.tagline,
  keywords: ["portfolio", "next.js", "tailwindcss", clientData.name],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`font-sans antialiased text-gray-900 bg-white dark:bg-slate-900 dark:text-gray-100 transition-colors duration-300`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
