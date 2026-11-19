import type { Metadata } from "next";
import SavedClient from "./SavedClient";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Мои планы — DevCompass",
  description: "Сохранённые стартовые стеки для ваших проектов.",
};

export default function SavedPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <div className="container">
          <div className="page-hero">
            <span className="eyebrow">
              <span className="dot" /> Мои планы
            </span>
            <h1>Сохранённые подборки</h1>
            <p>
              Здесь лежат стеки, которые вы сохранили. Данные хранятся только в этом браузере
              — регистрация не нужна.
            </p>
          </div>
          <SavedClient />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
