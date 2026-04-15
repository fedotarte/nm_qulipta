export interface WebinarSlide {
  id: string;
  title: string;
  speakerName: string;
  speakerBio: string;
  previewImage: string;
  speakerImage: string;
  style: "orange" | "blue";
  videoUrl?: string;
}

export const webinarSlides: WebinarSlide[] = [
  {
    id: "1",
    title: "«Продолжительность терапии мигрени: почему важна комплаентность?»",
    speakerName: "Скоробогатых Кирилл Владимирович",
    speakerBio:
      "к.м.н., руководитель «Университетской клиники головной боли», член образовательного комитета Международного общества головной боли",
    previewImage: "/webinars/slide-1.png",
    speakerImage: "/webinars/speaker-kv.png",
    style: "orange",
  },
  {
    id: "2",
    title:
      "«Ключ к CGRP шифру» из симпозиума на XI конференции «Лечение головной боли: теория и практика»",
    speakerName: "Скоробогатых Кирилл Владимирович",
    speakerBio:
      "к.м.н., руководитель «Университетской клиники головной боли», член образовательного комитета Международного общества головной боли",
    previewImage: "/webinars/slide-2.png",
    speakerImage: "/webinars/speaker-kv.png",
    style: "blue",
  },
  {
    id: "3",
    title: "Практическое применение Кьюлипты: разбор эффективных стратегий",
    speakerName: "Артёменко Ада Равильевна",
    speakerBio:
      "д.м.н., профессор кафедры нервных болезней ИПО Первый МГМУ им. И.М. Сеченова",
    previewImage: "/webinars/slide-3.png",
    speakerImage: "/webinars/speaker-ar.png",
    style: "orange",
  },
  {
    id: "4",
    title:
      "«PROGRESS в менеджменте хронической мигрени» из симпозиума на XI конференции «Лечение головной боли: теория и практика»",
    speakerName: "Латышева Нина Владимировна",
    speakerBio:
      "невролог, д.м.н., ИПО Первый МГМУ им. И.М. Сеченова, Клиника головной боли и вегетативных расстройств им. акад. А. Вейна",
    previewImage: "/webinars/slide-4.png",
    speakerImage: "/webinars/speaker-nv.png",
    style: "blue",
  },
];
