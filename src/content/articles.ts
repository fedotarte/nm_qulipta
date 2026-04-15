export type ArticleStatus = "done" | "in_dev";

export interface ArticleConfig {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  status: ArticleStatus;
  icon?: string;
  /** Фоновое hero-изображение для главной страницы */
  heroImage?: string;
  /** Кастомная ссылка (например, на игру). Если не задано — используется /articles/{slug} */
  href?: string;
  /** Всегда доступен без авторизации (для квиза, игры и т.п.) */
  isAuthenticated?: boolean;
}

export const ARTICLES: ArticleConfig[] = [
  {
    id: "1",
    slug: "chronic-migraine",
    title: "Хроническая мигрень",
    subtitle:
      "\t1\tBuse DC, et al. Headache. 2019;59:1286-99.\n" +
      "\t2\tМигрень. Клинические рекомендации. Одобрены Научно-практическим Советом Минздрава РФ. Год утверждения 2024 https://cr.minzdrav.gov.ru/recomend/295",
    description:
      "Пациенты с хронической мигренью становятся заложниками своей болезни: Мигрень может негативно влиять на многие важные аспекты их жизни, включая брак, воспитание детей, романтические и семейные отношения, карьерные/финансовые достижения, а также общее состояние здоровья1. Именно поэтому они особенно нуждаются в таргетной превентивной терапии, способной воздействовать на патогенез заболевания2.",
    status: "done",
    icon: "/icons/book.svg",
    heroImage: "/pictures/hero-hover-chronic.png",
  },
  {
    id: "2",
    slug: "episodic-migraine",
    title: "Эпизодическая мигрень",
    description:
      "Эпизодическая мигрень лишает людей возможности строить планы, важные и семейные события могут оказаться под угрозой из-за внезапного приступа1. Мигрень также может создавать трудности в отношениях1. Поэтому помимо купирования приступов применяются профилактические методы лечения для снижения частоты и тяжести приступов2,3.",
    status: "done",
    icon: "/icons/book.svg",
    heroImage: "/pictures/hero-hover-episodic.png",
    isAuthenticated: true,
    subtitle:
      "1.Buse DC et al. Mayo Clin Proc 2016;91:596–611. 2  American Headache Society. The American Headache Society position statement on integrating new migraine treatments into clinical practice. Headache 2019; 59:1-18. 3  Мигрень. Клинические рекомендации. Одобрены Научно-практическим Советом Минздрава РФ. Год утверждения 2024 https://cr.minzdrav.gov.ru/recomend/295",
  },
  {
    id: "quiz",
    slug: "interactive-quiz",
    title: "Интерактивный квиз",
    description:
      "Поставьте верный диагноз и назначьте лечение пациентке с головной болью. Клинический разбор с Мариной Игоревной Корешкиной, доктором медицинских наук, членом Европейской академии неврологии и Российского общества головной боли.",
    status: "done",
    icon: "/icons/book.svg",
    heroImage: "/pictures/hero-hover-quiz.png",
    href: "/game/",
    isAuthenticated: true,
  },
  {
    id: "3",
    slug: "clinical-cases",
    title: "Клинические случаи",
    description: "Подборка клинических случаев по терапии мигрени.",
    status: "done",
    icon: "/icons/book.svg",
  },
  {
    id: "4",
    slug: "expert-answers",
    title: "Ответы экспертов",
    description:
      "Ответы экспертов на частые вопросы по терапии и ведению пациентов.",
    status: "done",
    icon: "/icons/book.svg",
    heroImage: "/pictures/hero_expert_answers.png",
  },
  {
    id: "5",
    slug: "webinar-recordings",
    title: "Записи вебинаров",
    description: "Архив записей вебинаров с экспертами.",
    status: "in_dev",
    icon: "/icons/book.svg",
  },
  {
    id: "6",
    slug: "library",
    title: "Библиотека",
    description: "База материалов, публикаций и методических документов.",
    status: "in_dev",
    icon: "/icons/book.svg",
  },
];
