import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Baby Mo Studio · AI Creative Team for Kids & Parenting Brands",
  description:
    "Upload a product image and get a complete premium branded marketing kit — generated in seconds by an AI creative team trained for warm, emotional kids and parenting brands.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ),
  openGraph: {
    title: "Baby Mo Studio",
    description:
      "Your AI creative team for warm, premium kids & parenting branding.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdfaf5" },
    { media: "(prefers-color-scheme: dark)", color: "#15110d" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-cream-50 dark:bg-sand-950 font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
