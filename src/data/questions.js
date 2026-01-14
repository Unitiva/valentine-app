export const categories = [
  { id: "all", name: "🎲 Tutte", icon: "🎲" },
  { id: "romanticismo", name: "💕 Romanticismo", icon: "💕" },
  { id: "quotidiano", name: "🏠 Vita Quotidiana", icon: "🏠" },
  { id: "futuro", name: "🔮 Futuro", icon: "🔮" },
  { id: "viaggi", name: "✈️ Viaggi", icon: "✈️" },
  { id: "gusti", name: "🍕 Gusti & Preferenze", icon: "🍕" },
  { id: "personalita", name: "🧠 Personalità", icon: "🧠" },
];

export const questions = [
  // Romanticismo
  {
    id: 1,
    text: "Qual è il regalo perfetto?",
    options: ["Esperienze insieme", "Qualcosa di materiale"],
    category: "romanticismo",
  },
  {
    id: 2,
    text: "San Valentino ideale?",
    options: ["Cena romantica", "Avventura spontanea"],
    category: "romanticismo",
  },
  {
    id: 3,
    text: "Come preferisci mostrare affetto?",
    options: ["Parole dolci", "Gesti concreti"],
    category: "romanticismo",
  },
  {
    id: 4,
    text: "Film romantico o commedia?",
    options: ["Romantico", "Commedia"],
    category: "romanticismo",
  },
  {
    id: 5,
    text: "Sorprese o piani organizzati?",
    options: ["Sorprese", "Piani"],
    category: "romanticismo",
  },

  // Vita Quotidiana
  {
    id: 6,
    text: "Chi cucina di più?",
    options: ["Io", "Tu"],
    category: "quotidiano",
  },
  {
    id: 7,
    text: "Chi chiede scusa per primo?",
    options: ["Io", "Tu"],
    category: "quotidiano",
  },
  {
    id: 8,
    text: "Mattiniero o Nottambulo?",
    options: ["Mattiniero", "Nottambulo"],
    category: "quotidiano",
  },
  {
    id: 9,
    text: "Casa ordinata o creativo caos?",
    options: ["Ordinata", "Caos creativo"],
    category: "quotidiano",
  },
  {
    id: 10,
    text: "Divano o uscire?",
    options: ["Divano", "Uscire"],
    category: "quotidiano",
  },
  {
    id: 11,
    text: "Chi è più testardo?",
    options: ["Io", "Tu"],
    category: "quotidiano",
  },
  {
    id: 12,
    text: "Litigio: parlarne subito o dopo?",
    options: ["Subito", "Dopo essersi calmati"],
    category: "quotidiano",
  },

  // Futuro
  {
    id: 13,
    text: "Figli: sì o no?",
    options: ["Sì", "No"],
    category: "futuro",
  },
  {
    id: 14,
    text: "Dove vivere?",
    options: ["Città", "Campagna/Mare"],
    category: "futuro",
  },
  {
    id: 15,
    text: "Animali domestici?",
    options: ["Cane", "Gatto"],
    category: "futuro",
  },
  {
    id: 16,
    text: "Casa di proprietà o affitto?",
    options: ["Proprietà", "Affitto"],
    category: "futuro",
  },
  {
    id: 17,
    text: "Risparmiare o vivere il momento?",
    options: ["Risparmiare", "Vivere il momento"],
    category: "futuro",
  },

  // Viaggi
  {
    id: 18,
    text: "Vacanze Relax o Avventura?",
    options: ["Relax", "Avventura"],
    category: "viaggi",
  },
  {
    id: 19,
    text: "Mare o Montagna?",
    options: ["Mare", "Montagna"],
    category: "viaggi",
  },
  {
    id: 20,
    text: "Hotel lusso o Zaino in spalla?",
    options: ["Hotel lusso", "Zaino in spalla"],
    category: "viaggi",
  },
  {
    id: 21,
    text: "Viaggio organizzato o improvvisato?",
    options: ["Organizzato", "Improvvisato"],
    category: "viaggi",
  },
  {
    id: 22,
    text: "Destinazione da sogno?",
    options: ["Giappone", "Maldive"],
    category: "viaggi",
  },

  // Gusti & Preferenze
  {
    id: 23,
    text: "Pizza o Sushi?",
    options: ["Pizza", "Sushi"],
    category: "gusti",
  },
  {
    id: 24,
    text: "Film o Serie TV?",
    options: ["Film", "Serie TV"],
    category: "gusti",
  },
  {
    id: 25,
    text: "Dolce o Salato?",
    options: ["Dolce", "Salato"],
    category: "gusti",
  },
  { id: 26, text: "Caffè o Tè?", options: ["Caffè", "Tè"], category: "gusti" },
  {
    id: 27,
    text: "Musica: Pop o Rock?",
    options: ["Pop", "Rock"],
    category: "gusti",
  },
  {
    id: 28,
    text: "Netflix o Cinema?",
    options: ["Netflix", "Cinema"],
    category: "gusti",
  },

  // Personalità
  {
    id: 29,
    text: "Introverso o Estroverso?",
    options: ["Introverso", "Estroverso"],
    category: "personalita",
  },
  {
    id: 30,
    text: "Logica o Istinto?",
    options: ["Logica", "Istinto"],
    category: "personalita",
  },
  {
    id: 31,
    text: "Ottimista o Realista?",
    options: ["Ottimista", "Realista"],
    category: "personalita",
  },
  {
    id: 32,
    text: "Leader o Supporter?",
    options: ["Leader", "Supporter"],
    category: "personalita",
  },
  {
    id: 33,
    text: "Puntuale o Sempre in ritardo?",
    options: ["Puntuale", "In ritardo"],
    category: "personalita",
  },

  // Nuove domande
  {
    id: 34,
    text: "Prima colazione dolce o salata?",
    options: ["Dolce", "Salata"],
    category: "gusti",
  },
  {
    id: 35,
    text: "Serata ideale: amici o noi due?",
    options: ["Con amici", "Solo noi due"],
    category: "romanticismo",
  },
  {
    id: 36,
    text: "Sport: praticarlo o guardarlo?",
    options: ["Praticarlo", "Guardarlo"],
    category: "quotidiano",
  },
  {
    id: 37,
    text: "Inverno o Estate?",
    options: ["Inverno", "Estate"],
    category: "gusti",
  },
  {
    id: 38,
    text: "Matrimonio: grande festa o intimo?",
    options: ["Grande festa", "Cerimonia intima"],
    category: "futuro",
  },
  {
    id: 39,
    text: "Sveglia: prima o ultima occasione?",
    options: ["Al primo suono", "Dopo 10 snooze"],
    category: "quotidiano",
  },
  {
    id: 40,
    text: "Social media: attivi o discreti?",
    options: ["Sempre online", "Discreti"],
    category: "personalita",
  },
];

// Funzione per ottenere domande random
export function getRandomQuestions(count = 10, categoryFilter = null) {
  let filtered = questions;
  if (categoryFilter && categoryFilter !== "all") {
    filtered = questions.filter((q) => q.category === categoryFilter);
  }
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
