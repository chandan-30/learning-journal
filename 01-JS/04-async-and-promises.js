/**
 * Async JavaScript Concepts - Interview Quick Prep
 *
 * This file demonstrates core async programming concepts used in JavaScript,
 * with examples and notes useful for interview discussion:
 *
 * 1. Event Loop and Concurrency Model
 *    - JavaScript runs on a single thread and uses the event loop to manage
 *      asynchronous work without blocking.
 *    - The call stack executes synchronous code first, then the microtask queue
 *      (Promise callbacks) and finally the macrotask/task queue (setTimeout,
 *      setInterval, I/O callbacks).
 *    - Microtasks have higher priority than tasks, so promise reactions run before
 *      timer callbacks when both are ready.
 *
 * 2. Callback Hell
 *    - Nested callbacks can become hard to read and maintain.
 *    - This file shows a simple nested setTimeout example to explain why promises
 *      and async/await are preferred for cleaner async flow.
 *
 * 3. Promises
 *    - Promise construction, resolution, rejection, and chaining with then/catch/finally.
 *    - Promise chains transform values and handle errors in a structured way.
 *
 * 4. Promise Combinators
 *    - Promise.all: waits for all promises, rejects immediately if any reject.
 *    - Promise.allSettled: waits for every promise to settle, then returns all results.
 *    - Promise.race: resolves or rejects as soon as the first promise settles.
 *    - Promise.any: resolves as soon as the first promise fulfills, rejects only if
 *      every promise rejects.
 *
 * 5. Async/Await Syntax
 *    - Async functions return promises and allow using await for sequential-style
 *      asynchronous code.
 *    - Await pauses execution inside the async function until the promise settles,
 *      making async code easier to read and reason about.
 *
 * Notes for interviews:
 *    - Be prepared to explain the difference between microtasks and macrotasks.
 *    - Describe how promise chaining propagates values and errors.
 *    - Compare callback nesting with promise chaining and async/await.
 */

{
    // callback and callback hell example
    setTimeout(() => {
        console.log("First callback");
    }, 1000);

    setTimeout(() => {
        console.log("Second callback");
        setTimeout(() => {
            console.log("Third callback");
            setTimeout(() => {
                console.log("Fourth callback");
            }, 1000);
        }, 1000);
    }, 1000);
}

{
    // Promise example
    const promise = new Promise((res, rej) => {
        if (true) return res("Promise Resolved");
        rej("Promise Rejected");
    })
    .then( res => (res + " - then 1") ).then( res => console.log(res) )
    .catch( err => console.log(err) )
    .finally( () => console.log("Promise settled") );
}

{
    // Promise Combinators
    const p1 = new Promise( res => setTimeout(() => res("Promise 1 resolved"), 1000) );
    const p2 = new Promise( res => setTimeout(() => res("Promise 2 resolved"), 2000) );
    const p3 = new Promise( (res, rej) => setTimeout(() => rej("Promise 3 rejected"), 1500) );

    // Promise.all - fails fast if any promise rejects
    Promise.all([p1, p2, p3])
        .then( res => console.log("Promise.all result:", res) )
        .catch( err => console.log("Promise.all error:", err) );

    // Promise.allSettled - waits for all promises to settle, regardless of outcome
    Promise.allSettled([p1, p2, p3])
        .then( res => console.log("Promise.allSettled result:", res) );
    
    // Promise.race - resolves/rejects as soon as the first promise settles
    Promise.race([p1, p2, p3])
        .then( res => console.log("Promise.race result:", res) )
        .catch( err => console.log("Promise.race error:", err) );
    
    // Promise.any - resolves as soon as the first promise fulfills, ignores rejections unless all reject
    Promise.any([p1, p2, p3])
        .then( res => console.log("Promise.any result:", res) )
        .catch( err => console.log("Promise.any error:", err) );
}

{
    // Async/Await example

    const fetchData = (data, delay) => new Promise( res => setTimeout(() => res(data), delay) );

    async function getData() {
        const data = await fetchData("Async/Await Data", 1000);
        console.log(data);  
    }
    getData();
}