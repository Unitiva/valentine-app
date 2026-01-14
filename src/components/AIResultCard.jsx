import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getCachedResult, generateLoveContent } from "../services/aiService";

export default function AIResultCard({
  player1Name,
  player2Name,
  score,
  questions,
  answersP1,
  answersP2,
}) {
  const [isGenerating, setIsGenerating] = useState(true);
  const [loveLetter, setLoveLetter] = useState("");
  const [advice, setAdvice] = useState("");
  const [displayedLetter, setDisplayedLetter] = useState("");
  const [displayedAdvice, setDisplayedAdvice] = useState("");

  // Separa le risposte corrispondenti e diverse
  const matchingAnswers = [];
  const differentAnswers = [];

  questions.forEach((q, i) => {
    if (answersP1[i] === answersP2[i]) {
      matchingAnswers.push({ ...q, answer: answersP1[i] });
    } else {
      differentAnswers.push({
        ...q,
        answerP1: answersP1[i],
        answerP2: answersP2[i],
      });
    }
  });

  useEffect(() => {
    // Controlla se abbiamo già il risultato in cache
    const cached = getCachedResult();

    if (cached) {
      setLoveLetter(cached.loveLetter);
      setAdvice(cached.advice);
      setIsGenerating(false);
      return;
    }

    // Genera il contenuto (istantaneo con i template!)
    const result = generateLoveContent(
      player1Name,
      player2Name,
      score,
      matchingAnswers,
      differentAnswers
    );
    if (result && result.loveLetter) {
      setLoveLetter(result.loveLetter);
      setAdvice(result.advice || "");
    }
    setIsGenerating(false);
  }, []);

  // Effetto macchina da scrivere per la lettera
  useEffect(() => {
    if (!loveLetter) return;

    let i = 0;
    const interval = setInterval(() => {
      if (i <= loveLetter.length) {
        setDisplayedLetter(loveLetter.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [loveLetter]);

  // Effetto macchina da scrivere per i consigli
  useEffect(() => {
    if (!advice || displayedLetter !== loveLetter) return;

    let i = 0;
    const interval = setInterval(() => {
      if (i <= advice.length) {
        setDisplayedAdvice(advice.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [advice, displayedLetter, loveLetter]);

  // Spinner component
  const Spinner = () => (
    <div className="flex items-center justify-center py-4">
      <motion.div
        className="w-6 h-6 rounded-full"
        style={{
          border: "3px solid rgba(255,255,255,0.3)",
          borderTopColor: "white",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <span className="ml-3 text-white/70 text-sm">
        Preparo qualcosa di speciale...
      </span>
    </div>
  );

  return (
    <motion.div
      className="mt-6 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Lettera d'amore */}
      <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-white/20 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">💌</span>
          <h3 className="font-semibold text-white">Messaggio per voi</h3>
        </div>

        {isGenerating && !displayedLetter ? (
          <Spinner />
        ) : (
          <p className="text-white/90 text-sm italic leading-relaxed min-h-[60px]">
            {displayedLetter}
            {displayedLetter !== loveLetter && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                |
              </motion.span>
            )}
          </p>
        )}
      </div>

      {/* Consigli */}
      {differentAnswers.length > 0 && (
        <div className="bg-gradient-to-br from-blue-500/20 to-teal-500/20 border border-white/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">💡</span>
            <h3 className="font-semibold text-white">Consigli per voi</h3>
          </div>

          {isGenerating || displayedLetter !== loveLetter ? (
            <p className="text-white/50 text-sm">In arrivo...</p>
          ) : (
            <p className="text-white/90 text-sm leading-relaxed min-h-[40px] whitespace-pre-line">
              {displayedAdvice}
              {displayedAdvice !== advice && advice && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  |
                </motion.span>
              )}
            </p>
          )}
        </div>
      )}

      {/* Footer */}
      <p className="text-[10px] text-white/40 text-center">
        ✨ Personalizzato per {player1Name} & {player2Name}
      </p>
    </motion.div>
  );
}
