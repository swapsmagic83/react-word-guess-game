import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import Word from "./Word";
import axios from 'axios'

const WordGame = () =>{
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    // const words = ['apple','grape','orange','plum','peach'];
    const [guessedChars,setGuessedChars] = useState([]);
    const [count,setCount] = useState(0);
    const [err,setErr] = useState('');
    const [word,setWord] = useState('')
   
    const navigate = useNavigate();
    useEffect(()=>{
        const getWords = async () => {
            try {
                const res = await axios.get('https://random-word-api.vercel.app/api?words=1')
                setWord(res.data[0])
            }
            catch (err){
                setErr(err)
            }
        }
        getWords()
    },[])
    // const getRandomWord = ()=>{
    //     let random = Math.floor(Math.random()*words.length);
    //     return words[random]
    // }
    // const [word,setWord] = useState(getRandomWord())
    
    const isGameOver = count > word.length *2 || (word.split('')).every((char)=>guessedChars.includes(char));
    
    const handleClick = (e) =>{
        const guessedChar = e.target.value.toLowerCase();
        if (!guessedChar){
            return
        }
        setCount(count =>count+1)
        if (!guessedChars.includes(guessedChar)){
            setGuessedChars([...guessedChars,guessedChar]);
        }
    }

    const restart = async() =>{
        setCount(0)
        setGuessedChars([])
        // setWord(getRandomWord())
        const res = await axios.get('https://random-word-api.vercel.app/api?words=1')
            setWord(res.data[0])
    }
   
    return (
        <div>
            <button onClick={()=>navigate('/')}>Back To Home</button>
            <div>
                <Word  word={word} guessedChars={guessedChars} count={count}/>    
            </div>
         
            <div>
                {alphabets.map(alphabet =>
                    <button className="WordGame-alphabets" key={alphabet} onClick={handleClick} value={alphabet}
                     disabled={isGameOver}>{alphabet}</button>
                )}
            </div>
            <button className="WordGame-restart" onClick={restart}><b>RESTART</b></button>
        </div>
    )
}
export default WordGame;