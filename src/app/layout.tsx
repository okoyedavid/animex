import "./globals.css";
import { Manrope, Space_Grotesk } from "next/font/google";
import { Suspense, type ReactNode } from "react";
import Providers from "./providers";
import NavBar from "@/components/NavBar";
import { ScrollArea } from "@/components/ui/scroll-area";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata = {
  title: "Animex",
  description: "Search anime recommendations with Animex.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${spaceGrotesk.variable}`}>
        <Providers>
          <Suspense fallback={null}>
            <NavBar />
          </Suspense>

          {children}
        </Providers>
      </body>
    </html>
  );
}
