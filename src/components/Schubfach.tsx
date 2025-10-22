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
    <div className="">
      <section className="px-5 py-16 md:px-10 md:py-10">
        <div className="mx-auto w-full max-w-7xl">
          <ExerciseGrid mode="schreib" onExerciseClick={setSelectedExercise} />
        </div>
      </section>
      <ExerciseDialog
        exerciseId={selectedExercise}
        isOpen={selectedExercise !== null}
        onClose={() => setSelectedExercise(null)}
      />
    </div>
  );
}
