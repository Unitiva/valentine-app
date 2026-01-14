export const themes = [
  {
    id: "romantic",
    name: "💕 Romantico",
    gradient: "from-rose-900 via-pink-800 to-fuchsia-900",
    accent: "pink",
  },
  {
    id: "sunset",
    name: "🌅 Tramonto",
    gradient: "from-orange-900 via-red-800 to-pink-900",
    accent: "orange",
  },
  {
    id: "ocean",
    name: "🌊 Oceano",
    gradient: "from-slate-900 via-blue-900 to-cyan-900",
    accent: "cyan",
  },
  {
    id: "forest",
    name: "🌲 Foresta",
    gradient: "from-slate-900 via-emerald-900 to-green-900",
    accent: "green",
  },
  {
    id: "night",
    name: "🌙 Notte",
    gradient: "from-slate-950 via-purple-950 to-indigo-950",
    accent: "purple",
  },
  {
    id: "gold",
    name: "✨ Oro",
    gradient: "from-amber-900 via-yellow-900 to-orange-900",
    accent: "yellow",
  },
];

export function getThemeById(id) {
  return themes.find((t) => t.id === id) || themes[0];
}
