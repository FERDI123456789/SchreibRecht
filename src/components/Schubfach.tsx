"use client";

import { useState } from "react";
import HomeComponent from "@/components/Home";
import { ExerciseGrid } from "@/components/exercise-grid";
import { FloatingNav } from "@/components/floating-nav";
import { ExerciseDialog } from "@/components/exercise-dialog";
import { ChartLineInteractive } from "@/components/DayChart";

export default function Schubfach() {
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null);
  const [activeMode, setActiveMode] = useState<"schreib" | "lesen">("schreib");

  return (
    <div className="min-h-screen pb-28">
      {/* Header Section with rounded bottom */}
      <header className="relative mx-auto max-w-7xl overflow-x-hidden overflow-y-hidden rounded-b-2xl bg-black/10 pt-10 shadow-lg">
        <div className="relative px-5 md:px-10">
          <div className="grid grid-cols-3">
            <div className="z-10 col-span-2 w-full">
              <HomeComponent />
            </div>
            <div>
              <ChartLineInteractive />
            </div>
          </div>
        </div>
      </header>
      {/* Main Content Section */}
      <section className="bg-[#262626] px-5 py-16 md:px-10 md:py-10">
        <div className="mx-auto w-full max-w-7xl">
          <ExerciseGrid
            mode={activeMode}
            onExerciseClick={setSelectedExercise}
          />
        </div>
      </section>

      <FloatingNav activeMode={activeMode} onModeChange={setActiveMode} />

      <ExerciseDialog
        exerciseId={selectedExercise}
        isOpen={selectedExercise !== null}
        onClose={() => setSelectedExercise(null)}
      />
    </div>
  );
}
