import React, { useState } from 'react';

const TypingChallenge = () => {
  const [quote] = useState("The quick brown fox jumps over the lazy dog");
  const [userInput, setUserInput] = useState("");
  const [isComplete,setIsComplete] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);

    if(value===quote){
        setIsComplete(true);
    }
  };

  const getBackgroundColor = (index) => {
    if (index < userInput.length) {
      return userInput[index] === quote[index] ? 'text-green-500' : 'text-red-500';
    }
    return 'text-gray-500';
  };

  return (
    <div className="p-8">
      {!isComplete ? (
        <div>
          <div className="bg-white p-4 rounded shadow-lg mb-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Type the quote below:</h1>
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
          <h1 className="text-2xl font-bold mb-4">Typing Results</h1>
          <p className="text-lg">Typing Speed: {/* Display typing speed here */} WPM</p>
          <p className="text-lg">Accuracy: {/* Display accuracy here */} %</p>
          {/* You can add a reset button or other actions here */}
        </div>
      )}
    </div>
  );
};

export default TypingChallenge;
