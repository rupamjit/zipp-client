import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import ClientProvider from "./client-provider";

const montserrat = Montserrat({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quizz",
  description: "It's a social app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
