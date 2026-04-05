import type { Level } from "../types";
import { ex } from "./helpers";

export const LEVEL_5: Level = {
  number: 5,
  name: "MUNK",
  day_range: [401, 500],
  total_minutes: 80,
  focus: "Masterskap och underhall",
  quote: "Nar du beharskar din kropp beharskar du ditt sinne. Nar du beharskar ditt sinne ar ingenting omojligt.",
  color: "#A33B3B",
  blocks: [
    {
      id: "uppvaknande",
      name: "Uppvaknande",
      exercises: [
        ex("l5-uppvaknande-ice-bath", "Isbad eller kall dusch 3+ min", "—", "—", "Extrem hardning", 180),
        ex("l5-uppvaknande-wim-hof", "20 Wim Hof-andetag + 2 min box breathing", "20 st + 2 min", "—", "Andning, energi", 120),
        ex("l5-uppvaknande-barefoot", "Sta barfota utomhus om mojligt", "—", "—", "Jordning, narvaro"),
      ],
    },
    {
      id: "qigong",
      name: "Qigong",
      exercises: [
        ex("l5-qigong-eight-treasures", "Full Eight Treasures, 12 reps, meditativt tempo", "12 per rorelse", "—", "Helkropp, djupt meditativt", 600),
        ex("l5-qigong-zhan-zhuang", "Zhan Zhuang 10 min i lag position", "10 min", "—", "Maximal rotning, jarnvilja", 600),
      ],
    },
    {
      id: "rorlighet",
      name: "Rorlighet & Yoga",
      exercises: [
        ex("l5-rorlighet-sun-flow", "Sol-halsning-flode (eget)", "5 min fritt flode", "—", "Rorelsekvalitet", 300),
        ex("l5-rorlighet-full-split", "Full spagat (hall)", "90 sek/sida", "—", "Total flexibilitet", 180),
        ex("l5-rorlighet-king-pigeon-scorpion", "King Pigeon + Scorpion", "60 sek/sida", "—", "Djupaste hoftoppning", 120),
        ex("l5-rorlighet-wheel", "Hjulstallning (Wheel) med hall", "3 x 30 sek", "—", "Rygg, axlar", 30),
        ex("l5-rorlighet-forward-fold", "Pannbenamning frambojning", "90 sek", "—", "Total bakre kedja", 90),
      ],
    },
    {
      id: "styrka",
      name: "Styrka",
      exercises: [
        ex("l5-styrka-ma-bu", "Ma Bu", "8+ min totalt", "Fritt", "Jarnviljans golvniva", 480),
        ex("l5-styrka-freestanding-handstand", "Fristaende handstaende (progression)", "5 x max hall", "60 sek", "Total kroppskontroll"),
        ex("l5-styrka-pistol-squats", "Pistol squats", "4 x 8/sida", "45 sek", "Ben-dominans"),
        ex("l5-styrka-finger-pushups", "Fingerarmhavningar (progression)", "3 x max", "45 sek", "Greppstyrka, senor"),
        ex("l5-styrka-muscle-ups", "Muscle-ups / explosiva pull-ups", "4 x max", "60 sek", "Helkropp dragning"),
        ex("l5-styrka-dragon-flags", "Dragon flags", "3 x 8", "30 sek", "Elitcore"),
      ],
    },
    {
      id: "kondition",
      name: "Kondition & Explosivitet",
      exercises: [
        ex("l5-kondition-run-or-tabata", "Lopning (5-10 km) ELLER Tabata x 2", "10-15 min", "—", "Aerob/anaerob topp", 900),
        ex("l5-kondition-jump-kicks", "Hoppkicks (mae geri-stil)", "4 x 6/sida", "30 sek", "Explosivitet + teknik"),
        ex("l5-kondition-burpee-tuck", "Burpee + tuck jump", "4 x 6", "30 sek", "Max power output"),
      ],
    },
    {
      id: "avslutning",
      name: "Avslutning",
      exercises: [
        ex("l5-avslutning-zazen", "8 min Zazen-meditation", "8 min", "—", "Djupaste stillhet", 480),
        ex("l5-avslutning-log", "2 min logg", "2 min", "—", "Reflektion", 120),
      ],
    },
  ],
};
