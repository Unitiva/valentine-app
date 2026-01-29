Creare Love Sync: un'App React per l’affinità di coppia
Guida completa per developer (codice completo)

San Valentino incontra l’Open Source
Il periodo di San Valentino è sinonimo di connessione, e quale modo migliore per celebrarlo se non attraverso un progetto che unisce tecnologia e sentimenti?
In questa guida completa, vi accompagneremo nella creazione di Love Sync, un'applicazione React che testa la compatibilità di coppia con domande divertenti, animazioni fluide e risultati personalizzati. Se volete vedere subito il risultato finale, potete provare l'app qui: https://valentine-app-indol.vercel.app/.
Questo progetto non è solo un tutorial: è un esempio concreto di come un'idea divertente possa trasformarsi in una Progressive Web App (PWA) completa, moderna e installabile.
Perché React e questo Stack?
Prima di immergerci nel codice, è importante capire perché React, abbinato a Vite e TailwindCSS, rappresenta la scelta ideale per questo progetto.
Per un'applicazione come Love Sync, dove l'interattività e il feedback visivo immediato (animazioni, transizioni) giocano un ruolo cruciale nell'esperienza utente (UX), il modello a componenti di React ci permette di creare interfacce modulari e reattive con estrema facilità.
Vite: Garantisce una build ultra-rapida e una Developer Experience (DX) eccellente.
TailwindCSS: Permette di implementare un design system complesso (come l'effetto Glassmorphism) senza uscire dal markup.
Framer Motion: È la chiave per dare "vita" all'app, gestendo transizioni complesse tra le schermate che sarebbero difficili da realizzare con il solo CSS.
Architettura del progetto: Component-Driven e modulare
Per garantire chiarezza e facilità di sviluppo, l'applicazione è stata progettata seguendo un approccio Component-Driven. Non abbiamo bisogno della complessità di Redux per questo scope; la gestione dello stato è centralizzata ma pulita.
La struttura è divisa logicamente:
Components: I blocchi visivi dell'UI (schermate di gioco, card).
Data: Il "database" statico delle domande e dei temi.
Services: Logica separata per la generazione dei risultati (simulazione AI).
Assets: Gestione di suoni e media.
Struttura delle cartelle
La struttura delle cartelle segue le convenzioni moderne di React, mantenendo una separazione chiara tra logica, vista e dati.
Plaintext

src/
├── components/
│   ├── StartScreen.jsx       # Schermata iniziale
│   ├── SetupScreen.jsx       # Configurazione partita
│   ├── QuestionCard.jsx      # Card delle domande
│   ├── PassPhoneScreen.jsx   # Passaggio telefono
│   ├── ResultScreen.jsx      # Risultati finali
│   ├── AIResultCard.jsx      # Messaggi personalizzati
│   ├── HistoryScreen.jsx     # Storico partite
│   └── HeartAnimation.jsx    # Animazione cuori
├── data/
│   ├── questions.js          # Database domande
│   └── themes.js             # Temi colore
├── services/
│   └── aiService.js          # Generatore messaggi
├── sounds/                   # File audio (opzionale)
├── App.jsx                   # Componente principale
├── main.jsx                  # Entry point
└── index.css                 # Stili globali


Guida passo passo all'implementazione
1. Setup Iniziale e Styling "Glassmorphism"
Iniziamo con la configurazione dell'ambiente. Vite ci offre uno scaffolding istantaneo. Una volta installato TailwindCSS, definiamo subito l'estetica dell'app.
L'effetto vetro (Glassmorphism) è un trend moderno che dona profondità all'interfaccia, perfetto per un'app "romantica" ed elegante.
Bash

npm create vite@latest love-sync -- --template react
cd love-sync
npm install framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

Modifica tailwind.config.cjs:
JavaScript

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

Definiamo le utility CSS globali in src/index.css:
CSS

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Font Google */
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap");

body {
  font-family: "Nunito", sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* Effetto vetro (glassmorphism) */
.glass {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Nascondi scrollbar ma mantieni scroll */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}


2. Il cuore dell'interazione: Start e Setup
La prima impressione conta. Utilizziamo framer-motion per animare l'ingresso degli elementi e il logo, creando un'esperienza accogliente fin dal primo caricamento. Notate come la logica di navigazione viene passata tramite props (onStart, onHistory), mantenendo i componenti "puri" e riutilizzabili.
StartScreen.jsx
JavaScript

// src/components/StartScreen.jsx
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


La schermata di configurazione gestisce input controllati per nomi e preferenze, dimostrando la semplicità di gestione dei form in React senza librerie esterne.
SetupScreen.jsx
JavaScript

// src/components/SetupScreen.jsx
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



3. UX Dinamica: QuestionCard e Transizioni
La QuestionCard utilizza AnimatePresence per creare transizioni fluide tra una domanda e l'altra. Questo piccolo dettaglio migliora drasticamente la percezione di qualità dell'app. La barra di progresso fornisce un feedback visivo immediato sullo stato della partita.
JavaScript

// src/components/QuestionCard.jsx
import { useEffect, useState, useCallback, useRef } from "react";
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
  const questionRef = useRef(question);
  const hasAnsweredRef = useRef(false);

  // Aggiorna la ref quando cambia la domanda
  useEffect(() => {
    questionRef.current = question;
    hasAnsweredRef.current = false;
  }, [question]);

  const handleSelect = useCallback(
    (answer) => {
      if (hasAnsweredRef.current) return;
      hasAnsweredRef.current = true;
      onSelect(answer);
    },
    [onSelect],
  );

  const handleTimeout = useCallback(() => {
    if (hasAnsweredRef.current) return;

    if (onTimeout) {
      hasAnsweredRef.current = true;
      onTimeout();
    } else {
      const currentQuestion = questionRef.current;
      if (currentQuestion?.options?.length) {
        // Seleziona una risposta random se scade il tempo
        const randomAnswer =
          currentQuestion.options[
            Math.floor(Math.random() * currentQuestion.options.length)
          ];
        hasAnsweredRef.current = true;
        onSelect(randomAnswer);
      }
    }
  }, [onTimeout, onSelect]);

  useEffect(() => {
    if (!timerEnabled || !question) return;

    setTimeLeft(timerSeconds);
    hasAnsweredRef.current = false;

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
  }, [timerEnabled, timerSeconds, question?.id, handleTimeout]);

  // Early return DOPO tutti gli hooks
  if (!question) {
    return null;
  }

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
                onClick={() => handleSelect(opt)}
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



Dato che l'app è pensata per essere usata su un solo dispositivo passato di mano in mano, abbiamo bisogno di una schermata intermedia "anti-sbirciatina".
JavaScript

// src/components/PassPhoneScreen.jsx
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


4. Gestione dello Stato: App.jsx
Invece di soluzioni complesse, utilizziamo gli Hook di React (useState, useEffect, useMemo) per orchestrare il flusso del gioco. App.jsx agisce come "controllore", gestendo la macchina a stati finiti dell'applicazione: start -> setup -> p1 (turno giocatore 1) -> passPhone -> p2 -> result.
Questo approccio centralizzato rende il debug estremamente semplice.
JavaScript

// src/App.jsx
import { useMemo, useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import StartScreen from "./components/StartScreen";
import SetupScreen from "./components/SetupScreen";
import QuestionCard from "./components/QuestionCard";
import ResultScreen from "./components/ResultScreen";
import PassPhoneScreen from "./components/PassPhoneScreen";
import HistoryScreen from "./components/HistoryScreen";
import { getRandomQuestions } from "./data/questions";
import { getThemeById } from "./data/themes";
import { resetCache } from "./services/aiService";

// Chiavi localStorage
const HISTORY_KEY = "lovesync_history";
const THEME_KEY = "lovesync_theme";

// Helper per localStorage
const loadHistory = () => {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  } catch {
    return [];
  }
};

const saveHistory = (history) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 20)));
};

export default function App() {
  // Stati del gioco
  const [step, setStep] = useState("start");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answersP1, setAnswersP1] = useState([]);
  const [answersP2, setAnswersP2] = useState([]);
  const [score, setScore] = useState(0);
  const [gameQuestions, setGameQuestions] = useState([]);
  const [history, setHistory] = useState([]);

  // Impostazioni gioco
  const [player1Name, setPlayer1Name] = useState("Giocatore 1");
  const [player2Name, setPlayer2Name] = useState("Giocatore 2");
  const [currentTheme, setCurrentTheme] = useState("romantic");

  // Audio (opzionale)
  const clickSound = useMemo(() => new Audio("/sounds/click.mp3"), []);

  // Carica dati al mount
  useEffect(() => {
    setHistory(loadHistory());
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) setCurrentTheme(savedTheme);
  }, []);

  const theme = getThemeById(currentTheme);

  // Gestione risposta
  const handleAnswer = (answer) => {
    // Riproduci suono (opzionale)
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});

    if (step === "p1") {
      setAnswersP1((prev) => [...prev, answer]);
    } else {
      setAnswersP2((prev) => [...prev, answer]);
    }

    if (currentIndex < gameQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      if (step === "p1") {
        setStep("passPhone");
      } else {
        calculateResult();
      }
    }
  };

  // Calcola risultato finale
  const calculateResult = () => {
    const finalAnswersP2 = [...answersP2, answersP2[answersP2.length - 1]];
    let matches = 0;
    answersP1.forEach((ans, i) => {
      if (ans === finalAnswersP2[i]) matches++;
    });
    const finalScore = Math.round((matches / gameQuestions.length) * 100);
    setScore(finalScore);

    // Salva nello storico
    const newGame = {
      date: new Date().toISOString(),
      player1: player1Name,
      player2: player2Name,
      score: finalScore,
    };
    const updatedHistory = [newGame, ...history];
    setHistory(updatedHistory);
    saveHistory(updatedHistory);

    setStep("result");
  };

  // Naviga al setup
  const goToSetup = () => setStep("setup");

  // Avvia partita
  const startGame = (settings) => {
    resetCache(); // Reset messaggi
    setPlayer1Name(settings.player1Name);
    setPlayer2Name(settings.player2Name);

    const questions = getRandomQuestions(
      settings.questionCount,
      settings.category
    );
    setGameQuestions(questions);

    setStep("p1");
    setCurrentIndex(0);
    setAnswersP1([]);
    setAnswersP2([]);
  };

  // Continua a P2
  const continueToP2 = () => {
    setStep("p2");
    setCurrentIndex(0);
  };

  // Ricomincia
  const restart = () => {
    setStep("start");
    setAnswersP1([]);
    setAnswersP2([]);
    setScore(0);
    setCurrentIndex(0);
    setGameQuestions([]);
  };

  // Mostra storico
  const showHistory = () => setStep("history");

  return (
    <div
      className={`min-h-screen flex flex-col items-center 
                  justify-center p-4 bg-gradient-to-br 
                  ${theme.gradient} transition-all duration-500`}
    >
      <AnimatePresence mode="wait">
        {step === "start" && (
          <StartScreen
            key="start"
            onStart={goToSetup}
            onHistory={showHistory}
          />
        )}

        {step === "setup" && <SetupScreen key="setup" onStart={startGame} />}

        {step === "p1" && gameQuestions[currentIndex] && (
          <QuestionCard
            key={`p1-${currentIndex}`}
            question={gameQuestions[currentIndex]}
            onAnswer={handleAnswer}
            currentIndex={currentIndex}
            totalQuestions={gameQuestions.length}
            playerName={player1Name}
          />
        )}

        {step === "passPhone" && (
          <PassPhoneScreen
            key="pass"
            player2Name={player2Name}
            onContinue={continueToP2}
          />
        )}

        {step === "p2" && gameQuestions[currentIndex] && (
          <QuestionCard
            key={`p2-${currentIndex}`}
            question={gameQuestions[currentIndex]}
            onAnswer={handleAnswer}
            currentIndex={currentIndex}
            totalQuestions={gameQuestions.length}
            playerName={player2Name}
          />
        )}

        {step === "result" && (
          <ResultScreen
            key="result"
            score={score}
            player1Name={player1Name}
            player2Name={player2Name}
            questions={gameQuestions}
            answersP1={answersP1}
            answersP2={answersP2}
            onRestart={restart}
          />
        )}

        {step === "history" && (
          <HistoryScreen
            key="history"
            history={history}
            onBack={() => setStep("start")}
            onClear={() => {
              setHistory([]);
              localStorage.removeItem(HISTORY_KEY);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
5. Data Model e Temi
Un punto di forza di questa architettura è la separazione dei dati. questions.js agisce come repository e themes.js permette una personalizzazione immediata dell'UI tramite variabili che controllano i gradienti di Tailwind.
JavaScript

// src/data/questions.js

export const categories = [
  { id: "all", name: "Tutte", icon: "🎲" },
  { id: "romanticismo", name: "Romanticismo", icon: "💕" },
  { id: "quotidiano", name: "Vita Quotidiana", icon: "🏠" },
  { id: "futuro", name: "Futuro", icon: "🔮" },
  { id: "viaggi", name: "Viaggi", icon: "✈️" },
  { id: "gusti", name: "Gusti", icon: "🍕" },
  { id: "personalita", name: "Personalità", icon: "🧠" },
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

  // Vita Quotidiana
  {
    id: 4,
    text: "Mattiniero o Nottambulo?",
    options: ["Mattiniero", "Nottambulo"],
    category: "quotidiano",
  },
  {
    id: 5,
    text: "Casa ordinata o creativo caos?",
    options: ["Ordinata", "Caos creativo"],
    category: "quotidiano",
  },

  // Futuro
  {
    id: 6,
    text: "Figli: sì o no?",
    options: ["Sì", "No"],
    category: "futuro",
  },
  {
    id: 7,
    text: "Dove vivere?",
    options: ["Città", "Campagna/Mare"],
    category: "futuro",
  },

  // Viaggi
  {
    id: 8,
    text: "Vacanze Relax o Avventura?",
    options: ["Relax", "Avventura"],
    category: "viaggi",
  },
  {
    id: 9,
    text: "Mare o Montagna?",
    options: ["Mare", "Montagna"],
    category: "viaggi",
  },

  // Gusti
  {
    id: 10,
    text: "Pizza o Sushi?",
    options: ["Pizza", "Sushi"],
    category: "gusti",
  },
  {
    id: 11,
    text: "Dolce o Salato?",
    options: ["Dolce", "Salato"],
    category: "gusti",
  },

  // Personalità
  {
    id: 12,
    text: "Introverso o Estroverso?",
    options: ["Introverso", "Estroverso"],
    category: "personalita",
  },
  {
    id: 13,
    text: "Logica o Istinto?",
    options: ["Logica", "Istinto"],
    category: "personalita",
  },

  // Aggiungi altre domande per arrivare a 40+
];

// Funzione per ottenere domande random
export function getRandomQuestions(count = 20, categoryFilter = null) {
  let filtered = questions;

  if (categoryFilter && categoryFilter !== "all") {
    filtered = questions.filter((q) => q.category === categoryFilter);
  }

  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

JavaScript

// src/data/themes.js

export const themes = [
  {
    id: "romantic",
    name: "Romantico",
    gradient: "from-pink-800 via-rose-900 to-red-950",
    primary: "pink",
  },
  {
    id: "sunset",
    name: "Tramonto",
    gradient: "from-orange-800 via-red-900 to-pink-950",
    primary: "orange",
  },
  {
    id: "ocean",
    name: "Oceano",
    gradient: "from-blue-800 via-cyan-900 to-teal-950",
    primary: "blue",
  },
  {
    id: "forest",
    name: "Foresta",
    gradient: "from-green-800 via-emerald-900 to-teal-950",
    primary: "green",
  },
  {
    id: "night",
    name: "Notte",
    gradient: "from-indigo-800 via-purple-900 to-violet-950",
    primary: "purple",
  },
  {
    id: "passion",
    name: "Passione",
    gradient: "from-red-800 via-rose-900 to-pink-950",
    primary: "red",
  },
];

export const getThemeById = (id) => {
  return themes.find((t) => t.id === id) || themes[0];
};
6. Risultati e Simulazione AI
Per rendere l'app più coinvolgente, abbiamo creato un aiService. Nonostante non si connetta a un'API esterna (mantenendo l'app veloce e gratuita), utilizza template intelligenti per generare messaggi che sembrano scritti su misura in base al punteggio. Questo dimostra come la logica di business possa aggiungere valore anche senza backend complessi.
JavaScript
// src/components/ResultScreen.jsx
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

JavaScript

// src/services/aiService.js

const loveLetterTemplates = {
  perfect: [
    "Carissimi {p1} e {p2}, siete anime gemelle! 💕",
    "{p1} e {p2}, la vostra sintonia è magica! ✨",
    "Wow, {p1} e {p2}! Una compatibilità perfetta! 💘",
    // Aggiungi molti altri template...
  ],
  high: [
    "{p1} e {p2}, avete una bellissima intesa! 💑",
    "Che bella coppia siete, {p1} e {p2}! 🌹",
    // ...
  ],
  medium: [
    "{p1} e {p2}, il vostro amore è un'avventura! 🌟",
    // ...
  ],
  low: [
    "{p1} e {p2}, gli opposti si attraggono! 🔥",
    // ...
  ],
};

const adviceTemplates = [
  "💬 Parlate apertamente dei vostri desideri.",
  "👟 Mettetevi nei panni dell'altro.",
  "🎨 Celebrate le vostre differenze!",
  // Aggiungi molti altri consigli...
];

// Shuffle array (Fisher-Yates)
const shuffleArray = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

let cachedResult = null;

export const resetCache = () => {
  cachedResult = null;
};

export const getCachedResult = () => cachedResult;

export const generateLoveContent = (
  player1Name,
  player2Name,
  score,
  matchingAnswers,
  differentAnswers
) => {
  if (cachedResult) return cachedResult;

  // Scegli categoria
  let category;
  if (score === 100) category = "perfect";
  else if (score >= 70) category = "high";
  else if (score >= 40) category = "medium";
  else category = "low";

  // Genera lettera
  const shuffledLetters = shuffleArray(loveLetterTemplates[category]);
  const loveLetter = shuffledLetters[0]
    .replace(/{p1}/g, player1Name)
    .replace(/{p2}/g, player2Name);

  // Genera consigli
  const shuffledAdvice = shuffleArray(adviceTemplates);
  const advice = shuffledAdvice.slice(0, 2).join("\n\n");

  cachedResult = { loveLetter, advice };
  return cachedResult;
};
7. Il tocco magico: HeartAnimation
Una PWA di qualità si distingue per i dettagli. HeartAnimation genera particelle dinamiche. Notate l'uso di useEffect per pulire lo stato e rimuovere gli elementi dal DOM dopo l'animazione, prevenendo memory leaks.
JavaScript

// src/components/HeartAnimation.jsx
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

Persistenza e PWA
Come ciliegina sulla torta, sfruttiamo localStorage per mantenere uno storico delle partite e registriamo il Service Worker per rendere l'app installabile come una nativa.
JavaScript

// Salva nello storico
const saveHistory = (history) => {
  localStorage.setItem(
    "lovesync_history",
    JSON.stringify(history.slice(0, 20))
  );
};

// Carica storico
const loadHistory = () => {
  try {
    return JSON.parse(localStorage.getItem("lovesync_history")) || [];
  } catch {
    return [];
  }
};

// Salva tema
localStorage.setItem("lovesync_theme", themeId);

// Carica tema
const savedTheme = localStorage.getItem("lovesync_theme");

Il manifest.json trasforma il nostro sito in un'app installabile sulla home screen:
JSON

{
  "name": "Love Sync",
  "short_name": "Love Sync",
  "description": "Test di compatibilità per coppie",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ec4899",
  "theme_color": "#ec4899",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}

Deploy su Netlify/Vercel
Uno dei vantaggi dell'ecosistema React è la semplicità di deploy.
Crea un account su netlify.com o vercel.com
Connetti il repository GitHub
Il sistema rileverà automaticamente vite build e la cartella dist.
Deploy automatico ad ogni push!
Estensioni e Roadmap Future
Il progetto è strutturato per essere una base solida. Ecco come potreste espanderlo:
Autenticazione: Integrare Firebase Auth per salvare lo storico nel cloud e condividerlo tra dispositivi.
AI Reale: Connettere le OpenAI API per analizzare le risposte e generare commenti davvero unici e ironici sulla coppia.
Modalità Multiplayer: Usare WebSocket (o Firebase Realtime Database) per permettere ai partner di rispondere contemporaneamente dai propri telefoni, invece di passarsi il dispositivo.
Il valore dell’Open Source
Love Sync dimostra come React non sia solo per dashboard aziendali complesse, ma anche per creare esperienze utente magiche e divertenti con uno sforzo relativamente contenuto. Abbiamo coperto l'uso di Hooks, animazioni avanzate, styling atomico e logica client-side.
Vi invito a prendere questo codice, giocarci, rompere qualcosa e migliorarlo 😀. Che sia per imparare o per fare un regalo speciale al vostro partner, il codice è tutto vostro.
Buon coding e buon San Valentino! 💕





https://github.com/Unitiva/valentine-app
