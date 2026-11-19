import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DevCompass — найдите стек для своей идеи",
  description:
    "DevCompass помогает начинающим разработчикам подобрать технологии для IT-проекта: два вопроса, понятный стартовый стек и объяснение каждого выбора.",
  openGraph: {
    title: "DevCompass — найдите стек для своей идеи",
    description:
      "Два вопроса — стартовый стек, объяснение каждого инструмента и план первых шагов.",
    siteName: "DevCompass",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
