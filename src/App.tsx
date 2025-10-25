


import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  
 const [length, setLength] = useState(8);
 const [password, setPassword] = useState("");
 const [numbersAllowed, setNumbersAllowed] = useState(false);
 const [charactersAllowed, setCharactersAllowed] = useState(false)

 let passwordRef = useRef(null)

 let passwordToClipBoard = useCallback(() => {
     if (passwordRef.current) {
  passwordRef.current.select();
  passwordRef.current.setSelectionRange(0, 999);
  navigator.clipboard.writeText(password); // actually copies text
}
},[password])

  const passwordGenerator = useCallback( () => {  // we use useCallback() for optimization
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(numbersAllowed) str += "0123456789"
      if(charactersAllowed) str += "!@#$%^&*/"

      for(let i=1;i<=length;i++){
        let char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char)
      }
      setPassword(pass)
  }, [length,numbersAllowed,charactersAllowed])

   useEffect(() => {
      passwordGenerator();
   },[length,numbersAllowed,charactersAllowed,passwordGenerator])
  return (
    <>
       <div className='passwordBox'>
        <h2>Password Generator</h2>
       <div>
        <input type="text" 
        value={password}
        readOnly
        placeholder='Password'
        ref={passwordRef}
        />
        <button
      onClick={passwordToClipBoard}
        >Copy</button>
       </div>
       <div>
         <div>
           <input type="range" 
           value={length}
           min={6}
           max={100}
           onChange={(e) => {
               setLength(Number(e.target.value));
           }}/>
        <label >Length : {length}</label>
         </div>
         <div>
          <input type="checkbox" 
          defaultChecked = {numbersAllowed}
          id='numbersInput'
          onChange={() => {
             setNumbersAllowed((prev) => !prev)
          }} // true -> false, false -> true
          />
          <label >Numbers</label>
         </div>
         <div>
          <input type="checkbox"
          defaultChecked = {charactersAllowed}
          id='charactersInput'
          onChange={() => {
             setCharactersAllowed((prev) => !prev)
          }}
          />
          <label >Characters</label>
         </div>
       </div>
       </div>
    </>

  )
}

export default App
