"use client";

import { useMemo, useState } from "react";
import { catalogTools, categories } from "@/lib/data";

function plural(count: number, one: string, few: string, many: string) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

export default function CatalogClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return catalogTools.filter((tool) => {
      const matchesCategory = category === "all" || tool.category === category;
      const haystack = `${tool.name} ${tool.short} ${tool.when} ${tool.role}`.toLowerCase();
      return matchesCategory && (!normalized || haystack.includes(normalized));
    });
  }, [query, category]);

  return (
    <div>
      <div className="catalog-controls">
        <label className="search">
          <span className="sr-only">Поиск по каталогу</span>
          <span className="search-icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="6.8" cy="6.8" r="4.6" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="m10.4 10.4 3.2 3.2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Найти инструмент: Next.js, база данных…"
          />
          {query && (
            <button
              type="button"
              className="search-clear"
              onClick={() => setQuery("")}
              aria-label="Очистить поиск"
            >
              ×
            </button>
          )}
        </label>
        <div className="tabs" role="group" aria-label="Категории">
          <button
            type="button"
            className={`tab ${category === "all" ? "active" : ""}`}
            aria-pressed={category === "all"}
            onClick={() => setCategory("all")}
          >
            Все
          </button>
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`tab ${category === item.id ? "active" : ""}`}
              aria-pressed={category === item.id}
              onClick={() => setCategory(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <p className="catalog-count" aria-live="polite">
        {filtered.length}{" "}
        {plural(filtered.length, "инструмент", "инструмента", "инструментов")}
      </p>

      {filtered.length === 0 ? (
        <div className="empty">
          <strong>Ничего не нашлось</strong>
          Попробуйте другое слово или сбросьте фильтры.
          <div style={{ marginTop: 18 }}>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
            >
              Сбросить фильтры
            </button>
          </div>
        </div>
      ) : (
        <div className="catalog-grid">
          {filtered.map((tool) => (
            <article className="catalog-card" key={tool.id}>
              <div className="catalog-card-top">
                <span className={`tool-mark tone-${tool.tone}`} aria-hidden="true">
                  {tool.mark}
                </span>
                <span className="catalog-cat">
                  {categories.find((item) => item.id === tool.category)?.label}
                </span>
              </div>
              <h3>{tool.name}</h3>
              <p>{tool.short}</p>
              <div className="catalog-when">
                <b>Когда выбрать:</b> {tool.when}
              </div>
              <a className="catalog-docs" href={tool.docs} target="_blank" rel="noreferrer">
                Документация ↗
              </a>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
