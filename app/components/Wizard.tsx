"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import {
  experienceOptions,
  features,
  featuresByProject,
  getRecommendation,
  projects,
  type ProjectKind,
} from "@/lib/data";
import { readPlans, writePlans, type SavedPlan } from "@/lib/plans";

const stepNames = ["Тип проекта", "Опыт и функции", "Результат"];

type Status = { type: "ok" | "error"; text: string; saved?: boolean } | null;

function plural(count: number, one: string, few: string, many: string) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

export default function Wizard() {
  const [step, setStep] = useState(0);
  const [kind, setKind] = useState<ProjectKind>("website");
  const [experience, setExperience] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>(null);
  const wizardRef = useRef<HTMLDivElement>(null);

  const project = projects.find((item) => item.id === kind)!;
  const availableFeatures = featuresByProject[kind];
  const activeFeatures = selected.filter((id) => availableFeatures.includes(id));
  const recommendation = useMemo(
    () => getRecommendation(kind, experience, activeFeatures),
    [kind, experience, activeFeatures],
  );

  const featureLabels = activeFeatures
    .map((id) => features.find((item) => item.id === id)?.label.toLowerCase())
    .filter(Boolean);

  function go(nextStep: number) {
    setStep(nextStep);
    setStatus(null);
    window.requestAnimationFrame(() => {
      wizardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function chooseKind(nextKind: ProjectKind) {
    setKind(nextKind);
    setSelected((current) =>
      current.filter((id) => featuresByProject[nextKind].includes(id)),
    );
    setStatus(null);
  }

  function toggleFeature(id: string) {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
    setStatus(null);
  }

  function planText() {
    const lines = [
      `DevCompass — стек для проекта «${project.label}»`,
      "",
      `Опыт: ${experienceOptions[experience].label}`,
      `Функции: ${featureLabels.length ? featureLabels.join(", ") : "не выбраны"}`,
      "",
      "СТЕК",
      ...recommendation.tools.map((tool) => `• ${tool.name} — ${tool.role}`),
      "",
      "ПОЧЕМУ ТАК",
      ...recommendation.notes.map((note) => `• ${note}`),
      "",
      "С ЧЕГО НАЧАТЬ",
      ...recommendation.plan.map((item, index) => `${index + 1}. ${item}`),
      "",
      "Это стартовая точка, а не единственный верный ответ.",
    ];
    return lines.join("\n");
  }

  async function copyPlan() {
    try {
      await navigator.clipboard.writeText(planText());
      setStatus({ type: "ok", text: "План скопирован — можно вставить в заметки." });
    } catch {
      setStatus({ type: "error", text: "Браузер не разрешил копирование. Скачайте файл." });
    }
  }

  function downloadPlan() {
    const blob = new Blob([planText()], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `devcompass-${kind}.md`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setStatus({ type: "ok", text: "Файл с планом скачан." });
  }

  function savePlan() {
    const plan: SavedPlan = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
      project: project.label,
      experience: experienceOptions[experience].label,
      features: featureLabels as string[],
      tools: recommendation.tools.map((tool) => ({
        name: tool.name,
        role: tool.role,
      })),
      notes: recommendation.notes,
      plan: recommendation.plan,
    };
    const ok = writePlans([plan, ...readPlans()]);
    setStatus(
      ok
        ? { type: "ok", text: "План сохранён в «Мои планы».", saved: true }
        : { type: "error", text: "Не удалось сохранить план в этом браузере." },
    );
  }

  function restart() {
    setKind("website");
    setExperience(0);
    setSelected([]);
    setStep(0);
    setStatus(null);
    window.requestAnimationFrame(() => {
      wizardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  const asideNote =
    step === 0
      ? {
          title: "С чего начать",
          text: "Выберите направление — от него зависит, какие инструменты вообще имеют смысл.",
        }
      : step === 1
        ? {
            title: "Функции добавляют инструменты",
            text: "Отмечайте только то, что действительно нужно в первой версии. Остальное можно добавить позже.",
          }
        : {
            title: "Это стартовая точка",
            text: "Набор можно менять: инструменты в каталоге показаны с контекстом, когда их выбирают.",
          };

  return (
    <div className="wizard" ref={wizardRef} id="wizard">
      <div className="wizard-head">
        <div className="steps" aria-label="Этапы подбора">
          {stepNames.map((name, index) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {index > 0 && <span className="step-line" aria-hidden="true" />}
              <div
                className={`step ${step === index ? "active" : ""} ${
                  step > index ? "done" : ""
                }`}
                aria-current={step === index ? "step" : undefined}
              >
                <span className="step-num">{step > index ? "✓" : `0${index + 1}`}</span>
                <span className="step-label">{name}</span>
              </div>
            </div>
          ))}
        </div>
        <span className="wizard-progress">
          {step === 2 ? "Готово" : `Шаг ${step + 1} из 2`}
        </span>
      </div>

      <div className="wizard-body">
        <div className="wizard-main">
          {step === 0 && (
            <div>
              <div className="step-title">
                <h3>Что вы хотите создать?</h3>
                <span>Выберите одно направление</span>
              </div>
              <div className="choice-grid" role="group" aria-label="Тип проекта">
                {projects.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`choice ${kind === item.id ? "selected" : ""}`}
                    aria-pressed={kind === item.id}
                    onClick={() => chooseKind(item.id)}
                  >
                    <span className="choice-mark" aria-hidden="true">
                      {item.mark}
                    </span>
                    <span>
                      <strong>{item.label}</strong>
                      <small>{item.detail}</small>
                    </span>
                    <span className="choice-check" aria-hidden="true">
                      ✓
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <div className="step-title">
                <h3>Расскажите о себе и проекте</h3>
                <span>Это уточнит рекомендацию</span>
              </div>

              <div className="sub-block" style={{ marginTop: 0, paddingTop: 0, borderTop: 0 }}>
                <div className="sub-block-head">
                  <h4>Насколько вы опытны?</h4>
                  <span>Выберите уровень</span>
                </div>
                <div className="experience-grid" role="group" aria-label="Уровень опыта">
                  {experienceOptions.map((option, index) => (
                    <button
                      key={option.label}
                      type="button"
                      className={`exp ${experience === index ? "selected" : ""}`}
                      aria-pressed={experience === index}
                      onClick={() => {
                        setExperience(index);
                        setStatus(null);
                      }}
                    >
                      <strong>{option.label}</strong>
                      <span>{option.hint}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="sub-block">
                <div className="sub-block-head">
                  <h4>Что будет в проекте?</h4>
                  <span>Можно выбрать несколько</span>
                </div>
                <div className="feature-grid" role="group" aria-label="Функции проекта">
                  {features
                    .filter((feature) => availableFeatures.includes(feature.id))
                    .map((feature) => {
                      const isSelected = selected.includes(feature.id);
                      return (
                        <button
                          key={feature.id}
                          type="button"
                          className={`feature ${isSelected ? "selected" : ""}`}
                          aria-pressed={isSelected}
                          onClick={() => toggleFeature(feature.id)}
                        >
                          <span className="fi-check" aria-hidden="true">
                            ✓
                          </span>
                          {feature.label}
                          <small>{feature.hint}</small>
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="result-head">
                <span className="result-badge" aria-hidden="true">
                  ✓
                </span>
                <div>
                  <h3>Стек для проекта «{project.label}»</h3>
                  <p className="result-sub">
                    {recommendation.tools.length}{" "}
                    {plural(
                      recommendation.tools.length,
                      "инструмент",
                      "инструмента",
                      "инструментов",
                    )}{" "}
                    · {experienceOptions[experience].label.toLowerCase()} ·{" "}
                    {featureLabels.length
                      ? `учтено функций: ${featureLabels.length}`
                      : "без дополнительных функций"}
                  </p>
                </div>
              </div>

              <div className="result-grid">
                <div className="stack-list">
                  {recommendation.tools.map((tool) => (
                    <article className="stack-item" key={tool.id}>
                      <span className={`tool-mark tone-${tool.tone}`} aria-hidden="true">
                        {tool.mark}
                      </span>
                      <div className="stack-copy">
                        <div className="tool-name">{tool.name}</div>
                        <div className="tool-role">{tool.role}</div>
                        <p className="stack-why">{tool.why}</p>
                        <a
                          className="stack-docs"
                          href={tool.docs}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Документация ↗
                        </a>
                      </div>
                    </article>
                  ))}
                </div>

                <aside className="result-aside">
                  <div className="reason-block">
                    <h4>Почему так</h4>
                    <ul className="reason-list">
                      {recommendation.notes.map((note) => (
                        <li key={note}>{note}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="reason-block">
                    <h4>С чего начать</h4>
                    <ol className="plan-list">
                      {recommendation.plan.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ol>
                  </div>
                </aside>
              </div>

              <div className="result-actions">
                <button type="button" className="btn btn-dark" onClick={copyPlan}>
                  Скопировать план
                </button>
                <button type="button" className="btn btn-ghost" onClick={downloadPlan}>
                  Скачать .md
                </button>
                <button type="button" className="btn btn-accent" onClick={savePlan}>
                  Сохранить в мои планы
                </button>
                <span className="spacer" />
                <button type="button" className="btn btn-ghost" onClick={() => go(1)}>
                  Изменить ответы
                </button>
                <span className="save-note" role="status" aria-live="polite">
                  {status?.text}{" "}
                  {status?.saved && (
                    <Link href="/saved" style={{ textDecoration: "underline" }}>
                      Открыть мои планы →
                    </Link>
                  )}
                </span>
              </div>
            </div>
          )}
        </div>

        <aside className="wizard-aside" aria-label="Ваш выбор">
          <span className="aside-label">Ваш выбор</span>
          <div className="aside-summary">
            <div className="summary-row">
              <span>Проект</span>
              <strong>{project.label}</strong>
            </div>
            <div className="summary-row">
              <span>Опыт</span>
              <strong>{experienceOptions[experience].label}</strong>
            </div>
            <div className="summary-row">
              <span>Функции</span>
              <strong>
                {featureLabels.length ? featureLabels.join(", ") : "не выбраны"}
              </strong>
            </div>
            <div className="summary-row">
              <span>В подборке</span>
              <strong>
                {recommendation.tools.length}{" "}
                {plural(recommendation.tools.length, "инструмент", "инструмента", "инструментов")}
              </strong>
            </div>
          </div>
          <div className="aside-note">
            <strong>{asideNote.title}</strong>
            {asideNote.text}
          </div>
        </aside>
      </div>

      <div className="wizard-foot">
        <span className="wizard-hint">
          {step === 2
            ? "Это стартовая точка, а не единственный верный ответ."
            : step === 0
              ? "Набор подстраивается под выбранное направление."
              : "Функции можно не выбирать — набор останется рабочим."}
        </span>
        <div className="wizard-nav">
          {step > 0 && step < 2 && (
            <button type="button" className="btn btn-ghost" onClick={() => go(step - 1)}>
              Назад
            </button>
          )}
          {step < 2 ? (
            <button type="button" className="btn btn-dark" onClick={() => go(step + 1)}>
              {step === 0 ? "Далее" : "Показать стек"} <span className="arrow">→</span>
            </button>
          ) : (
            <button type="button" className="btn btn-ghost btn-sm" onClick={restart}>
              Начать заново
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
