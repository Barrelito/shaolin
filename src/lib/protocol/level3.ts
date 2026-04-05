import type { Level } from "../types";
import { ex } from "./helpers";

export const LEVEL_3: Level = {
  number: 3,
  name: "KRIGARE",
  day_range: [201, 300],
  total_minutes: 50,
  focus: "Harda kroppen",
  quote: "Den som overvinner andra ar stark. Den som overvinner sig sjalv ar maktig.",
  color: "#8B4513",
  blocks: [
    {
      id: "uppvaknande",
      name: "Uppvaknande",
      exercises: [
        ex("l3-uppvaknande-cold-shower", "Full kall dusch, 60 sek minimum", "—", "—", "Hardning, mental styrka", 60),
        ex("l3-uppvaknande-wim-hof", "15 Wim Hof-andetag", "15 st", "—", "Energi, syresattning"),
        ex("l3-uppvaknande-intention", "Satt intention hogt", "—", "—", "Mental klarhet"),
      ],
    },
    {
      id: "qigong",
      name: "Qigong",
      exercises: [
        ex("l3-qigong-eight-treasures", "Eight Treasures, 8 reps", "8 per rorelse", "—", "Helkropp, energiflode", 420),
        ex("l3-qigong-zhan-zhuang", "Zhan Zhuang 5 min", "5 min", "—", "Rotning, inre kraft", 300),
      ],
    },
    {
      id: "rorlighet",
      name: "Rorlighet & Yoga",
      exercises: [
        ex("l3-rorlighet-sun-salutation", "Sol-halsning A + B", "3+2 rundor", "—", "Helkropp, varme"),
        ex("l3-rorlighet-deep-lunge-rotation", "Djup utfallssteg med rotation", "45 sek/sida", "—", "Brostrygg, hofter", 90),
        ex("l3-rorlighet-pigeon", "Full Pigeon pose", "60 sek/sida", "—", "Djup hoftoppning", 120),
        ex("l3-rorlighet-straddle", "Sittande spreads (straddle)", "60 sek", "—", "Innandel lar", 60),
        ex("l3-rorlighet-bridge", "Bro (Urdhva Dhanurasana)", "3 x 15 sek", "—", "Rygg, axlar", 15),
      ],
    },
    {
      id: "styrka",
      name: "Styrka",
      exercises: [
        ex("l3-styrka-ma-bu", "Ma Bu (fristaende)", "3 x 90 sek", "30 sek", "Jarnvilja", 90),
        ex("l3-styrka-diamond-pushups", "Diamantarmhavningar", "3 x 12", "30 sek", "Triceps, core"),
        ex("l3-styrka-pistol-progression", "Pistol squat-progression (stod)", "3 x 5/sida", "30 sek", "Enbensstyrka"),
        ex("l3-styrka-handstand-hold", "Handstaende mot vagg (hall)", "3 x 20 sek", "30 sek", "Axlar, balans", 20),
        ex("l3-styrka-hanging-leg-raise", "Hangande benlyft (om stang finns)", "3 x 8", "30 sek", "Core, grepp"),
        ex("l3-styrka-superman-hold", "Superman hold", "3 x 30 sek", "20 sek", "Ryggkedjan", 30),
      ],
    },
    {
      id: "kondition",
      name: "Kondition & Explosivitet",
      exercises: [
        ex("l3-kondition-sprint-intervals", "Sprint-intervaller (20 sek pa / 40 sek av)", "6 rundor", "Inbyggd", "Anaerob kapacitet", 360),
        ex("l3-kondition-burpees", "Burpees", "3 x 8", "30 sek", "Helkropp, uthallighet"),
        ex("l3-kondition-plyo-lunges", "Plyometriska utfallssteg", "3 x 8/sida", "30 sek", "Explosiva ben"),
        ex("l3-kondition-clap-pushups", "Klapparmhavningar (fulla)", "3 x 6", "30 sek", "Power"),
      ],
    },
    {
      id: "avslutning",
      name: "Avslutning",
      exercises: [
        ex("l3-avslutning-meditation", "3 min sittande meditation", "3 min", "—", "Stillhet, fokus", 180),
        ex("l3-avslutning-log", "2 min reflektion och logg", "2 min", "—", "Reflektion", 120),
      ],
    },
  ],
};
