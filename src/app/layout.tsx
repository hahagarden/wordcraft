import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wordcraft | hahagarden",
  description: "A word game where you create sentences using given words and get scored by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased grid grid-rows-[auto_1fr] p-20 h-screen`}
      >
        {/* 로고 */}
        <div className="text-base text-foreground flex justify-between">
          <Link href="/">wordcraft</Link>
          <a href="https://github.com/hahagarden/wordcraft" target="_blank">
            github
          </a>
        </div>

        <div className="flex overflow-auto border border-foreground">{children}</div>
      </body>
    </html>
  );
}
