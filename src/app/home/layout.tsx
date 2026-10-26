
import "../globals.css";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function HomeLayout({
  children,
}: LayoutProps<"/home">) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {children}
    </div>
  );
}
