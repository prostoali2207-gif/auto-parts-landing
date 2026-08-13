import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spline — автозапчасти в ОАЭ",
  description: "Запрос автозапчастей по VIN, фото или номеру детали.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
