import { Anton } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

export const metadata = {
  title: "Concert Memory",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={anton.variable}>
      <body>{children}</body>
    </html>
  );
}