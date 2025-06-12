import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from './Home';
import WordGame from './WordGame';
import WordHintGame from './WordHintGame';
import './wordGame.css' ;

function App() {
  return (
    <div className="App" >
      <h1 className='App-h1'>Word Guess Game</h1>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/word" element={<WordGame />} />
        <Route path="/wordhint" element={<WordHintGame />} />
      </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
