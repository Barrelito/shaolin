import type { Level } from "../types";
import { ex } from "./helpers";

export const LEVEL_1: Level = {
  number: 1,
  name: "NOVIS",
  day_range: [1, 100],
  total_minutes: 30,
  focus: "Skapa vanan",
  quote: "Resan pa tusen mil borjar med ett enda steg.",
  color: "#4A7C59",
  blocks: [
    {
      id: "uppvaknande",
      name: "Uppvaknande",
      exercises: [
        ex("l1-uppvaknande-kallt-vatten", "Skolj ansiktet med kallt vatten", "—", "—", "Vakna upp, stimulera circulation"),
        ex("l1-uppvaknande-andning", "10 djupa andetag (in 4s, hall 4s, ut 6s)", "10 st", "—", "Andning, lugn start", 140),
        ex("l1-uppvaknande-intention", "Satt intention for dagen", "—", "—", "Mental klarhet"),
      ],
    },
    {
      id: "qigong",
      name: "Qigong — Eight Treasures",
      exercises: [
        ex("l1-qigong-lift-heaven", "Lyft himlen (Shuang Shou Tuo Tian)", "4 per sida", "—", "Andning, spanning i overkropp"),
        ex("l1-qigong-span-bow", "Spann bagen (Zuo You Kai Gong)", "4 per sida", "—", "Brost, axlar"),
        ex("l1-qigong-lift-arm", "Lyft en arm (Tiao Li Pi Wei)", "4 per sida", "—", "Flanker, mage"),
        ex("l1-qigong-look-back", "Titta bakat (Wu Lao Qi Shang)", "4 per sida", "—", "Nacke, rygg"),
        ex("l1-qigong-swing-head-hips", "Svang huvud & hofter", "4 per sida", "—", "Hela ryggraden"),
        ex("l1-qigong-touch-toes", "Beror tarna (Liang Shou Pan Zu)", "4 st", "—", "Hamstrings, rygg"),
        ex("l1-qigong-clench-fists", "Knyt navarna (Zan Quan Nu Mu)", "4 per sida", "—", "Kraft, fokus"),
        ex("l1-qigong-bounce-toes", "Studsa pa tarna (Bei Hou Qi Dian)", "8 st", "—", "Vaderna, balans"),
      ],
    },
    {
      id: "rorlighet",
      name: "Rorlighet & Yoga",
      exercises: [
        ex("l1-rorlighet-neck-rolls", "Nackrullningar", "30 sek per hall", "—", "Nacke", 60),
        ex("l1-rorlighet-shoulder-circles", "Axelcirklar", "30 sek", "—", "Axelled", 30),
        ex("l1-rorlighet-hip-circles", "Hoftcirklar", "30 sek per hall", "—", "Hoftflexibilitet", 60),
        ex("l1-rorlighet-cat-cow", "Cat-Cow (fyrfota)", "10 st", "—", "Rygg, andning"),
        ex("l1-rorlighet-downward-dog", "Nedatgaende hund", "30 sek hall", "—", "Hamstrings, axlar", 30),
        ex("l1-rorlighet-low-lunge", "Lag utfallssteg (hall)", "30 sek per sida", "—", "Hoftbojare", 60),
        ex("l1-rorlighet-seated-forward", "Sittande frambojning", "45 sek hall", "—", "Hamstrings", 45),
        ex("l1-rorlighet-childs-pose", "Barnets stallning", "30 sek", "—", "Aterhamtning", 30),
      ],
    },
    {
      id: "styrka",
      name: "Styrka",
      exercises: [
        ex("l1-styrka-ma-bu", "Ma Bu (haststallning, mot vagg)", "3 x 20 sek", "30 sek", "Lar, mental uthallighet", 20),
        ex("l1-styrka-pushups-knees", "Armhavningar (pa kna)", "3 x 8", "30 sek", "Brost, armar"),
        ex("l1-styrka-squats", "Knaboj (kroppsvikt)", "3 x 12", "30 sek", "Lar, rumpa"),
        ex("l1-styrka-plank", "Planka", "3 x 20 sek", "30 sek", "Core", 20),
        ex("l1-styrka-superman", "Superman (liggande)", "3 x 8", "20 sek", "Rygg"),
      ],
    },
    {
      id: "kondition",
      name: "Kondition",
      exercises: [
        ex("l1-kondition-walk-jog", "Rask promenad / latt jogg", "3 min", "—", "Grundkondition", 180),
        ex("l1-kondition-march", "Marschera pa stallet (hoga knan)", "30 sek", "30 sek", "Puls", 30),
        ex("l1-kondition-jumping-jacks", "Jumping jacks (lag impact)", "30 sek", "—", "Helkropp", 30),
      ],
    },
    {
      id: "avslutning",
      name: "Avslutning",
      exercises: [
        ex("l1-avslutning-sit", "Sitt bekvamt, slapp spanningarna", "—", "—", "Avslappning"),
        ex("l1-avslutning-breathe", "Andas naturligt, slutna ogon", "1 min", "—", "Stillhet, aterhamtning", 60),
        ex("l1-avslutning-log", "Skriv i loggen", "—", "—", "Reflektion"),
      ],
    },
  ],
};
