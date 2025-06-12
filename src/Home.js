import React from "react";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleStartWordGame = () => {
    navigate('/word');
  };
  const handleStartWordHintGame = () => {
    navigate('/wordhint');
  };

  return (
    <div>
      <button className="Home-btn" onClick={handleStartWordGame}> Hard Word Game</button>
      <button className="Home-btn" onClick={handleStartWordHintGame}>Easy Word Game </button>
    </div>
  );
};
export default Home;