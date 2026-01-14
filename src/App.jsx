import { useMemo, useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import StartScreen from "./components/StartScreen";
import SetupScreen from "./components/SetupScreen";
import QuestionCard from "./components/QuestionCard";
import ResultScreen from "./components/ResultScreen";
import PassPhoneScreen from "./components/PassPhoneScreen";
import HistoryScreen from "./components/HistoryScreen";
import HeartAnimation from "./components/HeartAnimation";
import { getRandomQuestions } from "./data/questions";
import { themes, getThemeById } from "./data/themes";
import {
  startModelDownload,
  preGenerateContent,
  resetCache,
} from "./services/aiService";

// LocalStorage helpers
const HISTORY_KEY = "lovesync_history";
const THEME_KEY = "lovesync_theme";

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
  const [step, setStep] = useState("start");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answersP1, setAnswersP1] = useState([]);
  const [answersP2, setAnswersP2] = useState([]);
  const [score, setScore] = useState(0);
  const [gameQuestions, setGameQuestions] = useState([]);
  const [heartTrigger, setHeartTrigger] = useState(0);
  const [history, setHistory] = useState([]);

  // Game settings
  const [player1Name, setPlayer1Name] = useState("Giocatore 1");
  const [player2Name, setPlayer2Name] = useState("Giocatore 2");
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(10);
  const [currentTheme, setCurrentTheme] = useState("romantic");

  const clickSound = useMemo(() => new Audio("/sounds/click.mp3"), []);

  // Load history and theme on mount + start AI download immediately
  useEffect(() => {
    setHistory(loadHistory());
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) setCurrentTheme(savedTheme);

    // Avvia subito il download del modello AI
    startModelDownload();
  }, []);

  const theme = getThemeById(currentTheme);

  const handleAnswer = (answer) => {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});

    if (step === "p1") {
      setAnswersP1((prev) => [...prev, answer]);
    } else {
      const newAnswersP2 = [...answersP2, answer];
      setAnswersP2(newAnswersP2);

      // Alla 5a risposta del P2, inizia la pre-generazione AI
      if (currentIndex === 4) {
        preGenerateContent(
          player1Name,
          player2Name,
          answersP1,
          newAnswersP2,
          gameQuestions
        );
      }
    }

    if (currentIndex < gameQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      if (step === "p1") {
        setStep("passPhone");
      } else {
        calculateResult(answer);
      }
    }
  };

  const calculateResult = (lastAnswer) => {
    const finalAnswersP2 = [...answersP2, lastAnswer];
    let matches = 0;
    answersP1.forEach((ans, i) => {
      if (ans === finalAnswersP2[i]) matches++;
    });
    const finalScore = Math.round((matches / gameQuestions.length) * 100);
    setScore(finalScore);

    // Trigger hearts if good score
    if (finalScore >= 60) {
      setHeartTrigger((t) => t + 1);
    }

    // Save to history
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

  const goToSetup = () => {
    setStep("setup");
  };

  const startGame = (settings) => {
    // Reset AI cache per nuova partita
    resetCache();

    setPlayer1Name(settings.player1Name);
    setPlayer2Name(settings.player2Name);
    setTimerEnabled(settings.timerEnabled);
    setTimerSeconds(settings.timerSeconds);

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

  const continueToP2 = () => {
    setStep("p2");
    setCurrentIndex(0);
  };

  const restart = () => {
    setStep("start");
    setAnswersP1([]);
    setAnswersP2([]);
    setScore(0);
    setCurrentIndex(0);
    setGameQuestions([]);
  };

  const showHistory = () => {
    setStep("history");
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  const changeTheme = (themeId) => {
    setCurrentTheme(themeId);
    localStorage.setItem(THEME_KEY, themeId);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br ${theme.gradient} transition-all duration-500`}
    >
      {/* Theme selector - only on start */}
      {step === "start" && (
        <div className="absolute top-4 right-4 flex gap-2">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => changeTheme(t.id)}
              className={`w-8 h-8 rounded-full bg-gradient-to-br ${
                t.gradient
              } border-2 transition-transform ${
                currentTheme === t.id
                  ? "border-white scale-110"
                  : "border-transparent hover:scale-105"
              }`}
              title={t.name}
            />
          ))}
        </div>
      )}

      <HeartAnimation trigger={heartTrigger} />

      <AnimatePresence mode="wait">
        {step === "start" && (
          <StartScreen
            key="start"
            onStart={goToSetup}
            onShowHistory={showHistory}
            hasHistory={history.length > 0}
          />
        )}

        {step === "setup" && <SetupScreen key="setup" onStart={startGame} />}

        {step === "p1" && gameQuestions.length > 0 && (
          <QuestionCard
            key="p1"
            question={gameQuestions[currentIndex]}
            onSelect={handleAnswer}
            player={player1Name}
            currentIndex={currentIndex}
            totalQuestions={gameQuestions.length}
            timerEnabled={timerEnabled}
            timerSeconds={timerSeconds}
          />
        )}

        {step === "passPhone" && (
          <PassPhoneScreen
            key="pass"
            fromPlayer={player1Name}
            toPlayer={player2Name}
            onReady={continueToP2}
          />
        )}

        {step === "p2" && gameQuestions.length > 0 && (
          <QuestionCard
            key="p2"
            question={gameQuestions[currentIndex]}
            onSelect={handleAnswer}
            player={player2Name}
            currentIndex={currentIndex}
            totalQuestions={gameQuestions.length}
            timerEnabled={timerEnabled}
            timerSeconds={timerSeconds}
          />
        )}

        {step === "result" && (
          <ResultScreen
            key="result"
            score={score}
            onRestart={restart}
            player1Name={player1Name}
            player2Name={player2Name}
            answersP1={answersP1}
            answersP2={answersP2}
            questions={gameQuestions}
          />
        )}

        {step === "history" && (
          <HistoryScreen
            key="history"
            history={history}
            onClose={restart}
            onClear={clearHistory}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
