import React, { useState, useEffect } from 'react';

const TypingEffect = () => {
  // Ursprüngliches Wort in Kleinbuchstaben
  const word = "schreiben";
  const [text, setText] = useState("");

  useEffect(() => {
    let index = 0;
    // Tipp-Animation: Buchstabe für Buchstabe
    const typeInterval = setInterval(() => {
      setText(word.slice(0, index + 1));
      index++;
      if (index === word.length) {
        clearInterval(typeInterval);
        // Nach einer kurzen Pause, den ersten Buchstaben löschen...
        setTimeout(() => {
          setText(word.slice(1)); // Ergebnis: "chreiben"
          // ...und dann das große "S" vorne anhängen
          setTimeout(() => {
            setText("S" + word.slice(1)); // Endergebnis: "Schreiben"
          }, 300); // Warte 500ms, bevor das "S" getippt wird
        }, 500); // Warte 1 Sekunde, nachdem das Wort komplett getippt wurde
      }
    }, 100); // Geschwindigkeit der Tipp-Animation (200ms pro Buchstabe)

    return () => clearInterval(typeInterval);
  }, [word]);

  return <h1>{text}</h1>;
};

export default TypingEffect;
