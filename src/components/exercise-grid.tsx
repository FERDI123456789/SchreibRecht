"use client";
import {
  RefreshCw,
  BookOpen,
  PenTool,
  Eye,
  Brain,
  Target,
  Zap,
  History,
} from "lucide-react";
import { ChartRadarLinesOnly } from "@/components/RadarChart";
import { StatsCard } from "./Stats-card";

interface ExerciseGridProps {
  mode: "schreib" | "lesen";
  onExerciseClick: (id: number) => void;
}

interface Exercise {
  id: number;
  title: string;
  description: string;
  difficulty: "Leicht" | "Mittel" | "Schwer";
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  progress?: number;
  isLocked?: boolean;
}

export function ExerciseGrid({ mode, onExerciseClick }: ExerciseGridProps) {
  // Determine theme based on mode
  const colorTheme = mode === "schreib" ? "secondary" : "primary";

  const schreibExercises: Exercise[] = [
    {
      id: 1,
      title: "Buchstaben schreiben",
      description: "Lerne die Grundformen der Buchstaben",
      difficulty: "Leicht",
      icon: PenTool,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      progress: 100,
    },
    {
      id: 2,
      title: "Wörter schreiben",
      description: "Übe das Schreiben einfacher Wörter",
      difficulty: "Leicht",
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-50",
      progress: 75,
    },
    {
      id: 3,
      title: "Sätze bilden",
      description: "Kombiniere Wörter zu sinnvollen Sätzen",
      difficulty: "Mittel",
      icon: Brain,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      progress: 50,
    },
    {
      id: 4,
      title: "Rechtschreibung",
      description: "Meistere die korrekte Schreibweise",
      difficulty: "Schwer",
      icon: Target,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      progress: 25,
    },
    {
      id: 5,
      title: "Rechtschreibung",
      description: "Meistere die korrekte Schreibweise",
      difficulty: "Schwer",
      icon: Target,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      progress: 25,
    },
  ];

  const lesenExercises: Exercise[] = [
    {
      id: 6,
      title: "Buchstaben erkennen",
      description: "Erkenne und unterscheide verschiedene Buchstaben",
      difficulty: "Leicht",
      icon: Eye,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      progress: 100,
    },
    {
      id: 7,
      title: "Wörter lesen",
      description: "Lerne Wörter schnell und korrekt zu lesen",
      difficulty: "Leicht",
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-50",
      progress: 80,
    },
    {
      id: 8,
      title: "Sätze verstehen",
      description: "Verstehe den Sinn von ganzen Sätzen",
      difficulty: "Mittel",
      icon: Brain,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      progress: 60,
    },
    {
      id: 9,
      title: "Textverständnis",
      description: "Analysiere und verstehe längere Texte",
      difficulty: "Schwer",
      icon: Target,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      progress: 30,
    },
    {
      id: 10,
      title: "Textverständnis",
      description: "Analysiere und verstehe längere Texte",
      difficulty: "Schwer",
      icon: Target,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      progress: 30,
    },
  ];

  const exercises = mode === "schreib" ? schreibExercises : lesenExercises;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Leicht":
        return "bg-green-100 text-green-800 border-green-200";
      case "Mittel":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Schwer":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Exercises */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {exercises.map((exercise) => {
              const IconComponent = exercise.icon;
              return (
                <button
                  key={exercise.id}
                  onClick={() =>
                    !exercise.isLocked && onExerciseClick(exercise.id)
                  }
                  disabled={exercise.isLocked}
                  className={`group relative w-full rounded-2xl border-t-2 border-[#f5f5f5] bg-[#f5f5f5]/50 shadow-[0_6px_0_0_#f5f5f5] transition-all duration-150 ease-in-out hover:border-transparent active:translate-y-[6px] active:shadow-none ${
                    exercise.isLocked
                      ? "cursor-not-allowed opacity-60"
                      : `hover:-translate-y-1`
                  } ${!exercise.isLocked ? "" : "bg-red-500"}`}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 ${exercise.bgColor} ${
                          exercise.isLocked ? "opacity-50" : ""
                        }`}
                      >
                        <IconComponent
                          className={`h-6 w-6 ${exercise.color}`}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-left">
                        <div className="mb-2 flex items-center justify-between">
                          <h3
                            className={`text-lg font-bold text-black transition-colors group-hover:text-${colorTheme}`}
                          >
                            {exercise.title}
                          </h3>
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-semibold ${getDifficultyColor(
                              exercise.difficulty,
                            )}`}
                          >
                            {exercise.difficulty}
                          </span>
                        </div>
                        <p className="mb-3 text-sm text-black/70">
                          {exercise.description}
                        </p>

                        {/* Progress Bar */}
                        {exercise.progress !== undefined &&
                          !exercise.isLocked && (
                            <div className="mb-2 h-2 w-full rounded-full bg-gray-200">
                              <div
                                className={`h-2 rounded-full bg-gradient-to-r from-${colorTheme} to-${colorTheme}/80 transition-all duration-500`}
                                style={{ width: `${exercise.progress}%` }}
                              />
                            </div>
                          )}

                        {/* Locked State */}
                        {exercise.isLocked && (
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <svg
                              className="h-4 w-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Gesperrt - Schließe vorherige Übungen ab
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Stats */}
        <div className="flex flex-col gap-6">
          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <button className="group relative flex flex-1 items-center justify-center gap-3 rounded-2xl bg-secondary/80 p-4 font-semibold text-white shadow-[0_6px_0_0_hsl(var(--secondary))] transition-all duration-150 ease-in-out active:translate-y-[6px] active:shadow-sm">
              <RefreshCw className="h-5 w-5 text-white transition-transform duration-200 ease-in-out group-hover:rotate-[90deg]" />
              <span>Neue Übungen</span>
            </button>
          </div>

          {/* Radar Chart */}
          <div className="rounded-2xl bg-[#f5f5f5]/50 shadow-[inset_0_4px_6px_1px_rgba(0,0,0,0.1)]">
            <div className="rounded-2xl">
              <ChartRadarLinesOnly mode="schreib" />
            </div>

            {/* Statistics */}
            <div className="rounded-2xl">
              <StatsCard mode={mode} />
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <button
              className={`group flex flex-1 items-center justify-center gap-3 rounded-2xl p-4 transition-all`}
            >
              <History
                className={`h-5 w-5 text-${colorTheme} group-hover:text-black`}
              />
              <span
                className={`font-semibold text-${colorTheme} group-hover:text-black`}
              >
                History
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
