"use client";
import SessionProvider from "@/lib/context/session";
import "./globals.css";
import { geistMono, geistSans } from "@/lib/fonts";
import { SocketProvider } from "@/lib/context/socket";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>TeamCollab</title>
        <meta
          name="description"
          content="Project management and team collaboration platform"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SocketProvider>
          <SessionProvider>{children}</SessionProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
