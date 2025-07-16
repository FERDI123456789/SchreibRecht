import React, { useState, useEffect } from "react";
import "@/styles/global.css";

const funFacts = [
  "Schreiben gibt den Gedanken Struktur.",
  "Der erste Computer entwickelte sich aus Schreibmaschinen.",
  "Papier wurde ursprünglich aus Pflanzenfasern hergestellt.",
  "Kalligrafie ist die Kunst des schönen Schreibens.",
  "Handschrift verändert sich im Laufe des Lebens.",
  "Lesen stärkt das Gedächtnis und erweitert den Wortschatz.",
  "Bücher bieten den Schlüssel zu anderen Welten.",
  "Lesen steigert die Konzentration und Empathie.",
  "Lesen vor dem Schlafen hilft, den Geist zu beruhigen.",
  "Wer liest, verbessert seine analytischen Fähigkeiten."
];

// Statische Werte für SSR
const STATIC_INDEX = 0; 
const STATIC_COLOR = "rgb(135, 178, 252)"; 

interface FunFactProps {
  align?: "left" | "center";
}

const FunFact: React.FC<FunFactProps> = ({ align = "left" }) => {
  const [index, setIndex] = useState(STATIC_INDEX);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [color, setColor] = useState(STATIC_COLOR);
  const [hydrated, setHydrated] = useState(false); // Flag für Hydration

  useEffect(() => {
    setHydrated(true); // Erst nach Mounting hydratisiert

    const timer = setTimeout(() => {
      setPrevIndex(index);
      setIndex((prev) => (prev + 1) % funFacts.length);
      setTimeout(() => {
        setPrevIndex(null);
      }, 300);
    }, 4000);

    return () => clearTimeout(timer);
  }, [index]);

  const containerClasses = align === "center" ? "flex justify-center" : "";

  // Server-Rendering zeigt nur statische Werte
  if (!hydrated) {
    return (
      <div className={`relative h-10 text-lg font-medium ${containerClasses}`}>
        <FunFactItem key={`static`} text={funFacts[STATIC_INDEX]} type="enter" backgroundColor={STATIC_COLOR} />
      </div>
    );
  }

  return (
    <div className={`relative h-10 text-lg font-medium ${containerClasses}`}>
      {prevIndex !== null && (
        <FunFactItem key={`exit-${prevIndex}`} text={funFacts[prevIndex]} type="exit" backgroundColor={color} />
      )}
      <FunFactItem key={`enter-${index}`} text={funFacts[index]} type="enter" backgroundColor={color} />
    </div>
  );
};

interface FunFactItemProps {
  text: string;
  type: "enter" | "exit";
  backgroundColor: string;
  onAnimationEnd?: () => void;
}

const FunFactItem: React.FC<FunFactItemProps> = ({ text, type, backgroundColor, onAnimationEnd }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setAnimate(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const baseClasses = "absolute transition-all duration-300 ease-in-out";
  const enterClasses = animate
    ? "translate-y-0 opacity-100 rotate-0 px-2 mt-1 rounded-full shadow-sm"
    : "translate-y-full opacity-0 scale-50 rotate-0 mt-1 rounded-full shadow-sm";

  const exitClasses = animate
    ? "-translate-y-full opacity-0 scale-50 rotate-0 px-2 mt-1 rounded-full shadow-sm"
    : "translate-y-0 opacity-100 rotate-0 mt-1 rounded-full shadow-sm";

  return (
    <div
      className={`${baseClasses} ${type === "enter" ? enterClasses : exitClasses}`}
      style={{ backgroundColor }}
      onTransitionEnd={onAnimationEnd}
    >
      {text}
    </div>
  );
};

export default FunFact;
