"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target, Award, Zap } from "lucide-react";

interface StatsCardProps {
  mode: "schreib" | "lesen";
}

export function StatsCard({ mode }: StatsCardProps) {
  const stats = {
    schreib: {
      accuracy: "87%",
      completed: 24,
      bestStreak: 8,
      avgTime: "12 Min",
    },
    lesen: {
      accuracy: "82%",
      completed: 18,
      bestStreak: 6,
      avgTime: "15 Min",
    },
  };

  const currentStats = stats[mode];

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center gap-2 rounded-lg bg-primary/10 p-4">
            <Target className="h-6 w-6 text-primary" />
            <p className="text-2xl font-bold text-black">
              {currentStats.accuracy}
            </p>
            <p className="text-xs text-muted-foreground">Genauigkeit</p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg bg-accent/10 p-4">
            <Award className="h-6 w-6 text-accent" />
            <p className="text-2xl font-bold text-black">
              {currentStats.completed}
            </p>
            <p className="text-xs text-muted-foreground">Abgeschlossen</p>
          </div>
          <div className="bg-warning/10 flex flex-col items-center gap-2 rounded-lg p-4">
            <TrendingUp className="h-6 w-6 text-black" />
            <p className="text-2xl font-bold text-black">
              {currentStats.bestStreak}
            </p>
            <p className="text-xs text-muted-foreground">Beste Serie</p>
          </div>
          <div className="bg-info/10 flex flex-col items-center gap-2 rounded-lg p-4">
            <Zap className="h-6 w-6 text-black" />
            <p className="text-2xl font-bold text-black">
              {currentStats.avgTime}
            </p>
            <p className="text-xs text-muted-foreground">Ø Zeit</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
