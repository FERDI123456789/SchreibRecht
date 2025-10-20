"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Flame, Diamond } from "lucide-react";
import { useState } from "react";

export default function HomeComponent() {
  const userData = {
    name: "Max Müller",
    friendCode: "5X7d82",
    avatar: "/placeholder.svg?height=120&width=120",
    level: 12,
    xp: 120,
    xpGoal: 500,
    coins: 450,
    streak: 12,
  };

  const xpProgress = (userData.xp / userData.xpGoal) * 100;
  const [seeing, setSeeing] = useState(false);

  return (
    <div className="w-full">
      <div className="flex justify-between gap-6">
        {/* Avatar and Name */}
        <div className="flex items-center justify-center gap-4">
          <Avatar className="h-24 w-24 rounded-full border-4 border-[#091e3b]">
            <AvatarImage src={userData.avatar} alt={userData.name} />
            <AvatarFallback className="bg-black/20 text-2xl font-bold text-[#091e3b]">
              {userData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="">
            <div className="">
              <h1 className="text-3xl font-extrabold text-[#091e3b]">
                {userData.name}
              </h1>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-secondary"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path d="M6 5h12l3 5l-8.5 9.5a.7.7 0 0 1-1 0L3 10z" />
                <path d="M10 12L8 9.8l.6-1" />
              </g>
            </svg>
            <p className="text-lg font-bold text-secondary">{userData.coins}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Flame className="animate-flicker h-8 w-8 text-amber-500" />
            <p className="text-lg font-bold text-amber-500">
              {userData.streak}
            </p>
          </div>
        </div>
      </div>
      {/* Level and XP Progress */}
      <div className="w-full space-y-3 py-10">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-[#091e3b]">
            Level {userData.level}
          </span>
          <span className="text-lg font-bold text-[#091e3b]">
            {userData.xp}/{userData.xpGoal} XP
          </span>
        </div>
        <div className="h-4 w-full overflow-hidden rounded-full border-2 border-[#091e3b] bg-white shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-black to-black transition-all duration-500"
            style={{ width: `${xpProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
