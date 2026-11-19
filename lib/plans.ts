export type SavedPlan = {
  id: string;
  createdAt: string;
  project: string;
  experience: string;
  features: string[];
  kind?: string;
  experienceIndex?: number;
  featureIds?: string[];
  tools: { name: string; role: string }[];
  notes: string[];
  plan: string[];
};

export const PLANS_KEY = "devcompass.plans";
const EMPTY: SavedPlan[] = [];
const listeners = new Set<() => void>();
let cachedRaw: string | undefined;
let cachedPlans: SavedPlan[] = EMPTY;

function parsePlans(raw: string | null): SavedPlan[] {
  if (!raw) return EMPTY;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter(
          (item): item is SavedPlan => Boolean(item) && typeof item === "object",
        )
      : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function readPlans(): SavedPlan[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    return parsePlans(window.localStorage.getItem(PLANS_KEY));
  } catch {
    return EMPTY;
  }
}

export function subscribePlans(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getPlansSnapshot(): SavedPlan[] {
  if (typeof window === "undefined") return EMPTY;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(PLANS_KEY);
  } catch {
    raw = null;
  }
  const key = raw ?? "";
  if (key !== cachedRaw) {
    cachedRaw = key;
    cachedPlans = parsePlans(raw);
  }
  return cachedPlans;
}

export function getPlansServerSnapshot(): SavedPlan[] {
  return EMPTY;
}

export function writePlans(plans: SavedPlan[]) {
  if (typeof window === "undefined") return false;
  const next = plans.slice(0, 24);
  const raw = JSON.stringify(next);
  try {
    window.localStorage.setItem(PLANS_KEY, raw);
    cachedRaw = raw;
    cachedPlans = next;
    listeners.forEach((listener) => listener());
    return true;
  } catch {
    return false;
  }
}

export function formatPlanDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
