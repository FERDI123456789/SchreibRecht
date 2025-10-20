"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Flame, Diamond, Edit } from "lucide-react";
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
    <div className="flex h-full w-full flex-col justify-between pb-6">
      <div className="flex justify-between gap-6">
        {/* Avatar and Name */}
        <div className="flex items-center justify-center">
          <Avatar className="ringtransition-all group relative mr-[12px] h-32 w-32 rounded-full ring ring-white duration-200">
            <AvatarImage
              src="https://images.unsplash.com/photo-1750535135593-3a8e5def331d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880"
              alt={userData.name}
            />
            <AvatarFallback className="bg-black/20 text-2xl font-bold">
              {userData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
            <div className="absolute bottom-10 left-10 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white opacity-0 group-hover:opacity-100">
              <Edit />
            </div>
          </Avatar>
          <div className="">
            <div className="">
              <h1 className="text-3xl font-extrabold text-white">
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
            <Flame className="h-8 w-8 animate-flicker text-amber-500" />
            <p className="text-lg font-bold text-amber-500">
              {userData.streak}
            </p>
          </div>
        </div>
      </div>
      {/* Level and XP Progress */}
      <div className="mt-[12px] w-full space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-white">
            Rank {userData.level}
          </span>
          <span className="text-lg font-bold text-white">
            {userData.xp}/{userData.xpGoal} XP
          </span>
        </div>
        <div className="h-4 w-full overflow-hidden rounded-full border border-white shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-white to-white/60 transition-all duration-500"
            style={{ width: `${xpProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
