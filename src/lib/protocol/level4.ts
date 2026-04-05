import type { Level } from "../types";
import { ex } from "./helpers";

export const LEVEL_4: Level = {
  number: 4,
  name: "DISCIPEL",
  day_range: [301, 400],
  total_minutes: 60,
  focus: "Forfina och dominera",
  quote: "Mastaren har misslyckats fler ganger an nyborjaren ens har forsokt.",
  color: "#6B3A6B",
  blocks: [
    {
      id: "uppvaknande",
      name: "Uppvaknande",
      exercises: [
        ex("l4-uppvaknande-cold-shower", "Kall dusch 2+ min", "—", "—", "Hardning, mental styrka", 120),
        ex("l4-uppvaknande-box-breathing", "Box breathing: 4s in, 4s hall, 4s ut, 4s hall — 10 cykler", "10 cykler", "—", "Andningskontroll, fokus"),
        ex("l4-uppvaknande-intentions", "Satt tre intentioner: kropp, sinne, handling", "—", "—", "Mental klarhet"),
      ],
    },
    {
      id: "qigong",
      name: "Qigong",
      exercises: [
        ex("l4-qigong-eight-treasures", "Eight Treasures, 8 reps, langsamt tempo", "8 per rorelse", "—", "Helkropp, meditativt", 480),
        ex("l4-qigong-zhan-zhuang", "Zhan Zhuang 8 min", "8 min", "—", "Djup rotning, inre kraft", 480),
      ],
    },
    {
      id: "rorlighet",
      name: "Rorlighet & Yoga",
      exercises: [
        ex("l4-rorlighet-sun-salutation", "Sol-halsning A + B + C", "3+2+2", "—", "Helkropp"),
        ex("l4-rorlighet-king-pigeon", "King Pigeon (Eka Pada Rajakapotasana)", "60 sek/sida", "—", "Djup hoft + rygg", 120),
        ex("l4-rorlighet-split-progression", "Sittande spagat-progression", "90 sek", "—", "Mal: full spagat", 90),
        ex("l4-rorlighet-full-bridge", "Full bro med hall", "3 x 20 sek", "—", "Mobilitet", 20),
        ex("l4-rorlighet-crocodile-twist", "Krokodil-twist (djup)", "60 sek/sida", "—", "Rygg, detox", 120),
      ],
    },
    {
      id: "styrka",
      name: "Styrka",
      exercises: [
        ex("l4-styrka-ma-bu", "Ma Bu", "5 min (sammantaget)", "Fritt", "Mental stalkraft", 300),
        ex("l4-styrka-hspu", "Handstaende armhavning (mot vagg)", "4 x 5", "45 sek", "Axlar, hela kroppen"),
        ex("l4-styrka-pistol-squats", "Pistol squats (fria)", "3 x 5/sida", "45 sek", "Enbensstyrka"),
        ex("l4-styrka-muscle-up", "Muscle-up progression / pull-ups", "4 x max", "60 sek", "Rygg, biceps"),
        ex("l4-styrka-l-sit", "L-sit hall", "3 x 15 sek", "30 sek", "Core, hoftbojare", 15),
        ex("l4-styrka-dragon-flags", "Dragon flags / toes to bar", "3 x 6", "30 sek", "Core-dominans"),
      ],
    },
    {
      id: "kondition",
      name: "Kondition & Explosivitet",
      exercises: [
        ex("l4-kondition-tabata", "Tabata (valfri ovning)", "4 min (20/10 x 8)", "Inbyggd", "Max kapacitet", 240),
        ex("l4-kondition-box-jumps", "Box jumps / hoga hoppknaboj", "4 x 8", "30 sek", "Explosivitet"),
        ex("l4-kondition-sprint-intervals", "Sprintintervaller (15/45)", "8 rundor", "Inbyggd", "Anaerob topp", 480),
      ],
    },
    {
      id: "avslutning",
      name: "Avslutning",
      exercises: [
        ex("l4-avslutning-zazen", "5 min Zazen-meditation", "5 min", "—", "Djup stillhet", 300),
        ex("l4-avslutning-log", "3 min reflektion och logg", "3 min", "—", "Reflektion", 180),
      ],
    },
  ],
};
