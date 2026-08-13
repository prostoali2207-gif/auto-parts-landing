import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://auto-parts-landing-five.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Spline — автозапчасти в ОАЭ",
  description: "Запросите автозапчасть в ОАЭ по VIN, данным автомобиля, фото или OEM / Part Number.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Spline — автозапчасти в ОАЭ",
    description: "Запросите автозапчасть по VIN, данным автомобиля, фото или OEM / Part Number.",
    siteName: "Spline",
    locale: "ru_AE",
  },
  twitter: {
    card: "summary",
    title: "Spline — автозапчасти в ОАЭ",
    description: "Запросите автозапчасть по VIN, данным автомобиля, фото или OEM / Part Number.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
