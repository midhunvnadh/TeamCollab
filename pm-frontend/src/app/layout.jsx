import "./globals.css";
import { geistMono, geistSans } from "@/lib/fonts";
export const metadata = {
  title: "Team Collab",
  description: "Collaborate with your team through our task management app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
