// TODO: full transcription in Task 12
// This skeleton has 2-3 sample exercises per block per level to verify types and rendering.

import type { Level, Block, Exercise } from "./types";

// --- Helper to build exercises ---
function ex(
  id: string,
  name: string,
  reps: string,
  rest: string,
  focus: string,
  timer_seconds?: number
): Exercise {
  return { id, name, reps, rest, focus, ...(timer_seconds !== undefined ? { timer_seconds } : {}) };
}

// --- Block templates per level ---

function uppvaknandeBlock(level: number): Block {
  // TODO: full transcription in Task 12
  const exercises: Record<number, Exercise[]> = {
    1: [
      ex("l1-uppvaknande-andning", "Morgonandning", "3 min", "—", "Lugn start, fokus", 180),
      ex("l1-uppvaknande-intention", "Dagens intention", "—", "—", "Mental klarhet"),
    ],
    2: [
      ex("l2-uppvaknande-andning", "Djupandning", "5 min", "—", "Andningskontroll", 300),
      ex("l2-uppvaknande-intention", "Dagens intention", "—", "—", "Mental klarhet"),
    ],
    3: [
      ex("l3-uppvaknande-andning", "Wim Hof-andning", "3 rundor", "—", "Energi, mental styrka", 420),
      ex("l3-uppvaknande-kropp", "Kroppsskanning", "5 min", "—", "Medvetenhet", 300),
    ],
    4: [
      ex("l4-uppvaknande-andning", "Pranayama", "10 min", "—", "Andningskontroll", 600),
      ex("l4-uppvaknande-meditation", "Sittande meditation", "5 min", "—", "Stillhet", 300),
    ],
    5: [
      ex("l5-uppvaknande-andning", "Avancerad pranayama", "15 min", "—", "Total kontroll", 900),
      ex("l5-uppvaknande-meditation", "Djupmeditation", "10 min", "—", "Inre stillhet", 600),
    ],
  };
  return { id: "uppvaknande", name: "Uppvaknande", exercises: exercises[level] || [] };
}

function qigongBlock(level: number): Block {
  // TODO: full transcription in Task 12
  const exercises: Record<number, Exercise[]> = {
    1: [
      ex("l1-qigong-lift-heaven", "Lyft himlen", "3 x 8", "30 sek", "Andning, hållning"),
      ex("l1-qigong-open-chest", "Öppna bröstet", "3 x 8", "30 sek", "Bröstöppning"),
    ],
    2: [
      ex("l2-qigong-shoot-bow", "Skjut bågen", "3 x 10", "30 sek", "Fokus, balans"),
      ex("l2-qigong-separate-heaven", "Separera himmel och jord", "3 x 10", "30 sek", "Stretch, energi"),
    ],
    3: [
      ex("l3-qigong-wise-owl", "Den visa ugglan", "3 x 12", "20 sek", "Rotation, nacke"),
      ex("l3-qigong-bear-turns", "Björnens vändning", "3 x 12", "20 sek", "Midja, rygg"),
    ],
    4: [
      ex("l4-qigong-dragon-stance", "Drakens ställning", "3 x 15", "15 sek", "Benstyrka, fokus"),
      ex("l4-qigong-crane-spreads", "Tranan breder ut vingarna", "3 x 15", "15 sek", "Balans, grace"),
    ],
    5: [
      ex("l5-qigong-iron-bridge", "Järnbron", "3 x 20", "10 sek", "Total kroppskontroll"),
      ex("l5-qigong-standing-pole", "Stående stolpe", "10 min", "—", "Uthållighet, qi", 600),
    ],
  };
  return { id: "qigong", name: "Qigong", exercises: exercises[level] || [] };
}

function rorlighetBlock(level: number): Block {
  // TODO: full transcription in Task 12
  const exercises: Record<number, Exercise[]> = {
    1: [
      ex("l1-rorlighet-hip-circles", "Höftcirklar", "10 per sida", "—", "Höftrörlighet"),
      ex("l1-rorlighet-cat-cow", "Katt-ko", "3 x 10", "—", "Ryggrörlighet"),
    ],
    2: [
      ex("l2-rorlighet-deep-squat", "Djup knäböj-hold", "3 x 30 sek", "20 sek", "Höft, anklar", 30),
      ex("l2-rorlighet-pigeon", "Duvans pose", "30 sek per sida", "—", "Höftflexorer", 30),
    ],
    3: [
      ex("l3-rorlighet-cossack", "Kosackknäböj", "3 x 8 per sida", "20 sek", "Höft, adduktorer"),
      ex("l3-rorlighet-thoracic", "Bröstrygg-rotation", "3 x 10 per sida", "—", "Bröstrygg"),
    ],
    4: [
      ex("l4-rorlighet-pancake", "Pannkaksstretch", "3 x 45 sek", "15 sek", "Hamstrings, rygg", 45),
      ex("l4-rorlighet-bridge", "Brygga", "3 x 20 sek", "20 sek", "Rygg, axlar", 20),
    ],
    5: [
      ex("l5-rorlighet-full-split", "Sidospagat progression", "3 x 60 sek", "—", "Maximal rörlighet", 60),
      ex("l5-rorlighet-backbend", "Stående bakåtböjning", "3 x 30 sek", "15 sek", "Rygg, flexibilitet", 30),
    ],
  };
  return { id: "rorlighet", name: "Rörlighet", exercises: exercises[level] || [] };
}

function styrkaBlock(level: number): Block {
  // TODO: full transcription in Task 12
  const exercises: Record<number, Exercise[]> = {
    1: [
      ex("l1-styrka-push-ups", "Armhävningar", "3 x 10", "60 sek", "Bröst, triceps"),
      ex("l1-styrka-squats", "Knäböj", "3 x 15", "60 sek", "Ben, rumpa"),
      ex("l1-styrka-plank", "Plankan", "3 x 30 sek", "30 sek", "Bål, uthållighet", 30),
    ],
    2: [
      ex("l2-styrka-diamond-push", "Diamant-armhävningar", "3 x 12", "45 sek", "Triceps, bröst"),
      ex("l2-styrka-lunges", "Utfallssteg", "3 x 12 per ben", "45 sek", "Ben, balans"),
      ex("l2-styrka-hollow-body", "Hollow body hold", "3 x 30 sek", "30 sek", "Bål", 30),
    ],
    3: [
      ex("l3-styrka-pike-push", "Pike push-ups", "3 x 10", "60 sek", "Axlar, triceps"),
      ex("l3-styrka-pistol-prog", "Pistolknäböj progression", "3 x 5 per ben", "60 sek", "Benstyrka, balans"),
      ex("l3-styrka-l-sit", "L-sit hold", "3 x 15 sek", "45 sek", "Bål, höftflexorer", 15),
    ],
    4: [
      ex("l4-styrka-hspu-prog", "Handstående armhävning progression", "3 x 5", "90 sek", "Axlar, tryck"),
      ex("l4-styrka-shrimp-squat", "Räkknäböj", "3 x 6 per ben", "60 sek", "Benstyrka"),
      ex("l4-styrka-dragon-flag", "Dragon flag progression", "3 x 5", "60 sek", "Bål, total styrka"),
    ],
    5: [
      ex("l5-styrka-planche-prog", "Planche progression", "5 x 10 sek", "90 sek", "Total överkropp", 10),
      ex("l5-styrka-pistol-squat", "Pistolknäböj", "3 x 8 per ben", "60 sek", "Maximal benstyrka"),
      ex("l5-styrka-front-lever", "Front lever progression", "5 x 10 sek", "90 sek", "Rygg, bål", 10),
    ],
  };
  return { id: "styrka", name: "Styrka", exercises: exercises[level] || [] };
}

function konditionBlock(level: number): Block {
  // TODO: full transcription in Task 12
  const exercises: Record<number, Exercise[]> = {
    1: [
      ex("l1-kondition-jumping-jacks", "Jumping jacks", "3 x 30 sek", "30 sek", "Kondition, uppvärmning", 30),
      ex("l1-kondition-high-knees", "Höga knän", "3 x 20 sek", "30 sek", "Hjärta, ben", 20),
    ],
    2: [
      ex("l2-kondition-burpees", "Burpees", "3 x 8", "45 sek", "Helkropp, kondition"),
      ex("l2-kondition-mountain-climbers", "Mountain climbers", "3 x 30 sek", "30 sek", "Bål, kondition", 30),
    ],
    3: [
      ex("l3-kondition-tabata", "Tabata-intervaller", "4 min", "60 sek", "Max kondition", 240),
      ex("l3-kondition-jump-squats", "Hoppknäböj", "3 x 15", "45 sek", "Explosivitet, ben"),
    ],
    4: [
      ex("l4-kondition-emom", "EMOM 10 min", "10 min", "—", "Uthållighet, disciplin", 600),
      ex("l4-kondition-box-jumps", "Boxhopp", "3 x 12", "45 sek", "Explosivitet, kraft"),
    ],
    5: [
      ex("l5-kondition-amrap", "AMRAP 15 min", "15 min", "—", "Maximal kapacitet", 900),
      ex("l5-kondition-sprint-intervals", "Sprintintervaller", "10 x 30 sek", "30 sek", "Maxpuls, vilja", 30),
    ],
  };
  return { id: "kondition", name: "Kondition", exercises: exercises[level] || [] };
}

function avslutningBlock(level: number): Block {
  // TODO: full transcription in Task 12
  const exercises: Record<number, Exercise[]> = {
    1: [
      ex("l1-avslutning-stretch", "Lugn stretch", "5 min", "—", "Återhämtning", 300),
      ex("l1-avslutning-tacksamhet", "Tacksamhetsreflektion", "—", "—", "Mental avslut"),
    ],
    2: [
      ex("l2-avslutning-stretch", "Djupstretch", "7 min", "—", "Återhämtning", 420),
      ex("l2-avslutning-journal", "Journalanteckning", "—", "—", "Reflektion"),
    ],
    3: [
      ex("l3-avslutning-yoga", "Yin yoga-sekvens", "10 min", "—", "Djup återhämtning", 600),
      ex("l3-avslutning-breath", "Avslutningsandning", "3 min", "—", "Lugn", 180),
    ],
    4: [
      ex("l4-avslutning-meditation", "Avslutningsmeditation", "10 min", "—", "Stillhet", 600),
      ex("l4-avslutning-gratitude", "Tacksamhetsövning", "5 min", "—", "Uppskattning", 300),
    ],
    5: [
      ex("l5-avslutning-savasana", "Shavasana", "15 min", "—", "Total vila", 900),
      ex("l5-avslutning-vow", "Munkens löfte", "—", "—", "Hängivenhet, syfte"),
    ],
  };
  return { id: "avslutning", name: "Avslutning", exercises: exercises[level] || [] };
}

// --- Level definitions ---

export const LEVELS: Level[] = [
  {
    number: 1,
    name: "NOVIS",
    day_range: [1, 100],
    total_minutes: 30,
    focus: "Grundläggande rörelser, andning och disciplin",
    quote: "Resan på tusen mil börjar med ett enda steg.",
    color: "#4A7C59",
    blocks: [
      uppvaknandeBlock(1),
      qigongBlock(1),
      rorlighetBlock(1),
      styrkaBlock(1),
      konditionBlock(1),
      avslutningBlock(1),
    ],
  },
  {
    number: 2,
    name: "LÄRJUNGE",
    day_range: [101, 200],
    total_minutes: 40,
    focus: "Fördjupad teknik, ökad intensitet",
    quote: "Den som besegrar sig själv är mäktigare än den som intar en stad.",
    color: "#2E6B8A",
    blocks: [
      uppvaknandeBlock(2),
      qigongBlock(2),
      rorlighetBlock(2),
      styrkaBlock(2),
      konditionBlock(2),
      avslutningBlock(2),
    ],
  },
  {
    number: 3,
    name: "KRIGARE",
    day_range: [201, 300],
    total_minutes: 50,
    focus: "Styrka, uthållighet och mental tuffhet",
    quote: "Smärta är svaghet som lämnar kroppen.",
    color: "#8B4513",
    blocks: [
      uppvaknandeBlock(3),
      qigongBlock(3),
      rorlighetBlock(3),
      styrkaBlock(3),
      konditionBlock(3),
      avslutningBlock(3),
    ],
  },
  {
    number: 4,
    name: "DISCIPEL",
    day_range: [301, 400],
    total_minutes: 60,
    focus: "Avancerade rörelser, inre disciplin",
    quote: "Mästaren har misslyckats fler gånger än nybörjaren har försökt.",
    color: "#6B3A6B",
    blocks: [
      uppvaknandeBlock(4),
      qigongBlock(4),
      rorlighetBlock(4),
      styrkaBlock(4),
      konditionBlock(4),
      avslutningBlock(4),
    ],
  },
  {
    number: 5,
    name: "MUNK",
    day_range: [401, 500],
    total_minutes: 75,
    focus: "Total behärskning av kropp och sinne",
    quote: "Tomheten är den ultimata formen av fullhet.",
    color: "#A33B3B",
    blocks: [
      uppvaknandeBlock(5),
      qigongBlock(5),
      rorlighetBlock(5),
      styrkaBlock(5),
      konditionBlock(5),
      avslutningBlock(5),
    ],
  },
];

// --- Helpers ---

export function getLevelByNumber(n: number): Level | undefined {
  return LEVELS.find((l) => l.number === n);
}

export function getBlocksForLevel(n: number): Block[] {
  const level = getLevelByNumber(n);
  return level ? level.blocks : [];
}
