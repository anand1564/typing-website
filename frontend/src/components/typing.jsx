import React, { useState, useEffect, useCallback } from 'react';
const quote = "The quick brown fox jumps over the lazy dog.";

export default function Typing() {
  const [typedChars, setTypedChars] = useState([]);
  const [accuracy,setAccuracy] = useState(0);
  const [correctChars,setCorrectChars]=useState(0);
  const [incorrectChars,setIncorrectChars]=useState(0);
  const [isCompleted,setIsCompleted]=useState(false);
  const [wpm,setWpm]=useState(0); 


  const handleKeyPress = useCallback((e) => {
    const currentIndex = typedChars.length;
    if (currentIndex < quote.length) {
      setTypedChars(prev => [
        ...prev,
        { char: quote[currentIndex], correct: e.key === quote[currentIndex] }
      ]);
    }
  }, [typedChars]);
   useEffect(()=>{
    if(typedChars.length===quote.length){
      setIsCompleted(true);
    }
   },[typedChars])
   
  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="h-screen flex flex-col">
<img src="/monkeytype.webp" alt='monkeytype' height={100} width={100} />
      <div className="flex items-center flex-col justify-center flex-grow">
        <p className="text-2xl">
          {quote.split('').map((char, index) => {
            const typed = typedChars[index];
            let className="text-customGray"; // default, untyped
            if (typed) {
              className = typed.correct ? "text-customIcon" : "text-red-500";
            }
            return <span key={index} className={className}>{char}</span>;
          })}
        </p>
        {isCompleted ?
        <div> <h1 className='text-2xl'>Accuracy: {accuracy}</h1>
        <h1>WPM: {wpm}</h1> </div>: null}
      </div>
    </div>
  );
}