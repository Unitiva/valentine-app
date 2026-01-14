import { motion } from "framer-motion";

export default function StartScreen({ onStart, onShowHistory, hasHistory }) {
  return (
    <motion.div
      className="glass p-8 rounded-3xl text-center max-w-md w-full text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
    >
      <motion.h1
        className="text-4xl font-bold mb-4"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        ❤️ Love Sync
      </motion.h1>
      <p className="text-white/80 mb-6">
        Il test di affinità in tempo reale per coppie.
      </p>
      <button
        onClick={onStart}
        className="bg-white text-pink-600 px-6 py-3 rounded-xl font-semibold shadow-lg w-full hover:bg-pink-50 transition mb-3"
      >
        Inizia ✨
      </button>

      {hasHistory && (
        <button
          onClick={onShowHistory}
          className="bg-white/20 text-white px-6 py-2 rounded-xl font-medium w-full hover:bg-white/30 transition"
        >
          📊 Storico Partite
        </button>
      )}

      <p className="text-xs text-white/60 mt-4">
        Modalità Pass &amp; Play – niente account, solo divertimento.
      </p>
    </motion.div>
  );
}
