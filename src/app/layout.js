import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppLayout from "@/app/components/Layout/AppLayout";
// import Footer from "@/components/Layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Comic Website",
  description: "Manga Reading Website",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}