import Link from "next/link";
import { tools } from "@/lib/data";

const previewIds = ["nextjs", "typescript", "postgres", "stripe"];
const previewTools = previewIds.map((id) => tools.find((tool) => tool.id === id)!);

export default function HomeHero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div>
          <span className="eyebrow">
            <span className="dot" />
            Навигатор по технологиям
          </span>
          <h1>
            Соберите стек
            <br />
            под <span className="accent">свою идею</span>.
          </h1>
          <p className="lead">
            DevCompass задаёт три простых вопроса и собирает стартовый набор инструментов.
            С объяснением, зачем нужен каждый — без десятка вкладок и противоречивых советов.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-accent btn-lg" href="#builder">
              Подобрать стек <span className="arrow">→</span>
            </Link>
            <Link className="btn btn-ghost btn-lg" href="#how">
              Как это работает
            </Link>
          </div>
          <div className="hero-meta">
            <span>3 вопроса</span>
            <span className="sep" aria-hidden="true" />
            <span>≈ 2 минуты</span>
            <span className="sep" aria-hidden="true" />
            <span>Без регистрации</span>
          </div>
        </div>

        <div className="preview" aria-label="Пример подборки инструментов">
          <div className="preview-card">
            <div className="preview-head">
              <span className="tag">Пример подборки</span>
              <span className="tag muted">Интернет-магазин</span>
            </div>
            <div className="preview-title">
              <div>
                <small>Стартовый стек</small>
                <h2>Магазин на 20 товаров</h2>
              </div>
              <span className="preview-match">4 инструмента</span>
            </div>
            <div className="preview-tools">
              {previewTools.map((tool, index) => (
                <div className="preview-tool" key={tool.id}>
                  <span className={`tool-mark tone-${tool.tone}`} aria-hidden="true">
                    {tool.mark}
                  </span>
                  <span className="tool-copy">
                    <span className="tool-name">{tool.name}</span>
                    <span className="tool-role">{tool.role}</span>
                  </span>
                  <span className="preview-index">0{index + 1}</span>
                </div>
              ))}
            </div>
            <div className="preview-foot">
              <span className="check" aria-hidden="true">
                ✓
              </span>
              Каждый инструмент — с объяснением, зачем он здесь
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
