import React, { useEffect, useState } from 'react';

const TypingChallenge = () => {
  const [quote] = useState("The quick brown fox jumps over the lazy dog");
  const [userInput, setUserInput] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [time, setTime] = useState(0);
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [wpm,setWPM] = useState(0);
  const [accuracy,setAccuracy] = useState(0);

//Handling user input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    if (!isTimerOn && value.length > 0) {
      setIsTimerOn(true); // Start timer on first input
    }
    if (value === quote) {
      setIsComplete(true); // Mark as complete if the input matches the quote
      setIsTimerOn(false); // Stop the timer when the user completes
      setWPM((correctChars-incorrectChars)/time*60);
      setAccuracy((correctChars/(correctChars+incorrectChars))*100);
    }
  };

  // Timer logic 
  useEffect(() => {
    let timer;
    if (isTimerOn) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1); 
      }, 1000);
    }

    return () => clearInterval(timer); 
  }, [isTimerOn]); 
//Cacluating WPM and Accuracy
  useEffect(()=>{
    const correctChars = userInput.split('').filter((char,index)=>char===quote[index]).length;
    const incorrectChars = userInput.length - correctChars;
    setCorrectChars(correctChars);
    setIncorrectChars(incorrectChars);
    if(isComplete){
      setWPM((correctChars/5)*(time/60).toFixed(2));
      setAccuracy((correctChars/userInput.length)*100);
    }
  },[userInput,time,quote,isComplete]);

//Function for getting the color of each index
  const getBackgroundColor = (index) => {
    if (index < userInput.length) {
      if (userInput[index] === quote[index]) {
        return 'text-green-500';
      } else {
        return 'text-red-500';
      }
    }
    return 'text-gray-500';
  };

  const handleRestart = () => {
    setIsComplete(false);
    setUserInput("");
    setCorrectChars(0);
    setIncorrectChars(0);
    setTime(0);
    setIsTimerOn(false); 
  };

  return (
    <div className="p-8 min-h-screen">
      {!isComplete ? (
        <div>
          <div className="bg-white p-4 rounded shadow-lg mb-6">
            <div className="flex justify-around items-center mb-2">
              <h1 className="text-2xl font-bold mb-4 text-center">Type the quote below</h1>
              <h2 className="text-2xl font-semibold text-center">Time: {time} seconds</h2>
            </div>
            <textarea
              value={userInput}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>

          <div className="relative w-full p-4 bg-gray-100 rounded shadow">
            <p className="text-lg">
              {quote.split("").map((char, index) => (
                <span key={index} className={getBackgroundColor(index)}>
                  {char}
                </span>
              ))}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white p-4 rounded shadow-lg">
          <div>
            <h1 className="text-2xl font-bold mb-4">Typing Results</h1>
            <p className="text-lg">Typing Speed: {wpm} {/* Display typing speed here */} WPM</p>
            <p className="text-lg">Accuracy: {accuracy}{/* Display accuracy here */} %</p>
          </div>
          <button
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg mt-3"
            onClick={handleRestart}
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default TypingChallenge;
