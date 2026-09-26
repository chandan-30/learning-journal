import { useState, createContext, useContext } from 'react'
import UseStateFunc from './hooks/useStateFunc';
import UseEffectFunc from './hooks/useEffectFunc';
import UseReducerFunc from './hooks/UseReducerFunc';
import './App.css'


export const CountContext = createContext<number>(0);

function App() {
  const [count, setCount] = useState<number>(0);

  function handleClick(name: string) {
    setCount(s => s + 10);
  }

  return (
    <>
      <section id="center">
        Hello React - am back!
        <Mouse btnClick={() => handleClick("Chandan")} />
        <CountContext.Provider value={count}>
          <UseStateFunc />
          <UseEffectFunc />
          <UseReducerFunc />
        </CountContext.Provider>
      </section>
    </>
  )
}

function Mouse({btnClick}) {
  return ( 
    <button onClick={btnClick}>Click Me</button>
  );
}

export default App
