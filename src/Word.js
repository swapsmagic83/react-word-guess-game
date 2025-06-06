import React from "react";
const Word = ({word,guessedChars,count}) =>{
    return (
        <div>
        <h3>Word :  {word.split('').map(letter =>(
            guessedChars.includes(letter.toLowerCase())? 
            <span> {letter.toUpperCase()} </span>
            :
            <span> _ </span>
           
        ))}</h3>
        <h4>You tried for : {count}</h4>
        {count === (word.length * 2)? 
        <h4 className="Word-h4"><b>You tried for enough times. The word was {word}</b></h4>: ''}
        </div>
    )
}
export default Word;