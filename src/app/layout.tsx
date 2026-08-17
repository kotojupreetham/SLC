import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/interaction/CustomCursor";
import { BackgroundCanvas } from "@/components/interaction/BackgroundCanvas";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sre.engineering";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Smarter Release Engineering (SRE) — Software Delivery Systems",
    template: "%s | Smarter Release Engineering",
  },
  description:
    "We design, automate, and continuously improve software delivery systems. Reduce release risk, optimize CI/CD pipelines, and embed DevSecOps guardrails.",
  keywords: [
    "Release Engineering",
    "SRE Consultancy",
    "CI/CD Pipelines",
    "Platform Engineering",
    "DevSecOps",
    "Software Delivery",
    "Kubernetes Automation",
    "GitOps",
  ],
  authors: [{ name: "Smarter Release Engineering Team" }],
  creator: "Smarter Release Engineering",
  publisher: "Smarter Release Engineering",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Smarter Release Engineering (SRE) — Software Delivery Systems",
    description:
      "Design, automate, and continuously improve software delivery systems with zero-downtime progressive delivery and observability.",
    url: siteUrl,
    siteName: "Smarter Release Engineering",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smarter Release Engineering (SRE)",
    description:
      "Architecting, automating, and continuously improving enterprise software delivery systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <BackgroundCanvas />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
