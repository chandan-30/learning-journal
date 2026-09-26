import { useState, useEffect } from "react";

export default function UseEffectFunc() {
    const [data, setData] = useState(null);

    useEffect( () => {
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then( res => res.json())
        .then ( data => setData(data));

        console.log("useEffect called", data);
    }, []);

    return ( <>
        <ul>
            { data && data.slice(1,4).map((item,idx) => {
                return (
                    <li  key={idx}>{item.title}</li>
                )
            })}
        </ul>
    </>)
}