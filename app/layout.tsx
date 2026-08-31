import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Manrope, Unbounded } from "next/font/google";
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
import "./ui-v6-fundamentals-refinement.css";
import "./ui-v6-mobile-process-fix.css";
import "./ui-visual-reset-v7.css";
import "./ui-visual-reset-v7-cleanup.css";
import "./ui-v7-refinement.css";
import "./ui-v7-process-collision-fix.css";
import "./ui-v7-product-specific-refinement.css";

const plexSans = IBM_Plex_Sans({ variable: "--font-plex-sans", subsets: ["latin", "cyrillic"], weight: ["400", "500", "600", "700"], display: "swap" });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin", "cyrillic"], weight: ["600", "700"], display: "swap" });
const manrope = Manrope({ variable: "--font-v7-body", subsets: ["latin", "cyrillic"], weight: ["400", "500", "600", "700"], display: "swap" });
const unbounded = Unbounded({ variable: "--font-v7-display", subsets: ["latin", "cyrillic"], weight: ["600", "700"], display: "swap" });
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
  return <html lang="ru" className={`${plexSans.variable} ${plexMono.variable} ${manrope.variable} ${unbounded.variable}`}><body>{children}</body></html>;
}
