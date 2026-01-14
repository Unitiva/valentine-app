import { useState } from "react";
import { motion } from "framer-motion";
import { categories } from "../data/questions";

export default function SetupScreen({ onStart }) {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [questionCount, setQuestionCount] = useState(20);
  const [category, setCategory] = useState("all");
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(10);

  const handleStart = () => {
    onStart({
      player1Name: player1Name.trim() || "Giocatore 1",
      player2Name: player2Name.trim() || "Giocatore 2",
      questionCount,
      category,
      timerEnabled,
      timerSeconds,
    });
  };

  return (
    <motion.div
      className="glass p-6 rounded-3xl max-w-md w-full text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
    >
      <h2 className="text-2xl font-bold text-center mb-6">⚙️ Impostazioni</h2>

      {/* Nomi giocatori */}
      <div className="space-y-3 mb-6">
        <div>
          <label className="text-sm text-white/70 block mb-1">
            Nome Giocatore 1
          </label>
          <input
            type="text"
            placeholder="Es: Marco"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>
        <div>
          <label className="text-sm text-white/70 block mb-1">
            Nome Giocatore 2
          </label>
          <input
            type="text"
            placeholder="Es: Laura"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>
      </div>

      {/* Categoria */}
      <div className="mb-6">
        <label className="text-sm text-white/70 block mb-2">Categoria</label>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`py-2 px-3 rounded-xl text-sm font-medium transition ${
                category === cat.id
                  ? "bg-white text-pink-600"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              {cat.icon} {cat.name.split(" ").slice(1).join(" ")}
            </button>
          ))}
        </div>
      </div>

      {/* Numero domande */}
      <div className="mb-6">
        <label className="text-sm text-white/70 block mb-2">
          Numero domande: <span className="font-bold">{questionCount}</span>
        </label>
        <input
          type="range"
          min="20"
          max="40"
          value={questionCount}
          onChange={(e) => setQuestionCount(Number(e.target.value))}
          className="w-full accent-white"
        />
        <div className="flex justify-between text-xs text-white/50 mt-1">
          <span>20</span>
          <span>40</span>
        </div>
      </div>

      {/* Timer */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm text-white/70">Timer per risposta</label>
          <button
            onClick={() => setTimerEnabled(!timerEnabled)}
            aria-label={timerEnabled ? "Disabilita timer" : "Abilita timer"}
            className={`w-12 h-6 rounded-full transition ${
              timerEnabled ? "bg-green-400" : "bg-white/30"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                timerEnabled ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
        {timerEnabled && (
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="5"
              max="30"
              value={timerSeconds}
              onChange={(e) => setTimerSeconds(Number(e.target.value))}
              className="flex-1 accent-white"
            />
            <span className="text-sm font-bold w-12">{timerSeconds}s</span>
          </div>
        )}
      </div>

      <button
        onClick={handleStart}
        className="bg-white text-pink-600 px-6 py-3 rounded-xl font-semibold shadow-lg w-full hover:bg-pink-50 transition"
      >
        Inizia il Quiz! 💕
      </button>
    </motion.div>
  );
}
