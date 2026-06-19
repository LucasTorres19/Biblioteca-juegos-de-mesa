"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type LibraryItem = {
  id: string;
  title: string;
  category: string;
  format: "Juego base" | "Expansion" | "Libro" | "Accesorio";
  gameType?: string;
  image?: string;
  family?: string;
  players?: string;
  relatedTo?: string;
  copies?: number;
  note?: string;
  accent: string;
};

const library: LibraryItem[] = [
  { id: "ajedrez", title: "Ajedrez", category: "Estrategia", format: "Juego base", image: "/juegos/ajedrez.webp", accent: "from-slate-500 to-zinc-800" },
  { id: "uno", title: "Uno", category: "Party", format: "Juego base", image: "/juegos/uno.webp", accent: "from-red-500 to-amber-400" },
  { id: "dnd-starter", title: "Dungeons & Dragons", category: "Rol", format: "Juego base", image: "/juegos/caja_inicio.webp", family: "Dungeons & Dragons", accent: "from-violet-500 to-indigo-950" },
  { id: "monopoly", title: "Monopoly", category: "Clasico", format: "Juego base", image: "/juegos/monopoly.webp", accent: "from-emerald-400 to-cyan-700" },
  { id: "coc-guardian", title: "The Call of Cthulhu", category: "Rol", format: "Juego base", image: "/juegos/manualdelguardian.webp", family: "Call of Cthulhu", accent: "from-teal-500 to-slate-950" },
  { id: "ping-pong", title: "Ping pong", category: "Fisico", format: "Accesorio", image: "/juegos/pingpong.webp", accent: "from-orange-300 to-red-500", note: "Actividad fisica incluida como ficha especial." },
  { id: "saboteur", title: "Saboteur", category: "Cartas", format: "Juego base", image: "/juegos/saboteur.webp", accent: "from-amber-500 to-stone-800" },
  { id: "teg", title: "T.E.G. La revancha", category: "Estrategia", format: "Juego base", image: "/juegos/teg.webp", accent: "from-lime-400 to-green-900" },
  { id: "munchkin", title: "Munchkin", category: "Cartas", format: "Juego base", image: "/juegos/munchkin.webp", family: "Munchkin", accent: "from-fuchsia-500 to-pink-900" },
  { id: "pistas-cruzadas", title: "Pistas Cruzadas", category: "Party", format: "Juego base", image: "/juegos/pistascruzadas.webp", accent: "from-sky-400 to-blue-900" },
  { id: "sushi-go-party", title: "Sushi Go Party!", category: "Party", format: "Juego base", image: "/juegos/sushigoparty.jpg", accent: "from-orange-300 to-pink-700" },
  { id: "montanas-locura", title: "Montanas de la locura", category: "Horror", format: "Juego base", image: "/juegos/montañaslocura.webp", accent: "from-cyan-400 to-slate-900" },
  { id: "jenga", title: "Jenga", category: "Dexterity", format: "Juego base", image: "/juegos/jenga.webp", accent: "from-amber-300 to-yellow-700" },
  { id: "draftosaurus", title: "Draftosaurus", category: "Familiar", format: "Juego base", image: "/juegos/draftosaurus.webp", accent: "from-green-400 to-emerald-900" },
  { id: "cartografos-heroes", title: "Cartografos Heroes", category: "Flip & Write", format: "Juego base", image: "/juegos/cartografosheroes.webp", accent: "from-emerald-500 to-teal-950" },
  { id: "eldritch-horror", title: "Eldritch Horror", category: "Horror", format: "Juego base", image: "/juegos/Eldritch Horror.webp", accent: "from-slate-500 to-black" },
  { id: "lotr-battle", title: "Senor de los anillos: La batalla por la Tierra Media", category: "Fantasia", format: "Juego base", image: "/juegos/Señor de los anillos La batalla por la tierra media.webp", accent: "from-yellow-500 to-stone-900" },
  { id: "carcassonne-big-box", title: "Carcassonne Big Box", category: "Estrategia", format: "Juego base", image: "/juegos/Carcassonne big box.webp", accent: "from-blue-400 to-indigo-900", note: "La Big Box ya agrupa bastante contenido en una sola caja." },
  { id: "dany", title: "Dany", category: "Party", format: "Juego base", image: "/juegos/dany.webp", accent: "from-rose-400 to-red-900" },
  { id: "tiny-epic-dungeons", title: "Pequenas Grandes Mazmorras", category: "Aventura", format: "Juego base", image: "/juegos/Pequeñas Grandes Mazmorras.webp", accent: "from-violet-400 to-fuchsia-900" },
  { id: "unstable-unicorns", title: "Unstable Unicorns", category: "Cartas", format: "Juego base", image: "/juegos/Unstable Unicorns.webp", accent: "from-pink-300 to-violet-700" },
  { id: "king-of-tokyo", title: "King of Tokyo", category: "Monstruos", format: "Juego base", image: "/juegos/kingoftokio.webp", family: "King of Tokyo", accent: "from-purple-500 to-rose-900" },
  { id: "four-souls", title: "The Binding of Isaac: Four Souls", category: "Cartas", format: "Juego base", image: "/juegos/The Binding of Isaac Four Souls.webp", accent: "from-red-700 to-zinc-900" },
  { id: "death-may-die", title: "Cthulhu: Death May Die", category: "Horror", format: "Juego base", image: "/juegos/cthulhu death may die.webp", accent: "from-teal-600 to-black" },
  { id: "tiny-cthulhu", title: "Pequeno Gran Cthulhu", category: "Horror", format: "Juego base", image: "/juegos/Pequeño Gran Cthulhu.webp", accent: "from-emerald-500 to-slate-950" },
  { id: "mindbug", title: "Mindbug", category: "Cartas", format: "Juego base", image: "/juegos/Mindbug.webp", accent: "from-cyan-300 to-violet-900" },
  { id: "war-ring-card", title: "Guerra del Anillo: El Juego de Cartas", category: "Fantasia", format: "Juego base", image: "/juegos/Guerra Del Anillo.jpg", accent: "from-amber-400 to-zinc-900" },
  { id: "tiny-zombies", title: "Pequenos Grandes Zombies", category: "Cooperativo", format: "Juego base", image: "/juegos/Pequeños Grandes Zombies.webp", accent: "from-lime-500 to-neutral-950" },
  { id: "dnd-phb", title: "D&D Player's Handbook", category: "Rol", format: "Libro", image: "/juegos/Player's handbook.webp", family: "Dungeons & Dragons", relatedTo: "dnd-starter", accent: "from-indigo-400 to-slate-900" },
  { id: "dnd-saltmarsh", title: "D&D Fantasmas de Saltmarsh", category: "Rol", format: "Libro", image: "/juegos/Fantasmas de Saltmarsh.webp", family: "Dungeons & Dragons", relatedTo: "dnd-starter", accent: "from-sky-400 to-teal-900" },
  { id: "dnd-monster-manual", title: "Dungeons & Dragons Monster Manual", category: "Rol", format: "Libro", image: "/juegos/Monster Manual.webp", family: "Dungeons & Dragons", relatedTo: "dnd-starter", copies: 2, accent: "from-violet-700 to-zinc-950", note: "Consolide 'Monster Manual' y 'Dungeons & Dragons Monster Manual' como 2 copias." },
  { id: "munchkin-3", title: "Munchkin 3: Errores Clericales", category: "Cartas", format: "Expansion", image: "/juegos/Munchkin 3 Errores Clericales.webp", family: "Munchkin", relatedTo: "munchkin", accent: "from-fuchsia-400 to-rose-900" },
  { id: "munchkin-4", title: "Munchkin 4: Monturas de Poca Monta", category: "Cartas", format: "Expansion", image: "/juegos/Munchkin 4 Monturas De Poca Monta.webp", family: "Munchkin", relatedTo: "munchkin", accent: "from-pink-400 to-red-950" },
  { id: "coc-umbrales", title: "Call of Cthulhu: Umbrales a las tinieblas", category: "Rol", format: "Libro", image: "/juegos/umbraltinieblas.webp", family: "Call of Cthulhu", relatedTo: "coc-guardian", accent: "from-teal-400 to-slate-900" },
  { id: "coc-saber", title: "Saber olvidado", category: "Horror", format: "Expansion", image: "/juegos/saberolvidado.webp", family: "Eldritch Horror", relatedTo: "eldritch-horror", accent: "from-cyan-500 to-zinc-950" },
  { id: "coc-masks", title: "Las Mascaras de Nyarlathotep", category: "Rol", format: "Libro", image: "/juegos/lasmascarasdenyarlathotep.webp", family: "Call of Cthulhu", relatedTo: "coc-guardian", accent: "from-green-500 to-black" },
  { id: "coc-rags", title: "Los Harapos del Rey", category: "Rol", format: "Libro", image: "/juegos/losharaposdelrey.webp", family: "Call of Cthulhu", relatedTo: "coc-guardian", accent: "from-emerald-400 to-neutral-950" },
  { id: "coc-maldon", title: "El Erudito de Maldon", category: "Preguntas", format: "Juego base", image: "/juegos/El Erudito.jpg", family: "Independiente", accent: "from-slate-400 to-zinc-900" },
  { id: "kot-power-up", title: "King of Tokyo: Power Up!", category: "Monstruos", format: "Expansion", image: "/juegos/King Of TokyoPower Up Expansion.webp", family: "King of Tokyo", relatedTo: "king-of-tokyo", accent: "from-yellow-500 to-red-800" },
  { id: "kot-cthulhu", title: "King of Tokyo: Cthulhu Monster Pack", category: "Monstruos", format: "Expansion", image: "/juegos/King Of Tokyo Cthulhu Monster.webp", family: "King of Tokyo", relatedTo: "king-of-tokyo", accent: "from-emerald-400 to-slate-900" },
];

const allBaseGames = library.filter((item) => item.format === "Juego base" || item.format === "Accesorio");
const statuses = ["Todos", "Con extras", "Solo base"] as const;
const sorts = ["Orden alfabetico", "Mas contenido", "Categoria"] as const;
const gameMeta: Record<string, { gameType: string; players: string }> = {
  ajedrez: { gameType: "Abstract strategy", players: "2" },
  uno: { gameType: "Card", players: "2-10" },
  "dnd-starter": { gameType: "Adventure / role play", players: "2-6" },
  monopoly: { gameType: "Economic", players: "2-8" },
  "coc-guardian": { gameType: "Roleplaying horror investigation", players: "2+" },
  "ping-pong": { gameType: "Deporte de mesa", players: "2-4" },
  saboteur: { gameType: "Bluffing", players: "3-10" },
  teg: { gameType: "Estrategia de guerra", players: "2-6" },
  munchkin: { gameType: "Card", players: "3-6" },
  "pistas-cruzadas": { gameType: "Deduction", players: "2-6" },
  "sushi-go-party": { gameType: "Card drafting", players: "2-8" },
  "montanas-locura": { gameType: "Horror", players: "3-5" },
  jenga: { gameType: "Action / dexterity", players: "1-8" },
  draftosaurus: { gameType: "Animals", players: "2-5" },
  "cartografos-heroes": { gameType: "Fantasy", players: "1-100" },
  "eldritch-horror": { gameType: "Adventure", players: "1-8" },
  "lotr-battle": { gameType: "Adventure", players: "2-4" },
  "carcassonne-big-box": { gameType: "City building", players: "2-5" },
  dany: { gameType: "Bluffing", players: "3-8" },
  "tiny-epic-dungeons": { gameType: "Adventure", players: "1-4" },
  "unstable-unicorns": { gameType: "Card", players: "2-8" },
  "king-of-tokyo": { gameType: "Dice", players: "2-6" },
  "four-souls": { gameType: "Card", players: "2-4" },
  "death-may-die": { gameType: "Fantasy", players: "1-5" },
  "coc-maldon": { gameType: "Trivia / preguntas", players: "1-4" },
  "tiny-cthulhu": { gameType: "Horror", players: "1-4" },
  mindbug: { gameType: "Card", players: "2" },
  "war-ring-card": { gameType: "Card", players: "2-4" },
  "tiny-zombies": { gameType: "Horror", players: "1-5" },
};
const gameDescriptions: Record<string, string> = {
  ajedrez: "Duelo abstracto de informacion perfecta donde cada movimiento construye presion, defensa y sacrificios calculados.",
  uno: "Juego de cartas rapido y directo, centrado en gestionar colores, numeros y cartas especiales para quedarse sin mano antes que el resto.",
  "dnd-starter": "Puerta de entrada a aventuras de rol fantastico, con personajes, dados y decisiones narrativas compartidas en la mesa.",
  monopoly: "Clasico economico de compra, alquiler y negociacion donde la partida gira alrededor del control de propiedades.",
  "coc-guardian": "Rol de investigacion y horror cosmico, pensado para resolver misterios mientras la cordura y los secretos se erosionan.",
  "ping-pong": "Juego fisico de reflejos y precision, ideal para duelos rapidos o partidas por equipos.",
  saboteur: "Cartas, tuneles y roles ocultos: algunos jugadores buscan llegar al oro y otros intentan sabotear sin quedar expuestos.",
  teg: "Estrategia de conquista territorial con objetivos secretos, alianzas temporales y conflicto directo en el mapa.",
  munchkin: "Parodia de mazmorras con cartas, tesoros y traiciones constantes para subir de nivel antes que los demas.",
  "pistas-cruzadas": "Juego cooperativo de asociacion de palabras donde una pista debe cruzar dos conceptos sin ser demasiado obvia.",
  "sushi-go-party": "Draft de cartas rapido y familiar donde cada ronda combina menus distintos para encadenar puntos, mayorias y combos.",
  "montanas-locura": "Cooperativo de comunicacion limitada y humor absurdo en una expedicion que se descontrola a medida que avanza.",
  jenga: "Destreza pura: retirar bloques, mantener la torre estable y forzar al siguiente jugador a enfrentar una estructura imposible.",
  draftosaurus: "Draft ligero de dinosaurios donde cada decision ubica especies en recintos para maximizar puntos.",
  "cartografos-heroes": "Flip and write de mapas, monstruos y objetivos de puntuacion que cambian la forma de dibujar cada territorio.",
  "eldritch-horror": "Aventura cooperativa global contra horrores ancestrales, con exploracion, encuentros y consecuencias persistentes.",
  "lotr-battle": "Juego de cartas de enfrentamiento ambientado en la Tierra Media, con misiones, personajes y control tactico.",
  "carcassonne-big-box": "Colocacion de losetas para construir ciudades, caminos y campos, con mucho contenido reunido en una sola caja.",
  dany: "Juego de identidad y comunicacion donde una mente fragmentada intenta coordinarse mientras una personalidad oculta sabotea.",
  "tiny-epic-dungeons": "Dungeon crawler compacto con exploracion modular, enemigos, botin y combates cooperativos contra jefes.",
  "unstable-unicorns": "Cartas caoticas de coleccion y sabotaje donde cada jugador intenta armar su establo antes que los demas.",
  "king-of-tokyo": "Dados, monstruos gigantes y golpes directos por el control de Tokyo, con poderes que cambian cada partida.",
  "four-souls": "Juego de cartas competitivo inspirado en The Binding of Isaac, con botin, monstruos y combos agresivos.",
  "death-may-die": "Cooperativo de miniaturas y horror pulp donde los investigadores intentan interrumpir rituales antes del desastre final.",
  "tiny-cthulhu": "Cooperativo compacto de horror cosmico con decisiones tacticas, amenaza creciente y gestion de recursos.",
  mindbug: "Duelo de cartas minimalista donde cada criatura fuerte puede ser robada por el rival en el momento mas doloroso.",
  "war-ring-card": "Juego de cartas estrategico sobre la Guerra del Anillo, con bandos, escenarios y control de frentes clave.",
  "tiny-zombies": "Supervivencia contra zombis en formato compacto, con modos cooperativos y competitivos alrededor de un centro comercial.",
  "coc-maldon": "Juego de preguntas para medir conocimiento, memoria y rapidez en una experiencia independiente de trivia.",
};
const typeFilters = ["Todos", ...Array.from(new Set(Object.values(gameMeta).map((meta) => meta.gameType))).sort()];
const playerFilters = ["Todos", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];
const randomTypeFilters = ["Cualquiera", ...typeFilters.filter((item) => item !== "Todos")];
const randomPlayerFilters = ["Cualquiera", ...playerFilters.filter((item) => item !== "Todos")];

const formatStyles: Record<LibraryItem["format"], string> = {
  "Juego base": "bg-sky-400/15 text-sky-100 border-sky-300/20",
  Expansion: "bg-amber-400/15 text-amber-100 border-amber-300/20",
  Libro: "bg-emerald-400/15 text-emerald-100 border-emerald-300/20",
  Accesorio: "bg-rose-400/15 text-rose-100 border-rose-300/20",
};

const coverThemes: Array<{
  match: (item: LibraryItem) => boolean;
  icon: string;
  palette: [string, string, string];
}> = [
  { match: (item) => item.family === "Call of Cthulhu" || item.title.toLowerCase().includes("cthulhu"), icon: "octopus", palette: ["#3f8f75", "#18281e", "#d9fced"] },
  { match: (item) => item.family === "Dungeons & Dragons" || item.category === "Rol", icon: "dragon", palette: ["#7a4bd6", "#1a1429", "#efe7ff"] },
  { match: (item) => item.family === "King of Tokyo" || item.category === "Monstruos", icon: "claw", palette: ["#d88319", "#2f1704", "#fff1d9"] },
  { match: (item) => item.title.toLowerCase().includes("guerra del anillo") || item.title.toLowerCase().includes("senor de los anillos"), icon: "ring", palette: ["#c4aa3b", "#2d2812", "#fff4cb"] },
  { match: (item) => item.title.toLowerCase().includes("carcassonne") || item.category === "Estrategia", icon: "castle", palette: ["#6f8b67", "#1d2218", "#ebf3df"] },
  { match: (item) => item.category === "Cartas", icon: "cards", palette: ["#8f4d3c", "#291713", "#fde9de"] },
  { match: (item) => item.category === "Party", icon: "spark", palette: ["#b8802f", "#30210f", "#ffefcf"] },
  { match: (item) => item.category === "Fisico" || item.category === "Dexterity", icon: "ball", palette: ["#788269", "#1d2118", "#edf4db"] },
];

const defaultCoverTheme = {
  icon: "meeple",
  palette: ["#5d7458", "#1b2018", "#eef8e7"] as [string, string, string],
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof statuses)[number]>("Todos");
  const [sortBy, setSortBy] = useState<(typeof sorts)[number]>("Orden alfabetico");
  const [selectedType, setSelectedType] = useState("Todos");
  const [selectedPlayers, setSelectedPlayers] = useState("Todos");
  const [selectedId, setSelectedId] = useState<string>(allBaseGames[0]?.id ?? "");
  const [randomModalOpen, setRandomModalOpen] = useState(false);
  const [randomType, setRandomType] = useState("Cualquiera");
  const [randomPlayers, setRandomPlayers] = useState("Cualquiera");
  const [randomGame, setRandomGame] = useState<LibraryItem | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    withExtras: false,
    baseOnly: false,
  });

  const visibleGames = useMemo(() => {
    const text = query.trim().toLowerCase();

    const games = allBaseGames
      .map((game) => ({
        game,
        extras: library.filter((item) => item.relatedTo === game.id),
      }))
      .filter(({ game, extras }) => {
        const meta = gameMeta[game.id];
        const haystack = [game.title, game.category, game.family, game.note]
          .concat(extras.flatMap((item) => [item.title, item.family, item.note]))
          .concat(meta ? [meta.gameType, meta.players] : [])
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        const matchesText = !text || haystack.includes(text);
        const matchesStatus =
          status === "Todos" ||
          (status === "Con extras" && extras.length > 0) ||
          (status === "Solo base" && extras.length === 0);
        const matchesType = selectedType === "Todos" || meta?.gameType === selectedType;
        const matchesPlayers =
          selectedPlayers === "Todos" || (meta ? supportsPlayerCount(meta.players, selectedPlayers) : false);

        return matchesText && matchesStatus && matchesType && matchesPlayers;
      });

    const sorted = [...games].sort((left, right) => {
      if (sortBy === "Mas contenido") {
        return right.extras.length - left.extras.length || left.game.title.localeCompare(right.game.title);
      }

      if (sortBy === "Categoria") {
        return left.game.category.localeCompare(right.game.category) || left.game.title.localeCompare(right.game.title);
      }

      return left.game.title.localeCompare(right.game.title);
    });

    return sorted;
  }, [query, selectedPlayers, selectedType, sortBy, status]);

  const selectedEntry =
    visibleGames.find((entry) => entry.game.id === selectedId) ??
    visibleGames[0] ??
    { game: allBaseGames[0], extras: library.filter((item) => item.relatedTo === allBaseGames[0]?.id) };

  const selectedGame = selectedEntry?.game;
  const selectedExtras = selectedEntry?.extras ?? [];
  const gamesWithExtras = allBaseGames.filter((game) => library.some((item) => item.relatedTo === game.id));
  const gamesWithoutExtras = allBaseGames.filter((game) => !library.some((item) => item.relatedTo === game.id));
  const randomCandidates = useMemo(
    () =>
      allBaseGames.filter((game) => {
        const meta = gameMeta[game.id];
        const matchesType = randomType === "Cualquiera" || meta?.gameType === randomType;
        const matchesPlayers =
          randomPlayers === "Cualquiera" || (meta ? supportsPlayerCount(meta.players, randomPlayers) : false);

        return matchesType && matchesPlayers;
      }),
    [randomPlayers, randomType],
  );

  function chooseRandomGame() {
    if (randomCandidates.length === 0) {
      setRandomGame(null);
      return;
    }

    const nextGame = randomCandidates[Math.floor(Math.random() * randomCandidates.length)];
    setRandomGame(nextGame);
    setSelectedId(nextGame.id);
  }

  function selectGame(gameId: string) {
    setSelectedId(gameId);

    if (window.matchMedia("(max-width: 1279px)").matches) {
      setDetailModalOpen(true);
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_18%_0%,rgba(47,143,120,0.20),transparent_28%),radial-gradient(circle_at_88%_12%,rgba(184,155,94,0.10),transparent_24%),linear-gradient(180deg,#07100e_0%,#081512_42%,#030806_100%)] text-[#e8ead7]">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)]">
        <div className="border-b border-black/25 bg-[#0b1714] p-3 lg:hidden">
          <button
            type="button"
            onClick={() => {
              setRandomModalOpen(true);
              setRandomGame(null);
            }}
            className="mb-3 w-full rounded-sm border border-[#b89b5e] bg-[#29473b] px-3 py-2 text-left text-sm font-medium text-[#eef1de] transition hover:bg-[#3f6b58]"
          >
            Juego aleatorio
          </button>
          <div className="rounded-sm border border-[#3f6b58] bg-[#10211d] px-3 py-2">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar en tu biblioteca"
              className="w-full bg-transparent text-sm text-[#eef1de] outline-none placeholder:text-[#7f968b]"
            />
          </div>
        </div>
        <aside className="hidden border-r border-black/30 bg-[#0b1714] shadow-[inset_-1px_0_0_rgba(255,255,255,0.05)] lg:block">
          <div className="border-b border-black/25 p-3">
            <button
              type="button"
              onClick={() => {
                setRandomModalOpen(true);
                setRandomGame(null);
              }}
              className="mb-3 w-full rounded-sm border border-[#b89b5e] bg-[#29473b] px-3 py-2 text-left text-sm font-medium text-[#eef1de] transition hover:bg-[#3f6b58]"
            >
              Juego aleatorio
            </button>
            <div className="rounded-sm border border-[#3f6b58] bg-[#10211d] px-3 py-2">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar en tu biblioteca"
                className="w-full bg-transparent text-sm text-[#eef1de] outline-none placeholder:text-[#7f968b]"
              />
            </div>
          </div>

          <div className="space-y-4 p-3 text-sm">
            <LibrarySection
              sectionKey="withExtras"
              title="Con contenido extra"
              count={gamesWithExtras.length}
              entries={visibleGames.filter((entry) => entry.extras.length > 0)}
              selectedId={selectedId}
              onSelect={setSelectedId}
              collapsed={collapsedSections.withExtras}
              onToggle={() =>
                setCollapsedSections((current) => ({
                  ...current,
                  withExtras: !current.withExtras,
                }))
              }
            />
            <LibrarySection
              sectionKey="baseOnly"
              title="Solo base"
              count={gamesWithoutExtras.length}
              entries={visibleGames.filter((entry) => entry.extras.length === 0)}
              selectedId={selectedId}
              onSelect={setSelectedId}
              collapsed={collapsedSections.baseOnly}
              onToggle={() =>
                setCollapsedSections((current) => ({
                  ...current,
                  baseOnly: !current.baseOnly,
                }))
              }
            />
          </div>
        </aside>

        <section className="flex min-h-screen flex-col bg-[#0f1f1b]">
          <div className="border-b border-black/25 px-4 py-6 sm:px-8 sm:py-7">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-[32px] font-light tracking-[0.18em] text-[#f1ead2]">Juegos</h1>
                  <span className="text-lg text-[#91a99d]">({visibleGames.length}/{allBaseGames.length})</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {statuses.map((item) => {
                    const active = item === status;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setStatus(item)}
                        className={`rounded-sm border px-4 py-1.5 text-sm transition ${
                          active
                            ? "border-[#b89b5e] bg-[#3b6b55] text-[#f3ecd4]"
                            : "border-[#1b342b] bg-[#213d33] text-[#c9d5c3] hover:bg-[#2a4b3d]"
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4 flex flex-wrap gap-5">
                  <label className="grid gap-1 text-xs uppercase tracking-[0.18em] text-[#aebdaa]">
                    Tipo de juego
                    <select
                      value={selectedType}
                      onChange={(event) => setSelectedType(event.target.value)}
                      className="w-56 rounded-sm border border-[#3f6b58] bg-[#1b342b] px-3 py-2 text-sm normal-case tracking-normal text-[#eef1de] outline-none"
                    >
                      {typeFilters.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="grid gap-1 text-xs uppercase tracking-[0.18em] text-[#aebdaa]">
                    Jugadores
                    <select
                      value={selectedPlayers}
                      onChange={(event) => setSelectedPlayers(event.target.value)}
                      className="w-44 rounded-sm border border-[#3f6b58] bg-[#1b342b] px-3 py-2 text-sm normal-case tracking-normal text-[#eef1de] outline-none"
                    >
                      {playerFilters.map((item) => (
                        <option key={item} value={item}>
                          {item === "Todos" ? item : `${item} jugador${item === "1" ? "" : "es"}`}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 px-4 py-5 sm:px-8 sm:py-6">
            <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="text-sm uppercase tracking-[0.22em] text-[#aebdaa]">
                {selectedGame ? `${selectedGame.title} ${selectedExtras.length > 0 ? `(${selectedExtras.length} extras)` : "(sin extras)"}` : "Sin seleccion"}
              </div>
              <label className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[#aebdaa]">
                Ordenar por
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value as (typeof sorts)[number])}
                  className="rounded-sm border border-[#3f6b58] bg-[#1b342b] px-3 py-2 text-sm uppercase tracking-normal text-[#eef1de] outline-none"
                >
                  {sorts.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
              <div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] sm:gap-6">
                  {visibleGames.map(({ game, extras }) => (
                    <button
                      key={game.id}
                      type="button"
                      onClick={() => selectGame(game.id)}
                      className="group text-left"
                    >
                      <div
                        className={`relative aspect-[3/4] overflow-hidden border shadow-[0_10px_24px_rgba(0,0,0,0.28)] transition group-hover:-translate-y-1 ${
                          selectedGame?.id === game.id ? "border-[#d8e4c5]" : "border-black/35"
                        }`}
                      >
                        <Image
                          src={getImageSrc(game)}
                          alt={`Portada de ${game.title}`}
                          fill
                          unoptimized
                          sizes="180px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                        {extras.length > 0 ? (
                          <div className="absolute bottom-2 left-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/70 bg-black/65 text-sm text-white">
                            {extras.length}
                          </div>
                        ) : null}
                      </div>
                      <div className="mt-2">
                        <p className="line-clamp-2 text-sm text-[#f1ead2]">{game.title}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#92a89c]">{game.category}</p>
                        {gameMeta[game.id] ? (
                          <p className="mt-1 text-xs text-[#7f968b]">
                            {gameMeta[game.id].players} jugadores · {gameMeta[game.id].gameType}
                          </p>
                        ) : null}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <aside className="hidden space-y-4 border border-black/30 bg-[#0d1b18] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] xl:block">
                {selectedGame ? (
                  <>
                    <div className="relative aspect-[3/4] overflow-hidden border border-black/35">
                      <Image
                        src={getImageSrc(selectedGame)}
                        alt={`Portada de ${selectedGame.title}`}
                        fill
                        unoptimized
                        sizes="320px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-light text-[#f1ead2]">{selectedGame.title}</h2>
                      <p className="mt-1 text-sm text-[#9fb3a6]">{selectedGame.family ?? selectedGame.category}</p>
                      {gameMeta[selectedGame.id] ? (
                        <div className="mt-3 grid gap-2 text-sm text-[#dce4cf]">
                          <p>
                            <span className="text-[#7f968b]">Jugadores:</span> {gameMeta[selectedGame.id].players}
                          </p>
                          <p>
                            <span className="text-[#7f968b]">Tipo:</span> {gameMeta[selectedGame.id].gameType}
                          </p>
                        </div>
                      ) : null}
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className={`rounded-sm border px-2 py-1 text-xs ${formatStyles[selectedGame.format]}`}>
                          {selectedGame.format}
                        </span>
                        <span className="rounded-sm border border-[#29473b] bg-[#182d25] px-2 py-1 text-xs text-[#dde5cf]">
                          {selectedExtras.length} extras
                        </span>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-[#cbd8c8]">
                        {getGameDescription(selectedGame)}
                      </p>
                    </div>

                    <div className="border-t border-[#28463a] pt-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-[#aebdaa]">
                        Contenido asociado
                      </p>
                      <div className="mt-3 space-y-3">
                        {selectedExtras.length > 0 ? (
                          selectedExtras.map((item) => (
                            <div key={item.id} className="flex gap-3 border border-black/25 bg-[#14251f] p-3">
                              <Image
                                src={getImageSrc(item)}
                                alt={`Portada de ${item.title}`}
                                width={58}
                                height={84}
                                unoptimized
                                className="h-[84px] w-[58px] border border-black/25 object-cover"
                              />
                              <div className="min-w-0">
                                <p className="text-sm text-[#f3f7eb]">{item.title}</p>
                                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#c5d0b9]">{item.format}</p>
                                {item.copies ? (
                                  <p className="mt-2 text-xs text-[#d4deca]">Copias: {item.copies}</p>
                                ) : null}
                                {item.note ? <p className="mt-2 text-xs text-[#d4deca]">{item.note}</p> : null}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="border border-dashed border-[#6b7758] bg-[#47503b] p-3 text-sm text-[#d3ddc6]">
                            No hay expansiones, libros o material extra vinculado.
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-[#d3ddc6]">No hay juegos que coincidan con el filtro actual.</p>
                )}
              </aside>
            </div>
          </div>
        </section>
      </div>

      {detailModalOpen && selectedGame ? (
        <div className="fixed inset-0 z-40 grid place-items-center bg-black/55 p-4 xl:hidden">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="game-detail-title"
            className="max-h-[90vh] w-full max-w-md overflow-y-auto border border-[#b89b5e] bg-[#0d1b18] p-4 shadow-[0_22px_80px_rgba(0,0,0,0.45)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#28463a] pb-3">
              <div>
                <h2 id="game-detail-title" className="text-xl font-light text-[#f1ead2]">
                  {selectedGame.title}
                </h2>
                <p className="mt-1 text-sm text-[#9fb3a6]">{selectedGame.family ?? selectedGame.category}</p>
              </div>
              <button
                type="button"
                onClick={() => setDetailModalOpen(false)}
                className="border border-[#3f6b58] bg-[#14251f] px-3 py-1.5 text-sm text-[#eef1de]"
              >
                Cerrar
              </button>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-[140px_minmax(0,1fr)]">
              <div className="relative aspect-[3/4] overflow-hidden border border-black/35">
                <Image
                  src={getImageSrc(selectedGame)}
                  alt={`Portada de ${selectedGame.title}`}
                  fill
                  unoptimized
                  sizes="140px"
                  className="object-cover"
                />
              </div>
              <div>
                {gameMeta[selectedGame.id] ? (
                  <div className="grid gap-2 text-sm text-[#dce4cf]">
                    <p>
                      <span className="text-[#7f968b]">Jugadores:</span> {gameMeta[selectedGame.id].players}
                    </p>
                    <p>
                      <span className="text-[#7f968b]">Tipo:</span> {gameMeta[selectedGame.id].gameType}
                    </p>
                  </div>
                ) : null}
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className={`rounded-sm border px-2 py-1 text-xs ${formatStyles[selectedGame.format]}`}>
                    {selectedGame.format}
                  </span>
                  <span className="rounded-sm border border-[#29473b] bg-[#182d25] px-2 py-1 text-xs text-[#dde5cf]">
                    {selectedExtras.length} extras
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-[#cbd8c8]">
                  {getGameDescription(selectedGame)}
                </p>
              </div>
            </div>

            <div className="mt-4 border-t border-[#28463a] pt-4">
              <p className="text-xs uppercase tracking-[0.24em] text-[#aebdaa]">Contenido asociado</p>
              <div className="mt-3 space-y-3">
                {selectedExtras.length > 0 ? (
                  selectedExtras.map((item) => (
                    <div key={item.id} className="flex gap-3 border border-black/25 bg-[#14251f] p-3">
                      <Image
                        src={getImageSrc(item)}
                        alt={`Portada de ${item.title}`}
                        width={58}
                        height={84}
                        unoptimized
                        className="h-[84px] w-[58px] border border-black/25 object-cover"
                      />
                      <div className="min-w-0">
                        <p className="text-sm text-[#f3f7eb]">{item.title}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#c5d0b9]">{item.format}</p>
                        {item.copies ? <p className="mt-2 text-xs text-[#d4deca]">Copias: {item.copies}</p> : null}
                        {item.note ? <p className="mt-2 text-xs text-[#d4deca]">{item.note}</p> : null}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="border border-dashed border-[#6b7758] bg-[#47503b] p-3 text-sm text-[#d3ddc6]">
                    No hay expansiones, libros o material extra vinculado.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {randomModalOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/55 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="random-game-title"
            className="w-full max-w-2xl border border-[#b89b5e] bg-[#0d1b18] p-5 shadow-[0_22px_80px_rgba(0,0,0,0.45)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#28463a] pb-4">
              <div>
                <h2 id="random-game-title" className="text-2xl font-light text-[#f1ead2]">
                  Juego aleatorio
                </h2>
                <p className="mt-1 text-sm text-[#9fb3a6]">{randomCandidates.length} candidatos disponibles</p>
              </div>
              <button
                type="button"
                onClick={() => setRandomModalOpen(false)}
                className="border border-[#3f6b58] bg-[#14251f] px-3 py-1.5 text-sm text-[#eef1de] transition hover:bg-[#213d33]"
              >
                Cerrar
              </button>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1 text-xs uppercase tracking-[0.18em] text-[#aebdaa]">
                Tipo de juego
                <select
                  value={randomType}
                  onChange={(event) => {
                    setRandomType(event.target.value);
                    setRandomGame(null);
                  }}
                  className="rounded-sm border border-[#3f6b58] bg-[#1b342b] px-3 py-2 text-sm normal-case tracking-normal text-[#eef1de] outline-none"
                >
                  {randomTypeFilters.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1 text-xs uppercase tracking-[0.18em] text-[#aebdaa]">
                Jugadores
                <select
                  value={randomPlayers}
                  onChange={(event) => {
                    setRandomPlayers(event.target.value);
                    setRandomGame(null);
                  }}
                  className="rounded-sm border border-[#3f6b58] bg-[#1b342b] px-3 py-2 text-sm normal-case tracking-normal text-[#eef1de] outline-none"
                >
                  {randomPlayerFilters.map((item) => (
                    <option key={item} value={item}>
                      {item === "Cualquiera" ? item : `${item} jugador${item === "1" ? "" : "es"}`}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <button
              type="button"
              onClick={chooseRandomGame}
              className="mt-5 w-full border border-[#c6a35a] bg-[#345d49] px-4 py-2.5 text-sm font-medium text-[#f3ecd4] transition hover:bg-[#3f6b58] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={randomCandidates.length === 0}
            >
              Sortear juego
            </button>

            <div className="mt-5 min-h-44 border border-[#28463a] bg-[#0f1f1b] p-4">
              {randomGame ? (
                <div className="grid gap-4 sm:grid-cols-[120px_minmax(0,1fr)]">
                  <div className="relative aspect-[3/4] overflow-hidden border border-black/35">
                    <Image
                      src={getImageSrc(randomGame)}
                      alt={`Portada de ${randomGame.title}`}
                      fill
                      unoptimized
                      sizes="120px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-[#aebdaa]">Resultado</p>
                    <h3 className="mt-2 text-2xl font-light text-[#f1ead2]">{randomGame.title}</h3>
                    <p className="mt-2 text-sm text-[#9fb3a6]">{randomGame.family ?? randomGame.category}</p>
                    {gameMeta[randomGame.id] ? (
                      <div className="mt-4 grid gap-2 text-sm text-[#dce4cf]">
                        <p>
                          <span className="text-[#7f968b]">Jugadores:</span> {gameMeta[randomGame.id].players}
                        </p>
                        <p>
                          <span className="text-[#7f968b]">Tipo:</span> {gameMeta[randomGame.id].gameType}
                        </p>
                      </div>
                    ) : null}
                    <p className="mt-4 text-sm leading-6 text-[#cbd8c8]">{getGameDescription(randomGame)}</p>
                  </div>
                </div>
              ) : (
                <div className="flex h-full min-h-36 items-center justify-center text-center text-sm text-[#9fb3a6]">
                  {randomCandidates.length === 0
                    ? "No hay juegos que coincidan con esos filtros."
                    : "Elegí filtros y sorteá un juego para jugar."}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function LibrarySection({
  sectionKey,
  title,
  count,
  entries,
  selectedId,
  onSelect,
  collapsed,
  onToggle,
}: {
  sectionKey: string;
  title: string;
  count: number;
  entries: Array<{ game: LibraryItem; extras: LibraryItem[] }>;
  selectedId: string;
  onSelect: (id: string) => void;
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <section>
      <button
        type="button"
        aria-expanded={!collapsed}
        aria-controls={`section-${sectionKey}`}
        onClick={onToggle}
        className="mb-2 flex w-full items-center gap-2 text-left text-xs uppercase tracking-[0.22em] text-[#aebdaa]"
      >
        <span className="w-3 text-[#c6a35a]">{collapsed ? "+" : "-"}</span>
        <span>{title}</span>
        <span className="text-[#7f968b]">({count})</span>
      </button>
      <div
        id={`section-${sectionKey}`}
        className={`space-y-px overflow-hidden border border-black/20 bg-[#07100e] ${collapsed ? "hidden" : ""}`}
      >
        {entries.length > 0 ? (
          entries.map(({ game, extras }) => {
            const active = game.id === selectedId;

            return (
              <button
                key={game.id}
                type="button"
                onClick={() => onSelect(game.id)}
                className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition ${
                  active ? "bg-[#213d33] text-[#f3ecd4]" : "bg-[#10211d] text-[#dce4cf] hover:bg-[#18352b]"
                }`}
              >
                <span className="truncate pr-3">{game.title}</span>
                {extras.length > 0 ? (
                  <span className="rounded-sm bg-black/20 px-2 py-0.5 text-xs text-[#f3f7eb]">{extras.length}</span>
                ) : null}
              </button>
            );
          })
        ) : (
          <div className="px-3 py-2 text-sm text-[#8fa398]">Sin resultados en esta seccion.</div>
        )}
      </div>
    </section>
  );
}

function getImageSrc(item: LibraryItem) {
  return item.image ?? getCoverDataUri(item);
}

function getGameDescription(item: LibraryItem) {
  return (
    gameDescriptions[item.id] ??
    item.note ??
    "Ficha principal de la ludoteca, lista para completar con notas propias de partidas o reglas caseras."
  );
}

function supportsPlayerCount(playerRange: string, selectedPlayers: string) {
  const selected = selectedPlayers === "10+" ? 10 : Number(selectedPlayers);

  if (Number.isNaN(selected)) {
    return true;
  }

  if (playerRange.endsWith("+")) {
    return selected >= Number(playerRange.replace("+", ""));
  }

  const [min, max] = playerRange.split("-").map(Number);

  if (Number.isNaN(max)) {
    return selected === min;
  }

  return selected >= min && selected <= max;
}

function getCoverDataUri(item: LibraryItem) {
  const { icon, palette } = coverThemes.find((theme) => theme.match(item)) ?? defaultCoverTheme;
  const [primary, secondary, text] = palette;
  const title = escapeSvg(item.title);
  const subtitle = escapeSvg(item.family ?? item.category);
  const badge = escapeSvg(item.format);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 840">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${primary}" />
          <stop offset="100%" stop-color="${secondary}" />
        </linearGradient>
        <radialGradient id="shine" cx="70%" cy="12%" r="55%">
          <stop offset="0%" stop-color="${text}" stop-opacity="0.36" />
          <stop offset="100%" stop-color="${text}" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="840" fill="url(#bg)" />
      <rect width="600" height="840" fill="url(#shine)" />
      <rect x="18" y="18" width="564" height="804" fill="none" stroke="rgba(255,255,255,0.12)" />
      ${coverShape(icon, text)}
      <text x="42" y="68" font-size="22" font-family="Arial, sans-serif" letter-spacing="5" fill="rgba(255,255,255,0.74)">
        ${subtitle.toUpperCase()}
      </text>
      <foreignObject x="42" y="500" width="516" height="200">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Arial, sans-serif; font-size: 52px; line-height: 1.02; color: white; font-weight: 700;">
          ${title}
        </div>
      </foreignObject>
      <rect x="42" y="734" width="168" height="40" fill="rgba(0,0,0,0.28)" stroke="rgba(255,255,255,0.14)" />
      <text x="126" y="760" text-anchor="middle" font-size="20" font-family="Arial, sans-serif" letter-spacing="2" fill="${text}">
        ${badge.toUpperCase()}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function coverShape(icon: string, color: string) {
  switch (icon) {
    case "dragon":
      return `<path d="M375 166c-72 16-118 72-118 144 0 77 58 135 128 135 22 0 40-5 60-17-15 33-43 61-83 84-56 31-70 58-70 94 0 18 7 34 19 45-2-39 19-56 59-72 72-28 141-86 141-180 0-73-47-145-136-145Z" fill="${color}" fill-opacity=".92"/><path d="M302 274c32 7 58 26 76 58-17-10-37-15-54-15-20 0-38 5-53 17 6-34 18-53 31-60Z" fill="rgba(255,255,255,0.20)"/>`;
    case "octopus":
      return `<circle cx="300" cy="248" r="92" fill="${color}" fill-opacity=".86"/><path d="M228 306c-21 34-63 58-85 95 55-13 77-31 102-65 0 45-20 69-39 103 34-14 55-39 69-75 9 39 4 68-5 102 29-21 43-53 50-95 16 37 33 67 60 90-7-40-11-74 0-112 18 38 42 61 78 77-21-31-40-54-45-101 24 32 50 49 106 62-26-34-65-59-91-98" fill="none" stroke="${color}" stroke-width="28" stroke-linecap="round" stroke-opacity=".72"/>`;
    case "claw":
      return `<path d="M171 426c22-111 62-211 109-266 12 71 2 145-34 215 40-51 84-87 131-109-3 60-30 108-68 152 47-29 90-46 129-46-24 65-79 105-158 134-48 17-104 26-166 21 18-36 39-68 57-101Z" fill="${color}" fill-opacity=".88"/>`;
    case "ring":
      return `<circle cx="300" cy="282" r="108" fill="none" stroke="${color}" stroke-width="36" stroke-opacity=".94"/><circle cx="300" cy="282" r="61" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="10"/><path d="M219 414c46 19 116 19 162 0" stroke="${color}" stroke-width="23" stroke-linecap="round" stroke-opacity=".84"/>`;
    case "castle":
      return `<path d="M182 430V244h48v44h41v-52h58v52h41v-44h48v186h25v44H157v-44h25Zm65 0h24v-70h58v70h24V330H247v100Z" fill="${color}" fill-opacity=".88"/>`;
    case "cards":
      return `<rect x="180" y="188" width="162" height="230" transform="rotate(-9 180 188)" fill="${color}" fill-opacity=".72"/><rect x="258" y="210" width="162" height="230" transform="rotate(8 258 210)" fill="rgba(255,255,255,0.18)"/><rect x="210" y="226" width="166" height="232" fill="${color}" fill-opacity=".93"/><path d="M293 321c0-26 17-44 41-44 25 0 42 18 42 44 0 45-42 57-42 90 0-33-41-45-41-90Z" fill="white" fill-opacity=".92"/>`;
    case "spark":
      return `<path d="m300 172 31 98 98 31-98 31-31 98-31-98-98-31 98-31 31-98Z" fill="${color}" fill-opacity=".92"/><circle cx="300" cy="301" r="30" fill="rgba(255,255,255,0.20)"/>`;
    case "ball":
      return `<circle cx="300" cy="295" r="124" fill="${color}" fill-opacity=".9"/><path d="M177 292h246M300 171c39 41 58 82 58 124 0 42-19 84-58 124-39-40-58-82-58-124 0-42 19-83 58-124Z" stroke="rgba(255,255,255,0.24)" stroke-width="18" fill="none"/>`;
    default:
      return `<path d="M300 178 405 232v112c0 69-44 115-105 150-61-35-105-81-105-150V232l105-54Z" fill="${color}" fill-opacity=".88"/><circle cx="300" cy="288" r="32" fill="rgba(255,255,255,0.22)"/><rect x="274" y="328" width="52" height="84" fill="rgba(255,255,255,0.18)"/>`;
  }
}

function escapeSvg(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
