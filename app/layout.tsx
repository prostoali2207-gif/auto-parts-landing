import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import "./brand.css";
import "./ui-polish.css";
import "./ui-pass-3.css";
import "./ui-pass-4.css";
import "./ui-rebuild-v2.css";
import "./ui-visual-refinement-v3.css";
import "./ui-visual-reset-v4.css";
import "./ui-visual-reset-v4-revision.css";
import "./ui-visual-reset-v5-revision.css";
import "./ui-visual-reset-v6.css";
import "./ui-visual-reset-v6-fixes.css";

const plexSans = IBM_Plex_Sans({ variable: "--font-plex-sans", subsets: ["latin", "cyrillic"], weight: ["400", "500", "600", "700"], display: "swap" });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin", "cyrillic"], weight: ["600", "700"], display: "swap" });
const SITE_URL = "https://auto-parts-landing-five.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Spline — автозапчасти в ОАЭ",
  description: "Запросите автозапчасть в ОАЭ по VIN, данным автомобиля, фото или OEM / Part Number.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", title: "Spline — автозапчасти в ОАЭ", description: "Запросите автозапчасть по VIN, данным автомобиля, фото или OEM / Part Number.", siteName: "Spline", locale: "ru_AE" },
  twitter: { card: "summary", title: "Spline — автозапчасти в ОАЭ", description: "Запросите автозапчасть по VIN, данным автомобиля, фото или OEM / Part Number." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru" className={`${plexSans.variable} ${plexMono.variable}`}><body>{children}</body></html>;
}
