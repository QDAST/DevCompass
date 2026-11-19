import Link from "next/link";
import { Brand } from "./SiteHeader";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand />
            <p>
              DevCompass помогает начинающим разработчикам выбрать технологии для первой
              версии продукта — понятно, без рейтингов и лишнего шума.
            </p>
          </div>
          <div className="footer-col">
            <h4>Разделы</h4>
            <Link href="/#builder">Подбор стека</Link>
            <Link href="/#how">Как это работает</Link>
            <Link href="/catalog">Каталог технологий</Link>
            <Link href="/saved">Мои планы</Link>
          </div>
          <div className="footer-col">
            <h4>О проекте</h4>
            <span style={{ display: "block", fontSize: 13.5, color: "var(--ink-soft)" }}>
              Учебный проект. Без регистрации, платежей и рекламы.
            </span>
            <span
              style={{ display: "block", marginTop: 8, fontSize: 13, color: "var(--muted)" }}
            >
              Рекомендации — стартовая точка, а не единственный верный ответ.
            </span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 DevCompass</span>
          <span>Инструменты должны помогать идеям случаться.</span>
          <Link href="/#top">Наверх ↑</Link>
        </div>
      </div>
    </footer>
  );
}
