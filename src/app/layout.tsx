import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Smarter Release Engineering (SRE) — Reliable Software Delivery",
  description:
    "Architecting, automating, and continuously improving enterprise software delivery systems. Step inside our live deployment pipeline.",
  openGraph: {
    title: "Smarter Release Engineering",
    description:
      "Interactive continuous integration & delivery pipeline experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
