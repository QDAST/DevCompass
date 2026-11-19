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
    "DevCompass помогает начинающим разработчикам подобрать технологии для IT-проекта: три вопроса, понятный стартовый стек и объяснение каждого выбора.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
