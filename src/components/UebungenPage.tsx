import { useState, useEffect } from "react";
import confetti from 'canvas-confetti';
import CoinsAndHearts from './CoinsAndHearts';
import { useUser } from "@clerk/clerk-react";

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
    correctAnswer: 0
  },
  {
    title: "Leseübung",
    question: "Welches Wort reimt sich auf 'Haus'?",
    answers: ["Maus", "Baum", "Hand"],
    correctAnswer: 0
  },
  {
    title: "Rechtschreibübung",
    question: "Wie schreibt man das Wort richtig?",
    answers: ["Bibliothek", "Bibilothek", "Biblothek"],
    correctAnswer: 0
  },
  {
    title: "Satzbau",
    question: "Welcher Satz ist richtig?",
    answers: ["Ich gehe nach Hause.", "Ich nach Hause gehe.", "Nach Hause ich gehe."],
    correctAnswer: 0
  },
  {
    title: "Leseverständnis",
    question: "Was ist das Gegenteil von 'groß'?",
    answers: ["klein", "dick", "lang"],
    correctAnswer: 0
  },
  {
    title: "Silbenübung",
    question: "Wie viele Silben hat das Wort 'Schokolade'?",
    answers: ["4", "3", "5"],
    correctAnswer: 0
  },
  {
    title: "Grammatik",
    question: "Welcher Artikel ist richtig?",
    answers: ["der Tisch", "die Tisch", "das Tisch"],
    correctAnswer: 0
  },
  {
    title: "Zeitformen",
    question: "Welche Zeit ist: 'Ich habe gespielt'?",
    answers: ["Perfekt", "Präsens", "Futur"],
    correctAnswer: 0
  },
  {
    title: "Groß- und Kleinschreibung",
    question: "Welches Wort wird großgeschrieben?",
    answers: ["Haus", "laufen", "schnell"],
    correctAnswer: 0
  },
  {
    title: "Satzzeichen",
    question: "Welches Satzzeichen gehört ans Ende eines Fragesatzes?",
    answers: ["?", ".", "!"],
    correctAnswer: 0
  }
];

const RandomNumberGenerator = () => {
  const { user } = useUser();
  const [writingExercisesList, setWritingExercisesList] = useState<Exercise[]>([]);
  const [readingExercisesList, setReadingExercisesList] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exerciseResults, setExerciseResults] = useState<Record<string, ExerciseResult>>({});
  const [rerollsLeft, setRerollsLeft] = useState<number>(5);
  const [nextHeartTime, setNextHeartTime] = useState<number | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
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
      type: "item"
    },
    {
      id: 2,
      name: "Schnellere Regeneration",
      description: "Reduziert die Regenerationszeit auf 5 Sekunden",
      price: 100,
      icon: "⚡",
      owned: false,
      type: "item"
    },
    {
      id: 3,
      name: "Doppelte Münzen",
      description: "Verdiene doppelt so viele Münzen pro richtiger Antwort",
      price: 150,
      icon: "💰",
      owned: false,
      type: "item"
    },
    {
      id: 4,
      name: "Holzblock",
      description: "Ein einfacher Holzblock zum Bauen",
      price: 10,
      icon: "🪵",
      owned: false,
      type: "block"
    },
    {
      id: 5,
      name: "Steinblock",
      description: "Ein stabiler Steinblock",
      price: 20,
      icon: "🪨",
      owned: false,
      type: "block"
    },
    {
      id: 6,
      name: "Glasblock",
      description: "Ein durchsichtiger Glasblock",
      price: 30,
      icon: "💎",
      owned: false,
      type: "block"
    }
  ]);
  const [inventory, setInventory] = useState<Record<number, number>>({});
  const [isBuildingMode, setIsBuildingMode] = useState(false);
  const [purchaseAnimations, setPurchaseAnimations] = useState<PurchaseAnimation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [justLoaded, setJustLoaded] = useState(false);
  const [number, setNumber] = useState<number | null>(null);

  useEffect(() => {
    // Load from localStorage for non-coins data
    const savedRerolls = localStorage.getItem('rerollsLeft');
    const savedCooldownEnd = localStorage.getItem('cooldownEndTime');
    const savedWriting = localStorage.getItem('writingExercises');
    const savedReading = localStorage.getItem('readingExercises');
    const savedResults = localStorage.getItem('exerciseResults');
    const savedItems = localStorage.getItem('shopItems');
    const savedInventory = localStorage.getItem('inventory');

    const hasExtraHeartLocal = localStorage.getItem('extraHeart') === 'true';
    setHasExtraHeart(hasExtraHeartLocal);
    const maxHeartsLocal = hasExtraHeartLocal ? 6 : 5;
    setMaxHearts(maxHeartsLocal);
    setRerollsLeft(savedRerolls ? Math.min(Number(savedRerolls), maxHeartsLocal) : maxHeartsLocal);

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
    if (savedItems) setShopItems(JSON.parse(savedItems));
    if (savedInventory) setInventory(JSON.parse(savedInventory));

    setTimeout(() => {
      setNumber(Math.floor(Math.random() * 100));
      setIsLoading(false);
      setJustLoaded(true);
      setTimeout(() => setJustLoaded(false), 400);
    }, 1500);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isRegenerating && nextHeartTime) {
      timer = setInterval(() => {
        const now = Date.now();
        
        if (nextHeartTime <= now) {
          if (rerollsLeft < maxHearts) {
            setRerollsLeft(prev => {
              const newValue = prev + 1;
              localStorage.setItem('rerollsLeft', String(newValue));
              return newValue;
            });
            
            const regenerationTime = shopItems.find(item => item.id === 2)?.owned ? 2500 : 5000;
            
            if (rerollsLeft + 1 < maxHearts) {
              const newNextTime = now + regenerationTime;
              setNextHeartTime(newNextTime);
              localStorage.setItem('cooldownEndTime', String(newNextTime));
            } else {
              setIsRegenerating(false);
              setNextHeartTime(null);
              localStorage.removeItem('cooldownEndTime');
            }
          }
        }
        
        setTimeLeft(Math.max(0, nextHeartTime - now));
      }, 100);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRegenerating, nextHeartTime, rerollsLeft, shopItems, maxHearts]);

  const generateRandomExercises = (type: 'writing' | 'reading') => {
    if (rerollsLeft <= 0) return;

    const newRerollsLeft = rerollsLeft - 1;
    setRerollsLeft(newRerollsLeft);
    localStorage.setItem('rerollsLeft', String(newRerollsLeft));
    
    if (!isRegenerating) {
      setIsRegenerating(true);
      const regenerationTime = shopItems.find(item => item.id === 2)?.owned ? 2500 : 5000;
      const nextTime = Date.now() + regenerationTime;
      setNextHeartTime(nextTime);
      localStorage.setItem('cooldownEndTime', String(nextTime));
    }

    const writingKeywords = ['schreib', 'Schreib', 'Wortschatz', 'Grammatik', 'Silben', 'Satzzeichen', 'Groß-'];
    const readingKeywords = ['lese', 'Lese', 'Verständnis', 'Satzbau', 'Zeit'];

    const isReadingExercise = (exercise: Exercise) => {
      if (readingKeywords.some(keyword => exercise.title.includes(keyword))) return true;
      if (exercise.title.includes('Zeitformen')) return true;
      if (exercise.title.includes('Satzbau')) return true;
      return false;
    };

    const isWritingExercise = (exercise: Exercise) => {
      if (writingKeywords.some(keyword => exercise.title.includes(keyword))) return true;
      if (exercise.title.includes('Groß-')) return true;
      if (exercise.title.includes('Grammatik')) return true;
      return false;
    };

    const filteredExercises = type === 'writing'
      ? lrsExercises.filter(isWritingExercise)
      : lrsExercises.filter(isReadingExercise);

    if (filteredExercises.length < 5) {
      const remainingExercises = lrsExercises.filter(ex => 
        type === 'writing' ? !isReadingExercise(ex) : !isWritingExercise(ex)
      );
      filteredExercises.push(...remainingExercises);
    }

    const exercises: Exercise[] = [];
    const availableExercises = [...filteredExercises];
    
    for (let i = 0; i < 5 && availableExercises.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * availableExercises.length);
      const [selectedExercise] = availableExercises.splice(randomIndex, 1);
      exercises.push(selectedExercise);
    }

    if (type === 'writing') {
      setWritingExercisesList(exercises);
      localStorage.setItem('writingExercises', JSON.stringify(exercises));
    } else {
      setReadingExercisesList(exercises);
      localStorage.setItem('readingExercises', JSON.stringify(exercises));
    }

    const newResults = { ...exerciseResults };
    exercises.forEach(exercise => {
      delete newResults[exercise.title];
    });
    setExerciseResults(newResults);
    localStorage.setItem('exerciseResults', JSON.stringify(newResults));
  };

  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsModalOpen(true);
    
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
    eventOrRect: React.MouseEvent | DOMRect
  ) => {
    let startX: number, startY: number;
    
    if ('clientX' in eventOrRect) {
      startX = eventOrRect.clientX;
      startY = eventOrRect.clientY;
    } else {
      startX = eventOrRect.left + eventOrRect.width / 2;
      startY = eventOrRect.top + eventOrRect.height / 2;
    }

    const coinCounter = document.querySelector('.coin-counter');
    if (!coinCounter) return;

    const rect = coinCounter.getBoundingClientRect();
    const targetX = rect.left + rect.width / 2;
    const targetY = rect.top + rect.height / 2;

    const animationGroupId = Date.now();

    const newAnimations: CoinAnimation[] = [];
    for (let i = 0; i < amount; i++) {
      const offsetX = Math.random() * 40 - 20;
      const offsetY = Math.random() * 40 - 20;
      const delay = Math.random() * 300;
      
      newAnimations.push({
        id: animationGroupId + i,
        amount: 1,
        startX: startX + offsetX,
        startY: startY + offsetY,
        targetX,
        targetY,
        delay
      });
    }

    setCoinAnimations(prev => [...prev, ...newAnimations]);

    setTimeout(() => {
      setCoinAnimations(prev => 
        prev.filter(coin => coin.id < animationGroupId || coin.id >= animationGroupId + amount)
      );
    }, 1300);
  };

  const handleSubmit = async () => {
    if (selectedExercise && selectedAnswer !== null && user) {
      const isCorrect = selectedAnswer === selectedExercise.correctAnswer;
      
      if (isCorrect) {
        const baseAmount = Math.floor(Math.random() * 5) + 1;
        const hasDoubleCoins = localStorage.getItem('doubleCoins') === 'true';
        const multiplier = hasDoubleCoins ? 2 : 1;
        const coinAmount = baseAmount * multiplier;
        
        const modalElement = document.querySelector('.modal-content');
        if (modalElement) {
          animateCoinCollection(coinAmount, modalElement.getBoundingClientRect());
        }
        
        const currentCoins = Number(user.unsafeMetadata.totalCoins) || 0;
        const newTotal = currentCoins + coinAmount;
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            totalCoins: newTotal,
          },
        });
      }
      
      const newResults = {
        ...exerciseResults,
        [selectedExercise.title]: {
          selectedAnswer,
          isCorrect
        }
      };
      
      setExerciseResults(newResults);
      localStorage.setItem('exerciseResults', JSON.stringify(newResults));
      setIsSubmitted(true);
      
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

    return () => styleSheet.remove();
  }, []);

  const renderCoinAnimations = () => {
    return (
      <>
        {coinAnimations.map(coin => (
          <div
            key={coin.id}
            className="fixed z-50 pointer-events-none"
            style={{
              left: `${coin.startX}px`,
              top: `${coin.startY}px`,
              '--targetX': `${coin.targetX - coin.startX}px`,
              '--targetY': `${coin.targetY - coin.startY}px`,
              animation: `coinFloatToTarget 1s ease-out forwards ${coin.delay || 0}ms`
            } as React.CSSProperties}
          >
            <div className="flex items-center justify-center text-yellow-500 h-8 w-8">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full drop-shadow-lg">
                <circle cx="12" cy="12" r="10" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1" />
                <circle cx="12" cy="12" r="8" fill="#F59E0B" opacity="0.4" />
                <path d="M12 6v12M8 12h8" stroke="#FBBF24" strokeWidth="2" strokeOpacity="0.5" />
              </svg>
            </div>
          </div>
        ))}
      </>
    );
  };

  if (isLoading) {
    return (
      <div className="relative mx-auto">
        <div className="pt-24 pb-16 px-6 md:px-10 mt-14 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col">
              <div className="bg-gray-900 rounded-t-xl p-5 shadow-md flex items-center">
                <div className="bg-gray-300 rounded-lg w-10 h-10 mr-3 animate-pulse" />
                <div className="h-8 bg-gray-400 rounded w-40 animate-pulse" />
              </div>
              <div className="flex items-center bg-gray-800 p-4">
                <div className="bg-gray-400 rounded-lg w-40 h-10 animate-pulse" />
              </div>
              <div className="min-h-[350px] min-w-[500px] bg-white rounded-b-xl shadow-lg p-6 flex-grow border-l border-r border-b border-gray-200">
                <div className="grid grid-cols-1 gap-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded-lg w-full animate-pulse" />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="bg-gray-900 rounded-t-xl p-5 shadow-md flex items-center">
                <div className="bg-gray-300 rounded-lg w-10 h-10 mr-3 animate-pulse" />
                <div className="h-8 bg-gray-400 rounded w-40 animate-pulse" />
              </div>
              <div className="flex items-center bg-gray-800 p-4">
                <div className="bg-gray-400 rounded-lg w-40 h-10 animate-pulse" />
              </div>
              <div className="min-h-[350px] bg-white rounded-b-xl shadow-lg p-6 flex-grow border-l border-r border-b border-gray-200">
                <div className="grid grid-cols-1 gap-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded-lg w-full animate-pulse" />
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
      <CoinsAndHearts
        rerollsLeft={rerollsLeft}
        maxHearts={maxHearts}
        isRegenerating={isRegenerating}
      />

      {renderCoinAnimations()}

      <div className="pt-24 pb-16 px-6 md:px-10 mt-14 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col">
            <div className="bg-gray-900 rounded-t-xl p-5 shadow-md">
              <h2 className="text-xl md:text-2xl font-bold text-white flex items-center">
                <span className="bg-white p-2 rounded-lg text-gray-900 mr-3">✏️</span>
                Schreibübungen
              </h2>
            </div>
            
            <div className="items-center justify-between bg-gray-800 text-white p-4">
              <button 
                className={`bg-white text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg transition-all duration-300 shadow-md
                  ${rerollsLeft <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg transform hover:scale-105'}`}
                onClick={() => generateRandomExercises('writing')}
                disabled={rerollsLeft <= 0}
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Neue Übungen
                </span>
              </button>
            </div>

            <div className="min-h-[350px] min-w-[500px] bg-white rounded-b-xl shadow-lg p-6 flex-grow border-l border-r border-b border-gray-200">
              {writingExercisesList.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {writingExercisesList.map((exercise, index) => {
                    const result = exerciseResults[exercise.title];
                    return (
                      <div 
                        key={index} 
                        className={`border p-4 rounded-lg cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md ${
                          result
                            ? result.isCorrect
                              ? 'bg-green-50 border-green-500'
                              : 'bg-red-50 border-red-500'
                            : 'hover:bg-gray-50 border-gray-300'
                        }`}
                        onClick={() => handleExerciseClick(exercise)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-800">{exercise.title}</span>
                          {result && (
                            <span className={`flex items-center text-sm font-medium ${result.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                              {result.isCorrect ? (
                                <>
                                  <svg className="w-5 h-5 mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                  </svg>
                                  Richtig
                                </>
                              ) : (
                                <>
                                  <svg className="w-5 h-5 mr-1 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
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
                <div className="h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="bg-gray-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">Bereit zum Schreiben?</h3>
                    <p className="text-gray-600 max-w-xs mx-auto">Klicke auf "Neue Übungen", um mit Schreibaufgaben zu beginnen.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="bg-gray-900 rounded-t-xl p-5 shadow-md">
              <h2 className="text-xl md:text-2xl font-bold text-white flex items-center">
                <span className="bg-white p-2 rounded-lg text-gray-900 mr-3">📖</span>
                Leseübungen
              </h2>
            </div>
            
            <div className="flex items-center justify-between bg-gray-800 text-white p-4">
              <button 
                className={`bg-white text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg transition-all duration-300 shadow-md 
                  ${rerollsLeft <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg transform hover:scale-105'}`}
                onClick={() => generateRandomExercises('reading')}
                disabled={rerollsLeft <= 0}
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Neue Übungen
                </span>
              </button>
            </div>

            <div className="min-h-[350px] bg-white rounded-b-xl shadow-lg p-6 flex-grow border-l border-r border-b border-gray-200">
              {readingExercisesList.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {readingExercisesList.map((exercise, index) => {
                    const result = exerciseResults[exercise.title];
                    return (
                      <div 
                        key={index} 
                        className={`border p-4 rounded-lg cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md ${
                          result
                            ? result.isCorrect
                              ? 'bg-green-50 border-green-500'
                              : 'bg-red-50 border-red-500'
                            : 'hover:bg-gray-50 border-gray-300'
                        }`}
                        onClick={() => handleExerciseClick(exercise)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-800">{exercise.title}</span>
                          {result && (
                            <span className={`flex items-center text-sm font-medium ${result.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                              {result.isCorrect ? (
                                <>
                                  <svg className="w-5 h-5 mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                  </svg>
                                  Richtig
                                </>
                              ) : (
                                <>
                                  <svg className="w-5 h-5 mr-1 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
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
                <div className="h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="bg-gray-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">Bereit zum Lesen?</h3>
                    <p className="text-gray-600 max-w-xs mx-auto">Klicke auf "Neue Übungen", um mit Leseaufgaben zu beginnen.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedExercise && (
        <div 
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm transition-opacity duration-300 z-50 ${
            isModalOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeModal}
        >
          <div 
            className={`modal-content bg-white p-0 rounded-xl shadow-2xl max-w-lg w-full m-4 transition-all duration-300 overflow-hidden ${
              isModalOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-gray-900 text-white p-5">
              <h2 className="text-xl font-bold">{selectedExercise.title}</h2>
            </div>
            
            <div className="p-6">
              <p className="mb-6 text-gray-700 font-medium">{selectedExercise.question}</p>

              <div className="space-y-3 mb-6">
                {selectedExercise.answers.map((answer, index) => (
                  <div
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 flex items-center ${
                      selectedAnswer === index && !isSubmitted ? 'border-gray-800 bg-gray-100' : 'border-gray-200'
                    } ${
                      isSubmitted
                        ? index === selectedExercise.correctAnswer
                          ? 'bg-green-50 border-green-500'
                          : selectedAnswer === index
                          ? 'bg-red-50 border-red-500'
                          : ''
                        : 'hover:border-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center border-2 ${
                      selectedAnswer === index && !isSubmitted 
                        ? 'border-gray-800 bg-gray-800 text-white' 
                        : isSubmitted && index === selectedExercise.correctAnswer
                        ? 'border-green-500 bg-green-500 text-white'
                        : isSubmitted && selectedAnswer === index
                        ? 'border-red-500 bg-red-500 text-white'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswer === index || (isSubmitted && index === selectedExercise.correctAnswer) ? (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : null}
                    </div>
                    <span className="flex-grow">{answer}</span>
                    {isSubmitted && index === selectedExercise.correctAnswer && (
                      <svg className="w-5 h-5 text-green-600 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-4 border-t border-gray-200">
                <button 
                  className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null || isSubmitted}
                >
                  {isSubmitted ? 'Eingereicht' : 'Fertig'}
                </button>
                <button 
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg transition-colors shadow border border-gray-300"
                  onClick={closeModal}
                >
                  Schließen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {purchaseAnimations.map(animation => (
        <div
          key={animation.id}
          className="fixed inset-0 pointer-events-none flex items-center justify-center z-50"
        >
          <div 
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-xl"
            style={{
              animation: 'purchasePopup 1s ease-out forwards'
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