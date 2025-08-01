import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleOAuthProvider clientId={process.env.CLIENT_ID!}>
        <body
          className={`${montserrat.variable} ${montserrat.variable} antialiased`}
        >
           <Toaster />
          {children}
        </body>
      </GoogleOAuthProvider>
    </html>
  );
}
