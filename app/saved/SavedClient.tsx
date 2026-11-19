"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import {
  formatPlanDate,
  getPlansServerSnapshot,
  getPlansSnapshot,
  subscribePlans,
  writePlans,
} from "@/lib/plans";

export default function SavedClient() {
  const plans = useSyncExternalStore(
    subscribePlans,
    getPlansSnapshot,
    getPlansServerSnapshot,
  );

  function removePlan(id: string) {
    writePlans(plans.filter((plan) => plan.id !== id));
  }

  if (plans.length === 0) {
    return (
      <div className="empty-state">
        <h2>Пока пусто</h2>
        <p>
          Пройдите подбор и нажмите «Сохранить в мои планы» — подборка останется в этом
          браузере, без аккаунта.
        </p>
        <Link className="btn btn-accent" href="/#builder">
          Подобрать стек <span className="arrow">→</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="saved-grid">
      {plans.map((plan) => (
        <article className="saved-card" key={plan.id}>
          <div className="saved-top">
            <div>
              <h3>{plan.project}</h3>
              <p className="saved-date">{formatPlanDate(plan.createdAt)}</p>
            </div>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => removePlan(plan.id)}
            >
              Удалить
            </button>
          </div>
          <p className="saved-meta">
            {plan.experience}
            {plan.features.length > 0
              ? ` · функции: ${plan.features.join(", ")}`
              : " · без дополнительных функций"}
          </p>
          <div className="saved-tools">
            {plan.tools.map((tool) => (
              <span className="saved-tool" key={tool.name}>
                {tool.name}
              </span>
            ))}
          </div>
          <div className="saved-actions">
            <Link className="btn btn-dark btn-sm" href="/#builder">
              Собрать похожий
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
