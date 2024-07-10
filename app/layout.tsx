import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/footer/footer";
import { Navbar } from "@/components/navbar/currentNavbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Synodic",
    default: "Synodic",
  },
  description: "Train a object detection model in minutes with Synodic",
  metadataBase: new URL("https://blog.synodic.ai"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
          <div className="flex min-h-screen w-full flex-col">
            <Navbar />
            <div className="mt-20 md:mt-2">
              {children}
            </div>
            <Footer />
          </div>
      </body>
    </html>
  );
}
