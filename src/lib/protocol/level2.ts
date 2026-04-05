import type { Level } from "../types";
import { ex } from "./helpers";

export const LEVEL_2: Level = {
  number: 2,
  name: "LARJUNGE",
  day_range: [101, 200],
  total_minutes: 40,
  focus: "Bygg grund",
  quote: "Muskeln lyder sinnet. Sinnet lyder vanan. Vanan lyder dig.",
  color: "#2E6B8A",
  blocks: [
    {
      id: "uppvaknande",
      name: "Uppvaknande",
      exercises: [
        ex("l2-uppvaknande-cold-water", "Kallt vatten + 30 sek kall dusch (ben)", "—", "—", "Vakna upp, hardning", 30),
        ex("l2-uppvaknande-wim-hof", "15 Wim Hof-andetag", "15 st", "—", "Energi, syresattning"),
        ex("l2-uppvaknande-intention", "Satt intention", "—", "—", "Mental klarhet"),
      ],
    },
    {
      id: "qigong",
      name: "Qigong",
      exercises: [
        ex("l2-qigong-eight-treasures", "Fulla Eight Treasures, 8 reps per rorelse", "8 per rorelse", "—", "Helkropp, energiflode", 360),
        ex("l2-qigong-zhan-zhuang", "Zhan Zhuang — omfamna tradet", "2 min", "—", "Rotning, inre kraft", 120),
      ],
    },
    {
      id: "rorlighet",
      name: "Rorlighet & Yoga",
      exercises: [
        ex("l2-rorlighet-sun-salutation", "Sol-halsning A (Surya Namaskar)", "3 rundor", "—", "Helkropp, flode"),
        ex("l2-rorlighet-warrior", "Krigarstallning I + II", "30 sek per sida", "—", "Lar, hofter, balans", 60),
        ex("l2-rorlighet-pigeon", "Duva (Pigeon pose)", "45 sek per sida", "—", "Hoftbojare, rumpa", 90),
        ex("l2-rorlighet-spinal-twist", "Ryggradens vridning (liggande)", "30 sek per sida", "—", "Rygg, brostryggen", 60),
      ],
    },
    {
      id: "styrka",
      name: "Styrka",
      exercises: [
        ex("l2-styrka-ma-bu", "Ma Bu (fristaende)", "3 x 45 sek", "30 sek", "Lar, mental hardhet", 45),
        ex("l2-styrka-gong-bu", "Gong Bu (pilbagsstallning, hall)", "3 x 30 sek/sida", "20 sek", "Lar, hofter", 30),
        ex("l2-styrka-pushups", "Armhavningar (fulla)", "3 x 12", "30 sek", "Brost, triceps"),
        ex("l2-styrka-deep-squats", "Djupa knaboj", "3 x 15", "30 sek", "Lar, rorlighet"),
        ex("l2-styrka-plank", "Planka", "3 x 40 sek", "20 sek", "Core", 40),
        ex("l2-styrka-dips", "Dips (pa stol)", "3 x 10", "30 sek", "Triceps, axlar"),
      ],
    },
    {
      id: "kondition",
      name: "Kondition & Explosivitet",
      exercises: [
        ex("l2-kondition-jog", "Jogg / lopning", "4 min", "—", "Aerob bas", 240),
        ex("l2-kondition-jump-squats", "Hoppknaboj", "3 x 8", "30 sek", "Explosivitet"),
        ex("l2-kondition-clap-pushups", "Klapparmhavning (pa kna om nodvandigt)", "3 x 5", "30 sek", "Explosiv overkropp"),
        ex("l2-kondition-high-knees", "Hoga knan (snabb)", "3 x 20 sek", "20 sek", "Puls, koordination", 20),
      ],
    },
    {
      id: "avslutning",
      name: "Avslutning",
      exercises: [
        ex("l2-avslutning-meditation", "2 min sittande meditation", "2 min", "—", "Stillhet, aterhamtning", 120),
        ex("l2-avslutning-log", "Skriv i loggen: vad du gjorde, svaraste ovningen, mal for morgondagen", "—", "—", "Reflektion"),
      ],
    },
  ],
};
