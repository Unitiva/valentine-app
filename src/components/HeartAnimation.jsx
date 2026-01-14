import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeartAnimation({ trigger }) {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    if (trigger > 0) {
      const newHearts = Array.from({ length: 15 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        size: 20 + Math.random() * 30,
        emoji: ["❤️", "💕", "💖", "💗", "💘", "💝"][
          Math.floor(Math.random() * 6)
        ],
      }));
      setHearts(newHearts);

      // Rimuovi i cuori dopo l'animazione
      setTimeout(() => setHearts([]), 2500);
    }
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute"
            style={{
              left: `${heart.x}%`,
              fontSize: heart.size,
            }}
            initial={{ y: "100vh", opacity: 1, rotate: 0 }}
            animate={{
              y: "-20vh",
              opacity: [1, 1, 0],
              rotate: [0, -20, 20, -20, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 2,
              delay: heart.delay,
              ease: "easeOut",
            }}
          >
            {heart.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
