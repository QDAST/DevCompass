"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="DevCompass — на главную">
      <span className="brand-mark" aria-hidden="true">
        ✳
      </span>
      <span>
        dev<span style={{ color: "var(--muted)", fontWeight: 500 }}>compass</span>
      </span>
    </Link>
  );
}

const links = [
  { href: "/#how", label: "Как это работает", match: null },
  { href: "/catalog", label: "Каталог", match: "/catalog" },
  { href: "/saved", label: "Мои планы", match: "/saved" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        Перейти к содержимому
      </a>
      <div className="container header-inner">
        <Brand />
        <nav className="nav" aria-label="Основная навигация">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={link.match && pathname === link.match ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link className="btn btn-dark btn-sm" href="/#builder">
            Подобрать стек
          </Link>
        </div>
      </div>
    </header>
  );
}
