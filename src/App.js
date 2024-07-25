import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [expanded, setExpanded] = useState(false);
  const [showHello, setShowHello] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [sequenceComplete, setSequenceComplete] = useState(false);

  const words = ["hello", "vraj", "don't", "look", "behind", "you", ":)"];

  const handleClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    let timer;
    if (expanded) {
      timer = setTimeout(() => {
        setShowHello(true);
      }, 5000); // 5 seconds to match the transition duration
    } else {
      setShowHello(false);
      setSequenceComplete(false);
    }
    return () => clearTimeout(timer);
  }, [expanded]);

  useEffect(() => {
    let interval;
    if (showHello) {
      interval = setInterval(() => {
        setCurrentWordIndex((prevIndex) => {
          if (prevIndex + 1 === words.length) {
            clearInterval(interval);
            setSequenceComplete(true);
            return prevIndex;
          }
          return prevIndex + 1;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [showHello]);

  return (
    <div className={`App ${sequenceComplete ? 'black-screen' : ''}`}>
      <header className={`App-header ${expanded ? 'expanded' : ''}`} onClick={handleClick}>
        {!showHello && (
          <>
            <img src="/ct.gif" className={`App-logo ${expanded ? 'expanded' : ''}`} alt="example" />
            {!expanded && <p>Click on this</p>}
          </>
        )}
        {showHello && !sequenceComplete && <h1>{words[currentWordIndex]}</h1>}
      </header>
    </div>
  );
}

export default App;
