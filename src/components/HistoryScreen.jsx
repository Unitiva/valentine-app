import { motion } from "framer-motion";

export default function HistoryScreen({ history, onClose, onClear }) {
  const getScoreEmoji = (score) => {
    if (score === 100) return "💘";
    if (score >= 60) return "😍";
    if (score >= 30) return "😅";
    return "💔";
  };

  return (
    <motion.div
      className="glass p-6 rounded-3xl max-w-md w-full text-white max-h-[80vh] overflow-hidden flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">📊 Storico Partite</h2>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white text-xl"
        >
          ✕
        </button>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-8 text-white/60">
          <p className="text-4xl mb-2">🎮</p>
          <p>Nessuna partita ancora!</p>
          <p className="text-sm">Gioca per vedere il tuo storico.</p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
            {history.map((game, index) => (
              <div
                key={game.date}
                className="bg-white/10 rounded-xl p-3 border border-white/20"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-sm">
                      {game.player1} & {game.player2}
                    </p>
                    <p className="text-xs text-white/60">
                      {new Date(game.date).toLocaleDateString("it-IT", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl">{getScoreEmoji(game.score)}</p>
                    <p className="text-lg font-bold">{game.score}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/20 pt-4">
            <div className="text-center mb-3">
              <p className="text-sm text-white/70">
                Media affinità:{" "}
                <span className="font-bold text-lg">
                  {Math.round(
                    history.reduce((acc, g) => acc + g.score, 0) /
                      history.length
                  )}
                  %
                </span>
              </p>
            </div>
            <button
              onClick={onClear}
              className="w-full py-2 text-sm text-white/60 hover:text-red-300 transition"
            >
              🗑️ Cancella storico
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}
