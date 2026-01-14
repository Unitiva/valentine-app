import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function QuestionCard({
  question,
  onSelect,
  player,
  currentIndex,
  totalQuestions,
  timerEnabled = false,
  timerSeconds = 10,
  onTimeout,
}) {
  const [timeLeft, setTimeLeft] = useState(timerSeconds);

  const handleTimeout = useCallback(() => {
    if (onTimeout) {
      onTimeout();
    } else {
      // Seleziona una risposta random se scade il tempo
      const randomAnswer =
        question.options[Math.floor(Math.random() * question.options.length)];
      onSelect(randomAnswer);
    }
  }, [onTimeout, onSelect, question.options]);

  useEffect(() => {
    if (!timerEnabled) return;

    setTimeLeft(timerSeconds);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerEnabled, timerSeconds, question.id, handleTimeout]);

  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const timerProgress = (timeLeft / timerSeconds) * 100;

  return (
    <motion.div
      className="glass p-8 rounded-3xl max-w-md w-full text-center text-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.35 }}
    >
      {/* Progress bar - non si ri-renderizza */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-white/70 mb-1">
          <span>{player}</span>
          <span>
            {currentIndex + 1}/{totalQuestions}
          </span>
        </div>
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Timer */}
      {timerEnabled && (
        <div className="mb-4">
          <div className="flex justify-center items-center gap-2 mb-1">
            <span className="text-2xl">⏱️</span>
            <span
              className={`text-xl font-bold ${
                timeLeft <= 3 ? "text-red-300 animate-pulse" : ""
              }`}
            >
              {timeLeft}s
            </span>
          </div>
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${
                timeLeft <= 3 ? "bg-red-400" : "bg-green-400"
              }`}
              animate={{ width: `${timerProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* Contenuto animato - solo questo cambia */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6">{question.text}</h2>

          <div className="flex flex-col gap-4">
            {question.options.map((opt, index) => (
              <motion.button
                key={index}
                onClick={() => onSelect(opt)}
                className="bg-white/95 text-pink-600 py-3 rounded-xl font-semibold shadow hover:bg-white transition w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {opt}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
