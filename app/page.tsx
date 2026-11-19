import Link from "next/link";
import HomeHero from "./components/HomeHero";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import Wizard from "./components/Wizard";

const howSteps = [
  {
    num: "01",
    title: "Выберите направление",
    text: "Сайт, магазин, приложение, игра, бот или аналитика. От ответа зависит, какие инструменты вообще имеют смысл.",
  },
  {
    num: "02",
    title: "Уточните опыт и функции",
    text: "Первый проект или уже есть опыт, нужны ли аккаунты, платежи и база данных. Это меняет не только набор, но и объяснение.",
  },
  {
    num: "03",
    title: "Получите стек и план",
    text: "Стартовый набор, причина выбора каждого инструмента и четыре первых шага. План можно скопировать, скачать или сохранить.",
  },
];

const catalogLayers = [
  { num: "01", title: "Языки и фреймворки", hint: "На чём писать" },
  { num: "02", title: "Данные и сервисы", hint: "Где хранить" },
  { num: "03", title: "Инструменты и хостинг", hint: "Как выпускать" },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <HomeHero />

        <section className="builder" id="builder">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow">
                  <span className="dot" /> Мастер подбора
                </span>
                <h2>Два вопроса — и стек готов</h2>
              </div>
              <p>
                Без анкет на двадцать полей. Только то, что действительно влияет на выбор
                технологий для первой версии проекта.
              </p>
            </div>
            <Wizard />
          </div>
        </section>

        <section className="section" id="how">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow">
                  <span className="dot" /> Как это работает
                </span>
                <h2>Короткий путь от идеи до старта</h2>
              </div>
              <p>
                Мы не составляем рейтинг популярности. Сопоставляем задачу с инструментами
                и объясняем логику выбора простыми словами.
              </p>
            </div>
            <div className="how-grid">
              {howSteps.map((step) => (
                <article className="how-card" key={step.num}>
                  <span className="how-num">{step.num}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="catalog-preview">
          <div className="container">
            <div className="catalog-teaser">
              <div>
                <span className="eyebrow">
                  <span className="dot" /> Каталог технологий
                </span>
                <h2>Не только стек — инструменты с контекстом</h2>
                <p>
                  Языки, базы данных, сервисы и хостинг: что решает каждый, когда его
                  выбирают и с чего начать изучение. Всё в одном спокойном списке.
                </p>
                <Link className="btn btn-accent" href="/catalog">
                  Открыть каталог <span className="arrow">→</span>
                </Link>
              </div>
              <div className="layer-list">
                {catalogLayers.map((layer) => (
                  <div className="layer" key={layer.num}>
                    <span>{layer.num}</span>
                    <strong style={{ flex: 1 }}>{layer.title}</strong>
                    <span>{layer.hint}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="cta-band">
          <div className="container">
            <div className="cta-inner">
              <div>
                <h2>Идея уже есть?</h2>
                <p>Давайте найдём для неё инструменты и первый шаг.</p>
              </div>
              <Link className="btn btn-dark btn-lg" href="#builder">
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
