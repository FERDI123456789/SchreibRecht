"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { useState } from "react";

interface ExerciseDialogProps {
  exerciseId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ExerciseDialog({
  exerciseId,
  isOpen,
  onClose,
}: ExerciseDialogProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const exercises = {
    1: {
      title: "Buchstaben erkennen",
      questions: [
        {
          question: "Welcher Buchstabe ist das?",
          image: "/blue-circle.png",
          options: ["A", "B", "C", "D"],
          correct: 1,
        },
      ],
    },
    2: {
      title: "Wörter bilden",
      questions: [
        {
          question: "Welches Wort ist richtig geschrieben?",
          options: ["Haus", "Huas", "Hauss", "Hause"],
          correct: 0,
        },
      ],
    },
  };

  const exercise = exerciseId
    ? exercises[exerciseId as keyof typeof exercises]
    : null;
  const question = exercise?.questions[currentQuestion];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setCurrentQuestion(0);
    onClose();
  };

  if (!exercise || !question) return null;

  const progress = ((currentQuestion + 1) / exercise.questions.length) * 100;
  const isCorrect = selectedAnswer === question.correct;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-2xl text-foreground">
            {exercise.title}
          </DialogTitle>
          <DialogDescription>
            Frage {currentQuestion + 1} von {exercise.questions.length}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Progress value={progress} className="h-2" />

          <div className="rounded-lg bg-muted p-6 text-center">
            <h3 className="text-xl font-semibold text-foreground">
              {question.question}
            </h3>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {question.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => !showResult && handleAnswer(index)}
                disabled={showResult}
                variant="outline"
                className={cn(
                  "h-auto p-6 text-lg transition-all",
                  showResult &&
                    index === question.correct &&
                    "border-primary bg-primary/10",
                  showResult &&
                    index === selectedAnswer &&
                    index !== question.correct &&
                    "border-destructive bg-destructive/10",
                )}
              >
                <span className="flex items-center gap-3">
                  {option}
                  {showResult && index === question.correct && (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  )}
                  {showResult &&
                    index === selectedAnswer &&
                    index !== question.correct && (
                      <XCircle className="h-5 w-5 text-destructive" />
                    )}
                </span>
              </Button>
            ))}
          </div>

          {showResult && (
            <div
              className={cn(
                "rounded-lg p-6 text-center",
                isCorrect ? "bg-primary/10" : "bg-destructive/10",
              )}
            >
              <p
                className={cn(
                  "text-xl font-bold",
                  isCorrect ? "text-primary" : "text-destructive",
                )}
              >
                {isCorrect
                  ? "Richtig! 🎉"
                  : "Nicht ganz richtig. Versuch es nochmal! 💪"}
              </p>
              <Button onClick={handleNext} className="mt-4 gap-2">
                Weiter
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
