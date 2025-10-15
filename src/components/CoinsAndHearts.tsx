import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

interface CoinsAndHeartsProps {
  rerollsLeft?: number;
  maxHearts?: number;
  isRegenerating?: boolean;
}

const CoinsAndHearts: React.FC<CoinsAndHeartsProps> = ({
  rerollsLeft: propRerollsLeft,
  maxHearts: propMaxHearts,
  isRegenerating: propIsRegenerating,
}) => {
  const [totalCoins, setTotalCoins] = useState<number>(0);
  const [rerollsLeft, setRerollsLeft] = useState<number>(propRerollsLeft ?? 5);
  const [maxHearts, setMaxHearts] = useState<number>(propMaxHearts ?? 5);
  const [isRegenerating, setIsRegenerating] = useState<boolean>(propIsRegenerating ?? false);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true after mount to avoid SSR issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load totalCoins from Clerk user metadata
  const { user } = isClient ? useUser() : { user: null };

  useEffect(() => {
    if (isClient && user && user.unsafeMetadata.totalCoins !== undefined) {
      setTotalCoins(Number(user.unsafeMetadata.totalCoins) || 0);
    } else if (isClient && user) {
      setTotalCoins(0);
      user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          totalCoins: 0,
        },
      });
    }
  }, [isClient, user]);

  // Load heart-related data from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRerollsLeft(propRerollsLeft ?? Number(localStorage.getItem('rerollsLeft') || '5'));
      setMaxHearts(propMaxHearts ?? (localStorage.getItem('extraHeart') === 'true' ? 6 : 5));
      setIsRegenerating(propIsRegenerating ?? !!localStorage.getItem('cooldownEndTime'));
    }
  }, [propRerollsLeft, propMaxHearts, propIsRegenerating]);

  return (
    <div className="fixed bg-[#608bef] rounded-bl-2xl px-4 py-2 top-0 right-0 z-50 flex items-center gap-4">
      {rerollsLeft < maxHearts && (
        <div className="absolute right-0 top-12 flex items-center bg-white px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md bg-opacity-90 border border-gray-200">
          <svg
            className={`w-5 h-5 text-gray-700 ${isRegenerating ? 'animate-spin' : ''}`}
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

      {/* Coin display */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-yellow-100 px-3.5 py-1.5 rounded-full shadow-lg coin-counter border border-yellow-200">
          <span className="w-5 h-5 mb-1 text-amber-800 drop-shadow-sm">🪙</span>
          <span className="font-bold text-amber-900">{totalCoins}</span>
        </div>
      </div>

      {/* Hearts */}
      <div className="flex gap-1 bg-white bg-opacity-90 backdrop-blur-md px-2.5 py-1.5 rounded-full shadow-lg border border-gray-200">
        {[...Array(maxHearts)].map((_, index) => (
          <div
            key={index}
            className={`transition-all duration-300 ${
              index < rerollsLeft ? 'scale-100' : 'scale-90 opacity-40'
            }`}
          >
            <svg
              className={`w-6 h-6 ${
                index < rerollsLeft ? 'text-red-500 drop-shadow-md' : 'text-gray-300'
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
  );
};

export default CoinsAndHearts;