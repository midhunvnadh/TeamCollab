"use client";
import SessionProvider from "@/lib/context/session";
import "./globals.css";
import { geistMono, geistSans } from "@/lib/fonts";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
