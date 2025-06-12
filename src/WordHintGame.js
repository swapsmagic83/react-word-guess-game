import React, {useEffect, useState} from "react";
import Word from "./Word";
import axios from 'axios'
import { useNavigate } from "react-router-dom"; 

const WordHintGame = () =>{
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const [guessedChars,setGuessedChars] = useState([]);
    const [count,setCount] = useState(0);
    const [err,setErr] = useState('');
    const [word,setWord] = useState('')
    const [hint,setHint] = useState('')
   
    const navigate = useNavigate();
    useEffect(()=>{
        const getWords = async () => {  
            try {
                let definition = null;
                let str = '';
                while(!definition){
                const res = await axios.get('https://random-word-api.vercel.app/api?words=1')
                 str =res.data[0]
                console.log(str)
    
                const re = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${str}`)
                definition = (re.data[0].meanings[0].definitions[0].definition)
                console.log(definition)
                
            }
                setWord(str)
                setHint(definition)
            }
            catch (err){
                setErr(err.message||"error finding word or hint")
                setHint('No hint available')
            }
        }
        getWords()
    },[])
    
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
        try {
            const res = await axios.get('https://random-word-api.vercel.app/api?words=1')
            const str =res.data[0]
            setWord(str)
            
            const re = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${str}`)
            console.log(re.data[0].meanings[0].definitions[0].definition)
            setHint(re.data[0].meanings[0].definitions[0].definition)
        }
        catch (err){
            setErr(err.message||"error finding word or hint")
            setHint('No hint available')
        }
    }
   
    return (
        <div>
            <button onClick={()=>navigate('/')}>Go Back To Home</button>
            <div>
                <Word  word={word} guessedChars={guessedChars} count={count} hint={hint}/>    
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
export default WordHintGame;