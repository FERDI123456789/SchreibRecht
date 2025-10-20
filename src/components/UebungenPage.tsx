import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

// Define the structure for our exercises with questions and answers
interface Exercise {
  title: string;
  question: string;
  answers: string[];
  correctAnswer: number;
}

interface ExerciseResult {
  selectedAnswer: number;
  isCorrect: boolean;
}

interface CoinAnimation {
  id: number;
  amount: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  delay?: number;
}

// Neue Interface für Shop-Items
interface ShopItem {
  id: number;
  name: string;
  description: string;
  price: number;
  icon: string;
  owned: boolean;
  type: string;
}

interface PurchaseAnimation {
  id: number;
  item: ShopItem;
  scale: number;
}

const lrsExercises: Exercise[] = [
  {
    title: "Wortschatzübung",
    question: "Welches Wort ist richtig geschrieben?",
    answers: ["Fahrrad", "Farrad", "Fahrad"],
    correctAnswer: 0,
  },
  {
    title: "Leseübung",
    question: "Welches Wort reimt sich auf 'Haus'?",
    answers: ["Maus", "Baum", "Hand"],
    correctAnswer: 0,
  },
  {
    title: "Rechtschreibübung",
    question: "Wie schreibt man das Wort richtig?",
    answers: ["Bibliothek", "Bibilothek", "Biblothek"],
    correctAnswer: 0,
  },
  {
    title: "Satzbau",
    question: "Welcher Satz ist richtig?",
    answers: [
      "Ich gehe nach Hause.",
      "Ich nach Hause gehe.",
      "Nach Hause ich gehe.",
    ],
    correctAnswer: 0,
  },
  {
    title: "Leseverständnis",
    question: "Was ist das Gegenteil von 'groß'?",
    answers: ["klein", "dick", "lang"],
    correctAnswer: 0,
  },
  {
    title: "Silbenübung",
    question: "Wie viele Silben hat das Wort 'Schokolade'?",
    answers: ["4", "3", "5"],
    correctAnswer: 0,
  },
  {
    title: "Grammatik",
    question: "Welcher Artikel ist richtig?",
    answers: ["der Tisch", "die Tisch", "das Tisch"],
    correctAnswer: 0,
  },
  {
    title: "Zeitformen",
    question: "Welche Zeit ist: 'Ich habe gespielt'?",
    answers: ["Perfekt", "Präsens", "Futur"],
    correctAnswer: 0,
  },
  {
    title: "Groß- und Kleinschreibung",
    question: "Welches Wort wird großgeschrieben?",
    answers: ["Haus", "laufen", "schnell"],
    correctAnswer: 0,
  },
  {
    title: "Satzzeichen",
    question: "Welches Satzzeichen gehört ans Ende eines Fragesatzes?",
    answers: ["?", ".", "!"],
    correctAnswer: 0,
  },
];

const RandomNumberGenerator = () => {
  // Separate States für beide Container
  const [writingExercisesList, setWritingExercisesList] = useState<Exercise[]>(
    [],
  );
  const [readingExercisesList, setReadingExercisesList] = useState<Exercise[]>(
    [],
  );
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null,
  );
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exerciseResults, setExerciseResults] = useState<
    Record<string, ExerciseResult>
  >({});
  const [rerollsLeft, setRerollsLeft] = useState<number>(5);
  const [nextHeartTime, setNextHeartTime] = useState<number | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [totalCoins, setTotalCoins] = useState<number>(0); // Start mit 0
  const [coinAnimations, setCoinAnimations] = useState<CoinAnimation[]>([]);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [hasExtraHeart, setHasExtraHeart] = useState(false);
  const [maxHearts, setMaxHearts] = useState(5);
  const [shopItems, setShopItems] = useState<ShopItem[]>([
    {
      id: 1,
      name: "Extra Herz",
      description: "Erhöht die maximale Anzahl der Herzen um 1",
      price: 50,
      icon: "❤️",
      owned: false,
      type: "item",
    },
    {
      id: 2,
      name: "Schnellere Regeneration",
      description: "Reduziert die Regenerationszeit auf 5 Sekunden",
      price: 100,
      icon: "⚡",
      owned: false,
      type: "item",
    },
    {
      id: 3,
      name: "Doppelte Münzen",
      description: "Verdiene doppelt so viele Münzen pro richtiger Antwort",
      price: 150,
      icon: "💰",
      owned: false,
      type: "item",
    },
    {
      id: 4,
      name: "Holzblock",
      description: "Ein einfacher Holzblock zum Bauen",
      price: 10,
      icon: "🪵",
      owned: false,
      type: "block",
    },
    {
      id: 5,
      name: "Steinblock",
      description: "Ein stabiler Steinblock",
      price: 20,
      icon: "🪨",
      owned: false,
      type: "block",
    },
    {
      id: 6,
      name: "Glasblock",
      description: "Ein durchsichtiger Glasblock",
      price: 30,
      icon: "💎",
      owned: false,
      type: "block",
    },
  ]);

  // Füge State für das Inventar hinzu
  const [inventory, setInventory] = useState<Record<number, number>>({});

  const [isBuildingMode, setIsBuildingMode] = useState(false);

  const [purchaseAnimations, setPurchaseAnimations] = useState<
    PurchaseAnimation[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);
  const [justLoaded, setJustLoaded] = useState(false);
  const [number, setNumber] = useState<number | null>(null);

  // Effekt für Extra-Herz-Überprüfung - nur im Client ausgeführt
  useEffect(() => {
    setHasExtraHeart(localStorage.getItem("extraHeart") === "true");
    setMaxHearts(localStorage.getItem("extraHeart") === "true" ? 6 : 5);
  }, []);

  // Lade gespeicherte Werte beim Start
  useEffect(() => {
    const savedRerolls = localStorage.getItem("rerollsLeft");
    const savedCooldownEnd = localStorage.getItem("cooldownEndTime");
    const savedWriting = localStorage.getItem("writingExercises");
    const savedReading = localStorage.getItem("readingExercises");
    const savedResults = localStorage.getItem("exerciseResults");

    // Check if extra heart was purchased - moved to another useEffect
    const hasExtraHeartLocal = localStorage.getItem("extraHeart") === "true";
    setHasExtraHeart(hasExtraHeartLocal);

    // Standardwert ist jetzt 5, oder 6 wenn Extra Herz gekauft wurde
    const maxHeartsLocal = hasExtraHeartLocal ? 6 : 5;
    setMaxHearts(maxHeartsLocal);
    setRerollsLeft(
      savedRerolls
        ? Math.min(Number(savedRerolls), maxHeartsLocal)
        : maxHeartsLocal,
    );

    if (savedCooldownEnd) {
      const cooldownTime = Number(savedCooldownEnd);
      if (cooldownTime > Date.now()) {
        setNextHeartTime(cooldownTime);
        setIsRegenerating(true);
      }
    }

    setWritingExercisesList(savedWriting ? JSON.parse(savedWriting) : []);
    setReadingExercisesList(savedReading ? JSON.parse(savedReading) : []);
    setExerciseResults(savedResults ? JSON.parse(savedResults) : {});
  }, []);

  // Timer für Herz-Regeneration
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRegenerating && nextHeartTime) {
      timer = setInterval(() => {
        const now = Date.now();

        if (nextHeartTime <= now) {
          if (rerollsLeft < maxHearts) {
            // Add one heart
            setRerollsLeft((prev) => {
              const newValue = prev + 1;
              localStorage.setItem("rerollsLeft", String(newValue));
              return newValue;
            });

            // Schnellere Regeneration wenn das Item gekauft wurde
            const regenerationTime = shopItems.find((item) => item.id === 2)
              ?.owned
              ? 2500
              : 5000;

            if (rerollsLeft + 1 < maxHearts) {
              const newNextTime = now + regenerationTime;
              setNextHeartTime(newNextTime);
              localStorage.setItem("cooldownEndTime", String(newNextTime));
            } else {
              setIsRegenerating(false);
              setNextHeartTime(null);
              localStorage.removeItem("cooldownEndTime");
            }
          }
        }

        setTimeLeft(Math.max(0, nextHeartTime - now));
      }, 100);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isRegenerating, nextHeartTime, rerollsLeft, shopItems, maxHearts]);

  // Lade die gespeicherten Münzen und füge 100 hinzu, aber nur auf Client-Side
  useEffect(() => {
    const saved = localStorage.getItem("totalCoins");
    const currentCoins = saved ? parseInt(saved) : 0;
    const newTotal = currentCoins + 0;
    setTotalCoins(newTotal);
    localStorage.setItem("totalCoins", newTotal.toString());
  }, []); // Läuft nur einmal beim Client-Side Mount

  // Then load saved items in useEffect
  useEffect(() => {
    const savedItems = localStorage.getItem("shopItems");
    if (savedItems) {
      setShopItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("inventory");
    if (saved) {
      setInventory(JSON.parse(saved));
    }
  }, []);

  const generateRandomExercises = (type: "writing" | "reading") => {
    if (rerollsLeft <= 0) return;

    const newRerollsLeft = rerollsLeft - 1;
    setRerollsLeft(newRerollsLeft);
    localStorage.setItem("rerollsLeft", String(newRerollsLeft));

    // Timer startet sofort wenn ein Herz verbraucht wird
    if (!isRegenerating) {
      setIsRegenerating(true);
      // Change to 5 seconds default, 2.5 seconds if fast regen is bought
      const regenerationTime = shopItems.find((item) => item.id === 2)?.owned
        ? 2500
        : 5000;
      const nextTime = Date.now() + regenerationTime;
      setNextHeartTime(nextTime);
      localStorage.setItem("cooldownEndTime", String(nextTime));
    }

    // Verbesserte Filterung der Übungen
    const writingKeywords = [
      "schreib",
      "Schreib",
      "Wortschatz",
      "Grammatik",
      "Silben",
      "Satzzeichen",
      "Groß-",
    ];
    const readingKeywords = ["lese", "Lese", "Verständnis", "Satzbau", "Zeit"]; // Zeitformen auch zu Leseübungen

    // Manuelle Zuordnung für spezielle Fälle
    const isReadingExercise = (exercise: Exercise) => {
      if (readingKeywords.some((keyword) => exercise.title.includes(keyword)))
        return true;
      // Zusätzliche Bedingungen für Leseübungen
      if (exercise.title.includes("Zeitformen")) return true;
      if (exercise.title.includes("Satzbau")) return true;
      return false;
    };

    const isWritingExercise = (exercise: Exercise) => {
      if (writingKeywords.some((keyword) => exercise.title.includes(keyword)))
        return true;
      // Zusätzliche Bedingungen für Schreibübungen
      if (exercise.title.includes("Groß-")) return true;
      if (exercise.title.includes("Grammatik")) return true;
      return false;
    };

    const filteredExercises =
      type === "writing"
        ? lrsExercises.filter(isWritingExercise)
        : lrsExercises.filter(isReadingExercise);

    // Stelle sicher, dass wir genug Übungen haben
    if (filteredExercises.length < 5) {
      // Wenn nicht genug spezifische Übungen vorhanden sind, füge weitere passende hinzu
      const remainingExercises = lrsExercises.filter((ex) =>
        type === "writing" ? !isReadingExercise(ex) : !isWritingExercise(ex),
      );
      filteredExercises.push(...remainingExercises);
    }

    // Wähle zufällig genau 5 Übungen aus
    const exercises: Exercise[] = [];
    const availableExercises = [...filteredExercises];

    for (let i = 0; i < 5 && availableExercises.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * availableExercises.length);
      const [selectedExercise] = availableExercises.splice(randomIndex, 1);
      exercises.push(selectedExercise);
    }

    // Update den entsprechenden Container
    if (type === "writing") {
      setWritingExercisesList(exercises);
      localStorage.setItem("writingExercises", JSON.stringify(exercises));
    } else {
      setReadingExercisesList(exercises);
      localStorage.setItem("readingExercises", JSON.stringify(exercises));
    }

    const newResults = { ...exerciseResults };
    exercises.forEach((exercise) => {
      delete newResults[exercise.title];
    });
    setExerciseResults(newResults);
    localStorage.setItem("exerciseResults", JSON.stringify(newResults));
  };

  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsModalOpen(true);

    // Load saved answer if it exists
    const savedResult = exerciseResults[exercise.title];
    if (savedResult) {
      setSelectedAnswer(savedResult.selectedAnswer);
      setIsSubmitted(true);
    } else {
      setSelectedAnswer(null);
      setIsSubmitted(false);
    }
  };

  const handleAnswerSelect = (index: number) => {
    if (!isSubmitted) {
      setSelectedAnswer(index);
    }
  };

  const animateCoinCollection = (
    amount: number,
    eventOrRect: React.MouseEvent | DOMRect,
  ) => {
    // Ermittle die Position des Klicks/Elements für den Startpunkt der Animation
    let startX: number, startY: number;

    if ("clientX" in eventOrRect) {
      // Es ist ein MouseEvent
      startX = eventOrRect.clientX;
      startY = eventOrRect.clientY;
    } else {
      // Es ist ein DOMRect
      startX = eventOrRect.left + eventOrRect.width / 2;
      startY = eventOrRect.top + eventOrRect.height / 2;
    }

    // Ermittle die Position des Münzenzählers für den Zielpunkt der Animation
    const coinCounter = document.querySelector(".coin-counter");
    if (!coinCounter) return;

    const rect = coinCounter.getBoundingClientRect();
    const targetX = rect.left + rect.width / 2;
    const targetY = rect.top + rect.height / 2;

    // Erstelle eine eindeutige ID für diese Animationsgruppe
    const animationGroupId = Date.now();

    // Erstelle für jede Münze eine separate Animation mit leicht versetzten Positionen
    const newAnimations: CoinAnimation[] = [];
    for (let i = 0; i < amount; i++) {
      // Füge ein wenig Zufall für natürlichere Bewegung hinzu
      const offsetX = Math.random() * 40 - 20; // -20 bis +20 Pixel X-Offset
      const offsetY = Math.random() * 40 - 20; // -20 bis +20 Pixel Y-Offset

      // Zufällige Verzögerung für gestaffelte Animation
      const delay = Math.random() * 300; // 0 bis 300ms Verzögerung

      newAnimations.push({
        id: animationGroupId + i,
        amount: 1, // Jede Animation repräsentiert jetzt nur 1 Münze
        startX: startX + offsetX,
        startY: startY + offsetY,
        targetX,
        targetY,
        delay,
      });
    }

    // Füge die neuen Animationen zum State hinzu
    setCoinAnimations((prev) => [...prev, ...newAnimations]);

    // Entferne die Animationen nach Abschluss
    // Warte die maximale Verzögerung + Animationsdauer ab
    setTimeout(() => {
      setCoinAnimations((prev) =>
        prev.filter(
          (coin) =>
            coin.id < animationGroupId || coin.id >= animationGroupId + amount,
        ),
      );
    }, 1300); // 300ms max Verzögerung + 1000ms Animation
  };

  const handleSubmit = () => {
    if (selectedExercise && selectedAnswer !== null) {
      const isCorrect = selectedAnswer === selectedExercise.correctAnswer;

      if (isCorrect) {
        // Zufällige Münzanzahl zwischen 1 und 5, verdoppelt wenn das Item gekauft wurde
        const baseAmount = Math.floor(Math.random() * 5) + 1;
        // Prüfen, ob das "Doppelte Münzen" Item gekauft wurde (aus localStorage)
        const hasDoubleCoins = localStorage.getItem("doubleCoins") === "true";
        const multiplier = hasDoubleCoins ? 2 : 1;
        const coinAmount = baseAmount * multiplier;

        // Position des Modals für Startpunkt der Animation
        const modalElement = document.querySelector(".modal-content");
        if (modalElement) {
          animateCoinCollection(
            coinAmount,
            modalElement.getBoundingClientRect(),
          );
        }

        // Münzen zum Gesamtbetrag hinzufügen
        setTotalCoins((prev) => {
          const newTotal = prev + coinAmount;
          localStorage.setItem("totalCoins", newTotal.toString());
          return newTotal;
        });
      }

      // Save result to state and localStorage
      const newResults = {
        ...exerciseResults,
        [selectedExercise.title]: {
          selectedAnswer,
          isCorrect,
        },
      };

      setExerciseResults(newResults);
      localStorage.setItem("exerciseResults", JSON.stringify(newResults));
      setIsSubmitted(true);

      // Sofort das Modal schließen
      closeModal();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedExercise(null);
    }, 300);
  };

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @keyframes coinFloatToTarget {
        0% {
          transform: translate(0, 0) scale(1) rotate(0);
          opacity: 1;
        }
        100% {
          transform: translate(var(--targetX), var(--targetY)) scale(0.5) rotate(360deg);
          opacity: 0;
        }
      }

      @keyframes purchasePopup {
        0% {
          transform: scale(0.5);
          opacity: 0;
        }
        50% {
          transform: scale(1.2);
          opacity: 1;
        }
        100% {
          transform: scale(1);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(styleSheet);

    // Cleanup
    return () => styleSheet.remove();
  }, []);

  // Add this component to render the flying coins
  const renderCoinAnimations = () => {
    return (
      <>
        {coinAnimations.map((coin) => (
          <div
            key={coin.id}
            className="pointer-events-none fixed z-50"
            style={
              {
                left: `${coin.startX}px`,
                top: `${coin.startY}px`,
                "--targetX": `${coin.targetX - coin.startX}px`,
                "--targetY": `${coin.targetY - coin.startY}px`,
                animation: `coinFloatToTarget 1s ease-out forwards ${coin.delay || 0}ms`,
              } as React.CSSProperties
            }
          >
            <div className="flex h-8 w-8 items-center justify-center text-yellow-500">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-full w-full drop-shadow-lg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="#FBBF24"
                  stroke="#F59E0B"
                  strokeWidth="1"
                />
                <circle cx="12" cy="12" r="8" fill="#F59E0B" opacity="0.4" />
                <path
                  d="M12 6v12M8 12h8"
                  stroke="#FBBF24"
                  strokeWidth="2"
                  strokeOpacity="0.5"
                />
              </svg>
            </div>
          </div>
        ))}
      </>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setNumber(Math.floor(Math.random() * 100));
      setIsLoading(false);
      setJustLoaded(true);
      setTimeout(() => setJustLoaded(false), 400); // 400ms Fade-Out
    }, 1500);
  }, []);

  // Add this function
  const resetHearts = () => {
    const maxHeartsLocal =
      localStorage.getItem("extraHeart") === "true" ? 6 : 5;
    setRerollsLeft(maxHeartsLocal);
    localStorage.setItem("rerollsLeft", String(maxHeartsLocal));
    setIsRegenerating(false);
    setNextHeartTime(null);
    localStorage.removeItem("cooldownEndTime");
  };

  // Call this function when the component mounts
  useEffect(() => {
    resetHearts();
  }, []);

  if (isLoading) {
    return (
      <div className="relative mx-auto">
        {/* Header mit Ghost-Coins und Ghost-Herzen */}
        <div className="fixed right-5 top-5 z-50 flex animate-pulse items-center gap-4">
          {/* Ghost Coin */}
          <div className="flex h-10 w-28 items-center gap-2 rounded-full border border-gray-300 bg-gray-200 px-4 py-2 shadow-lg">
            <div className="h-6 w-6 animate-pulse rounded-full bg-gray-300" />
            <div className="h-4 w-10 animate-pulse rounded bg-gray-300" />
          </div>
          {/* Ghost Hearts */}
          <div className="flex gap-1 rounded-full border border-gray-300 bg-gray-200 px-4 py-2 shadow-lg">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-6 w-6 animate-pulse rounded-full bg-gray-300"
              />
            ))}
          </div>
        </div>

        {/* Main content - Skeletons exakt wie geladen */}
        <div className="mx-auto mt-14 px-6 pb-16 pt-24 md:px-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {/* Schreibübungen Skeleton */}
            <div className="flex flex-col">
              {/* Überschrift Skeleton */}
              <div className="flex items-center rounded-t-xl bg-gray-900 p-5 shadow-md">
                <div className="mr-3 h-10 w-10 animate-pulse rounded-lg bg-gray-300" />
                <div className="h-8 w-40 animate-pulse rounded bg-gray-400" />
              </div>
              {/* Button Skeleton */}
              <div className="flex items-center bg-gray-800 p-4">
                <div className="h-10 w-40 animate-pulse rounded-lg bg-gray-400" />
              </div>
              {/* Übungen Skeleton */}
              <div className="min-h-[350px] min-w-[500px] flex-grow rounded-b-xl border-b border-l border-r border-gray-200 bg-white p-6 shadow-lg">
                <div className="grid grid-cols-1 gap-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-16 w-full animate-pulse rounded-lg bg-gray-200"
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* Leseübungen Skeleton */}
            <div className="flex flex-col">
              {/* Überschrift Skeleton */}
              <div className="flex items-center rounded-t-xl bg-gray-900 p-5 shadow-md">
                <div className="mr-3 h-10 w-10 animate-pulse rounded-lg bg-gray-300" />
                <div className="h-8 w-40 animate-pulse rounded bg-gray-400" />
              </div>
              {/* Button Skeleton */}
              <div className="flex items-center bg-gray-800 p-4">
                <div className="h-10 w-40 animate-pulse rounded-lg bg-gray-400" />
              </div>
              {/* Übungen Skeleton */}
              <div className="min-h-[350px] flex-grow rounded-b-xl border-b border-l border-r border-gray-200 bg-white p-6 shadow-lg">
                <div className="grid grid-cols-1 gap-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-16 w-full animate-pulse rounded-lg bg-gray-200"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto">
      {/* Header with hearts and coins */}
      <div className="fixed right-0 top-0 z-50 flex items-center gap-4 rounded-bl-2xl px-4 py-2">
        {rerollsLeft < maxHearts && (
          <div className="absolute right-0 top-12 flex items-center rounded-full border border-gray-200 bg-white bg-opacity-90 px-3 py-1.5 shadow-lg backdrop-blur-md">
            <svg
              className={`h-5 w-5 text-gray-700 ${isRegenerating ? "animate-spin" : ""}`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        )}

        {/* Coin display and Shop link */}
        <div className="flex items-center gap-3">
          <div className="coin-counter flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-100 px-3.5 py-1.5 shadow-lg">
            <span className="mb-1 h-5 w-5 text-amber-800 drop-shadow-sm">
              🪙
            </span>
            <span className="font-bold text-amber-900">{totalCoins}</span>
          </div>
        </div>

        {/* Hearts - redesigned */}
        <div className="flex gap-1 rounded-full border border-gray-200 bg-white bg-opacity-90 px-2.5 py-1.5 shadow-lg backdrop-blur-md">
          {[...Array(maxHearts)].map((_, index) => (
            <div
              key={index}
              className={`transition-all duration-300 ${
                index >= maxHearts - rerollsLeft
                  ? "scale-100"
                  : "scale-90 opacity-40"
              }`}
            >
              <svg
                className={`h-6 w-6 ${
                  index >= maxHearts - rerollsLeft
                    ? "text-red-500 drop-shadow-md"
                    : "text-gray-300"
                } transition-all duration-300`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* Coin animations */}
      {renderCoinAnimations()}

      {/* Main content - minimalist redesign */}
      <div className="mx-auto">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Erster Container - Schreibübungen */}
          <div className="flex flex-col">
            <div className="rounded-t-xl bg-gray-900 p-5 shadow-md">
              <h2 className="flex items-center text-xl font-bold text-white md:text-2xl">
                <span className="mr-3 rounded-lg bg-white p-2 text-gray-900">
                  ✏️
                </span>
                Schreibübungen
              </h2>
            </div>

            <div className="items-center justify-between bg-gray-800 p-4 text-white">
              <button
                className={`rounded-lg bg-white px-4 py-2 text-gray-900 shadow-md transition-all duration-300 hover:bg-gray-100 ${rerollsLeft <= 0 ? "cursor-not-allowed opacity-50" : "transform hover:scale-105 hover:shadow-lg"}`}
                onClick={() => generateRandomExercises("writing")}
                disabled={rerollsLeft <= 0}
              >
                <span className="flex items-center">
                  <svg
                    className="mr-1.5 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  Neue Übungen
                </span>
              </button>
            </div>

            <div className="min-h-[350px] min-w-[500px] flex-grow rounded-b-xl border-b border-l border-r border-gray-200 bg-white p-6 shadow-lg">
              {writingExercisesList.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {writingExercisesList.map((exercise, index) => {
                    const result = exerciseResults[exercise.title];
                    return (
                      <div
                        key={index}
                        className={`cursor-pointer rounded-lg border p-4 shadow-sm transition-all duration-300 hover:shadow-md ${
                          result
                            ? result.isCorrect
                              ? "border-green-500 bg-green-50"
                              : "border-red-500 bg-red-50"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                        onClick={() => handleExerciseClick(exercise)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-800">
                            {exercise.title}
                          </span>
                          {result && (
                            <span
                              className={`flex items-center text-sm font-medium ${result.isCorrect ? "text-green-600" : "text-red-600"}`}
                            >
                              {result.isCorrect ? (
                                <>
                                  <svg
                                    className="mr-1 h-5 w-5 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                  Richtig
                                </>
                              ) : (
                                <>
                                  <svg
                                    className="mr-1 h-5 w-5 text-red-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                  Falsch
                                </>
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 p-4">
                      <svg
                        className="h-10 w-10 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-700">
                      Bereit zum Schreiben?
                    </h3>
                    <p className="mx-auto max-w-xs text-gray-600">
                      Klicke auf "Neue Übungen", um mit Schreibaufgaben zu
                      beginnen.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Zweiter Container - Leseübungen */}
          <div className="flex flex-col">
            <div className="rounded-t-xl bg-gray-900 p-5 shadow-md">
              <h2 className="flex items-center text-xl font-bold text-white md:text-2xl">
                <span className="mr-3 rounded-lg bg-white p-2 text-gray-900">
                  📖
                </span>
                Leseübungen
              </h2>
            </div>

            <div className="flex items-center justify-between bg-gray-800 p-4 text-white">
              <button
                className={`rounded-lg bg-white px-4 py-2 text-gray-900 shadow-md transition-all duration-300 hover:bg-gray-100 ${rerollsLeft <= 0 ? "cursor-not-allowed opacity-50" : "transform hover:scale-105 hover:shadow-lg"}`}
                onClick={() => generateRandomExercises("reading")}
                disabled={rerollsLeft <= 0}
              >
                <span className="flex items-center">
                  <svg
                    className="mr-1.5 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  Neue Übungen
                </span>
              </button>
            </div>

            <div className="min-h-[350px] flex-grow rounded-b-xl border-b border-l border-r border-gray-200 bg-white p-6 shadow-lg">
              {readingExercisesList.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {readingExercisesList.map((exercise, index) => {
                    const result = exerciseResults[exercise.title];
                    return (
                      <div
                        key={index}
                        className={`cursor-pointer rounded-lg border p-4 shadow-sm transition-all duration-300 hover:shadow-md ${
                          result
                            ? result.isCorrect
                              ? "border-green-500 bg-green-50"
                              : "border-red-500 bg-red-50"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                        onClick={() => handleExerciseClick(exercise)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-800">
                            {exercise.title}
                          </span>
                          {result && (
                            <span
                              className={`flex items-center text-sm font-medium ${result.isCorrect ? "text-green-600" : "text-red-600"}`}
                            >
                              {result.isCorrect ? (
                                <>
                                  <svg
                                    className="mr-1 h-5 w-5 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                  Richtig
                                </>
                              ) : (
                                <>
                                  <svg
                                    className="mr-1 h-5 w-5 text-red-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                  Falsch
                                </>
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 p-4">
                      <svg
                        className="h-10 w-10 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-700">
                      Bereit zum Lesen?
                    </h3>
                    <p className="mx-auto max-w-xs text-gray-600">
                      Klicke auf "Neue Übungen", um mit Leseaufgaben zu
                      beginnen.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Exercise Modal - Minimalist redesign */}
      {selectedExercise && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm transition-opacity duration-300 ${
            isModalOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeModal}
        >
          <div
            className={`modal-content m-4 w-full max-w-lg overflow-hidden rounded-xl bg-white p-0 shadow-2xl transition-all duration-300 ${
              isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gray-900 p-5 text-white">
              <h2 className="text-xl font-bold">{selectedExercise.title}</h2>
            </div>

            <div className="p-6">
              <p className="mb-6 font-medium text-gray-700">
                {selectedExercise.question}
              </p>

              <div className="mb-6 space-y-3">
                {selectedExercise.answers.map((answer, index) => (
                  <div
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`flex cursor-pointer items-center rounded-lg border-2 p-4 transition-all duration-200 ${
                      selectedAnswer === index && !isSubmitted
                        ? "border-gray-800 bg-gray-100"
                        : "border-gray-200"
                    } ${
                      isSubmitted
                        ? index === selectedExercise.correctAnswer
                          ? "border-green-500 bg-green-50"
                          : selectedAnswer === index
                            ? "border-red-500 bg-red-50"
                            : ""
                        : "hover:border-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`mr-3 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                        selectedAnswer === index && !isSubmitted
                          ? "border-gray-800 bg-gray-800 text-white"
                          : isSubmitted &&
                              index === selectedExercise.correctAnswer
                            ? "border-green-500 bg-green-500 text-white"
                            : isSubmitted && selectedAnswer === index
                              ? "border-red-500 bg-red-500 text-white"
                              : "border-gray-300"
                      }`}
                    >
                      {selectedAnswer === index ||
                      (isSubmitted &&
                        index === selectedExercise.correctAnswer) ? (
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : null}
                    </div>
                    <span className="flex-grow">{answer}</span>
                    {isSubmitted &&
                      index === selectedExercise.correctAnswer && (
                        <svg
                          className="ml-2 h-5 w-5 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between border-t border-gray-200 pt-4">
                <button
                  className="rounded-lg bg-gray-900 px-5 py-2.5 text-white shadow-md transition-all duration-300 hover:bg-gray-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null || isSubmitted}
                >
                  {isSubmitted ? "Eingereicht" : "Fertig"}
                </button>
                <button
                  className="rounded-lg border border-gray-300 bg-gray-100 px-5 py-2.5 text-gray-700 shadow transition-colors hover:bg-gray-200"
                  onClick={closeModal}
                >
                  Schließen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Purchase Animations */}
      {purchaseAnimations.map((animation) => (
        <div
          key={animation.id}
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
        >
          <div
            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-xl"
            style={{
              animation: "purchasePopup 1s ease-out forwards",
            }}
          >
            <span className="text-3xl">{animation.item.icon}</span>
            <span className="text-xl font-bold text-gray-900">Gekauft!</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RandomNumberGenerator;
