import {useState, useContext} from 'react';
import { CountContext } from '../App';

export default function UseStateFunc() {
    const countValue = useContext(CountContext);
    const [count, setCount] = useState<number>(0);

    const counterClick = () => {
        setCount(count + 1);
        // alert(`Count is ${count}`);
    }
    
    return (<>
        <p> { `Clicked ${count} times! and Context Value: ${countValue}` } </p>
        <button onClick={counterClick}> Click for Incremenet </button>
    </>);
};