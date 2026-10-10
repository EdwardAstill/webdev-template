import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Webdev Template",
  description: "A starting point for your next web app, built with Bun, Next.js, React, Tailwind CSS, and shadcn/ui.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
