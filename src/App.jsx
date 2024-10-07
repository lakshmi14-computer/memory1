import { useState } from 'react'
import './App.css';
import Title from './Components/Title';
import Stats from './Components/Stats'
import Cards from './Components/Cards';
import { useEffect } from 'react';
import GameOver from './Components/GameOver';

let overlayStyle = {
  visibility: 'hidden',
  opacity: '0%'
}

let modalStyle = {
  transform: 'translate(0%, 0%)'
}


function App() {
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState('');
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);

  useEffect(() => {
    (gameState === 'next level') && setLevel(level + 1);

    return () => {
      setGameState('');
    }
  }, [gameState, level])

  useEffect(() => {
    if (gameState === 'game over') {
      overlayStyle = {
        opacity: '100%'
      }
      modalStyle = {
        transform: 'translate(0%, 50%)'
      }
    }

    return () => {
      overlayStyle = {
        visibility: 'hidden',
        opacity: '0%'
      }

      modalStyle = {
        transform: 'translate(0%, 0%)'
      }
    }
  }, [gameState])

  useEffect(() => {
    (score > highestScore) && setHighestScore(score);
  }, [score, highestScore])

  const resetGame = () => {
    setGameState('new game');
    setScore(0);
    setLevel(1);
  }

  return (
    <>
      <header>
        <Title/>
        <Stats level={level} score={score} highestScore={highestScore}/>
      </header>
      <main>
        <Cards 
        level={level} 
        gameState={gameState}
        setGameState={setGameState} 
        setScore={setScore} score={score}/>
      </main>
      <GameOver 
      highestScore={highestScore} 
      overlayStyle={overlayStyle} 
      modalStyle={modalStyle}
      resetGame={resetGame}/>
    </>
  )
}

export default App