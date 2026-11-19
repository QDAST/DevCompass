import type { Metadata } from "next";
import Link from "next/link";
import CatalogClient from "./CatalogClient";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Каталог технологий — DevCompass",
  description:
    "Языки, фреймворки, базы данных и сервисы с описанием: что решает инструмент и когда его выбирают.",
};

export default function CatalogPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <div className="container">
          <div className="page-hero">
            <span className="eyebrow">
              <span className="dot" /> Каталог технологий
            </span>
            <h1>Инструменты с контекстом</h1>
            <p>
              Не рейтинг популярности, а короткий ответ на вопрос «зачем это нужно и когда
              выбирают». Фильтруйте по категории или ищите по названию.
            </p>
          </div>
          <CatalogClient />
        </div>
        <section className="cta-band" style={{ marginTop: 40 }}>
          <div className="container">
            <div className="cta-inner">
              <div>
                <h2>Не знаете, с чего начать?</h2>
                <p>Мастер подбора соберёт стартовый стек за два вопроса.</p>
              </div>
              <Link className="btn btn-dark btn-lg" href="/#builder">
                Подобрать стек <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
