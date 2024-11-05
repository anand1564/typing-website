
import React, { useState, useEffect, useCallback } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../themeContext';

const quote = "The quick brown fox jumps over the lazy dog.";

export default function Typing() {
  const [typedChars, setTypedChars] = useState([]);
  const [accuracy, setAccuracy] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  const { theme, toggleTheme, themes } = useContext(ThemeContext);

  const handleKeyPress = useCallback((e) => {
    const currentIndex = typedChars.length;
    if (!timerOn) {
      setTimerOn(true);
    }
    if (currentIndex < quote.length) {
      setTypedChars((prev) => [
        ...prev,
        { char: quote[currentIndex], correct: e.key === quote[currentIndex] },
      ]);
    }
  }, [typedChars]);

  useEffect(() => {
    if (typedChars.length === quote.length) {
      setWpm((quote.length) / 5 / (time / 60));
      setIsCompleted(true);
      setTimerOn(false);
    }
  }, [typedChars]);

  useEffect(() => {
    if (timerOn) {
      setTimeout(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      setTime(0);
    }
    return () => clearTimeout();
  }, [timerOn, time]);

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div
      className="h-screen flex flex-col"
      style={{
        color: themes[theme].foreground,
        backgroundColor: themes[theme].background,
      }}
    >
      <div className="flex items-center flex-col justify-center flex-grow">
        <button onClick={toggleTheme}>Toggle Theme</button>
        <h1 className="text-2xl">Time: {time}</h1>
        <p className="text-2xl">
          {quote.split('').map((char, index) => {
            const typed = typedChars[index];
            let className = "text-customGray"; // default, untyped
            if (typed) {
              className = typed.correct ? "text-customIcon" : "text-red-500";
            }
            return (
              <span key={index} className={className}>
                {char}
              </span>
            );
          })}
        </p>
        {isCompleted && (
          <div>
            <h1 className="text-2xl">Accuracy: {accuracy}</h1>
            <h1>WPM: {wpm}</h1>
          </div>
        )}
      </div>
    </div>
  );
}