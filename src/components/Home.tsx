import React, { useState, useEffect, useRef } from 'react';
import { ClerkProvider, useUser } from "@clerk/clerk-react";
import UserButton from 'node_modules/@clerk/astro/components/interactive/UserButton/UserButton.astro';
import Profil from "../assets/astro.svg"
// Interfaces
interface Character {
  name: string;
  avatar: string;
  level: number;
  xp: number;
  coins: number;
  friendCode: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  reward: number;
}

// Default avatars
const avatarOptions: string[] = [
  "../assets/blue-parrot-2.png"
];

// Default achievements
const defaultAchievements: Achievement[] = [
  {
    id: 'exercise_10',
    name: 'Fleißige Biene',
    description: 'Absolviere 10 Übungen',
    icon: '📝',
    progress: 0,
    maxProgress: 10,
    unlocked: false,
    reward: 50,
  },
  {
    id: 'correct_answers_20',
    name: 'Wortakrobat',
    description: 'Gib 20 richtige Antworten',
    icon: '✅',
    progress: 0,
    maxProgress: 20,
    unlocked: false,
    reward: 100,
  },
  {
    id: 'coin_500',
    name: 'Reicher Schüler',
    description: 'Sammle 500 Münzen',
    icon: '💰',
    progress: 0,
    maxProgress: 500,
    unlocked: false,
    reward: 200,
  },
  {
    id: 'items_5',
    name: 'Shopper',
    description: 'Kaufe 5 Items im Shop',
    icon: '🛒',
    progress: 0,
    maxProgress: 5,
    unlocked: false,
    reward: 150,
  },
  {
    id: 'blocks_20',
    name: 'Baumeister',
    description: 'Platziere 20 Blöcke',
    icon: '🧱',
    progress: 0,
    maxProgress: 20,
    unlocked: false,
    reward: 100,
  },
];

function generateFriendCode(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

const Home: React.FC = () => {

  const [character, setCharacter] = useState<Character>({
    name: 'Schüler',
    avatar: '',
    level: 1,
    xp: 0,
    coins: 0,
    friendCode: generateFriendCode(),
  });
  const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievements);
  const [activeTab, setActiveTab] = useState<'character' | 'achievements'>('character');
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [totalCoins, setTotalCoins] = useState(0);
  const [hasCheckedAchievements, setHasCheckedAchievements] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load character data
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const savedCharacter = localStorage.getItem('character');
      if (savedCharacter) {
        const parsedChar = JSON.parse(savedCharacter);
        // Prüfe, ob friendCode fehlt
        if (!parsedChar.friendCode) {
          parsedChar.friendCode = generateFriendCode();
          localStorage.setItem('character', JSON.stringify(parsedChar));
        }
        setCharacter(parsedChar);
      }

      const savedAchievements = localStorage.getItem('achievements');
      if (savedAchievements) {
        const parsedAchievements = JSON.parse(savedAchievements);
        if (Array.isArray(parsedAchievements)) {
          setAchievements(parsedAchievements);
        } else {
          setAchievements(defaultAchievements);
        }
      } else {
        setAchievements(defaultAchievements);
      }

      const savedCoins = localStorage.getItem('totalCoins');
      if (savedCoins) {
        const parsedCoins = parseInt(savedCoins, 10);
        if (!isNaN(parsedCoins)) {
          setTotalCoins(parsedCoins);
        }
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
      // Fall back to defaults
      setAchievements(defaultAchievements);
    }
    setIsLoading(false);
  }, []);

  // Check achievements after data is loaded
  useEffect(() => {
    if (!hasCheckedAchievements) {
      checkAchievements();
      setHasCheckedAchievements(true);
    }
  }, [hasCheckedAchievements]);

  // Save character data
  useEffect(() => {
    localStorage.setItem('character', JSON.stringify(character));
  }, [character]);

  // Save achievements
  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [achievements]);

  // Load custom avatar from localStorage on mount
  useEffect(() => {
    const savedAvatar = localStorage.getItem('customAvatar');
    if (savedAvatar) {
      setCharacter(prev => ({
        ...prev,
        avatar: savedAvatar,
      }));
    }
  }, []);

  // Save avatar to localStorage when it changes
  useEffect(() => {
    if (character.avatar) {
      localStorage.setItem('customAvatar', character.avatar);
    }
  }, [character.avatar]);

  // Check achievements
  const checkAchievements = () => {
    // Diese Funktion nur client-seitig ausführen
    if (typeof window === 'undefined') return;

    const updatedAchievements = [...achievements];
    let coinsEarned = 0;
    let xpEarned = 0;

    // Get data from localStorage
    const exerciseResults = localStorage.getItem('exerciseResults');
    // Ensure parsedResults is always an array, even if the stored data is invalid
    const parsedResults = exerciseResults ? (Array.isArray(JSON.parse(exerciseResults)) ? JSON.parse(exerciseResults) : []) : [];
    const correctAnswers = parsedResults.filter((result: any) => result.isCorrect).length;
    
    const savedCoins = localStorage.getItem('totalCoins');
    const currentCoins = savedCoins ? parseInt(savedCoins, 10) : 0;
    
    const inventory = localStorage.getItem('inventory');
    const parsedInventory = inventory ? (typeof JSON.parse(inventory) === 'object' ? JSON.parse(inventory) : {}) : {};
    const blockCount = Object.values(parsedInventory).reduce<number>((acc: number, val: any) => acc + (Number(val) || 0), 0);
    
    const shopItems = localStorage.getItem('shopItems');
    const parsedShopItems = shopItems ? (Array.isArray(JSON.parse(shopItems)) ? JSON.parse(shopItems) : []) : [];
    const itemsPurchased = parsedShopItems.filter((item: any) => item.owned).length;

    // Update achievement progress
    updatedAchievements.forEach((achievement, index) => {
      let newProgress = achievement.progress;
      
      switch (achievement.id) {
        case 'exercise_10':
          newProgress = parsedResults.length;
          break;
        case 'correct_answers_20':
          newProgress = correctAnswers;
          break;
        case 'coin_500':
          newProgress = currentCoins;
          break;
        case 'items_5':
          newProgress = itemsPurchased;
          break;
        case 'blocks_20':
          newProgress = blockCount;
          break;
      }
      
      updatedAchievements[index].progress = newProgress;
      
      // Check if achievement is newly unlocked
      if (!achievement.unlocked && newProgress >= achievement.maxProgress) {
        updatedAchievements[index].unlocked = true;
        coinsEarned += achievement.reward;
        xpEarned += Math.floor(achievement.reward / 2);
      }
    });

    setAchievements(updatedAchievements);
    
    // Update character if achievements were unlocked
    if (coinsEarned > 0 || xpEarned > 0) {
      setCharacter(prev => {
        const newXp = prev.xp + xpEarned;
        let newLevel = prev.level;
        const xpForNextLevel = getXpForNextLevel(prev.level);
        
        if (newXp >= xpForNextLevel) {
          newLevel += 1;
        }
        
        return {
          ...prev,
          coins: prev.coins + coinsEarned,
          xp: newXp,
          level: newLevel
        };
      });
      
      // Update totalCoins in localStorage
      const newTotalCoins = currentCoins + coinsEarned;
      localStorage.setItem('totalCoins', newTotalCoins.toString());
      setTotalCoins(newTotalCoins);
    }
  };

  // Calculate XP needed for next level
  const getXpForNextLevel = (currentLevel: number) => {
    return currentLevel * 100;
  };

  // Start editing name
  const startEditingName = () => {
    setNewName(character.name);
    setIsEditingName(true);
  };

  // Submit name change
  const submitNameChange = () => {
    if (newName.trim()) {
      setCharacter(prev => ({
        ...prev,
        name: newName.trim()
      }));
    }
    setIsEditingName(false);
  };

  // Back button
  const navigateToExercises = () => {
    window.location.href = '/schubfach/uebungen';
  };

  // Handle avatar click
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCharacter(prev => ({
          ...prev,
          avatar: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="px-4 py-8">
      
      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 mx-2 rounded-lg ${activeTab === 'character' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('character')}
        >
          Charakter
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded-lg ${activeTab === 'achievements' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('achievements')}
        >
          Errungenschaften
        </button>
      </div>
      <div className="rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-6 md:mb-0">
              {isLoading ? (
                <div className="animate-pulse flex flex-col items-center">
                  <div className="rounded-full bg-gray-300 w-96 h-96 mb-4" />
                  <div className="h-6 bg-gray-300 rounded w-40 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-24" />
                </div>
              ) : (
                <div className="relative mx-auto group w-96 h-96">
                  <img
                    id="avatar"
                    src={character.avatar || "/sr-in.svg"}
                    alt="easy"
                    onClick={handleAvatarClick}
                    style={{ cursor: "pointer" }}
                    className="rounded-full w-96 h-96 object-cover mx-auto"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  {/* Stift-Icon zentriert, jetzt klickbar */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="bg-white/70 rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={handleAvatarClick}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                        <path fill="#080808" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-4">
                {!isLoading && (
                  <p className="text-center text-lg font-semibold">
                    {isEditingName ? (
                      <div className="flex items-center justify-center">
                        <input
                          type="text"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                          autoFocus
                        />
                        <button
                          onClick={submitNameChange}
                          className="ml-2 bg-green-500 text-white p-1 rounded"
                        >
                          ✓
                        </button>
                      </div>
                    ) : (
                      <span onClick={startEditingName} className="cursor-pointer">
                        {character.name} <span className="text-xs text-gray-500">(bearbeiten)</span>
                      </span>
                    )}
                  </p>
                )}
                {!isLoading && (
                  <>
                    <p className="text-center text-yellow-500 font-semibold mt-2">
                      🪙 {totalCoins} Münzen
                    </p>
                    <p className="text-center text-sm text-gray-500 mt-1">
                      Freundecode: <span className="font-mono">{character.friendCode}</span>
                    </p>
                  </>
                )}
              </div>
            </div>
            
            <div className="md:w-2/3 md:pl-8">
              <h2 className="text-xl font-bold mb-4">Statistik</h2>
              
              <div className="mb-4">
                {isLoading ? (
                  <div className="animate-pulse">
                    <div className="flex justify-between mb-1">
                      <div className="h-6 bg-gray-300 rounded w-24" />
                      <div className="h-6 bg-gray-300 rounded w-32" />
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-gray-300 h-2.5 rounded-full w-1/2"></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between mb-1">
                      <span>Level {character.level}</span>
                      <span>{character.xp} / {getXpForNextLevel(character.level)} XP</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${Math.min(100, (character.xp / getXpForNextLevel(character.level)) * 100)}%` }}
                      ></div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

      
      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">Deine Errungenschaften</h2>
          {isLoading ? (
            <div>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border ${
                  achievement.unlocked ? 'border-green-500 bg-green-50' : 'border-gray-300'
                }`}
              >
                <div className="items-center">
                  <div className="text-2xl mr-4">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold flex items-center">
                      {achievement.name}
                      {achievement.unlocked && (
                        <span className="ml-2 text-green-500">✓</span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    <div className="mt-2">
                      <div className="flex justify-between mb-1 text-xs">
                        <span>Fortschritt: {achievement.progress} / {achievement.maxProgress}</span>
                        <span>Belohnung: {achievement.reward} Münzen</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${achievement.unlocked ? 'bg-green-500' : 'bg-blue-500'}`}
                          style={{ width: `${Math.min(100, (achievement.progress / achievement.maxProgress) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Home;