import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokemon EV HUB",
  description: "Pokemon EV Training Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-slate-100">
        <Providers>
          <div className="flex min-h-screen">
            <Sidebar />

            <div className="flex-1 flex flex-col">
              <Navbar />

              <main className="p-8 flex-1">{children}</main>

              <footer className="border-t bg-white text-center py-4 text-sm text-slate-500">
                © 2026 Pokemon EV HUB. All rights reserved.
              </footer>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
