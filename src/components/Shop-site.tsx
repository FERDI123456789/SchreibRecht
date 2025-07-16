import { useEffect, useState } from "react";
import confetti from 'canvas-confetti';

interface ShopItem {
  id: number;
  name: string;
  description: string;
  price: number;
  icon: string;
  owned: boolean;
  type: string;
}

interface PurchaseNotification {
  id: number;
  item: ShopItem;
  timestamp: number;
}

const defaultShopItems: ShopItem[] = [
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
];

export default function Shop() {
  const [totalCoins, setTotalCoins] = useState(0);
  const [shopItems, setShopItems] = useState<ShopItem[]>(defaultShopItems);
  const [purchaseNotifications, setPurchaseNotifications] = useState<PurchaseNotification[]>([]);
  const [inventory, setInventory] = useState<Record<number, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('totalCoins');
    setTotalCoins(saved ? parseInt(saved) : 0);

    const savedItems = localStorage.getItem('shopItems');
    if (savedItems) setShopItems(JSON.parse(savedItems));
    
    const savedInventory = localStorage.getItem('inventory');
    if (savedInventory) setInventory(JSON.parse(savedInventory));
    
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @keyframes slideInDown {
        0% {
          transform: translateY(-100%);
          opacity: 0;
        }
        10% {
          transform: translateY(0);
          opacity: 1;
        }
        90% {
          transform: translateY(0);
          opacity: 1;
        }
        100% {
          transform: translateY(-100%);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(styleSheet);

    setTimeout(() => setIsLoading(false), 1000);

    return () => styleSheet.remove();
  }, []);

  const showPurchaseNotification = (item: ShopItem) => {
    const now = Date.now();
    const newNotification: PurchaseNotification = {
      id: now,
      item,
      timestamp: now
    };
    
    setPurchaseNotifications(prev => {
      const updatedNotifications = [...prev, newNotification];
      
      if (updatedNotifications.length > 1) {
        setTimeout(() => {
          setPurchaseNotifications(current => 
            current.filter(n => n.id === newNotification.id)
          );
        }, 3000);
        
        setTimeout(() => {
          setPurchaseNotifications(current => 
            current.filter(n => n.id !== newNotification.id)
          );
        }, 5000);
      } else {
        setTimeout(() => {
          setPurchaseNotifications(current => 
            current.filter(n => n.id !== newNotification.id)
          );
        }, 5000);
      }
      
      return updatedNotifications;
    });
  };

  const applyItemEffect = (item: ShopItem) => {
    switch (item.id) {
      case 1: // Extra Herz
        localStorage.setItem('extraHeart', 'true');
        break;
      case 2: // Schnellere Regeneration
        localStorage.setItem('fastRegen', 'true');
        break;
      case 3: // Doppelte Münzen
        localStorage.setItem('doubleCoins', 'true');
        break;
      default:
        break;
    }
  };

  const purchaseItem = (item: ShopItem) => {
    if (totalCoins >= item.price) {
      showPurchaseNotification(item);

      if (item.type === "block") {
        setInventory(prev => {
          const newInventory = {
            ...prev,
            [item.id]: (prev[item.id] || 0) + 1
          };
          localStorage.setItem('inventory', JSON.stringify(newInventory));
          return newInventory;
        });
      } else {
        if (!item.owned) {
          const newItems = shopItems.map(i =>
            i.id === item.id ? { ...i, owned: true } : i
          );
          setShopItems(newItems);
          localStorage.setItem('shopItems', JSON.stringify(newItems));
          applyItemEffect(item);
        }
      }

      const newTotal = totalCoins - item.price;
      setTotalCoins(newTotal);
      localStorage.setItem('totalCoins', newTotal.toString());
    }
  };

  const hasExtraHeart = localStorage.getItem('extraHeart') === 'true';
  const fastRegen = localStorage.getItem('fastRegen') === 'true';
  const doubleCoins = localStorage.getItem('doubleCoins') === 'true';

  if (isLoading) {
    return (
      <div className="animate-pulse px-4 py-8">
        {/* Header Skeleton */}
        <div className="mb-8 border-b border-gray-200 pb-4 flex items-center">
          <div className="h-10 w-32 bg-gray-300 rounded" />
          <div className="ml-auto h-8 w-32 bg-gray-200 rounded-full" />
        </div>
        {/* Spezial-Items Skeleton */}
        <div className="mb-10">
          <div className="h-8 w-48 bg-gray-300 rounded mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gray-400 p-6 h-20" />
                <div className="p-4 bg-white">
                  <div className="h-6 w-24 bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-32 bg-gray-100 rounded mb-4" />
                  <div className="h-10 w-full bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Bau-Blöcke Skeleton */}
        <div>
          <div className="h-8 w-48 bg-gray-300 rounded mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="border border-gray-200 rounded-xl bg-white shadow-md overflow-hidden">
                <div className="bg-gray-400 p-6 h-16" />
                <div className="p-3">
                  <div className="h-5 w-20 bg-gray-200 rounded mb-2" />
                  <div className="h-3 w-28 bg-gray-100 rounded mb-3" />
                  <div className="h-8 w-full bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="">
        <div className="mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold flex items-center text-gray-900">
            Shop
            <span className="ml-auto text-lg bg-yellow-100 px-3 py-1 rounded-full flex items-center text-amber-800 font-normal border border-yellow-200 shadow-md">
              <span className="text-amber-800 mr-1 text-xl">🪙</span> {totalCoins}
            </span>
          </h1>
        </div>
        
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
            <span className="bg-gray-100 p-2 rounded-lg text-gray-800 mr-2">✨</span> 
            Spezial-Items
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shopItems
              .filter(item => item.type === "item")
              .map(item => (
                <div 
                  key={item.id}
                  className={`border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group`}
                >
                  <div className={`${item.owned ? 'bg-gray-800' : 'bg-gray-900'} p-3 flex items-center justify-between`}>
                    <span className="text-4xl transform group-hover:scale-110 transition-transform">{item.icon}</span>
                    <div className="bg-white rounded-full px-3 py-1 text-sm font-bold text-gray-800 shadow border border-gray-200">
                      {item.price} <span className="text-amber-500">🪙</span>
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                    <button
                      onClick={() => purchaseItem(item)}
                      disabled={item.owned || totalCoins < item.price}
                      className={`w-full py-2 px-4 rounded-lg transition-all duration-300 ${
                        item.owned
                          ? 'bg-green-50 border border-green-500 text-green-600 cursor-default shadow-md'
                          : totalCoins >= item.price
                          ? 'bg-gray-900 hover:bg-gray-800 text-white transform hover:scale-105 shadow-md hover:shadow-lg'
                          : 'bg-gray-200 cursor-not-allowed text-gray-500'
                      }`}
                    >
                      {item.owned ? (
                        <span className="flex items-center justify-center">
                          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Gekauft
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          {totalCoins >= item.price ? (
                            <>Kaufen</>
                          ) : (
                            <>Nicht genug Münzen</>
                          )}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
            <span className="bg-gray-100 p-2 rounded-lg text-gray-800 mr-2">🧱</span> 
            Bau-Blöcke
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {shopItems
              .filter(item => item.type === "block")
              .map(item => {
                const count = inventory[item.id] || 0;
                return (
                  <div 
                    key={item.id}
                    className="border border-gray-200 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="bg-gray-800 p-3 flex items-center justify-between">
                      <span className="text-3xl transform group-hover:scale-110 transition-transform">{item.icon}</span>
                      <div className="bg-white rounded-full px-2 py-0.5 text-sm font-bold text-gray-800 shadow border border-gray-200">
                        {item.price} <span className="text-amber-500">🪙</span>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-bold text-gray-800">{item.name}</h3>
                        {count > 0 && (
                          <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs font-bold">
                            {count}x
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-xs mb-3">{item.description}</p>
                      <button
                        onClick={() => purchaseItem(item)}
                        disabled={totalCoins < item.price}
                        className={`w-full py-1.5 rounded-lg text-sm transition-all ${
                          totalCoins >= item.price
                            ? 'bg-gray-900 hover:bg-gray-800 text-white transform hover:scale-105 shadow'
                            : 'bg-gray-200 cursor-not-allowed text-gray-500'
                        }`}
                      >
                        {totalCoins >= item.price ? (
                          <span className="flex items-center justify-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Kaufen
                          </span>
                        ) : (
                          'Nicht genug Münzen'
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      
      </div>
      
      <div className="fixed top-0 left-0 right-0 flex flex-col items-center z-50 pointer-events-none">
        {purchaseNotifications.map(notification => (
          <div
            key={notification.id}
            className="mt-4 bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-3 flex items-center gap-2"
            style={{
              animation: 'slideInDown 5s ease-in-out forwards'
            }}
          >
            <span className="text-2xl">{notification.item.icon}</span>
            <span className="text-gray-900 font-medium">
              {notification.item.name} wurde erfolgreich gekauft!
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
