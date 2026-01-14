# 💕 Come Creare Love Sync: Un'App React per Coppie

Una guida passo passo per costruire un'applicazione React che testa la compatibilità di coppia con domande divertenti, animazioni fluide e risultati personalizzati.

![Love Sync](https://img.shields.io/badge/React-18.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-5.0.0-purple) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.0-teal)

---

## 📋 Indice

1. [Panoramica del Progetto](#-panoramica-del-progetto)
2. [Setup Iniziale](#-setup-iniziale)
3. [Struttura del Progetto](#-struttura-del-progetto)
4. [Creazione dei Componenti](#-creazione-dei-componenti)
5. [Gestione dello Stato](#-gestione-dello-stato)
6. [Sistema di Domande](#-sistema-di-domande)
7. [Temi e Stili](#-temi-e-stili)
8. [Animazioni con Framer Motion](#-animazioni-con-framer-motion)
9. [Messaggi Personalizzati](#-messaggi-personalizzati)
10. [Persistenza dei Dati](#-persistenza-dei-dati)
11. [PWA e Service Worker](#-pwa-e-service-worker)
12. [Deploy](#-deploy)

---

## 🎯 Panoramica del Progetto

**Love Sync** è un'app che permette a due partner di rispondere alle stesse domande separatamente, per poi confrontare le risposte e calcolare un punteggio di compatibilità.

### Funzionalità Principali

- ✅ Quiz a turni (prima un partner, poi l'altro)
- ✅ Calcolo automatico della compatibilità
- ✅ Messaggi personalizzati in base al punteggio
- ✅ Consigli per la coppia
- ✅ Storico delle partite
- ✅ Temi personalizzabili
- ✅ Animazioni fluide
- ✅ Effetti sonori
- ✅ Progressive Web App (installabile)

---

## 🚀 Setup Iniziale

### 1. Crea il progetto con Vite

```bash
npm create vite@latest love-sync -- --template react
cd love-sync
```

### 2. Installa le dipendenze

```bash
npm install framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Configura TailwindCSS

Modifica `tailwind.config.cjs`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### 4. Configura gli stili base

Sostituisci il contenuto di `src/index.css`:

```css
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
```

---

## 📁 Struttura del Progetto

Crea la seguente struttura di cartelle:

```
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
```

---

## 🧩 Creazione dei Componenti

### 1. StartScreen - La Schermata Iniziale

```jsx
// src/components/StartScreen.jsx
import { motion } from "framer-motion";

export default function StartScreen({ onStart, onHistory }) {
  return (
    <motion.div
      className="glass p-8 rounded-3xl max-w-md w-full text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      {/* Logo animato */}
      <motion.div
        className="text-7xl mb-4"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        💕
      </motion.div>

      <h1 className="text-4xl font-extrabold text-white mb-2">Love Sync</h1>

      <p className="text-white/80 mb-8">Scopri quanto siete in sintonia!</p>

      <button
        onClick={onStart}
        className="w-full py-4 bg-white text-pink-600 rounded-2xl 
                   font-bold text-lg shadow-lg hover:shadow-xl 
                   transform hover:scale-105 transition-all"
      >
        🎮 Inizia il Test
      </button>

      <button
        onClick={onHistory}
        className="w-full mt-3 py-3 bg-white/20 text-white 
                   rounded-2xl font-semibold hover:bg-white/30 
                   transition-all"
      >
        📊 Storico Partite
      </button>
    </motion.div>
  );
}
```

### 2. SetupScreen - Configurazione Partita

```jsx
// src/components/SetupScreen.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { categories } from "../data/questions";

export default function SetupScreen({ onStart }) {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [questionCount, setQuestionCount] = useState(20);
  const [category, setCategory] = useState("all");

  const handleStart = () => {
    onStart({
      player1Name: player1Name.trim() || "Giocatore 1",
      player2Name: player2Name.trim() || "Giocatore 2",
      questionCount,
      category,
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

      {/* Input nomi */}
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
            className="w-full px-4 py-2 rounded-xl bg-white/20 
                       border border-white/30 text-white 
                       placeholder-white/50 focus:outline-none 
                       focus:ring-2 focus:ring-white/50"
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
            className="w-full px-4 py-2 rounded-xl bg-white/20 
                       border border-white/30 text-white 
                       placeholder-white/50"
          />
        </div>
      </div>

      {/* Selezione categoria */}
      <div className="mb-6">
        <label className="text-sm text-white/70 block mb-2">Categoria</label>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`py-2 px-3 rounded-xl text-sm font-medium 
                         transition ${
                           category === cat.id
                             ? "bg-white text-pink-600"
                             : "bg-white/20 text-white hover:bg-white/30"
                         }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Slider numero domande */}
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
      </div>

      {/* Pulsante avvia */}
      <button
        onClick={handleStart}
        className="w-full py-4 bg-white text-pink-600 rounded-2xl 
                   font-bold text-lg hover:scale-105 transition-transform"
      >
        ▶️ Avvia Partita
      </button>
    </motion.div>
  );
}
```

### 3. QuestionCard - Le Domande

```jsx
// src/components/QuestionCard.jsx
import { motion, AnimatePresence } from "framer-motion";

export default function QuestionCard({
  question,
  onAnswer,
  currentIndex,
  totalQuestions,
  playerName,
}) {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <motion.div
      className="glass p-6 rounded-3xl max-w-md w-full"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      {/* Header con progresso */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-white/70 text-sm">{playerName}</span>
        <span className="text-white font-bold">
          {currentIndex + 1}/{totalQuestions}
        </span>
      </div>

      {/* Barra progresso */}
      <div className="h-2 bg-white/20 rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-white rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Domanda */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            {question.text}
          </h2>

          {/* Opzioni */}
          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <motion.button
                key={idx}
                onClick={() => onAnswer(option)}
                className="w-full py-4 bg-white/20 text-white 
                           rounded-2xl font-semibold text-lg
                           border-2 border-transparent
                           hover:bg-white hover:text-pink-600
                           hover:border-white transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
```

### 4. PassPhoneScreen - Passaggio Telefono

```jsx
// src/components/PassPhoneScreen.jsx
import { motion } from "framer-motion";

export default function PassPhoneScreen({ player2Name, onContinue }) {
  return (
    <motion.div
      className="glass p-8 rounded-3xl max-w-md w-full text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <motion.div
        className="text-6xl mb-4"
        animate={{
          x: [0, 20, -20, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        📱
      </motion.div>

      <h2 className="text-2xl font-bold text-white mb-4">
        Passa il telefono a
      </h2>

      <p className="text-4xl font-extrabold text-white mb-8">{player2Name}</p>

      <p className="text-white/70 mb-8">⚠️ Niente sbirciatine!</p>

      <button
        onClick={onContinue}
        className="w-full py-4 bg-white text-pink-600 rounded-2xl 
                   font-bold text-lg hover:scale-105 transition-transform"
      >
        ✅ Sono pronto/a!
      </button>
    </motion.div>
  );
}
```

### 5. ResultScreen - I Risultati

```jsx
// src/components/ResultScreen.jsx
import { motion } from "framer-motion";
import AIResultCard from "./AIResultCard";

export default function ResultScreen({
  score,
  player1Name,
  player2Name,
  questions,
  answersP1,
  answersP2,
  onRestart,
}) {
  // Determina emoji e messaggio in base al punteggio
  const getScoreEmoji = () => {
    if (score === 100) return "💯";
    if (score >= 80) return "🔥";
    if (score >= 60) return "💕";
    if (score >= 40) return "😊";
    return "🤔";
  };

  const getScoreMessage = () => {
    if (score === 100) return "Perfezione assoluta!";
    if (score >= 80) return "Siete in grande sintonia!";
    if (score >= 60) return "Bella intesa!";
    if (score >= 40) return "C'è margine di crescita!";
    return "Gli opposti si attraggono!";
  };

  return (
    <motion.div
      className="glass p-6 rounded-3xl max-w-md w-full max-h-[90vh] 
                 overflow-y-auto hide-scrollbar"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="text-center mb-6">
        <motion.div
          className="text-7xl mb-4"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5 }}
        >
          {getScoreEmoji()}
        </motion.div>

        <h2 className="text-xl text-white/80 mb-2">La vostra compatibilità</h2>

        <motion.div
          className="text-6xl font-extrabold text-white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          {score}%
        </motion.div>

        <p className="text-white/80 mt-2">{getScoreMessage()}</p>
      </div>

      {/* Messaggi personalizzati */}
      <AIResultCard
        player1Name={player1Name}
        player2Name={player2Name}
        score={score}
        questions={questions}
        answersP1={answersP1}
        answersP2={answersP2}
      />

      {/* Pulsante ricomincia */}
      <button
        onClick={onRestart}
        className="w-full mt-6 py-4 bg-white text-pink-600 
                   rounded-2xl font-bold text-lg hover:scale-105 
                   transition-transform"
      >
        🔄 Gioca Ancora
      </button>
    </motion.div>
  );
}
```

---

## 🔄 Gestione dello Stato

### App.jsx - Il Cuore dell'Applicazione

```jsx
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
```

---

## ❓ Sistema di Domande

### questions.js - Il Database delle Domande

```javascript
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
```

---

## 🎨 Temi e Stili

### themes.js - I Temi Colore

```javascript
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
```

---

## ✨ Animazioni con Framer Motion

### HeartAnimation - Cuori che Volano

```jsx
// src/components/HeartAnimation.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function HeartAnimation({ trigger }) {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    if (trigger > 0) {
      // Genera cuori casuali
      const newHearts = Array.from({ length: 20 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        size: Math.random() * 20 + 20,
        emoji: ["❤️", "💕", "💖", "💗", "💘"][Math.floor(Math.random() * 5)],
      }));

      setHearts(newHearts);

      // Rimuovi dopo l'animazione
      setTimeout(() => setHearts([]), 3000);
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
              bottom: 0,
              fontSize: heart.size,
            }}
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: -window.innerHeight - 100, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 2 + Math.random(),
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
```

---

## 💬 Messaggi Personalizzati

### aiService.js - Generatore di Messaggi

```javascript
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
```

---

## 💾 Persistenza dei Dati

L'app utilizza `localStorage` per salvare:

1. **Storico partite** - Le ultime 20 partite giocate
2. **Tema selezionato** - Il tema colore preferito

```javascript
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
```

---

## 📱 PWA e Service Worker

### manifest.json

```json
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
```

### Registrazione Service Worker (solo produzione)

```javascript
// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Registra SW solo in produzione
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}
```

---

## 🚀 Deploy

### Build per produzione

```bash
npm run build
```

### Deploy su Netlify

1. Crea un account su [netlify.com](https://netlify.com)
2. Connetti il repository GitHub
3. Configura:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy automatico ad ogni push!

### Deploy su Vercel

```bash
npm install -g vercel
vercel
```

---

## 🎉 Conclusione

Congratulazioni! Hai creato **Love Sync**, un'app React completa con:

- ✅ UI moderna con Tailwind CSS e glassmorphism
- ✅ Animazioni fluide con Framer Motion
- ✅ Sistema di domande categorizzate
- ✅ Calcolo compatibilità
- ✅ Messaggi personalizzati
- ✅ Storico partite persistente
- ✅ Temi personalizzabili
- ✅ PWA installabile

### Prossimi Passi

- 🌐 Aggiungi autenticazione per sfidare coppie online
- 📊 Crea statistiche dettagliate
- 🎮 Aggiungi modalità multiplayer
- 🤖 Integra un'AI per messaggi ancora più personalizzati

---

**Buon coding e buon San Valentino!** 💕

---

_Creato con ❤️ usando React, Vite e TailwindCSS_
