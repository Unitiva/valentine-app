import { motion } from "framer-motion";

export default function PassPhoneScreen({ fromPlayer, toPlayer, onReady }) {
  return (
    <motion.div
      className="glass p-8 rounded-3xl max-w-md w-full text-center text-white"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="text-6xl mb-4"
        animate={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        📱
      </motion.div>

      <h2 className="text-2xl font-bold mb-2">Passa il telefono!</h2>
      <p className="text-white/80 mb-6">
        {fromPlayer} ha finito.
        <br />
        Ora tocca a <span className="font-bold text-pink-200">{toPlayer}</span>!
      </p>

      <p className="text-sm text-white/60 mb-6">
        ⚠️ Non sbirciare le risposte dell'altro!
      </p>

      <button
        onClick={onReady}
        className="bg-white text-pink-600 px-6 py-3 rounded-xl font-semibold shadow-lg w-full hover:bg-pink-50 transition"
      >
        Sono pronto/a! 🚀
      </button>
    </motion.div>
  );
}
