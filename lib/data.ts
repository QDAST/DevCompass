export type ToolTone =
  | "lime"
  | "blue"
  | "purple"
  | "orange"
  | "ink"
  | "green"
  | "red";

export type CategoryId =
  | "frontend"
  | "backend"
  | "data"
  | "mobile"
  | "game"
  | "tools"
  | "infra";

export type ProjectKind = "website" | "store" | "mobile" | "game" | "bot" | "data";

export type Tool = {
  id: string;
  name: string;
  mark: string;
  tone: ToolTone;
  role: string;
  why: string;
  docs: string;
  category: CategoryId;
  short: string;
  when: string;
};

export const categories: { id: CategoryId; label: string }[] = [
  { id: "frontend", label: "Фронтенд" },
  { id: "backend", label: "Бэкенд" },
  { id: "data", label: "Данные" },
  { id: "mobile", label: "Мобильные" },
  { id: "game", label: "Игры" },
  { id: "tools", label: "Инструменты" },
  { id: "infra", label: "Инфраструктура" },
];

export const tools: Tool[] = [
  {
    id: "nextjs",
    name: "Next.js",
    mark: "N",
    tone: "ink",
    role: "Каркас сайта",
    why: "Берёт на себя страницы, маршрутизацию и серверную часть. Меньше склеивания библиотек на старте — можно сразу делать продукт.",
    docs: "https://nextjs.org/docs",
    category: "frontend",
    short: "React-фреймворк для сайтов и веб-приложений",
    when: "Нужен сайт с несколькими страницами, формами или личным кабинетом.",
  },
  {
    id: "typescript",
    name: "TypeScript",
    mark: "TS",
    tone: "blue",
    role: "Надёжный код",
    why: "Подсказывает ошибки прямо в редакторе. Для новичка это как проверка орфографии, только для кода.",
    docs: "https://www.typescriptlang.org/docs/",
    category: "frontend",
    short: "JavaScript с типами и подсказками",
    when: "Хотите меньше случайных ошибок и понятнее читать чужой код.",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    mark: "TW",
    tone: "lime",
    role: "Стили интерфейса",
    why: "Стили пишутся рядом с разметкой. Не нужно придумывать имена классов и держать отдельные CSS-файлы.",
    docs: "https://tailwindcss.com/docs",
    category: "frontend",
    short: "Утилиты для вёрстки без отдельных CSS-файлов",
    when: "Нужно быстро собрать аккуратный интерфейс.",
  },
  {
    id: "react",
    name: "React",
    mark: "RE",
    tone: "blue",
    role: "Интерфейс из компонентов",
    why: "Позволяет собирать интерфейс из переиспользуемых кусочков. Большое сообщество — на любой вопрос уже есть ответ.",
    docs: "https://react.dev",
    category: "frontend",
    short: "Библиотека компонентов для интерфейсов",
    when: "Интерфейс часто меняется и состоит из повторяющихся блоков.",
  },
  {
    id: "astro",
    name: "Astro",
    mark: "AS",
    tone: "orange",
    role: "Быстрые контентные сайты",
    why: "Отдаёт почти статические страницы и грузит JavaScript только там, где он нужен. Идеален для блога или документации.",
    docs: "https://docs.astro.build",
    category: "frontend",
    short: "Фреймворк для контентных сайтов с быстрой загрузкой",
    when: "Главное — контент: блог, лендинг, документация.",
  },
  {
    id: "vercel",
    name: "Vercel",
    mark: "▲",
    tone: "ink",
    role: "Публикация сайта",
    why: "Публикует проект одной командой и выдаёт ссылку. Бесплатного тарифа хватает для учебного проекта.",
    docs: "https://vercel.com/docs",
    category: "infra",
    short: "Хостинг для фронтенда с деплоем из Git",
    when: "Нужно быстро выложить сайт в интернет без настройки серверов.",
  },
  {
    id: "supabase",
    name: "Supabase",
    mark: "SB",
    tone: "green",
    role: "Данные и аккаунты",
    why: "База данных, вход через почту или Google и файлы в одном сервисе. Готовый бэкенд без написания сервера.",
    docs: "https://supabase.com/docs",
    category: "backend",
    short: "База данных, авторизация и хранилище в одном сервисе",
    when: "Нужны пользователи, сохранённые данные и не хочется писать бэкенд.",
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    mark: "PG",
    tone: "blue",
    role: "База данных",
    why: "Проверенная база для товаров, заказов и пользователей. Если проект вырастет, переезжать никуда не придётся.",
    docs: "https://www.postgresql.org/docs/",
    category: "backend",
    short: "Надёжная реляционная база данных",
    when: "Данные важны и должны быть согласованы: заказы, платежи, склад.",
  },
  {
    id: "sqlite",
    name: "SQLite",
    mark: "SQ",
    tone: "purple",
    role: "Простое хранилище",
    why: "База в одном файле, без установки сервера. Хороший способ начать без лишней инфраструктуры.",
    docs: "https://www.sqlite.org/docs.html",
    category: "data",
    short: "Лёгкая база данных в одном файле",
    when: "Проект небольшой или работает на одном устройстве.",
  },
  {
    id: "stripe",
    name: "Stripe",
    mark: "S",
    tone: "purple",
    role: "Приём платежей",
    why: "Готовые платёжные формы и нормальная документация. Не нужно хранить данные карт у себя.",
    docs: "https://stripe.com/docs",
    category: "backend",
    short: "Платёжные формы и подписки",
    when: "Проект должен принимать деньги.",
  },
  {
    id: "clerk",
    name: "Clerk",
    mark: "CL",
    tone: "purple",
    role: "Вход и профили",
    why: "Готовые экраны входа, регистрации и профиля. Не нужно самостоятельно писать авторизацию.",
    docs: "https://clerk.com/docs",
    category: "backend",
    short: "Готовая авторизация и профили пользователей",
    when: "Нужны аккаунты, но не хочется строить авторизацию.",
  },
  {
    id: "nodejs",
    name: "Node.js",
    mark: "JS",
    tone: "green",
    role: "Среда для бота",
    why: "Позволяет писать серверную часть на JavaScript — тот же язык, что и в интерфейсе. Не нужно учить второй язык сразу.",
    docs: "https://nodejs.org/docs/latest/api/",
    category: "backend",
    short: "Среда выполнения JavaScript вне браузера",
    when: "Нужны скрипты, боты или собственный бэкенд.",
  },
  {
    id: "telegraf",
    name: "Telegraf",
    mark: "TG",
    tone: "blue",
    role: "Основа Telegram-бота",
    why: "Библиотека для ботов с понятными примерами. Большинство задач решаются десятком строк.",
    docs: "https://telegraf.js.org/",
    category: "backend",
    short: "Библиотека для Telegram-ботов на Node.js",
    when: "Делаете Telegram-бота и хотите быстро получить рабочий результат.",
  },
  {
    id: "python",
    name: "Python",
    mark: "PY",
    tone: "blue",
    role: "Язык анализа",
    why: "Простой синтаксис и главные библиотеки для данных. Лучший вход в аналитику и машинное обучение.",
    docs: "https://docs.python.org/3/",
    category: "data",
    short: "Язык программирования для данных и автоматизации",
    when: "Работаете с таблицами, графиками или ML.",
  },
  {
    id: "pandas",
    name: "Pandas",
    mark: "PD",
    tone: "purple",
    role: "Обработка таблиц",
    why: "Фильтры, группировки и очистка данных в несколько строк. Заменяет десятки формул в Excel.",
    docs: "https://pandas.pydata.org/docs/",
    category: "data",
    short: "Таблицы и обработка данных на Python",
    when: "Нужно загрузить, почистить и проанализировать данные.",
  },
  {
    id: "jupyter",
    name: "Jupyter",
    mark: "JN",
    tone: "orange",
    role: "Эксперименты",
    why: "Позволяет запускать код по частям и сразу видеть результат. Удобно исследовать данные и проверять гипотезы.",
    docs: "https://jupyter.org/documentation",
    category: "data",
    short: "Блокноты для исследования данных",
    when: "Вы только изучаете данные и хотите видеть результат шаг за шагом.",
  },
  {
    id: "streamlit",
    name: "Streamlit",
    mark: "ST",
    tone: "red",
    role: "Дашборд",
    why: "Из Python-скрипта делает интерактивную страницу с графиками. Не нужно учить фронтенд.",
    docs: "https://docs.streamlit.io",
    category: "data",
    short: "Интерактивные дашборды из Python-скрипта",
    when: "Нужно показать результаты анализа коллегам или заказчику.",
  },
  {
    id: "duckdb",
    name: "DuckDB",
    mark: "DB",
    tone: "orange",
    role: "Аналитическая база",
    why: "Быстро считает по большим таблицам прямо на ноутбуке. SQL без поднятия сервера.",
    docs: "https://duckdb.org/docs/",
    category: "data",
    short: "Встроенная аналитическая база данных",
    when: "Данных много, они лежат в CSV или Parquet.",
  },
  {
    id: "kafka",
    name: "Kafka",
    mark: "KF",
    tone: "ink",
    role: "Потоки событий",
    why: "Передаёт события между сервисами без потерь. Пригодится, когда данных слишком много для простого скрипта.",
    docs: "https://kafka.apache.org/documentation/",
    category: "data",
    short: "Потоковая передача событий",
    when: "Данные идут непрерывно из нескольких источников.",
  },
  {
    id: "react-native",
    name: "React Native",
    mark: "RN",
    tone: "blue",
    role: "Приложение для iOS и Android",
    why: "Один код на две платформы. Если знаете React, большую часть приложения напишете сразу.",
    docs: "https://reactnative.dev/docs/getting-started",
    category: "mobile",
    short: "Мобильные приложения на React",
    when: "Нужно приложение сразу для iPhone и Android.",
  },
  {
    id: "expo",
    name: "Expo",
    mark: "EX",
    tone: "ink",
    role: "Запуск и сборка",
    why: "Даёт готовое окружение и предпросмотр на телефоне без настройки Xcode и Android Studio.",
    docs: "https://docs.expo.dev",
    category: "mobile",
    short: "Платформа для сборки приложений на React Native",
    when: "Хотите быстро увидеть приложение на своём телефоне.",
  },
  {
    id: "revenuecat",
    name: "RevenueCat",
    mark: "RC",
    tone: "purple",
    role: "Покупки в приложении",
    why: "Упрощает подписки и покупки в App Store и Google Play. Не нужно разбираться с биллингом каждой платформы.",
    docs: "https://www.revenuecat.com/docs",
    category: "mobile",
    short: "Подписки и покупки внутри мобильного приложения",
    when: "Приложение должно зарабатывать на подписках.",
  },
  {
    id: "godot",
    name: "Godot",
    mark: "GD",
    tone: "green",
    role: "Игровой движок",
    why: "Бесплатный движок, который нормально работает на слабом ноутбуке. Подходит для 2D и небольших 3D-проектов.",
    docs: "https://docs.godotengine.org/",
    category: "game",
    short: "Бесплатный движок для 2D и 3D игр",
    when: "Делаете игру и хотите бесплатный движок без лицензий.",
  },
  {
    id: "gdscript",
    name: "GDScript",
    mark: "GS",
    tone: "blue",
    role: "Логика игры",
    why: "Язык движка Godot, похожий на Python. Не нужно учить C++ для первой игры.",
    docs: "https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/",
    category: "game",
    short: "Скриптовый язык Godot",
    when: "Пишете игровую логику в Godot.",
  },
  {
    id: "aseprite",
    name: "Aseprite",
    mark: "AP",
    tone: "orange",
    role: "Графика",
    why: "Редактор пиксельной графики и анимации. Персонаж и тайлы делаются за один вечер.",
    docs: "https://www.aseprite.org/docs/",
    category: "game",
    short: "Редактор пиксельной графики и анимации",
    when: "Игра в пиксельном стиле или нужны простые спрайты.",
  },
  {
    id: "github",
    name: "GitHub",
    mark: "GH",
    tone: "ink",
    role: "Хранение кода",
    why: "История изменений, резервная копия и портфолио в одном месте. Работодатели смотрят сюда.",
    docs: "https://docs.github.com/",
    category: "tools",
    short: "Хранилище кода и совместная работа",
    when: "Всегда: даже личный проект стоит держать в репозитории.",
  },
  {
    id: "figma",
    name: "Figma",
    mark: "FG",
    tone: "purple",
    role: "Макеты интерфейса",
    why: "Позволяет сначала набросать экраны, а потом верстать. Экономит переделки.",
    docs: "https://help.figma.com/",
    category: "tools",
    short: "Редактор макетов и прототипов",
    when: "Нужно продумать интерфейс до вёрстки.",
  },
  {
    id: "docker",
    name: "Docker",
    mark: "DK",
    tone: "blue",
    role: "Одинаковое окружение",
    why: "Проект запускается одинаково на любом компьютере. Проблема «у меня работает» уходит.",
    docs: "https://docs.docker.com/",
    category: "infra",
    short: "Контейнеры для запуска приложений",
    when: "Проект вырос и нужно развернуть его на сервере.",
  },
  {
    id: "redis",
    name: "Redis",
    mark: "RD",
    tone: "red",
    role: "Быстрые данные",
    why: "Хранит данные в памяти: счётчики, очереди, кэш. Пригодится, когда обычной базы начинает не хватать.",
    docs: "https://redis.io/docs/",
    category: "backend",
    short: "Быстрое хранилище в памяти",
    when: "Нужны очереди, кэш или обновления в реальном времени.",
  },
  {
    id: "pusher",
    name: "Pusher",
    mark: "PS",
    tone: "blue",
    role: "Живые обновления",
    why: "Отправляет события в браузер без перезагрузки страницы. Подходит для чатов и уведомлений.",
    docs: "https://pusher.com/docs/",
    category: "backend",
    short: "Realtime-события для веб-приложений",
    when: "Нужны чат, уведомления или живые статусы.",
  },
  {
    id: "nakama",
    name: "Nakama",
    mark: "NK",
    tone: "green",
    role: "Сетевая игра",
    why: "Готовые комнаты, матчмейкинг и лидерборды. Не нужно писать сетевой код с нуля.",
    docs: "https://heroiclabs.com/docs/nakama/",
    category: "game",
    short: "Сервер для многопользовательских игр",
    when: "В игре есть совместные матчи или рейтинги.",
  },
];

export const toolMap = new Map(tools.map((tool) => [tool.id, tool]));

export const projects: {
  id: ProjectKind;
  label: string;
  detail: string;
  mark: string;
  plan: string[];
}[] = [
  {
    id: "website",
    label: "Сайт или сервис",
    detail: "Лендинг, блог, веб-приложение",
    mark: "С",
    plan: [
      "Создайте каркас проекта и главную страницу.",
      "Соберите один главный сценарий: от идеи до результата.",
      "Подключите данные и аккаунты, если они нужны.",
      "Опубликуйте сайт и покажите ссылку первым пользователям.",
    ],
  },
  {
    id: "store",
    label: "Интернет-магазин",
    detail: "Каталог, корзина и оплата",
    mark: "М",
    plan: [
      "Опишите 10–20 товаров и структуру каталога.",
      "Сделайте карточку товара и корзину.",
      "Подключите базу данных и тестовый режим оплаты.",
      "Проверьте путь покупателя от каталога до заказа.",
    ],
  },
  {
    id: "mobile",
    label: "Мобильное приложение",
    detail: "iOS и Android",
    mark: "П",
    plan: [
      "Соберите один экран с основной пользой приложения.",
      "Проверьте его на своём телефоне через Expo.",
      "Добавьте хранение данных и аккаунты.",
      "Соберите тестовую сборку и покажите друзьям.",
    ],
  },
  {
    id: "game",
    label: "Игра",
    detail: "2D или небольшой 3D-проект",
    mark: "И",
    plan: [
      "Сделайте игровой прототип: управление и одно препятствие.",
      "Добавьте персонажа, анимацию и звук.",
      "Настройте сохранения и меню.",
      "Соберите билд и дайте поиграть трём людям.",
    ],
  },
  {
    id: "bot",
    label: "Бот или автоматизация",
    detail: "Чат-боты и полезные скрипты",
    mark: "Б",
    plan: [
      "Опишите одну команду, которая сразу приносит пользу.",
      "Подключите бота к Telegram и проверьте в личном чате.",
      "Добавьте хранение данных и обработку ошибок.",
      "Ограничьте доступ и запустите бота на сервере.",
    ],
  },
  {
    id: "data",
    label: "Работа с данными",
    detail: "Аналитика, дашборды, ML",
    mark: "Д",
    plan: [
      "Соберите данные в одну таблицу и проверьте их качество.",
      "Ответьте на один главный вопрос с помощью графиков.",
      "Оформите выводы в интерактивный отчёт.",
      "Покажите результат тем, для кого он создан.",
    ],
  },
];

export const features: { id: string; label: string; hint: string }[] = [
  { id: "accounts", label: "Аккаунты", hint: "Вход и личные профили" },
  { id: "database", label: "База данных", hint: "Сохранение информации" },
  { id: "payments", label: "Оплата", hint: "Приём платежей" },
  { id: "realtime", label: "Realtime", hint: "Живые обновления" },
];

export const featuresByProject: Record<ProjectKind, string[]> = {
  website: ["accounts", "database", "payments", "realtime"],
  store: ["accounts", "realtime"],
  mobile: ["accounts", "database", "payments", "realtime"],
  game: ["database", "realtime"],
  bot: ["database", "realtime"],
  data: ["database", "realtime"],
};

export const experienceOptions: { label: string; hint: string }[] = [
  { label: "Первый проект", hint: "Пока разбираюсь" },
  { label: "Уже пробовал", hint: "Делал небольшие проекты" },
  { label: "Уверенный уровень", hint: "Работаю в IT" },
];

export type Recommendation = {
  tools: Tool[];
  notes: string[];
  plan: string[];
};

const picks = (...ids: string[]) => ids.map((id) => toolMap.get(id)!).filter(Boolean);

export function getRecommendation(
  kind: ProjectKind,
  experience: number,
  activeFeatures: string[],
): Recommendation {
  const has = (feature: string) => activeFeatures.includes(feature);
  let ids: string[] = [];
  const notes: string[] = [];

  switch (kind) {
    case "website":
      ids = ["nextjs", "typescript", "tailwind", "vercel"];
      if (has("accounts")) {
        ids[3] = "supabase";
        notes.push("Аккаунты и данные закрывает Supabase — отдельный сервер не нужен.");
      } else if (has("database") || has("realtime")) {
        ids[3] = "supabase";
        notes.push("Supabase даёт базу данных и обновления без собственного бэкенда.");
      }
      if (has("payments")) {
        ids.push("stripe");
        notes.push("Stripe добавит платёжную форму и тестовый режим оплаты.");
      }
      break;
    case "store":
      ids = ["nextjs", "typescript", "postgres", "stripe"];
      if (has("accounts")) {
        ids.push("clerk");
        notes.push("Clerk даст готовый вход и личный кабинет покупателя.");
      }
      if (has("realtime")) {
        ids.push("pusher");
        notes.push("Pusher обновит статус заказа без перезагрузки страницы.");
      }
      break;
    case "mobile":
      ids = ["react-native", "expo", "typescript", "supabase"];
      if (has("payments")) {
        ids.push("revenuecat");
        notes.push("RevenueCat упростит подписки в App Store и Google Play.");
      }
      break;
    case "game":
      ids = ["godot", "gdscript", "aseprite", "github"];
      if (has("database")) {
        ids.push("sqlite");
        notes.push("SQLite сохранит прогресс прямо на устройстве игрока.");
      }
      if (has("realtime")) {
        ids.push("nakama");
        notes.push("Nakama добавляет комнаты и матчмейкинг для сетевой игры.");
      }
      break;
    case "bot":
      ids = ["nodejs", "typescript", "telegraf", "sqlite"];
      if (has("realtime")) {
        ids.push("redis");
        notes.push("Redis пригодится для очередей и быстрых состояний.");
      }
      break;
    case "data":
      ids = ["python", "pandas", "jupyter", "streamlit"];
      if (has("database")) {
        ids.push("duckdb");
        notes.push("DuckDB быстро считает по большим таблицам прямо на ноутбуке.");
      }
      if (has("realtime")) {
        ids.push("kafka");
        notes.push("Kafka понадобится, если данные идут непрерывным потоком.");
      }
      break;
  }

  if (experience === 0) {
    notes.unshift("Этот набор стартует с готовых сервисов: меньше настроек и меньше шансов застрять.");
  } else if (experience === 1) {
    notes.unshift("Набор оставляет место для роста: каждый инструмент можно заменить, когда проект вырастет.");
  } else {
    notes.unshift("Набор без лишних абстракций: можно сразу настроить под свои привычки.");
  }

  const project = projects.find((item) => item.id === kind)!;
  return { tools: picks(...ids), notes, plan: project.plan };
}

export const catalogTools = [...tools].sort((a, b) => a.name.localeCompare(b.name, "ru"));
