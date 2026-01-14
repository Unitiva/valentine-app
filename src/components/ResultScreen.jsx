import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import AIResultCard from "./AIResultCard";

export default function ResultScreen({
  score,
  onRestart,
  player1Name,
  player2Name,
  answersP1,
  answersP2,
  questions,
}) {
  const successSound = useMemo(() => new Audio("/sounds/success.mp3"), []);
  const failSound = useMemo(() => new Audio("/sounds/fail.mp3"), []);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const sound = score >= 60 ? successSound : failSound;
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }, [score, successSound, failSound]);

  const getTitle = () => {
    if (score === 100) return "Anime Gemelle 💘";
    if (score >= 60) return "Ottima Intesa 😍";
    if (score >= 30) return "Da Migliorare 😅";
    return "Disastro Totale 💔";
  };

  const shareResult = async () => {
    const text =
      "🎮 Love Sync: " +
      player1Name +
      " & " +
      player2Name +
      " hanno " +
      score +
      "% di affinità! " +
      getTitle() +
      "\n\nProva anche tu: ";

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Love Sync - Test di Affinità",
          text: text,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(text + window.location.href);
      alert("Risultato copiato negli appunti! 📋");
    }
  };

  return (
    <motion.div
      className="glass p-6 rounded-3xl max-w-md w-full text-center text-white max-h-[90vh] overflow-y-auto"
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 140 }}
    >
      <h1 className="text-3xl font-bold mb-2">{getTitle()}</h1>
      <p className="text-lg text-white/80 mb-1">
        {player1Name} & {player2Name}
      </p>

      <div className="relative w-32 h-32 mx-auto my-6">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="8"
            fill="none"
          />
          <motion.circle
            cx="64"
            cy="64"
            r="56"
            stroke="white"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: score / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ strokeDasharray: "352", strokeDashoffset: "0" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold">{score}%</span>
        </div>
      </div>

      <button
        onClick={() => setShowDetails(!showDetails)}
        className="text-sm text-white/70 hover:text-white mb-4 underline"
      >
        {showDetails ? "Nascondi dettagli" : "Mostra dettagli risposte"}
      </button>

      {showDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mb-4 text-left"
        >
          <div className="bg-white/10 rounded-xl p-3 max-h-48 overflow-y-auto">
            {questions.map((q, i) => {
              const match = answersP1[i] === answersP2[i];
              return (
                <div
                  key={q.id}
                  className={
                    "py-2 border-b border-white/10 last:border-0 " +
                    (match ? "text-green-300" : "text-red-300")
                  }
                >
                  <p className="text-xs text-white/60">{q.text}</p>
                  <div className="flex justify-between text-sm mt-1">
                    <span>
                      {player1Name}: {answersP1[i]}
                    </span>
                    <span>{match ? "✅" : "❌"}</span>
                    <span>
                      {player2Name}: {answersP2[i]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      <div className="space-y-3">
        <button
          onClick={shareResult}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg w-full hover:opacity-90 transition"
        >
          Condividi 📤
        </button>

        <button
          onClick={onRestart}
          className="bg-white text-pink-600 px-6 py-3 rounded-xl font-semibold shadow-lg w-full hover:bg-pink-50 transition"
        >
          Gioca Ancora 🔄
        </button>
      </div>

      {/* AI Generated Content */}
      <AIResultCard
        player1Name={player1Name}
        player2Name={player2Name}
        score={score}
        questions={questions}
        answersP1={answersP1}
        answersP2={answersP2}
      />

      <p className="text-xs text-white/60 mt-4">
        Parlatene insieme: dove siete allineati? Dove sorprendete l'altro?
      </p>
    </motion.div>
  );
}
