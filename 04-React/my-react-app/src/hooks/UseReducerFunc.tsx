import { useReducer } from "react";

export default function UseReducerFunc() {

    type Action = { type: 'add' | 'sub' };

    function reducerFunc( state: number, action: Action) {
        switch(action.type) {
            case 'add':
                return state + 1;
            case 'sub':
                return state - 1;
            default: 
                return state;
        }
    }

    const [count, dispatch] = useReducer( reducerFunc, 0);

    const handleAdd = () => {
        dispatch({ type: 'add'});
    }
    const handleSub = () => {
        dispatch({ type: 'sub'});
    }

    return ( <> 
        <p> Count is: {count} </p>
        <button onClick={handleAdd}> Add </button>
        <button onClick={handleSub}> Subtract </button>
    </>)
}