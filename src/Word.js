import { type } from "@testing-library/user-event/dist/type";
import React from "react";
const Word = ({word,guessedChars,count,hint}) =>{
    console.log(word)
    const valid = typeof word === 'string' && word.length > 0;
    const hasWon =  valid ?
        word.split('').every((char)=>
        guessedChars.includes(char.toLowerCase())): false;
    return (
        <div>
        <h4>You can have max guess: {word.length*2}</h4>
        <h4>Your guess count : {count}</h4>
        <h3>Word :  {word.split('').map(letter =>(
            guessedChars.includes(letter.toLowerCase())? 
            <span> {letter.toUpperCase()} </span>
            :
            <span> _ </span>   
        ))}</h3>
        {hint && hint.length > 0 && <h4>Hint : {hint}</h4>}
        <h4>Your Guesses : {guessedChars.map(
            char=>char.toUpperCase()
        )}</h4>
        {hasWon &&
         <h1 className="Word-h1"> Yayyy...You Won</h1>}
        {count > (word.length * 2) &&
        <h4 className="Word-h4"><b>You tried for enough times. The word was "{word.toUpperCase()}"</b></h4>}
        </div>
    )
}
export default Word;